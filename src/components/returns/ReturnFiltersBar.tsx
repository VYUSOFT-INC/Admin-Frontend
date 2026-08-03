import { CalendarIcon } from "@/components/icons/NavIcons";
import { StoreIcon } from "@/components/icons/OrderIcons";
import { FilterIcon } from "@/components/icons/VendorIcons";
import { ProductFilterDropdown } from "@/components/products/ProductFilterDropdown";
import {
  DATE_RANGE_OPTIONS,
  RETURN_REASONS,
  type DateRangeOption,
  type ReturnFulfillment,
  type ReturnReason,
} from "@/lib/mock-data/returns";

interface ReturnFiltersBarProps {
  typeTabs: Array<{ label: string; value: ReturnFulfillment | "All" }>;
  activeType: ReturnFulfillment | "All";
  onTypeChange: (value: ReturnFulfillment | "All") => void;
  activeDateRange: DateRangeOption | "All";
  onDateRangeChange: (value: DateRangeOption | "All") => void;
  vendors: string[];
  activeVendor: string | "All";
  onVendorChange: (value: string | "All") => void;
  activeReason: ReturnReason | "All";
  onReasonChange: (value: ReturnReason | "All") => void;
}

/**
 * Filter row shown above the returns table — matches the Figma "returns and refunds"
 * design's FILTER ROW: a return-type segmented control (All / Delivery Returns / Pickup
 * Returns) on the left, and Date Range / All Vendors / Reason dropdowns on the right. The
 * three dropdowns reuse `ProductFilterDropdown` (the same working dropdown Products/Orders
 * use for their filters) rather than a bespoke icon+chevron component, keeping the control
 * genuinely interactive and consistent with the rest of the codebase.
 */
export function ReturnFiltersBar({
  typeTabs,
  activeType,
  onTypeChange,
  activeDateRange,
  onDateRangeChange,
  vendors,
  activeVendor,
  onVendorChange,
  activeReason,
  onReasonChange,
}: ReturnFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-border bg-white px-[17px] py-3">
      <div className="flex items-center gap-0.5 rounded-lg border border-border p-1">
        {typeTabs.map((tab) => {
          const isActive = tab.value === activeType;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTypeChange(tab.value)}
              className={`rounded-md px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                isActive ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:bg-surface-tint"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <ProductFilterDropdown
          label="Date Range"
          allLabel="All Time"
          value={activeDateRange}
          options={[...DATE_RANGE_OPTIONS]}
          onChange={onDateRangeChange}
          icon={<CalendarIcon className="size-3.5 text-gray-500" />}
        />
        <ProductFilterDropdown
          label="Vendor"
          allLabel="All Vendors"
          value={activeVendor}
          options={vendors}
          onChange={onVendorChange}
          icon={<StoreIcon className="size-3.5 text-gray-500" />}
        />
        <ProductFilterDropdown
          label="Reason"
          allLabel="All Reasons"
          value={activeReason}
          options={[...RETURN_REASONS]}
          onChange={onReasonChange}
          icon={<FilterIcon className="size-3.5 text-gray-500" />}
        />
      </div>
    </div>
  );
}
