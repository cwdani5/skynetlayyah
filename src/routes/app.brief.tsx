import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/brief")({
  head: () => ({ meta: [{ title: "Content Brief — SEO Studio" }, { name: "description", content: "Generate briefs your writers can execute on." }] }),
  component: () => <ToolPage
    title="Content Brief"
    subtitle="Generate briefs your writers can execute on."
    fields={[
      { label: "Topic" },
      { label: "Primary keyword" },
      { label: "Word count target" },
      { label: "Notes", type: "textarea" },
    ]}
    output="Brief with audience, intent, headings and FAQs."
  />,
});
