"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { CheckCircleIcon, SignInArrowIcon } from "@/components/icons/AuthIcons";

const MIN_PASSWORD_LENGTH = 8;

/**
 * Sets a new password — used both for the "reset via emailed link" flow and
 * as a general change-password form. No backend exists yet, so this
 * validates input locally and mocks the update — swap the mock delay in
 * `handleSubmit` for a real API call once it exists.
 */
export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
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
          <h2 className="text-lg font-extrabold text-ink">Password updated</h2>
          <p className="text-sm text-gray-500">Your password has been changed. You can now sign in with your new password.</p>
        </div>

        <Button href="/login" variant="primary" className="min-h-[52px] w-full gap-2.5 text-[15px]">
          <SignInArrowIcon className="size-[18px]" />
          Continue to Sign in
        </Button>
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

      <PasswordInput
        label="New password"
        value={password}
        onChange={setPassword}
        placeholder="••••••••••••"
        autoComplete="new-password"
        disabled={isLoading}
      />

      <PasswordInput
        label="Confirm new password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder="••••••••••••"
        autoComplete="new-password"
        disabled={isLoading}
      />

      <p className="text-xs text-gray-500">Must be at least {MIN_PASSWORD_LENGTH} characters.</p>

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        className="mt-1 min-h-[52px] w-full gap-2.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <SignInArrowIcon className="size-[18px]" />
        {isLoading ? "Updating…" : "Update Password"}
      </Button>

      <Link href="/login" className="text-center text-xs font-bold text-gray-500 hover:text-ink">
        Back to Sign in
      </Link>
    </form>
  );
}
