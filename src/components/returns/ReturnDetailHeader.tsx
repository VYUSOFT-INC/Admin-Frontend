import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { BackArrowIcon } from "@/components/icons/VendorDetailIcons";
import { ChevronRightIcon } from "@/components/icons/VendorIcons";
import { CalendarIcon } from "@/components/icons/NavIcons";
import { OrderLinkIcon } from "@/components/icons/ReturnDetailIcons";
import { FULFILLMENT_BADGE_VARIANT, STATUS_BADGE_VARIANT } from "@/components/returns/ReturnsTable";
import { ORDERS } from "@/lib/mock-data/orders";
import { STATUS_TABS, type ReturnRequest, type ReturnStatus } from "@/lib/mock-data/returns";

interface ReturnDetailHeaderProps {
  returnRequest: ReturnRequest;
  status: ReturnStatus;
}

/**
 * Breadcrumb + "ORDER STRIP" band for the Return Review screen: back link, return number,
 * linked order reference, fulfillment/requested-date/status. Mirrors `OrderDetailHeader`'s
 * layout exactly, swapping in return-specific fields. The order reference only links to
 * `/orders/[id]` when that order actually exists in the shared `ORDERS` mock (most do, per
 * `returns.ts`'s `orderId` field) — falling back to the Order Management list otherwise, the
 * same fallback rule `OrderVendorCard` uses for vendor links.
 */
export function ReturnDetailHeader({ returnRequest, status }: ReturnDetailHeaderProps) {
  const statusLabel = STATUS_TABS.find((tab) => tab.value === status)?.label ?? status;
  const orderExists = ORDERS.some((order) => order.id === returnRequest.orderId);
  const orderHref = orderExists ? `/orders/${returnRequest.orderId}` : "/orders";

  return (
    <div className="flex flex-col gap-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-primary">
        <Link href="/returns" className="hover:underline">
          Returns
        </Link>
        <ChevronRightIcon className="size-3" />
        <span className="font-bold">{returnRequest.returnNumber}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/returns"
          aria-label="Back to returns"
          className="flex size-[34px] shrink-0 items-center justify-center rounded-lg border border-border bg-white text-ink hover:bg-surface-tint"
        >
          <BackArrowIcon className="size-4" />
        </Link>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 rounded-[10px] border border-border bg-white px-[21px] py-[17px]">
          <p className="font-mono text-[20px] font-bold tracking-[-0.6px] text-ink">{returnRequest.returnNumber}</p>
          <span className="h-[22px] w-px shrink-0 bg-border" aria-hidden="true" />
          <Link href={orderHref} className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:underline">
            <OrderLinkIcon className="size-3" />
            Order
            <span className="font-bold text-primary">{returnRequest.orderNumber}</span>
          </Link>
          <span className="h-[22px] w-px shrink-0 bg-border" aria-hidden="true" />
          <Badge variant={FULFILLMENT_BADGE_VARIANT[returnRequest.fulfillment]}>{returnRequest.fulfillment}</Badge>
          <span className="h-[22px] w-px shrink-0 bg-border" aria-hidden="true" />
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500">
            <CalendarIcon className="size-3.5" />
            Requested {returnRequest.requestedDate}
          </span>
          <span className="h-[22px] w-px shrink-0 bg-border" aria-hidden="true" />
          <Badge variant={STATUS_BADGE_VARIANT[status]}>{statusLabel}</Badge>
        </div>
      </div>
    </div>
  );
}
