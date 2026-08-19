"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { CloseIcon, EscalateWarningIcon, ResolvedCheckIcon } from "@/components/icons/SupportIcons";
import type { DisputeRecord, DisputeStatus } from "@/lib/mock-data/disputes";
import { PRIORITY_BADGE_VARIANT, STATUS_BADGE_VARIANT, TYPE_BADGE_VARIANT } from "@/components/disputes/DisputeQueueTable";

interface DisputeReviewPanelProps {
  dispute: DisputeRecord | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: DisputeStatus) => void;
}

/**
 * "Split decision workspace" the Dispute Queue's "Review" button opens — hand-authored, since the
 * Figma file (node 1143:3371) only includes the list screen itself and no separate frame for this
 * detail view. Modeled on `TicketDetailPanel`'s header-badges + body + resolution-actions/profile-
 * links layout (the closest existing analog in this codebase) rather than invented from scratch,
 * shown as a centered modal since the queue is a single full-width table, not a split layout.
 */
export function DisputeReviewPanel({ dispute, onClose, onUpdateStatus }: DisputeReviewPanelProps) {
  if (!dispute) return null;

  const isVendorOnly = !dispute.customerName;
  const orderHref = dispute.orderId ? `/orders/${dispute.orderId}` : "/orders";
  const vendorHref = dispute.vendorSlug ? `/vendors/${dispute.vendorSlug}` : "/vendors";
  // `/customers/[id]` isn't built yet (see `Customer.id` in customers.ts) — link to the reserved
  // route once a real customer matches, otherwise fall back to the customer list, the same
  // conditional-fallback pattern `TicketDetailPanel` uses for its own "View Customer Profile" link.
  const customerHref = dispute.customerId ? `/customers/${dispute.customerId}` : "/customers";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4" role="dialog" aria-modal="true" aria-labelledby="dispute-review-title">
      <div className="flex max-h-[85vh] w-full max-w-[560px] flex-col overflow-hidden rounded-xl border border-border bg-white shadow-xl">
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <p id="dispute-review-title" className="text-[15px] font-extrabold tracking-[-0.3px] text-ink">
              {dispute.id}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <Badge variant={TYPE_BADGE_VARIANT[dispute.type]} className="text-[10px]">
                {dispute.type}
              </Badge>
              <Badge variant={STATUS_BADGE_VARIANT[dispute.status]} className="text-[10px]">
                {dispute.status}
              </Badge>
              <Badge variant={PRIORITY_BADGE_VARIANT[dispute.priority]} className="text-[10px]">
                {dispute.priority} Priority
              </Badge>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dispute review"
            className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px] border border-border bg-white text-gray-500 hover:bg-surface-tint"
          >
            <CloseIcon className="size-3.5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          <div>
            <p className="min-w-0 break-words text-sm font-bold text-ink">
              {isVendorOnly ? `Platform vs ${dispute.vendorName}` : `${dispute.customerName} vs ${dispute.vendorName}`}
            </p>
            <p className="mt-1 min-w-0 break-words text-[13px] font-medium text-gray-500">{dispute.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-[10px] border border-border bg-surface-tint p-3.5">
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.4px] text-gray-500">Order Reference</p>
              <p className="mt-1 min-w-0 break-words text-[13px] font-bold text-ink">{dispute.orderNumber}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.4px] text-gray-500">Amount at Stake</p>
              <p className="mt-1 min-w-0 break-words text-[13px] font-bold text-ink">₹{dispute.amount.toLocaleString("en-IN")}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.4px] text-gray-500">Raised</p>
              <p className="mt-1 min-w-0 break-words text-[13px] font-bold text-ink">{dispute.raisedDate}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.4px] text-gray-500">Latest Update</p>
              <p className="mt-1 min-w-0 break-words text-[13px] font-bold text-ink">{dispute.updateNote}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={orderHref} className="text-xs font-semibold text-primary underline hover:opacity-80">
              View Order
            </Link>
            <Link href={vendorHref} className="text-xs font-semibold text-primary underline hover:opacity-80">
              View Vendor Profile
            </Link>
            {!isVendorOnly && (
              <Link href={customerHref} className="text-xs font-semibold text-primary underline hover:opacity-80">
                View Customer Profile
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-border px-5 py-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onUpdateStatus(dispute.id, "In Progress")}
              disabled={dispute.status !== "Open"}
              className="flex h-[34px] items-center gap-1.5 rounded-[10px] border border-border px-3.5 text-xs font-bold text-ink transition-colors hover:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start Review
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(dispute.id, "Resolved")}
              disabled={dispute.status === "Resolved"}
              className="flex h-[34px] items-center gap-1.5 rounded-[10px] border border-success px-3.5 text-xs font-bold text-success transition-colors hover:bg-success-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ResolvedCheckIcon className="size-3" />
              Resolve
            </button>
            <button
              type="button"
              onClick={() => onUpdateStatus(dispute.id, "Escalated")}
              disabled={dispute.status === "Escalated"}
              className="flex h-[34px] items-center gap-1.5 rounded-[10px] border border-primary px-3.5 text-xs font-bold text-primary transition-colors hover:bg-primary-lighter disabled:cursor-not-allowed disabled:opacity-50"
            >
              <EscalateWarningIcon className="size-3" />
              Escalate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
