import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Plus, Filter } from "lucide-react";

export const Route = createFileRoute("/app/documents")({
  head: () => ({ meta: [{ title: "Documents — SEO Studio" }, { name: "description", content: "All your documents in one place." }] }),
  component: () => (
    <AppShell title="Documents" subtitle="Every draft, brief and article — searchable." actions={<Button><Plus className="h-4 w-4 mr-1.5" />New doc</Button>}>
      <Card className="mb-4"><CardContent className="p-3 flex gap-2">
        <Input placeholder="Search documents…" className="flex-1" />
        <Button variant="outline"><Filter className="h-4 w-4 mr-1.5" />Filter</Button>
      </CardContent></Card>
      <Card><Table>
        <TableHeader><TableRow><TableHead>Title</TableHead><TableHead>Type</TableHead><TableHead>Owner</TableHead><TableHead>Words</TableHead><TableHead>Updated</TableHead></TableRow></TableHeader>
        <TableBody>{[
          ["How to launch a SaaS in 2026","Blog","Ada L.","1,842","2m ago"],
          ["Enterprise SEO checklist","Guide","Marcus L.","3,120","1h ago"],
          ["Product page overhaul brief","Brief","Rina O.","620","Yesterday"],
          ["Weekly newsletter #42","Email","Ada L.","540","3d ago"],
          ["Meta pack — homepage","Meta","Marcus L.","120","1w ago"],
        ].map(([t,ty,o,w,u]) => (
          <TableRow key={t}>
            <TableCell className="font-medium flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" />{t}</TableCell>
            <TableCell><Badge variant="secondary">{ty}</Badge></TableCell>
            <TableCell>{o}</TableCell>
            <TableCell className="tabular-nums">{w}</TableCell>
            <TableCell className="text-muted-foreground text-sm">{u}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></Card>
    </AppShell>
  ),
});
