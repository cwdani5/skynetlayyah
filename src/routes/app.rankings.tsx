import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sparkline, KpiTile } from "@/components/ui-kit";
import { TrendingUp, TrendingDown, Trophy } from "lucide-react";

const ranks = [
  { kw: "ai seo tools", pos: 3, prev: 5, vol: "12k", trend: [8, 7, 6, 6, 5, 4, 3, 3] },
  { kw: "humanize ai text", pos: 1, prev: 2, vol: "22k", trend: [5, 4, 3, 3, 2, 2, 1, 1] },
  { kw: "ai content detector", pos: 6, prev: 4, vol: "18k", trend: [3, 4, 4, 5, 5, 6, 6, 6] },
  { kw: "content brief generator", pos: 2, prev: 3, vol: "3.6k", trend: [6, 5, 4, 4, 3, 3, 2, 2] },
  { kw: "seo optimizer", pos: 11, prev: 14, vol: "9.9k", trend: [18, 16, 15, 14, 13, 12, 11, 11] },
];

export const Route = createFileRoute("/app/rankings")({
  head: () => ({ meta: [{ title: "Rank tracker — SEO Studio" }, { name: "description", content: "Daily rank tracking for your target keywords." }] }),
  component: () => (
    <AppShell title="Rank tracker" subtitle="Daily positions for your target keywords.">
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <KpiTile label="Top-3 keywords" value={ranks.filter(r => r.pos <= 3).length} icon={Trophy} accent="emerald" />
        <KpiTile label="Improved" value={ranks.filter(r => r.pos < r.prev).length} icon={TrendingUp} />
        <KpiTile label="Declined" value={ranks.filter(r => r.pos > r.prev).length} icon={TrendingDown} accent="rose" />
      </div>
      <Card><CardHeader><CardTitle>Tracked keywords</CardTitle></CardHeader><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Keyword</TableHead><TableHead>Position</TableHead><TableHead>Change</TableHead><TableHead>Volume</TableHead><TableHead>Trend (30d)</TableHead></TableRow></TableHeader>
        <TableBody>{ranks.map((r) => {
          const delta = r.prev - r.pos;
          return (
            <TableRow key={r.kw}>
              <TableCell className="font-medium">{r.kw}</TableCell>
              <TableCell><Badge variant={r.pos <= 3 ? "default" : r.pos <= 10 ? "secondary" : "outline"}>#{r.pos}</Badge></TableCell>
              <TableCell className={delta > 0 ? "text-emerald-500" : delta < 0 ? "text-rose-500" : "text-muted-foreground"}>{delta > 0 ? `↑${delta}` : delta < 0 ? `↓${-delta}` : "—"}</TableCell>
              <TableCell className="tabular-nums">{r.vol}</TableCell>
              <TableCell><div className="w-40"><Sparkline data={r.trend} /></div></TableCell>
            </TableRow>
          );
        })}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
