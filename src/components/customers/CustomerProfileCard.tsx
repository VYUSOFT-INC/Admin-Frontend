import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LocationIcon } from "@/components/icons/VendorIcons";
import { MailIcon, PhoneIcon, StoreIcon, TruckIcon } from "@/components/icons/OrderIcons";
import { BagIcon, CustomerCalendarIcon, ReturnArrowIcon, WalkInIcon } from "@/components/icons/CustomerIcons";
import { getTotalOrders, type Customer } from "@/lib/mock-data/customers";

interface CustomerProfileCardProps {
  customer: Customer;
}

/** Derives "AM" from "Arjun Mehta" for the initials avatar — same convention as every other
 * screen that only stores a customer's name, not a photo. */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase();
}

/** "Customer Profile Card" + "Fulfillment Preference Strip" from the Figma design: avatar,
 * name/status, contact details, lifetime order/return stat chips, and the delivery/pickup/
 * walk-in breakdown. The profile photo in the Figma reference is swapped for the project's
 * established initials `Avatar` (pink) since no other screen renders a real customer photo. */
export function CustomerProfileCard({ customer }: CustomerProfileCardProps) {
  const totalOrders = getTotalOrders(customer);
  const { delivery, pickup, walkin } = customer.fulfillmentBreakdown;

  return (
    <Card className="flex flex-col gap-4 px-[25px] py-[21px]">
      <div className="flex items-start gap-4">
        <Avatar initials={getInitials(customer.name)} size={56} className="text-base" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="min-w-0 break-words text-[17px] font-extrabold tracking-[-0.51px] text-ink">{customer.name}</h3>
            <Badge variant={customer.status === "Active" ? "success" : "danger"}>{customer.status}</Badge>
          </div>

          <div className="flex flex-wrap items-center gap-x-[18px] gap-y-1.5">
            <div className="flex min-w-0 items-center gap-1.5">
              <PhoneIcon className="size-[13px] shrink-0 text-gray-500" />
              <p className="min-w-0 break-words text-xs font-medium text-gray-500">{customer.phone}</p>
            </div>
            <div className="flex min-w-0 items-center gap-1.5">
              <MailIcon className="size-[13px] shrink-0 text-gray-500" />
              <p className="min-w-0 break-words text-xs font-medium text-gray-500">{customer.email}</p>
            </div>
            <div className="flex min-w-0 items-center gap-1.5">
              <LocationIcon className="size-[13px] shrink-0 text-gray-500" />
              <p className="min-w-0 break-words text-xs font-medium text-gray-500">{customer.location}</p>
            </div>
            <div className="flex min-w-0 items-center gap-1.5">
              <CustomerCalendarIcon className="size-[13px] shrink-0 text-gray-500" />
              <p className="min-w-0 break-words text-xs font-medium text-gray-500">Registered {customer.registeredDate}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex h-7 items-center gap-1.5 rounded-xl bg-primary-lighter px-3">
              <BagIcon className="size-3 shrink-0 text-ink" />
              <span className="whitespace-nowrap text-xs font-bold text-ink">
                {totalOrders} Total {totalOrders === 1 ? "Order" : "Orders"}
              </span>
            </span>
            <span className="flex h-7 items-center gap-1.5 rounded-xl bg-primary-lighter px-3">
              <ReturnArrowIcon className="size-3 shrink-0 text-ink" />
              <span className="whitespace-nowrap text-xs font-bold text-ink">
                {customer.totalReturns} {customer.totalReturns === 1 ? "Return" : "Returns"}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-[10px] bg-surface-tint px-4 py-2.5">
        <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.55px] text-gray-500">
          Fulfillment Preference
        </span>

        <span className="flex items-center gap-1.5 text-xs">
          <TruckIcon className="size-[13px] shrink-0 text-[#2563eb]" />
          <span className="font-bold text-[#2563eb]">Delivery:</span>
          <span className="font-semibold text-ink">
            {delivery} {delivery === 1 ? "order" : "orders"}
          </span>
        </span>
        <span className="text-border" aria-hidden="true">
          &middot;
        </span>
        <span className="flex items-center gap-1.5 text-xs">
          <StoreIcon className="size-[13px] shrink-0 text-[#7c3aed]" />
          <span className="font-bold text-[#7c3aed]">In-Store Pickup:</span>
          <span className="font-semibold text-ink">
            {pickup} {pickup === 1 ? "order" : "orders"}
          </span>
        </span>
        <span className="text-border" aria-hidden="true">
          &middot;
        </span>
        <span className="flex items-center gap-1.5 text-xs">
          <WalkInIcon className="size-[13px] shrink-0 text-success" />
          <span className="font-bold text-success">Walk-in:</span>
          <span className="font-semibold text-ink">
            {walkin} {walkin === 1 ? "order" : "orders"}
          </span>
        </span>
      </div>
    </Card>
  );
}
