import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/VendorIcons";

interface NotificationsPaginationProps {
  /** Notifications currently visible after the category filter. */
  shownCount: number;
  /** Total notifications in the (mock) dataset, unfiltered. */
  totalCount: number;
}

/**
 * Pagination footer. Like `ReturnsPagination`/`TicketList`'s footer, the bundled mock dataset
 * (8 notifications — see `src/lib/mock-data/notifications.ts`) only ever fills a single page, so
 * Prev/Next stay disabled and only page "1" is active.
 */
export function NotificationsPagination({ shownCount, totalCount }: NotificationsPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-4">
      <p className="text-xs font-medium text-gray-500">
        Showing <span className="font-bold text-ink">{shownCount}</span> of <span className="font-bold text-ink">{totalCount}</span>{" "}
        notifications
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
          className="flex h-8 min-w-8 items-center justify-center rounded-lg border border-primary bg-primary text-xs font-semibold text-white"
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
