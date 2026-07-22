import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, UserPlus } from "lucide-react";

const members = [
  ["Ada Lovelace", "ada@studio.com", "Owner", "Active", "2m ago"],
  ["Marcus Lee", "marcus@studio.com", "Admin", "Active", "1h ago"],
  ["Rina Okafor", "rina@studio.com", "Editor", "Active", "3h ago"],
  ["Sam Patel", "sam@studio.com", "Writer", "Active", "Yesterday"],
  ["Kai Nguyen", "kai@studio.com", "Writer", "Invited", "—"],
  ["Tomas Ng", "tomas@northwind.co", "Client", "Active", "5h ago"],
];

const perms = [
  ["Create articles", true, true, true, true, false],
  ["Approve articles", true, true, true, false, true],
  ["Manage billing", true, true, false, false, false],
  ["Invite members", true, true, false, false, false],
  ["Delete workspace", true, false, false, false, false],
  ["Access analytics", true, true, true, true, true],
];

export const Route = createFileRoute("/app/members")({
  head: () => ({ meta: [{ title: "Members — SEO Studio" }, { name: "description", content: "Manage workspace members, roles and permissions." }] }),
  component: () => (
    <AppShell title="Workspace members" subtitle="Invites, roles and the permission matrix." actions={<Button><UserPlus className="h-4 w-4 mr-1.5" />Invite</Button>}>
      <Card className="mb-4"><CardHeader><CardTitle>Invite new member</CardTitle></CardHeader><CardContent className="flex gap-2">
        <Input placeholder="name@company.com" className="flex-1" />
        <Select defaultValue="writer"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>{["Owner", "Admin", "Editor", "Writer", "Client"].map(r => <SelectItem key={r} value={r.toLowerCase()}>{r}</SelectItem>)}</SelectContent>
        </Select>
        <Button>Send invite</Button>
      </CardContent></Card>

      <Card className="mb-6"><CardHeader><CardTitle>Members</CardTitle></CardHeader><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead>Status</TableHead><TableHead>Last seen</TableHead><TableHead></TableHead></TableRow></TableHeader>
        <TableBody>{members.map(([n, e, r, s, l]) => (
          <TableRow key={e as string}>
            <TableCell className="font-medium">{n}</TableCell>
            <TableCell className="text-muted-foreground">{e}</TableCell>
            <TableCell><Badge variant="secondary">{r}</Badge></TableCell>
            <TableCell><Badge variant={s === "Active" ? "default" : "outline"}>{s}</Badge></TableCell>
            <TableCell className="text-sm text-muted-foreground">{l}</TableCell>
            <TableCell><Button variant="ghost" size="sm">Manage</Button></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>

      <Card><CardHeader><CardTitle>Permissions matrix</CardTitle></CardHeader><CardContent className="p-0"><Table>
        <TableHeader><TableRow><TableHead>Permission</TableHead>{["Owner", "Admin", "Editor", "Writer", "Client"].map(r => <TableHead key={r} className="text-center">{r}</TableHead>)}</TableRow></TableHeader>
        <TableBody>{perms.map((row) => (
          <TableRow key={row[0] as string}>
            <TableCell className="font-medium">{row[0]}</TableCell>
            {row.slice(1).map((v, i) => (
              <TableCell key={i} className="text-center">{v ? <Check className="h-4 w-4 mx-auto text-emerald-500" /> : <X className="h-4 w-4 mx-auto text-muted-foreground/40" />}</TableCell>
            ))}
          </TableRow>
        ))}</TableBody>
      </Table></CardContent></Card>
    </AppShell>
  ),
});
