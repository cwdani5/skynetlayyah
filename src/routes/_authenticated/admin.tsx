import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { listPostings, upsertPosting, deletePosting, isCurrentUserAdmin, extractFromUrl, getAiSettingsStatus, testAiConnection, saveAiKey, clearAiKey } from "@/lib/postings.functions";
import type { Posting } from "@/components/posting-card";
import { toast } from "sonner";
import { Plus, Trash2, Pencil, LogOut, Sparkles, ExternalLink, ShieldAlert, RefreshCw, Settings, KeyRound } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Skynet Layyah" }] }),
  component: AdminPage,
});

type FormState = {
  id?: string;
  type: "job" | "admission" | "scheme";
  title: string;
  organization: string;
  location: string;
  description: string;
  deadline: string;
  source_url: string;
  apply_url: string;
  ad_image_url: string;
  is_featured: boolean;
  is_active: boolean;
};

const emptyForm: FormState = {
  type: "job", title: "", organization: "", location: "", description: "",
  deadline: "", source_url: "", apply_url: "", ad_image_url: "",
  is_featured: false, is_active: true,
};

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const listFn = useServerFn(listPostings);
  const upsertFn = useServerFn(upsertPosting);
  const deleteFn = useServerFn(deletePosting);
  const adminCheckFn = useServerFn(isCurrentUserAdmin);
  const extractFn = useServerFn(extractFromUrl);
  const aiStatusFn = useServerFn(getAiSettingsStatus);
  const testAiFn = useServerFn(testAiConnection);

  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => adminCheckFn() });
  const postingsQ = useQuery({ queryKey: ["admin-postings"], queryFn: () => listFn() as Promise<Posting[]> });
  const aiStatusQ = useQuery({ queryKey: ["ai-settings-status"], queryFn: () => aiStatusFn(), enabled: !!adminQ.data?.isAdmin });

  const [tab, setTab] = useState<"job" | "admission" | "scheme">("job");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [fetchOpen, setFetchOpen] = useState(false);
  const [fetchUrl, setFetchUrl] = useState("");
  const [fetchType, setFetchType] = useState<"job" | "admission" | "scheme">("job");
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchResults, setFetchResults] = useState<Array<{ title?: string; organization?: string; location?: string; description?: string; deadline?: string | null; apply_url?: string | null }>>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [testingAi, setTestingAi] = useState(false);
  const [aiKeyInput, setAiKeyInput] = useState("");
  const [savingKey, setSavingKey] = useState(false);

  const saveAiKeyFn = useServerFn(saveAiKey);
  const clearAiKeyFn = useServerFn(clearAiKey);

  const saveAiKeyHandler = async () => {
    setSavingKey(true);
    try {
      const res = await saveAiKeyFn({ data: { key: aiKeyInput.trim() } });
      if (res.ok) {
        toast.success(res.message);
        setAiKeyInput("");
        aiStatusQ.refetch();
      } else toast.error(res.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Key save nahi hui");
    } finally {
      setSavingKey(false);
    }
  };

  const clearAiKeyHandler = async () => {
    setSavingKey(true);
    try {
      const res = await clearAiKeyFn();
      if (res.ok) { toast.success(res.message); aiStatusQ.refetch(); }
      else toast.error(res.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Key remove nahi hui");
    } finally {
      setSavingKey(false);
    }
  };


  useEffect(() => {
    if (adminQ.data && !adminQ.data.isAdmin) toast.warning("Aapke pass admin role nahi hai. Sirf view mode.");
  }, [adminQ.data]);

  const openNew = (type: "job" | "admission" | "scheme") => {
    setForm({ ...emptyForm, type });
    setDialogOpen(true);
  };
  const openEdit = (p: Posting) => {
    setForm({
      id: p.id, type: p.type, title: p.title,
      organization: p.organization ?? "", location: p.location ?? "",
      description: p.description ?? "", deadline: p.deadline ?? "",
      source_url: p.source_url ?? "", apply_url: p.apply_url ?? "",
      ad_image_url: p.ad_image_url ?? "", is_featured: !!p.is_featured, is_active: p.is_active ?? true,
    });
    setDialogOpen(true);
  };

  const toggleFeatured = async (p: Posting) => {
    try {
      await upsertFn({ data: {
        id: p.id, type: p.type, title: p.title,
        organization: p.organization ?? null, location: p.location ?? null,
        description: p.description ?? null, deadline: p.deadline ?? null,
        source_url: p.source_url ?? null, apply_url: p.apply_url ?? null,
        ad_image_url: p.ad_image_url ?? null,
        is_featured: !p.is_featured, is_active: p.is_active ?? true,
      } as never });
      toast.success(!p.is_featured ? "Featured" : "Unfeatured");
      qc.invalidateQueries({ queryKey: ["admin-postings"] });
      qc.invalidateQueries({ queryKey: ["postings"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };

  const save = async () => {
    setSaving(true);
    try {
      await upsertFn({ data: { ...form, deadline: form.deadline || null, source_url: form.source_url || null, apply_url: form.apply_url || null, ad_image_url: form.ad_image_url || null, organization: form.organization || null, location: form.location || null, description: form.description || null } as never });
      toast.success(form.id ? "Updated" : "Added");
      setDialogOpen(false);
      qc.invalidateQueries({ queryKey: ["admin-postings"] });
      qc.invalidateQueries({ queryKey: ["postings"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this posting?")) return;
    try {
      await deleteFn({ data: { id } });
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin-postings"] });
      qc.invalidateQueries({ queryKey: ["postings"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };

  const runFetch = async () => {
    setFetchLoading(true); setFetchResults([]);
    try {
      const res = await extractFn({ data: { url: fetchUrl, type: fetchType } });
      setFetchResults(res.items as never);
      toast.success(`${res.items.length} items extracted`);
    } catch (e) { toast.error(e instanceof Error ? e.message : "Fetch failed"); }
    finally { setFetchLoading(false); }
  };

  const importItem = async (item: { title?: string; organization?: string; location?: string; description?: string; deadline?: string | null; apply_url?: string | null }) => {
    try {
      await upsertFn({ data: {
        type: fetchType,
        title: item.title ?? "Untitled",
        organization: item.organization ?? null,
        location: item.location ?? null,
        description: item.description ?? null,
        deadline: item.deadline || null,
        source_url: fetchUrl,
        apply_url: item.apply_url ?? null,
        ad_image_url: null,
        is_featured: false, is_active: true,
      } as never });
      toast.success("Imported");
      qc.invalidateQueries({ queryKey: ["admin-postings"] });
      qc.invalidateQueries({ queryKey: ["postings"] });
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); }
  };

  const importAll = async () => {
    if (!fetchResults.length) return;
    let ok = 0;
    for (const item of fetchResults) {
      try {
        await upsertFn({ data: {
          type: fetchType,
          title: item.title ?? "Untitled",
          organization: item.organization ?? null,
          location: item.location ?? null,
          description: item.description ?? null,
          deadline: item.deadline || null,
          source_url: fetchUrl,
          apply_url: item.apply_url ?? null,
          ad_image_url: /\.(png|jpe?g|webp|gif|bmp)(\?|$)/i.test(fetchUrl) ? fetchUrl : null,
          is_featured: true, is_active: true,
        } as never });
        ok++;
      } catch { /* skip */ }
    }
    toast.success(`${ok}/${fetchResults.length} imported`);
    qc.invalidateQueries({ queryKey: ["admin-postings"] });
    qc.invalidateQueries({ queryKey: ["postings"] });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const testAi = async () => {
    setTestingAi(true);
    try {
      const result = await testAiFn();
      result.ok ? toast.success(result.message) : toast.error(result.message);
      aiStatusQ.refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "AI connection test failed");
    } finally {
      setTestingAi(false);
    }
  };

  const filtered = (postingsQ.data ?? []).filter((p) => p.type === tab);
  const counts = {
    job: (postingsQ.data ?? []).filter((p) => p.type === "job").length,
    admission: (postingsQ.data ?? []).filter((p) => p.type === "admission").length,
    scheme: (postingsQ.data ?? []).filter((p) => p.type === "scheme").length,
  };

  return (
    <SiteShell>
      <section className="border-b bg-hero">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">Admin Panel</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">Jobs, admissions aur schemes manage karen.</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2"><Settings className="h-4 w-4" /> AI Settings</Button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100vw-2rem)] max-w-lg">
                <DialogHeader><DialogTitle className="flex items-center gap-2"><KeyRound className="h-5 w-5 text-primary" /> AI Settings</DialogTitle></DialogHeader>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4 rounded-md border p-3">
                    <div className="min-w-0">
                      <div className="font-semibold">Current provider</div>
                      <div className="text-muted-foreground truncate">
                        {aiStatusQ.data?.provider ?? "Not configured"}
                        {aiStatusQ.data?.keyPreview ? ` · ${aiStatusQ.data.keyPreview}` : ""}
                        {aiStatusQ.data?.source === "saved" ? " (saved here)" : aiStatusQ.data?.source === "env" ? " (hosting env)" : ""}
                      </div>
                    </div>
                    <Badge variant={aiStatusQ.data?.groqConfigured ? "default" : "secondary"}>{aiStatusQ.data?.groqConfigured ? "Connected" : "Missing"}</Badge>
                  </div>

                  <div className="space-y-2 rounded-md border p-3">
                    <div className="font-semibold">Groq API key</div>
                    <p className="text-xs text-muted-foreground">Yahan key paste karke Save karein — Netlify jaane ya redeploy karne ki zaroorat nahi. Key sirf server par store hoti hai.</p>
                    <Input type="password" placeholder="gsk_..." value={aiKeyInput} onChange={(e) => setAiKeyInput(e.target.value)} autoComplete="off" />
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Button onClick={saveAiKeyHandler} disabled={savingKey || aiKeyInput.trim().length < 10} className="gap-2">
                        {savingKey && <RefreshCw className="h-4 w-4 animate-spin" />} Save key
                      </Button>
                      {aiStatusQ.data?.source === "saved" && (
                        <Button variant="outline" onClick={clearAiKeyHandler} disabled={savingKey} className="gap-2">Remove saved key</Button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={testAi} disabled={testingAi} className="gap-2">{testingAi && <RefreshCw className="h-4 w-4 animate-spin" />} Test connection</Button>
                    <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer">
                      <Button variant="ghost" className="w-full gap-2"><ExternalLink className="h-4 w-4" /> Get a Groq key</Button>
                    </a>
                  </div>
                </div>

              </DialogContent>
            </Dialog>
            <Dialog open={fetchOpen} onOpenChange={setFetchOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 col-span-2 sm:col-span-1"><Sparkles className="h-4 w-4" /> AI Auto-fetch</Button>
              </DialogTrigger>
              <DialogContent className="w-[calc(100vw-2rem)] max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader><DialogTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Fetch from official website</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <div className="grid gap-2 sm:grid-cols-[1fr_180px]">
                    <Input placeholder="https://www.fpsc.gov.pk/..." value={fetchUrl} onChange={(e) => setFetchUrl(e.target.value)} />
                    <Select value={fetchType} onValueChange={(v) => setFetchType(v as never)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="job">Jobs</SelectItem>
                        <SelectItem value="admission">Admissions</SelectItem>
                        <SelectItem value="scheme">Schemes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={runFetch} disabled={!fetchUrl || fetchLoading} className="gap-2">
                      {fetchLoading ? <><RefreshCw className="h-4 w-4 animate-spin" /> Fetching…</> : <>Extract all posts</>}
                    </Button>
                    {fetchResults.length > 0 && (
                      <Button variant="secondary" onClick={importAll} className="gap-2">Import all ({fetchResults.length})</Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Tip: PPSC/FPSC ad ka PDF ya webpage URL do — andar ki har post alag entry ban kar aayegi.</p>
                  <div className="max-h-80 overflow-auto space-y-2">
                    {fetchResults.map((it, i) => (
                      <div key={i} className="rounded-lg border p-3 text-sm">
                        <div className="font-semibold">{it.title}</div>
                        <div className="text-xs text-muted-foreground">{it.organization} • {it.location}</div>
                        <div className="mt-1 text-xs line-clamp-2">{it.description}</div>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" onClick={() => importItem(it)}>Import</Button>
                          {it.apply_url && <a href={it.apply_url} target="_blank" rel="noreferrer"><Button size="sm" variant="ghost" className="gap-1"><ExternalLink className="h-3 w-3" /> Open</Button></a>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={() => openNew(tab)} className="gap-2"><Plus className="h-4 w-4" /> New</Button>
            <Button variant="ghost" onClick={signOut} className="gap-2"><LogOut className="h-4 w-4" /> Sign out</Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {adminQ.data && !adminQ.data.isAdmin && (
          <Card className="mb-6 border-amber-500/40 bg-amber-500/5">
            <CardContent className="p-4 flex items-start gap-3 text-sm">
              <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold">Admin role required</div>
                <div className="text-muted-foreground">Aapka account admin nahi hai. Backend mein <code>user_roles</code> table mein apna user_id + role='admin' add karwana hoga.</div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={tab} onValueChange={(v) => setTab(v as never)}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="job">Jobs <Badge variant="secondary" className="ml-2">{counts.job}</Badge></TabsTrigger>
            <TabsTrigger value="admission">Admissions <Badge variant="secondary" className="ml-2">{counts.admission}</Badge></TabsTrigger>
            <TabsTrigger value="scheme">Schemes <Badge variant="secondary" className="ml-2">{counts.scheme}</Badge></TabsTrigger>
          </TabsList>
          <TabsContent value={tab} className="mt-4">
            {/* Mobile: card list */}
            <div className="grid gap-3 md:hidden">
              {filtered.map((p) => (
                <Card key={p.id}>
                  <CardContent className="p-4 space-y-2">
                    <div className="font-semibold text-sm break-words">{p.title}</div>
                    <div className="text-xs text-muted-foreground break-words">
                      {p.organization || "—"} · {p.deadline ? new Date(p.deadline).toLocaleDateString() : "No deadline"}
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <label className="flex items-center gap-2 text-xs">
                        <Switch checked={!!p.is_featured} onCheckedChange={() => toggleFeatured(p)} /> Featured
                      </label>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-10 text-muted-foreground text-sm">Koi entries nahi.</div>
              )}
            </div>

            {/* Desktop: table */}
            <Card className="hidden md:block">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Organization</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="w-32"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium max-w-md truncate">{p.title}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{p.organization}</TableCell>
                        <TableCell className="text-sm">{p.deadline ? new Date(p.deadline).toLocaleDateString() : "—"}</TableCell>
                        <TableCell><Switch checked={!!p.is_featured} onCheckedChange={() => toggleFeatured(p)} /></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filtered.length === 0 && (
                      <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">Koi entries nahi.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{form.id ? "Edit" : "New"} posting</DialogTitle></DialogHeader>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as never })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="job">Job</SelectItem>
                  <SelectItem value="admission">Admission</SelectItem>
                  <SelectItem value="scheme">Scheme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Deadline</Label>
              <Input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Title *</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Organization</Label>
              <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Description</Label>
              <Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Source URL</Label>
              <Input value={form.source_url} onChange={(e) => setForm({ ...form, source_url: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Apply URL</Label>
              <Input value={form.apply_url} onChange={(e) => setForm({ ...form, apply_url: e.target.value })} />
            </div>
            <div className="sm:col-span-2 space-y-1.5">
              <Label>Ad image URL (of poster/ad)</Label>
              <Input value={form.ad_image_url} onChange={(e) => setForm({ ...form, ad_image_url: e.target.value })} placeholder="https://…" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm"><Switch checked={form.is_featured} onCheckedChange={(v) => setForm({ ...form, is_featured: v })} /> Featured</label>
              <label className="flex items-center gap-2 text-sm"><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /> Active</label>
            </div>
          </div>
          <DialogFooter className="flex-col-reverse gap-2 sm:flex-row">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving || !form.title}>{saving ? "Saving…" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SiteShell>
  );
}
