import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password — MIVYU Admin Console",
};

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff5f8] to-[#fff8f9] px-8 py-[139px]">
      <div
        aria-hidden
        className="absolute -left-[110px] -top-[140px] size-[420px] rounded-full bg-[#ffe6ee] opacity-90 blur-[4px]"
      />
      <div
        aria-hidden
        className="absolute -right-20 -bottom-[120px] size-[360px] rounded-full bg-[#fff1f3] opacity-95 blur-[5px]"
      />

      <AuthCard className="z-10">
        <div className="flex w-full flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div
              aria-hidden
              className="size-[34px] shrink-0 rounded-[10px]"
              style={{ backgroundImage: "linear-gradient(180deg, #d6002e 0%, #e14769 100%)" }}
            />
            <p className="text-[28px] font-extrabold tracking-[-1.4px] text-ink">MIVYU</p>
          </div>
          <p className="text-[15px] font-bold text-gray-500">Admin Portal</p>
        </div>

        <div className="flex w-full flex-col items-center gap-1 text-center">
          <h1 className="text-[26px] font-extrabold tracking-[-0.78px] text-ink">Set a new password</h1>
          <p className="text-sm text-gray-500">Choose a strong password you haven&apos;t used before.</p>
        </div>

        <ResetPasswordForm />
      </AuthCard>
    </div>
  );
}
