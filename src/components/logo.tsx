import { cn } from "@/lib/utils";
import logoAsset from "@/assets/skynet-logo.png.asset.json";

export function Logo({ className, size = 44, showText = true }: { className?: string; size?: number; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5 min-w-0", className)}>
      <img
        src={logoAsset.url}
        alt="Skynet Cafe & Photo Studio Layyah"
        width={size}
        height={size}
        className="rounded-full object-contain shrink-0"
        style={{ width: size, height: size }}
      />
      {showText && (
        <div className="leading-tight min-w-0">
          <div className="font-display text-base sm:text-lg font-extrabold tracking-tight">
            <span style={{ color: "#1e3a8a" }}>SKY</span>
            <span style={{ color: "#dc2626" }}>NET</span>
          </div>
          <div className="hidden xs:block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground truncate">
            Cafe & Photo Studio · Layyah
          </div>
        </div>
      )}
    </div>
  );
}
