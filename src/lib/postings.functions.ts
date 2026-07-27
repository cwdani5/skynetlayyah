import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSkynetAuth } from "@/lib/skynet-auth";
import { assertAdmin, createPublicBackendClient } from "@/lib/backend-env";

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
    const { data: row, error } = data.id
      ? await context.supabase.from("postings").update(payload).eq("id", data.id).select().single()
      : await context.supabase.from("postings").insert(payload).select().single();
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

// AI-assisted extraction from an official webpage
export const extractFromUrl = createServerFn({ method: "POST" })
  .middleware([requireSkynetAuth])
  .inputValidator((input: unknown) => z.object({ url: z.string().url(), type: z.enum(["job", "admission", "scheme"]) }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin({ supabase: context.supabase, userId: context.userId });
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey && !process.env.GROQ_API_KEY) throw new Error("AI service not configured");


    let pageText = "";
    let isPdf = false;
    let isImage = false;
    let imageDataUrl = "";
    try {
      const res = await fetch(data.url, { headers: { "User-Agent": "Mozilla/5.0 SkynetBot" } });
      const ct = res.headers.get("content-type") ?? "";
      const lower = data.url.toLowerCase();
      const looksImage = ct.startsWith("image/") || /\.(png|jpe?g|webp|gif|bmp)(\?|$)/.test(lower);
      if (looksImage) {
        isImage = true;
        const buf = new Uint8Array(await res.arrayBuffer());
        let bin = ""; for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
        const b64 = btoa(bin);
        const mime = ct.startsWith("image/") ? ct.split(";")[0] : "image/jpeg";
        imageDataUrl = `data:${mime};base64,${b64}`;
      } else if (ct.includes("pdf") || lower.endsWith(".pdf")) {
        isPdf = true;
        const buf = new Uint8Array(await res.arrayBuffer());
        const txt = new TextDecoder("latin1").decode(buf);
        pageText = txt.replace(/[^\x20-\x7E\n]+/g, " ").replace(/\s+/g, " ").slice(0, 24000);
      } else {
        const html = await res.text();
        pageText = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 24000);
      }
    } catch { /* ignore */ }

    const promptText = `You are extracting an EXHAUSTIVE list of individual ${data.type} postings from a Pakistani government / education advertisement${isImage ? " (image/scan of ad)" : isPdf ? " (PDF)" : " webpage"} at ${data.url}.

RULES:
- A single advertisement usually contains MANY separate posts (e.g. "Assistant Engineer", "Sub-Engineer", "Stenographer", "Clerk"). Return EACH post as its OWN item — do NOT merge.
- Extract up to 50 items. Do not skip any listed post.
- Per item capture: exact post title, department/organization, location, short description (<=300 chars) with BPS/scale, vacancies, qualification, age if present.
- deadline as YYYY-MM-DD if visible else null. apply_url = official apply link if present else null.

Return STRICT JSON only:
{ "items": [ { "title": string, "organization": string, "location": string, "description": string, "deadline": "YYYY-MM-DD"|null, "apply_url": string|null } ] }${isImage ? "" : `\n\nContent:\n"""${pageText}"""`}`;

    const userContent = isImage
      ? [{ type: "text", text: promptText }, { type: "image_url", image_url: { url: imageDataUrl } }]
      : promptText;

    // Groq (agar GROQ_API_KEY set ho) warna Lovable AI. Dono OpenAI-compatible hain.
    const groqKey = process.env.GROQ_API_KEY;
    const endpoint = groqKey
      ? "https://api.groq.com/openai/v1/chat/completions"
      : "https://ai.gateway.lovable.dev/v1/chat/completions";
    const model = groqKey
      ? (isImage ? "meta-llama/llama-4-scout-17b-16e-instruct" : "llama-3.3-70b-versatile")
      : "google/gemini-2.5-flash";

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${groqKey ?? apiKey}` },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: userContent }],
        response_format: { type: "json_object" },
      }),
    });


    if (!resp.ok) {
      const err = await resp.text();
      throw new Error(`AI extract failed: ${resp.status} ${err.slice(0, 200)}`);
    }
    const json = (await resp.json()) as { choices?: { message?: { content?: string } }[] };
    const content = json.choices?.[0]?.message?.content ?? "{}";
    type Item = { title?: string; organization?: string; location?: string; description?: string; deadline?: string | null; apply_url?: string | null };
    let parsed: { items?: Item[] } = {};
    try { parsed = JSON.parse(content) as { items?: Item[] }; } catch { parsed = { items: [] }; }
    const items: Item[] = Array.isArray(parsed.items) ? parsed.items : [];
    return { url: data.url, type: data.type, items };
  });
