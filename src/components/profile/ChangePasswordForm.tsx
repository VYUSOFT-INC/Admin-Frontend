"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { CheckCircleIcon } from "@/components/icons/AuthIcons";

const MIN_PASSWORD_LENGTH = 8;

/**
 * In-app "Change Password" form, reached from the Super Admin dropdown menu (Figma "super admin
 * drop down", node 1088:672). Mirrors the mock-validation pattern established by
 * `ResetPasswordForm` (min length, confirm match, ~900ms mock delay standing in for a real API
 * call) but adds a "Current password" field and a success state that returns the admin to
 * `/profile` instead of `/login`, since this is an authenticated in-app flow rather than the
 * forgot-password email link flow.
 */
export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!currentPassword || !password || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`New password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    // Mock update — no backend exists yet, so this just simulates a network round-trip.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsLoading(false);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <div className="flex w-full flex-col items-center gap-5 py-4 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary-lighter text-primary">
          <CheckCircleIcon className="size-6" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-extrabold text-ink">Password updated</h2>
          <p className="text-sm text-gray-500">Your password has been changed successfully.</p>
        </div>

        <Button href="/profile" variant="primary" className="min-h-[44px] gap-2.5 px-6 text-[15px]">
          Back to My Profile
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
        label="Current password"
        value={currentPassword}
        onChange={setCurrentPassword}
        placeholder="••••••••••••"
        autoComplete="current-password"
        disabled={isLoading}
      />

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
        className="mt-1 min-h-[48px] w-full gap-2.5 text-[15px] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Updating…" : "Update Password"}
      </Button>
    </form>
  );
}
