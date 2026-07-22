import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";

function ToolPage({ title, subtitle, fields, output }: {
  title: string; subtitle: string; fields: { label: string; placeholder?: string; type?: "input" | "textarea" }[]; output: string;
}) {
  return (
    <AppShell title={title} subtitle={subtitle} actions={<Button><Sparkles className="h-4 w-4 mr-1.5" />Generate</Button>}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Inputs</CardTitle></CardHeader><CardContent className="space-y-4">
          {fields.map((f) => (
            <div key={f.label} className="space-y-1.5"><Label>{f.label}</Label>
              {f.type === "textarea" ? <Textarea rows={5} placeholder={f.placeholder} /> : <Input placeholder={f.placeholder} />}
            </div>
          ))}
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Output</CardTitle></CardHeader><CardContent>
          <div className="min-h-[380px] rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">{output}</div>
        </CardContent></Card>
      </div>
    </AppShell>
  );
}
export { ToolPage };

export const Route = createFileRoute("/app/blog-generator")({
  head: () => ({ meta: [{ title: "Blog Generator — SEO Studio" }, { name: "description", content: "Generate SEO-optimized blog articles." }] }),
  component: () => <ToolPage
    title="Blog Generator"
    subtitle="Generate long-form, SEO-optimized blog articles in seconds."
    fields={[
      { label: "Title" }, { label: "Primary keyword" },
      { label: "Target audience" }, { label: "Tone" },
      { label: "Notes", type: "textarea", placeholder: "Anything the writer should know…" },
    ]}
    output="Generated blog draft will appear here."
  />,
});
