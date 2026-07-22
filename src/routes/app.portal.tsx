import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KpiTile } from "@/components/ui-kit";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, ClipboardList, MessageSquare, DollarSign, FileCheck2 } from "lucide-react";

export const Route = createFileRoute("/app/portal")({
  head: () => ({ meta: [{ title: "Client portal — SEO Studio" }, { name: "description", content: "Self-serve client dashboard." }] }),
  component: () => (
    <AppShell title="Client portal" subtitle="Northwind Studio · self-serve dashboard for approvals, invoices and messages." actions={<Button><Briefcase className="h-4 w-4 mr-1.5" />New order</Button>}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <KpiTile label="Open orders" value={4} icon={ClipboardList} accent="sky" />
        <KpiTile label="Pending approvals" value={2} icon={FileCheck2} accent="amber" />
        <KpiTile label="Unread messages" value={7} icon={MessageSquare} accent="primary" />
        <KpiTile label="Balance due" value="$920" icon={DollarSign} accent="rose" />
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Recent orders</CardTitle></CardHeader><CardContent className="p-0"><Table>
          <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>ETA</TableHead></TableRow></TableHeader>
          <TableBody>{[
            ["ORD-4021", "Long-form blog x3", "In writing", "Feb 20"],
            ["ORD-4020", "Landing page copy", "Approval", "Feb 18"],
            ["ORD-4019", "Product descriptions x12", "Delivered", "Feb 12"],
            ["ORD-4018", "Case study", "Revision", "Feb 22"],
          ].map(([id, t, s, e]) => (
            <TableRow key={id}><TableCell className="font-medium">{id}</TableCell><TableCell>{t}</TableCell><TableCell><Badge variant={s === "Delivered" ? "default" : s === "Revision" ? "destructive" : "secondary"}>{s}</Badge></TableCell><TableCell className="text-muted-foreground text-sm">{e}</TableCell></TableRow>
          ))}</TableBody>
        </Table></CardContent></Card>
        <Card><CardHeader><CardTitle>Approvals queue</CardTitle></CardHeader><CardContent className="space-y-3">
          {["Landing page copy — v2", "Case study — Northwind"].map((t) => (
            <div key={t} className="rounded-lg border p-3">
              <div className="text-sm font-medium">{t}</div>
              <div className="mt-1 text-xs text-muted-foreground">Waiting on your review</div>
              <div className="mt-2 flex gap-2"><Button size="sm">Approve</Button><Button size="sm" variant="outline">Request revision</Button></div>
            </div>
          ))}
        </CardContent></Card>
      </div>
    </AppShell>
  ),
});
