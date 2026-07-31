"use client";

import { useId, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MailIcon, SignInArrowIcon } from "@/components/icons/AuthIcons";
import { PasswordInput } from "@/components/auth/PasswordInput";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sign-in form for the admin portal. There is no backend yet, so this
 * validates input locally and treats any well-formed email/password as a
 * successful sign-in — swap the mock delay in `handleSubmit` for a real
 * auth call once the API exists.
 */
export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    // Mock auth — no backend exists yet, so any well-formed credentials succeed.
    await new Promise((resolve) => setTimeout(resolve, 900));
    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex w-full flex-col gap-4">
      {error && (
        <div role="alert" className="w-full rounded-[10px] border border-primary-soft bg-primary-lighter px-4 py-3 text-xs font-semibold text-primary">
          {error}
        </div>
      )}

      <div className="flex w-full flex-col items-start gap-2">
        <label htmlFor={emailId} className="w-full text-[13px] font-bold text-ink">
          Email
        </label>
        <div className="flex min-h-[52px] w-full items-center gap-3 rounded-[10px] border border-border bg-[#fff8fb] px-[15px]">
          <MailIcon className="size-[18px] shrink-0 text-gray-500" />
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="admin@mivyu.com"
            autoComplete="email"
            required
            disabled={isLoading}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink placeholder:text-gray-500 focus:outline-none disabled:opacity-60"
          />
        </div>
      </div>

      <PasswordInput value={password} onChange={setPassword} placeholder="••••••••••••" disabled={isLoading} />

      <Link href="/forgot-password" className="self-end text-xs font-bold text-primary hover:underline">
        Forgot password?
      </Link>

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        className="mt-1 min-h-[52px] w-full gap-2.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <SignInArrowIcon className="size-[18px]" />
        {isLoading ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
