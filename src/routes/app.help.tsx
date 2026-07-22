import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, MessageCircle, Zap } from "lucide-react";

export const Route = createFileRoute("/app/help")({
  head: () => ({ meta: [{ title: "Help Center — SEO Studio" }, { name: "description", content: "Docs, guides and support." }] }),
  component: () => (
    <AppShell title="Help Center" subtitle="Find answers, guides and reach support.">
      <Card className="mb-6"><CardContent className="p-6"><div className="relative max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search docs, guides and shortcuts…" className="pl-9 h-12 text-base" />
      </div></CardContent></Card>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { i: BookOpen, t: "Getting started", d: "The essentials to write your first optimized article." },
          { i: Zap, t: "AI Writer guides", d: "Best prompts, tone and template patterns." },
          { i: MessageCircle, t: "Contact support", d: "Reply within 4 hours on Pro and above." },
        ].map((c) => (
          <Card key={c.t} className="hover:shadow-lg transition"><CardContent className="p-6">
            <c.i className="h-6 w-6 text-primary" />
            <div className="mt-3 font-semibold">{c.t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{c.d}</div>
          </CardContent></Card>
        ))}
      </div>
    </AppShell>
  ),
});
