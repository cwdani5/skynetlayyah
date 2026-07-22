import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/schema")({
  head: () => ({ meta: [{ title: "Schema Generator — SEO Studio" }, { name: "description", content: "FAQ, Article, Breadcrumb and Organization JSON-LD." }] }),
  component: () => <ToolPage
    title="Schema Generator"
    subtitle="FAQ, Article, Breadcrumb and Organization JSON-LD."
    fields={[
      { label: "URL" },
      { label: "Schema type" },
      { label: "Language" },
    ]}
    output="Generated JSON-LD schema appears here."
  />,
});
