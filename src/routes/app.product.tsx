import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/product")({
  head: () => ({ meta: [{ title: "Product Copy — SEO Studio" }, { name: "description", content: "Convert product features into benefits-first copy." }] }),
  component: () => <ToolPage
    title="Product Copy"
    subtitle="Convert product features into benefits-first copy."
    fields={[
      { label: "Product name" },
      { label: "Category" },
      { label: "Tone" },
      { label: "Features / bullets", type: "textarea" },
    ]}
    output="Product description, bullets and short blurb appear here."
  />,
});
