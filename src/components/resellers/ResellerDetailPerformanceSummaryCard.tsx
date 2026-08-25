import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TIER_BADGE_VARIANT } from "@/components/resellers/ResellersTable";
import { NEXT_TIER_THRESHOLD } from "@/lib/mock-data/resellers";
import type { ResellerDetailData, ResellerTier } from "@/lib/mock-data/resellers";

interface ResellerDetailPerformanceSummaryCardProps {
  tier: ResellerTier;
  detail: ResellerDetailData;
}

function parseLakh(value: string): number {
  const match = value.match(/([\d.]+)/);
  return match ? Number(match[1]) : 0;
}

/** "Performance Summary" sidebar card: current tier badge and a progress bar toward next month's
 *  tier threshold (Figma node 1177:1163). The threshold is looked up from the live `tier` prop
 *  (via `NEXT_TIER_THRESHOLD`) rather than read off `detail.nextTierThreshold` directly, so that
 *  using the header's "Update Tier" control updates this card's threshold/progress too instead of
 *  leaving them stuck on the reseller's original tier. */
export function ResellerDetailPerformanceSummaryCard({ tier, detail }: ResellerDetailPerformanceSummaryCardProps) {
  const nextTierThreshold = NEXT_TIER_THRESHOLD[tier];
  const monthly = parseLakh(detail.monthlyPerformance);
  const threshold = parseLakh(nextTierThreshold);
  const progress = threshold > 0 ? Math.min(100, Math.round((monthly / threshold) * 100)) : 100;

  return (
    <Card className="flex w-full flex-col gap-4 p-[19px]">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-extrabold tracking-[-0.54px] text-ink">Performance Summary</h2>
        <p className="text-[13px] font-medium text-gray-500">Current monthly tier progress against next threshold</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-gray-500">Current tier</p>
        <Badge variant={TIER_BADGE_VARIANT[tier]}>{tier}</Badge>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#ffeef1]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-[#ec7215]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[13px] text-gray-500">
        <p>
          This month: <span className="font-bold text-ink">{detail.monthlyPerformance}</span>
        </p>
        <p>
          Next tier at: <span className="font-bold text-ink">{nextTierThreshold}</span>
        </p>
      </div>

      <p className="text-xs font-medium text-gray-500">Tier resets monthly based on previous month&apos;s performance</p>
    </Card>
  );
}
