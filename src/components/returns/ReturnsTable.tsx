"use client";

import Image from "next/image";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ExportIcon, SearchIcon } from "@/components/icons/VendorIcons";
import { ReviewIcon } from "@/components/icons/ReturnIcons";
import type { VendorType } from "@/lib/mock-data/vendors";
import type { ReturnFulfillment, ReturnRequest, ReturnStatus } from "@/lib/mock-data/returns";
import { ReturnsPagination } from "@/components/returns/ReturnsPagination";

/** Same vendor-type coloring convention as `OrdersTable`/`ProductsTable`, kept local per that same established pattern. */
export const VENDOR_TYPE_BADGE_VARIANT: Record<VendorType, BadgeVariant> = {
  "Online Seller": "info",
  "Physical Store": "success",
};

export const FULFILLMENT_BADGE_VARIANT: Record<ReturnFulfillment, BadgeVariant> = {
  Delivery: "info",
  Pickup: "purple",
};

/**
 * Matches the Figma reference exactly: Pending and Escalated both render with the same
 * amber "warning" treatment (bg-[#fef3c7]/text-[#92400e] in the design), while Approved is
 * green and Rejected reuses the danger/red token — the top status tabs are what
 * distinguishes Pending from Escalated at a glance.
 */
export const STATUS_BADGE_VARIANT: Record<ReturnStatus, BadgeVariant> = {
  Pending: "warning",
  Approved: "success",
  Rejected: "danger",
  Escalated: "warning",
};

interface ReturnsTableProps {
  returns: ReturnRequest[];
  totalCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

/** "All Returns" card: search + export, the return requests table, and pagination. */
export function ReturnsTable({ returns, totalCount, searchValue, onSearchChange }: ReturnsTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-[18px]">
        <div>
          <h2 className="text-base font-extrabold text-ink">All Returns</h2>
          <p className="mt-0.5 text-xs font-medium text-gray-500">
            Showing {returns.length} of {totalCount} returns &mdash; sorted by request date
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex min-h-[38px] items-center gap-2 rounded-[10px] border border-border bg-surface-tint px-3">
            <SearchIcon className="size-3.5 text-gray-500" />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search return ID, order, customer or vendor..."
              className="w-64 bg-transparent text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <Button type="button" className="gap-2">
            <ExportIcon className="size-3" />
            Export
          </Button>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Return ID</TableHeaderCell>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Vendor</TableHeaderCell>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Fulfillment</TableHeaderCell>
            <TableHeaderCell>Return Reason</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {returns.map((item) => {
            const needsReview = item.status === "Pending" || item.status === "Escalated";
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <p className="min-w-0 break-words font-mono font-bold">{item.returnNumber}</p>
                </TableCell>
                <TableCell>
                  <p className="min-w-0 break-words font-bold text-primary">{item.orderNumber}</p>
                </TableCell>
                <TableCell>
                  <div className="min-w-0 max-w-[160px]">
                    <p className="break-words font-bold">{item.customerName}</p>
                    <p className="mt-0.5 break-words text-[11.5px] font-medium text-gray-400">{item.customerEmail}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex min-w-0 flex-col items-start gap-1">
                    <p className="break-words font-bold">{item.vendorName}</p>
                    <Badge variant={VENDOR_TYPE_BADGE_VARIANT[item.vendorType]}>{item.vendorType}</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex min-w-0 max-w-[170px] items-center gap-2.5">
                    <div className="relative size-9 shrink-0 overflow-hidden rounded-md border border-border bg-surface-tint">
                      <Image src={item.productImage} alt={item.productName} fill sizes="36px" className="object-cover" />
                    </div>
                    <p className="min-w-0 break-words font-semibold">{item.productName}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={FULFILLMENT_BADGE_VARIANT[item.fulfillment]}>{item.fulfillment}</Badge>
                </TableCell>
                <TableCell>
                  <p className="min-w-0 max-w-[140px] break-words font-medium text-gray-500">{item.reason}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap font-bold">₹{item.amount.toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  <Badge variant={STATUS_BADGE_VARIANT[item.status]}>{item.status}</Badge>
                </TableCell>
                <TableCell>
                  {needsReview ? (
                    <Button href={`/returns/${item.id}`} variant="primary" className="min-h-[30px] gap-1.5 px-3.5 text-xs">
                      <ReviewIcon className="size-3" />
                      Review
                    </Button>
                  ) : (
                    <Button href={`/returns/${item.id}`} className="min-h-[30px] px-3.5 text-xs">
                      View
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
          {returns.length === 0 && (
            <TableRow>
              <TableCell colSpan={10} className="py-10 text-center text-sm font-semibold text-gray-500">
                No returns match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ReturnsPagination shownCount={returns.length} totalCount={totalCount} />
    </Card>
  );
}
