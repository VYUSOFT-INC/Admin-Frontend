"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { FULFILLMENT_BADGE_VARIANT, STATUS_BADGE_VARIANT } from "@/components/orders/OrdersTable";
import { SearchResultArrowIcon } from "@/components/icons/NavIcons";
import { ORDERS } from "@/lib/mock-data/orders";
import type { CustomerOrderStatus, CustomerRecentOrder } from "@/lib/mock-data/customers";

interface CustomerOrdersTableProps {
  orders: CustomerRecentOrder[];
}

const PAGE_SIZE = 10;

/** Extends the shared Order Management status colors with the two extra statuses the Figma
 * "customer" design's Order History table uses ("Picked Up", "Returned") plus two overrides
 * ("Ready for Pickup" and "Cancelled" both render differently here than on the Order Management
 * screen) — kept as its own map, scoped to this table, so Order Management's colors are
 * untouched. */
const CUSTOMER_ORDER_STATUS_BADGE_VARIANT: Record<CustomerOrderStatus, BadgeVariant> = {
  ...STATUS_BADGE_VARIANT,
  "Ready for Pickup": "purple",
  Cancelled: "muted",
  "Picked Up": "purple",
  Returned: "warning",
};

/** "Order History" table + pagination footer from the Figma design (node 1143:4098): Order ID /
 * Date / Fulfillment Type / Amount / Status / Action columns, a "N orders" count badge next to
 * the heading, and a real 10-per-page paginator (the mock data's `orderHistory` arrays are sized
 * to match each customer's lifetime order count, so customers with more than 10 orders — Arjun,
 * Meera — genuinely page through multiple pages here, not just a decorative control). */
export function CustomerOrdersTable({ orders }: CustomerOrdersTableProps) {
  const [page, setPage] = useState(1);
  const total = orders.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, total);
  const visibleOrders = orders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[15px] font-extrabold tracking-[-0.3px] text-ink">Order History</h3>
          <Badge variant="danger">
            {total} {total === 1 ? "order" : "orders"}
          </Badge>
        </div>
        <p className="text-xs font-medium text-gray-400">
          Showing {Math.min(PAGE_SIZE, total)} most recent orders
        </p>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Fulfillment Type</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleOrders.map((order) => {
            // Older customer orders can predate the shared `ORDERS` window (see
            // `CustomerRecentOrder` in customers.ts) — fall back to the Order Management list
            // instead of a dead link, the same `orderExists` pattern `ReturnDetailHeader` uses.
            const orderExists = ORDERS.some((candidate) => candidate.id === order.orderId);
            const href = orderExists ? `/orders/${order.orderId}` : "/orders";
            return (
              <TableRow key={order.orderId}>
                <TableCell>
                  <p className="min-w-0 whitespace-nowrap font-mono font-bold text-primary">{order.orderNumber}</p>
                </TableCell>
                <TableCell className="whitespace-nowrap text-gray-500">{order.date}</TableCell>
                <TableCell>
                  <Badge variant={FULFILLMENT_BADGE_VARIANT[order.fulfillment]}>{order.fulfillment}</Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap font-bold">₹{order.amount.toLocaleString("en-IN")}</TableCell>
                <TableCell>
                  <Badge variant={CUSTOMER_ORDER_STATUS_BADGE_VARIANT[order.status]}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 whitespace-nowrap text-xs font-bold text-primary hover:underline"
                  >
                    View Order
                    <SearchResultArrowIcon className="size-3 shrink-0" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-sm font-semibold text-gray-500">
                This customer has no recorded orders yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {total > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3.5">
          <p className="text-[12.5px] font-medium text-gray-500">
            Showing <span className="font-bold">{start}-{end}</span> of <span className="font-bold">{total}</span> orders
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-8 items-center justify-center rounded-lg border border-border bg-white px-3 text-xs font-bold text-gray-500 transition-colors hover:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-2.5 text-xs font-bold transition-colors ${
                  pageNumber === currentPage
                    ? "border-primary bg-primary-lighter text-primary"
                    : "border-border bg-white text-gray-500 hover:bg-surface-tint"
                }`}
              >
                {pageNumber}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={currentPage === pageCount}
              className="flex h-8 items-center justify-center rounded-lg border border-border bg-white px-3 text-xs font-bold text-gray-500 transition-colors hover:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}
