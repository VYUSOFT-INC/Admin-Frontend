import type { ReactNode } from "react";

export interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

/** Frosted white card shell used by standalone auth screens (sign-in, and future reset/forgot-password screens). */
export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div
      className={`relative flex w-full max-w-[440px] flex-col gap-6 rounded-xl border border-border bg-white/95 px-[33px] pb-[29px] pt-[37px] backdrop-blur-[5px] ${className}`}
    >
      {children}
    </div>
  );
}
