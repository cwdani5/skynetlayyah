import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from "lucide-react";

const writers = [
  { r: 1, n: "Ada Lovelace", words: "128k", articles: 62, seo: 92, human: 96, streak: "18d" },
  { r: 2, n: "Marcus Lee", words: "112k", articles: 54, seo: 89, human: 94, streak: "12d" },
  { r: 3, n: "Rina Okafor", words: "94k", articles: 48, seo: 87, human: 95, streak: "9d" },
  { r: 4, n: "Sam Patel", words: "72k", articles: 36, seo: 84, human: 91, streak: "6d" },
  { r: 5, n: "Kai Nguyen", words: "48k", articles: 22, seo: 82, human: 90, streak: "4d" },
];

export const Route = createFileRoute("/app/writers")({
  head: () => ({ meta: [{ title: "Writer leaderboard — SEO Studio" }, { name: "description", content: "Top-performing writers this month." }] }),
  component: () => (
    <AppShell title="Writer leaderboard" subtitle="Top performers this month across output, SEO and human score.">
      <Card><CardHeader><CardTitle>This month</CardTitle></CardHeader><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Rank</TableHead><TableHead>Writer</TableHead><TableHead>Words</TableHead><TableHead>Articles</TableHead><TableHead>Avg SEO</TableHead><TableHead>Avg human</TableHead><TableHead>Streak</TableHead></TableRow></TableHeader>
        <TableBody>{writers.map((w) => (
          <TableRow key={w.n}>
            <TableCell><div className="flex items-center gap-2">{w.r <= 3 && <Trophy className={`h-4 w-4 ${w.r === 1 ? "text-amber-400" : w.r === 2 ? "text-slate-400" : "text-orange-500"}`} />}#{w.r}</div></TableCell>
            <TableCell className="font-medium">{w.n}</TableCell>
            <TableCell className="tabular-nums">{w.words}</TableCell>
            <TableCell className="tabular-nums">{w.articles}</TableCell>
            <TableCell><Badge variant="secondary">{w.seo}</Badge></TableCell>
            <TableCell><Badge variant="secondary">{w.human}%</Badge></TableCell>
            <TableCell className="text-muted-foreground text-sm">{w.streak}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
