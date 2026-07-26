import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo size={44} />
          <div className="mt-3 text-[11px] font-bold uppercase tracking-[0.26em] text-primary">
            Cafe &amp; Photo Studio
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Skynet — Housing Colony Computer Market, Layyah. Latest government jobs, admissions,
            schemes ki information aur PKR 100 / 200 / 300 wale e-stamp paper services ek jaga.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a href="tel:03026760999" className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4" /> 0302-6760999</a>
            <a href="https://wa.me/923026760999" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary"><MessageCircle className="h-4 w-4" /> WhatsApp — 0302-6760999</a>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Housing Colony, Computer Market, Layyah</div>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/jobs" className="hover:text-primary">Latest Jobs</Link></li>
            <li><Link to="/admissions" className="hover:text-primary">Admissions</Link></li>
            <li><Link to="/schemes" className="hover:text-primary">Govt Schemes</Link></li>
            <li><Link to="/estamp" className="hover:text-primary">E-Stamp Services</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact & Visit</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3">Services at Shop</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>E-Stamp Papers (100/200/300 PKR)</li>
            <li>Online Job Applications</li>
            <li>University Admission Forms</li>
            <li>BISP / Ehsaas Verification</li>
            <li>NADRA & Utility Bills</li>
            <li>Printing, Scanning, Typing</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Skynet Layyah. All rights reserved.</div>
          <div className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> Info portal — not a govt website.</div>
        </div>
      </div>
    </footer>
  );
}
