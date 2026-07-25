import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listPostings from "./tools/list-postings";
import createPosting from "./tools/create-posting";
import updatePosting from "./tools/update-posting";
import deletePosting from "./tools/delete-posting";

// Direct Supabase issuer — the .lovable.cloud proxy would fail the issuer
// match. VITE_SUPABASE_PROJECT_ID is inlined at build time by Vite.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "skynet-layyah-mcp",
  title: "Skynet Layyah MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Skynet Layyah postings site (jobs, university admissions, government schemes). Use list_postings to read active listings. Admin-only tools create_posting, update_posting and delete_posting manage the catalog — they succeed only for signed-in users with the admin role.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listPostings, createPosting, updatePosting, deletePosting],
});
