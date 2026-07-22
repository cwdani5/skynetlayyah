import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function StatCard({ label, value, delta, icon: Icon, tone = "default" }: {
  label: string; value: string | number; delta?: string; icon: LucideIcon;
  tone?: "default" | "up" | "down";
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
            {delta && (
              <p className={cn(
                "mt-1 text-xs",
                tone === "up" && "text-emerald-600 dark:text-emerald-400",
                tone === "down" && "text-red-600 dark:text-red-400",
                tone === "default" && "text-muted-foreground",
              )}>{delta}</p>
            )}
          </div>
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function KpiTile({ label, value, hint, icon: Icon, accent = "primary" }: {
  label: string; value: string | number; hint?: string; icon?: LucideIcon;
  accent?: "primary" | "emerald" | "amber" | "rose" | "sky";
}) {
  const map: Record<string, string> = {
    primary: "from-primary/20 to-primary/0",
    emerald: "from-emerald-500/20 to-emerald-500/0",
    amber: "from-amber-500/20 to-amber-500/0",
    rose: "from-rose-500/20 to-rose-500/0",
    sky: "from-sky-500/20 to-sky-500/0",
  };
  return (
    <Card className={cn("relative overflow-hidden bg-gradient-to-br", map[accent])}>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
          {Icon && <Icon className="h-3.5 w-3.5" />} {label}
        </div>
        <div className="mt-2 text-3xl font-semibold tabular-nums">{value}</div>
        {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
      </CardContent>
    </Card>
  );
}

export function Section({ title, description, actions, children }: {
  title: string; description?: string; actions?: ReactNode; children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}

export function EmptyState({ title, description, action, icon: Icon }: {
  title: string; description: string; action?: ReactNode; icon?: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      {Icon && <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted"><Icon className="h-5 w-5 text-muted-foreground" /></div>}
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ProgressRing({ value, size = 120, label }: { value: number; size?: number; label?: string }) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth={8} fill="none" className="stroke-muted" />
        <circle
          cx={size / 2} cy={size / 2} r={r} strokeWidth={8} fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          className="stroke-primary transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold tabular-nums">{value}</div>
        {label && <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>}
      </div>
    </div>
  );
}

export function ToolPlaceholder({ title, tagline, bullets }: {
  title: string; tagline: string; bullets: string[];
}) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{tagline}</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 rounded-lg border p-3 text-sm">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export function Shimmer({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-muted/60", className)}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

export function Sparkline({ data, height = 40, className }: { data: number[]; height?: number; className?: string }) {
  const w = 120, max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * height}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className={cn("w-full", className)} preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth={1.5} className="text-primary" />
    </svg>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">{children}</kbd>;
}

export function GradientCard({ title, description, icon: Icon, action }: {
  title: string; description: string; icon?: LucideIcon; action?: ReactNode;
}) {
  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
      <CardContent className="p-5 flex items-start gap-4">
        {Icon && <div className="rounded-xl bg-primary/15 p-3 text-primary"><Icon className="h-5 w-5" /></div>}
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          {action && <div className="mt-3">{action}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
