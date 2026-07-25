import { Link, useLocation } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Menu, X, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/admissions", label: "Admissions" },
  { to: "/schemes", label: "Schemes" },
  { to: "/estamp", label: "E-Stamp" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top strip */}
      <div className="hidden md:block border-b bg-primary text-primary-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 opacity-90">
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Housing Colony, Computer Market, Layyah</span>
            <span className="opacity-40">•</span>
            <span>E-Stamp Papers: PKR 100 / 200 / 300 available</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:03026760999" className="flex items-center gap-1.5 hover:underline"><Phone className="h-3.5 w-3.5" /> 0302-6760999</a>
            <a href="https://wa.me/923026760999" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:underline"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="shrink-0"><Logo /></Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted hover:text-foreground",
                  )}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => { toggleTheme(); setDark(isDark()); }}>
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Link to="/auth" className="hidden md:inline-flex">
              <Button size="sm" variant="outline" className="h-9 gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Admin</Button>
            </Link>
            <a href="https://wa.me/923026760999" target="_blank" rel="noreferrer" className="hidden md:inline-flex">
              <Button size="sm" className="h-9 gap-1.5"><MessageCircle className="h-4 w-4" /> Contact</Button>
            </a>
            <button className="md:hidden h-9 w-9 grid place-items-center rounded-md hover:bg-muted" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t bg-background">
            <div className="px-4 py-3 space-y-1">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                  className={cn("block px-3 py-2 rounded-md text-sm font-medium",
                    (n.to === "/" ? pathname === "/" : pathname.startsWith(n.to)) ? "bg-primary/10 text-primary" : "hover:bg-muted")}>
                  {n.label}
                </Link>
              ))}
              <div className="border-t pt-3 mt-2 flex items-center gap-2">
                <a href="tel:03026760999" className="flex-1"><Button variant="outline" size="sm" className="w-full gap-1.5"><Phone className="h-4 w-4" /> Call</Button></a>
                <a href="https://wa.me/923026760999" target="_blank" rel="noreferrer" className="flex-1"><Button size="sm" className="w-full gap-1.5"><MessageCircle className="h-4 w-4" /> WhatsApp</Button></a>
              </div>
              <Link to="/auth" onClick={() => setOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full mt-2 gap-1.5"><ShieldCheck className="h-4 w-4" /> Admin login</Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
