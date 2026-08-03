"use client";

import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ExportIcon, SearchIcon } from "@/components/icons/VendorIcons";
import type { FulfillmentType } from "@/lib/mock-data/products";
import type { VendorType } from "@/lib/mock-data/vendors";
import type { Order, OrderStatus, PaymentMethod } from "@/lib/mock-data/orders";
import { OrdersPagination } from "@/components/orders/OrdersPagination";

/** Shared with anywhere else an order's vendor type is shown, so colors stay consistent. */
export const VENDOR_TYPE_BADGE_VARIANT: Record<VendorType, BadgeVariant> = {
  "Online Seller": "info",
  "Physical Store": "success",
};

export const FULFILLMENT_BADGE_VARIANT: Record<FulfillmentType, BadgeVariant> = {
  Delivery: "info",
  "In-Store Pickup": "purple",
  "Walk-in": "success",
};

export const PAYMENT_BADGE_VARIANT: Record<PaymentMethod, BadgeVariant> = {
  Prepaid: "success",
  COD: "warning",
};

export const STATUS_BADGE_VARIANT: Record<OrderStatus, BadgeVariant> = {
  Pending: "warning",
  Processing: "info",
  "Ready for Pickup": "warning",
  Shipped: "purple",
  Delivered: "success",
  Collected: "success",
  Completed: "success",
  Cancelled: "danger",
  "No Show": "muted",
  Flagged: "danger",
  NDR: "warning",
};

interface OrdersTableProps {
  orders: Order[];
  totalCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

/** "All Orders" card: search + export, the orders table, and pagination. */
export function OrdersTable({ orders, totalCount, searchValue, onSearchChange }: OrdersTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-[18px]">
        <div>
          <h2 className="text-base font-extrabold text-ink">All Orders</h2>
          <p className="mt-0.5 text-xs font-medium text-gray-500">
            Showing {orders.length} of {totalCount} orders &mdash; sorted by order date
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex min-h-[38px] items-center gap-2 rounded-[10px] border border-border bg-surface-tint px-3">
            <SearchIcon className="size-3.5 text-gray-500" />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search order ID, customer or vendor..."
              className="w-56 bg-transparent text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
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
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Vendor</TableHeaderCell>
            <TableHeaderCell>Fulfillment</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Payment</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <div className="min-w-0">
                  <p className="break-words font-mono font-bold">{order.orderNumber}</p>
                  <p className="mt-0.5 break-words text-[11.5px] font-medium text-gray-400">
                    {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="min-w-0 max-w-[160px]">
                  <p className="break-words font-bold">{order.customerName}</p>
                  <p className="mt-0.5 break-words text-[11.5px] font-medium text-gray-400">{order.customerEmail}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex min-w-0 flex-col items-start gap-1">
                  <p className="break-words font-bold">{order.vendorName}</p>
                  <Badge variant={VENDOR_TYPE_BADGE_VARIANT[order.vendorType]}>{order.vendorType}</Badge>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={FULFILLMENT_BADGE_VARIANT[order.fulfillment]}>{order.fulfillment}</Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap font-bold">₹{order.amount.toLocaleString("en-IN")}</TableCell>
              <TableCell>
                <Badge variant={PAYMENT_BADGE_VARIANT[order.paymentMethod]}>{order.paymentMethod}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant={STATUS_BADGE_VARIANT[order.status]}>{order.status}</Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap text-[12.5px] font-medium text-gray-500">{order.date}</TableCell>
              <TableCell>
                <Button href={`/orders/${order.id}`} className="min-h-[30px] px-3.5 text-xs">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {orders.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="py-10 text-center text-sm font-semibold text-gray-500">
                No orders match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <OrdersPagination shownCount={orders.length} totalCount={totalCount} />
    </Card>
  );
}
