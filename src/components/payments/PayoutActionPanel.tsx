"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { LockIcon } from "@/components/icons/ProductIcons";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { FlagIcon } from "@/components/icons/OrderIcons";
import { PauseCircleIcon, SendIcon } from "@/components/icons/PaymentIcons";
import type { Payout, PayoutStatus } from "@/lib/mock-data/payments";

interface PayoutActionPanelProps {
  payout: Payout;
  status: PayoutStatus;
  onStatusChange: (status: PayoutStatus) => void;
}

/**
 * "Payout Actions" card: Release/Hold status-changing actions plus a "Flag for Review" action
 * (tracked as its own local flag rather than a `PayoutStatus` — mirrors how `OrderActionPanel`
 * tracks "Escalate" separately from `order.status`) and an always-available internal Admin
 * Notes box. Release is disabled once already Processed (nothing left to release); Hold is
 * disabled once already Processed or already On Hold.
 */
export function PayoutActionPanel({ payout, status, onStatusChange }: PayoutActionPanelProps) {
  const [isFlagged, setIsFlagged] = useState(false);
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const isReleased = status === "Processed";
  const releaseDisabled = isReleased;
  const holdDisabled = isReleased || status === "On Hold";

  return (
    <Card className="flex w-full flex-col gap-3 p-[19px]">
      <h2 className="text-[13px] font-extrabold tracking-[-0.26px] text-ink">Payout Actions</h2>

      <button
        type="button"
        disabled={releaseDisabled}
        onClick={() => onStatusChange("Processed")}
        className="flex min-h-[42px] items-center justify-center gap-2 rounded-[10px] border border-success bg-success px-3 text-sm font-extrabold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <SendIcon className="size-4" />
        {isReleased ? "Payout Released" : `Release Payout · ₹${payout.finalNetPayout.toLocaleString("en-IN")}`}
      </button>

      <button
        type="button"
        disabled={holdDisabled}
        onClick={() => onStatusChange("On Hold")}
        className="flex min-h-[38px] items-center justify-center gap-2 rounded-[10px] border border-warning bg-white px-3 text-[13px] font-bold text-warning hover:bg-warning-light disabled:cursor-not-allowed disabled:opacity-40"
      >
        <PauseCircleIcon className="size-[15px]" />
        Hold Payout
      </button>

      <button
        type="button"
        disabled={isFlagged}
        onClick={() => setIsFlagged(true)}
        className="flex min-h-[38px] items-center justify-center gap-2 rounded-[10px] border border-border bg-white px-3 text-[13px] font-bold text-gray-500 hover:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FlagIcon className="size-[15px]" />
        {isFlagged ? "Flagged for Review" : "Flag for Review"}
      </button>

      {isFlagged && (
        <p className="rounded-md bg-surface-tint px-3.5 py-2.5 text-[12.5px] font-medium text-gray-500">
          Flagged for senior review this session &mdash; not saved to a backend.
        </p>
      )}
      {status !== payout.status && (
        <p className="text-[11px] font-medium text-gray-500">Status updated locally for this session &mdash; not saved to a backend.</p>
      )}

      <div className="flex items-center justify-between gap-2 border-t border-surface-tint pt-3">
        <p className="text-xs font-bold text-ink">Admin Notes</p>
        <button
          type="button"
          disabled={note.trim().length === 0 || isSaved}
          onClick={() => setIsSaved(true)}
          className="flex min-h-[30px] shrink-0 items-center gap-1.5 rounded-lg border border-border bg-primary-lighter px-[15px] text-xs font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SaveIcon className="size-3" />
          {isSaved ? "Saved" : "Save Note"}
        </button>
      </div>
      <textarea
        value={note}
        onChange={(event) => {
          setNote(event.target.value);
          setIsSaved(false);
        }}
        placeholder="Add internal notes about this payout..."
        rows={3}
        className="min-h-[80px] w-full resize-none rounded-[10px] border border-border bg-surface-tint px-[13px] py-2.5 text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
      />
      <p className="flex items-center gap-1.5 text-[11px] font-medium italic text-gray-500">
        <LockIcon className="size-3" />
        Internal only &mdash; not visible to vendor
      </p>
    </Card>
  );
}
