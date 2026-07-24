import { cn } from "@/lib/utils";

export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className="relative grid place-items-center rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-primary/30"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 17 L10 11 L14 15 L20 7" />
          <circle cx="20" cy="7" r="1.6" fill="currentColor" />
          <path d="M4 20h16" opacity="0.5" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-display text-lg font-extrabold tracking-tight">SKYNET</div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Layyah</div>
      </div>
    </div>
  );
}
