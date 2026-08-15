import Link from "next/link";

const STATUS_TAB_LABELS = ["All", "Approved", "Pending Review", "Rejected", "Flagged"];

/**
 * "All / Approved / Pending Review / Rejected / Flagged / Inventory / Reviews" pill row shown
 * above the Inventory filters bar — matches the Figma "inventory managment" design's tab row
 * exactly (filled rounded-full pills, not the underlined-tab style `ProductStatusTabs` uses
 * elsewhere). The five status pills are real links back to the Products screen's status-filtered
 * list; "Inventory" renders as the active pill since this component only appears on this page.
 * "Reviews" is a plain link over to the Reviews Moderation sub-view (`/products/reviews`), added
 * once that screen existed, mirroring how this "Inventory" pill was added to `ProductStatusTabs`.
 */
export function InventoryTabs() {
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
        aria-current="page"
        className="whitespace-nowrap rounded-full border border-[#ecbbc9] bg-primary-light px-[15px] py-2 text-[13px] font-bold text-primary"
      >
        Inventory
      </Link>
      <Link
        href="/products/reviews"
        className="whitespace-nowrap rounded-full border border-border bg-white px-[15px] py-2 text-[13px] font-bold text-gray-500 transition-colors hover:bg-surface-tint"
      >
        Reviews
      </Link>
    </div>
  );
}
