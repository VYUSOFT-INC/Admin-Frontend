"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminIcon, CalendarIcon } from "@/components/icons/NavIcons";
import { BellIcon } from "@/components/icons/NotificationIcons";
import { NOTIFICATIONS } from "@/lib/mock-data/notifications";

export interface TopbarProps {
  title: string;
  description?: string;
}

const TODAY_LABEL = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(new Date());

// Whether the bell shows an unread badge, computed once from the bundled mock dataset (see
// `src/lib/mock-data/notifications.ts`). This is a static snapshot, not a live subscription —
// like every other cross-screen mock-data reference in this app, there's no shared store yet, so
// marking notifications read/unread on the Notifications screen doesn't feed back into this badge
// mid-session.
const HAS_UNREAD_NOTIFICATIONS = NOTIFICATIONS.some((notification) => !notification.read);

export function Topbar({ title, description }: TopbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-border bg-white px-7">
      <div>
        <h1 className="text-2xl font-extrabold tracking-[-0.72px] text-ink">{title}</h1>
        {description && <p className="text-[13px] font-medium text-gray-500">{description}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <Link
          href="/notifications"
          aria-label="Notifications"
          className="relative flex size-[34px] shrink-0 items-center justify-center rounded-[10px] border border-border bg-white hover:bg-surface-tint"
        >
          <BellIcon className="size-4 text-ink" />
          {HAS_UNREAD_NOTIFICATIONS && (
            <span className="absolute right-[5px] top-[5px] size-2 rounded-sm border border-white bg-primary" aria-hidden />
          )}
        </Link>

        <div className="flex min-h-[38px] items-center gap-2 rounded-full border border-border bg-white px-[13px] py-[9px]">
          <CalendarIcon className="size-5 text-ink" />
          <span className="text-[13px] font-bold text-ink">Today &middot; {TODAY_LABEL}</span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            className="flex min-h-[38px] items-center gap-2 rounded-full border border-border bg-white py-[5px] pl-[5px] pr-[11px]"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-primary-lighter">
              <AdminIcon className="size-3.5 text-primary" />
            </span>
            <span className="text-[13px] font-bold text-ink">Super Admin</span>
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+8px)] w-44 overflow-hidden rounded-[10px] border border-border bg-white shadow-lg"
            >
              <button
                type="button"
                role="menuitem"
                className="block w-full px-4 py-2.5 text-left text-[13px] font-semibold text-ink hover:bg-surface-tint"
              >
                Profile
              </button>
              <button
                type="button"
                role="menuitem"
                className="block w-full px-4 py-2.5 text-left text-[13px] font-semibold text-primary hover:bg-surface-tint"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
