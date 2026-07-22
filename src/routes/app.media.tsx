import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Folder } from "lucide-react";

export const Route = createFileRoute("/app/media")({
  head: () => ({ meta: [{ title: "Media Library — SEO Studio" }, { name: "description", content: "All images, prompts and files." }] }),
  component: () => (
    <AppShell title="Media Library" subtitle="Images, AI prompts and uploads." actions={<Button><Upload className="h-4 w-4 mr-1.5" />Upload</Button>}>
      <Card className="mb-4"><CardContent className="p-3 flex gap-2">
        <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search media…" className="pl-9" /></div>
        <Button variant="outline"><Folder className="h-4 w-4 mr-1.5" />All folders</Button>
      </CardContent></Card>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {Array.from({length: 18}).map((_, i) => (
          <Card key={i} className="overflow-hidden group hover:shadow-lg transition">
            <div className="aspect-square bg-gradient-to-br from-primary/30 via-primary/10 to-transparent flex items-center justify-center">
              <div className="text-xs text-primary/70 font-medium">IMG-{String(i+1).padStart(3,"0")}</div>
            </div>
            <div className="p-2 text-xs truncate">image-{i+1}.png</div>
          </Card>
        ))}
      </div>
    </AppShell>
  ),
});
