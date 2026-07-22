import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ShieldCheck, Users2, TrendingUp, CreditCard, UploadCloud, GitBranch } from "lucide-react";

const feed = [
  { i: Sparkles, t: "Marcus generated 'Enterprise SEO playbook' draft (1,842 words)", u: "marcus@studio.com", w: "3m ago" },
  { i: ShieldCheck, t: "Detector: 'Q1 report' passed human check at 96%", u: "system", w: "22m ago" },
  { i: GitBranch, t: "Rina opened revision request on 'Landing page: API'", u: "rina@studio.com", w: "1h ago" },
  { i: Users2, t: "Sam joined workspace as Writer", u: "system", w: "2h ago" },
  { i: UploadCloud, t: "Exported 3 articles to WordPress (Northwind)", u: "ada@studio.com", w: "Yesterday" },
  { i: TrendingUp, t: "Weekly report is ready", u: "system", w: "Yesterday" },
  { i: CreditCard, t: "Plan upgraded → Agency", u: "tomas@northwind.co", w: "2d ago" },
];

export const Route = createFileRoute("/app/activity")({
  head: () => ({ meta: [{ title: "Activity — SEO Studio" }, { name: "description", content: "Live workspace activity feed." }] }),
  component: () => (
    <AppShell title="Workspace activity" subtitle="Everything happening across your workspace, in real time.">
      <div className="flex gap-2 mb-4">{["All", "Content", "Members", "Billing", "System"].map((t, i) => <Badge key={t} variant={i === 0 ? "default" : "secondary"} className="rounded-full cursor-pointer">{t}</Badge>)}</div>
      <Card><CardHeader><CardTitle>Timeline</CardTitle></CardHeader><CardContent><div className="relative pl-6 before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-border">
        {feed.map((n, i) => {
          const Icon = n.i;
          return (
            <div key={i} className="relative pb-5 last:pb-0">
              <div className="absolute -left-[18px] top-0 h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-4 ring-background">
                <Icon className="h-3 w-3" />
              </div>
              <div className="text-sm">{n.t}</div>
              <div className="mt-0.5 text-xs text-muted-foreground">{n.u} · {n.w}</div>
            </div>
          );
        })}
      </div></CardContent></Card>
    </AppShell>
  ),
});
