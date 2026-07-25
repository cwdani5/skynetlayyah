import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Building2, ExternalLink, Sparkles } from "lucide-react";
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

export function PostingCard({ p }: { p: Posting }) {
  const style = typeStyles[p.type];
  const daysLeft = p.deadline ? Math.ceil((new Date(p.deadline).getTime() - Date.now()) / 86400000) : null;
  const askMsg = `Assalamualaikum Skynet,\n\nMujhe is ${style.label.toLowerCase()} ke baare mein maloomat chahiye:\n\n• ${p.title}${p.organization ? `\n• Idara: ${p.organization}` : ""}${p.location ? `\n• Location: ${p.location}` : ""}${p.deadline ? `\n• Deadline: ${new Date(p.deadline).toLocaleDateString()}` : ""}${p.apply_url ? `\n• Link: ${p.apply_url}` : p.source_url ? `\n• Link: ${p.source_url}` : ""}\n\nApply/form fill karne mein madad chahiye. Shukriya!`;
  const askHref = `https://wa.me/923026760999?text=${encodeURIComponent(askMsg)}`;

  return (
    <article className="group relative flex flex-col rounded-2xl border bg-card overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all">
      {p.ad_image_url ? (
        <a href={p.source_url || p.apply_url || "#"} target="_blank" rel="noreferrer" className="block aspect-[16/9] overflow-hidden bg-muted">
          <img src={p.ad_image_url} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </a>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent grid place-items-center">
          <Building2 className="h-12 w-12 text-primary/40" />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
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
          {p.deadline && <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Deadline: {new Date(p.deadline).toLocaleDateString()}</span>}
        </div>

        <div className="mt-5 flex items-center gap-2 pt-4 border-t">
          {p.apply_url && (
            <a href={p.apply_url} target="_blank" rel="noreferrer" className="flex-1">
              <Button size="sm" className="w-full gap-1.5">Apply / Details <ExternalLink className="h-3.5 w-3.5" /></Button>
            </a>
          )}
          <a href="https://wa.me/923026760999" target="_blank" rel="noreferrer">
            <Button size="sm" variant="outline">Ask Skynet</Button>
          </a>
        </div>
      </div>
    </article>
  );
}
