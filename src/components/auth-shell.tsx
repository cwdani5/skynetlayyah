import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";
import { Card } from "@/components/ui/card";

export function AuthShell({ title, subtitle, children, footer }: {
  title: string; subtitle: string; children: ReactNode; footer?: ReactNode;
}) {
  return (
    <div className="relative min-h-screen grid md:grid-cols-2 bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-brand opacity-60" />
      <div className="relative z-10 flex flex-col p-6 md:p-10">
        <Link to="/"><Logo /></Link>
        <div className="flex-1 flex items-center justify-center py-10">
          <Card className="w-full max-w-md p-8 shadow-xl">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-6">{children}</div>
            {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
          </Card>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 SEO Studio</div>
      </div>
      <div className="relative hidden md:block bg-gradient-to-br from-primary/20 via-background to-background border-l overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative h-full flex flex-col justify-center p-16">
          <div className="text-4xl font-semibold tracking-tight max-w-md leading-tight">
            The <span className="italic font-[family-name:var(--font-display)] text-primary">complete</span> AI SEO content workflow.
          </div>
          <p className="mt-4 max-w-md text-muted-foreground">Writer, optimizer, humanizer and detector — one workspace for your entire content team.</p>
          <div className="mt-10 grid gap-3 max-w-md">
            {["10,000 free words to start", "No credit card required", "Cancel anytime"].map((x) => (
              <div key={x} className="flex items-center gap-2 rounded-lg border bg-card/60 backdrop-blur px-4 py-3 text-sm"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{x}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
