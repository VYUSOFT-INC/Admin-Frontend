import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { BackArrowIcon } from "@/components/icons/VendorDetailIcons";
import { ChevronRightIcon } from "@/components/icons/VendorIcons";
import { CartIcon, DueClockIcon, HashIcon, PayoutCalendarIcon } from "@/components/icons/PaymentIcons";
import { STATUS_BADGE_VARIANT, VENDOR_TYPE_BADGE_VARIANT } from "@/components/payments/PayoutsTable";
import { VENDORS } from "@/lib/mock-data/vendors";
import type { Payout, PayoutStatus } from "@/lib/mock-data/payments";

interface PayoutDetailHeaderProps {
  payout: Payout;
  status: PayoutStatus;
}

/**
 * Breadcrumb + "Top Strip" band for the Payout Detail screen — mirrors the back link/breadcrumb
 * pattern `OrderDetailHeader`/`ReturnDetailHeader` establish (not itself present in the Figma
 * "payout detail" frame, which starts directly at the Top Strip, but every other detail screen
 * in this app provides one so `/payments/[id]` stays consistent and navigable back to the list).
 * The vendor name deep-links into Vendor Detail when the vendor also exists in the full
 * `VENDORS` mock, falling back to the Vendor Management list otherwise — same fallback rule
 * `OrderVendorCard` uses.
 */
export function PayoutDetailHeader({ payout, status }: PayoutDetailHeaderProps) {
  const vendorExists = VENDORS.some((vendor) => vendor.slug === payout.vendorSlug);
  const vendorHref = vendorExists ? `/vendors/${payout.vendorSlug}` : "/vendors";

  return (
    <div className="flex flex-col gap-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-primary">
        <Link href="/payments" className="hover:underline">
          Payments
        </Link>
        <ChevronRightIcon className="size-3" />
        <span className="font-bold">{payout.payoutNumber}</span>
      </nav>

      <div className="flex flex-wrap items-start gap-3">
        <Link
          href="/payments"
          aria-label="Back to payments"
          className="flex size-[34px] shrink-0 items-center justify-center rounded-lg border border-border bg-white text-ink hover:bg-surface-tint"
        >
          <BackArrowIcon className="size-4" />
        </Link>

        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-white px-[23px] py-[19px]">
          <div className="flex min-w-0 flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <Link href={vendorHref} className="break-words text-[18px] font-extrabold tracking-[-0.54px] text-primary underline">
                {payout.vendorName}
              </Link>
              <Badge variant={VENDOR_TYPE_BADGE_VARIANT[payout.vendorType]}>{payout.vendorType}</Badge>
              <Badge variant={STATUS_BADGE_VARIANT[status]}>{status}</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500">
                <PayoutCalendarIcon className="size-[13px]" />
                Period: {payout.periodLabel}
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500">
                <HashIcon className="size-[13px]" />
                Payout ID: {payout.payoutNumber}
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500">
                <DueClockIcon className="size-[13px]" />
                Due: {payout.dueDate}
              </span>
              <span className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500">
                <CartIcon className="size-[13px]" />
                {payout.ordersCount} Orders
              </span>
            </div>
          </div>

          <div className="flex min-w-0 shrink-0 flex-col items-end gap-1.5">
            <p className="text-[11px] font-bold uppercase tracking-[0.77px] text-gray-500">Final Net Payout</p>
            <p className="break-words text-[28px] font-black tracking-[-1.12px] text-ink">₹{payout.finalNetPayout.toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
