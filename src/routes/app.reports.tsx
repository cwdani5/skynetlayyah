import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Calendar } from "lucide-react";

const reports = [
  { name: "Weekly summary — W07", period: "Feb 10 – Feb 16", articles: 42, words: "58k", seo: 87, status: "Ready" },
  { name: "Weekly summary — W06", period: "Feb 03 – Feb 09", articles: 38, words: "52k", seo: 84, status: "Ready" },
  { name: "Monthly report — January", period: "Jan 01 – Jan 31", articles: 168, words: "224k", seo: 82, status: "Ready" },
  { name: "Annual report — 2025", period: "Jan 01 – Dec 31", articles: 1842, words: "2.4M", seo: 81, status: "Ready" },
  { name: "Weekly summary — W08", period: "Feb 17 – Feb 23", articles: 12, words: "18k", seo: 89, status: "Generating" },
];

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — SEO Studio" }, { name: "description", content: "Weekly, monthly and annual reports." }] }),
  component: () => (
    <AppShell title="Reports" subtitle="Auto-generated weekly, monthly and annual reports." actions={<Button><Calendar className="h-4 w-4 mr-1.5" />Schedule</Button>}>
      <Card><CardHeader><CardTitle>Recent reports</CardTitle></CardHeader><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Report</TableHead><TableHead>Period</TableHead><TableHead>Articles</TableHead><TableHead>Words</TableHead><TableHead>Avg SEO</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{reports.map((r) => (
          <TableRow key={r.name}>
            <TableCell className="font-medium">{r.name}</TableCell>
            <TableCell className="text-muted-foreground text-sm">{r.period}</TableCell>
            <TableCell className="tabular-nums">{r.articles}</TableCell>
            <TableCell className="tabular-nums">{r.words}</TableCell>
            <TableCell className="tabular-nums">{r.seo}</TableCell>
            <TableCell><Badge variant={r.status === "Ready" ? "default" : "secondary"}>{r.status}</Badge></TableCell>
            <TableCell>{r.status === "Ready" && <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
