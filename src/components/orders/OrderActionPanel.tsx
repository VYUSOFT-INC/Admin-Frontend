"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { LockIcon } from "@/components/icons/ProductIcons";
import { RejectIcon, SaveIcon } from "@/components/icons/VendorDetailIcons";
import { EscalateIcon, FlagIcon } from "@/components/icons/OrderIcons";
import { TERMINAL_STATUSES, type Order, type OrderStatus } from "@/lib/mock-data/orders";

interface OrderActionPanelProps {
  order: Order;
  status: OrderStatus;
  onStatusChange: (status: OrderStatus) => void;
}

/**
 * "Admin Actions" card: Flag/Force Cancel/Escalate moderation actions plus an always-available
 * internal Admin Notes box. Flag and Force Cancel mutate the (locally optimistic) order status —
 * disabled once the order has already reached a terminal state (see `TERMINAL_STATUSES`), since
 * there's nothing left to flag or cancel on a finished order. Escalate has no dedicated
 * `OrderStatus` value, so it's tracked as its own local flag instead of a status transition.
 */
export function OrderActionPanel({ order, status, onStatusChange }: OrderActionPanelProps) {
  const [isEscalated, setIsEscalated] = useState(false);
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const isTerminal = TERMINAL_STATUSES.includes(status);

  return (
    <Card className="flex w-full flex-col gap-3.5 p-[21px]">
      <h2 className="text-sm font-extrabold text-ink">Admin Actions</h2>

      <div className="grid grid-cols-3 gap-2.5">
        <button
          type="button"
          disabled={isTerminal || status === "Flagged"}
          onClick={() => onStatusChange("Flagged")}
          className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg border border-warning bg-white px-2 text-[13px] font-bold text-warning hover:bg-warning-light disabled:cursor-not-allowed disabled:opacity-40"
        >
          <FlagIcon className="size-3.5" />
          Flag Order
        </button>
        <button
          type="button"
          disabled={isTerminal}
          onClick={() => onStatusChange("Cancelled")}
          className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg border border-[#ef4444] bg-white px-2 text-[13px] font-bold text-[#991b1b] hover:bg-primary-lighter disabled:cursor-not-allowed disabled:opacity-40"
        >
          <RejectIcon className="size-3.5" />
          Force Cancel
        </button>
        <button
          type="button"
          disabled={isEscalated}
          onClick={() => setIsEscalated(true)}
          className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg border border-[#3b82f6] bg-white px-2 text-[13px] font-bold text-[#1d4ed8] hover:bg-[#eff6ff] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <EscalateIcon className="size-3.5" />
          {isEscalated ? "Escalated" : "Escalate"}
        </button>
      </div>

      {isEscalated && (
        <p className="rounded-md bg-surface-tint px-3.5 py-2.5 text-[12.5px] font-medium text-gray-500">
          Escalated to senior support for this session &mdash; not saved to a backend.
        </p>
      )}
      {status !== order.status && (
        <p className="text-[11px] font-medium text-gray-500">
          Status updated locally for this session &mdash; not saved to a backend.
        </p>
      )}

      <div className="flex flex-col gap-2 border-t border-surface-tint pt-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.55px] text-gray-400">Admin Notes</p>
        <textarea
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
            setIsSaved(false);
          }}
          placeholder="Add internal note about this order..."
          rows={3}
          className="min-h-[80px] w-full resize-none rounded-lg border border-border bg-surface-tint px-3.5 py-2.5 text-[13px] font-medium text-ink placeholder:text-gray-400 focus:outline-none"
        />
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-gray-400">
            <LockIcon className="size-3" />
            Internal only &mdash; not visible to vendor or customer
          </p>
          <button
            type="button"
            disabled={note.trim().length === 0 || isSaved}
            onClick={() => setIsSaved(true)}
            className="flex min-h-[30.5px] shrink-0 items-center gap-1.5 rounded-md border border-border bg-white px-[15px] py-px text-[12.5px] font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SaveIcon className="size-3" />
            {isSaved ? "Saved" : "Save Note"}
          </button>
        </div>
      </div>
    </Card>
  );
}
