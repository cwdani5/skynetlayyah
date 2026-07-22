import { cn } from "@/lib/utils";

export function Logo({ className, mark = false }: { className?: string; mark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/60 shadow-lg shadow-primary/30">
        <div className="absolute inset-[3px] rounded-md bg-background/20 backdrop-blur-sm flex items-center justify-center">
          <div className="h-2 w-2 rounded-sm bg-primary-foreground" />
        </div>
      </div>
      {!mark && (
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-tight">SEO Studio</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">AI Content</span>
        </div>
      )}
    </div>
  );
}
