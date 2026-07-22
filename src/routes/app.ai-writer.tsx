import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PenLine, Newspaper, ShoppingBag, FileText, Mail, Megaphone, Share2, ListTree, Sparkles } from "lucide-react";

const templates = [
  { icon: Newspaper, name: "Long-form blog", desc: "SEO-ready article, 1500+ words" },
  { icon: FileText, name: "Landing page", desc: "Hero, features, CTA copy" },
  { icon: ShoppingBag, name: "Product description", desc: "Benefits-first product copy" },
  { icon: Mail, name: "Cold email", desc: "3-touch outbound sequence" },
  { icon: Megaphone, name: "Google ad", desc: "Headlines + descriptions" },
  { icon: Share2, name: "LinkedIn post", desc: "Personal-brand style" },
  { icon: ListTree, name: "Listicle", desc: "Top-N ranked article" },
  { icon: PenLine, name: "Rewriter", desc: "Rewrite existing draft" },
];

export const Route = createFileRoute("/app/ai-writer")({
  head: () => ({ meta: [{ title: "AI Writer — SEO Studio" }, { name: "description", content: "40+ templates for every content format." }] }),
  component: () => (
    <AppShell title="AI Writer" subtitle="Choose a template or start from scratch." actions={<Button><Sparkles className="h-4 w-4 mr-1.5" />Generate</Button>}>
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Templates</div>
          <div className="grid gap-2">
            {templates.map((t) => (
              <button key={t.name} className="text-left rounded-lg border p-3 hover:border-primary hover:bg-primary/5 transition">
                <div className="flex items-center gap-2"><t.icon className="h-4 w-4 text-primary" /><div className="text-sm font-medium">{t.name}</div></div>
                <div className="mt-1 text-xs text-muted-foreground">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle>Long-form blog</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5 md:col-span-2"><Label>Topic / title</Label><Input placeholder="How to launch a SaaS in 2026" /></div>
            <div className="space-y-1.5"><Label>Primary keyword</Label><Input placeholder="ai seo tools" /></div>
            <div className="space-y-1.5"><Label>Secondary keywords</Label><Input placeholder="content humanizer, ai detector" /></div>
            <div className="space-y-1.5"><Label>Tone</Label><Select defaultValue="pro"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Professional","Friendly","Authoritative","Playful"].map(t=><SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-1.5"><Label>Audience</Label><Select defaultValue="founders"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{["Founders","Marketers","Developers","Executives"].map(t=><SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}</SelectContent></Select></div>
            <div className="space-y-2 md:col-span-2"><div className="flex justify-between"><Label>Word count</Label><span className="text-xs text-muted-foreground">1,800</span></div><Slider defaultValue={[1800]} min={300} max={5000} /></div>
            <div className="space-y-1.5 md:col-span-2"><Label>Notes / brief</Label><Textarea rows={4} placeholder="Anything the writer should know…" /></div>
          </CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between"><CardTitle>Draft</CardTitle><Badge variant="secondary">Autosaved</Badge></CardHeader>
            <CardContent><div className="min-h-[280px] rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">Your generated draft will appear here.</div></CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  ),
});
