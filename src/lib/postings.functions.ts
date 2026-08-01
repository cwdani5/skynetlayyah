import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSkynetAuth } from "@/lib/skynet-auth";
import { assertAdmin, createPublicBackendClient } from "@/lib/backend-env";
import { buildPrompt, chunkText, cleanHtmlToText, dedupeItems, parseItems, type ExtractItem } from "@/lib/ai-extract";

export const listPostings = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({
      type: z.enum(["job", "admission", "scheme"]).optional(),
      limit: z.number().min(1).max(100).optional(),
    }).parse(input ?? {}))
  .handler(async ({ data }) => {
    const sb = createPublicBackendClient();
    const today = new Date().toISOString().slice(0, 10);
    let q = sb.from("postings").select("*").eq("is_active", true).or(`deadline.is.null,deadline.gte.${today}`).order("is_featured", { ascending: false }).order("created_at", { ascending: false });
    if (data.type) q = q.eq("type", data.type);
    if (data.limit) q = q.limit(data.limit);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const countPostings = createServerFn({ method: "GET" })
  .handler(async () => {
    const sb = createPublicBackendClient();
    const today = new Date().toISOString().slice(0, 10);
    const types = ["job", "admission", "scheme"] as const;
    const out: Record<string, number> = { job: 0, admission: 0, scheme: 0 };
    for (const t of types) {
      const { count } = await sb.from("postings").select("*", { count: "exact", head: true })
        .eq("is_active", true).eq("type", t).or(`deadline.is.null,deadline.gte.${today}`);
      out[t] = count ?? 0;
    }
    return out as { job: number; admission: number; scheme: number };
  });

export const upsertPosting = createServerFn({ method: "POST" })
  .middleware([requireSkynetAuth])
  .inputValidator((input: unknown) => z.object({
    id: z.string().uuid().optional(),
    type: z.enum(["job", "admission", "scheme"]),
    title: z.string().min(3).max(300),
    organization: z.string().max(200).optional().nullable(),
    location: z.string().max(200).optional().nullable(),
    description: z.string().max(4000).optional().nullable(),
    deadline: z.string().optional().nullable(),
    source_url: z.string().url().optional().nullable().or(z.literal("")),
    ad_image_url: z.string().url().optional().nullable().or(z.literal("")),
    apply_url: z.string().url().optional().nullable().or(z.literal("")),
    is_featured: z.boolean().optional(),
    is_active: z.boolean().optional(),
  }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin({ supabase: context.supabase, userId: context.userId });
    const payload = {
      ...data,
      source_url: data.source_url || null,
      ad_image_url: data.ad_image_url || null,
      apply_url: data.apply_url || null,
      deadline: data.deadline || null,
      created_by: context.userId,
    };
    if (data.id) {
      const { data: row, error } = await context.supabase.from("postings").update(payload).eq("id", data.id).select().single();
      if (error) throw new Error(error.message);
      return row;
    }

    // Duplicate guard: same type + title (+ organization) => update existing instead of adding again
    let dupQuery = context.supabase
      .from("postings")
      .select("id")
      .eq("type", data.type)
      .ilike("title", data.title.trim());
    dupQuery = data.organization?.trim()
      ? dupQuery.ilike("organization", data.organization.trim())
      : dupQuery.or("organization.is.null,organization.eq.");
    const { data: existing } = await dupQuery.limit(1).maybeSingle();

    if (existing?.id) {
      const { data: row, error } = await context.supabase.from("postings").update(payload).eq("id", existing.id).select().single();
      if (error) throw new Error(error.message);
      return row;
    }

    const { data: row, error } = await context.supabase.from("postings").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deletePosting = createServerFn({ method: "POST" })
  .middleware([requireSkynetAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin({ supabase: context.supabase, userId: context.userId });
    const { error } = await context.supabase.from("postings").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const isCurrentUserAdmin = createServerFn({ method: "GET" })
  .middleware([requireSkynetAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
    return { isAdmin: !!data };
  });

export const getAiSettingsStatus = createServerFn({ method: "GET" })
  .middleware([requireSkynetAuth])
  .handler(async ({ context }) => {
    await assertAdmin({ supabase: context.supabase, userId: context.userId });
    return {
      provider: process.env["GROQ_API_KEY"] ? "Groq" : process.env["LOVABLE_API_KEY"] ? "Lovable AI" : null,
      configured: Boolean(process.env["GROQ_API_KEY"] || process.env["LOVABLE_API_KEY"]),
      groqConfigured: Boolean(process.env["GROQ_API_KEY"]),
    };
  });

export const testAiConnection = createServerFn({ method: "POST" })
  .middleware([requireSkynetAuth])
  .handler(async ({ context }) => {
    await assertAdmin({ supabase: context.supabase, userId: context.userId });
    const groqKey = process.env["GROQ_API_KEY"];
    if (!groqKey) return { ok: false, message: "GROQ_API_KEY is not set on this deployment." };
    const response = await fetch("https://api.groq.com/openai/v1/models", {
      headers: { Authorization: `Bearer ${groqKey}` },
    });
    if (!response.ok) {
      return { ok: false, message: `Groq rejected the key (${response.status}).` };
    }
    return { ok: true, message: "Groq connection is working." };
  });

// AI-assisted extraction from an official webpage
export const extractFromUrl = createServerFn({ method: "POST" })
  .middleware([requireSkynetAuth])
  .inputValidator((input: unknown) => z.object({ url: z.string().url(), type: z.enum(["job", "admission", "scheme"]) }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin({ supabase: context.supabase, userId: context.userId });
    const apiKey = process.env["LOVABLE_API_KEY"];
    const groqKey = process.env["GROQ_API_KEY"];
    if (!apiKey && !groqKey)
      throw new Error(
        "AI service not configured: set GROQ_API_KEY (or LOVABLE_API_KEY) in your hosting environment variables (Netlify → Site settings → Environment variables), then redeploy.",
      );

    let pageText = "";
    let kind: "image" | "pdf" | "web" = "web";
    let imageDataUrl = "";
    try {
      const res = await fetch(data.url, { headers: { "User-Agent": "Mozilla/5.0 SkynetBot" } });
      const ct = res.headers.get("content-type") ?? "";
      const lower = data.url.toLowerCase();
      const looksImage = ct.startsWith("image/") || /\.(png|jpe?g|webp|gif|bmp)(\?|$)/.test(lower);
      if (looksImage) {
        kind = "image";
        const buf = new Uint8Array(await res.arrayBuffer());
        let bin = ""; for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
        const b64 = btoa(bin);
        const mime = ct.startsWith("image/") ? ct.split(";")[0] : "image/jpeg";
        imageDataUrl = `data:${mime};base64,${b64}`;
      } else if (ct.includes("pdf") || lower.endsWith(".pdf")) {
        kind = "pdf";
        const buf = new Uint8Array(await res.arrayBuffer());
        const txt = new TextDecoder("latin1").decode(buf);
        pageText = txt.replace(/[^\x20-\x7E\n]+/g, " ").replace(/\s+/g, " ").slice(0, 200000);
      } else {
        pageText = cleanHtmlToText(await res.text());
      }
    } catch { /* ignore */ }

    const endpoint = groqKey
      ? "https://api.groq.com/openai/v1/chat/completions"
      : "https://ai.gateway.lovable.dev/v1/chat/completions";
    const model = groqKey
      ? (kind === "image" ? "meta-llama/llama-4-scout-17b-16e-instruct" : "llama-3.3-70b-versatile")
      : "google/gemini-2.5-flash";

    const callAI = async (content: unknown) => {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: groqKey
          ? { "Content-Type": "application/json", Authorization: `Bearer ${groqKey}` }
          : { "Content-Type": "application/json", "Lovable-API-Key": apiKey ?? "" },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content }],
          response_format: { type: "json_object" },
          max_tokens: 8000,
          temperature: 0,
        }),
      });
      if (!resp.ok) {
        const err = await resp.text();
        throw new Error(`AI extract failed: ${resp.status} ${err.slice(0, 200)}`);
      }
      const json = (await resp.json()) as { choices?: { message?: { content?: string } }[] };
      return parseItems(json.choices?.[0]?.message?.content ?? "{}");
    };

    let items: ExtractItem[] = [];
    if (kind === "image") {
      items = await callAI([
        { type: "text", text: buildPrompt({ type: data.type, url: data.url, kind }) },
        { type: "image_url", image_url: { url: imageDataUrl } },
      ]);
    } else {
      // Long listing pages (60+ posts) don't fit in one prompt — split and merge.
      const chunks = chunkText(pageText);
      const results = await Promise.all(
        chunks.map((c, i) =>
          callAI(buildPrompt({
            type: data.type,
            url: data.url,
            kind,
            content: c,
            part: chunks.length > 1 ? { index: i + 1, total: chunks.length } : undefined,
          })).catch(() => [] as ExtractItem[]),
        ),
      );
      items = results.flat();
    }

    return { url: data.url, type: data.type, items: dedupeItems(items) };
  });

