import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/meta")({
  head: () => ({ meta: [{ title: "Meta Generator — SEO Studio" }, { name: "description", content: "SEO titles, descriptions and slugs in one click." }] }),
  component: () => <ToolPage
    title="Meta Generator"
    subtitle="SEO titles, descriptions and slugs in one click."
    fields={[
      { label: "URL" },
      { label: "Primary keyword" },
      { label: "Tone" },
      { label: "Notes", type: "textarea" },
    ]}
    output="Generated meta pack: title, description, slug, OG tags, Twitter card."
  />,
});
