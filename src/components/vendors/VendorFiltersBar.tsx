import type { VendorStatus, VendorType } from "@/lib/mock-data/vendors";

interface PillTabsProps<T extends string> {
  tabs: Array<{ label: string; value: T }>;
  active: T;
  onChange: (value: T) => void;
  counts?: Partial<Record<T, number>>;
}

function PillTabs<T extends string>({ tabs, active, onChange, counts }: PillTabsProps<T>) {
  return (
    <div className="flex items-center gap-1 rounded-[10px] border border-border bg-white p-1.5">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        const count = counts?.[tab.value];
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              isActive ? "border border-[#ecb6c5] bg-primary-light text-primary" : "text-gray-500 hover:bg-surface-tint"
            }`}
          >
            {tab.label}
            {count !== undefined && (
              <span
                className={`inline-flex h-[18px] min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold ${
                  isActive ? "bg-primary text-white" : "bg-surface-tint text-gray-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

interface VendorFiltersBarProps {
  statusTabs: Array<{ label: string; value: VendorStatus | "All" }>;
  activeStatus: VendorStatus | "All";
  onStatusChange: (value: VendorStatus | "All") => void;
  statusCounts: Partial<Record<VendorStatus | "All", number>>;
  typeTabs: Array<{ label: string; value: VendorType | "All" }>;
  activeType: VendorType | "All";
  onTypeChange: (value: VendorType | "All") => void;
}

/** Status + vendor-type filter pills shown above the vendors table. */
export function VendorFiltersBar({
  statusTabs,
  activeStatus,
  onStatusChange,
  statusCounts,
  typeTabs,
  activeType,
  onTypeChange,
}: VendorFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-surface-tint p-[13px]">
      <PillTabs tabs={statusTabs} active={activeStatus} onChange={onStatusChange} counts={statusCounts} />
      <PillTabs tabs={typeTabs} active={activeType} onChange={onTypeChange} />
    </div>
  );
}
