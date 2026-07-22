import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export const Route = createFileRoute("/verify-email")({
  head: () => ({ meta: [{ title: "Verify your email — SEO Studio" }, { name: "description", content: "Enter the OTP we sent to verify your email." }] }),
  component: () => (
    <AuthShell
      title="Verify your email"
      subtitle="We sent a 6-digit code to your inbox."
      footer={<>Didn't get it? <button className="text-primary font-medium">Resend</button></>}
    >
      <div className="flex justify-center">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            {Array.from({ length: 6 }).map((_, i) => <InputOTPSlot key={i} index={i} />)}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <Link to="/app/dashboard"><Button className="w-full h-10 mt-6">Verify & continue</Button></Link>
    </AuthShell>
  ),
});
