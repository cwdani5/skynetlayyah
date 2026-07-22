import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

const projects = [
  {
    year: "2026",
    title: "Meridian",
    description: "A calendar app that treats time as landscape, not grid.",
    tag: "Product design",
  },
  {
    year: "2025",
    title: "Fieldnotes",
    description: "Journaling tool for people who write to think.",
    tag: "iOS · SwiftUI",
  },
  {
    year: "2024",
    title: "Halcyon Studio",
    description: "Brand identity and site for an independent design studio.",
    tag: "Identity · Web",
  },
  {
    year: "2023",
    title: "Ochre",
    description: "A reading companion for long-form essays and archives.",
    tag: "Web app",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-sans)]">
      <div className="mx-auto max-w-2xl px-6 py-20 md:py-32">
        {/* Header */}
        <header className="flex items-center justify-between text-sm">
          <span className="font-medium">Aditya Sharma</span>
          <nav className="flex gap-6 text-muted-foreground">
            <a href="#work" className="hover:text-foreground transition-colors">Work</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <Link to="/tools/humanizer" className="hover:text-foreground transition-colors">Tools</Link>
            <a href="mailto:hello@example.com" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </header>

        {/* Hero */}
        <section className="mt-24 md:mt-32">
          <h1 className="font-[family-name:var(--font-serif)] text-5xl md:text-6xl leading-[1.05] tracking-tight">
            Designer and developer
            <br />
            making <em className="italic text-muted-foreground">quiet, considered</em> software.
          </h1>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            Currently independent, working with founders and small teams on
            product identity, interface systems, and the occasional website that
            takes itself less seriously than it should.
          </p>
        </section>

        {/* Work */}
        <section id="work" className="mt-24 md:mt-32">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Selected work
          </h2>
          <ul className="mt-8 divide-y divide-border">
            {projects.map((p) => (
              <li key={p.title} className="group py-6">
                <div className="flex items-baseline justify-between gap-6">
                  <div className="flex items-baseline gap-6">
                    <span className="text-sm tabular-nums text-muted-foreground w-12">
                      {p.year}
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-serif)] text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground max-w-md">
                        {p.description}
                      </p>
                    </div>
                  </div>
                  <span className="hidden md:block text-xs text-muted-foreground whitespace-nowrap">
                    {p.tag}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* About */}
        <section id="about" className="mt-24 md:mt-32">
          <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            About
          </h2>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              I've spent the last eight years designing and building for
              startups across finance, media, and health. Before that, I studied
              architecture, which is where the fondness for whitespace comes
              from.
            </p>
            <p>
              I care about typography, sensible defaults, and interfaces that
              tell you what they are without shouting.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 md:mt-32 flex flex-wrap items-baseline justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground">
          <span>© 2026 Aditya Sharma</span>
          <div className="flex gap-6">
            <a href="mailto:hello@example.com" className="hover:text-foreground transition-colors">Email</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">Read.cv</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
