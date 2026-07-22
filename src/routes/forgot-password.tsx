import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — SEO Studio" }, { name: "description", content: "Reset your SEO Studio password." }] }),
  component: () => (
    <AuthShell
      title="Reset your password"
      subtitle="We'll email you a reset link."
      footer={<>Remembered it? <Link to="/login" className="text-primary font-medium">Sign in</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="you@company.com" /></div>
        <Button className="w-full h-10">Send reset link</Button>
      </form>
    </AuthShell>
  ),
});
