"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import {
  CameraIcon,
  CertificateIcon,
  CheckSmallIcon,
  ClockIcon,
  IdCardIcon,
  ReceiptCardIcon,
  RejectIcon,
} from "@/components/icons/VendorDetailIcons";
import { LocationIcon } from "@/components/icons/VendorIcons";
import { VendorKycDocumentViewer } from "@/components/vendors/VendorKycDocumentViewer";
import type { KycDocument, KycDocumentStatus, Vendor } from "@/lib/mock-data/vendors";

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
  // Physical Store vendors require two additional documents (see `vendors.ts`'s `kycDocuments`).
  "Store Photos": CameraIcon,
  "Physical Address Proof": LocationIcon,
};

const DOC_STATUS_STYLE: Record<KycDocumentStatus, { pill: string; text: string; Icon: (props: { className?: string }) => JSX.Element }> = {
  Verified: { pill: "bg-success-light", text: "text-success", Icon: CheckSmallIcon },
  Pending: { pill: "bg-warning-light", text: "text-warning", Icon: ClockIcon },
  Rejected: { pill: "bg-primary-soft", text: "text-primary", Icon: RejectIcon },
};

interface VendorOverviewTabsProps {
  vendor: Vendor;
  activeTab: VendorDetailTab;
  onTabChange: (tab: VendorDetailTab) => void;
  kycDocuments: KycDocument[];
  onDocumentStatusChange: (documentName: string, status: KycDocumentStatus) => void;
}

/** "TABS CARD": Overview / KYC Documents / Performance switcher for the vendor's business detail. */
export function VendorOverviewTabs({
  vendor,
  activeTab,
  onTabChange,
  kycDocuments,
  onDocumentStatusChange,
}: VendorOverviewTabsProps) {
  const [selectedDocumentName, setSelectedDocumentName] = useState(kycDocuments[0]?.name);
  const selectedDocument = kycDocuments.find((doc) => doc.name === selectedDocumentName) ?? kycDocuments[0];
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
            {/* Physical Store vendors get a full "Store Location" card (map + address +
                directions/landmarks) further down the Overview tab instead of this plain field —
                see `VendorStoreLocationCard`, rendered by `VendorDetailView`. */}
            {vendor.type !== "Physical Store" && (
              <ReadOnlyField label="Pickup / Warehouse Address" value={vendor.pickupAddress} />
            )}
            <ReadOnlyField label="Business Description" value={vendor.businessDescription} />
          </>
        )}

        {activeTab === "documents" && selectedDocument && (
          <div className="flex flex-col items-start gap-5 lg:flex-row">
            <div className="flex w-full min-w-0 flex-col gap-3 lg:w-[300px] lg:shrink-0">
              <h3 className="text-[13px] font-bold uppercase tracking-[0.78px] text-ink">KYC Documents</h3>
              {kycDocuments.map((doc) => {
                const Icon = DOC_ICON[doc.name] ?? CertificateIcon;
                const { pill, text, Icon: StatusIcon } = DOC_STATUS_STYLE[doc.status];
                const isSelected = doc.name === selectedDocument.name;
                return (
                  <button
                    key={doc.name}
                    type="button"
                    onClick={() => setSelectedDocumentName(doc.name)}
                    className={`flex w-full flex-col gap-2.5 rounded-lg border p-[15px] text-left transition-colors ${
                      isSelected ? "border-primary bg-primary-lighter ring-1 ring-inset ring-primary" : "border-border bg-surface-tint hover:bg-primary-lighter/40"
                    }`}
                  >
                    <div className="flex min-w-0 items-start gap-2.5">
                      <span className="flex size-[34px] shrink-0 items-center justify-center rounded-lg bg-primary-lighter">
                        <Icon className="size-[18px] text-primary" />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="truncate text-[13px] font-bold text-ink">{doc.name}</span>
                        <span className="truncate text-[11.5px] font-medium text-gray-500">
                          Uploaded on {doc.uploadedOn ?? vendor.registeredDate}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className={`flex items-center gap-1 rounded-full px-2 py-[3px] text-[11.5px] font-bold ${pill} ${text}`}>
                        <StatusIcon className="size-2.5" />
                        {doc.status}
                      </span>
                      <span className="shrink-0 text-xs font-bold text-primary">{isSelected ? "Viewing" : "View Document"}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="min-w-0 flex-1">
              <VendorKycDocumentViewer
                key={selectedDocument.name}
                vendor={vendor}
                doc={selectedDocument}
                onStatusChange={(status) => onDocumentStatusChange(selectedDocument.name, status)}
              />
            </div>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <PerformanceStat label="Fulfillment Rate" value={vendor.performance.fulfillmentRate} />
            <PerformanceStat label="Return Rate" value={vendor.performance.returnRate} />
            <PerformanceStat label="Avg Rating" value={vendor.performance.avgRating} />
            <PerformanceStat label="Total Orders" value={vendor.performance.totalOrders} />
            {/* Pickup fulfillment / walk-in count only apply to Physical Store vendors — see
                `VendorPerformanceMetrics` in `vendors.ts`. */}
            {vendor.performance.pickupFulfillmentRate && (
              <PerformanceStat label="Pickup Fulfillment Rate" value={vendor.performance.pickupFulfillmentRate} />
            )}
            {vendor.performance.walkInCount && (
              <PerformanceStat label="Walk-in Count" value={vendor.performance.walkInCount} />
            )}
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
