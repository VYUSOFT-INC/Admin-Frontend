import Link from "next/link";

const STATUS_TAB_LABELS = ["All", "Open", "In Progress", "Resolved", "Escalated"];

/**
 * "All / Open / In Progress / Resolved / Escalated / Disputes" pill row shown above the Dispute
 * Queue — matches the Figma "dispute managment" design's tab row exactly (filled rounded-full
 * pills, the same treatment `InventoryTabs` uses for its own page, not the count-badged
 * `SupportStatusTabs` style). The five status pills are real links back to the Support Tickets
 * screen's status-filtered list; "Disputes" renders as the active pill since this component only
 * appears on this page, mirroring how `InventoryTabs`/`Inventory` was added alongside
 * `ProductStatusTabs`.
 */
export function DisputeTabs() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-[10px] border border-border bg-white p-1.5">
      {STATUS_TAB_LABELS.map((label) => (
        <Link
          key={label}
          href="/support"
          className="whitespace-nowrap rounded-full border border-border bg-white px-[15px] py-2 text-[13px] font-bold text-gray-500 transition-colors hover:bg-surface-tint"
        >
          {label}
        </Link>
      ))}
      <Link
        href="/support/disputes"
        aria-current="page"
        className="whitespace-nowrap rounded-full border border-[#eaa9ba] bg-primary-light px-[15px] py-2 text-[13px] font-bold text-primary"
      >
        Disputes
      </Link>
    </div>
  );
}
