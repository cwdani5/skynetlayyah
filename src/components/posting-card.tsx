import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Building2, MessageCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type Posting = {
  id: string;
  type: "job" | "admission" | "scheme";
  title: string;
  organization: string | null;
  location: string | null;
  description: string | null;
  deadline: string | null;
  source_url: string | null;
  ad_image_url: string | null;
  apply_url: string | null;
  is_featured: boolean;
  is_active?: boolean;
  created_at: string;
};

const typeStyles: Record<Posting["type"], { label: string; className: string }> = {
  job: { label: "Job", className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  admission: { label: "Admission", className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  scheme: { label: "Scheme", className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
};

function fmtDate(d: string) {
  // Locale-independent so server & client HTML match (no hydration mismatch).
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return d;
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${dt.getUTCFullYear()}`;
}

export function PostingCard({ p }: { p: Posting }) {
  const style = typeStyles[p.type];
  const daysLeft = p.deadline ? Math.ceil((new Date(p.deadline).getTime() - Date.now()) / 86400000) : null;
  const askMsg = `Assalamualaikum Skynet,\n\nMain is ${style.label.toLowerCase()} ke liye apply karna chahta/chahti hoon:\n\n• ${p.title}${p.organization ? `\n• Idara: ${p.organization}` : ""}${p.location ? `\n• Location: ${p.location}` : ""}${p.deadline ? `\n• Last Date: ${fmtDate(p.deadline)}` : ""}${p.apply_url ? `\n• Link: ${p.apply_url}` : p.source_url ? `\n• Link: ${p.source_url}` : ""}\n\nApply / form fill karne mein madad chahiye. Shukriya!`;

  const askHref = `https://wa.me/923026760999?text=${encodeURIComponent(askMsg)}`;

  return (
    <article className="group relative flex flex-col rounded-2xl border bg-card overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
      {/* Text-only fallback banner (no external images = no bandwidth/credits) */}
      <div className="relative border-b bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 px-4 py-5 sm:px-5 sm:py-6">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/80">
          {style.label}
        </div>
        <div className="mt-1.5 text-sm sm:text-base font-bold leading-snug line-clamp-2 text-foreground">
          {p.organization || p.title}
        </div>
        {p.organization && (
          <div className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{p.title}</div>
        )}
        <div className="mt-2 text-[11px] sm:text-xs font-medium text-muted-foreground">
          Last Date: <span className="text-foreground">{p.deadline ? fmtDate(p.deadline) : "Open / N/A"}</span>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col">

        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className={cn("border", style.className)}>{style.label}</Badge>
          {p.is_featured && (
            <Badge variant="secondary" className="gap-1"><Sparkles className="h-3 w-3" /> Featured</Badge>
          )}
          {daysLeft !== null && daysLeft >= 0 && daysLeft <= 7 && (
            <Badge variant="destructive">Closing in {daysLeft}d</Badge>
          )}
        </div>

        <h3 className="text-base font-semibold leading-snug line-clamp-2">{p.title}</h3>
        {p.organization && <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" />{p.organization}</div>}
        {p.description && <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.description}</p>}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {p.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {p.location}</span>}
          {p.deadline && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Deadline: {fmtDate(p.deadline)}</span>}
        </div>

        <div className="mt-5 pt-4 border-t">
          <a href={askHref} target="_blank" rel="noreferrer" className="block">
            <Button size="sm" className="w-full gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" /> Apply Now
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}
