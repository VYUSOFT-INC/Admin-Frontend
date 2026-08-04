import { ProductFilterDropdown } from "@/components/products/ProductFilterDropdown";
import { SearchIcon } from "@/components/icons/VendorIcons";
import type { TicketCategory, TicketPriority, TicketRaisedByType } from "@/lib/mock-data/support";

interface SupportFiltersBarProps {
  raisedByTabs: Array<{ label: string; value: TicketRaisedByType | "All" }>;
  activeRaisedBy: TicketRaisedByType | "All";
  onRaisedByChange: (value: TicketRaisedByType | "All") => void;
  categoryOptions: TicketCategory[];
  activeCategory: TicketCategory | "All";
  onCategoryChange: (value: TicketCategory | "All") => void;
  priorityOptions: TicketPriority[];
  activePriority: TicketPriority | "All";
  onPriorityChange: (value: TicketPriority | "All") => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

/**
 * Filter row above the ticket split-layout — matches the Figma "support tickets" design's
 * FILTER ROW: an "All / Vendor / Customer" segmented control (the same bordered-segment pattern
 * `ReturnFiltersBar` uses for its own type tabs) on the left, and "All Issues" / "All Priorities"
 * dropdowns on the right, reusing `ProductFilterDropdown` — the same working dropdown Products/
 * Orders/Returns already use — rather than a bespoke, non-interactive lookalike. The search box
 * isn't in the Figma reference (that screen has no visible search input), but every sibling list
 * screen (Orders/Returns/Vendors) has one, and the task calls for real client-side search, so one
 * is added here in the same slot those screens use it, searching ticket #, subject, and requester.
 */
export function SupportFiltersBar({
  raisedByTabs,
  activeRaisedBy,
  onRaisedByChange,
  categoryOptions,
  activeCategory,
  onCategoryChange,
  priorityOptions,
  activePriority,
  onPriorityChange,
  searchValue,
  onSearchChange,
}: SupportFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-border bg-white px-[17px] py-3">
      <div className="flex items-center gap-0.5 rounded-lg border border-border p-1">
        {raisedByTabs.map((tab) => {
          const isActive = tab.value === activeRaisedBy;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onRaisedByChange(tab.value)}
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
        <div className="flex h-9 items-center gap-2 rounded-lg border border-border bg-white px-3.5">
          <SearchIcon className="size-3.5 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search ticket, subject or requester..."
            className="w-56 bg-transparent text-[13px] font-medium text-ink placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <ProductFilterDropdown
          label="Category"
          allLabel="All Issues"
          value={activeCategory}
          options={categoryOptions}
          onChange={onCategoryChange}
        />
        <ProductFilterDropdown
          label="Priority"
          allLabel="All Priorities"
          value={activePriority}
          options={priorityOptions}
          onChange={onPriorityChange}
        />
      </div>
    </div>
  );
}
