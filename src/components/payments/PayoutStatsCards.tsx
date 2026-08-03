"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { CheckCircleIcon, ClockIcon, WarningTriangleIcon } from "@/components/icons/PaymentIcons";
import type { Payout } from "@/lib/mock-data/payments";

interface PayoutStatsCardsProps {
  payouts: Payout[];
}

/**
 * "Total Pending Payouts / Total Processed This Month / Overdue Payouts" stat row — matches
 * the Figma "payments payout" design's three summary cards. Unlike the Figma reference's
 * static copy, every figure here is derived from the actual `payouts` array (via `useMemo`)
 * so it never drifts from what the table below shows, mirroring `StatsGrid`'s real-data intent.
 */
export function PayoutStatsCards({ payouts }: PayoutStatsCardsProps) {
  const stats = useMemo(() => {
    const pending = payouts.filter((payout) => payout.status === "Pending");
    const processed = payouts.filter((payout) => payout.status === "Processed");
    const overdue = payouts.filter((payout) => payout.status === "Overdue");
    return {
      pendingTotal: pending.reduce((sum, payout) => sum + payout.netAmount, 0),
      pendingVendorCount: new Set(pending.map((payout) => payout.vendorName)).size,
      processedTotal: processed.reduce((sum, payout) => sum + payout.netAmount, 0),
      processedCount: processed.length,
      overdueCount: overdue.length,
    };
  }, [payouts]);

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
      <Card className="flex flex-col gap-3 p-[19px]">
        <div className="flex items-center justify-between gap-2">
          <p className="min-w-0 break-words text-[11px] font-bold uppercase tracking-[0.88px] text-gray-500">
            Total Pending Payouts
          </p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-primary-soft">
            <ClockIcon className="size-[18px] text-primary" />
          </span>
        </div>
        <p className="break-words text-[24px] font-extrabold tracking-[-0.72px] text-ink">
          ₹{stats.pendingTotal.toLocaleString("en-IN")}
        </p>
        <p className="break-words text-xs font-medium text-gray-500">
          Across {stats.pendingVendorCount} {stats.pendingVendorCount === 1 ? "vendor" : "vendors"} &middot; queued for release
        </p>
      </Card>

      <Card className="flex flex-col gap-3 p-[19px]">
        <div className="flex items-center justify-between gap-2">
          <p className="min-w-0 break-words text-[11px] font-bold uppercase tracking-[0.88px] text-gray-500">
            Total Processed This Month
          </p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-success-light">
            <CheckCircleIcon className="size-[18px] text-success" />
          </span>
        </div>
        <p className="break-words text-[24px] font-extrabold tracking-[-0.72px] text-ink">
          ₹{stats.processedTotal.toLocaleString("en-IN")}
        </p>
        <p className="break-words text-xs font-medium text-gray-500">
          {stats.processedCount} {stats.processedCount === 1 ? "payout" : "payouts"} released
        </p>
      </Card>

      <Card className="flex flex-col gap-3 p-[19px]">
        <div className="flex items-center justify-between gap-2">
          <p className="min-w-0 break-words text-[11px] font-bold uppercase tracking-[0.88px] text-gray-500">Overdue Payouts</p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-primary-soft">
            <WarningTriangleIcon className="size-[18px] text-primary" />
          </span>
        </div>
        <p className="break-words text-[24px] font-extrabold tracking-[-0.72px] text-primary">{stats.overdueCount}</p>
        <p className="break-words text-xs font-bold text-primary">Requires immediate attention</p>
      </Card>
    </div>
  );
}
