import { Card } from "@/components/ui/Card";
import { ShieldCheckIcon } from "@/components/icons/ResellerDetailIcons";

/** "Fraud Flags" card on the Overview tab (Figma node 1177:908). The design's mock reseller shows
 *  a clean record, so every reseller renders the same "No flags detected" state here — there is no
 *  design reference for what a flagged state would show, and inventing one risks contradicting a
 *  future "Reseller Program" screen that might own that state. */
export function ResellerDetailFraudFlagsCard() {
  return (
    <Card className="flex flex-col gap-4 p-[19px]">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-extrabold tracking-[-0.54px] text-ink">Fraud Flags</h2>
        <p className="text-[13px] font-medium text-gray-500">
          Automated risk monitoring for link abuse, duplicate traffic, and payout anomalies
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ShieldCheckIcon className="size-[18px] shrink-0 text-success" />
        <p className="text-sm font-bold text-success">No flags detected</p>
      </div>
    </Card>
  );
}
