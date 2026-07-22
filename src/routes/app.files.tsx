import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Folder, FileText, Image as ImageIcon, Star, Clock, Users2, Trash2, Upload, Search } from "lucide-react";

const nav = [
  { i: Folder, l: "All files", n: 348, active: true },
  { i: Star, l: "Favorites", n: 12 },
  { i: Clock, l: "Recent", n: 24 },
  { i: Users2, l: "Shared with me", n: 41 },
  { i: Trash2, l: "Trash", n: 7 },
];
const rows = [
  { i: Folder, n: "Client — Northwind", tags: ["client"], size: "—", modified: "2m ago" },
  { i: Folder, n: "Brand assets", tags: ["brand"], size: "—", modified: "1h ago" },
  { i: FileText, n: "Q1 Content plan.docx", tags: ["plan"], size: "1.2 MB", modified: "3h ago" },
  { i: ImageIcon, n: "hero-cover.png", tags: ["asset"], size: "412 KB", modified: "Yesterday" },
  { i: FileText, n: "Enterprise SEO playbook.md", tags: ["draft"], size: "84 KB", modified: "2d ago" },
];

export const Route = createFileRoute("/app/files")({
  head: () => ({ meta: [{ title: "File manager — SEO Studio" }, { name: "description", content: "Team file storage with folders, tags, favorites and trash." }] }),
  component: () => (
    <AppShell title="File manager" subtitle="Folders, tags, favorites, shared files and trash." actions={<Button><Upload className="h-4 w-4 mr-1.5" />Upload</Button>}>
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        <Card><CardContent className="p-2">
          {nav.map((n) => {
            const Icon = n.i;
            return (
              <button key={n.l} className={`w-full flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted ${n.active ? "bg-muted font-medium" : ""}`}>
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-left">{n.l}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{n.n}</span>
              </button>
            );
          })}
        </CardContent></Card>
        <div>
          <Card className="mb-4"><CardContent className="p-3 flex gap-2">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search files…" className="pl-9" /></div>
            <Button variant="outline">Bulk actions</Button>
          </CardContent></Card>
          <Card><Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Tags</TableHead><TableHead>Size</TableHead><TableHead>Modified</TableHead></TableRow></TableHeader>
            <TableBody>{rows.map((r) => {
              const Icon = r.i;
              return (
                <TableRow key={r.n} className="cursor-pointer">
                  <TableCell className="font-medium"><div className="flex items-center gap-2"><Icon className="h-4 w-4 text-muted-foreground" />{r.n}</div></TableCell>
                  <TableCell>{r.tags.map((t) => <Badge key={t} variant="secondary" className="mr-1 text-[10px]">{t}</Badge>)}</TableCell>
                  <TableCell className="tabular-nums">{r.size}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{r.modified}</TableCell>
                </TableRow>
              );
            })}</TableBody>
          </Table></Card>
        </div>
      </div>
    </AppShell>
  ),
});
