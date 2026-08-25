import { ChevronDownIcon } from "@/components/icons/ProductIcons";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/VendorIcons";

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50] as const;

interface ResellersPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
  /** Rows in the filtered set across every page. */
  filteredCount: number;
}

/**
 * Pagination footer for the Reseller Management table, including the "Rows per page" control
 * the Figma design shows alongside the usual prev/page-numbers/next controls. `RESELLERS` ships
 * 24 mock rows (see `src/lib/mock-data/resellers.ts`) specifically so this has real pages to move
 * between — every control here is wired to actual state, not a disabled placeholder.
 */
export function ResellersPagination({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  filteredCount,
}: ResellersPaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  const startRow = filteredCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, filteredCount);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3.5">
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-[12.5px] font-medium text-gray-500">
          Rows per page
          <span className="relative inline-flex items-center">
            <select
              value={rowsPerPage}
              onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
              className="appearance-none rounded-lg border border-border bg-white py-1.5 pl-2.5 pr-7 text-[12.5px] font-bold text-ink focus:outline-none"
            >
              {ROWS_PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2 size-2.5 text-gray-500" />
          </span>
        </label>
        <p className="min-w-0 break-words text-[12.5px] font-medium text-gray-500">
          Showing <span className="font-bold">{startRow}-{endRow}</span> of <span className="font-bold">{filteredCount}</span> resellers
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Previous page"
          className="flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg border border-border bg-white px-2.5 text-[13px] font-semibold text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ChevronLeftIcon className="size-3.5" />
          <span className="hidden sm:inline">Previous</span>
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
          className="flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg border border-border bg-white px-2.5 text-[13px] font-semibold text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRightIcon className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
