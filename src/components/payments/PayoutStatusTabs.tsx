import type { PayoutStatus } from "@/lib/mock-data/payments";

interface PayoutStatusTabsProps {
  tabs: Array<{ label: string; value: PayoutStatus | "All" }>;
  active: PayoutStatus | "All";
  onChange: (value: PayoutStatus | "All") => void;
  counts: Partial<Record<PayoutStatus | "All", number>>;
}

/**
 * "All / Pending / Processed / On Hold / Overdue" underline tab row — matches the Figma
 * "payments payout" design's FILTER TABS, which sit flush against the top of the table card
 * with a red bottom-border underline on the active tab (the same underline treatment
 * `OrderStatusTabs` already uses for Orders, distinct from Returns' filled-chip tabs).
 */
export function PayoutStatusTabs({ tabs, active, onChange, counts }: PayoutStatusTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-white px-4">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        const count = counts[tab.value] ?? 0;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-1.5 border-b-2 px-3.5 py-3 text-[13px] font-bold transition-colors ${
              isActive ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-ink"
            }`}
          >
            {tab.label}
            <span
              className={`inline-flex h-[18px] min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                isActive ? "bg-primary-lighter text-primary" : "bg-surface-tint text-gray-500"
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
