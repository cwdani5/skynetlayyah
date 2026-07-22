import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useServerFn } from "@tanstack/react-start";
import { detectAiText } from "@/lib/ai-tools.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/ui-kit";
import { Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/detector")({
  head: () => ({ meta: [{ title: "AI Detector — SEO Studio" }, { name: "description", content: "Detect whether text was written by AI." }] }),
  component: DetectorPage,
});

type Result = { aiScore: number; verdict: string; reasons: string[] };

function DetectorPage() {
  const detect = useServerFn(detectAiText);
  const [input, setInput] = useState("");
  const [res, setRes] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    if (!input.trim()) return;
    setLoading(true); setRes(null);
    try { const r = await detect({ data: { text: input } }); setRes(r); }
    catch { setRes({ aiScore: 0, verdict: "Error", reasons: ["Detection failed."] }); }
    finally { setLoading(false); }
  }

  const tone = res && res.aiScore >= 60 ? "text-red-500" : res && res.aiScore >= 40 ? "text-amber-500" : "text-emerald-500";

  return (
    <AppShell
      title="AI Detector"
      subtitle="Analyze text and estimate the probability it was AI-generated."
      actions={<Button onClick={run} disabled={loading || !input.trim()}>{loading ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <ShieldCheck className="h-4 w-4 mr-1.5" />}Analyze</Button>}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between"><CardTitle>Text to analyze</CardTitle><Badge variant="secondary">{input.length} chars</Badge></CardHeader>
          <CardContent>
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste text to check…" className="min-h-[420px] resize-none" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Detection report</CardTitle></CardHeader>
          <CardContent>
            {loading && <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />Running probability analysis…</div>}
            {!loading && !res && <div className="text-sm text-muted-foreground">Report appears here after analysis.</div>}
            {res && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <ProgressRing value={res.aiScore} label="AI %" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">Verdict</div>
                    <div className={`text-2xl font-semibold ${tone}`}>{res.verdict}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Human likelihood: {100 - res.aiScore}%</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">AI</div><div className={`text-xl font-semibold ${tone}`}>{res.aiScore}%</div></div>
                  <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Human</div><div className="text-xl font-semibold">{100 - res.aiScore}%</div></div>
                  <div className="rounded-lg border p-3"><div className="text-xs text-muted-foreground">Confidence</div><div className="text-xl font-semibold">{res.aiScore > 75 || res.aiScore < 25 ? "High" : "Med"}</div></div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Reasoning</div>
                  <ul className="space-y-2">
                    {res.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 rounded-lg border p-3 text-sm">
                        <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />{r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
