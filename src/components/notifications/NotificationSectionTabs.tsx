"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTION_TABS: Array<{ label: string; href: string }> = [
  { label: "Notifications", href: "/notifications" },
  { label: "Preferences", href: "/notifications/preferences" },
];

/**
 * "Notifications / Preferences" segmented control shared by both screens — the Notifications
 * feed (`/notifications`) and the Notification Preferences screen (`/notifications/preferences`,
 * Figma "notification preferences", node 1087:325). Active tab is derived from the current route
 * via `usePathname` — the same "highlight whichever destination matches the current path" rule
 * `Sidebar`'s nav items and `SettingsSubNav`'s `aria-current` styling follow — rather than one tab
 * being hardcoded active, so it highlights correctly and navigates in both directions no matter
 * which of the two screens rendered it.
 */
export function NotificationSectionTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      {SECTION_TABS.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-9 items-center justify-center rounded-[10px] px-3.5 text-[13px] font-bold transition-colors ${
              isActive
                ? "bg-primary-lighter text-primary"
                : "border border-border bg-white font-semibold text-gray-500 hover:bg-surface-tint hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
