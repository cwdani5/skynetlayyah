import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { SiteShell } from "@/components/site-shell";
import { PostingCard, type Posting } from "@/components/posting-card";
import { listPostings, countPostings } from "@/lib/postings.functions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, HandCoins, FileStack, ArrowRight, Phone, MessageCircle, MapPin, Sparkles, ShieldCheck, Printer, ScrollText } from "lucide-react";

const jobsQuery = queryOptions({
  queryKey: ["postings", "home", "job"],
  queryFn: () => listPostings({ data: { type: "job", limit: 3 } }) as Promise<Posting[]>,
});
const admissionsQuery = queryOptions({
  queryKey: ["postings", "home", "admission"],
  queryFn: () => listPostings({ data: { type: "admission", limit: 3 } }) as Promise<Posting[]>,
});
const schemesQuery = queryOptions({
  queryKey: ["postings", "home", "scheme"],
  queryFn: () => listPostings({ data: { type: "scheme", limit: 3 } }) as Promise<Posting[]>,
});
const countsQuery = queryOptions({
  queryKey: ["postings", "home", "counts"],
  queryFn: () => countPostings(),
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skynet Layyah — Jobs, Admissions, Schemes & E-Stamp" },
      { name: "description", content: "Skynet Housing Colony Computer Market Layyah. Government jobs, university admissions, schemes updates and PKR 100/200/300 e-stamp paper services." },
      { property: "og:title", content: "Skynet Layyah — Jobs, Admissions & E-Stamp" },
      { property: "og:description", content: "Latest jobs, admissions & e-stamp services at Skynet Layyah." },
    ],
  }),
  loader: ({ context }) => Promise.all([
    context.queryClient.ensureQueryData(jobsQuery),
    context.queryClient.ensureQueryData(admissionsQuery),
    context.queryClient.ensureQueryData(schemesQuery),
    context.queryClient.ensureQueryData(countsQuery),
  ]),
  component: HomePage,
});

function HomePage() {
  const { data: jobs } = useSuspenseQuery(jobsQuery);
  const { data: admissions } = useSuspenseQuery(admissionsQuery);
  const { data: schemes } = useSuspenseQuery(schemesQuery);
  const { data: counts } = useSuspenseQuery(countsQuery);


  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative bg-hero border-b overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <Badge className="mb-4 gap-1.5 bg-primary/10 text-primary hover:bg-primary/15 border-0"><Sparkles className="h-3 w-3" /> Layyah's trusted computer market service</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Jobs, Admissions & E-Stamp — <span className="text-primary">ek jaga.</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl">
              Skynet — Housing Colony Computer Market Layyah. Har roz update honay wali government jobs, university admissions, aur schemes ki details. Sath sath PKR <b>100 / 200 / 300</b> ke e-stamp papers hamari shop se turant milte hain.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/jobs"><Button size="lg" className="gap-2">Browse Jobs <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link to="/admissions"><Button size="lg" variant="outline">Admissions</Button></Link>
              <a href="https://wa.me/923026760999" target="_blank" rel="noreferrer">
                <Button size="lg" variant="ghost" className="gap-2"><MessageCircle className="h-4 w-4" /> WhatsApp Now</Button>
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <a href="tel:03026760999" className="flex items-center gap-1.5 hover:text-primary"><Phone className="h-4 w-4" /> 0302-6760999</a>
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Housing Colony, Layyah</span>
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-3xl p-6 shadow-2xl shadow-primary/10">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Briefcase, label: "Live Jobs", value: String(counts.job), to: "/jobs", big: true },
                  { icon: GraduationCap, label: "Admissions", value: String(counts.admission), to: "/admissions", big: true },
                  { icon: HandCoins, label: "Schemes", value: String(counts.scheme), to: "/schemes", big: true },
                  { icon: ScrollText, label: "E-Stamp Paper", value: "Rs 100 · 200 · 300", to: "/estamp", big: false },
                ].map((s) => (
                  <Link key={s.label} to={s.to} className="rounded-2xl border bg-card/80 p-4 hover:border-primary/40 hover:shadow-md transition-all min-w-0">
                    <s.icon className="h-6 w-6 text-primary" />
                    <div className={cn("mt-3 font-bold tracking-tight break-words", s.big ? "text-2xl" : "text-sm sm:text-base md:text-lg")}>{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </Link>
                ))}
              </div>
              <div className="mt-4 rounded-2xl bg-primary text-primary-foreground p-4 flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 shrink-0" />
                <div>
                  <div className="text-sm font-semibold">Verified from official sources</div>
                  <div className="text-xs opacity-80">FPSC, PPSC, HEC, universities aur official announcements.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Briefcase, label: "Latest Jobs", desc: "Federal, Punjab, Police, Educators", to: "/jobs" },
            { icon: GraduationCap, label: "Admissions", desc: "Universities, MDCAT, boards", to: "/admissions" },
            { icon: HandCoins, label: "Govt Schemes", desc: "BISP, Ehsaas, Kamyab Jawan", to: "/schemes" },
            { icon: FileStack, label: "E-Stamp Paper", desc: "PKR 100 / 200 / 300 at shop", to: "/estamp" },
          ].map((c) => (
            <Link key={c.label} to={c.to} className="flex items-center gap-3 rounded-xl border p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-primary/10 text-primary"><c.icon className="h-5 w-5" /></div>
              <div>
                <div className="text-sm font-semibold">{c.label}</div>
                <div className="text-xs text-muted-foreground">{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Section title="Latest Jobs" desc="Freshest federal & provincial vacancies" to="/jobs" items={jobs} />
      <Section title="Open Admissions" desc="Universities & colleges accepting applications" to="/admissions" items={admissions} />
      <Section title="Government Schemes" desc="BISP, Ehsaas, Kamyab Jawan & more" to="/schemes" items={schemes} />

      {/* E-stamp CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground p-8 md:p-12">
          <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <Badge className="bg-white/15 text-white hover:bg-white/20 border-0 mb-3">E-Stamp Services</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold">PKR 100 / 200 / 300 E-Stamp Paper</h2>
              <p className="mt-3 opacity-90 max-w-lg">Legal documents, agreements, affidavits — hamari shop se same-day e-stamp paper mil jaye ga. Punjab Government verified.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="https://wa.me/923026760999?text=Assalamualaikum,%20mujhe%20e-stamp%20paper%20chahiye" target="_blank" rel="noreferrer">
                  <Button size="lg" variant="secondary" className="gap-2"><MessageCircle className="h-4 w-4" /> Order on WhatsApp</Button>
                </a>
                <Link to="/estamp"><Button size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">Details</Button></Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {["100", "200", "300"].map((v) => (
                <div key={v} className="rounded-2xl bg-white/15 backdrop-blur border border-white/20 p-5 text-center">
                  <ScrollText className="h-6 w-6 mx-auto opacity-80" />
                  <div className="mt-2 text-3xl font-extrabold">PKR {v}</div>
                  <div className="text-xs opacity-80">E-Stamp Paper</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extra shop services */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold">Hamari shop par aur bhi services</h2>
        <p className="text-sm text-muted-foreground mt-1">Verifications, domiciles, WAPDA files aur documentation — sab ek jaga.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { i: ShieldCheck, t: "IBCC Verification", d: "Foreign/local equivalence certificates ki attestation." },
            { i: ShieldCheck, t: "Board Verification", d: "BISE (Matric/Inter) result & certificate verification." },
            { i: ShieldCheck, t: "HEC Verification", d: "Degree attestation for HEC — online booking + submission." },
            { i: ShieldCheck, t: "MOFA Verification", d: "Ministry of Foreign Affairs attestation for abroad use." },
            { i: MapPin, t: "Domicile (Layyah/Karor/Chaubara)", d: "Domicile certificate application & processing." },
            { i: ScrollText, t: "WAPDA Files & Applications", d: "Naya meter, load extension, name change, bills." },
            { i: FileStack, t: "Online Job Applications", d: "FPSC/PPSC/NTS/etc. forms submission." },
            { i: GraduationCap, t: "Admission Forms", d: "Universities aur colleges ki forms online." },
            { i: HandCoins, t: "BISP / Ehsaas Check", d: "Eligibility aur payment status verification." },
            { i: ShieldCheck, t: "NADRA & Utility Bills", d: "Bill payments aur NADRA services." },
            { i: Printer, t: "Printing / Scanning / Typing", d: "Color/B&W printing, scanning, composing." },
            { i: ScrollText, t: "Legal Documents & Affidavits", d: "Agreements, affidavits typing + e-stamp." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl border bg-card p-5 hover:border-primary/40 transition">
              <s.i className="h-6 w-6 text-primary" />
              <div className="mt-3 font-semibold">{s.t}</div>
              <div className="text-sm text-muted-foreground">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

    </SiteShell>
  );
}

function Section({ title, desc, to, items }: { title: string; desc: string; to: string; items: Posting[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{desc}</p>
        </div>
        <Link to={to}><Button variant="ghost" className="gap-1.5">View all <ArrowRight className="h-4 w-4" /></Button></Link>
      </div>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-muted-foreground">Abhi koi entry nahi. Admin panel se add karen.</div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => <PostingCard key={p.id} p={p} />)}
        </div>
      )}
    </section>
  );
}
