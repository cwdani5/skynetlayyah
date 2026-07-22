import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — SEO Studio" }, { name: "description", content: "Manage profile, workspace and preferences." }] }),
  component: () => (
    <AppShell title="Settings" subtitle="Profile, workspace and preferences.">
      <Tabs defaultValue="profile">
        <TabsList><TabsTrigger value="profile">Profile</TabsTrigger><TabsTrigger value="workspace">Workspace</TabsTrigger><TabsTrigger value="api">API keys</TabsTrigger><TabsTrigger value="appearance">Appearance</TabsTrigger><TabsTrigger value="notifications">Notifications</TabsTrigger></TabsList>
        <TabsContent value="profile" className="mt-4"><Card><CardHeader><CardTitle>Profile</CardTitle></CardHeader><CardContent className="space-y-4 max-w-xl">
          <div className="flex items-center gap-4"><Avatar className="h-16 w-16"><AvatarFallback className="bg-primary text-primary-foreground">AL</AvatarFallback></Avatar><Button variant="outline" size="sm">Upload photo</Button></div>
          <div className="grid grid-cols-2 gap-3"><div className="space-y-1.5"><Label>First name</Label><Input defaultValue="Ada" /></div><div className="space-y-1.5"><Label>Last name</Label><Input defaultValue="Lovelace" /></div></div>
          <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="ada@studio.com" /></div>
          <div className="space-y-1.5"><Label>Bio</Label><Input defaultValue="Head of Content" /></div>
          <Button>Save changes</Button>
        </CardContent></Card></TabsContent>
        <TabsContent value="workspace" className="mt-4"><Card><CardContent className="p-6 space-y-4 max-w-xl">
          <div className="space-y-1.5"><Label>Workspace name</Label><Input defaultValue="SEO Studio HQ" /></div>
          <div className="space-y-1.5"><Label>Default language</Label><Select defaultValue="en"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="en">English</SelectItem><SelectItem value="es">Spanish</SelectItem><SelectItem value="fr">French</SelectItem></SelectContent></Select></div>
          <Button>Save</Button>
        </CardContent></Card></TabsContent>
        <TabsContent value="api" className="mt-4"><Card><CardContent className="p-6 space-y-3 max-w-2xl">
          <div className="rounded-lg border p-4 flex items-center justify-between"><div><div className="font-medium text-sm">Production key</div><div className="mt-1 font-mono text-xs text-muted-foreground">seo_live_••••••••••••8f42</div></div><Button variant="outline" size="sm">Rotate</Button></div>
          <div className="rounded-lg border p-4 flex items-center justify-between"><div><div className="font-medium text-sm">Test key</div><div className="mt-1 font-mono text-xs text-muted-foreground">seo_test_••••••••••••1a90</div></div><Button variant="outline" size="sm">Rotate</Button></div>
          <Button>Create new key</Button>
        </CardContent></Card></TabsContent>
        <TabsContent value="appearance" className="mt-4"><Card><CardContent className="p-6 space-y-4 max-w-xl">
          <div className="flex items-center justify-between"><div><div className="font-medium">Reduce motion</div><div className="text-xs text-muted-foreground">Minimize non-essential animations.</div></div><Switch /></div>
          <div className="flex items-center justify-between"><div><div className="font-medium">Compact density</div><div className="text-xs text-muted-foreground">More rows per screen.</div></div><Switch /></div>
        </CardContent></Card></TabsContent>
        <TabsContent value="notifications" className="mt-4"><Card><CardContent className="p-6 space-y-3 max-w-xl">
          {["Product updates","Weekly reports","Team mentions","Billing alerts","Security"].map((k,i)=>(
            <div key={k} className="flex items-center justify-between"><div className="text-sm">{k}</div><Switch defaultChecked={i<3} /></div>
          ))}
        </CardContent></Card></TabsContent>
      </Tabs>
    </AppShell>
  ),
});
