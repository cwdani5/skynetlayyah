import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, FileCheck2, MessageSquare, AlertTriangle, Megaphone, CheckCircle2 } from "lucide-react";

const items = [
  { i: FileCheck2, kind: "Approval", t: "Northwind requested your approval on 'Landing: API for content'", w: "2m ago", unread: true, action: "Review" },
  { i: MessageSquare, kind: "Message", t: "Tomas Ng · 'Approved v2 — let's ship 🎉'", w: "8m ago", unread: true, action: "Reply" },
  { i: Sparkles, kind: "Task", t: "Reminder — 'Q1 Content plan' is due in 3 days", w: "1h ago", unread: true, action: "Open" },
  { i: Megaphone, kind: "Announcement", t: "New: Content Decay Monitor is live for all Agency plans", w: "3h ago", unread: true, action: "Learn more" },
  { i: AlertTriangle, kind: "System", t: "Webhook queue degraded — 4 events retrying", w: "5h ago", unread: true, action: "Details" },
  { i: CheckCircle2, kind: "Task", t: "Weekly report generated (W07)", w: "Yesterday" },
];

export const Route = createFileRoute("/app/inbox")({
  head: () => ({ meta: [{ title: "Inbox — SEO Studio" }, { name: "description", content: "All approvals, mentions and system alerts." }] }),
  component: () => (
    <AppShell title="Inbox" subtitle="Approvals, mentions, task reminders and system alerts." actions={<Button variant="outline">Mark all read</Button>}>
      <div className="flex gap-2 mb-4 flex-wrap">{["All", "Approvals", "Messages", "Tasks", "Announcements", "System"].map((t, i) => <Badge key={t} variant={i === 0 ? "default" : "secondary"} className="rounded-full cursor-pointer">{t}</Badge>)}</div>
      <Card><CardContent className="divide-y p-0">
        {items.map((n, i) => {
          const Icon = n.i;
          return (
            <div key={i} className={`flex items-start gap-3 p-4 ${n.unread ? "bg-primary/[0.03]" : ""}`}>
              <div className="rounded-full bg-primary/10 p-2 text-primary"><Icon className="h-4 w-4" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2"><Badge variant="outline" className="text-[10px]">{n.kind}</Badge><span className="text-xs text-muted-foreground">{n.w}</span></div>
                <div className="mt-1 text-sm">{n.t}</div>
              </div>
              {n.action && <Button size="sm" variant="outline">{n.action}</Button>}
              {n.unread && <span className="h-2 w-2 rounded-full bg-primary mt-2" />}
            </div>
          );
        })}
      </CardContent></Card>
    </AppShell>
  ),
});
