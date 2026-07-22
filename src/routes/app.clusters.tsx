import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const clusters = [
  { pillar: "AI SEO Tools", spokes: ["ai seo software", "best ai seo tools", "ai seo platform", "surferseo alternatives", "clearscope alternatives"] },
  { pillar: "Content Humanizer", spokes: ["humanize ai text", "ai to human converter", "bypass ai detector", "make ai content undetectable"] },
  { pillar: "Keyword Research", spokes: ["long tail keywords", "keyword clustering", "keyword difficulty", "search intent analysis"] },
  { pillar: "Technical SEO", spokes: ["schema markup", "canonical urls", "core web vitals", "internal linking strategy"] },
];

export const Route = createFileRoute("/app/clusters")({
  head: () => ({ meta: [{ title: "Topic clusters — SEO Studio" }, { name: "description", content: "Pillar-and-spoke topical authority map." }] }),
  component: () => (
    <AppShell title="Topic clusters & authority map" subtitle="Pillar-and-spoke structure for topical authority.">
      <div className="grid gap-4 md:grid-cols-2">
        {clusters.map((c) => (
          <Card key={c.pillar}>
            <CardHeader><CardTitle className="text-base">{c.pillar}</CardTitle></CardHeader>
            <CardContent>
              <div className="relative py-6">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold text-center px-2">Pillar</div>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {c.spokes.map((s) => <Badge key={s} variant="secondary" className="cursor-pointer">{s}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AppShell>
  ),
});
