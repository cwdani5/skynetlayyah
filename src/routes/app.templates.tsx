import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/templates")({
  head: () => ({ meta: [{ title: "Templates — SEO Studio" }, { name: "description", content: "Reusable prompt templates for your team." }] }),
  component: () => <ToolPage
    title="Templates"
    subtitle="Reusable prompt templates for your team."
    fields={[
      { label: "Search" },
    ]}
    output="Grid of templates appears here."
  />,
});
