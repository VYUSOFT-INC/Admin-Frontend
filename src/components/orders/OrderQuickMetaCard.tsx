import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import type { Order } from "@/lib/mock-data/orders";

interface MetaRowProps {
  label: string;
  children: ReactNode;
  strong?: boolean;
}

function MetaRow({ label, children, strong = false }: MetaRowProps) {
  return (
    <div className={`flex items-center justify-between gap-3 border-b py-2 last:border-b-0 ${strong ? "border-border pt-3" : "border-surface-tint"}`}>
      <p className="min-w-0 shrink-0 text-[13px] font-medium text-gray-500">{label}</p>
      <p className={`min-w-0 break-words text-right ${strong ? "text-[15px] font-bold text-ink" : "text-[13px] font-bold text-ink"}`}>
        {children}
      </p>
    </div>
  );
}

interface OrderQuickMetaCardProps {
  order: Order;
}

/** "ORDER DETAILS" quick-meta card: order id, item count, and the price breakdown down to the total paid. */
export function OrderQuickMetaCard({ order }: OrderQuickMetaCardProps) {
  return (
    <Card className="flex w-full min-w-0 flex-col px-[19px] py-[19px]">
      <h2 className="border-b border-surface-tint pb-[11px] text-[11px] font-bold uppercase tracking-[0.66px] text-gray-400">
        Order Details
      </h2>
      <div className="flex flex-col">
        <MetaRow label="Order ID">
          <span className="font-mono">{order.orderNumber}</span>
        </MetaRow>
        <MetaRow label="Items">
          {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
        </MetaRow>
        <MetaRow label="Subtotal">&#8377;{order.subtotal.toLocaleString("en-IN")}</MetaRow>
        <MetaRow label="Discount">
          {order.discount > 0 ? (
            <span className="text-primary">&minus; &#8377;{order.discount.toLocaleString("en-IN")}</span>
          ) : (
            <span className="text-gray-400">&mdash;</span>
          )}
        </MetaRow>
        <MetaRow label="Shipping">
          {order.shippingFee > 0 ? (
            <>&#8377;{order.shippingFee.toLocaleString("en-IN")}</>
          ) : (
            <span className="text-success">Free</span>
          )}
        </MetaRow>
        <MetaRow label="Total Paid" strong>
          &#8377;{order.amount.toLocaleString("en-IN")}
        </MetaRow>
      </div>
    </Card>
  );
}
