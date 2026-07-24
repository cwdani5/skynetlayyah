import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollText, ShieldCheck, MessageCircle, Phone, MapPin, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/estamp")({
  head: () => ({
    meta: [
      { title: "E-Stamp Papers 100/200/300 — Skynet Layyah" },
      { name: "description", content: "Punjab government verified e-stamp papers of PKR 100, 200 and 300 available at Skynet Housing Colony Computer Market, Layyah." },
      { property: "og:title", content: "E-Stamp Papers — Skynet Layyah" },
      { property: "og:description", content: "PKR 100/200/300 e-stamp papers same-day at Skynet Layyah." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="bg-hero border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <Badge className="mb-3 bg-primary/10 text-primary border-0">Punjab Govt • Verified</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">E-Stamp Papers — PKR 100 / 200 / 300</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">Skynet Layyah par legal e-stamp papers same-day available hain. Affidavits, agreements, rent contracts, undertakings — sab ke liye.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid gap-4 sm:grid-cols-3">
        {[
          { v: "100", u: "Affidavits, undertakings" },
          { v: "200", u: "Rent agreements, general" },
          { v: "300", u: "Sale/purchase, higher-value" },
        ].map((c) => (
          <div key={c.v} className="rounded-3xl border bg-card p-8 text-center hover:shadow-lg hover:border-primary/40 transition">
            <div className="h-14 w-14 mx-auto grid place-items-center rounded-2xl bg-primary/10 text-primary"><ScrollText className="h-7 w-7" /></div>
            <div className="mt-4 text-4xl font-extrabold">PKR {c.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">E-Stamp Paper</div>
            <div className="mt-4 text-xs text-muted-foreground">{c.u}</div>
            <a href={`https://wa.me/923026760999?text=${encodeURIComponent(`Assalamualaikum, mujhe PKR ${c.v} ka e-stamp paper chahiye`)}`} target="_blank" rel="noreferrer">
              <Button className="mt-5 w-full gap-2"><MessageCircle className="h-4 w-4" /> Order on WhatsApp</Button>
            </a>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-14 grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border bg-card p-8">
          <h2 className="text-2xl font-bold">Process</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              "CNIC aur mukhtasar details WhatsApp / visit karke share karen.",
              "Amount confirm karen (100 / 200 / 300 PKR + service charges).",
              "Skynet system se e-stamp generate hoga.",
              "Print same-day mil jaye ga — Punjab Govt verified QR ke saath.",
            ].map((s) => (
              <li key={s} className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {s}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border bg-primary text-primary-foreground p-8">
          <ShieldCheck className="h-8 w-8" />
          <h2 className="mt-3 text-2xl font-bold">Visit Skynet — Layyah</h2>
          <p className="opacity-90 mt-2 text-sm">Housing Colony, Computer Market, Layyah</p>
          <div className="mt-6 grid gap-2 text-sm">
            <a href="tel:03026760999" className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0302-6760999</a>
            <a href="https://wa.me/923026760999" target="_blank" rel="noreferrer" className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Housing Colony, Computer Market</div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
