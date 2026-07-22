import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui-kit";
import { Search, Check, Link2, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/app/seo")({
  head: () => ({ meta: [{ title: "SEO Optimizer — SEO Studio" }, { name: "description", content: "Score, optimize and rank your content." }] }),
  component: () => (
    <AppShell title="SEO Optimizer" subtitle="Score against top-ranking pages and follow live suggestions." actions={<Button><Search className="h-4 w-4 mr-1.5" />Scan</Button>}>
      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Card><CardContent className="p-4 flex gap-3">
            <Input placeholder="Primary keyword" className="flex-1" defaultValue="ai seo tools" />
            <Input placeholder="Location" className="w-32" defaultValue="US" />
            <Button variant="outline">Fetch SERP</Button>
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Content editor</CardTitle></CardHeader>
            <CardContent><Textarea rows={20} defaultValue="# How to launch a SaaS in 2026&#10;&#10;Launching a SaaS in 2026 is less about ideas and more about distribution…" /></CardContent>
          </Card>
        </div>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle>Content score</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <ProgressRing value={87} label="/ 100" />
              <div className="text-xs text-muted-foreground">Beats 82% of ranking pages</div>
            </CardContent>
          </Card>
          <Card><CardHeader><CardTitle>NLP terms</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {[
                { t: "ai seo tools", n: 12, target: 15, done: false },
                { t: "content humanizer", n: 5, target: 4, done: true },
                { t: "keyword clustering", n: 3, target: 3, done: true },
                { t: "ai detector", n: 1, target: 5, done: false },
                { t: "semantic search", n: 0, target: 2, done: false },
              ].map((k) => (
                <div key={k.t} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">{k.done ? <Check className="h-4 w-4 text-emerald-500" /> : <span className="h-2 w-2 rounded-full bg-amber-500" />}<span>{k.t}</span></div>
                  <span className="tabular-nums text-xs text-muted-foreground">{k.n}/{k.target}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card><CardHeader><CardTitle>Readability</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[["Grade level","8th",78],["Sentence length","Good",84],["Passive voice","3%",92]].map(([k,v,p])=>(
                <div key={k as string}><div className="flex justify-between text-sm"><span>{k}</span><span className="text-muted-foreground">{v}</span></div><Progress value={p as number} className="h-1.5 mt-1" /></div>
              ))}
            </CardContent>
          </Card>
          <Card><CardHeader><CardTitle>Suggestions</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2"><Link2 className="h-4 w-4 mt-0.5 text-primary" />Add 2 internal links to /blog/keyword-research</div>
              <div className="flex items-start gap-2"><ImageIcon className="h-4 w-4 mt-0.5 text-primary" />Add a featured image (1200×630)</div>
              <div className="flex items-start gap-2"><Badge variant="secondary" className="text-[10px]">H2</Badge>Add a section: "Distribution channels in 2026"</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  ),
});
