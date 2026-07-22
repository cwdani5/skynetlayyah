import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Github, Chrome } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create your account — SEO Studio" }, { name: "description", content: "Create your SEO Studio workspace and start writing in seconds." }] }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <AuthShell
      title="Create your workspace"
      subtitle="10,000 free words to get started. No credit card."
      footer={<>Already have an account? <Link to="/login" className="text-primary font-medium">Sign in</Link></>}
    >
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-10"><Chrome className="h-4 w-4 mr-2" />Google</Button>
        <Button variant="outline" className="h-10"><Github className="h-4 w-4 mr-2" />GitHub</Button>
      </div>
      <div className="my-5 flex items-center gap-3"><Separator className="flex-1" /><span className="text-xs text-muted-foreground uppercase tracking-widest">or</span><Separator className="flex-1" /></div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5"><Label>First name</Label><Input placeholder="Ada" /></div>
          <div className="space-y-1.5"><Label>Last name</Label><Input placeholder="Lovelace" /></div>
        </div>
        <div className="space-y-1.5"><Label>Work email</Label><Input type="email" placeholder="you@company.com" /></div>
        <div className="space-y-1.5"><Label>Password</Label><Input type="password" placeholder="At least 8 characters" /></div>
        <Link to="/verify-email"><Button type="submit" className="w-full h-10 mt-2">Create account</Button></Link>
        <p className="text-[11px] text-muted-foreground text-center">By continuing you agree to our Terms and Privacy Policy.</p>
      </form>
    </AuthShell>
  );
}
