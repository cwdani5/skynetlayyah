import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, FileText, Layers } from "lucide-react";

export const Route = createFileRoute("/app/library")({
  head: () => ({ meta: [{ title: "Library — SEO Studio" }, { name: "description", content: "Shared prompts, snippets and brand assets." }] }),
  component: () => (
    <AppShell title="Library" subtitle="Prompts, snippets and brand assets shared across your workspace.">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { i: Book, t: "Prompt library", n: 42 },
          { i: FileText, t: "Snippets", n: 128 },
          { i: Layers, t: "Brand voices", n: 6 },
        ].map((c) => (
          <Card key={c.t}><CardContent className="p-6 flex items-start justify-between">
            <div><c.i className="h-6 w-6 text-primary" /><div className="mt-3 font-semibold">{c.t}</div><div className="text-xs text-muted-foreground mt-1">Curated & versioned</div></div>
            <Badge variant="secondary">{c.n}</Badge>
          </CardContent></Card>
        ))}
      </div>
    </AppShell>
  ),
});
