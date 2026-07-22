import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/app/team")({
  head: () => ({ meta: [{ title: "Team — SEO Studio" }, { name: "description", content: "Invite members, manage roles and permissions." }] }),
  component: () => (
    <AppShell title="Team" subtitle="Roles, permissions and workspace access." actions={<Button><Plus className="h-4 w-4 mr-1.5" />Invite member</Button>}>
      <Card className="mb-4"><CardHeader><CardTitle>Invite by email</CardTitle></CardHeader><CardContent className="flex gap-2">
        <Input placeholder="teammate@company.com" className="flex-1" />
        <Select defaultValue="writer"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>{["Admin","Editor","Writer","Client"].map(r=><SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>)}</SelectContent>
        </Select>
        <Button>Send invite</Button>
      </CardContent></Card>
      <Card><Table>
        <TableHeader><TableRow><TableHead>Member</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Last active</TableHead></TableRow></TableHeader>
        <TableBody>{[
          ["Ada Lovelace","ada@studio.com","Admin","Active","2m ago"],
          ["Marcus Lee","marcus@studio.com","Editor","Active","1h ago"],
          ["Rina Okafor","rina@studio.com","Writer","Active","3h ago"],
          ["Tomas Ng","tomas@studio.com","Client","Pending","—"],
        ].map(([n,e,r,s,l])=>(
          <TableRow key={e}>
            <TableCell className="font-medium">{n}</TableCell>
            <TableCell className="text-muted-foreground">{e}</TableCell>
            <TableCell><Badge variant="secondary">{r}</Badge></TableCell>
            <TableCell><Badge variant={s==="Active"?"default":"outline"}>{s}</Badge></TableCell>
            <TableCell className="text-muted-foreground text-sm">{l}</TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></Card>
    </AppShell>
  ),
});
