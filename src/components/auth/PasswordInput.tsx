"use client";

import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon, LockIcon } from "@/components/icons/AuthIcons";

export interface PasswordInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
}

/** Password field with a lock leading icon and a "Show/Hide" toggle, matching the admin portal design. */
export function PasswordInput({
  label = "Password",
  value,
  onChange,
  placeholder,
  autoComplete = "current-password",
  required = true,
  disabled = false,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const inputId = useId();

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <label htmlFor={inputId} className="w-full text-[13px] font-bold text-ink">
        {label}
      </label>
      <div className="flex min-h-[52px] w-full items-center justify-between gap-3 rounded-[10px] border border-border bg-[#fff8fb] pl-[15px] pr-[15px]">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <LockIcon className="size-[18px] shrink-0 text-gray-500" />
          <input
            id={inputId}
            type={isVisible ? "text" : "password"}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required={required}
            disabled={disabled}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-ink placeholder:text-gray-500 focus:outline-none disabled:opacity-60"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          disabled={disabled}
          aria-pressed={isVisible}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#f2dee6] bg-[#ffeef1] px-[11px] py-[6px] text-xs font-bold text-ink transition-colors hover:bg-primary-light disabled:opacity-60"
        >
          {isVisible ? <EyeOffIcon className="size-3.5" /> : <EyeIcon className="size-3.5" />}
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}
