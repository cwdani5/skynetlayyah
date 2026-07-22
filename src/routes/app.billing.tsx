import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check } from "lucide-react";

const tiers = [
  { name: "Free", price: "$0", features: ["10k words / mo","3 SEO scans","1 workspace"] },
  { name: "Pro", price: "$29", featured: true, features: ["100k words / mo","Unlimited SEO","AI Detector + Humanizer"] },
  { name: "Agency", price: "$99", features: ["500k words / mo","Team roles","White label"] },
];

export const Route = createFileRoute("/app/billing")({
  head: () => ({ meta: [{ title: "Billing — SEO Studio" }, { name: "description", content: "Manage plan, credits and invoices." }] }),
  component: () => (
    <AppShell title="Billing" subtitle="Manage your plan, credits and invoices." actions={<Button variant="outline">Update payment</Button>}>
      <Card className="mb-6"><CardContent className="p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Current plan</div>
          <div className="mt-1 flex items-baseline gap-2"><span className="text-2xl font-semibold">Pro</span><Badge>Monthly</Badge></div>
          <div className="mt-1 text-sm text-muted-foreground">Renews Feb 24, 2026</div>
        </div>
        <div className="min-w-[240px]">
          <div className="flex justify-between text-sm mb-1"><span>Words used</span><span className="text-muted-foreground tabular-nums">36,240 / 100,000</span></div>
          <Progress value={36} />
        </div>
        <Button>Upgrade to Agency</Button>
      </CardContent></Card>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        {tiers.map((t) => (
          <Card key={t.name} className={t.featured ? "border-primary" : ""}>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground">{t.name}</div>
              <div className="mt-1 text-3xl font-semibold">{t.price}<span className="text-sm text-muted-foreground">/mo</span></div>
              <Button className="mt-4 w-full" variant={t.featured ? "default" : "outline"}>{t.featured ? "Current" : "Choose"}</Button>
              <ul className="mt-5 space-y-2 text-sm">{t.features.map((f) => <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-primary mt-0.5" />{f}</li>)}</ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card><CardHeader><CardTitle>Invoices</CardTitle></CardHeader><CardContent><Table>
        <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Invoice</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{[
          ["Jan 24, 2026","INV-2026-014","$29.00","Paid"],
          ["Dec 24, 2025","INV-2025-142","$29.00","Paid"],
          ["Nov 24, 2025","INV-2025-118","$29.00","Paid"],
        ].map(([d,i,a,s])=>(
          <TableRow key={i}><TableCell>{d}</TableCell><TableCell className="font-mono text-xs">{i}</TableCell><TableCell>{a}</TableCell><TableCell><Badge variant="secondary">{s}</Badge></TableCell><TableCell><Button variant="ghost" size="sm">Download</Button></TableCell></TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
