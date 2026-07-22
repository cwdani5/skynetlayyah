import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiTile } from "@/components/ui-kit";
import { invoices } from "@/lib/mock/enterprise";
import { DollarSign, Clock, CheckCircle2, Download, CreditCard } from "lucide-react";

export const Route = createFileRoute("/app/invoices")({
  head: () => ({ meta: [{ title: "Invoices — SEO Studio" }, { name: "description", content: "Client invoices and payments." }] }),
  component: () => (
    <AppShell title="Invoices & payments" subtitle="Send invoices, take payments, track outstanding balance." actions={<Button><CreditCard className="h-4 w-4 mr-1.5" />New invoice</Button>}>
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <KpiTile label="Paid this month" value="$6,000" icon={CheckCircle2} accent="emerald" />
        <KpiTile label="Outstanding" value="$920" icon={Clock} accent="amber" />
        <KpiTile label="Lifetime revenue" value="$142k" icon={DollarSign} accent="primary" />
      </div>
      <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Invoices</CardTitle><Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Export</Button></CardHeader>
        <CardContent className="p-0"><Table>
          <TableHeader><TableRow><TableHead>Invoice</TableHead><TableHead>Client</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Due</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>{invoices.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell className="font-medium">{inv.id}</TableCell>
              <TableCell>{inv.client}</TableCell>
              <TableCell className="tabular-nums">{inv.amount}</TableCell>
              <TableCell><Badge variant={inv.status === "Paid" ? "default" : inv.status === "Overdue" ? "destructive" : "secondary"}>{inv.status}</Badge></TableCell>
              <TableCell className="text-muted-foreground text-sm">{inv.due}</TableCell>
              <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table></CardContent>
      </Card>
    </AppShell>
  ),
});
