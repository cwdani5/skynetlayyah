import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Skynet Layyah" },
      { name: "description", content: "Contact Skynet — Housing Colony Computer Market, Layyah. Phone 0302-6760999, WhatsApp available." },
      { property: "og:title", content: "Contact — Skynet Layyah" },
      { property: "og:description", content: "Visit Skynet Housing Colony Computer Market Layyah." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <SiteShell>
      <section className="bg-hero border-b">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-extrabold">Aap tak pahunchna aasan hai</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">Koi bhi query, order ya info ke liye WhatsApp par message bhejein ya seedha shop par tashreef laayen.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 grid gap-6 md:grid-cols-3">
        {[
          { i: Phone, t: "Call", v: "0302-6760999", href: "tel:03026760999", cta: "Call now" },
          { i: MessageCircle, t: "WhatsApp", v: "0302-6760999", href: "https://wa.me/923026760999", cta: "Open WhatsApp" },
          { i: MapPin, t: "Visit", v: "Housing Colony, Computer Market, Layyah", href: "https://maps.google.com/?q=Housing+Colony+Computer+Market+Layyah", cta: "Get directions" },
        ].map((c) => (
          <div key={c.t} className="rounded-3xl border bg-card p-8 text-center hover:shadow-lg hover:border-primary/40 transition">
            <div className="h-14 w-14 mx-auto grid place-items-center rounded-2xl bg-primary/10 text-primary"><c.i className="h-7 w-7" /></div>
            <div className="mt-4 text-lg font-semibold">{c.t}</div>
            <div className="mt-1 text-sm text-muted-foreground">{c.v}</div>
            <a href={c.href} target="_blank" rel="noreferrer"><Button className="mt-5 w-full">{c.cta}</Button></a>
          </div>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="rounded-3xl border bg-card p-8 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Timings & info</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Mon–Sat: 9:00 AM – 9:00 PM</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Sunday: 2:00 PM – 8:00 PM</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> WhatsApp preferred for quickest reply</li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden border aspect-video">
            <iframe
              title="Skynet Layyah map"
              src="https://www.google.com/maps?q=Housing+Colony+Computer+Market+Layyah&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
