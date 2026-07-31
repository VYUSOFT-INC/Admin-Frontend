"use client";

import { useState } from "react";
import { VendorActionPanel } from "@/components/vendors/VendorActionPanel";
import { VendorAdminNotesCard } from "@/components/vendors/VendorAdminNotesCard";
import { VendorDetailHeader } from "@/components/vendors/VendorDetailHeader";
import { VendorKycSummaryCard } from "@/components/vendors/VendorKycSummaryCard";
import { VendorOverviewTabs, type VendorDetailTab } from "@/components/vendors/VendorOverviewTabs";
import { VendorProfileCard } from "@/components/vendors/VendorProfileCard";
import type { SellerTier, Vendor, VendorStatus } from "@/lib/mock-data/vendors";

interface VendorDetailViewProps {
  vendor: Vendor;
}

/**
 * Client-side shell for the Vendor Detail screen. Owns the state shared across sections — the
 * vendor's (locally optimistic) status, seller tier, and the active overview tab — so the header
 * badge, profile card, action panel, and KYC summary's "View All" shortcut all stay in sync.
 *
 * The parent page renders this with `key={vendor.slug}`, so React remounts it (resetting all of
 * this local state) whenever the viewed vendor changes, instead of carrying one vendor's edits
 * over onto the next vendor navigated to.
 */
export function VendorDetailView({ vendor }: VendorDetailViewProps) {
  const [status, setStatus] = useState<VendorStatus>(vendor.status);
  const [sellerTier, setSellerTier] = useState<SellerTier>(vendor.sellerTier);
  const [activeTab, setActiveTab] = useState<VendorDetailTab>("overview");

  return (
    <div className="flex flex-col gap-5">
      <VendorDetailHeader vendor={vendor} status={status} />

      <div className="flex flex-col items-start gap-5 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <VendorProfileCard vendor={vendor} sellerTier={sellerTier} />
          <VendorOverviewTabs vendor={vendor} sellerTier={sellerTier} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-[372px] lg:shrink-0">
          <VendorActionPanel
            vendor={vendor}
            status={status}
            onStatusChange={setStatus}
            sellerTier={sellerTier}
            onSellerTierChange={setSellerTier}
          />
          <VendorAdminNotesCard />
          <VendorKycSummaryCard vendor={vendor} onViewAll={() => setActiveTab("documents")} />
        </div>
      </div>
    </div>
  );
}
