import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

function isNewKey(v: string) { return v.startsWith("sb_publishable_") || v.startsWith("sb_secret_"); }
function serverPublic() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: { fetch: (input, init) => {
      const h = new Headers(init?.headers);
      if (isNewKey(key) && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
      h.set("apikey", key);
      return fetch(input, { ...init, headers: h });
    } },
  });
}

const TypeSchema = z.enum(["job", "admission", "scheme"]).optional();

export const listPostings = createServerFn({ method: "GET" })
  .inputValidator((input: { type?: "job" | "admission" | "scheme"; limit?: number } | undefined) =>
    z.object({ type: TypeSchema, limit: z.number().min(1).max(100).optional() }).parse(input ?? {}))
  .handler(async ({ data }) => {
    const sb = serverPublic();
    const today = new Date().toISOString().slice(0, 10);
    let q = sb.from("postings").select("*").eq("is_active", true).or(`deadline.is.null,deadline.gte.${today}`).order("is_featured", { ascending: false }).order("created_at", { ascending: false });
    if (data.type) q = q.eq("type", data.type);
    if (data.limit) q = q.limit(data.limit);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

const PostingInput = z.object({
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
});

async function assertAdmin(ctx: { supabase: ReturnType<typeof serverPublic>; userId: string }) {
  const { data, error } = await ctx.supabase.from("user_roles").select("role").eq("user_id", ctx.userId).eq("role", "admin").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const upsertPosting = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => PostingInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
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
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const { error } = await context.supabase.from("postings").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const isCurrentUserAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
    return { isAdmin: !!data };
  });

// AI-assisted extraction from an official webpage
const ExtractSchema = z.object({ url: z.string().url(), type: z.enum(["job", "admission", "scheme"]) });

export const extractFromUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ExtractSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context as never);
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("AI service not configured");

    let pageText = "";
    let isPdf = false;
    try {
      const res = await fetch(data.url, { headers: { "User-Agent": "Mozilla/5.0 SkynetBot" } });
      const ct = res.headers.get("content-type") ?? "";
      if (ct.includes("pdf") || data.url.toLowerCase().endsWith(".pdf")) {
        isPdf = true;
        const buf = new Uint8Array(await res.arrayBuffer());
        const txt = new TextDecoder("latin1").decode(buf);
        pageText = txt.replace(/[^\x20-\x7E\n]+/g, " ").replace(/\s+/g, " ").slice(0, 24000);
      } else {
        const html = await res.text();
        pageText = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 24000);
      }
    } catch { /* ignore */ }

    const prompt = `You are extracting an EXHAUSTIVE list of individual ${data.type} postings from a Pakistani government / education advertisement${isPdf ? " (PDF)" : " webpage"} at ${data.url}.

RULES:
- A single advertisement usually contains MANY separate posts (e.g. "Assistant Engineer", "Sub-Engineer", "Stenographer", "Clerk"). Return EACH post as its OWN item — do NOT merge.
- Extract up to 50 items. Do not skip any listed post.
- Per item capture: exact post title, department/organization, location, short description (<=300 chars) with BPS/scale, vacancies, qualification, age if present.
- deadline as YYYY-MM-DD if visible else null. apply_url = official apply link if present else source URL.

Return STRICT JSON only:
{ "items": [ { "title": string, "organization": string, "location": string, "description": string, "deadline": "YYYY-MM-DD"|null, "apply_url": string|null } ] }

Content:
"""${pageText}"""`;

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
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
