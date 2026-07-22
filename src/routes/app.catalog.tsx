import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { templateCatalog } from "@/lib/mock/enterprise";
import { Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const total = templateCatalog.reduce((s, c) => s + c.items.length, 0);

export const Route = createFileRoute("/app/catalog")({
  head: () => ({ meta: [{ title: "Template catalog — SEO Studio" }, { name: "description", content: "100+ AI writing templates for every format." }] }),
  component: () => (
    <AppShell title={`Template catalog · ${total}`} subtitle="100+ premium templates — pick a format and generate in one click." actions={<Button variant="outline">Request template</Button>}>
      <div className="mb-6"><div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search templates…" className="pl-9" />
      </div></div>
      <div className="flex flex-wrap gap-2 mb-6">
        {templateCatalog.map((c, i) => <Badge key={c.cat} variant={i === 0 ? "default" : "secondary"} className="cursor-pointer">{c.cat} · {c.items.length}</Badge>)}
      </div>
      <div className="space-y-8">
        {templateCatalog.map((c) => (
          <section key={c.cat}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">{c.cat}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {c.items.map((t) => (
                <Card key={t} className="group cursor-pointer hover:border-primary/40 hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{t}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">Ready template</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </AppShell>
  ),
});
