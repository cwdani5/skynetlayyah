import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Chrome } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — SEO Studio" }, { name: "description", content: "Sign in to your SEO Studio workspace." }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue to your workspace."
      footer={<>Don't have an account? <Link to="/signup" className="text-primary font-medium">Create one</Link></>}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-10"><Chrome className="h-4 w-4 mr-2" />Google</Button>
        <Button variant="outline" className="h-10"><Github className="h-4 w-4 mr-2" />GitHub</Button>
      </div>
      <div className="my-5 flex items-center gap-3"><Separator className="flex-1" /><span className="text-xs text-muted-foreground uppercase tracking-widest">or</span><Separator className="flex-1" /></div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="you@company.com" /></div>
        <div className="space-y-1.5">
          <div className="flex justify-between"><Label>Password</Label><Link to="/forgot-password" className="text-xs text-primary">Forgot?</Link></div>
          <Input type="password" placeholder="••••••••" />
        </div>
        <Link to="/app/dashboard"><Button type="submit" className="w-full h-10 mt-2">Sign in</Button></Link>
      </form>
    </AuthShell>
  );
}
