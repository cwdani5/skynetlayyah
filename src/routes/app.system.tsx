import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiTile } from "@/components/ui-kit";
import { Server, Cpu, HardDrive, Activity, Zap } from "lucide-react";

const services = [
  { name: "API Gateway", region: "us-east-1", latency: "84ms", uptime: "99.99%", status: "Healthy" },
  { name: "AI Inference", region: "us-east-1", latency: "612ms", uptime: "99.94%", status: "Healthy" },
  { name: "Postgres primary", region: "us-east-1", latency: "12ms", uptime: "100%", status: "Healthy" },
  { name: "Redis cache", region: "us-east-1", latency: "2ms", uptime: "99.99%", status: "Healthy" },
  { name: "Object storage", region: "multi", latency: "42ms", uptime: "99.98%", status: "Healthy" },
  { name: "Webhook queue", region: "us-east-1", latency: "6s", uptime: "99.6%", status: "Degraded" },
];

export const Route = createFileRoute("/app/system")({
  head: () => ({ meta: [{ title: "System health — SEO Studio" }, { name: "description", content: "Live infrastructure and service health." }] }),
  component: () => (
    <AppShell title="System health" subtitle="Live status of infrastructure, queues and storage.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <KpiTile label="Uptime 30d" value="99.98%" icon={Activity} accent="emerald" />
        <KpiTile label="Avg latency" value="184ms" icon={Zap} accent="primary" />
        <KpiTile label="Storage" value="4.2 TB" hint="of 10 TB" icon={HardDrive} accent="sky" />
        <KpiTile label="CPU load" value="42%" icon={Cpu} accent="amber" />
      </div>
      <Card><CardHeader><CardTitle>Services</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.name} className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium"><Server className="h-4 w-4 text-muted-foreground" />{s.name}</div>
              <Badge variant={s.status === "Healthy" ? "default" : "secondary"} className={s.status === "Healthy" ? "bg-emerald-500 hover:bg-emerald-500" : ""}>{s.status}</Badge>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div><div className="text-muted-foreground">Region</div><div className="font-medium">{s.region}</div></div>
              <div><div className="text-muted-foreground">Latency</div><div className="font-medium tabular-nums">{s.latency}</div></div>
              <div><div className="text-muted-foreground">Uptime</div><div className="font-medium tabular-nums">{s.uptime}</div></div>
            </div>
          </div>
        ))}
      </CardContent></Card>
    </AppShell>
  ),
});
