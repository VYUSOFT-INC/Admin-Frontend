import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/VendorIcons";

interface InventoryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Rows currently visible after filtering (this page's slice). */
  shownCount: number;
  /** Rows in the filtered set across every page. */
  filteredCount: number;
}

/**
 * Pagination footer for the Inventory Overview table. Unlike `ProductsPagination` (whose mock
 * dataset only has 10 rows and so never needs a second page), `INVENTORY_ITEMS` ships 24 mock
 * rows specifically so this control has real pages to move between — every button here is wired
 * to actual page state, not disabled placeholders.
 */
export function InventoryPagination({ currentPage, totalPages, onPageChange, shownCount, filteredCount }: InventoryPaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const startRow = filteredCount === 0 ? 0 : (currentPage - 1) * 8 + 1;
  const endRow = Math.min(currentPage * 8, filteredCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3.5">
      <p className="min-w-0 break-words text-[12.5px] font-medium text-gray-500">
        Showing <span className="font-bold">{startRow}-{endRow}</span> of <span className="font-bold">{filteredCount}</span> inventory rows
        {shownCount === 0 && " (no matches)"}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-border bg-white text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeftIcon className="size-3.5" />
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-[13px] font-semibold transition-colors ${
              page === currentPage ? "border-primary bg-primary-light text-primary" : "border-border bg-white text-gray-500 hover:bg-surface-tint"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-border bg-white text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronRightIcon className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
