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
  name: "list_postings",
  title: "List postings",
  description: "List active Skynet Layyah postings (jobs, admissions, or government schemes) filtered by type. Returns title, organization, location, deadline, and apply URL for each posting whose deadline is today or later.",
  inputSchema: {
    type: z.enum(["job", "admission", "scheme"]).optional().describe("Filter by posting type. Omit to return all types."),
    limit: z.number().int().min(1).max(100).optional().describe("Max rows to return (1-100). Defaults to 50."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ type, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const sb = supabaseForUser(ctx);
    const today = new Date().toISOString().slice(0, 10);
    let q = sb
      .from("postings")
      .select("id,type,title,organization,location,description,deadline,apply_url,source_url,is_featured,created_at")
      .eq("is_active", true)
      .or(`deadline.is.null,deadline.gte.${today}`)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit ?? 50);
    if (type) q = q.eq("type", type);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { items: data ?? [] },
    };
  },
});
