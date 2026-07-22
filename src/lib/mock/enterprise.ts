export const workspaces = [
  { id: "ws_1", name: "Northwind Studio", plan: "Agency", members: 12, projects: 34, words: "480k", color: "from-indigo-500 to-purple-500" },
  { id: "ws_2", name: "Acme Content Co", plan: "Pro", members: 5, projects: 18, words: "162k", color: "from-emerald-500 to-teal-500" },
  { id: "ws_3", name: "Solo — Ada", plan: "Free", members: 1, projects: 3, words: "18k", color: "from-amber-500 to-rose-500" },
];

export const kanbanColumns = [
  { id: "ideas", label: "Ideas", tone: "bg-slate-500/10 text-slate-600" },
  { id: "research", label: "Research", tone: "bg-sky-500/10 text-sky-600" },
  { id: "writing", label: "Writing", tone: "bg-indigo-500/10 text-indigo-600" },
  { id: "seo", label: "SEO", tone: "bg-violet-500/10 text-violet-600" },
  { id: "editing", label: "Editing", tone: "bg-amber-500/10 text-amber-600" },
  { id: "approved", label: "Approved", tone: "bg-emerald-500/10 text-emerald-600" },
  { id: "published", label: "Published", tone: "bg-teal-500/10 text-teal-600" },
  { id: "archived", label: "Archived", tone: "bg-neutral-500/10 text-neutral-600" },
];

export const kanbanCards: Record<string, { id: string; title: string; priority: "P0" | "P1" | "P2"; due: string; assignee: string; progress: number }[]> = {
  ideas: [
    { id: "c1", title: "Programmatic SEO landing pages", priority: "P1", due: "Mar 02", assignee: "AS", progress: 5 },
    { id: "c2", title: "'AI vs human' comparison hub", priority: "P2", due: "Mar 12", assignee: "RN", progress: 0 },
  ],
  research: [
    { id: "c3", title: "Content decay audit — Q4", priority: "P0", due: "Feb 18", assignee: "ML", progress: 30 },
  ],
  writing: [
    { id: "c4", title: "Enterprise SEO playbook 2026", priority: "P0", due: "Feb 22", assignee: "AS", progress: 55 },
    { id: "c5", title: "Northwind case study", priority: "P1", due: "Feb 26", assignee: "RN", progress: 40 },
  ],
  seo: [
    { id: "c6", title: "Optimize 'ai humanizer' cluster", priority: "P1", due: "Feb 20", assignee: "ML", progress: 70 },
  ],
  editing: [
    { id: "c7", title: "Q1 newsletter — Feb", priority: "P2", due: "Feb 24", assignee: "AS", progress: 85 },
  ],
  approved: [
    { id: "c8", title: "Landing page: 'API for content'", priority: "P1", due: "Feb 16", assignee: "ML", progress: 100 },
  ],
  published: [
    { id: "c9", title: "How-to: schema for FAQs", priority: "P2", due: "Feb 10", assignee: "RN", progress: 100 },
  ],
  archived: [
    { id: "c10", title: "'SEO in 2023' retrospective", priority: "P2", due: "Jan 05", assignee: "AS", progress: 100 },
  ],
};

export const templateCatalog: { cat: string; items: string[] }[] = [
  { cat: "Long form", items: ["Long-form Blog", "Short Article", "Listicle", "How-To", "Tutorial", "Case Study", "Whitepaper", "News Article", "Press Release", "Comparison Article", "Review", "Affiliate Article", "Amazon Review", "Local SEO Page", "Programmatic SEO"] },
  { cat: "Marketing", items: ["Landing Page", "Sales Letter", "Cold Email", "Newsletter", "Google Ads", "Facebook Ads", "Product Description", "Category Description", "Collection Description", "Startup Pitch", "Proposal", "Business Plan"] },
  { cat: "Social", items: ["LinkedIn Post", "LinkedIn Article", "Twitter Thread", "Instagram Caption", "Facebook Post", "Pinterest Description", "TikTok Caption", "YouTube Script", "YouTube Description", "YouTube Tags", "Video Chapters"] },
  { cat: "Docs & Ops", items: ["FAQ", "Knowledge Base", "Documentation", "Course Outline", "Book Summary", "Meeting Summary", "Executive Summary", "Podcast Script", "Podcast Notes", "Video Script"] },
  { cat: "Brand", items: ["Mission Statement", "Vision Statement", "Tagline", "Slogan", "About Us", "Company Bio", "Founder Story"] },
  { cat: "Career", items: ["Resume", "Cover Letter", "Job Description", "LinkedIn Bio", "Personal Bio", "Recommendation Letter"] },
  { cat: "Utilities", items: ["Sentence Rewriter", "Paragraph Expander", "Summarizer", "Translator", "Grammar Fixer", "Tone Rewriter", "Headline Generator", "Intro Generator", "Conclusion Generator", "CTA Generator", "Meta Description", "SEO Title"] },
];

export const invoices = [
  { id: "INV-2041", client: "Northwind Studio", amount: "$4,800", status: "Paid", due: "Feb 01" },
  { id: "INV-2040", client: "Acme Content Co", amount: "$1,200", status: "Paid", due: "Jan 28" },
  { id: "INV-2039", client: "BrightPath", amount: "$920", status: "Overdue", due: "Jan 10" },
  { id: "INV-2038", client: "Helix Labs", amount: "$2,400", status: "Pending", due: "Feb 18" },
];

export const auditLog = [
  { actor: "ada@studio.com", action: "Invited marcus@studio.com as Editor", sev: "info", t: "2m ago" },
  { actor: "system", action: "Rotated workspace API key", sev: "warn", t: "1h ago" },
  { actor: "tomas@northwind.co", action: "Upgraded plan → Agency", sev: "info", t: "3h ago" },
  { actor: "system", action: "Failed export to WordPress", sev: "error", t: "Yesterday" },
  { actor: "rina@studio.com", action: "Approved article 'Q1 Report'", sev: "info", t: "Yesterday" },
];
