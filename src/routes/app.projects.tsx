import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Filter, Plus, MoreHorizontal } from "lucide-react";

const projects = [
  { n: "Q1 Content plan", s: "In progress", p: 62, d: "Feb 12", team: ["AS","ML","RN"] },
  { n: "Enterprise SEO refresh", s: "Review", p: 88, d: "Feb 20", team: ["AS","ML"] },
  { n: "Newsletter — Feb", s: "Draft", p: 34, d: "Feb 24", team: ["RN"] },
  { n: "Product page overhaul", s: "In progress", p: 45, d: "Mar 05", team: ["ML","RN"] },
  { n: "Case study — Northwind", s: "Published", p: 100, d: "Jan 22", team: ["AS"] },
];

export const Route = createFileRoute("/app/projects")({
  head: () => ({ meta: [{ title: "Projects — SEO Studio" }, { name: "description", content: "Track all your content projects." }] }),
  component: () => (
    <AppShell title="Projects" subtitle="Every campaign, brief and article in one place." actions={<Button><Plus className="h-4 w-4 mr-1.5" />New project</Button>}>
      <Card className="mb-4"><CardContent className="p-3 flex gap-2">
        <Input placeholder="Search projects…" className="flex-1" />
        <Button variant="outline"><Filter className="h-4 w-4 mr-1.5" />Filters</Button>
      </CardContent></Card>
      <Card><Table>
        <TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Status</TableHead><TableHead>Progress</TableHead><TableHead>Due</TableHead><TableHead>Team</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{projects.map((p) => (
          <TableRow key={p.n}>
            <TableCell className="font-medium">{p.n}</TableCell>
            <TableCell><Badge variant={p.s === "Published" ? "default" : "secondary"}>{p.s}</Badge></TableCell>
            <TableCell><div className="flex items-center gap-2 w-40"><Progress value={p.p} className="h-1.5" /><span className="text-xs tabular-nums text-muted-foreground">{p.p}%</span></div></TableCell>
            <TableCell className="text-muted-foreground text-sm">{p.d}</TableCell>
            <TableCell><div className="flex -space-x-1.5">{p.team.map((t)=><div key={t} className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/60 text-[10px] text-primary-foreground flex items-center justify-center ring-2 ring-background font-semibold">{t}</div>)}</div></TableCell>
            <TableCell><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></Card>
    </AppShell>
  ),
});
