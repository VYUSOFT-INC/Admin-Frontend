import type { ReturnStatus } from "@/lib/mock-data/returns";

interface ReturnStatusTabsProps {
  tabs: Array<{ label: string; value: ReturnStatus | "All" }>;
  active: ReturnStatus | "All";
  onChange: (value: ReturnStatus | "All") => void;
  counts: Partial<Record<ReturnStatus | "All", number>>;
}

/**
 * "All / Pending Review / Refund Approved / Refund Rejected / Escalated" pill row — matches
 * the Figma "returns and refunds" design's FILTER TABS. Active tabs get a filled pink chip
 * (reusing the existing `primary-lighter`/`primary-soft` tokens) rather than Orders'
 * underline treatment, matching this screen's distinct chip-style reference.
 */
export function ReturnStatusTabs({ tabs, active, onChange, counts }: ReturnStatusTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-[10px] border border-border bg-white p-1.5">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        const count = counts[tab.value] ?? 0;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
              isActive ? "bg-primary-lighter text-primary" : "text-gray-500 hover:bg-surface-tint"
            }`}
          >
            {tab.label}
            <span
              className={`inline-flex h-[18px] min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                isActive ? "bg-primary-soft text-primary" : "bg-surface-tint text-gray-500"
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
