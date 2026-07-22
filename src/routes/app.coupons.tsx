import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ticket, Plus } from "lucide-react";

const coupons = [
  { code: "LAUNCH50", type: "50% off", uses: 428, cap: 1000, expires: "Mar 31", status: "Active" },
  { code: "BLACKFRIDAY", type: "30% off", uses: 1240, cap: null, expires: "Nov 30", status: "Expired" },
  { code: "AGENCY10", type: "10% recurring", uses: 62, cap: 500, expires: "—", status: "Active" },
  { code: "ANNUAL25", type: "25% off annual", uses: 84, cap: null, expires: "—", status: "Active" },
];

export const Route = createFileRoute("/app/coupons")({
  head: () => ({ meta: [{ title: "Coupons — SEO Studio" }, { name: "description", content: "Discount codes and promotional campaigns." }] }),
  component: () => (
    <AppShell title="Coupons" subtitle="Promo codes, discount campaigns and usage caps." actions={<Button><Plus className="h-4 w-4 mr-1.5" />New coupon</Button>}>
      <Card className="mb-4"><CardHeader><CardTitle>Create quickly</CardTitle></CardHeader><CardContent className="flex gap-2">
        <Input placeholder="CODE" className="w-32 uppercase" />
        <Input placeholder="Discount, e.g. 20% off" className="flex-1" />
        <Input placeholder="Usage cap" className="w-32" />
        <Button><Ticket className="h-4 w-4 mr-1.5" />Create</Button>
      </CardContent></Card>
      <Card><Table>
        <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>Discount</TableHead><TableHead>Uses</TableHead><TableHead>Cap</TableHead><TableHead>Expires</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
        <TableBody>{coupons.map((c) => (
          <TableRow key={c.code}>
            <TableCell className="font-mono font-semibold">{c.code}</TableCell>
            <TableCell>{c.type}</TableCell>
            <TableCell className="tabular-nums">{c.uses.toLocaleString()}</TableCell>
            <TableCell className="tabular-nums">{c.cap ?? "∞"}</TableCell>
            <TableCell className="text-muted-foreground text-sm">{c.expires}</TableCell>
            <TableCell><Badge variant={c.status === "Active" ? "default" : "secondary"}>{c.status}</Badge></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></Card>
    </AppShell>
  ),
});
