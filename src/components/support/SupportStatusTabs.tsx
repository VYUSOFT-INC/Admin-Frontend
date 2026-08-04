import type { TicketStatus } from "@/lib/mock-data/support";

interface SupportStatusTabsProps {
  tabs: Array<{ label: string; value: TicketStatus | "All" }>;
  active: TicketStatus | "All";
  onChange: (value: TicketStatus | "All") => void;
  counts: Partial<Record<TicketStatus | "All", number>>;
}

/**
 * "All / Open / In Progress / Resolved / Escalated" pill row — matches the Figma "support
 * tickets" design's status tabs: the active tab is a solid red-filled pill with a translucent
 * white count badge, distinct from both Payments' underline treatment and Returns' filled-
 * *light*-chip treatment. Inactive tabs are bordered white pills with a neutral count badge,
 * reusing the same `bg-surface-tint`/`text-gray-500` pairing `PayoutStatusTabs`/`ReturnStatusTabs`
 * already use for their own inactive counts.
 */
export function SupportStatusTabs({ tabs, active, onChange, counts }: SupportStatusTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        const count = counts[tab.value] ?? 0;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex h-[34px] items-center gap-1.5 rounded-[10px] border px-3.5 text-xs font-semibold transition-colors ${
              isActive ? "border-primary bg-primary text-white" : "border-border bg-white text-gray-500 hover:bg-surface-tint"
            }`}
          >
            {tab.label}
            <span
              className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold ${
                isActive ? "bg-white/25 text-white" : "bg-surface-tint text-gray-500"
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
