import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/tools")({
  component: ToolsLayout,
});

function ToolsLayout() {
  const { pathname } = useLocation();
  const isDetector = pathname.includes("detector");

  return (
    <div className="min-h-screen w-full bg-[var(--midnight-950)] text-slate-300 font-[family-name:var(--font-sans)] p-6 md:p-10">
      <div className="mx-auto w-full max-w-6xl flex flex-col gap-8">
        {/* Hero + Tool Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--midnight-700)] pb-8">
          <div className="space-y-2">
            <Link
              to="/tools/humanizer"
              className="inline-block text-4xl md:text-5xl font-bold text-white tracking-tight font-[family-name:var(--font-mono)]"
            >
              AI <span className="text-[var(--indigo-500)]">Sentry</span>
            </Link>
            <p className="text-slate-400 max-w-md text-sm md:text-base">
              Professional grade AI text detection and humanization for modern publishing workflows.
            </p>
          </div>

          <nav className="flex bg-[var(--midnight-900)] p-1 rounded-lg border border-[var(--midnight-700)] self-start md:self-auto">
            <Link
              to="/tools/humanizer"
              className={`px-6 py-2 rounded-md transition-all font-medium text-sm ${
                !isDetector
                  ? "bg-[var(--indigo-500)] text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Humanizer
            </Link>
            <Link
              to="/tools/detector"
              className={`px-6 py-2 rounded-md transition-all font-medium text-sm ${
                isDetector
                  ? "bg-[var(--indigo-500)] text-white shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Detector
            </Link>
          </nav>
        </div>

        {/* Tool Content */}
        <Outlet />

        {/* Footer Context */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-1 h-1 rounded-full bg-[var(--indigo-500)]"></div>
            Deep Analysis Engine v4.2
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-1 h-1 rounded-full bg-[var(--indigo-500)]"></div>
            Privacy Guard Active
          </div>
        </div>
      </div>
    </div>
  );
}
