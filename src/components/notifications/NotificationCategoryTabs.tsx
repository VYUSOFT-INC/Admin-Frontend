import type { NotificationCategory } from "@/lib/mock-data/notifications";

interface NotificationCategoryTabsProps {
  tabs: Array<{ label: string; value: NotificationCategory | "All" }>;
  active: NotificationCategory | "All";
  onChange: (value: NotificationCategory | "All") => void;
  /** Always derived from the full, unfiltered notification list at render time (see
   * `NotificationsPage`) — never hardcoded — so a tab's own count never drifts from what's
   * actually in that category, the same rule `SupportStatusTabs`' counts follow. */
  counts: Partial<Record<NotificationCategory | "All", number>>;
}

/**
 * "All / Vendors / Products / Orders / Payments / Support / System" underline tabs — matches the
 * Figma "notifcation page" design's filter row: a red 2px bottom border + bold red label on the
 * active tab (distinct from `SupportStatusTabs`' filled-pill treatment), each with a rounded
 * count badge.
 */
export function NotificationCategoryTabs({ tabs, active, onChange, counts }: NotificationCategoryTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        const count = counts[tab.value] ?? 0;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-[13px] font-semibold transition-colors ${
              isActive ? "border-primary font-bold text-primary" : "border-transparent text-gray-500 hover:text-ink"
            }`}
          >
            {tab.label}
            <span
              className={`inline-flex h-[18px] min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                isActive ? "bg-primary-soft text-primary" : "bg-primary-lighter text-gray-500"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
