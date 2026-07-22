import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/landing")({
  head: () => ({ meta: [{ title: "Landing Pages — SEO Studio" }, { name: "description", content: "Hero, features and CTA copy for landing pages." }] }),
  component: () => <ToolPage
    title="Landing Pages"
    subtitle="Hero, features and CTA copy for landing pages."
    fields={[
      { label: "Product" },
      { label: "Audience" },
      { label: "Style" },
      { label: "Positioning", type: "textarea" },
    ]}
    output="Landing page copy sections appear here."
  />,
});
