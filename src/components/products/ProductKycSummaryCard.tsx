import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  CertificateIcon,
  CheckSmallIcon,
  ClockIcon,
  IdCardIcon,
  ReceiptCardIcon,
  RejectIcon,
} from "@/components/icons/VendorDetailIcons";
import { LocationIcon } from "@/components/icons/VendorIcons";
import { PRODUCT_VENDOR_INFO, type Product } from "@/lib/mock-data/products";
import type { KycDocument, KycDocumentStatus } from "@/lib/mock-data/vendors";

const DOC_ICON: Record<string, (props: { className?: string }) => JSX.Element> = {
  "GST Certificate": CertificateIcon,
  "PAN Card": IdCardIcon,
  "Cancelled Cheque": ReceiptCardIcon,
  "Address Proof": LocationIcon,
};

const STATUS_STYLE: Record<KycDocumentStatus, { pill: string; text: string; Icon: (props: { className?: string }) => JSX.Element }> = {
  Verified: { pill: "bg-success-light", text: "text-success", Icon: CheckSmallIcon },
  Pending: { pill: "bg-warning-light", text: "text-warning", Icon: ClockIcon },
  Rejected: { pill: "bg-primary-soft", text: "text-primary", Icon: RejectIcon },
};

interface ProductKycSummaryCardProps {
  product: Product;
}

/** "KYC SUMMARY": the product's vendor's document verification status, with a shortcut into the Vendor screens. */
export function ProductKycSummaryCard({ product }: ProductKycSummaryCardProps) {
  const vendorInfo = PRODUCT_VENDOR_INFO[product.vendorName];
  const href = vendorInfo?.vendorSlug ? `/vendors/${vendorInfo.vendorSlug}` : "/vendors";

  if (!vendorInfo) {
    return null;
  }

  return (
    <Card className="w-full overflow-hidden">
      <div className="border-b border-surface-tint px-[18px] py-3.5">
        <h2 className="text-[13.5px] font-extrabold tracking-[-0.27px] text-ink">KYC Summary</h2>
      </div>
      <div className="px-[18px] pt-1.5">
        {vendorInfo.kycDocuments.map((doc: KycDocument) => {
          const DocIcon = DOC_ICON[doc.name] ?? CertificateIcon;
          const { pill, text, Icon: StatusIcon } = STATUS_STYLE[doc.status];
          return (
            <div key={doc.name} className="flex items-center justify-between gap-2 border-b border-surface-tint py-2.5 last:border-b-0">
              <span className="flex min-w-0 items-center gap-2 text-[13px] font-semibold text-ink">
                <DocIcon className="size-3.5 shrink-0 text-ink" />
                <span className="truncate">{doc.name}</span>
              </span>
              <span className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-[3px] text-[11px] font-bold ${pill} ${text}`}>
                <StatusIcon className="size-2.5" />
                {doc.status}
              </span>
            </div>
          );
        })}
      </div>
      <Link
        href={href}
        className="m-[18px] mt-3 flex min-h-[36px] items-center justify-center gap-1.5 rounded-lg border border-border bg-surface-tint text-[13px] font-bold text-ink hover:bg-primary-lighter"
      >
        <IdCardIcon className="size-3.5" />
        View All KYC Documents
      </Link>
    </Card>
  );
}
