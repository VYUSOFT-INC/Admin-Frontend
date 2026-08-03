"use client";

import { useState } from "react";
import { OrderActionPanel } from "@/components/orders/OrderActionPanel";
import { OrderCustomerCard } from "@/components/orders/OrderCustomerCard";
import { OrderDetailHeader } from "@/components/orders/OrderDetailHeader";
import { OrderQuickMetaCard } from "@/components/orders/OrderQuickMetaCard";
import { OrderSummaryCard } from "@/components/orders/OrderSummaryCard";
import { OrderTimelineCard } from "@/components/orders/OrderTimelineCard";
import { OrderVendorCard } from "@/components/orders/OrderVendorCard";
import type { Order, OrderStatus } from "@/lib/mock-data/orders";

interface OrderDetailViewProps {
  order: Order;
}

/**
 * Client-side shell for the Order Detail screen. Owns the (locally optimistic) order status so
 * the header badge and action panel stay in sync.
 *
 * There is no backend, so — matching the precedent set by `VendorDetailView` /
 * `ProductReviewView` — a status change also mutates `order.status` on the exact `Order` object
 * this page was given in place (it's the same object reference held inside the shared `ORDERS`
 * array from `lib/mock-data/orders`, not a copy). That keeps this screen consistent with the
 * Orders list: navigating back via the header's `Link` remounts `/orders`, which re-reads
 * `ORDERS` and picks up the change.
 *
 * The parent page renders this with `key={order.id}`, so React remounts it (resetting local
 * state) when navigating from one order's detail screen directly to another's.
 */
export function OrderDetailView({ order }: OrderDetailViewProps) {
  const [status, setStatus] = useState<OrderStatus>(order.status);

  function handleStatusChange(next: OrderStatus) {
    order.status = next;
    setStatus(next);
  }

  return (
    <div className="flex flex-col gap-4">
      <OrderDetailHeader order={order} status={status} />

      <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-3">
        <OrderCustomerCard order={order} />
        <OrderVendorCard order={order} />
        <OrderSummaryCard order={order} />
      </div>

      <div className="flex flex-col items-start gap-3.5 lg:flex-row">
        <div className="min-w-0 flex-1">
          <OrderTimelineCard order={order} />
        </div>
        <div className="flex w-full flex-col gap-3.5 lg:w-[340px] lg:shrink-0">
          <OrderActionPanel order={order} status={status} onStatusChange={handleStatusChange} />
          <OrderQuickMetaCard order={order} />
        </div>
      </div>
    </div>
  );
}
