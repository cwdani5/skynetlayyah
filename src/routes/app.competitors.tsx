import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiTile, Sparkline } from "@/components/ui-kit";
import { Radar, TrendingUp, TrendingDown, Search } from "lucide-react";

const comps = [
  { d: "surferseo.com", auth: 74, keywords: "142k", overlap: "31%", trend: [40, 42, 45, 48, 47, 52, 55, 60] },
  { d: "clearscope.io", auth: 68, keywords: "88k", overlap: "24%", trend: [30, 32, 31, 34, 38, 40, 43, 46] },
  { d: "frase.io", auth: 71, keywords: "121k", overlap: "28%", trend: [50, 48, 52, 55, 54, 58, 61, 62] },
  { d: "marketmuse.com", auth: 66, keywords: "72k", overlap: "18%", trend: [22, 24, 26, 25, 28, 30, 32, 31] },
];

export const Route = createFileRoute("/app/competitors")({
  head: () => ({ meta: [{ title: "Competitors — SEO Studio" }, { name: "description", content: "Competitor analysis and share of voice." }] }),
  component: () => (
    <AppShell title="Competitor analysis" subtitle="Track authority, keyword overlap and SoV against your rivals." actions={<Button><Radar className="h-4 w-4 mr-1.5" />Add competitor</Button>}>
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <KpiTile label="Tracked competitors" value={comps.length} icon={Radar} />
        <KpiTile label="Avg authority" value={Math.round(comps.reduce((s, c) => s + c.auth, 0) / comps.length)} icon={TrendingUp} accent="emerald" />
        <KpiTile label="Your rank" value="#3" hint="in tracked set" icon={TrendingDown} accent="amber" />
      </div>
      <Card className="mb-4"><CardContent className="p-3"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Add competitor domain…" className="pl-9" /></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Landscape</CardTitle></CardHeader><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Domain</TableHead><TableHead>Authority</TableHead><TableHead>Keywords</TableHead><TableHead>Overlap</TableHead><TableHead>Trend</TableHead></TableRow></TableHeader>
        <TableBody>{comps.map((c) => (
          <TableRow key={c.d}>
            <TableCell className="font-medium">{c.d}</TableCell>
            <TableCell><Badge variant="secondary">{c.auth}</Badge></TableCell>
            <TableCell className="tabular-nums">{c.keywords}</TableCell>
            <TableCell className="tabular-nums">{c.overlap}</TableCell>
            <TableCell><div className="w-32"><Sparkline data={c.trend} /></div></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
