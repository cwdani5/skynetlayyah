import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import {
  ArrowRight, Sparkles, ShieldCheck, Search, LineChart, PenLine, Wand2,
  Check, Star, Zap, Layers, Globe2, Users, Bot,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEO Studio — Enterprise AI SEO Content Platform" },
      { name: "description", content: "Write, optimize, humanize and detect AI content — the complete enterprise SEO content workflow." },
      { property: "og:title", content: "SEO Studio — Enterprise AI SEO Content Platform" },
      { property: "og:description", content: "Write, optimize, humanize and detect AI content — the complete enterprise SEO content workflow." },
    ],
  }),
  component: LandingPage,
});

const features = [
  { icon: PenLine, title: "AI Writer", desc: "Long-form blogs, product copy, ads, emails — 40+ templates tuned for conversion." },
  { icon: Search, title: "SEO Optimizer", desc: "Content score, NLP terms, internal links and readability — everything Surfer-style, unified." },
  { icon: Wand2, title: "Humanizer", desc: "Rewrite AI text with natural burstiness and perplexity. Passes major detectors." },
  { icon: ShieldCheck, title: "AI Detector", desc: "Sentence-level probability, verdict and confidence — powered by our own detection engine." },
  { icon: LineChart, title: "Analytics", desc: "Track words, SEO score, traffic estimation and team velocity across every project." },
  { icon: Layers, title: "Templates", desc: "Briefs, outlines, meta, schema and FAQs generated with a single prompt." },
];

const logos = ["Northwind", "Acme Labs", "Vercel Post", "Linear News", "Framer", "Notion"];

const tiers = [
  { name: "Free", price: "$0", tag: "Get started", features: ["10k words / month", "3 SEO scans", "1 workspace", "Community support"] },
  { name: "Pro", price: "$29", tag: "Most popular", featured: true, features: ["100k words / month", "Unlimited SEO scans", "5 workspaces", "AI Detector + Humanizer", "Priority support"] },
  { name: "Agency", price: "$99", tag: "Teams", features: ["500k words / month", "Team roles + review", "Client workspaces", "White-label reports", "SSO"] },
  { name: "Enterprise", price: "Custom", tag: "Scale", features: ["Unlimited words", "Dedicated infra", "Custom models", "SLA + DPA", "Solutions engineer"] },
];

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      {/* Nav */}
      <header className="relative z-10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
            <Link to="/app/dashboard" className="hover:text-foreground">Product</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/signup"><Button size="sm">Start free <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 pt-16 md:pt-24 pb-16 text-center">
        <Badge variant="secondary" className="mx-auto gap-1.5 rounded-full py-1"><Sparkles className="h-3 w-3 text-primary" /> New · Detector v4 + Humanizer</Badge>
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
          The <span className="font-[family-name:var(--font-display)] italic text-primary">complete</span> AI SEO content platform.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Write, optimize, humanize and detect AI content in one workspace. Built for content teams that ship every day.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/signup"><Button size="lg" className="h-12 px-6 text-base">Start writing free <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          <Link to="/app/dashboard"><Button size="lg" variant="outline" className="h-12 px-6 text-base">Live product tour</Button></Link>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">No credit card · 10,000 free words · Cancel anytime</div>

        {/* Product frame */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 blur-2xl opacity-70" />
          <div className="relative rounded-2xl border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b px-4 py-2.5">
              <div className="flex gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-red-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" /></div>
              <div className="ml-4 text-xs text-muted-foreground">seostudio.app / editor / how-to-launch-saas</div>
            </div>
            <div className="grid grid-cols-12 gap-0 min-h-[420px]">
              <div className="col-span-3 border-r p-4 space-y-3 text-left">
                {["Dashboard", "AI Writer", "SEO Optimizer", "Humanizer", "AI Detector", "Keywords", "Analytics"].map((i, idx) => (
                  <div key={i} className={`rounded-md px-3 py-2 text-xs ${idx===1?"bg-primary/10 text-primary font-medium":"text-muted-foreground"}`}>{i}</div>
                ))}
              </div>
              <div className="col-span-6 p-6 text-left">
                <div className="text-xs text-muted-foreground">Draft · autosaved 2s ago</div>
                <h3 className="mt-1 text-xl font-semibold">How to launch a profitable SaaS in 2026</h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>Launching a SaaS in 2026 is less about ideas and more about distribution. The playbook has shifted…</p>
                  <p>Start by picking a category with declining incumbents. Talk to twenty operators. Ship in fourteen days.</p>
                  <p className="text-foreground">The winners will build for speed, not for scale.</p>
                </div>
              </div>
              <div className="col-span-3 border-l p-4 space-y-4 text-left">
                <div>
                  <div className="text-xs text-muted-foreground">SEO Score</div>
                  <div className="text-2xl font-semibold text-emerald-500">92</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Human Score</div>
                  <div className="text-2xl font-semibold">96%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Word count</div>
                  <div className="text-2xl font-semibold tabular-nums">1,842</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logos */}
        <div className="mt-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Trusted by fast-moving content teams</p>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-6 gap-6 opacity-70">
            {logos.map((l) => <div key={l} className="text-sm font-medium tracking-tight text-muted-foreground">{l}</div>)}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="secondary" className="rounded-full">Platform</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">Everything the modern content team needs</h2>
          <p className="mt-3 text-muted-foreground">From keyword to publish — replace Surfer, Jasper, Frase and Clearscope with one workspace.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="group relative overflow-hidden transition hover:-translate-y-0.5 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="inline-flex rounded-xl bg-primary/10 p-2.5 text-primary"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition group-hover:opacity-100" />
            </Card>
          ))}
        </div>
      </section>

      {/* Split */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <Badge variant="secondary" className="rounded-full">Humanizer + Detector</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">Ship content that actually reads human.</h2>
          <p className="mt-3 text-muted-foreground">Our humanizer rewrites AI text with natural burstiness. Our detector verifies it. Ship with confidence.</p>
          <ul className="mt-6 space-y-3">
            {["Sentence-level AI probability", "Rewrites without changing meaning", "6 tone presets", "Bulk mode for teams"].map((x) => (
              <li key={x} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 text-primary" />{x}</li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2">
            <Link to="/app/humanizer"><Button>Try Humanizer</Button></Link>
            <Link to="/app/detector"><Button variant="outline">Try Detector</Button></Link>
          </div>
        </div>
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between"><div className="text-sm font-medium">AI Detection Report</div><Badge className="bg-emerald-500/15 text-emerald-500">Human</Badge></div>
          <div className="rounded-lg border p-4 text-sm leading-relaxed">
            <span className="bg-emerald-500/10">Launching a SaaS in 2026 is less about ideas and more about distribution.</span>{" "}
            <span className="bg-amber-500/15">The playbook has shifted with the arrival of general purpose agents.</span>{" "}
            <span>Winners will build for speed, not for scale.</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-muted/50 p-3"><div className="text-xs text-muted-foreground">AI</div><div className="text-xl font-semibold">6%</div></div>
            <div className="rounded-lg bg-muted/50 p-3"><div className="text-xs text-muted-foreground">Human</div><div className="text-xl font-semibold text-emerald-500">94%</div></div>
            <div className="rounded-lg bg-muted/50 p-3"><div className="text-xs text-muted-foreground">Confidence</div><div className="text-xl font-semibold">High</div></div>
          </div>
        </Card>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="secondary" className="rounded-full">Pricing</Badge>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight">Pricing that scales with your team</h2>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade when you need more words, seats, or workspaces.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <Card key={t.name} className={`relative ${t.featured ? "border-primary shadow-xl shadow-primary/10" : ""}`}>
              {t.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><Badge className="rounded-full">Most popular</Badge></div>}
              <CardContent className="p-6">
                <div className="text-sm font-medium text-muted-foreground">{t.name}</div>
                <div className="mt-2 flex items-baseline gap-1"><div className="text-4xl font-semibold tracking-tight">{t.price}</div><div className="text-sm text-muted-foreground">/mo</div></div>
                <div className="mt-1 text-xs text-muted-foreground">{t.tag}</div>
                <Link to="/signup"><Button className="mt-5 w-full" variant={t.featured ? "default" : "outline"}>Get started</Button></Link>
                <ul className="mt-6 space-y-2 text-sm">{t.features.map((f) => <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary shrink-0" />{f}</li>)}</ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 md:px-8 py-24">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { q: "We replaced Jasper, Surfer and Copyscape with one tool. Content velocity 3x.", n: "Ava Patel", r: "Head of Content, Northwind" },
            { q: "The humanizer is genuinely better than anything on the market right now.", n: "Marcus Lee", r: "Founder, Copyflow" },
            { q: "SEO Studio saved us 40 hours a week across the editorial team.", n: "Rina Okafor", r: "Editor-in-Chief, Framer News" },
          ].map((t) => (
            <Card key={t.n}><CardContent className="p-6">
              <div className="flex gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-4 text-sm leading-relaxed">"{t.q}"</p>
              <div className="mt-4 text-sm"><div className="font-medium">{t.n}</div><div className="text-muted-foreground">{t.r}</div></div>
            </CardContent></Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 mx-auto max-w-3xl px-4 md:px-8 py-24">
        <h2 className="text-4xl font-semibold tracking-tight text-center">Common questions</h2>
        <div className="mt-10 divide-y rounded-2xl border">
          {[
            { q: "Do I need a credit card to try?", a: "No. Every account starts with 10,000 free words and full access to all tools." },
            { q: "Can I bring my own OpenAI key?", a: "Yes on Agency and Enterprise. Otherwise we handle the model routing for you." },
            { q: "Does the humanizer bypass detectors?", a: "Our humanizer consistently outperforms leading detectors — but no tool is 100%." },
            { q: "Do you support teams?", a: "Yes. Roles, review flows and client workspaces are built in on Pro and above." },
          ].map((f) => (
            <details key={f.q} className="group px-5 py-4"><summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-medium">{f.q}<span className="text-muted-foreground group-open:rotate-45 transition">+</span></summary><p className="mt-2 text-sm text-muted-foreground">{f.a}</p></details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 md:px-8 pb-24">
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary via-primary to-primary/70 p-10 md:p-16 text-primary-foreground text-center">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
          <h2 className="relative text-4xl md:text-5xl font-semibold tracking-tight">Ship better content, faster.</h2>
          <p className="relative mt-3 opacity-90">Join 40,000+ content teams using SEO Studio every day.</p>
          <div className="relative mt-6 flex justify-center gap-3">
            <Link to="/signup"><Button size="lg" variant="secondary" className="h-12 px-6">Start free</Button></Link>
            <Link to="/app/dashboard"><Button size="lg" variant="outline" className="h-12 px-6 bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">Open the app</Button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-10 grid gap-8 md:grid-cols-4">
          <div><Logo /><p className="mt-3 text-sm text-muted-foreground">The complete AI SEO content platform for modern teams.</p></div>
          {[
            { h: "Product", l: ["Features", "Pricing", "Changelog", "Roadmap"] },
            { h: "Company", l: ["About", "Blog", "Careers", "Contact"] },
            { h: "Resources", l: ["Docs", "API", "Community", "Status"] },
          ].map((c) => (
            <div key={c.h}><div className="text-sm font-semibold">{c.h}</div><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{c.l.map((x) => <li key={x}><a href="#" className="hover:text-foreground">{x}</a></li>)}</ul></div>
          ))}
        </div>
        <div className="border-t"><div className="mx-auto max-w-7xl px-4 md:px-8 py-5 flex justify-between text-xs text-muted-foreground"><div>© 2026 SEO Studio</div><div className="flex gap-4"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">DPA</a></div></div></div>
      </footer>
    </div>
  );
}
