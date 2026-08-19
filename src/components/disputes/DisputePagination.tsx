import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/VendorIcons";

interface DisputePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Rows in the filtered set across every page. */
  filteredCount: number;
}

const PAGE_SIZE = 8;

/**
 * Pagination footer for the Dispute Queue table — matches the Figma reference's "Previous 1 2 3
 * Next" footer. `DISPUTES` ships 19 mock rows specifically so this control has real pages to
 * move between (the same reason `InventoryPagination` documents for its own dataset size), every
 * button wired to real page state rather than disabled placeholders.
 */
export function DisputePagination({ currentPage, totalPages, onPageChange, filteredCount }: DisputePaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const startRow = filteredCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endRow = Math.min(currentPage * PAGE_SIZE, filteredCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3.5">
      <p className="min-w-0 break-words text-[12.5px] font-medium text-gray-500">
        Showing <span className="font-bold">{startRow}-{endRow}</span> of <span className="font-bold">{filteredCount}</span> disputes ·
        Select Review to open the split decision panel
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="flex h-8 min-w-[74px] items-center justify-center gap-1 rounded-lg border border-border bg-white px-2 text-[13px] font-semibold text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeftIcon className="size-3.5" />
          Previous
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
          className="flex h-8 min-w-[58px] items-center justify-center gap-1 rounded-lg border border-border bg-white px-2 text-[13px] font-semibold text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
          <ChevronRightIcon className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
