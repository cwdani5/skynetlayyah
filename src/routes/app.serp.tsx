import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const results = [
  { pos: 1, title: "Best AI SEO Tools in 2026", url: "surferseo.com/ai-tools", feat: ["FS"], words: 2840, backlinks: 412 },
  { pos: 2, title: "AI SEO Tools Ranked", url: "clearscope.io/blog/ai-seo", feat: [], words: 1980, backlinks: 306 },
  { pos: 3, title: "Top 15 AI SEO Platforms", url: "frase.io/blog/top-ai-seo", feat: ["PAA"], words: 3420, backlinks: 289 },
  { pos: 4, title: "The 2026 AI SEO Guide", url: "yourdomain.com/ai-seo", feat: [], words: 1620, backlinks: 74 },
  { pos: 5, title: "AI Content vs SEO", url: "marketmuse.com/blog/ai-seo", feat: [], words: 1240, backlinks: 158 },
];

export const Route = createFileRoute("/app/serp")({
  head: () => ({ meta: [{ title: "SERP analysis — SEO Studio" }, { name: "description", content: "Deconstruct the top ranking pages for any keyword." }] }),
  component: () => (
    <AppShell title="SERP analysis" subtitle="Reverse-engineer the top ranking pages for any keyword.">
      <Card className="mb-4"><CardContent className="p-3 flex gap-2"><Input defaultValue="ai seo tools" className="flex-1" /><Button>Analyze</Button></CardContent></Card>
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card><CardHeader><CardTitle>Top 5 for "ai seo tools"</CardTitle></CardHeader><CardContent className="p-0">
          {results.map((r) => (
            <div key={r.pos} className="flex items-start gap-3 border-b p-4 last:border-0">
              <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center shrink-0">#{r.pos}</div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{r.title}</div>
                <div className="text-xs text-emerald-600 truncate">{r.url}</div>
                <div className="mt-1 flex gap-3 text-xs text-muted-foreground tabular-nums">
                  <span>{r.words.toLocaleString()} words</span><span>·</span><span>{r.backlinks} backlinks</span>
                  {r.feat.map((f) => <Badge key={f} variant="secondary" className="ml-1 text-[10px]">{f}</Badge>)}
                </div>
              </div>
            </div>
          ))}
        </CardContent></Card>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle>Featured snippet</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">"An AI SEO tool combines large language models with search data to help writers produce content that ranks…"</CardContent></Card>
          <Card><CardHeader><CardTitle>People also ask</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">
            {["Is AI SEO worth it in 2026?", "Best free AI SEO tool?", "Does Google penalize AI content?", "How to combine AI and SEO?"].map((q) => (
              <div key={q} className="rounded-md border p-2">{q}</div>
            ))}
          </CardContent></Card>
        </div>
      </div>
    </AppShell>
  ),
});
