import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiTile } from "@/components/ui-kit";
import { CreditCard, TrendingUp, RefreshCcw, XCircle } from "lucide-react";

const subs = [
  { user: "tomas@northwind.co", plan: "Agency", seats: 12, mrr: "$320", renews: "Feb 28", status: "Active" },
  { user: "ada@studio.com", plan: "Pro", seats: 3, mrr: "$60", renews: "Feb 22", status: "Active" },
  { user: "helix@labs.io", plan: "Enterprise", seats: 40, mrr: "$1,600", renews: "Mar 12", status: "Active" },
  { user: "sam@brightpath.co", plan: "Pro", seats: 1, mrr: "$20", renews: "Feb 15", status: "Past due" },
  { user: "old@user.com", plan: "Pro", seats: 1, mrr: "$0", renews: "—", status: "Canceled" },
];

export const Route = createFileRoute("/app/subscriptions")({
  head: () => ({ meta: [{ title: "Subscriptions — SEO Studio" }, { name: "description", content: "Manage all customer subscriptions." }] }),
  component: () => (
    <AppShell title="Subscriptions" subtitle="Manage all customer subscriptions and billing state.">
      <div className="grid gap-4 sm:grid-cols-4 mb-6">
        <KpiTile label="Active subs" value="4,120" icon={CreditCard} accent="emerald" />
        <KpiTile label="New this month" value={186} icon={TrendingUp} accent="primary" />
        <KpiTile label="Past due" value={42} icon={RefreshCcw} accent="amber" />
        <KpiTile label="Canceled (30d)" value={38} icon={XCircle} accent="rose" />
      </div>
      <Card><Table>
        <TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Plan</TableHead><TableHead>Seats</TableHead><TableHead>MRR</TableHead><TableHead>Renews</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{subs.map((s) => (
          <TableRow key={s.user}>
            <TableCell className="font-medium">{s.user}</TableCell>
            <TableCell><Badge variant="secondary">{s.plan}</Badge></TableCell>
            <TableCell className="tabular-nums">{s.seats}</TableCell>
            <TableCell className="tabular-nums">{s.mrr}</TableCell>
            <TableCell className="text-muted-foreground text-sm">{s.renews}</TableCell>
            <TableCell><Badge variant={s.status === "Active" ? "default" : s.status === "Past due" ? "secondary" : "destructive"}>{s.status}</Badge></TableCell>
            <TableCell><Button size="sm" variant="ghost">Manage</Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></Card>
    </AppShell>
  ),
});
