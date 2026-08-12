"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AdminIcon, CalendarIcon, ChangePasswordIcon, LogoutIcon, ProfileIcon } from "@/components/icons/NavIcons";
import { BellIcon } from "@/components/icons/NotificationIcons";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
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

const MENU_ITEM_CLASSES =
  "flex min-h-[42px] w-full items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-left text-sm font-semibold text-ink transition-colors hover:bg-surface-tint";

export function Topbar({ title, description }: TopbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click and on Escape — the dropdown has no other dismiss affordance.
  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // Mock auth — no backend exists yet (same convention as `LoginForm`), so logging out is just a
  // client-side redirect back to the sign-in screen.
  function handleLogout() {
    setIsMenuOpen(false);
    router.push("/login");
  }

  return (
    <header className="flex h-[72px] shrink-0 items-center gap-4 border-b border-border bg-white px-7">
      <div className="min-w-0 max-w-[360px]">
        <h1 className="truncate text-2xl font-extrabold tracking-[-0.72px] text-ink">{title}</h1>
        {description && <p className="truncate text-[13px] font-medium text-gray-500">{description}</p>}
      </div>

      {/* min-w-[160px] (not min-w-0) is load-bearing: a plain `flex-1` resolves to
          `flex: 1 1 0%`, and when the header is even a few px over budget, flexbox's shrink
          algorithm gives zero-basis items zero share of the shrinkage — this slot would
          collapse straight to 0px (search box disappears entirely) while the title barely
          shrank, instead of both shrinking gracefully. The explicit floor guarantees the
          search box always renders at a usable width; the title (which has real `min-w-0`
          and `truncate`) absorbs the rest of the squeeze via ellipsis on narrow viewports. */}
      <div className="flex min-w-[160px] flex-1 justify-center">
        <GlobalSearch />
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

        <div className="relative" ref={menuRef}>
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
              className="absolute right-0 top-[calc(100%+8px)] w-[286px] overflow-hidden rounded-xl border border-border bg-white shadow-[0px_18px_48px_0px_rgba(0,22,57,0.12)]"
            >
              <div className="flex items-center gap-3 p-[18px]">
                <span
                  aria-hidden
                  className="flex size-[42px] shrink-0 items-center justify-center rounded-full text-sm font-extrabold tracking-[0.28px] text-white"
                  style={{ backgroundImage: "linear-gradient(135deg, #d6002e 0%, #e8738c 100%)" }}
                >
                  SA
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <p className="min-w-0 break-words text-sm font-extrabold text-ink">Super Admin</p>
                  <p className="min-w-0 break-words text-xs font-medium text-gray-500">admin@mivyu.com</p>
                </div>
              </div>

              <div className="h-px w-full bg-border" aria-hidden />

              <div className="flex flex-col gap-1 p-2">
                <Link href="/profile" role="menuitem" onClick={() => setIsMenuOpen(false)} className={MENU_ITEM_CLASSES}>
                  <ProfileIcon className="size-[17px] shrink-0" />
                  My Profile
                </Link>
                <Link
                  href="/profile/change-password"
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                  className={MENU_ITEM_CLASSES}
                >
                  <ChangePasswordIcon className="size-[17px] shrink-0" />
                  Change Password
                </Link>

                <div className="h-px w-full bg-border" aria-hidden />

                <button type="button" role="menuitem" onClick={handleLogout} className={`${MENU_ITEM_CLASSES} text-primary`}>
                  <LogoutIcon className="size-[17px] shrink-0" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
