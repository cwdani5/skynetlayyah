import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/ui-kit";
import { Upload, FileText, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/app/plagiarism")({
  head: () => ({ meta: [{ title: "Plagiarism Checker — SEO Studio" }, { name: "description", content: "Check content originality across the web." }] }),
  component: () => (
    <AppShell title="Plagiarism Checker" subtitle="Scan across billions of pages and flag matching passages." actions={<Button><Upload className="h-4 w-4 mr-1.5" />Upload document</Button>}>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardHeader><CardTitle>Content</CardTitle></CardHeader><CardContent><Textarea rows={16} placeholder="Paste content to check…" /></CardContent></Card>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle>Similarity</CardTitle></CardHeader><CardContent className="flex items-center gap-6">
            <ProgressRing value={12} label="Match" />
            <div><div className="text-2xl font-semibold text-emerald-500">Original</div><div className="text-xs text-muted-foreground">3 matching passages · 12% overall</div></div>
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Matched sources</CardTitle></CardHeader><CardContent className="space-y-3">
            {[
              { src: "medium.com/@marketer/ai-tools", match: 8 },
              { src: "blog.hubspot.com/ai-content", match: 3 },
              { src: "content.com/humanize-guide", match: 1 },
            ].map((r) => (
              <div key={r.src} className="rounded-lg border p-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0"><FileText className="h-4 w-4 text-muted-foreground shrink-0" /><span className="truncate">{r.src}</span></div>
                  <a href="#" className="text-primary text-xs flex items-center gap-1"><ExternalLink className="h-3 w-3" />Open</a>
                </div>
                <Progress value={r.match * 10} className="h-1.5 mt-2" />
                <div className="mt-1 text-xs text-muted-foreground">{r.match}% match</div>
              </div>
            ))}
          </CardContent></Card>
          <Card><CardContent className="p-4 flex items-center justify-between"><div className="text-sm">Full similarity report</div><Button variant="outline" size="sm">Download PDF</Button></CardContent></Card>
        </div>
      </div>
    </AppShell>
  ),
});
