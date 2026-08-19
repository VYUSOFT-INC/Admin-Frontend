import { CalendarIcon } from "@/components/icons/NavIcons";
import { ProductFilterDropdown } from "@/components/products/ProductFilterDropdown";
import {
  DISPUTE_DATE_RANGE_OPTIONS,
  DISPUTE_PRIORITY_OPTIONS,
  DISPUTE_STATUS_OPTIONS,
  DISPUTE_TYPE_OPTIONS,
  type DisputeDateRangeOption,
  type DisputePriority,
  type DisputeStatus,
  type DisputeType,
} from "@/lib/mock-data/disputes";

interface DisputeFiltersBarProps {
  activeType: DisputeType | "All";
  onTypeChange: (value: DisputeType | "All") => void;
  activeStatus: DisputeStatus | "All";
  onStatusChange: (value: DisputeStatus | "All") => void;
  activeDateRange: DisputeDateRangeOption | "All";
  onDateRangeChange: (value: DisputeDateRangeOption | "All") => void;
  activePriority: DisputePriority | "All";
  onPriorityChange: (value: DisputePriority | "All") => void;
}

/**
 * "All Types / All Status / Date Range / Priority: All" filter row — matches the Figma "dispute
 * managment" design's FILTER ROW layout (four controls in a row above the queue table). Each
 * reuses `ProductFilterDropdown` — the same working dropdown Products/Orders/Returns/Support
 * already use — instead of the Figma reference's static-looking pink-tinted boxes, so every
 * filter is genuinely wired to real queue-filtering state. The Date Range control uses the same
 * preset-window convention (`Last 7/30/90 Days`) `ReturnFiltersBar` already established for the
 * same concept, rather than a bespoke calendar range-picker no other screen in this project has.
 */
export function DisputeFiltersBar({
  activeType,
  onTypeChange,
  activeStatus,
  onStatusChange,
  activeDateRange,
  onDateRangeChange,
  activePriority,
  onPriorityChange,
}: DisputeFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <ProductFilterDropdown label="" allLabel="All Types" value={activeType} options={DISPUTE_TYPE_OPTIONS} onChange={onTypeChange} />
      <ProductFilterDropdown label="" allLabel="All Status" value={activeStatus} options={DISPUTE_STATUS_OPTIONS} onChange={onStatusChange} />
      <ProductFilterDropdown
        label=""
        allLabel="All Dates"
        value={activeDateRange}
        options={[...DISPUTE_DATE_RANGE_OPTIONS]}
        onChange={onDateRangeChange}
        icon={<CalendarIcon className="size-3.5 text-gray-500" />}
      />
      <ProductFilterDropdown label="Priority" allLabel="All" value={activePriority} options={DISPUTE_PRIORITY_OPTIONS} onChange={onPriorityChange} />
    </div>
  );
}
