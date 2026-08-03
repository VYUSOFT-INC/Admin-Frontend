"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { PayoutStatsCards } from "@/components/payments/PayoutStatsCards";
import { PayoutStatusTabs } from "@/components/payments/PayoutStatusTabs";
import { PayoutsTable } from "@/components/payments/PayoutsTable";
import { PayoutsPagination } from "@/components/payments/PayoutsPagination";
import { PAYOUTS, STATUS_TABS, type PayoutStatus } from "@/lib/mock-data/payments";

export default function PaymentsPage() {
  const payouts = PAYOUTS;
  const [activeStatus, setActiveStatus] = useState<PayoutStatus | "All">("All");

  const statusCounts = useMemo(() => {
    const counts: Partial<Record<PayoutStatus | "All", number>> = { All: payouts.length };
    for (const payout of payouts) {
      counts[payout.status] = (counts[payout.status] ?? 0) + 1;
    }
    return counts;
  }, [payouts]);

  const filteredPayouts = useMemo(() => {
    return payouts.filter((payout) => activeStatus === "All" || payout.status === activeStatus);
  }, [payouts, activeStatus]);

  return (
    <AdminLayout title="Payments & Payouts" description="Manage vendor settlements and payout releases">
      {/* Figma wraps the stat row + tabs/table/footer in one soft-pink outer card (bg-[#fff3f5]/
          border-[#f2dfe6]) — reusing the existing near-identical surface-page/border tokens here
          rather than inventing new ones. */}
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface-page p-[21px]">
        <PayoutStatsCards payouts={payouts} />
        <Card className="overflow-hidden">
          <PayoutStatusTabs tabs={STATUS_TABS} active={activeStatus} onChange={setActiveStatus} counts={statusCounts} />
          <PayoutsTable payouts={filteredPayouts} />
          <PayoutsPagination shownCount={filteredPayouts.length} totalCount={payouts.length} />
        </Card>
      </div>
    </AdminLayout>
  );
}
