"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { RejectIcon, SaveIcon } from "@/components/icons/VendorDetailIcons";
import { LockIcon, ShieldCheckIcon } from "@/components/icons/ProductIcons";
import { STATUS_BADGE_VARIANT } from "@/components/products/ProductsTable";
import type { Product, ProductStatus } from "@/lib/mock-data/products";

const STATUS_LABEL: Record<ProductStatus, string> = {
  Pending: "Pending Review",
  Approved: "Approved",
  Rejected: "Rejected",
  Flagged: "Flagged",
};

interface ProductActionsCardProps {
  product: Product;
  status: ProductStatus;
  onApprove: () => void;
  onReject: () => void;
}

/**
 * "ACTIONS CARD": current-status summary, the Approve/Reject moderation actions (only shown
 * while the product is Pending or Flagged), and an always-available internal Admin Notes box.
 * Figma groups all three into a single card for this screen (unlike Vendor Detail, which
 * splits them across separate cards) — kept that way here to match the reference layout.
 */
export function ProductActionsCard({ product, status, onApprove, onReject }: ProductActionsCardProps) {
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const canModerate = status === "Pending" || status === "Flagged";
  const allChecksPassed = product.qualityChecks.every((check) => check.passed);

  return (
    <Card className="flex w-full flex-col gap-3 p-[18px]">
      <h2 className="border-b border-surface-tint pb-3 text-[13.5px] font-extrabold tracking-[-0.27px] text-ink">Actions</h2>

      <div className="flex flex-col gap-2.5 rounded-lg bg-surface-tint px-3.5 py-2.5">
        <div className="flex items-center justify-between border-b border-white pb-2.5">
          <p className="text-xs font-semibold text-gray-500">Current Status</p>
          <Badge variant={STATUS_BADGE_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500">Vendor Type</p>
          <p className="text-[13px] font-bold text-ink">{product.vendorType}</p>
        </div>
      </div>

      {canModerate && (
        <>
          <button
            type="button"
            onClick={onApprove}
            className="flex min-h-[42px] w-full items-center justify-center gap-1.5 rounded-lg bg-success text-[14px] font-bold text-white hover:opacity-90"
          >
            <ShieldCheckIcon className="size-4" />
            {allChecksPassed ? "Approve Product" : "Approve with Override"}
          </button>
          <button
            type="button"
            onClick={onReject}
            className="flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-lg border border-[#fecdd3] text-[13.5px] font-bold text-primary hover:bg-primary-lighter"
          >
            <RejectIcon className="size-[15px]" />
            Reject Product
          </button>
        </>
      )}

      {!canModerate && (
        <p className="rounded-md bg-surface-tint px-3.5 py-2.5 text-[12.5px] font-medium text-gray-500">
          {status === "Approved"
            ? "This product has already been approved. No further moderation action is available."
            : "This product's submission was rejected. No further moderation action is available."}
        </p>
      )}

      <div className="flex flex-col gap-2 border-t border-surface-tint pt-3">
        <p className="text-xs font-bold text-ink">Admin Notes</p>
        <textarea
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
            setIsSaved(false);
          }}
          placeholder="Add internal notes about this product..."
          rows={3}
          className="min-h-[72px] w-full resize-none rounded-md border border-border bg-surface-tint px-3.5 py-2.5 text-[13px] font-medium text-ink placeholder:text-gray-400 focus:outline-none"
        />
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            disabled={note.trim().length === 0 || isSaved}
            onClick={() => setIsSaved(true)}
            className="flex min-h-[30px] items-center gap-1.5 rounded-md border border-border bg-surface-tint px-3.5 py-1.5 text-xs font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SaveIcon className="size-3" />
            {isSaved ? "Saved" : "Save Note"}
          </button>
          <p className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
            <LockIcon className="size-2.5" />
            Internal only — not visible to vendor
          </p>
        </div>
      </div>
    </Card>
  );
}
