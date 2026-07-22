export function initTheme() {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = stored ? stored === "dark" : prefersDark;
  document.documentElement.classList.toggle("dark", dark);
}

export function toggleTheme() {
  if (typeof window === "undefined") return;
  const dark = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}

export function isDark() {
  if (typeof window === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}
