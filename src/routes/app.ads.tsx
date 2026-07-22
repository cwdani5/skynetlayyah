import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/ads")({
  head: () => ({ meta: [{ title: "Ad Copy — SEO Studio" }, { name: "description", content: "Google, Meta and LinkedIn ad variations." }] }),
  component: () => <ToolPage
    title="Ad Copy"
    subtitle="Google, Meta and LinkedIn ad variations."
    fields={[
      { label: "Platform" },
      { label: "Product" },
      { label: "Audience" },
      { label: "Offer", type: "textarea" },
    ]}
    output="Ad headlines and descriptions appear here."
  />,
});
