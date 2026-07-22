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
