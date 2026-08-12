import type { Vendor } from "@/lib/mock-data/vendors";

export interface KycPreviewField {
  label: string;
  value: string;
}

export interface KycDocumentPreview {
  /** Bold heading in the top-left of the preview card, e.g. "GSTIN". */
  badgeLabel: string;
  /** Centered document title, e.g. "Goods and Services Tax Registration Certificate". */
  title: string;
  fields: KycPreviewField[];
  /** Footer disclaimer shown under the field grid. */
  disclaimer: string;
}

/** Maps the first four characters of an IFSC code to a bank display name, so the Cancelled
 *  Cheque preview can show a real-looking bank name derived from the vendor's own IFSC code
 *  instead of a fabricated one. */
const BANK_NAME_BY_IFSC_PREFIX: Record<string, string> = {
  HDFC: "HDFC Bank",
  ICIC: "ICICI Bank",
  PUNB: "Punjab National Bank",
  SBIN: "State Bank of India",
  AXIS: "Axis Bank",
  UBIN: "Union Bank of India",
  SIBL: "South Indian Bank",
  IOBA: "Indian Overseas Bank",
};

function bankNameFromIfsc(ifscCode: string): string {
  const prefix = ifscCode.slice(0, 4).toUpperCase();
  return BANK_NAME_BY_IFSC_PREFIX[prefix] ?? "Partner Bank";
}

/**
 * Derives the certificate-style preview shown in the Document Viewer from the vendor's own
 * mock fields (GST/PAN numbers, bank details, pickup address, etc.) so every document reuses a
 * single real source of truth instead of storing 40 near-duplicate field sets in mock data.
 */
export function getKycDocumentPreview(vendor: Vendor, documentName: string): KycDocumentPreview {
  switch (documentName) {
    case "GST Certificate":
      return {
        badgeLabel: "GSTIN",
        title: "Goods and Services Tax Registration Certificate",
        fields: [
          { label: "Legal Name", value: `${vendor.name} Retail LLP` },
          { label: "Trade Name", value: vendor.name },
          { label: "GSTIN / UIN", value: vendor.gstNumber },
          { label: "Constitution", value: vendor.type === "Online Seller" ? "Limited Liability Partnership" : "Partnership Firm" },
          { label: "Principal Place", value: vendor.pickupAddress },
          { label: "Date of Liability", value: vendor.registeredDate },
          { label: "Type of Registration", value: "Regular" },
          { label: "Issued By", value: "Government of India" },
        ],
        disclaimer:
          "This preview represents the uploaded KYC file for admin verification. Verify trade name, GSTIN, and registered address before approving the vendor profile.",
      };
    case "PAN Card":
      return {
        badgeLabel: "PAN",
        title: "Permanent Account Number Card",
        fields: [
          { label: "Name", value: vendor.ownerName },
          { label: "PAN Number", value: vendor.panNumber },
          { label: "Category", value: "Individual" },
          { label: "Issued By", value: "Income Tax Department, Govt. of India" },
        ],
        disclaimer:
          "This preview represents the uploaded KYC file for admin verification. Verify the name and PAN number match the vendor's registered business owner.",
      };
    case "Cancelled Cheque":
      return {
        badgeLabel: "BANK",
        title: "Cancelled Cheque / Bank Proof",
        fields: [
          { label: "Account Holder", value: vendor.ownerName },
          { label: "Bank Name", value: bankNameFromIfsc(vendor.ifscCode) },
          { label: "Account Number", value: vendor.bankAccountMasked },
          { label: "IFSC Code", value: vendor.ifscCode },
          { label: "Account Type", value: "Current Account" },
        ],
        disclaimer:
          "This preview represents the uploaded KYC file for admin verification. Verify the account number and IFSC code before enabling vendor payouts.",
      };
    case "Address Proof":
      return {
        badgeLabel: "ADDRESS",
        title: "Business Address Proof",
        fields: [
          { label: "Name on Document", value: vendor.ownerName },
          { label: "Registered Address", value: vendor.pickupAddress },
          { label: "Proof Type", value: "Electricity Bill" },
          { label: "Issuing Authority", value: "State Electricity Board" },
        ],
        disclaimer:
          "This preview represents the uploaded KYC file for admin verification. Verify the address matches the vendor's pickup/warehouse location.",
      };
    default:
      return {
        badgeLabel: "DOCUMENT",
        title: documentName,
        fields: [{ label: "Vendor", value: vendor.name }],
        disclaimer: "This preview represents the uploaded KYC file for admin verification.",
      };
  }
}
