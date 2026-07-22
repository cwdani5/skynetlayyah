import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/social")({
  head: () => ({ meta: [{ title: "Social Posts — SEO Studio" }, { name: "description", content: "LinkedIn, X and Instagram posts on brand." }] }),
  component: () => <ToolPage
    title="Social Posts"
    subtitle="LinkedIn, X and Instagram posts on brand."
    fields={[
      { label: "Platform" },
      { label: "Topic" },
      { label: "Tone" },
      { label: "Post notes", type: "textarea" },
    ]}
    output="Social post variations appear here."
  />,
});
