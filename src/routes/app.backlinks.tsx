import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { KpiTile } from "@/components/ui-kit";
import { Link2, Star } from "lucide-react";

const opps = [
  { site: "techcrunch.com", DR: 92, topic: "AI content ethics", type: "Guest post", contact: "editor@techcrunch.com" },
  { site: "searchengineland.com", DR: 88, topic: "SEO for AI content", type: "Contributor", contact: "tips@sel.com" },
  { site: "marketingprofs.com", DR: 82, topic: "Content workflow tools", type: "Roundup", contact: "editor@marketingprofs.com" },
  { site: "producthunt.com", DR: 90, topic: "Launch: AI SEO Studio", type: "Launch", contact: "—" },
];

export const Route = createFileRoute("/app/backlinks")({
  head: () => ({ meta: [{ title: "Backlink opportunities — SEO Studio" }, { name: "description", content: "High-authority linking opportunities." }] }),
  component: () => (
    <AppShell title="Backlink opportunities" subtitle="Curated, high-authority sites open to guest posts, mentions and roundups.">
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <KpiTile label="Referring domains" value="342" icon={Link2} />
        <KpiTile label="Avg DR" value="47" icon={Star} accent="emerald" />
        <KpiTile label="New this month" value={12} icon={Link2} accent="sky" />
      </div>
      <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Opportunities</CardTitle><Button variant="outline" size="sm">Import list</Button></CardHeader>
        <CardContent className="p-0"><Table>
          <TableHeader><TableRow><TableHead>Site</TableHead><TableHead>DR</TableHead><TableHead>Suggested topic</TableHead><TableHead>Type</TableHead><TableHead>Contact</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>{opps.map((o) => (
            <TableRow key={o.site}>
              <TableCell className="font-medium">{o.site}</TableCell>
              <TableCell><Badge>{o.DR}</Badge></TableCell>
              <TableCell>{o.topic}</TableCell>
              <TableCell><Badge variant="secondary">{o.type}</Badge></TableCell>
              <TableCell className="text-muted-foreground text-xs">{o.contact}</TableCell>
              <TableCell><Button size="sm" variant="ghost">Outreach</Button></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table></CardContent>
      </Card>
    </AppShell>
  ),
});
