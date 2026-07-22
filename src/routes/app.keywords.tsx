import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, TrendingUp } from "lucide-react";

const rows = [
  ["ai seo tools", 24800, 62, "$4.20", "High", "↑"],
  ["ai content humanizer", 12500, 41, "$2.10", "Medium", "↑"],
  ["ai detector free", 41300, 78, "$1.80", "High", "↑"],
  ["blog outline generator", 6200, 28, "$1.40", "Low", "→"],
  ["keyword clustering tool", 3900, 34, "$3.60", "Medium", "↑"],
  ["surfer seo alternatives", 8100, 55, "$5.20", "High", "↑"],
  ["ai writer for saas", 2800, 22, "$3.90", "Low", "→"],
  ["content brief template", 5400, 18, "$1.10", "Low", "↑"],
];

export const Route = createFileRoute("/app/keywords")({
  head: () => ({ meta: [{ title: "Keyword Research — SEO Studio" }, { name: "description", content: "Discover, cluster and prioritize keywords." }] }),
  component: () => (
    <AppShell title="Keyword Research" subtitle="Find keywords worth ranking for." actions={<Button>Export CSV</Button>}>
      <Card className="mb-4"><CardContent className="p-4 flex gap-3">
        <Input placeholder="Seed keyword" className="flex-1" defaultValue="ai seo tools" />
        <Input placeholder="Location" className="w-32" defaultValue="US" />
        <Button><Search className="h-4 w-4 mr-1.5" />Research</Button>
      </CardContent></Card>
      <div className="grid gap-4 md:grid-cols-4 mb-4">
        {[["Total keywords",128],["Avg volume,","8.4k"],["Avg difficulty",44],["Clusters",12]].map(([k,v])=>(
          <Card key={k as string}><CardContent className="p-5"><div className="text-xs uppercase tracking-widest text-muted-foreground">{k}</div><div className="mt-2 text-2xl font-semibold">{v}</div></CardContent></Card>
        ))}
      </div>
      <Card><Table>
        <TableHeader><TableRow><TableHead>Keyword</TableHead><TableHead>Volume</TableHead><TableHead>Difficulty</TableHead><TableHead>CPC</TableHead><TableHead>Competition</TableHead><TableHead>Trend</TableHead></TableRow></TableHeader>
        <TableBody>{rows.map(([k,v,d,cpc,comp,t])=>(
          <TableRow key={k as string}>
            <TableCell className="font-medium">{k}</TableCell>
            <TableCell className="tabular-nums">{(v as number).toLocaleString()}</TableCell>
            <TableCell><Badge variant={(d as number) > 60 ? "destructive" : (d as number) > 40 ? "secondary" : "default"}>{d}</Badge></TableCell>
            <TableCell className="tabular-nums">{cpc}</TableCell>
            <TableCell>{comp}</TableCell>
            <TableCell className="text-emerald-500 flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5" />{t}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></Card>
    </AppShell>
  ),
});
