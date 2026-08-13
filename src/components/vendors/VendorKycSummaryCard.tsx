"use client";

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
import type { KycDocument, KycDocumentStatus } from "@/lib/mock-data/vendors";

const DOC_ICON: Record<string, (props: { className?: string }) => JSX.Element> = {
  "GST Certificate": CertificateIcon,
  "PAN Card": IdCardIcon,
  "Cancelled Cheque": ReceiptCardIcon,
  "Address Proof": LocationIcon,
  // Physical Store vendors require two additional documents (see `vendors.ts`'s `kycDocuments`).
  "Store Photos": CameraIcon,
  "Physical Address Proof": LocationIcon,
};

const STATUS_STYLE: Record<KycDocumentStatus, { pill: string; text: string; Icon: (props: { className?: string }) => JSX.Element }> = {
  Verified: { pill: "bg-success-light", text: "text-success", Icon: CheckSmallIcon },
  Pending: { pill: "bg-warning-light", text: "text-warning", Icon: ClockIcon },
  Rejected: { pill: "bg-primary-soft", text: "text-primary", Icon: RejectIcon },
};

interface VendorKycSummaryCardProps {
  kycDocuments: KycDocument[];
  onViewAll: () => void;
}

/** "KYC SUMMARY": compact status list of the vendor's uploaded documents, with a shortcut into the KYC Documents tab. */
export function VendorKycSummaryCard({ kycDocuments, onViewAll }: VendorKycSummaryCardProps) {
  return (
    <Card className="flex w-full flex-col gap-3.5 p-[19px]">
      <h2 className="border-b border-border pb-3 text-sm font-extrabold text-ink">KYC Summary</h2>

      <div className="flex flex-col">
        {kycDocuments.map((doc: KycDocument) => {
          const DocIcon = DOC_ICON[doc.name] ?? CertificateIcon;
          const { pill, text, Icon: StatusIcon } = STATUS_STYLE[doc.status];
          return (
            <div key={doc.name} className="flex items-center justify-between border-b border-surface-tint py-2 last:border-b-0">
              <div className="flex items-center gap-2">
                <DocIcon className="size-3.5 text-ink" />
                <span className="text-[13px] font-semibold text-ink">{doc.name}</span>
              </div>
              <span className={`flex items-center gap-1 rounded-full px-2 py-[3px] text-[11.5px] font-bold ${pill} ${text}`}>
                <StatusIcon className="size-2.5" />
                {doc.status}
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onViewAll}
        className="min-h-[36px] w-full rounded-lg border border-border bg-surface-tint text-[13px] font-bold text-primary hover:bg-primary-lighter"
      >
        View All KYC Documents
      </button>
    </Card>
  );
}
