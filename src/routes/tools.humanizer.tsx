import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
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
      setError(
        msg.includes("402")
          ? "AI credits khatam ho gaye. Workspace mein credits add karein."
          : msg.includes("429")
          ? "Bahut zyada requests. Thodi der baad try karein."
          : msg
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-px bg-[var(--midnight-700)] border border-[var(--midnight-700)] rounded-2xl overflow-hidden shadow-2xl shadow-black">
      {/* Input Panel */}
      <div className="bg-[var(--midnight-900)] p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 font-[family-name:var(--font-mono)]">
            Source Content
          </label>
          <span className="text-xs text-slate-500 tabular-nums">
            {input.length} / 8000 chars
          </span>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={8000}
          className="flex-1 w-full min-h-[380px] bg-[var(--midnight-950)] border border-[var(--midnight-700)] rounded-xl p-6 text-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--indigo-500)] transition-all resize-none leading-relaxed placeholder:text-slate-700"
          placeholder="Paste your AI-generated text here to humanize..."
        />

        <button
          onClick={onSubmit}
          disabled={loading || !input.trim()}
          className="w-full py-4 bg-[var(--indigo-500)] hover:bg-indigo-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-900/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-[family-name:var(--font-mono)]">
            {loading ? "HUMANIZING..." : "HUMANIZE TEXT"}
          </span>
          {!loading && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Output Panel */}
      <div className="bg-[var(--midnight-950)] p-6 md:p-8 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 font-[family-name:var(--font-mono)]">
            Refined Output
          </label>
          <span className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded border border-emerald-400/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            {loading ? "Processing" : output ? "Complete" : "System Ready"}
          </span>
        </div>

        {error && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm text-red-300">
            {error}
          </div>
        )}

        {output ? (
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 min-h-[380px] whitespace-pre-wrap rounded-xl border border-[var(--midnight-700)] bg-[var(--midnight-900)]/50 p-6 text-sm leading-relaxed text-slate-200 overflow-auto">
              {output}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(output)}
              className="self-end bg-[var(--midnight-900)] border border-[var(--midnight-700)] text-slate-300 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[var(--midnight-700)] transition-all"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy Results
            </button>
          </div>
        ) : (
          <div className="flex-1 min-h-[380px] rounded-xl border border-dashed border-[var(--midnight-700)] flex items-center justify-center text-center p-8">
            <div className="max-w-xs space-y-4">
              <div className="w-14 h-14 rounded-full bg-[var(--midnight-900)] border border-[var(--midnight-700)] flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-[var(--indigo-500)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">
                Humanized results will appear here after processing your input text.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
