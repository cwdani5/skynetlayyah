import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiTile, Sparkline } from "@/components/ui-kit";
import { DollarSign, TrendingUp, RefreshCcw, Users2 } from "lucide-react";

export const Route = createFileRoute("/app/revenue")({
  head: () => ({ meta: [{ title: "Revenue — SEO Studio" }, { name: "description", content: "MRR, ARR, churn and revenue analytics." }] }),
  component: () => (
    <AppShell title="Revenue analytics" subtitle="MRR, expansion, churn and cohort revenue curves.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <KpiTile label="MRR" value="$142k" hint="↑ 6.1%" icon={DollarSign} accent="emerald" />
        <KpiTile label="ARR" value="$1.7M" hint="↑ 24% YoY" icon={TrendingUp} accent="primary" />
        <KpiTile label="Net revenue retention" value="118%" icon={RefreshCcw} accent="sky" />
        <KpiTile label="Paying customers" value="4,120" hint="↑ 62 this week" icon={Users2} accent="amber" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>MRR trend</CardTitle></CardHeader><CardContent><div className="h-40 text-primary"><Sparkline data={[70, 74, 78, 82, 88, 96, 104, 112, 118, 126, 134, 142]} height={160} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Revenue by plan</CardTitle></CardHeader><CardContent className="space-y-3">
          {[["Enterprise", 78, "$62k"], ["Agency", 55, "$44k"], ["Pro", 42, "$28k"], ["Free", 0, "$0"]].map(([plan, pct, val]) => (
            <div key={plan as string}>
              <div className="flex justify-between text-sm mb-1"><span>{plan}</span><span className="text-muted-foreground tabular-nums">{val}</span></div>
              <div className="h-2 rounded-full bg-muted overflow-hidden"><div className="h-full bg-primary" style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </CardContent></Card>
      </div>
      <Card className="mt-4"><CardHeader><CardTitle>Recent expansions</CardTitle></CardHeader><CardContent className="space-y-2">
        {[["Northwind Studio", "Pro → Agency", "+$320/mo"], ["Helix Labs", "Agency → Enterprise", "+$1,200/mo"], ["Acme Content", "Pro → Agency", "+$320/mo"]].map(([c, m, v]) => (
          <div key={c as string} className="flex items-center justify-between rounded-lg border p-3">
            <div><div className="text-sm font-medium">{c}</div><div className="text-xs text-muted-foreground">{m}</div></div>
            <Badge className="bg-emerald-500 hover:bg-emerald-500">{v}</Badge>
          </div>
        ))}
      </CardContent></Card>
    </AppShell>
  ),
});
