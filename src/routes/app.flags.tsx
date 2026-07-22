import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const flags = [
  { key: "collab_editor_v2", desc: "Realtime collaborative editor v2", env: "prod", pct: 25, on: true },
  { key: "humanizer_diff_view", desc: "Before/after diff view for humanizer", env: "prod", pct: 100, on: true },
  { key: "kanban_persistence", desc: "Persist kanban board state per user", env: "prod", pct: 100, on: true },
  { key: "ai_detector_gpt5", desc: "Use GPT-5 detector model", env: "staging", pct: 50, on: true },
  { key: "wordpress_export", desc: "One-click WordPress export", env: "prod", pct: 0, on: false },
  { key: "voice_clone", desc: "Brand voice cloning", env: "dev", pct: 10, on: false },
];

export const Route = createFileRoute("/app/flags")({
  head: () => ({ meta: [{ title: "Feature flags — SEO Studio" }, { name: "description", content: "Progressive delivery flags." }] }),
  component: () => (
    <AppShell title="Feature flags" subtitle="Progressive rollout controls per environment.">
      <div className="grid gap-3">
        {flags.map((f) => (
          <Card key={f.key}><CardContent className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <code className="text-sm font-semibold">{f.key}</code>
                <Badge variant={f.env === "prod" ? "default" : f.env === "staging" ? "secondary" : "outline"}>{f.env}</Badge>
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{f.desc}</div>
            </div>
            <div className="w-40">
              <div className="flex justify-between text-xs mb-1"><span>Rollout</span><span className="tabular-nums">{f.pct}%</span></div>
              <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{ width: `${f.pct}%` }} /></div>
            </div>
            <Switch defaultChecked={f.on} />
          </CardContent></Card>
        ))}
      </div>
    </AppShell>
  ),
});
