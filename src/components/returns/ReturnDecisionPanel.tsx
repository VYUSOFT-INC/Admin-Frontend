"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LockIcon } from "@/components/icons/ProductIcons";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { RejectIcon } from "@/components/icons/VendorDetailIcons";
import { CheckCircleIcon, PartialRefundIcon, RefundExchangeIcon } from "@/components/icons/ReturnDetailIcons";
import { STATUS_BADGE_VARIANT } from "@/components/returns/ReturnsTable";
import { STATUS_TABS, type ReturnDecisionType, type ReturnRequest, type ReturnStatus } from "@/lib/mock-data/returns";

interface ReturnDecisionPanelProps {
  returnRequest: ReturnRequest;
  status: ReturnStatus;
  onDecide: (decision: ReturnDecisionType, refundAmount: number) => void;
}

/**
 * "Refund Decision" card: the three admin actions (Approve Full / Approve Partial / Reject)
 * plus an always-available internal Admin Notes box, matching the `OrderActionPanel` precedent
 * (locally optimistic status change, note is session-only). Once the return has already been
 * decided (Approved/Rejected) the three actions disable — there's nothing left to decide;
 * an already-Escalated or still-Pending return can still be acted on.
 */
export function ReturnDecisionPanel({ returnRequest, status, onDecide }: ReturnDecisionPanelProps) {
  const [partialOpen, setPartialOpen] = useState(false);
  const [partialAmount, setPartialAmount] = useState(String(Math.round(returnRequest.amount / 2)));
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const isDecided = status === "Approved" || status === "Rejected";

  function handleFullApprove() {
    setPartialOpen(false);
    onDecide("approve-full", returnRequest.amount);
  }

  function handleReject() {
    setPartialOpen(false);
    onDecide("reject", 0);
  }

  function handlePartialConfirm() {
    const amount = Math.max(0, Math.min(returnRequest.amount, Number(partialAmount) || 0));
    onDecide("approve-partial", amount);
    setPartialOpen(false);
  }

  return (
    <Card className="flex w-full flex-col gap-3.5 p-[21px]">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-sm font-extrabold text-ink">
          <RefundExchangeIcon className="size-3.5 text-gray-500" />
          Refund Decision
        </h2>
        <Badge variant={STATUS_BADGE_VARIANT[status]}>{STATUS_TABS.find((tab) => tab.value === status)?.label ?? status}</Badge>
      </div>

      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          disabled={isDecided}
          onClick={handleFullApprove}
          className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-success bg-success px-3 text-[13.5px] font-bold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircleIcon className="size-4" />
          Approve Full Refund &mdash; &#8377;{returnRequest.amount.toLocaleString("en-IN")}
        </button>

        <button
          type="button"
          disabled={isDecided}
          onClick={() => setPartialOpen((open) => !open)}
          className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-border bg-white px-3 text-[13.5px] font-bold text-ink hover:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-50"
        >
          <PartialRefundIcon className="size-3.5" />
          Approve Partial Refund
        </button>

        {partialOpen && !isDecided && (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-tint px-3 py-2.5">
            <span className="shrink-0 text-[13px] font-bold text-gray-500">&#8377;</span>
            <input
              type="number"
              min={0}
              max={returnRequest.amount}
              value={partialAmount}
              onChange={(event) => setPartialAmount(event.target.value)}
              className="w-full min-w-0 bg-transparent text-[13px] font-bold text-ink focus:outline-none"
              aria-label="Partial refund amount"
            />
            <button
              type="button"
              onClick={handlePartialConfirm}
              className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-white hover:opacity-90"
            >
              Confirm
            </button>
          </div>
        )}

        <button
          type="button"
          disabled={isDecided}
          onClick={handleReject}
          className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg border border-primary bg-white px-3 text-[13.5px] font-bold text-primary hover:bg-primary-lighter disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RejectIcon className="size-3.5" />
          Reject Refund
        </button>
      </div>

      {status !== returnRequest.status && (
        <p className="text-[11px] font-medium text-gray-500">Decision updated locally for this session &mdash; not saved to a backend.</p>
      )}

      <div className="flex flex-col gap-2 border-t border-surface-tint pt-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.55px] text-gray-400">Admin Notes</p>
        <textarea
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
            setIsSaved(false);
          }}
          placeholder="Add internal notes about this return decision..."
          rows={3}
          className="min-h-[80px] w-full resize-none rounded-lg border border-border bg-surface-tint px-3.5 py-2.5 text-[13px] font-medium text-ink placeholder:text-gray-400 focus:outline-none"
        />
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
            <LockIcon className="size-3" />
            Internal only &mdash; not visible to vendor
          </p>
          <button
            type="button"
            disabled={note.trim().length === 0 || isSaved}
            onClick={() => setIsSaved(true)}
            className="flex min-h-[32px] shrink-0 items-center gap-1.5 rounded-md bg-primary px-3.5 text-[12.5px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SaveIcon className="size-3" />
            {isSaved ? "Saved" : "Save Note"}
          </button>
        </div>
      </div>
    </Card>
  );
}
