import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PackageBoxIcon } from "@/components/icons/ReturnDetailIcons";
import { FULFILLMENT_BADGE_VARIANT } from "@/components/returns/ReturnsTable";
import { PAYMENT_BADGE_VARIANT } from "@/components/orders/OrdersTable";
import { ORDERS } from "@/lib/mock-data/orders";
import type { ReturnRequest } from "@/lib/mock-data/returns";

interface ReturnOrderContextCardProps {
  returnRequest: ReturnRequest;
}

/**
 * "Order Context" card: the returned line item plus the amount/payment/fulfillment/date it
 * was originally ordered under. "View Full Order" only links to `/orders/[id]` when that order
 * actually exists in the shared `ORDERS` mock (see `ReturnDetailHeader`'s matching fallback).
 */
export function ReturnOrderContextCard({ returnRequest }: ReturnOrderContextCardProps) {
  const orderExists = ORDERS.some((order) => order.id === returnRequest.orderId);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-[18px] py-3.5">
        <h2 className="flex items-center gap-1.5 text-[13.5px] font-extrabold tracking-[-0.14px] text-ink">
          <PackageBoxIcon className="size-3.5 text-gray-500" />
          Order Context
        </h2>
        {orderExists && (
          <Link href={`/orders/${returnRequest.orderId}`} className="text-xs font-bold text-primary hover:underline">
            View Full Order &rarr;
          </Link>
        )}
      </div>

      <div className="flex items-start gap-4 px-[18px] py-4">
        <div className="relative size-[72px] shrink-0 overflow-hidden rounded-lg border border-border bg-surface-tint">
          <Image src={returnRequest.productImage} alt={returnRequest.productName} fill sizes="72px" className="object-cover" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="break-words text-sm font-bold text-ink">
            {returnRequest.productName} &mdash; {returnRequest.productSizeNote}
          </p>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.55px] text-gray-500">Original Order Amount</p>
              <p className="mt-0.5 break-words text-[13px] font-semibold text-ink">
                &#8377;{returnRequest.orderAmount.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.55px] text-gray-500">Payment Method</p>
              <div className="mt-0.5">
                <Badge variant={PAYMENT_BADGE_VARIANT[returnRequest.paymentMethod]}>{returnRequest.paymentMethod}</Badge>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.55px] text-gray-500">Fulfillment Type</p>
              <div className="mt-0.5">
                <Badge variant={FULFILLMENT_BADGE_VARIANT[returnRequest.fulfillment]}>{returnRequest.fulfillment}</Badge>
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.55px] text-gray-500">Order Date</p>
              <p className="mt-0.5 break-words text-[13px] font-semibold text-ink">{returnRequest.orderPlacedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
