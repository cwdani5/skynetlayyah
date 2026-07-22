import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/tools")({
  component: ToolsLayout,
});

function ToolsLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <header className="flex items-center justify-between text-sm">
          <Link to="/" className="font-medium hover:opacity-70 transition">
            ← Home
          </Link>
          <nav className="flex gap-6 text-muted-foreground">
            <Link
              to="/tools/humanizer"
              className="hover:text-foreground transition-colors [&.active]:text-foreground [&.active]:font-medium"
            >
              Humanizer
            </Link>
            <Link
              to="/tools/detector"
              className="hover:text-foreground transition-colors [&.active]:text-foreground [&.active]:font-medium"
            >
              AI Detector
            </Link>
          </nav>
        </header>
        <main className="mt-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
