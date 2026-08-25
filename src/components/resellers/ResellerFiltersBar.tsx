import { ProductFilterDropdown } from "@/components/products/ProductFilterDropdown";
import { SearchIcon } from "@/components/icons/VendorIcons";
import { StatusFilterIcon, TierIcon } from "@/components/icons/ResellerIcons";
import type { ResellerStatus, ResellerTier } from "@/lib/mock-data/resellers";
import { STATUS_OPTIONS, STATUS_TABS, TIER_OPTIONS } from "@/lib/mock-data/resellers";

interface PillTabsProps {
  active: ResellerStatus | "All";
  onChange: (value: ResellerStatus | "All") => void;
  counts: Partial<Record<ResellerStatus | "All", number>>;
}

/** Status pill tabs (All / Active / Suspended / Pending Verification) — a quick-filter row that
 *  mirrors the "Status" dropdown alongside it (Figma "re-seller" design shows both affordances
 *  bound to the same underlying status filter, matching `VendorFiltersBar`'s local `PillTabs`). */
function PillTabs({ active, onChange, counts }: PillTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {STATUS_TABS.map((tab) => {
        const isActive = tab.value === active;
        const count = counts[tab.value];
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-full border px-[15px] text-[13px] font-bold transition-colors ${
              isActive ? "border-[#f2dfe7] bg-primary-light text-primary" : "border-[#f2dfe7] bg-white text-gray-500 hover:bg-surface-tint"
            }`}
          >
            {tab.label}
            {count !== undefined && (
              <span
                className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold ${
                  isActive ? "bg-primary-lighter text-gray-500" : "bg-surface-tint text-gray-500"
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

interface ResellerFiltersBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeTier: ResellerTier | "All";
  onTierChange: (value: ResellerTier | "All") => void;
  activeStatus: ResellerStatus | "All";
  onStatusChange: (value: ResellerStatus | "All") => void;
  statusCounts: Partial<Record<ResellerStatus | "All", number>>;
}

/** Search + Performance Tier/Status dropdowns + status pill tabs shown above the resellers
 *  table — matches the Figma "re-seller" design's single filters card. */
export function ResellerFiltersBar({
  searchValue,
  onSearchChange,
  activeTier,
  onTierChange,
  activeStatus,
  onStatusChange,
  statusCounts,
}: ResellerFiltersBarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-white p-[19px]">
      <div className="flex flex-col gap-3.5 lg:flex-row lg:items-center">
        <div className="flex min-h-[52px] min-w-0 flex-1 items-center gap-2.5 rounded-[10px] border border-border px-[19px]">
          <SearchIcon className="size-[18px] shrink-0 text-gray-500" />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or email"
            className="w-full min-w-0 bg-transparent text-sm font-medium text-ink placeholder:text-gray-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <ProductFilterDropdown
            label="Performance Tier"
            allLabel="All Tiers"
            value={activeTier}
            options={TIER_OPTIONS}
            onChange={onTierChange}
            icon={<TierIcon className="size-4 text-gray-500" />}
          />
          <ProductFilterDropdown
            label="Status"
            allLabel="All Statuses"
            value={activeStatus}
            options={STATUS_OPTIONS}
            onChange={onStatusChange}
            icon={<StatusFilterIcon className="size-4 text-gray-500" />}
          />
        </div>
      </div>

      <PillTabs active={activeStatus} onChange={onStatusChange} counts={statusCounts} />
    </div>
  );
}
