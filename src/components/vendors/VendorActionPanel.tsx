"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ApproveIcon, ChevronDownIcon, ReinstateIcon, RejectIcon, SuspendIcon } from "@/components/icons/VendorDetailIcons";
import { STATUS_BADGE_VARIANT, TYPE_BADGE_VARIANT } from "@/components/vendors/VendorsTable";
import type { SellerTier, Vendor, VendorStatus } from "@/lib/mock-data/vendors";

const SELLER_TIERS: SellerTier[] = ["Basic", "Limited", "Verified"];

interface VendorActionPanelProps {
  vendor: Vendor;
  status: VendorStatus;
  onStatusChange: (status: VendorStatus) => void;
  sellerTier: SellerTier;
  onSellerTierChange: (tier: SellerTier) => void;
}

/**
 * "ACTION PANEL": vendor type/tier at a glance plus the status-dependent moderation actions
 * (Approve/Reject for Pending, Suspend for Active, Reinstate for Suspended). Status updates are
 * local-only (optimistic UI) — there is no backend, so a page refresh resets to the mock status.
 */
export function VendorActionPanel({ vendor, status, onStatusChange, sellerTier, onSellerTierChange }: VendorActionPanelProps) {
  return (
    <Card className="flex w-full flex-col gap-3.5 p-[19px]">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-sm font-extrabold text-ink">Action Panel</h2>
        <Badge variant={STATUS_BADGE_VARIANT[status]}>{status}</Badge>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.46px] text-gray-500">Vendor Type</p>
        <Badge variant={TYPE_BADGE_VARIANT[vendor.type]} className="w-fit">
          {vendor.type}
        </Badge>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="seller-tier" className="text-[11.5px] font-semibold uppercase tracking-[0.46px] text-gray-500">
          Seller Tier
        </label>
        <div className="relative">
          <select
            id="seller-tier"
            value={sellerTier}
            onChange={(event) => onSellerTierChange(event.target.value as SellerTier)}
            className="w-full appearance-none rounded-md border border-border bg-surface-tint px-3.5 py-2 text-[13px] font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {SELLER_TIERS.map((tier) => (
              <option key={tier} value={tier}>
                {tier}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-500" />
        </div>
        {sellerTier !== vendor.sellerTier && (
          <p className="text-[11px] font-medium text-gray-500">Changed locally &mdash; not saved to a backend.</p>
        )}
      </div>

      {status === "Pending" && (
        <>
          <button
            type="button"
            onClick={() => onStatusChange("Active")}
            className="flex min-h-[38px] w-full items-center justify-center gap-2 rounded-lg bg-success text-[13.5px] font-bold text-white hover:opacity-90"
          >
            <ApproveIcon className="size-4" />
            Approve Vendor
          </button>
          <button
            type="button"
            onClick={() => onStatusChange("Rejected")}
            className="flex min-h-[38px] w-full items-center justify-center gap-2 rounded-lg border border-primary text-[13.5px] font-bold text-primary hover:bg-primary-lighter"
          >
            <RejectIcon className="size-4" />
            Reject
          </button>
        </>
      )}

      {status === "Active" && (
        <button
          type="button"
          onClick={() => onStatusChange("Suspended")}
          className="flex min-h-[38px] w-full items-center justify-center gap-2 rounded-lg border border-warning text-[13.5px] font-bold text-warning hover:bg-warning-light"
        >
          <SuspendIcon className="size-4" />
          Suspend
        </button>
      )}

      {status === "Suspended" && (
        <button
          type="button"
          onClick={() => onStatusChange("Active")}
          className="flex min-h-[38px] w-full items-center justify-center gap-2 rounded-lg bg-success text-[13.5px] font-bold text-white hover:opacity-90"
        >
          <ReinstateIcon className="size-4" />
          Reinstate
        </button>
      )}

      {status === "Rejected" && (
        <p className="rounded-md bg-surface-tint px-3.5 py-2.5 text-[12.5px] font-medium text-gray-500">
          This vendor&apos;s application was rejected. No further action is available.
        </p>
      )}

      {status !== vendor.status && (
        <p className="text-[11px] font-medium text-gray-500">
          Status updated locally for this session &mdash; not saved to a backend.
        </p>
      )}
    </Card>
  );
}
