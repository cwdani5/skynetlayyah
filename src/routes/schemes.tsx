import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { PostingCard, type Posting } from "@/components/posting-card";
import { listPostings } from "@/lib/postings.functions";
import { HandCoins } from "lucide-react";
import { ListingHeader } from "./jobs";

const q = queryOptions({
  queryKey: ["postings", "scheme"],
  queryFn: () => listPostings({ data: { type: "scheme" } }) as Promise<Posting[]>,
});

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Schemes — Skynet Layyah" },
      { name: "description", content: "BISP, Ehsaas, Kamyab Jawan aur dusri government schemes ki information." },
      { property: "og:title", content: "Government Schemes — Skynet Layyah" },
      { property: "og:description", content: "Pakistan government schemes at Skynet Layyah." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(q),
  component: Page,
});

function Page() {
  const { data } = useSuspenseQuery(q);
  const [s, setS] = useState("");
  const filtered = useMemo(() => data.filter((p) => (p.title + " " + (p.organization ?? "")).toLowerCase().includes(s.toLowerCase())), [data, s]);
  return (
    <SiteShell>
      <ListingHeader icon={<HandCoins className="h-7 w-7" />} title="Government Schemes" subtitle="Federal aur provincial welfare programs — eligibility aur application details."
        count={data.length} query={s} onQueryChange={setS} placeholder="Search scheme name…" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground">Koi scheme match nahi.</div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((p) => <PostingCard key={p.id} p={p} />)}</div>
        )}
      </div>
    </SiteShell>
  );
}
