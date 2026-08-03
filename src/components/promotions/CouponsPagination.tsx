import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/VendorIcons";

interface CouponsPaginationProps {
  /** Coupons currently visible after tab filtering. */
  shownCount: number;
  /** Total coupons in the (mock) dataset, unfiltered. */
  totalCount: number;
}

/**
 * Pagination footer, matching the Figma design's "Showing 8 of 8 coupons" copy. The bundled
 * mock dataset only ships 8 coupon records (see `src/lib/mock-data/promotions.ts`), so this
 * only ever renders a single active page — the prev/next controls are wired but disabled since
 * there is nothing to page through yet, mirroring `OrdersPagination`/`PayoutsPagination`.
 */
export function CouponsPagination({ shownCount, totalCount }: CouponsPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
      <p className="text-xs font-medium text-gray-500">
        Showing <span className="font-bold">{shownCount}</span> of <span className="font-bold">{totalCount}</span> coupons
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled
          aria-label="Previous page"
          className="flex h-[30px] min-w-[30px] items-center justify-center rounded-lg border border-border bg-white text-gray-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeftIcon className="size-3.5" />
        </button>
        <button
          type="button"
          className="flex h-[30px] min-w-[30px] items-center justify-center rounded-lg border border-primary bg-primary px-2 text-xs font-semibold text-white"
        >
          1
        </button>
        <button
          type="button"
          disabled
          aria-label="Next page"
          className="flex h-[30px] min-w-[30px] items-center justify-center rounded-lg border border-border bg-white text-gray-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRightIcon className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
