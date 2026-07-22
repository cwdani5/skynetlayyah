import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, FileCode, FileType2, Globe, Notebook, Layers, CheckCircle2 } from "lucide-react";

const destinations = [
  { i: FileType2, n: "Microsoft Word", desc: ".docx with styles preserved", connected: true },
  { i: FileText, n: "PDF", desc: "Print-ready, branded template", connected: true },
  { i: FileCode, n: "Markdown", desc: ".md with front-matter", connected: true },
  { i: Globe, n: "HTML", desc: "Standalone HTML file", connected: true },
  { i: FileText, n: "Google Docs", desc: "Push directly to a shared folder", connected: false },
  { i: Globe, n: "WordPress", desc: "Publish or save as draft", connected: true },
  { i: Notebook, n: "Notion", desc: "New page in a chosen database", connected: false },
  { i: Layers, n: "Contentful", desc: "Create or update entry", connected: false },
];

const history = [
  { article: "Enterprise SEO playbook 2026", dest: "WordPress", when: "2m ago", status: "Success" },
  { article: "Landing page: API for content", dest: "Google Docs", when: "1h ago", status: "Success" },
  { article: "Q1 Content plan", dest: "PDF", when: "3h ago", status: "Success" },
  { article: "Case study — Northwind", dest: "Notion", when: "Yesterday", status: "Failed" },
];

export const Route = createFileRoute("/app/exports")({
  head: () => ({ meta: [{ title: "Exports — SEO Studio" }, { name: "description", content: "Push content to Word, PDF, WordPress, Notion and more." }] }),
  component: () => (
    <AppShell title="Exports" subtitle="Push finished articles to your destination of choice.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {destinations.map((d) => {
          const Icon = d.i;
          return (
            <Card key={d.n} className="hover:border-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-primary/10 p-2.5 text-primary"><Icon className="h-5 w-5" /></div>
                  {d.connected ? <Badge className="bg-emerald-500 hover:bg-emerald-500 text-[10px]"><CheckCircle2 className="h-3 w-3 mr-1" />Connected</Badge> : <Badge variant="outline" className="text-[10px]">Connect</Badge>}
                </div>
                <div className="mt-3 font-medium text-sm">{d.n}</div>
                <div className="mt-1 text-xs text-muted-foreground">{d.desc}</div>
                <Button size="sm" variant="outline" className="mt-3 w-full">{d.connected ? "Export" : "Connect"}</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card><CardHeader><CardTitle>Export history</CardTitle></CardHeader><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Article</TableHead><TableHead>Destination</TableHead><TableHead>When</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
        <TableBody>{history.map((h, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{h.article}</TableCell>
            <TableCell>{h.dest}</TableCell>
            <TableCell className="text-muted-foreground text-sm">{h.when}</TableCell>
            <TableCell><Badge variant={h.status === "Success" ? "default" : "destructive"}>{h.status}</Badge></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
