import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PhoneIcon, StoreIcon, WarehouseIcon } from "@/components/icons/OrderIcons";
import { VENDOR_TYPE_BADGE_VARIANT } from "@/components/orders/OrdersTable";
import { VENDORS } from "@/lib/mock-data/vendors";
import type { Order } from "@/lib/mock-data/orders";

interface OrderVendorCardProps {
  order: Order;
}

/**
 * "VENDOR / STORE" card: vendor name (deep-linked into Vendor Detail when the vendor also
 * exists in the full `VENDORS` mock, falling back to the Vendor Management list otherwise —
 * same fallback rule `ProductVendorCard` uses), type/tier badges, contact, and warehouse address.
 */
export function OrderVendorCard({ order }: OrderVendorCardProps) {
  const vendorSlug = VENDORS.find((vendor) => vendor.name === order.vendorName)?.slug;
  const vendorHref = vendorSlug ? `/vendors/${vendorSlug}` : "/vendors";

  return (
    <Card className="flex w-full min-w-0 flex-col gap-3 px-[19px] py-[17px]">
      <h2 className="border-b border-surface-tint pb-[11px] text-[11px] font-bold uppercase tracking-[0.66px] text-gray-400">
        Vendor / Store
      </h2>

      <div className="flex items-start gap-2.5">
        <StoreIcon className="mt-0.5 size-[15px] shrink-0 text-gray-400" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-gray-400">Vendor</p>
          <Link href={vendorHref} className="break-words text-[13px] font-bold text-primary hover:underline">
            {order.vendorName}
          </Link>
        </div>
      </div>

      <div className="flex items-start gap-2.5 pl-[26px]">
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={VENDOR_TYPE_BADGE_VARIANT[order.vendorType]}>{order.vendorType}</Badge>
          <Badge variant="info">{order.vendorTier}</Badge>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <PhoneIcon className="mt-0.5 size-[15px] shrink-0 text-gray-400" />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-gray-400">Contact</p>
          <p className="break-words text-[13px] font-bold text-ink">{order.vendorPhone}</p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <WarehouseIcon className="mt-1 size-[15px] shrink-0 text-gray-400" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-gray-400">Warehouse Address</p>
          <div className="mt-2 whitespace-pre-line break-words rounded-lg border border-border bg-surface-tint px-[13px] py-[11px] text-[12.5px] font-medium leading-5 text-gray-700">
            {order.vendorAddress}
          </div>
        </div>
      </div>
    </Card>
  );
}
