import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { ClaimIcon } from "@/components/icons/ReturnDetailIcons";
import type { ReturnRequest } from "@/lib/mock-data/returns";

interface ReturnClaimCardProps {
  returnRequest: ReturnRequest;
}

/** "Customer's Claim" card: return reason, the customer's evidence photos, and the requested refund amount. */
export function ReturnClaimCard({ returnRequest }: ReturnClaimCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-[18px] py-3.5">
        <h2 className="flex items-center gap-1.5 text-[13.5px] font-extrabold tracking-[-0.14px] text-ink">
          <ClaimIcon className="size-3.5 text-primary" />
          Customer&rsquo;s Claim
        </h2>
        <p className="min-w-0 break-words text-xs font-semibold text-gray-500">
          {returnRequest.customerName} &middot; {returnRequest.customerEmail}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 px-[18px] py-4">
        <p className="text-xs font-bold uppercase tracking-[0.72px] text-gray-500">Return Reason</p>
        <p className="break-words text-sm font-semibold text-ink">{returnRequest.claimDescription}</p>

        <p className="pt-2 text-xs font-bold uppercase tracking-[0.72px] text-gray-500">
          Customer Photos ({returnRequest.customerPhotos.length})
        </p>
        <div className="grid grid-cols-2 gap-2 pb-2.5 pt-0.5 sm:grid-cols-4">
          {returnRequest.customerPhotos.map((photo, index) => (
            <div key={photo} className="relative aspect-square min-w-0 overflow-hidden rounded-lg border border-border bg-surface-tint">
              <Image
                src={photo}
                alt={`${returnRequest.productName} — customer evidence photo ${index + 1}`}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-tint px-[17px] py-[13px]">
          <p className="min-w-0 text-[13px] font-semibold text-gray-500">Requested Refund Amount</p>
          <p className="shrink-0 text-[22px] font-extrabold tracking-[-0.66px] text-ink">
            &#8377;{returnRequest.amount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </Card>
  );
}
