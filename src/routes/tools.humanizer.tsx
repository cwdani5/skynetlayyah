import { createFileRoute, useServerFn } from "@tanstack/react-router";
import { useState } from "react";
import { humanizeText } from "../lib/ai-tools.functions";

export const Route = createFileRoute("/tools/humanizer")({
  head: () => ({
    meta: [
      { title: "AI Humanizer — Rewrite AI text to sound human" },
      {
        name: "description",
        content:
          "Paste AI-generated text and get a natural, human-sounding rewrite in one click.",
      },
      { property: "og:title", content: "AI Humanizer" },
      {
        property: "og:description",
        content: "Rewrite AI text into natural, human-sounding writing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HumanizerPage,
});

function HumanizerPage() {
  const humanize = useServerFn(humanizeText);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit() {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setOutput("");
    try {
      const res = await humanize({ data: { text: input.trim() } });
      setOutput(res.output);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg.includes("402") ? "AI credits khatam ho gaye. Workspace mein credits add karein." : msg.includes("429") ? "Bahut zyada requests. Thodi der baad try karein." : msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-serif)] text-4xl md:text-5xl leading-tight tracking-tight">
        Humanizer
      </h1>
      <p className="mt-3 text-muted-foreground">
        AI-generated text ko natural, human writing mein rewrite karein.
      </p>

      <div className="mt-8 space-y-3">
        <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Your text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder="Paste AI-generated text here..."
          className="w-full resize-y rounded-md border border-border bg-background p-4 text-sm outline-none focus:border-foreground/40 transition"
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {input.length} / 8000
          </span>
          <button
            onClick={onSubmit}
            disabled={loading || !input.trim()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Humanizing..." : "Humanize"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-6 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {output && (
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Humanized
            </label>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="text-xs text-muted-foreground hover:text-foreground transition"
            >
              Copy
            </button>
          </div>
          <div className="whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-4 text-sm leading-relaxed">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}
