import { createFileRoute } from "@tanstack/react-router";
import { ToolPage } from "./app.blog-generator";

export const Route = createFileRoute("/app/email")({
  head: () => ({ meta: [{ title: "Email Writer — SEO Studio" }, { name: "description", content: "Cold email, onboarding, lifecycle — all in one place." }] }),
  component: () => <ToolPage
    title="Email Writer"
    subtitle="Cold email, onboarding, lifecycle — all in one place."
    fields={[
      { label: "Recipient" },
      { label: "Goal" },
      { label: "Tone" },
      { label: "Context", type: "textarea" },
    ]}
    output="Generated email body appears here."
  />,
});
