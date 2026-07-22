import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { StatCard, Section, ProgressRing } from "@/components/ui-kit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileText, Sparkles, Search, ShieldCheck, TrendingUp, Zap, Clock, Users2, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SEO Studio" }, { name: "description", content: "Your content performance at a glance." }] }),
  component: DashboardPage,
});

const spark = [12, 20, 14, 26, 22, 32, 28, 38, 30, 45, 40, 52];

function Sparkline({ data, color = "var(--primary)" }: { data: number[]; color?: string }) {
  const max = Math.max(...data); const min = Math.min(...data);
  const w = 120, h = 36;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth={2} points={pts} />
      <polyline fill={color} opacity={0.1} points={`0,${h} ${pts} ${w},${h}`} />
    </svg>
  );
}

function BarChart() {
  const bars = [40, 55, 35, 70, 60, 82, 68, 90, 78, 96, 84, 100];
  const labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return (
    <div>
      <div className="flex items-end gap-2 h-52">
        {bars.map((b, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full rounded-t-md bg-gradient-to-t from-primary/80 to-primary transition-all hover:opacity-80" style={{ height: `${b}%` }} />
            <div className="text-[10px] text-muted-foreground">{labels[i]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <AppShell
      title="Good morning, Ada"
      subtitle="Here's what's happening across your workspace today."
      actions={<><Button variant="outline">Export</Button><Button><Sparkles className="h-4 w-4 mr-1.5" />New project</Button></>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total articles" value="248" delta="↑ 12% vs last month" tone="up" icon={FileText} />
        <StatCard label="Words generated" value="1.24M" delta="↑ 8.2% MoM" tone="up" icon={Zap} />
        <StatCard label="Avg SEO score" value="87" delta="↑ 4 pts" tone="up" icon={Search} />
        <StatCard label="Human score" value="94%" delta="↓ 1.2%" tone="down" icon={ShieldCheck} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle>Content velocity</CardTitle><p className="text-xs text-muted-foreground mt-1">Words generated per month</p></div>
            <Badge variant="secondary">Last 12 months</Badge>
          </CardHeader>
          <CardContent><BarChart /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Monthly credits</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <ProgressRing value={72} label="Used" />
            <div className="w-full text-center text-sm">
              <div className="font-medium">36,240 / 50,000</div>
              <div className="text-xs text-muted-foreground">Resets in 12 days</div>
            </div>
            <Button size="sm" className="w-full">Upgrade plan</Button>
          </CardContent>
        </Card>
      </div>

      <Section title="Recent projects" description="Continue where you left off" actions={<Button variant="ghost" size="sm">View all <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></Button>}>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead><TableHead>Status</TableHead><TableHead>SEO</TableHead>
                <TableHead>Human</TableHead><TableHead>Words</TableHead><TableHead>Updated</TableHead><TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { n: "How to launch a SaaS in 2026", s: "In review", seo: 92, h: 96, w: "1,842", u: "2m ago" },
                { n: "10 best keyword research tools", s: "Draft", seo: 78, h: 88, w: "980", u: "1h ago" },
                { n: "Enterprise SEO checklist", s: "Published", seo: 95, h: 92, w: "3,120", u: "Yesterday" },
                { n: "Product page rewrite — Q1", s: "In review", seo: 84, h: 91, w: "620", u: "2d ago" },
                { n: "Weekly newsletter #42", s: "Published", seo: 71, h: 97, w: "540", u: "3d ago" },
              ].map((r) => (
                <TableRow key={r.n}>
                  <TableCell className="font-medium">{r.n}</TableCell>
                  <TableCell><Badge variant={r.s === "Published" ? "default" : "secondary"}>{r.s}</Badge></TableCell>
                  <TableCell><div className="flex items-center gap-2"><Progress value={r.seo} className="w-16 h-1.5" /><span className="tabular-nums text-xs">{r.seo}</span></div></TableCell>
                  <TableCell><span className="tabular-nums text-xs">{r.h}%</span></TableCell>
                  <TableCell className="tabular-nums">{r.w}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{r.u}</TableCell>
                  <TableCell><Sparkline data={spark} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
          <CardContent>
            <ol className="relative border-l ml-2 space-y-4">
              {[
                { i: Sparkles, t: "Marcus generated a 1,800-word blog", w: "2 minutes ago" },
                { i: ShieldCheck, t: "Detector: 'Q1 report' passed human check (96%)", w: "12 min ago" },
                { i: Search, t: "SEO Studio scan bumped 'launch guide' to 92", w: "1 hour ago" },
                { i: Users2, t: "Rina joined the workspace as Editor", w: "Yesterday" },
                { i: TrendingUp, t: "Weekly report ready for review", w: "2 days ago" },
              ].map((a, i) => (
                <li key={i} className="ml-4">
                  <span className="absolute -left-[7px] flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary/20 ring-4 ring-background"><span className="h-1.5 w-1.5 rounded-full bg-primary" /></span>
                  <div className="flex items-start gap-2">
                    <a.i className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div><div className="text-sm">{a.t}</div><div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="h-3 w-3" />{a.w}</div></div>
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Top keywords</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { k: "ai seo tools", v: 24800, d: 62 }, { k: "content humanizer", v: 12500, d: 41 },
                { k: "ai detector", v: 41300, d: 78 }, { k: "blog outline generator", v: 6200, d: 28 },
                { k: "keyword clustering", v: 3900, d: 34 },
              ].map((r) => (
                <div key={r.k} className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{r.k}</div>
                    <Progress value={r.d} className="h-1.5 mt-1.5" />
                  </div>
                  <div className="text-right text-xs tabular-nums text-muted-foreground w-16">{r.v.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
