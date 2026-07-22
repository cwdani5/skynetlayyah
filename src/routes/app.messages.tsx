import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Paperclip, Search } from "lucide-react";

const threads = [
  { name: "Tomas Ng · Northwind", last: "Approved v2 — let's ship 🎉", w: "2m", unread: 2, active: true },
  { name: "Sara Kim · Acme", last: "Can you tighten the hero copy?", w: "1h", unread: 0 },
  { name: "Helix Labs", last: "Attached the metrics doc.", w: "3h", unread: 1 },
  { name: "BrightPath", last: "We'll review by Friday.", w: "1d", unread: 0 },
];
const msgs = [
  { me: false, t: "Hey team — draft is up for review.", w: "10:22" },
  { me: true, t: "Awesome, taking a look now.", w: "10:24" },
  { me: false, t: "Two small tweaks in the intro paragraph, otherwise this is 🔥", w: "10:31" },
  { me: true, t: "On it — pushing v2 in 15.", w: "10:33" },
  { me: false, t: "Approved v2 — let's ship 🎉", w: "10:58" },
];

export const Route = createFileRoute("/app/messages")({
  head: () => ({ meta: [{ title: "Messages — SEO Studio" }, { name: "description", content: "Client messages and team chat." }] }),
  component: () => (
    <AppShell title="Messages" subtitle="Chat with clients and teammates without leaving the workspace.">
      <Card className="overflow-hidden h-[calc(100vh-260px)] min-h-[520px] flex">
        <div className="w-72 border-r flex flex-col">
          <div className="p-3 border-b"><div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /><Input placeholder="Search…" className="pl-8 h-9" /></div></div>
          <div className="flex-1 overflow-y-auto">{threads.map((t, i) => (
            <button key={i} className={`w-full flex items-start gap-3 p-3 text-left hover:bg-muted/50 border-b ${t.active ? "bg-muted/60" : ""}`}>
              <Avatar className="h-9 w-9"><AvatarFallback className="text-xs bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">{t.name.charAt(0)}</AvatarFallback></Avatar>
              <div className="flex-1 min-w-0"><div className="flex justify-between"><div className="text-sm font-medium truncate">{t.name}</div><div className="text-[10px] text-muted-foreground">{t.w}</div></div><div className="text-xs text-muted-foreground truncate">{t.last}</div></div>
              {t.unread > 0 && <span className="h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">{t.unread}</span>}
            </button>
          ))}</div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex items-center gap-3"><Avatar className="h-9 w-9"><AvatarFallback className="text-xs bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">T</AvatarFallback></Avatar><div><div className="text-sm font-semibold">Tomas Ng · Northwind</div><div className="text-xs text-emerald-500">Online</div></div></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">{msgs.map((m, i) => (
            <div key={i} className={`flex ${m.me ? "justify-end" : ""}`}>
              <div className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${m.me ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{m.t}<div className={`mt-1 text-[10px] ${m.me ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.w}</div></div>
            </div>
          ))}</div>
          <CardContent className="p-3 border-t flex gap-2"><Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button><Input placeholder="Type a message…" className="flex-1" /><Button><Send className="h-4 w-4" /></Button></CardContent>
        </div>
      </Card>
    </AppShell>
  ),
});
