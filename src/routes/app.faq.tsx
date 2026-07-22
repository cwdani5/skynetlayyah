import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/faq")({
  head: () => ({ meta: [{ title: "FAQ Generator — SEO Studio" }, { name: "description", content: "Generate FAQ blocks tuned for featured snippets." }] }),
  component: () => <ToolPage
    title="FAQ Generator"
    subtitle="Generate FAQ blocks tuned for featured snippets."
    fields={[
      { label: "Topic" },
      { label: "Audience" },
      { label: "Count" },
      { label: "Notes", type: "textarea" },
    ]}
    output="Generated FAQ items appear here."
  />,
});
