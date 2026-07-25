import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/bootstrap-admin")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const email = "skynetadmin@gmail.com";
        const password = "Skynetadmin123@";

        // Check if user exists
        let userId: string | undefined;
        const { data: list } = await supabaseAdmin.auth.admin.listUsers();
        const existing = list?.users?.find((u) => u.email === email);
        if (existing) {
          userId = existing.id;
          await supabaseAdmin.auth.admin.updateUserById(userId, { password, email_confirm: true });
        } else {
          const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
          });
          if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
          userId = data.user?.id;
        }

        if (!userId) return new Response(JSON.stringify({ error: "no user id" }), { status: 500 });

        // Assign admin role
        const { error: roleErr } = await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: userId, role: "admin" }, { onConflict: "user_id,role" });
        if (roleErr) return new Response(JSON.stringify({ error: roleErr.message }), { status: 500 });

        return new Response(JSON.stringify({ ok: true, userId }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
