import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/VendorIcons";

interface OrdersPaginationProps {
  /** Orders currently visible after filtering/search. */
  shownCount: number;
  /** Total orders in the (mock) dataset, unfiltered. */
  totalCount: number;
}

/**
 * Pagination footer. The bundled mock dataset only ships 16 order records
 * (see `src/lib/mock-data/orders.ts`), so — unlike the Figma reference,
 * which implies ~284 records across many pages — this only ever renders a
 * single active page. The prev/next controls are wired but disabled since
 * there is nothing to page through yet.
 */
export function OrdersPagination({ shownCount, totalCount }: OrdersPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3.5">
      <p className="text-[12.5px] font-medium text-gray-500">
        Showing <span className="font-bold">{shownCount}</span> of <span className="font-bold">{totalCount}</span> orders
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled
          aria-label="Previous page"
          className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-border bg-white text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeftIcon className="size-3.5" />
        </button>
        <button
          type="button"
          className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-ink bg-ink px-2 text-[13px] font-semibold text-white"
        >
          1
        </button>
        <button
          type="button"
          disabled
          aria-label="Next page"
          className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-border bg-white text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRightIcon className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
