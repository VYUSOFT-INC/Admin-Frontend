import { Card } from "@/components/ui/Card";

interface DisputeStatsCardsProps {
  openCount: number;
  avgResolutionHours: number | null;
  resolvedCount: number;
  escalatedCount: number;
}

/**
 * "Open Disputes / Avg Resolution Time / Escalated to Platform" stat row — matches the Figma
 * "dispute managment" design's three summary cards exactly (plain white cards, no icon badge,
 * unlike `InventoryStatsCards`' gradient tiles). `openCount`/`escalatedCount` are derived from
 * `DISPUTES` at render time, and `avgResolutionHours` from each resolved dispute's
 * `raisedAt`/`resolvedAt` pair, rather than hard-coding the Figma reference's illustrative
 * "26"/"18.4 hrs"/"7" — the same "never hardcode what can be computed" rule `support.ts`
 * documents for its own status-tab counts.
 */
export function DisputeStatsCards({ openCount, avgResolutionHours, resolvedCount, escalatedCount }: DisputeStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="flex min-w-0 flex-col gap-3 p-[19px]">
        <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">Open Disputes</p>
        <p className="break-words text-[28px] font-extrabold tracking-[-1.12px] text-ink">{openCount}</p>
        <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">Open across payments, returns, and orders</p>
      </Card>

      <Card className="flex min-w-0 flex-col gap-3 p-[19px]">
        <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">Avg Resolution Time</p>
        <p className="break-words text-[28px] font-extrabold tracking-[-1.12px] text-ink">
          {avgResolutionHours === null ? "—" : `${avgResolutionHours.toFixed(1)} hrs`}
        </p>
        <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">
          {resolvedCount === 0 ? "No disputes resolved yet this period" : `Based on ${resolvedCount} disputes resolved this period`}
        </p>
      </Card>

      <Card className="flex min-w-0 flex-col gap-3 p-[19px]">
        <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">Escalated to Platform</p>
        <p className="break-words text-[28px] font-extrabold tracking-[-1.12px] text-primary">{escalatedCount}</p>
        <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">
          Requires senior review on high-value or policy-sensitive cases
        </p>
      </Card>
    </div>
  );
}
