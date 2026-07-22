import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiTile } from "@/components/ui-kit";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Users2, TrendingUp, Zap, Sparkles, ShieldCheck } from "lucide-react";

function Bars({ data, max }: { data: number[]; max: number }) {
  return (
    <div className="flex items-end gap-1.5 h-40">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary/70 to-primary/30 hover:from-primary hover:to-primary/50 transition-colors" style={{ height: `${(v / max) * 100}%` }} />
      ))}
    </div>
  );
}

export const Route = createFileRoute("/app/exec")({
  head: () => ({ meta: [{ title: "Executive analytics — SEO Studio" }, { name: "description", content: "Executive summary of business & content KPIs." }] }),
  component: () => (
    <AppShell title="Executive dashboard" subtitle="Business, content and growth KPIs at a glance.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <KpiTile label="MRR" value="$142k" hint="↑ 6.1% MoM" icon={DollarSign} accent="emerald" />
        <KpiTile label="Active users" value="4,120" hint="↑ 3.2% WoW" icon={Users2} accent="primary" />
        <KpiTile label="Articles / month" value="1,842" icon={Sparkles} accent="sky" />
        <KpiTile label="Human score" value="94%" icon={ShieldCheck} accent="amber" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Content velocity</CardTitle><Badge variant="secondary">Last 12 weeks</Badge></CardHeader><CardContent><Bars data={[30, 42, 38, 55, 60, 52, 72, 68, 80, 76, 90, 85]} max={100} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Top drivers</CardTitle></CardHeader><CardContent className="space-y-3">
          {([["Organic traffic", "+22%", TrendingUp], ["Trial → Paid", "+8%", Zap], ["Retention", "+3%", ShieldCheck]] as const).map(([l, v, I]) => (
            <div key={l} className="flex items-center gap-3 rounded-lg border p-3"><div className="rounded-lg bg-primary/10 p-2 text-primary"><I className="h-4 w-4" /></div><div className="flex-1"><div className="text-sm font-medium">{l}</div></div><div className="text-sm font-semibold text-emerald-500 tabular-nums">{v}</div></div>
          ))}
        </CardContent></Card>
      </div>
    </AppShell>
  ),
});
