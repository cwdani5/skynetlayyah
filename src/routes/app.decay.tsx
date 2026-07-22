import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiTile } from "@/components/ui-kit";
import { Timer, AlertTriangle, RefreshCw } from "lucide-react";

const decay = [
  { url: "/blog/ai-seo-2024", drop: -42, pos: 14, prev: 4, updated: "18 months ago", risk: "High" },
  { url: "/blog/keyword-research-guide", drop: -28, pos: 9, prev: 4, updated: "14 months ago", risk: "Medium" },
  { url: "/blog/content-brief-template", drop: -18, pos: 6, prev: 3, updated: "11 months ago", risk: "Medium" },
  { url: "/blog/wordpress-seo-plugins", drop: -12, pos: 15, prev: 11, updated: "9 months ago", risk: "Low" },
];

export const Route = createFileRoute("/app/decay")({
  head: () => ({ meta: [{ title: "Content decay — SEO Studio" }, { name: "description", content: "Monitor pages losing rankings and traffic." }] }),
  component: () => (
    <AppShell title="Content decay monitor" subtitle="Refresh pages before rankings and traffic decay hurts revenue." actions={<Button><RefreshCw className="h-4 w-4 mr-1.5" />Re-scan</Button>}>
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <KpiTile label="At-risk pages" value={decay.length} icon={AlertTriangle} accent="rose" />
        <KpiTile label="Avg age" value="13mo" icon={Timer} accent="amber" />
        <KpiTile label="Traffic lost (30d)" value="-24%" icon={Timer} accent="rose" />
      </div>
      <Card><CardHeader><CardTitle>Pages to refresh</CardTitle></CardHeader><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>URL</TableHead><TableHead>Traffic Δ</TableHead><TableHead>Position</TableHead><TableHead>Last updated</TableHead><TableHead>Risk</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{decay.map((d) => (
          <TableRow key={d.url}>
            <TableCell className="font-mono text-xs">{d.url}</TableCell>
            <TableCell className="text-rose-500 tabular-nums">{d.drop}%</TableCell>
            <TableCell className="tabular-nums">#{d.pos} <span className="text-xs text-muted-foreground">(was #{d.prev})</span></TableCell>
            <TableCell className="text-muted-foreground text-sm">{d.updated}</TableCell>
            <TableCell><Badge variant={d.risk === "High" ? "destructive" : d.risk === "Medium" ? "secondary" : "outline"}>{d.risk}</Badge></TableCell>
            <TableCell><Button size="sm" variant="ghost">Refresh</Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
