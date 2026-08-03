import { Card } from "@/components/ui/Card";
import { LocationIcon } from "@/components/icons/VendorIcons";
import { MailIcon, PersonIcon, PhoneIcon } from "@/components/icons/OrderIcons";
import type { Order } from "@/lib/mock-data/orders";

interface OrderCustomerCardProps {
  order: Order;
}

/** "CUSTOMER" card: full name, phone, email, and delivery/pickup address. */
export function OrderCustomerCard({ order }: OrderCustomerCardProps) {
  return (
    <Card className="flex w-full min-w-0 flex-col gap-3 px-[19px] py-[17px]">
      <h2 className="border-b border-surface-tint pb-[11px] text-[11px] font-bold uppercase tracking-[0.66px] text-gray-400">
        Customer
      </h2>

      <div className="flex items-start gap-2.5">
        <PersonIcon className="mt-0.5 size-[15px] shrink-0 text-gray-400" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-gray-400">Full Name</p>
          <p className="break-words text-[13px] font-bold text-ink">{order.customerName}</p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <PhoneIcon className="mt-0.5 size-[15px] shrink-0 text-gray-400" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-gray-400">Phone</p>
          <p className="break-words text-[13px] font-bold text-ink">{order.customerPhone}</p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <MailIcon className="mt-0.5 size-[15px] shrink-0 text-gray-400" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-gray-400">Email</p>
          <p className="break-words text-[12.5px] font-bold text-ink">{order.customerEmail}</p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <LocationIcon className="mt-1 size-[15px] shrink-0 text-gray-400" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-gray-400">
            {order.fulfillment === "Delivery" ? "Delivery Address" : "Address"}
          </p>
          <div className="mt-2 whitespace-pre-line break-words rounded-lg border border-border bg-surface-tint px-[13px] py-[11px] text-[12.5px] font-medium leading-5 text-gray-700">
            {order.shippingAddress}
          </div>
        </div>
      </div>
    </Card>
  );
}
