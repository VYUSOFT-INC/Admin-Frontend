import Link from "next/link";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StoreIcon } from "@/components/icons/OrderIcons";
import { RejectIcon } from "@/components/icons/VendorDetailIcons";
import { CheckCircleIcon } from "@/components/icons/ReturnDetailIcons";
import { VENDOR_TYPE_BADGE_VARIANT } from "@/components/returns/ReturnsTable";
import { VENDORS } from "@/lib/mock-data/vendors";
import type { QcResult, ReturnRequest } from "@/lib/mock-data/returns";

/** Colors the "QC RESULT" pill — green for an intact item, red for confirmed damage, amber while unverified. */
const QC_RESULT_BADGE_VARIANT: Record<QcResult, BadgeVariant> = {
  Intact: "success",
  Damaged: "danger",
  Missing: "warning",
};

interface ReturnVendorResponseCardProps {
  returnRequest: ReturnRequest;
}

/** "Vendor's Response" card: the vendor's written reply, QC result, vendor identity, and their refund recommendation. */
export function ReturnVendorResponseCard({ returnRequest }: ReturnVendorResponseCardProps) {
  const vendorSlug = VENDORS.find((vendor) => vendor.name === returnRequest.vendorName)?.slug;
  const vendorHref = vendorSlug ? `/vendors/${vendorSlug}` : "/vendors";
  const isReject = returnRequest.vendorRecommendation.type === "reject";

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-[18px] py-3.5">
        <h2 className="flex items-center gap-1.5 text-[13.5px] font-extrabold tracking-[-0.14px] text-ink">
          <StoreIcon className="size-3.5 text-primary" />
          Vendor&rsquo;s Response
        </h2>
        <Badge variant={VENDOR_TYPE_BADGE_VARIANT[returnRequest.vendorType]}>{returnRequest.vendorType}</Badge>
      </div>

      <div className="flex flex-col gap-1.5 px-[18px] py-4">
        <blockquote className="rounded-lg border-l-[3px] border-primary-light bg-surface-tint py-3 pl-[17px] pr-3.5">
          <p className="break-words text-[13.5px] font-medium leading-[1.6] text-ink">&ldquo;{returnRequest.vendorResponseText}&rdquo;</p>
        </blockquote>

        <div className="flex items-center justify-between gap-3 pt-2">
          <p className="text-xs font-bold uppercase tracking-[0.72px] text-gray-500">QC Result</p>
          <Badge variant={QC_RESULT_BADGE_VARIANT[returnRequest.qcResult]}>{returnRequest.qcResult}</Badge>
        </div>

        <div className="flex items-center justify-between gap-3 pt-0.5">
          <p className="min-w-0 text-xs font-bold uppercase tracking-[0.72px] text-gray-500">Vendor</p>
          <Link href={vendorHref} className="min-w-0 break-words text-[13px] font-semibold text-ink hover:text-primary hover:underline">
            {returnRequest.vendorName}
          </Link>
        </div>

        <p className="pt-1 text-xs font-bold uppercase tracking-[0.72px] text-gray-500">Vendor&rsquo;s Recommendation</p>
        <div
          className={`flex items-center gap-2 rounded-lg border px-[15px] py-[11px] ${
            isReject ? "border-primary-soft bg-primary-lighter" : "border-[#ccebd7] bg-success-light"
          }`}
        >
          {isReject ? <RejectIcon className="size-4 shrink-0 text-primary" /> : <CheckCircleIcon className="size-4 shrink-0 text-success" />}
          <p className={`break-words text-[13px] font-semibold ${isReject ? "text-primary" : "text-success"}`}>
            {returnRequest.vendorRecommendation.note}
          </p>
        </div>
      </div>
    </Card>
  );
}
