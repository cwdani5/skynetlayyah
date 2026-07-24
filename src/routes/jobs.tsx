import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { PostingCard, type Posting } from "@/components/posting-card";
import { listPostings } from "@/lib/postings.functions";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Briefcase } from "lucide-react";

const jobsQuery = queryOptions({
  queryKey: ["postings", "job"],
  queryFn: () => listPostings({ data: { type: "job" } }) as Promise<Posting[]>,
});

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Latest Jobs — Skynet Layyah" },
      { name: "description", content: "Latest government jobs in Pakistan — FPSC, PPSC, Police, Educators, NTS and more. Updated by Skynet Layyah." },
      { property: "og:title", content: "Latest Jobs — Skynet Layyah" },
      { property: "og:description", content: "Federal & provincial job openings, updated daily." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(jobsQuery),
  component: JobsPage,
});

function JobsPage() {
  const { data } = useSuspenseQuery(jobsQuery);
  const [q, setQ] = useState("");
  const filtered = useMemo(() =>
    data.filter((p) => (p.title + " " + (p.organization ?? "") + " " + (p.location ?? "")).toLowerCase().includes(q.toLowerCase())),
    [data, q],
  );

  return (
    <SiteShell>
      <ListingHeader
        icon={<Briefcase className="h-7 w-7" />}
        title="Latest Government Jobs"
        subtitle="Federal, provincial and local jobs across Pakistan — verified from official sources."
        count={data.length}
        query={q}
        onQueryChange={setQ}
        placeholder="Search jobs, department, location…"
      />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">Koi jobs match nahi kiye.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => <PostingCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </SiteShell>
  );
}

export function ListingHeader({ icon, title, subtitle, count, query, onQueryChange, placeholder }: {
  icon: React.ReactNode; title: string; subtitle: string; count: number;
  query: string; onQueryChange: (v: string) => void; placeholder: string;
}) {
  return (
    <section className="border-b bg-hero">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 grid place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">{icon}</div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">{title}</h1>
            <Badge variant="secondary" className="mt-1">{count} listings</Badge>
          </div>
        </div>
        <p className="text-muted-foreground max-w-2xl">{subtitle}</p>
        <div className="mt-5 relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder={placeholder} className="pl-9 h-11 bg-card" />
        </div>
      </div>
    </section>
  );
}
