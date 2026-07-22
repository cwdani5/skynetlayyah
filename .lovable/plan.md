## Scope

Expand the existing AI SEO Content Studio into an Enterprise SaaS shell without removing existing pages. Given the size (100+ templates, dozens of new dashboards, kanban, portal, admin, etc.), I'll ship this in a **first production-ready wave** that lands the architecture + high-value screens, then follow up in additional waves on your go-ahead. Every existing route stays.

## Wave 1 — Architecture & Enterprise Core (this pass)

**Shared architecture**
- `src/lib/mock/*` — typed mock data (workspaces, members, orders, invoices, kanban cards, templates catalog, analytics series, notifications, audit logs).
- `src/hooks/` — `use-workspace`, `use-command-palette`, `use-shortcuts`, `use-local-storage`.
- `src/components/ui-kit.tsx` — extend with `Shimmer`, `Skeleton*`, `EmptyState` variants, `GradientCard`, `KpiTile`, `TrendSparkline`, `DataTable`, `PageHeader`, `FilterBar`, `Kbd`.
- Sidebar: add collapsible groups for **Agency**, **Client Portal**, **Pipeline**, **SEO Intelligence**, **Collaboration**, **Exports** — existing groups untouched.
- Global **Command Palette** (⌘K) + **Workspace Switcher** in `app-shell`.

**Agency Workspace system**
- `/app/workspaces` — list + create
- `/app/workspaces/members` — invites, roles, permissions matrix
- `/app/workspaces/billing` — plan, seats, usage
- `/app/workspaces/activity` — feed
- `/app/workspaces/audit` — audit log table with filters
- `/app/workspaces/settings` — brand, logo, colors, regional

**Client Portal**
- `/app/portal` — client dashboard
- `/app/portal/orders` — submitted orders + approval workflow
- `/app/portal/requests` — requested articles + revision requests
- `/app/portal/invoices` — invoices + payments UI
- `/app/portal/messages` — threaded messages + comments

**Content Pipeline (Kanban)**
- `/app/pipeline` — 8-column board (Ideas → Archived), drag & drop (@dnd-kit), priority labels, due dates, assignees, progress.

**SEO Intelligence**
- `/app/seo/competitors`, `/app/seo/serp`, `/app/seo/gap`, `/app/seo/clusters`, `/app/seo/rankings`, `/app/seo/backlinks`, `/app/seo/decay`.

**Advanced Analytics**
- `/app/analytics/executive`, `/app/analytics/weekly`, `/app/analytics/monthly`, `/app/analytics/revenue`, `/app/analytics/writers`.

**Templates catalog**
- `/app/templates/catalog` — 100+ template cards (all categories from spec), search + filter, existing `/app/templates` kept.

**Admin expansion**
- `/app/admin/subscriptions`, `/app/admin/coupons`, `/app/admin/flags`, `/app/admin/system`, `/app/admin/errors`.

**Notifications**
- Toast system already via sonner; add `/app/inbox` (announcements + reminders + approvals).

**File Manager**
- `/app/files` — folders, tags, favorites, recent, shared, trash, bulk actions.

**Exports**
- `/app/exports` — Word / PDF / Markdown / HTML / Google Docs / WordPress / Notion destination cards + history.

**Premium UI passes**
- Skeleton + shimmer utilities used on new dashboards.
- Framer Motion page transitions on `AppShell` outlet.
- Command palette, ⌘K shortcut, Kbd hints across headers.

## Wave 2+ (on approval, after Wave 1 ships)

- Kanban drag-drop polish + persistence, chat UI, collaborative editor with track changes / version compare, team calendar, backlinks/decay deep dives, humanizer before/after diff view, per-template forms for all 100+ templates (Wave 1 ships catalog + shared template runner form), full mobile nav drawer polish.

## Notes

- Nothing existing is removed or renamed. New routes live alongside old ones; sidebar gains new groups.
- All new pages use existing shadcn primitives + `ui-kit`; mock data only (no backend calls) to keep the wave shippable.
- `@dnd-kit/core` + `@dnd-kit/sortable` added for the Kanban board; `framer-motion` for transitions.

Confirm and I'll ship Wave 1.
