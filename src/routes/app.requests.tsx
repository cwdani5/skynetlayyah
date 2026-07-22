import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const requests = [
  { t: "Blog: 'AI SEO checklist 2026'", client: "Northwind", status: "Open", note: "1,500-1,800 words, technical audience." },
  { t: "Revision on 'Landing: API for content'", client: "Acme", status: "Revision", note: "Tighten hero, add pricing anchor." },
  { t: "Product descriptions batch (24)", client: "BrightPath", status: "Queued", note: "Match brand voice guide v3." },
  { t: "Case study: Helix Labs migration", client: "Helix", status: "Open", note: "Include metrics + quote from CTO." },
];

export const Route = createFileRoute("/app/requests")({
  head: () => ({ meta: [{ title: "Requests — SEO Studio" }, { name: "description", content: "Client article requests and revision tickets." }] }),
  component: () => (
    <AppShell title="Requested articles" subtitle="Track incoming client briefs and revision tickets.">
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {requests.map((r) => (
            <Card key={r.t}><CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{r.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{r.client}</div>
                </div>
                <Badge variant={r.status === "Revision" ? "destructive" : r.status === "Open" ? "secondary" : "outline"}>{r.status}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.note}</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm">Accept</Button>
                <Button size="sm" variant="outline">Assign</Button>
                <Button size="sm" variant="ghost">Comment</Button>
              </div>
            </CardContent></Card>
          ))}
        </div>
        <Card><CardHeader><CardTitle>New request</CardTitle></CardHeader><CardContent className="space-y-3">
          <div className="space-y-1.5"><Label>Title</Label><Input placeholder="Article about…" /></div>
          <div className="space-y-1.5"><Label>Type</Label><Select defaultValue="blog"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Blog", "Landing", "Case study", "Product", "Email"].map(t => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}</SelectContent></Select></div>
          <div className="space-y-1.5"><Label>Brief</Label><Textarea rows={5} /></div>
          <Button className="w-full">Submit request</Button>
        </CardContent></Card>
      </div>
    </AppShell>
  ),
});
