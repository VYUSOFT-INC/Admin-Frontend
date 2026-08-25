import { Card } from "@/components/ui/Card";
import { VerifiedRosetteIcon } from "@/components/icons/ResellerDetailIcons";
import type { ResellerDetailData } from "@/lib/mock-data/resellers";

interface ResellerDetailPanPayoutCardProps {
  detail: ResellerDetailData;
}

/** "PAN & Payout" sidebar card: masked PAN + verification state, and the settlement bank account
 *  on file (Figma node 1177:1136). */
export function ResellerDetailPanPayoutCard({ detail }: ResellerDetailPanPayoutCardProps) {
  return (
    <Card className="flex w-full flex-col gap-4 p-[19px]">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-extrabold tracking-[-0.54px] text-ink">PAN &amp; Payout</h2>
        <p className="text-[13px] font-medium text-gray-500">Identity verification and payout destination details</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xs font-bold text-gray-500">PAN Number</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-bold text-ink">{detail.panNumberMasked}</p>
          {detail.panVerified ? (
            <span className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-success">
              <VerifiedRosetteIcon className="size-[18px]" />
              Verified
            </span>
          ) : (
            <span className="shrink-0 text-sm font-bold text-warning">Pending</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs font-bold text-gray-500">Payout Method</p>
        <p className="min-w-0 break-words text-sm font-bold text-ink">{detail.payoutMethod}</p>
        <p className="text-xs font-medium text-gray-500">{detail.payoutNote}</p>
      </div>
    </Card>
  );
}
