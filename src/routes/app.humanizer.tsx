import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useServerFn } from "@tanstack/react-start";
import { humanizeText } from "@/lib/ai-tools.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/humanizer")({
  head: () => ({ meta: [{ title: "Humanizer — SEO Studio" }, { name: "description", content: "Rewrite AI content to read naturally human." }] }),
  component: HumanizerPage,
});

function HumanizerPage() {
  const humanize = useServerFn(humanizeText);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    if (!input.trim()) return;
    setLoading(true); setOutput("");
    try { const r = await humanize({ data: { text: input } }); setOutput(r.output); }
    catch (e) { setOutput("Failed to humanize. Try again."); }
    finally { setLoading(false); }
  }

  return (
    <AppShell
      title="Content Humanizer"
      subtitle="Rewrite AI-generated text so it reads like a thoughtful human wrote it."
      actions={<Button onClick={run} disabled={loading || !input.trim()}>{loading ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <Sparkles className="h-4 w-4 mr-1.5" />}Humanize</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Input</CardTitle><Badge variant="secondary">{input.length} chars</Badge></CardHeader>
            <CardContent>
              <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste AI-generated content here…" className="min-h-[380px] resize-none font-normal" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Humanized output</CardTitle>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" disabled={!output} onClick={() => navigator.clipboard.writeText(output)}><Copy className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" disabled={!output} onClick={() => setOutput("")}><RotateCcw className="h-4 w-4" /></Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[380px] rounded-lg border bg-muted/20 p-4 text-sm whitespace-pre-wrap leading-relaxed">
                {loading ? <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Rewriting for natural burstiness…</div>
                  : output || <span className="text-muted-foreground">Your humanized text will appear here.</span>}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Style controls</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select defaultValue="natural">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Natural","Professional","Friendly","Academic","Marketing","Conversational"].map((t) => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2"><div className="flex justify-between"><Label>Burstiness</Label><span className="text-xs text-muted-foreground">72</span></div><Slider defaultValue={[72]} max={100} /></div>
            <div className="space-y-2"><div className="flex justify-between"><Label>Perplexity</Label><span className="text-xs text-muted-foreground">65</span></div><Slider defaultValue={[65]} max={100} /></div>
            <div className="space-y-2"><div className="flex justify-between"><Label>Sentence variation</Label><span className="text-xs text-muted-foreground">80</span></div><Slider defaultValue={[80]} max={100} /></div>
            <div className="space-y-2"><Label>Target reader</Label>
              <Select defaultValue="general"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{["General","Executive","Developer","Academic","Marketer"].map((t) => <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
              Humanizer tuning is applied server-side. Free plan uses default tuning.
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
