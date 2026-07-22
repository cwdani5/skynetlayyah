import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Filter, Plus } from "lucide-react";

const orders = [
  { id: "ORD-4021", client: "Northwind", type: "Long-form blog x3", status: "In writing", priority: "P1", eta: "Feb 20", value: "$1,200" },
  { id: "ORD-4020", client: "Acme", type: "Landing page copy", status: "Approval", priority: "P0", eta: "Feb 18", value: "$650" },
  { id: "ORD-4019", client: "Northwind", type: "Product descriptions x12", status: "Delivered", priority: "P2", eta: "Feb 12", value: "$860" },
  { id: "ORD-4018", client: "BrightPath", type: "Case study", status: "Revision", priority: "P1", eta: "Feb 22", value: "$1,900" },
  { id: "ORD-4017", client: "Helix", type: "Newsletter x4", status: "Draft", priority: "P2", eta: "Feb 26", value: "$480" },
];

export const Route = createFileRoute("/app/orders")({
  head: () => ({ meta: [{ title: "Orders — SEO Studio" }, { name: "description", content: "Client orders and approvals." }] }),
  component: () => (
    <AppShell title="Orders" subtitle="Submitted client orders and their approval workflow." actions={<Button><Plus className="h-4 w-4 mr-1.5" />New order</Button>}>
      <Card className="mb-4"><CardContent className="p-3 flex gap-2">
        <Input placeholder="Search orders…" className="flex-1" />
        <Button variant="outline"><Filter className="h-4 w-4 mr-1.5" />Filters</Button>
      </CardContent></Card>
      <Card><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Client</TableHead><TableHead>Type</TableHead><TableHead>Status</TableHead><TableHead>Priority</TableHead><TableHead>ETA</TableHead><TableHead>Value</TableHead></TableRow></TableHeader>
        <TableBody>{orders.map((o) => (
          <TableRow key={o.id}>
            <TableCell className="font-medium">{o.id}</TableCell>
            <TableCell>{o.client}</TableCell>
            <TableCell>{o.type}</TableCell>
            <TableCell><Badge variant={o.status === "Delivered" ? "default" : o.status === "Revision" ? "destructive" : "secondary"}>{o.status}</Badge></TableCell>
            <TableCell><Badge variant="outline" className="tabular-nums">{o.priority}</Badge></TableCell>
            <TableCell className="text-muted-foreground text-sm">{o.eta}</TableCell>
            <TableCell className="tabular-nums">{o.value}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
