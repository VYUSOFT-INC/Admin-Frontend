"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { StarIcon } from "@/components/icons/ReviewIcons";
import type { Review, ReviewStatus } from "@/lib/mock-data/reviews";
import { ReviewsPagination } from "@/components/reviews/ReviewsPagination";

const STATUS_BADGE_VARIANT: Record<ReviewStatus, BadgeVariant> = {
  Approved: "success",
  Pending: "warning",
  Flagged: "warning",
  Removed: "danger",
};

/** Action button color per Figma (`Flag`/`Remove` are reused verbatim across every status; only
 *  `Approve` is conditional — see `ReviewsTable` below). Kept local since these exact
 *  border/text pairs don't map onto an existing `Button` variant. */
const ACTION_BUTTON_CLASSES = {
  approve: "border-[#a4c6ad] text-[#16a34a]",
  flag: "border-[#f2c497] text-[#a16207]",
  remove: "border-[#e99cb0] text-[#d6002e]",
};

const PAGE_SIZE = 8;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} className={`size-3.5 ${index < rating ? "text-[#f59e0b]" : "text-border"}`} />
      ))}
    </div>
  );
}

interface ReviewsTableProps {
  /** Full filtered set (every matching row across every page). */
  reviews: Review[];
}

/**
 * "Review Queue" card: product/customer/rating/review-text/date/status table + moderation
 * actions + pagination. Approve/Flag/Remove are real, local state — clicking one updates that
 * row's status immediately (badge, row highlight, and the button row itself all reflect it),
 * per the Vendor Management screen's earlier no-op-button bug. Status changes are tracked in a
 * local override map (keyed by review id) rather than mutated onto the shared `REVIEWS` mock
 * array, since — unlike Products' approve/reject, which needs to survive navigating to and from
 * `/products/[id]` — every moderation action here happens on this same table, so component state
 * is sufficient; it does mean an override can leave a row visible after it no longer matches an
 * active Status filter, same trade-off `InventoryTable`'s "Notify Vendor" already accepts.
 */
export function ReviewsTable({ reviews }: ReviewsTableProps) {
  const [page, setPage] = useState(1);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, ReviewStatus>>({});
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = reviews.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function goToPage(nextPage: number) {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  function setStatus(reviewId: string, status: ReviewStatus) {
    setStatusOverrides((current) => ({ ...current, [reviewId]: status }));
  }

  function toggleExpanded(reviewId: string) {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border px-[18px] pb-4 pt-[18px]">
        <h2 className="text-base font-extrabold text-ink">Review Queue</h2>
        <p className="mt-0.5 text-xs font-medium text-gray-500">
          Pagination and column spacing have been tuned so actions stay visible and review text truncates cleanly.
        </p>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Rating</TableHeaderCell>
            <TableHeaderCell>Review Text</TableHeaderCell>
            <TableHeaderCell>Submitted Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pageItems.map((review) => {
            const status = statusOverrides[review.id] ?? review.status;
            const isFlagged = status === "Flagged";
            const isExpanded = expandedIds.has(review.id);
            return (
              <TableRow key={review.id} className={isFlagged ? "bg-[#fef5e7]" : ""}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-[10px] border border-border bg-surface-tint">
                      <Image src={review.imageUrl} alt={review.productName} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="min-w-0 max-w-[220px]">
                      <p className="break-words font-bold">{review.productName}</p>
                      <p className="mt-0.5 break-words text-xs font-medium text-gray-500">{review.vendorName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap font-bold">{review.customerName}</TableCell>
                <TableCell>
                  <StarRating rating={review.rating} />
                </TableCell>
                <TableCell>
                  <div className="flex min-w-0 max-w-[320px] items-start gap-1.5">
                    <p className={`min-w-0 break-words ${isExpanded ? "" : "line-clamp-2"}`}>{review.reviewText}</p>
                    <button
                      type="button"
                      onClick={() => toggleExpanded(review.id)}
                      className="shrink-0 whitespace-nowrap text-xs font-bold text-primary hover:underline"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap font-bold text-ink">{review.submittedDate}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_BADGE_VARIANT[status]}>{status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex min-w-0 flex-col items-start gap-2">
                    {status === "Pending" && (
                      <button
                        type="button"
                        onClick={() => setStatus(review.id, "Approved")}
                        className={`min-h-[32px] whitespace-nowrap rounded-[10px] border bg-white px-3.5 text-xs font-bold transition-colors hover:bg-surface-tint ${ACTION_BUTTON_CLASSES.approve}`}
                      >
                        Approve
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setStatus(review.id, "Flagged")}
                      className={`min-h-[32px] whitespace-nowrap rounded-[10px] border bg-white px-3.5 text-xs font-bold transition-colors hover:bg-surface-tint ${ACTION_BUTTON_CLASSES.flag}`}
                    >
                      Flag
                    </button>
                    <button
                      type="button"
                      onClick={() => setStatus(review.id, "Removed")}
                      className={`min-h-[32px] whitespace-nowrap rounded-[10px] border bg-white px-3.5 text-xs font-bold transition-colors hover:bg-surface-tint ${ACTION_BUTTON_CLASSES.remove}`}
                    >
                      Remove
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {pageItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-sm font-semibold text-gray-500">
                No reviews match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ReviewsPagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={goToPage}
        shownCount={pageItems.length}
        filteredCount={reviews.length}
      />
    </Card>
  );
}
