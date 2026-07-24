import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { PostingCard, type Posting } from "@/components/posting-card";
import { listPostings } from "@/lib/postings.functions";
import { GraduationCap } from "lucide-react";
import { ListingHeader } from "./jobs";

const q = queryOptions({
  queryKey: ["postings", "admission"],
  queryFn: () => listPostings({ data: { type: "admission" } }) as Promise<Posting[]>,
});

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Open Admissions — Skynet Layyah" },
      { name: "description", content: "Latest university and college admissions in Pakistan — BS, MS, MBBS, MDCAT and more." },
      { property: "og:title", content: "Open Admissions — Skynet Layyah" },
      { property: "og:description", content: "Universities & colleges accepting applications." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: Page,
});

function Page() {
  const { data } = useSuspenseQuery(q);
  const [s, setS] = useState("");
  const filtered = useMemo(() => data.filter((p) => (p.title + " " + (p.organization ?? "") + " " + (p.location ?? "")).toLowerCase().includes(s.toLowerCase())), [data, s]);
  return (
    <SiteShell>
      <ListingHeader icon={<GraduationCap className="h-7 w-7" />} title="Open Admissions" subtitle="Universities, colleges aur professional programs mein admissions."
        count={data.length} query={s} onQueryChange={setS} placeholder="Search admissions, university, program…" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">Koi admissions match nahi kiye.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((p) => <PostingCard key={p.id} p={p} />)}</div>
        )}
      </div>
    </SiteShell>
  );
}
