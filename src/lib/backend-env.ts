import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const PUBLIC_BACKEND_FALLBACKS = {
  SUPABASE_URL: "https://xligygbkjeyhzspjgvxf.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_u5htHETymwflFHKf1itbIQ_6SHk3RBj",
  SUPABASE_PROJECT_ID: "xligygbkjeyhzspjgvxf",
} as const;

function readProcessEnv(key: string): string | undefined {
  try {
    if (typeof process === "undefined") return undefined;
    const value = process.env?.[key];
    return typeof value === "string" && value.length > 0 ? value : undefined;
  } catch {
    return undefined;
  }
}

function readViteEnv(key: string): string | undefined {
  const env = import.meta.env as Record<string, string | undefined> | undefined;
  const value = env?.[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export function getPublicBackendConfig() {
  const url =
    readProcessEnv("SUPABASE_URL") ??
    readProcessEnv("VITE_SUPABASE_URL") ??
    readViteEnv("VITE_SUPABASE_URL") ??
    PUBLIC_BACKEND_FALLBACKS.SUPABASE_URL;

  const key =
    readProcessEnv("SUPABASE_PUBLISHABLE_KEY") ??
    readProcessEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ??
    readViteEnv("VITE_SUPABASE_PUBLISHABLE_KEY") ??
    PUBLIC_BACKEND_FALLBACKS.SUPABASE_PUBLISHABLE_KEY;

  const projectId =
    readProcessEnv("SUPABASE_PROJECT_ID") ??
    readProcessEnv("VITE_SUPABASE_PROJECT_ID") ??
    readViteEnv("VITE_SUPABASE_PROJECT_ID") ??
    PUBLIC_BACKEND_FALLBACKS.SUPABASE_PROJECT_ID;

  return { url, key, projectId };
}

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

export function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );

    if (init?.headers) {
      new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    }

    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }

    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

export function createPublicBackendClient() {
  const { url, key } = getPublicBackendConfig();
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: { fetch: createSupabaseFetch(key) },
  });
}

export async function assertAdmin(ctx: {
  supabase: Pick<SupabaseClient<Database>, "from">;
  userId: string;
}) {
  const { data, error } = await ctx.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", ctx.userId)
    .eq("role", "admin")
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}