import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck, Users2, TrendingUp, Bell } from "lucide-react";

export const Route = createFileRoute("/app/notifications")({
  head: () => ({ meta: [{ title: "Notifications — SEO Studio" }, { name: "description", content: "Everything happening in your workspace." }] }),
  component: () => (
    <AppShell title="Notifications" subtitle="Real-time updates across your workspace." actions={<Button variant="outline">Mark all read</Button>}>
      <div className="flex gap-2 mb-4">{["All","Mentions","System","Team"].map((t,i)=><Badge key={t} variant={i===0?"default":"secondary"} className="rounded-full cursor-pointer">{t}</Badge>)}</div>
      <Card><CardContent className="divide-y p-0">{[
        { i: Sparkles, t: "Marcus generated a 1,800-word blog", w: "2m ago", unread: true },
        { i: ShieldCheck, t: "Detector: 'Q1 report' passed human check (96%)", w: "12m ago", unread: true },
        { i: Users2, t: "Rina joined the workspace as Editor", w: "1h ago", unread: true },
        { i: TrendingUp, t: "Weekly report is ready", w: "Yesterday" },
        { i: Bell, t: "Your plan renews in 12 days", w: "2d ago" },
      ].map((n, i) => (
        <div key={i} className={`flex items-start gap-3 p-4 ${n.unread ? "bg-primary/[0.03]" : ""}`}>
          <div className="rounded-full bg-primary/10 p-2 text-primary"><n.i className="h-4 w-4" /></div>
          <div className="flex-1"><div className="text-sm">{n.t}</div><div className="text-xs text-muted-foreground mt-0.5">{n.w}</div></div>
          {n.unread && <span className="h-2 w-2 rounded-full bg-primary mt-2" />}
        </div>
      ))}</CardContent></Card>
    </AppShell>
  ),
});
