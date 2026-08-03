import Image from "next/image";
import { Card } from "@/components/ui/Card";
import type { Order } from "@/lib/mock-data/orders";

interface OrderSummaryCardProps {
  order: Order;
}

/** "ORDER SUMMARY" card: line items with thumbnail/size/color/qty, then the subtotal/discount footer. */
export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  const preDiscountTotal = order.subtotal + order.shippingFee;
  const showStrikethrough = order.discount > 0;

  return (
    <Card className="flex w-full min-w-0 flex-col gap-3 px-[19px] py-[17px]">
      <h2 className="border-b border-surface-tint pb-[11px] text-[11px] font-bold uppercase tracking-[0.66px] text-gray-400">
        Order Summary
      </h2>

      <div className="flex flex-col gap-3">
        {order.items.map((item, index) => (
          <div key={`${item.name}-${index}`} className="flex items-center gap-3">
            <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border">
              <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="48px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="break-words text-[13px] font-bold text-ink">{item.name}</p>
              <p className="break-words text-xs font-medium text-gray-500">
                Size: {item.size} &middot; Color: {item.color}
              </p>
              <p className="break-words text-xs font-medium text-gray-500">
                Qty: {item.qty} &middot; &#8377;{item.price.toLocaleString("en-IN")}
                {item.qty > 1 ? ` × ${item.qty}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-surface-tint pt-[9px]">
        <div>
          <p className="text-[11.5px] font-medium text-gray-500">
            Subtotal &middot; {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
          </p>
          {order.discount > 0 && (
            <p className="text-[11.5px] font-semibold text-success">
              &minus; &#8377;{order.discount.toLocaleString("en-IN")} discount applied
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-base font-extrabold text-ink">&#8377;{order.amount.toLocaleString("en-IN")}</p>
          {showStrikethrough && (
            <p className="text-[11px] font-medium text-gray-500 line-through">
              &#8377;{preDiscountTotal.toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
