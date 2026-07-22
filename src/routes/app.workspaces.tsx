import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KpiTile, GradientCard } from "@/components/ui-kit";
import { workspaces } from "@/lib/mock/enterprise";
import { Building2, Plus, Users2, FolderKanban, Zap, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/app/workspaces")({
  head: () => ({ meta: [{ title: "Workspaces — SEO Studio" }, { name: "description", content: "Manage all your agency workspaces." }] }),
  component: () => (
    <AppShell title="Workspaces" subtitle="Manage multiple client and internal workspaces from one account." actions={<Button><Plus className="h-4 w-4 mr-1.5" />New workspace</Button>}>
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <KpiTile label="Total workspaces" value={workspaces.length} icon={Building2} />
        <KpiTile label="Members" value={workspaces.reduce((s, w) => s + w.members, 0)} icon={Users2} accent="emerald" />
        <KpiTile label="Active projects" value={workspaces.reduce((s, w) => s + w.projects, 0)} icon={FolderKanban} accent="sky" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workspaces.map((w) => (
          <Card key={w.id} className="group relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`h-24 bg-gradient-to-br ${w.color}`} />
            <CardContent className="p-4 -mt-8 relative">
              <div className="h-12 w-12 rounded-xl bg-background border-2 border-background shadow flex items-center justify-center text-lg font-bold">
                {w.name.charAt(0)}
              </div>
              <div className="mt-3 flex items-start justify-between">
                <div>
                  <div className="font-semibold">{w.name}</div>
                  <Badge variant="secondary" className="mt-1 text-[10px]">{w.plan}</Badge>
                </div>
                <Button size="sm" variant="ghost">Open <ArrowRight className="h-3 w-3 ml-1" /></Button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div><div className="font-semibold tabular-nums">{w.members}</div><div className="text-muted-foreground">Members</div></div>
                <div><div className="font-semibold tabular-nums">{w.projects}</div><div className="text-muted-foreground">Projects</div></div>
                <div><div className="font-semibold tabular-nums">{w.words}</div><div className="text-muted-foreground">Words</div></div>
              </div>
            </CardContent>
          </Card>
        ))}
        <GradientCard
          icon={Zap}
          title="Create a workspace"
          description="Spin up a dedicated space for a new client or team."
          action={<Button size="sm">Create workspace</Button>}
        />
      </div>
    </AppShell>
  ),
});
