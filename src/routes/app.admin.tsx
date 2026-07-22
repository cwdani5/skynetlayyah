import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/ui-kit";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users2, CreditCard, Server, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/admin")({
  head: () => ({ meta: [{ title: "Admin — SEO Studio" }, { name: "description", content: "Manage users, plans and platform health." }] }),
  component: () => (
    <AppShell title="Admin panel" subtitle="Users, plans, credits and platform health.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total users" value="12,482" delta="↑ 3.2%" tone="up" icon={Users2} />
        <StatCard label="Paying" value="4,120" delta="↑ 1.8%" tone="up" icon={CreditCard} />
        <StatCard label="MRR" value="$142k" delta="↑ 6.1%" tone="up" icon={CreditCard} />
        <StatCard label="Uptime 30d" value="99.98%" icon={Server} />
      </div>
      <Card className="mb-6"><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Plan</TableHead><TableHead>Words used</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{[
          ["ada@studio.com","Pro","36,240","Active"],
          ["marcus@studio.com","Pro","28,100","Active"],
          ["rina@studio.com","Free","9,880","Active"],
          ["tomas@northwind.co","Agency","162,340","Active"],
          ["spam@x.io","Free","0","Suspended"],
        ].map(([e,p,w,s])=>(
          <TableRow key={e}>
            <TableCell className="font-medium">{e}</TableCell>
            <TableCell><Badge variant="secondary">{p}</Badge></TableCell>
            <TableCell className="tabular-nums">{w}</TableCell>
            <TableCell><Badge variant={s==="Active"?"default":"destructive"}>{s}</Badge></TableCell>
            <TableCell><Button variant="ghost" size="sm">Manage</Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
      <Card><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Audit log</TableHead><TableHead>Actor</TableHead><TableHead>Severity</TableHead><TableHead>Time</TableHead></TableRow></TableHeader>
        <TableBody>{[
          ["Rotated production API key","ada@studio.com","info","2m ago"],
          ["Suspended user spam@x.io","system","warn","1h ago"],
          ["Failed webhook delivery","stripe","error","3h ago"],
          ["Upgraded plan → Agency","tomas@northwind.co","info","Yesterday"],
        ].map(([msg,actor,sev,t])=>(
          <TableRow key={msg}>
            <TableCell className="flex items-center gap-2">{sev!=="info"&&<ShieldAlert className="h-4 w-4 text-amber-500" />}{msg}</TableCell>
            <TableCell className="text-muted-foreground text-sm">{actor}</TableCell>
            <TableCell><Badge variant={sev==="error"?"destructive":sev==="warn"?"secondary":"outline"}>{sev}</Badge></TableCell>
            <TableCell className="text-muted-foreground text-sm">{t}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
