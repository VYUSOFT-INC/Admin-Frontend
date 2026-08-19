/**
 * Mock data for the "Tax & Compliance" settings screen (Figma "tax and compliance", node
 * 1143:2483) — the seventh `SETTINGS_SUB_NAV` destination, slotted between "Shipping" and
 * "Pickup & Store" to match the order Figma's own sub-nav shows. Four sections, matching the four
 * bordered sub-cards the design shows top to bottom: `GST_CONFIG_SETTINGS` (invoicing identifiers
 * and GST defaults), `TDS_SETTINGS` (marketplace TDS treatment on vendor settlements),
 * `GST_TYPE_RULES_SETTINGS` (automatic IGST/CGST+SGST selection and customer invoice visibility),
 * and `COMPLIANCE_DOCUMENTS` (the platform-level document checklist).
 *
 * Standalone-mock note, matching this project's other `settings.ts`/`shipping.ts` tables: there's
 * no real backend here, so editing `GST_CONFIG_SETTINGS.gstRateOnCommissionPercent` doesn't
 * retroactively rewrite `settings.ts`'s separate `PLATFORM_CONFIG_SETTINGS.gstRatePercent` (that
 * field is the customer-facing order GST rate; this screen's rate is the GST charged specifically
 * on platform commission — two distinct rates the Figma design keeps on two separate screens), the
 * same way editing a commission rate elsewhere doesn't retroactively rewrite a settled payout.
 */

export type InvoiceNumberingFormat = "Sequential" | "Fiscal Year Reset" | "Custom Prefix + Sequence";

/** Options for the "Invoice Numbering Format" dropdown. Figma only shows "Sequential" selected
 * (no dropdown-open state), so the other two options are editorially added, matching how
 * `PayoutSchedulePanel`'s `SETTLEMENT_CYCLE_OPTIONS` fills in a plausible option set around the
 * one value Figma shows. */
export const INVOICE_NUMBERING_FORMAT_OPTIONS: InvoiceNumberingFormat[] = ["Sequential", "Fiscal Year Reset", "Custom Prefix + Sequence"];

export interface GstConfigSettings {
  /** Masked GSTIN string exactly as shown in the Figma design (the platform's real GSTIN with the
   * middle digits redacted) — kept editable like every other field on this card rather than
   * special-cased, since Figma renders it in the same plain bordered input style as "Invoice Prefix". */
  platformGstin: string;
  /** Whole-percent GST charged on platform commission (distinct from `PLATFORM_CONFIG_SETTINGS.gstRatePercent`
   * in `settings.ts`, which is the customer-facing order GST rate — see file-level note above). */
  gstRateOnCommissionPercent: number;
  invoicePrefix: string;
  invoiceNumberingFormat: InvoiceNumberingFormat;
  /** When on, an invoice is generated automatically for every order instead of requiring a manual trigger. */
  autoGenerateInvoicesEnabled: boolean;
}

export const GST_CONFIG_SETTINGS: GstConfigSettings = {
  platformGstin: "27AABC••••••1ZX",
  gstRateOnCommissionPercent: 18,
  invoicePrefix: "MIV-INV",
  invoiceNumberingFormat: "Sequential",
  autoGenerateInvoicesEnabled: true,
};

export interface TdsSettings {
  /** Freeform label combining the TDS rate and the governing section, matching the Figma copy
   * "1% under Section 194O" exactly — kept as a single editable text field like "Invoice Prefix"
   * rather than split into a rate number + section string, since the design shows it as one plain
   * text value in one box. */
  tdsRateLabel: string;
  /** Whole-rupee annual vendor turnover threshold above which Section 194O TDS applies. */
  annualThresholdRupees: number;
  /** When on, TDS is automatically deducted from vendor settlements rather than requiring a manual step. */
  settlementDeductionEnabled: boolean;
  /** When on, a TDS certificate is included in the monthly compliance report sent to vendors. */
  monthlyReportingEnabled: boolean;
}

export const TDS_SETTINGS: TdsSettings = {
  tdsRateLabel: "1% under Section 194O",
  annualThresholdRupees: 100000,
  settlementDeductionEnabled: true,
  monthlyReportingEnabled: true,
};

export interface GstTypeRulesSettings {
  /** When on, the customer-facing invoice shows the IGST/CGST+SGST breakdown instead of a single combined tax line. */
  showGstBreakdownInCustomerInvoice: boolean;
}

export const GST_TYPE_RULES_SETTINGS: GstTypeRulesSettings = {
  showGstBreakdownInCustomerInvoice: true,
};

export type ComplianceDocumentStatus = "verified" | "pending";

export interface ComplianceDocument {
  id: string;
  name: string;
  /** Short one-line description shown under the document name, matching the Figma copy. */
  description: string;
  status: ComplianceDocumentStatus;
  /** "DD Mon YYYY" formatted date, matching the Figma copy exactly. `undefined` for a document
   * that has never been uploaded (Figma's "Pending upload" row shows no date). */
  uploadedDate?: string;
}

/**
 * The 3 compliance document rows shown in the Figma design, in its exact order/values. "Re-upload"
 * (verified docs) and "Upload" (the pending doc) both wire to a real file input in
 * `ComplianceDocumentsCard` that flips the row to "Verified" with today's date on selection —
 * there's no real backend to actually store the file, matching this project's no-backend
 * convention for Settings actions (e.g. `PincodeServiceabilityCard`'s CSV upload).
 */
export const COMPLIANCE_DOCUMENTS: ComplianceDocument[] = [
  {
    id: "doc-platform-gst-certificate",
    name: "Platform GST Certificate",
    description: "Required for invoice and tax audit records",
    status: "verified",
    uploadedDate: "14 Jun 2025",
  },
  {
    id: "doc-pan-card",
    name: "PAN Card",
    description: "Used for tax identity and compliance verification",
    status: "verified",
    uploadedDate: "14 Jun 2025",
  },
  {
    id: "doc-company-registration-certificate",
    name: "Company Registration Certificate",
    description: "Pending master compliance file for registry records",
    status: "pending",
  },
];
