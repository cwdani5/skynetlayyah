import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function supabaseForUser(ctx: ToolContext) {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if ((key.startsWith("sb_publishable_") || key.startsWith("sb_secret_")) && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        h.set("Authorization", `Bearer ${ctx.getToken()}`);
        return fetch(input, { ...init, headers: h });
      },
    },
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

export default defineTool({
  name: "create_posting",
  title: "Create posting",
  description: "Create a new Skynet Layyah posting (job, admission, or scheme). Admin-only — the signed-in user must have the admin role. Returns the created row.",
  inputSchema: {
    type: z.enum(["job", "admission", "scheme"]).describe("Posting category."),
    title: z.string().min(3).max(300).describe("Post title, e.g. 'Assistant Director (BS-17)'."),
    organization: z.string().max(200).optional().describe("Department/organization name."),
    location: z.string().max(200).optional().describe("City/region."),
    description: z.string().max(4000).optional().describe("Short description including qualification, vacancies, BPS if any."),
    deadline: z.string().optional().describe("Application deadline as YYYY-MM-DD, or omit if none."),
    source_url: z.string().url().optional().describe("Official advertisement/source URL."),
    apply_url: z.string().url().optional().describe("Direct apply URL if present."),
    ad_image_url: z.string().url().optional().describe("Advertisement image URL if any."),
    is_featured: z.boolean().optional().describe("Feature this posting on the homepage. Defaults to false."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = supabaseForUser(ctx);
    const { data: roleRow, error: roleErr } = await sb
      .from("user_roles").select("role").eq("user_id", ctx.getUserId()!).eq("role", "admin").maybeSingle();
    if (roleErr) return { content: [{ type: "text", text: roleErr.message }], isError: true };
    if (!roleRow) return { content: [{ type: "text", text: "Forbidden: admin role required" }], isError: true };
    const { data, error } = await sb.from("postings").insert({
      type: input.type,
      title: input.title,
      organization: input.organization ?? null,
      location: input.location ?? null,
      description: input.description ?? null,
      deadline: input.deadline ?? null,
      source_url: input.source_url ?? null,
      apply_url: input.apply_url ?? null,
      ad_image_url: input.ad_image_url ?? null,
      is_featured: input.is_featured ?? false,
      is_active: true,
      created_by: ctx.getUserId()!,
    }).select().single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: { row: data } };
  },
});
