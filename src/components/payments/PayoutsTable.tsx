"use client";

import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import type { Payout, PayoutStatus } from "@/lib/mock-data/payments";
import type { VendorType } from "@/lib/mock-data/vendors";

/** Same vendor-type coloring convention as `OrdersTable`/`ReturnsTable`, kept local per that same established pattern. */
export const VENDOR_TYPE_BADGE_VARIANT: Record<VendorType, BadgeVariant> = {
  "Online Seller": "info",
  "Physical Store": "success",
};

/**
 * Matches the Figma reference exactly: Pending is amber, Processed is green, and Overdue
 * reuses the danger/red token (same bg-[#fbe5ea]/text-[#d6002e] as the Overdue stat card).
 * On Hold isn't shown in the Figma table sample rows, so it gets the same neutral "muted"
 * treatment `OrdersTable` uses for its own non-urgent, non-final status ("No Show").
 */
export const STATUS_BADGE_VARIANT: Record<PayoutStatus, BadgeVariant> = {
  Pending: "warning",
  Processed: "success",
  "On Hold": "muted",
  Overdue: "danger",
};

interface PayoutsTableProps {
  payouts: Payout[];
}

/** Payout ID / Vendor / Period / Orders / Gross / Commission / Net / Due Date / Status / Action columns — the Figma TABLE section. */
export function PayoutsTable({ payouts }: PayoutsTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Payout ID</TableHeaderCell>
          <TableHeaderCell>Vendor</TableHeaderCell>
          <TableHeaderCell>Period</TableHeaderCell>
          <TableHeaderCell>Orders</TableHeaderCell>
          <TableHeaderCell>Gross Amount</TableHeaderCell>
          <TableHeaderCell>Commission</TableHeaderCell>
          <TableHeaderCell>Net Amount</TableHeaderCell>
          <TableHeaderCell>Due Date</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Action</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {payouts.map((payout) => (
          <TableRow key={payout.id}>
            <TableCell>
              <p className="min-w-0 whitespace-nowrap font-bold text-primary">{payout.payoutNumber}</p>
            </TableCell>
            <TableCell>
              <div className="flex min-w-0 flex-col items-start gap-1">
                <p className="break-words font-bold">{payout.vendorName}</p>
                <Badge variant={VENDOR_TYPE_BADGE_VARIANT[payout.vendorType]}>{payout.vendorType}</Badge>
              </div>
            </TableCell>
            <TableCell className="whitespace-nowrap">{payout.periodLabel}</TableCell>
            <TableCell className="text-center">{payout.ordersCount}</TableCell>
            <TableCell className="whitespace-nowrap font-bold">₹{payout.grossAmount.toLocaleString("en-IN")}</TableCell>
            <TableCell className="whitespace-nowrap font-bold text-primary">
              &minus;₹{payout.commission.toLocaleString("en-IN")}
            </TableCell>
            <TableCell className="whitespace-nowrap font-extrabold text-success">
              ₹{payout.netAmount.toLocaleString("en-IN")}
            </TableCell>
            <TableCell className="whitespace-nowrap text-gray-500">{payout.dueDate}</TableCell>
            <TableCell>
              <Badge variant={STATUS_BADGE_VARIANT[payout.status]}>{payout.status}</Badge>
            </TableCell>
            <TableCell>
              <Button href={`/payments/${payout.id}`} className="min-h-[30px] px-3.5 text-xs">
                View
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {payouts.length === 0 && (
          <TableRow>
            <TableCell colSpan={10} className="py-10 text-center text-sm font-semibold text-gray-500">
              No payouts match the current filter.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
