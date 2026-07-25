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
  name: "update_posting",
  title: "Update posting",
  description: "Update fields on an existing Skynet Layyah posting. Admin-only. Only supplied fields are changed.",
  inputSchema: {
    id: z.string().uuid().describe("Posting ID (UUID) to update."),
    title: z.string().min(3).max(300).optional(),
    organization: z.string().max(200).optional(),
    location: z.string().max(200).optional(),
    description: z.string().max(4000).optional(),
    deadline: z.string().nullable().optional().describe("YYYY-MM-DD or null to clear."),
    source_url: z.string().url().nullable().optional(),
    apply_url: z.string().url().nullable().optional(),
    ad_image_url: z.string().url().nullable().optional(),
    is_featured: z.boolean().optional(),
    is_active: z.boolean().optional(),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    const sb = supabaseForUser(ctx);
    const { data: roleRow } = await sb.from("user_roles").select("role").eq("user_id", ctx.getUserId()!).eq("role", "admin").maybeSingle();
    if (!roleRow) return { content: [{ type: "text", text: "Forbidden: admin role required" }], isError: true };
    const { id, ...patch } = input;
    const { data, error } = await sb.from("postings").update(patch).eq("id", id).select().single();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: { row: data } };
  },
});
