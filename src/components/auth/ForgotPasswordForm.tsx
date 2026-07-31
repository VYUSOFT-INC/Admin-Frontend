"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, CheckCircleIcon, MailIcon, SignInArrowIcon } from "@/components/icons/AuthIcons";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Request a password reset link by email. No backend exists yet, so this
 * mocks the request and shows a "check your email" confirmation state —
 * swap the mock delay in `handleSubmit` for a real API call once it exists.
 */
export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const emailId = useId();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsLoading(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="flex w-full flex-col items-center gap-5 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary-lighter text-primary">
          <CheckCircleIcon className="size-6" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-extrabold text-ink">Check your email</h2>
          <p className="text-sm text-gray-500">
            If an account exists for <span className="font-semibold text-ink">{email}</span>, we&apos;ve sent a link to reset your password.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="text-xs font-bold text-primary hover:underline"
        >
          Didn&apos;t get it? Resend link
        </button>

        <Link href="/login" className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-ink">
          <ArrowLeftIcon className="size-3.5" />
          Back to Sign in
        </Link>
      </div>
    );
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

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        className="mt-1 min-h-[52px] w-full gap-2.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <SignInArrowIcon className="size-[18px]" />
        {isLoading ? "Sending link…" : "Send Reset Link"}
      </Button>

      <Link href="/login" className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-500 hover:text-ink">
        <ArrowLeftIcon className="size-3.5" />
        Back to Sign in
      </Link>
    </form>
  );
}
