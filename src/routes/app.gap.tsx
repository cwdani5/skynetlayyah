import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiTile } from "@/components/ui-kit";
import { Network, Sparkles } from "lucide-react";

const gaps = [
  { kw: "ai content workflow", vol: "4,900", diff: 32, competitors: 3 },
  { kw: "content decay monitor", vol: "1,200", diff: 24, competitors: 2 },
  { kw: "topical authority map", vol: "820", diff: 41, competitors: 4 },
  { kw: "seo content brief template", vol: "3,600", diff: 38, competitors: 4 },
  { kw: "programmatic seo saas", vol: "2,100", diff: 46, competitors: 3 },
];

export const Route = createFileRoute("/app/gap")({
  head: () => ({ meta: [{ title: "Content gap — SEO Studio" }, { name: "description", content: "Keywords your competitors rank for but you don't." }] }),
  component: () => (
    <AppShell title="Content & keyword gap" subtitle="Rankings your competitors capture that you're leaving on the table.">
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <KpiTile label="Gap opportunities" value={gaps.length} icon={Network} />
        <KpiTile label="Avg volume" value="2.5k" hint="monthly searches" icon={Network} accent="emerald" />
        <KpiTile label="Avg difficulty" value={Math.round(gaps.reduce((s, g) => s + g.diff, 0) / gaps.length)} icon={Network} accent="amber" />
      </div>
      <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Missed keywords</CardTitle><Button size="sm"><Sparkles className="h-4 w-4 mr-1.5" />Generate briefs</Button></CardHeader>
        <CardContent className="p-0"><Table>
          <TableHeader><TableRow><TableHead>Keyword</TableHead><TableHead>Volume</TableHead><TableHead>Difficulty</TableHead><TableHead>Competitors ranking</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>{gaps.map((g) => (
            <TableRow key={g.kw}>
              <TableCell className="font-medium">{g.kw}</TableCell>
              <TableCell className="tabular-nums">{g.vol}</TableCell>
              <TableCell><Badge variant={g.diff < 30 ? "default" : g.diff < 45 ? "secondary" : "destructive"}>{g.diff}</Badge></TableCell>
              <TableCell className="tabular-nums">{g.competitors} / 4</TableCell>
              <TableCell><Button size="sm" variant="ghost">Add to plan</Button></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table></CardContent>
      </Card>
    </AppShell>
  ),
});
