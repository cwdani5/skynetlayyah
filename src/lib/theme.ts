export function initTheme() {
  if (typeof window === "undefined") return;
  document.documentElement.classList.remove("dark");
  try { localStorage.setItem("theme", "light"); } catch {}
}

export function toggleTheme() {
  // Dark mode disabled — white theme only.
}

export function isDark() {
  return false;
}
