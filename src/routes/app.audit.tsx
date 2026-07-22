import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auditLog } from "@/lib/mock/enterprise";
import { Download, Filter, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/app/audit")({
  head: () => ({ meta: [{ title: "Audit log — SEO Studio" }, { name: "description", content: "Immutable audit log for compliance and security review." }] }),
  component: () => (
    <AppShell title="Audit log" subtitle="Immutable, timestamped record of every workspace event." actions={<Button variant="outline"><Download className="h-4 w-4 mr-1.5" />Export CSV</Button>}>
      <Card className="mb-4"><CardContent className="p-3 flex gap-2 flex-wrap">
        <Input placeholder="Search actor, action or ID…" className="flex-1 min-w-[220px]" />
        <Select defaultValue="all"><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent>{["All", "Info", "Warn", "Error"].map(t => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}</SelectContent></Select>
        <Select defaultValue="7d"><SelectTrigger className="w-36"><SelectValue /></SelectTrigger><SelectContent>{[["24h", "24h"], ["7d", "7 days"], ["30d", "30 days"], ["90d", "90 days"]].map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent></Select>
        <Button variant="outline"><Filter className="h-4 w-4 mr-1.5" />More</Button>
      </CardContent></Card>
      <Card><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Event</TableHead><TableHead>Actor</TableHead><TableHead>Severity</TableHead><TableHead>Time</TableHead></TableRow></TableHeader>
        <TableBody>{auditLog.map((e, i) => (
          <TableRow key={i}>
            <TableCell className="flex items-center gap-2">{e.sev !== "info" && <ShieldAlert className="h-4 w-4 text-amber-500" />}{e.action}</TableCell>
            <TableCell className="text-muted-foreground text-sm">{e.actor}</TableCell>
            <TableCell><Badge variant={e.sev === "error" ? "destructive" : e.sev === "warn" ? "secondary" : "outline"}>{e.sev}</Badge></TableCell>
            <TableCell className="text-muted-foreground text-sm">{e.t}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
