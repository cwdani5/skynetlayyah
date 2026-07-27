export type ExtractItem = {
  title?: string;
  organization?: string;
  location?: string;
  description?: string;
  deadline?: string | null;
  apply_url?: string | null;
};

export function cleanHtmlToText(html: string, max = 200000) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/(tr|li|p|div|h[1-6]|table)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n")
    .slice(0, max);
}

export function chunkText(text: string, size = 12000, overlap = 600, maxChunks = 14) {
  const chunks: string[] = [];
  let i = 0;
  while (i < text.length && chunks.length < maxChunks) {
    chunks.push(text.slice(i, i + size));
    i += size - overlap;
  }
  return chunks.length ? chunks : [""];
}

export function buildPrompt(opts: {
  type: string;
  url: string;
  kind: "image" | "pdf" | "web";
  content?: string;
  part?: { index: number; total: number };
}) {
  const { type, url, kind, content, part } = opts;
  return `You are extracting an EXHAUSTIVE list of individual ${type} postings from a Pakistani government / education advertisement or listing page${kind === "image" ? " (image/scan of ad)" : kind === "pdf" ? " (PDF)" : " webpage"} at ${url}.${part ? `\n\nThis is PART ${part.index} of ${part.total} of the page content. Extract ONLY the postings visible in this part.` : ""}

RULES:
- A listing page or advertisement usually contains MANY separate posts (e.g. "Assistant Engineer", "Sub-Engineer", "Stenographer", "Clerk", or many department-wise rows). Return EACH post as its OWN item — do NOT merge, do NOT summarize, do NOT stop early.
- Return EVERY post found in the provided content, even if there are 60+ of them.
- Per item capture: exact post title, department/organization, location, short description (<=300 chars) with BPS/scale, vacancies, qualification, age if present.
- deadline as YYYY-MM-DD if visible else null. apply_url = official apply link if present else null.

Return STRICT JSON only:
{ "items": [ { "title": string, "organization": string, "location": string, "description": string, "deadline": "YYYY-MM-DD"|null, "apply_url": string|null } ] }${content ? `\n\nContent:\n"""${content}"""` : ""}`;
}

export function dedupeItems(items: ExtractItem[]) {
  const seen = new Set<string>();
  const out: ExtractItem[] = [];
  for (const it of items) {
    const title = (it?.title ?? "").trim();
    if (!title) continue;
    const key = `${title.toLowerCase()}|${(it.organization ?? "").trim().toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

export function parseItems(content: string): ExtractItem[] {
  try {
    const parsed = JSON.parse(content) as { items?: ExtractItem[] };
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch {
    return [];
  }
}
