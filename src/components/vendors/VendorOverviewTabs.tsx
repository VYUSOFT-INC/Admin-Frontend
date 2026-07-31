"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CertificateIcon, IdCardIcon, ReceiptCardIcon } from "@/components/icons/VendorDetailIcons";
import { LocationIcon } from "@/components/icons/VendorIcons";
import type { KycDocumentStatus, SellerTier, Vendor } from "@/lib/mock-data/vendors";

export type VendorDetailTab = "overview" | "documents" | "performance";

const TABS: Array<{ value: VendorDetailTab; label: string }> = [
  { value: "overview", label: "Overview" },
  { value: "documents", label: "KYC Documents" },
  { value: "performance", label: "Performance" },
];

const DOC_ICON: Record<string, (props: { className?: string }) => JSX.Element> = {
  "GST Certificate": CertificateIcon,
  "PAN Card": IdCardIcon,
  "Cancelled Cheque": ReceiptCardIcon,
  "Address Proof": LocationIcon,
};

const DOC_STATUS_BADGE: Record<KycDocumentStatus, "success" | "warning" | "danger"> = {
  Verified: "success",
  Pending: "warning",
  Rejected: "danger",
};

interface VendorOverviewTabsProps {
  vendor: Vendor;
  sellerTier: SellerTier;
  activeTab: VendorDetailTab;
  onTabChange: (tab: VendorDetailTab) => void;
}

/** "TABS CARD": Overview / KYC Documents / Performance switcher for the vendor's business detail. */
export function VendorOverviewTabs({ vendor, sellerTier, activeTab, onTabChange }: VendorOverviewTabsProps) {
  return (
    <Card className="w-full overflow-hidden">
      <div className="flex border-b border-border px-5">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={`border-b-2 px-[18px] py-[10px] text-[13.5px] font-semibold transition-colors ${
              activeTab === tab.value ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 px-5 py-6">
        {activeTab === "overview" && (
          <>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.78px] text-ink">Business Information</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <ReadOnlyField label="GST Number" value={vendor.gstNumber} />
              <ReadOnlyField label="PAN Number" value={vendor.panNumber} />
              <ReadOnlyField label="Bank Account" value={vendor.bankAccountMasked} />
              <ReadOnlyField label="IFSC Code" value={vendor.ifscCode} />
            </div>
            <ReadOnlyField label="Pickup / Warehouse Address" value={vendor.pickupAddress} />
            <ReadOnlyField label="Business Description" value={vendor.businessDescription} />
          </>
        )}

        {activeTab === "documents" && (
          <div className="flex flex-col">
            {vendor.kycDocuments.map((doc) => {
              const Icon = DOC_ICON[doc.name] ?? CertificateIcon;
              return (
                <div key={doc.name} className="flex items-center justify-between border-b border-surface-tint py-3 last:border-b-0">
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4 text-gray-500" />
                    <span className="text-[13.5px] font-semibold text-ink">{doc.name}</span>
                  </div>
                  <Badge variant={DOC_STATUS_BADGE[doc.status]}>{doc.status}</Badge>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "performance" && (
          <div className="grid grid-cols-3 gap-4">
            <PerformanceStat label="Products Listed" value={String(vendor.productsListed)} />
            <PerformanceStat label="Seller Tier" value={sellerTier} />
            <PerformanceStat label="Registered" value={vendor.registeredDate} />
          </div>
        )}
      </div>
    </Card>
  );
}

function ReadOnlyField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.44px] text-gray-500">{label}</p>
      <div className="min-w-0 break-words rounded-md border border-border bg-surface-tint px-3.5 py-2 text-[13.5px] font-semibold text-ink">
        {value}
      </div>
    </div>
  );
}

function PerformanceStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface-tint px-3.5 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.44px] text-gray-500">{label}</p>
      <p className="mt-1 text-base font-extrabold text-ink">{value}</p>
    </div>
  );
}
