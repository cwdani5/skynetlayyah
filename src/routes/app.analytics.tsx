import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui-kit";
import { Badge } from "@/components/ui/badge";
import { FileText, Zap, Search, Users2 } from "lucide-react";

function Line() {
  const data = [30,42,38,55,60,52,72,68,80,76,90,85];
  const w = 600, h = 200; const max = 100;
  const pts = data.map((v,i)=>`${(i/(data.length-1))*w},${h - (v/max)*h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-52">
      <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity="0.4" /><stop offset="100%" stopColor="var(--primary)" stopOpacity="0" /></linearGradient></defs>
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill="url(#g)" />
      <polyline points={pts} fill="none" stroke="var(--primary)" strokeWidth={2.5} />
    </svg>
  );
}

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — SEO Studio" }, { name: "description", content: "Content performance and workspace analytics." }] }),
  component: () => (
    <AppShell title="Analytics" subtitle="Track content performance across your workspace.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Words / day" value="8,240" delta="↑ 14%" tone="up" icon={Zap} />
        <StatCard label="Articles / month" value="34" delta="↑ 6" tone="up" icon={FileText} />
        <StatCard label="Avg SEO" value="87" delta="↑ 4pts" tone="up" icon={Search} />
        <StatCard label="Active writers" value="8" delta="↑ 2" tone="up" icon={Users2} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Words generated</CardTitle><Badge variant="secondary">Last 12 weeks</Badge></CardHeader><CardContent><Line /></CardContent></Card>
        <Card><CardHeader><CardTitle>Top performing</CardTitle></CardHeader><CardContent><div className="space-y-3">
          {[["Enterprise SEO checklist",4200],["AI SEO tools 2026",3100],["Content humanizer guide",2400],["Blog outline templates",1900]].map(([t,v])=>(
            <div key={t as string} className="flex justify-between text-sm"><span className="truncate mr-2">{t}</span><span className="tabular-nums text-muted-foreground">{(v as number).toLocaleString()}</span></div>
          ))}
        </div></CardContent></Card>
      </div>
    </AppShell>
  ),
});
