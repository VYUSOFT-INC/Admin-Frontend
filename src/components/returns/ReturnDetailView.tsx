"use client";

import { useState } from "react";
import { ReturnClaimCard } from "@/components/returns/ReturnClaimCard";
import { ReturnDecisionPanel } from "@/components/returns/ReturnDecisionPanel";
import { ReturnDetailHeader } from "@/components/returns/ReturnDetailHeader";
import { ReturnOrderContextCard } from "@/components/returns/ReturnOrderContextCard";
import { ReturnTimelineCard } from "@/components/returns/ReturnTimelineCard";
import { ReturnVendorResponseCard } from "@/components/returns/ReturnVendorResponseCard";
import type { ReturnDecisionType, ReturnRequest, ReturnStatus, ReturnTimelineStep } from "@/lib/mock-data/returns";

interface ReturnDetailViewProps {
  returnRequest: ReturnRequest;
}

/**
 * Client-side shell for the Return Review screen. Owns the (locally optimistic) return status
 * so the header badge, decision panel, and timeline stay in sync.
 *
 * There is no backend, so — matching the precedent set by `OrderDetailView` — a decision also
 * mutates `returnRequest.status` (and appends a matching timeline step) on the exact
 * `ReturnRequest` object this page was given in place (it's the same object reference held
 * inside the shared `RETURNS` array from `lib/mock-data/returns`, not a copy). That keeps this
 * screen consistent with the Returns and Refunds list: navigating back via the header's `Link`
 * remounts `/returns`, which re-reads `RETURNS` and picks up the change.
 *
 * The parent page renders this with `key={returnRequest.id}`, so React remounts it (resetting
 * local state) when navigating from one return's detail screen directly to another's.
 */
export function ReturnDetailView({ returnRequest }: ReturnDetailViewProps) {
  const [status, setStatus] = useState<ReturnStatus>(returnRequest.status);
  const [timeline, setTimeline] = useState<ReturnTimelineStep[]>(returnRequest.timeline);

  function handleDecide(decision: ReturnDecisionType, refundAmount: number) {
    const nextStatus: ReturnStatus = decision === "reject" ? "Rejected" : "Approved";
    const decisionStep: ReturnTimelineStep =
      decision === "reject"
        ? { label: "Refund Rejected", timestamp: "Return closed — no refund issued (this session)", state: "cancelled" }
        : {
            label: "Refund Processed",
            timestamp:
              decision === "approve-full"
                ? "Full refund approved (this session)"
                : `Partial refund of ₹${refundAmount.toLocaleString("en-IN")} approved (this session)`,
            state: "done",
          };

    // Replace the last two "in progress" steps (the active admin-review step and the
    // still-upcoming outcome step) with a finalized admin-review step plus the outcome above,
    // so re-deciding an Escalated or Pending return produces a clean, non-duplicated history.
    const decidedTimeline: ReturnTimelineStep[] = [
      ...timeline.slice(0, -2).map((step) => ({ ...step, state: "done" as const })),
      { ...timeline[timeline.length - 2], state: "done" as const, timestamp: "Reviewed by admin (this session)" },
      decisionStep,
    ];

    returnRequest.status = nextStatus;
    returnRequest.timeline = decidedTimeline;
    setStatus(nextStatus);
    setTimeline(decidedTimeline);
  }

  return (
    <div className="flex flex-col gap-4">
      <ReturnDetailHeader returnRequest={returnRequest} status={status} />

      <div className="flex flex-col items-start gap-3.5 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          <ReturnClaimCard returnRequest={returnRequest} />
          <ReturnVendorResponseCard returnRequest={returnRequest} />
          <ReturnOrderContextCard returnRequest={returnRequest} />
        </div>
        <div className="flex w-full flex-col gap-3.5 lg:w-[340px] lg:shrink-0">
          <ReturnDecisionPanel returnRequest={returnRequest} status={status} onDecide={handleDecide} />
          <ReturnTimelineCard returnRequest={{ ...returnRequest, timeline }} />
        </div>
      </div>
    </div>
  );
}
