import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiTile } from "@/components/ui-kit";
import { AlertOctagon, Bug, TrendingDown } from "lucide-react";

const errs = [
  { id: "E-9421", msg: "TypeError: Cannot read properties of undefined (writer.name)", route: "/app/pipeline", count: 42, sev: "error", last: "2m ago" },
  { id: "E-9420", msg: "TimeoutError: OpenAI request > 30s", route: "/api/generate", count: 18, sev: "warn", last: "12m ago" },
  { id: "E-9418", msg: "Stripe webhook signature mismatch", route: "/api/webhooks/stripe", count: 4, sev: "error", last: "1h ago" },
  { id: "E-9412", msg: "429 from Google Search Console", route: "/api/rankings/sync", count: 92, sev: "warn", last: "Yesterday" },
];

export const Route = createFileRoute("/app/errors")({
  head: () => ({ meta: [{ title: "Error logs — SEO Studio" }, { name: "description", content: "Application error tracking." }] }),
  component: () => (
    <AppShell title="Error logs" subtitle="Grouped exceptions and rate spikes across the platform.">
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <KpiTile label="Errors (24h)" value={156} icon={AlertOctagon} accent="rose" />
        <KpiTile label="Unique issues" value={12} icon={Bug} accent="amber" />
        <KpiTile label="Error rate" value="0.24%" hint="↓ 0.08%" icon={TrendingDown} accent="emerald" />
      </div>
      <Card><Table>
        <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Message</TableHead><TableHead>Route</TableHead><TableHead>Count</TableHead><TableHead>Severity</TableHead><TableHead>Last seen</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{errs.map((e) => (
          <TableRow key={e.id}>
            <TableCell className="font-mono text-xs">{e.id}</TableCell>
            <TableCell className="font-medium max-w-md truncate">{e.msg}</TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">{e.route}</TableCell>
            <TableCell className="tabular-nums">{e.count}</TableCell>
            <TableCell><Badge variant={e.sev === "error" ? "destructive" : "secondary"}>{e.sev}</Badge></TableCell>
            <TableCell className="text-muted-foreground text-sm">{e.last}</TableCell>
            <TableCell><Button size="sm" variant="ghost">Resolve</Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></Card>
    </AppShell>
  ),
});
