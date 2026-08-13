"use client";

import { useState } from "react";
import { VendorActionPanel } from "@/components/vendors/VendorActionPanel";
import { VendorAdminNotesCard } from "@/components/vendors/VendorAdminNotesCard";
import { VendorDetailHeader } from "@/components/vendors/VendorDetailHeader";
import { VendorKycSummaryCard } from "@/components/vendors/VendorKycSummaryCard";
import { VendorOverviewTabs, type VendorDetailTab } from "@/components/vendors/VendorOverviewTabs";
import { VendorProfileCard } from "@/components/vendors/VendorProfileCard";
import { VendorStoreHoursCard } from "@/components/vendors/VendorStoreHoursCard";
import { VendorStoreLocationCard } from "@/components/vendors/VendorStoreLocationCard";
import type { KycDocument, KycDocumentStatus, SellerTier, Vendor, VendorStatus } from "@/lib/mock-data/vendors";

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
 *
 * `kycDocuments` is likewise lifted here (rather than read from `vendor.kycDocuments` directly)
 * so that marking a document Verified/Pending from the Document Viewer (inside the KYC Documents
 * tab) updates the same array the KYC Summary card and the tab's document list read from —
 * there is only ever one source of truth for a document's status during the session.
 *
 * Layout differs by tab, matching the Figma design exactly (verified against both the Overview
 * frame, node 1071:1268, and the KYC Documents frame, node 1089:736): Overview/Performance use a
 * persistent right sidebar (Action Panel + Admin Notes + KYC Summary) beside a narrower main
 * column, but the KYC Documents tab needs real width for the Document Viewer's certificate
 * preview — so on that tab the tab card goes full width and Action Panel + KYC Summary drop into
 * an even two-card row below instead of a cramped 372px sidebar (which squeezed the viewer to
 * ~350px). Admin Notes (vendor-level) isn't shown on this tab in the design — the Document Viewer
 * already has its own per-document note field.
 */
export function VendorDetailView({ vendor }: VendorDetailViewProps) {
  const [status, setStatus] = useState<VendorStatus>(vendor.status);
  const [sellerTier, setSellerTier] = useState<SellerTier>(vendor.sellerTier);
  const [activeTab, setActiveTab] = useState<VendorDetailTab>("overview");
  const [kycDocuments, setKycDocuments] = useState<KycDocument[]>(vendor.kycDocuments);

  const handleDocumentStatusChange = (documentName: string, nextStatus: KycDocumentStatus) => {
    setKycDocuments((documents) =>
      documents.map((doc) => (doc.name === documentName ? { ...doc, status: nextStatus } : doc))
    );
  };

  const isDocumentsTab = activeTab === "documents";

  const tabsCard = (
    <VendorOverviewTabs
      vendor={vendor}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      kycDocuments={kycDocuments}
      onDocumentStatusChange={handleDocumentStatusChange}
    />
  );

  // Physical Store vendors get two extra Overview-tab cards — a weekly hours schedule and a
  // store-location/map card — built on top of the `storeHours`/`storeAddress` fields `vendors.ts`
  // only populates for that vendor type (Figma "pickup store", node 1101:2). Online Sellers have
  // no walk-in storefront to schedule or map, so they keep the plain "Pickup / Warehouse Address"
  // field `VendorOverviewTabs` already renders instead.
  const isPhysicalStoreOverview = activeTab === "overview" && vendor.type === "Physical Store" && vendor.storeHours;

  const actionPanel = (
    <VendorActionPanel
      vendor={vendor}
      status={status}
      onStatusChange={setStatus}
      sellerTier={sellerTier}
      onSellerTierChange={setSellerTier}
    />
  );

  const kycSummaryCard = (
    <VendorKycSummaryCard kycDocuments={kycDocuments} onViewAll={() => setActiveTab("documents")} />
  );

  return (
    <div className="flex flex-col gap-5">
      <VendorDetailHeader vendor={vendor} status={status} />
      <VendorProfileCard vendor={vendor} sellerTier={sellerTier} />

      {isDocumentsTab ? (
        <div className="flex flex-col gap-5">
          {tabsCard}
          <div className="flex flex-col items-start gap-5 lg:flex-row">
            <div className="min-w-0 flex-1">{actionPanel}</div>
            <div className="min-w-0 flex-1">{kycSummaryCard}</div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-5 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {tabsCard}
            {isPhysicalStoreOverview && vendor.storeHours && (
              <>
                <VendorStoreHoursCard hours={vendor.storeHours} />
                <VendorStoreLocationCard vendor={vendor} />
              </>
            )}
          </div>

          <div className="flex w-full flex-col gap-4 lg:w-[372px] lg:shrink-0">
            {actionPanel}
            <VendorAdminNotesCard />
            {kycSummaryCard}
          </div>
        </div>
      )}
    </div>
  );
}
