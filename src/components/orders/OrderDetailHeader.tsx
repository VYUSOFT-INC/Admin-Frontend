import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { BackArrowIcon } from "@/components/icons/VendorDetailIcons";
import { ChevronRightIcon } from "@/components/icons/VendorIcons";
import { CalendarIcon } from "@/components/icons/NavIcons";
import { PersonIcon, StoreIcon, TruckIcon } from "@/components/icons/OrderIcons";
import { FULFILLMENT_BADGE_VARIANT, PAYMENT_BADGE_VARIANT, STATUS_BADGE_VARIANT } from "@/components/orders/OrdersTable";
import type { FulfillmentType } from "@/lib/mock-data/products";
import type { Order, OrderStatus } from "@/lib/mock-data/orders";

const FULFILLMENT_ICON: Record<FulfillmentType, typeof TruckIcon> = {
  Delivery: TruckIcon,
  "In-Store Pickup": StoreIcon,
  "Walk-in": PersonIcon,
};

interface OrderDetailHeaderProps {
  order: Order;
  status: OrderStatus;
}

/**
 * Breadcrumb + "ORDER STRIP" band for the Order Detail screen: back link, order number, placed
 * timestamp, and the fulfillment/payment/status badges. The fulfillment pill needs an icon slot
 * the shared `Badge` component doesn't have, so it's built inline here rather than stretching
 * `Badge` for a one-off case.
 */
export function OrderDetailHeader({ order, status }: OrderDetailHeaderProps) {
  const FulfillmentIcon = FULFILLMENT_ICON[order.fulfillment];

  return (
    <div className="flex flex-col gap-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-primary">
        <Link href="/orders" className="hover:underline">
          Orders
        </Link>
        <ChevronRightIcon className="size-3" />
        <span className="font-bold">{order.orderNumber}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/orders"
          aria-label="Back to orders"
          className="flex size-[34px] shrink-0 items-center justify-center rounded-lg border border-border bg-white text-ink hover:bg-surface-tint"
        >
          <BackArrowIcon className="size-4" />
        </Link>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 rounded-[10px] border border-border bg-white px-[21px] py-[17px]">
          <p className="font-mono text-[20px] font-bold tracking-[-0.6px] text-ink">{order.orderNumber}</p>
          <span className="h-[22px] w-px shrink-0 bg-border" aria-hidden="true" />
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500">
            <CalendarIcon className="size-3.5" />
            {order.placedAt}
          </span>
          <span className="h-[22px] w-px shrink-0 bg-border" aria-hidden="true" />
          <Badge variant={FULFILLMENT_BADGE_VARIANT[order.fulfillment]} className="gap-1">
            <FulfillmentIcon className="size-[11px]" />
            {order.fulfillment}
          </Badge>
          <Badge variant={PAYMENT_BADGE_VARIANT[order.paymentMethod]}>{order.paymentMethod}</Badge>
          <Badge variant={STATUS_BADGE_VARIANT[status]}>{status}</Badge>
        </div>
      </div>
    </div>
  );
}
