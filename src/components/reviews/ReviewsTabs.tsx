import Link from "next/link";

const STATUS_TAB_LABELS = ["All", "Approved", "Pending Review", "Rejected", "Flagged"];

/**
 * "All / Approved / Pending Review / Rejected / Flagged / Inventory / Reviews" pill row shown
 * above the Reviews stat cards — matches the Figma "reviews moderation" design's tab row exactly
 * (same filled rounded-full pills as `InventoryTabs`, since both sub-views share this row).
 * The five status pills and "Inventory" are real links back to the Products screen (status pills
 * land on the unfiltered list — same behavior `InventoryTabs` already has); "Reviews" renders as
 * the active pill since this component only appears on this page.
 */
export function ReviewsTabs() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-[10px] border border-border bg-white p-1.5">
      {STATUS_TAB_LABELS.map((label) => (
        <Link
          key={label}
          href="/products"
          className="whitespace-nowrap rounded-full border border-border bg-white px-[15px] py-2 text-[13px] font-bold text-gray-500 transition-colors hover:bg-surface-tint"
        >
          {label}
        </Link>
      ))}
      <Link
        href="/products/inventory"
        className="whitespace-nowrap rounded-full border border-border bg-white px-[15px] py-2 text-[13px] font-bold text-gray-500 transition-colors hover:bg-surface-tint"
      >
        Inventory
      </Link>
      <Link
        href="/products/reviews"
        aria-current="page"
        className="whitespace-nowrap rounded-full border border-[#ecbbc9] bg-primary-light px-[15px] py-2 text-[13px] font-bold text-primary"
      >
        Reviews
      </Link>
    </div>
  );
}
