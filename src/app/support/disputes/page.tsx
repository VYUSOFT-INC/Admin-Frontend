"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DisputeFiltersBar } from "@/components/disputes/DisputeFiltersBar";
import { DisputeQueueTable } from "@/components/disputes/DisputeQueueTable";
import { DisputeReviewPanel } from "@/components/disputes/DisputeReviewPanel";
import { DisputeStatsCards } from "@/components/disputes/DisputeStatsCards";
import { DisputeTabs } from "@/components/disputes/DisputeTabs";
import {
  DISPUTES,
  type DisputeDateRangeOption,
  type DisputePriority,
  type DisputeStatus,
  type DisputeType,
} from "@/lib/mock-data/disputes";

/** Number of days each `DisputeDateRangeOption` preset covers — same preset-window convention
 *  `ReturnsPage`'s `DATE_RANGE_DAYS` uses, evaluated against the real current date. */
const DATE_RANGE_DAYS: Record<DisputeDateRangeOption, number> = {
  "Last 7 Days": 7,
  "Last 30 Days": 30,
  "Last 90 Days": 90,
};

export default function DisputeManagementPage() {
  const [disputes, setDisputes] = useState(DISPUTES);
  const [activeType, setActiveType] = useState<DisputeType | "All">("All");
  const [activeStatus, setActiveStatus] = useState<DisputeStatus | "All">("All");
  const [activeDateRange, setActiveDateRange] = useState<DisputeDateRangeOption | "All">("All");
  const [activePriority, setActivePriority] = useState<DisputePriority | "All">("All");
  const [reviewingId, setReviewingId] = useState<string | null>(null);

  const stats = useMemo(() => {
    const openCount = disputes.filter((dispute) => dispute.status === "Open").length;
    const escalatedCount = disputes.filter((dispute) => dispute.status === "Escalated").length;
    const resolved = disputes.filter((dispute) => dispute.status === "Resolved" && dispute.resolvedAt);
    const avgResolutionHours = resolved.length
      ? resolved.reduce((total, dispute) => {
          const hours = (new Date(dispute.resolvedAt as string).getTime() - new Date(dispute.raisedAt).getTime()) / 3_600_000;
          return total + hours;
        }, 0) / resolved.length
      : null;
    return { openCount, escalatedCount, avgResolutionHours, resolvedCount: resolved.length };
  }, [disputes]);

  const filteredDisputes = useMemo(() => {
    const cutoff =
      activeDateRange === "All"
        ? null
        : (() => {
            const date = new Date();
            date.setDate(date.getDate() - DATE_RANGE_DAYS[activeDateRange]);
            return date;
          })();

    return disputes.filter((dispute) => {
      const matchesType = activeType === "All" || dispute.type === activeType;
      const matchesStatus = activeStatus === "All" || dispute.status === activeStatus;
      const matchesPriority = activePriority === "All" || dispute.priority === activePriority;
      const matchesDateRange = cutoff === null || new Date(dispute.raisedAt) >= cutoff;
      return matchesType && matchesStatus && matchesPriority && matchesDateRange;
    });
  }, [disputes, activeType, activeStatus, activePriority, activeDateRange]);

  const reviewingDispute = disputes.find((dispute) => dispute.id === reviewingId) ?? null;

  function updateStatus(id: string, status: DisputeStatus) {
    setDisputes((prev) => prev.map((dispute) => (dispute.id === id ? { ...dispute, status } : dispute)));
  }

  return (
    <AdminLayout
      title="Dispute Management"
      description="Review customer and vendor conflicts across returns, payments, order issues, and policy escalations."
    >
      <div className="flex flex-col gap-4">
        <DisputeTabs />
        <DisputeStatsCards
          openCount={stats.openCount}
          avgResolutionHours={stats.avgResolutionHours}
          resolvedCount={stats.resolvedCount}
          escalatedCount={stats.escalatedCount}
        />
        <div className="flex flex-col gap-4 rounded-xl border border-border bg-white p-[19px]">
          <div>
            <h2 className="text-lg font-extrabold tracking-[-0.54px] text-ink">Dispute Queue</h2>
            <p className="mt-1 max-w-[760px] text-[13px] font-medium text-gray-500">
              Track the latest claims raised between customers and vendors. Select Review to open the split decision workspace for
              evidence, order context, and resolution actions.
            </p>
          </div>
          <DisputeFiltersBar
            activeType={activeType}
            onTypeChange={setActiveType}
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
            activeDateRange={activeDateRange}
            onDateRangeChange={setActiveDateRange}
            activePriority={activePriority}
            onPriorityChange={setActivePriority}
          />
          <DisputeQueueTable disputes={filteredDisputes} onReview={setReviewingId} />
        </div>
      </div>

      <DisputeReviewPanel dispute={reviewingDispute} onClose={() => setReviewingId(null)} onUpdateStatus={updateStatus} />
    </AdminLayout>
  );
}
