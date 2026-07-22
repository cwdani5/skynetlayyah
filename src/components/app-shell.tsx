import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard, PenLine, Search, Sparkles, ShieldCheck, ScanSearch,
  KeyRound, FileText, ListTree, Newspaper, ShoppingBag, LayoutTemplate,
  Mail, Megaphone, Share2, Tags, HelpCircle, Braces, LibraryBig,
  FolderKanban, FileStack, Images, LineChart, CreditCard, Users2,
  Bell, Settings, LifeBuoy, ShieldAlert, ChevronsLeft, Search as SearchIcon,
  Sun, Moon, Command, Plus, Building2, UserCog, Activity, ScrollText,
  Briefcase, Inbox, MessageSquare, Receipt, Kanban, Radar, TrendingUp,
  Network, Trophy, Link2, Timer, BarChart3, Calendar, DollarSign,
  Files, Upload, Ticket, ToggleLeft, ServerCog, AlertOctagon, Layers,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toggleTheme, isDark } from "@/lib/theme";

type Item = { to: string; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string };
type Group = { label: string; items: Item[] };

const groups: Group[] = [
  {
    label: "Overview",
    items: [
      { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/app/projects", label: "Projects", icon: FolderKanban },
      { to: "/app/pipeline", label: "Pipeline", icon: Kanban, badge: "New" },
      { to: "/app/documents", label: "Documents", icon: FileStack },
      { to: "/app/media", label: "Media Library", icon: Images },
      { to: "/app/files", label: "File Manager", icon: Files },
    ],
  },
  {
    label: "AI Writing",
    items: [
      { to: "/app/ai-writer", label: "AI Writer", icon: PenLine },
      { to: "/app/blog-generator", label: "Blog Generator", icon: Newspaper },
      { to: "/app/brief", label: "Content Brief", icon: ListTree },
      { to: "/app/templates", label: "Templates", icon: LayoutTemplate },
      { to: "/app/catalog", label: "Template Catalog", icon: Layers, badge: "100+" },
    ],
  },
  {
    label: "SEO & Research",
    items: [
      { to: "/app/seo", label: "SEO Optimizer", icon: Search },
      { to: "/app/keywords", label: "Keyword Research", icon: KeyRound },
      { to: "/app/meta", label: "Meta Generator", icon: Tags },
      { to: "/app/schema", label: "Schema Generator", icon: Braces },
      { to: "/app/faq", label: "FAQ Generator", icon: HelpCircle },
    ],
  },
  {
    label: "SEO Intelligence",
    items: [
      { to: "/app/competitors", label: "Competitors", icon: Radar },
      { to: "/app/serp", label: "SERP Analysis", icon: Search },
      { to: "/app/gap", label: "Content Gap", icon: Network },
      { to: "/app/clusters", label: "Topic Clusters", icon: Network },
      { to: "/app/rankings", label: "Rank Tracker", icon: Trophy },
      { to: "/app/backlinks", label: "Backlinks", icon: Link2 },
      { to: "/app/decay", label: "Content Decay", icon: Timer },
    ],
  },
  {
    label: "Quality Tools",
    items: [
      { to: "/app/humanizer", label: "Humanizer", icon: Sparkles },
      { to: "/app/detector", label: "AI Detector", icon: ShieldCheck },
      { to: "/app/plagiarism", label: "Plagiarism", icon: ScanSearch },
    ],
  },
  {
    label: "Marketing",
    items: [
      { to: "/app/product", label: "Product Copy", icon: ShoppingBag },
      { to: "/app/landing", label: "Landing Pages", icon: FileText },
      { to: "/app/email", label: "Email Writer", icon: Mail },
      { to: "/app/ads", label: "Ad Copy", icon: Megaphone },
      { to: "/app/social", label: "Social Posts", icon: Share2 },
    ],
  },
  {
    label: "Agency",
    items: [
      { to: "/app/workspaces", label: "Workspaces", icon: Building2 },
      { to: "/app/members", label: "Members", icon: UserCog },
      { to: "/app/activity", label: "Activity", icon: Activity },
      { to: "/app/audit", label: "Audit Log", icon: ScrollText },
    ],
  },
  {
    label: "Client Portal",
    items: [
      { to: "/app/portal", label: "Client Dashboard", icon: Briefcase },
      { to: "/app/orders", label: "Orders", icon: Receipt },
      { to: "/app/requests", label: "Requests", icon: Inbox },
      { to: "/app/invoices", label: "Invoices", icon: DollarSign },
      { to: "/app/messages", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    label: "Analytics",
    items: [
      { to: "/app/analytics", label: "Overview", icon: LineChart },
      { to: "/app/exec", label: "Executive", icon: BarChart3 },
      { to: "/app/reports", label: "Reports", icon: Calendar },
      { to: "/app/revenue", label: "Revenue", icon: DollarSign },
      { to: "/app/writers", label: "Writer Leaderboard", icon: Trophy },
    ],
  },
  {
    label: "Workspace",
    items: [
      { to: "/app/team", label: "Team", icon: Users2 },
      { to: "/app/inbox", label: "Inbox", icon: Inbox, badge: "5" },
      { to: "/app/notifications", label: "Notifications", icon: Bell, badge: "3" },
      { to: "/app/exports", label: "Exports", icon: Upload },
      { to: "/app/billing", label: "Billing", icon: CreditCard },
      { to: "/app/settings", label: "Settings", icon: Settings },
      { to: "/app/library", label: "Library", icon: LibraryBig },
      { to: "/app/help", label: "Help", icon: LifeBuoy },
    ],
  },
  {
    label: "Admin",
    items: [
      { to: "/app/admin", label: "Admin", icon: ShieldAlert },
      { to: "/app/subscriptions", label: "Subscriptions", icon: CreditCard },
      { to: "/app/coupons", label: "Coupons", icon: Ticket },
      { to: "/app/flags", label: "Feature Flags", icon: ToggleLeft },
      { to: "/app/system", label: "System Health", icon: ServerCog },
      { to: "/app/errors", label: "Error Logs", icon: AlertOctagon },
    ],
  },
];

const allItems = groups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.label })));

function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const results = useMemo(() =>
    (q ? allItems.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())) : allItems).slice(0, 12),
    [q]);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-xl overflow-hidden">
        <div className="flex items-center gap-2 border-b px-3">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Jump to page, tool or setting…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">ESC</kbd>
        </div>
        <ScrollArea className="max-h-80">
          <div className="p-2">
            {results.map((r) => {
              const Icon = r.icon;
              return (
                <button
                  key={r.to}
                  onClick={() => { onOpenChange(false); navigate({ to: r.to }); }}
                  className="w-full flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-muted"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-left">{r.label}</span>
                  <span className="text-[10px] text-muted-foreground">{r.group}</span>
                </button>
              );
            })}
            {results.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No matches.</div>}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function AppShell({ children, title, subtitle, actions }: {
  children: ReactNode; title: string; subtitle?: string; actions?: ReactNode;
}) {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  useEffect(() => setDark(isDark()), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      {/* Sidebar */}
      <aside className={cn(
        "hidden md:flex flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200",
        collapsed ? "w-[68px]" : "w-[264px]",
      )}>
        <div className="flex h-14 items-center justify-between px-3 border-b">
          <Logo mark={collapsed} />
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="rounded-md p-1.5 hover:bg-sidebar-accent text-muted-foreground"
            aria-label="Toggle sidebar"
          >
            <ChevronsLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>
        <ScrollArea className="flex-1">
          <div className="px-2 py-3 space-y-4">
            {groups.map((g) => (
              <div key={g.label}>
                {!collapsed && (
                  <div className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                    {g.label}
                  </div>
                )}
                <div className="space-y-0.5">
                  {g.items.map((it) => {
                    const active = pathname === it.to || pathname.startsWith(it.to + "/");
                    const Icon = it.icon;
                    return (
                      <Link
                        key={it.to}
                        to={it.to}
                        className={cn(
                          "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                          active
                            ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                        )}
                        title={collapsed ? it.label : undefined}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} />
                        {!collapsed && <span className="truncate flex-1">{it.label}</span>}
                        {!collapsed && it.badge && (
                          <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">{it.badge}</Badge>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {!collapsed && (
          <div className="m-3 rounded-xl border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-3">
            <div className="text-xs font-semibold">Pro plan</div>
            <div className="mt-1 text-[11px] text-muted-foreground">12,480 / 50,000 words used</div>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full w-[25%] rounded-full bg-primary" />
            </div>
            <Button size="sm" className="mt-3 w-full h-8 text-xs">Upgrade</Button>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 backdrop-blur px-4 md:px-6">
          <button
            onClick={() => setPaletteOpen(true)}
            className="relative flex-1 max-w-xl text-left"
          >
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input readOnly placeholder="Search projects, docs, keywords…" className="pl-9 h-9 bg-muted/40 border-muted cursor-pointer" />
            <kbd className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 items-center gap-1 rounded border bg-background px-1.5 py-0.5 text-[10px] text-muted-foreground">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => { toggleTheme(); setDark(isDark()); }}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-primary" />
          </Button>
          <Avatar className="h-8 w-8 ring-2 ring-border">
            <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">AS</AvatarFallback>
          </Avatar>
        </header>

        <div className="border-b bg-gradient-to-b from-muted/40 to-transparent">
          <div className="px-4 md:px-8 py-6 flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h1>
              {subtitle && <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2">{actions ?? <Button><Plus className="h-4 w-4 mr-1.5" />New</Button>}</div>
          </div>
        </div>

        <main className="flex-1 px-4 md:px-8 py-6 animate-in fade-in duration-300">{children}</main>
      </div>
    </div>
  );
}
