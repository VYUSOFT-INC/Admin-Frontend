"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { DisputePagination } from "@/components/disputes/DisputePagination";
import type { DisputePriority, DisputeRecord, DisputeStatus, DisputeType } from "@/lib/mock-data/disputes";

export const TYPE_BADGE_VARIANT: Record<DisputeType, BadgeVariant> = {
  Return: "warning",
  Payment: "danger",
  Order: "danger",
  Policy: "purple",
};

/** Matches the Figma reference exactly: Open is amber, In Progress/Escalated both render the same
 *  pink `danger` chip (verified against the design's actual hex fills, not just a screenshot
 *  glance — see the "dispute managment" node's row badges), Resolved is green. */
export const STATUS_BADGE_VARIANT: Record<DisputeStatus, BadgeVariant> = {
  Open: "warning",
  "In Progress": "danger",
  Escalated: "danger",
  Resolved: "success",
};

export const PRIORITY_BADGE_VARIANT: Record<DisputePriority, BadgeVariant> = {
  Low: "success",
  Medium: "warning",
  High: "danger",
};

const PAGE_SIZE = 8;

interface DisputeQueueTableProps {
  disputes: DisputeRecord[];
  onReview: (id: string) => void;
}

/** Dispute Queue's table + pagination — matches the Figma "dispute managment" design's table
 *  (the heading/description and filters above it live in the parent page, all three inside one
 *  wrapping card, matching the design's single "Dispute Queue" container). `Review` opens
 *  `DisputeReviewPanel` (a hand-authored split decision workspace — the Figma file doesn't
 *  include a separate frame for it, only this list screen). */
export function DisputeQueueTable({ disputes, onReview }: DisputeQueueTableProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(disputes.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = useMemo(() => disputes.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE), [disputes, safePage]);

  function goToPage(nextPage: number) {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Dispute ID</TableHeaderCell>
              <TableHeaderCell>Type</TableHeaderCell>
              <TableHeaderCell>Order ID</TableHeaderCell>
              <TableHeaderCell>Customer vs Vendor</TableHeaderCell>
              <TableHeaderCell>Amount at Stake</TableHeaderCell>
              <TableHeaderCell>Raised Date</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Priority</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageItems.map((dispute) => {
              const orderHref = dispute.orderId ? `/orders/${dispute.orderId}` : "/orders";
              const partyLabel = dispute.customerName ? `${dispute.customerName} vs ${dispute.vendorName}` : `Platform vs ${dispute.vendorName}`;
              return (
                <TableRow key={dispute.id}>
                  <TableCell>
                    <div className="min-w-0">
                      <p className="min-w-0 break-words font-bold text-ink">{dispute.id}</p>
                      <p className="mt-0.5 min-w-0 break-words text-xs font-medium text-gray-500">{dispute.updateNote}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={TYPE_BADGE_VARIANT[dispute.type]}>{dispute.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={orderHref} className="whitespace-nowrap font-bold text-primary hover:underline">
                      {dispute.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="min-w-0 max-w-[220px]">
                      <p className="min-w-0 break-words font-bold text-ink">{partyLabel}</p>
                      <p className="mt-0.5 min-w-0 break-words text-xs font-medium text-gray-500">{dispute.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="min-w-0">
                      <p className="min-w-0 whitespace-nowrap break-words font-bold text-ink">₹{dispute.amount.toLocaleString("en-IN")}</p>
                      <p className="mt-0.5 min-w-0 break-words text-xs font-medium text-gray-500">{dispute.amountNote}</p>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-bold text-ink">{dispute.raisedDate}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_BADGE_VARIANT[dispute.status]}>{dispute.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={PRIORITY_BADGE_VARIANT[dispute.priority]}>{dispute.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <button
                      type="button"
                      onClick={() => onReview(dispute.id)}
                      className="flex h-[34px] min-w-[86px] items-center justify-center whitespace-nowrap rounded-[10px] bg-primary px-3.5 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
                    >
                      Review
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
            {pageItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="py-10 text-center text-sm font-semibold text-gray-500">
                  No disputes match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DisputePagination currentPage={safePage} totalPages={totalPages} onPageChange={goToPage} filteredCount={disputes.length} />
    </>
  );
}
