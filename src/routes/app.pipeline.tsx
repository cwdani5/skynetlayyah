import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kanbanColumns, kanbanCards } from "@/lib/mock/enterprise";
import { CalendarDays, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const priorityTone: Record<string, string> = {
  P0: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  P1: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  P2: "bg-slate-500/10 text-slate-600 border-slate-500/20",
};

export const Route = createFileRoute("/app/pipeline")({
  head: () => ({ meta: [{ title: "Content pipeline — SEO Studio" }, { name: "description", content: "Kanban board from ideation to publish." }] }),
  component: () => (
    <AppShell title="Content pipeline" subtitle="Drag-and-drop kanban from ideation to publish." actions={<Button><Plus className="h-4 w-4 mr-1.5" />New card</Button>}>
      <div className="overflow-x-auto -mx-4 md:-mx-8 px-4 md:px-8 pb-4">
        <div className="flex gap-3 min-w-max">
          {kanbanColumns.map((col) => {
            const cards = kanbanCards[col.id] || [];
            return (
              <div key={col.id} className="w-72 shrink-0">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("text-[10px] uppercase tracking-widest font-semibold rounded px-1.5 py-0.5", col.tone)}>{col.label}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{cards.length}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="h-3 w-3" /></Button>
                </div>
                <div className="space-y-2 rounded-xl bg-muted/30 p-2 min-h-[120px]">
                  {cards.map((c) => (
                    <Card key={c.id} className="cursor-grab hover:shadow-md transition-shadow">
                      <CardContent className="p-3 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-medium leading-snug">{c.title}</div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1 -mt-1"><MoreHorizontal className="h-3 w-3" /></Button>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={cn("text-[10px] h-5", priorityTone[c.priority])}>{c.priority}</Badge>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1"><CalendarDays className="h-3 w-3" />{c.due}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="h-1 rounded-full bg-muted flex-1 mr-2 overflow-hidden"><div className="h-full bg-primary" style={{ width: `${c.progress}%` }} /></div>
                          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-primary/60 text-[10px] text-primary-foreground flex items-center justify-center font-semibold">{c.assignee}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  ),
});
