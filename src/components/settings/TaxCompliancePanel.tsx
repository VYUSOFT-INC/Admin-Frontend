import { Card } from "@/components/ui/Card";
import { ComplianceDocumentsCard } from "@/components/settings/ComplianceDocumentsCard";
import { GstConfigurationCard } from "@/components/settings/GstConfigurationCard";
import { GstTypeRulesCard } from "@/components/settings/GstTypeRulesCard";
import { TransactionTaxCard } from "@/components/settings/TransactionTaxCard";

/**
 * "Tax & Compliance" settings panel (Figma "tax and compliance", node 1143:2483) — the outer white
 * card that holds the heading plus the four nested sub-cards (GST Configuration, Transaction Tax
 * (TDS), GST Type Rules, Compliance Documents), matching `ShippingPanel`'s nested-card layout
 * convention.
 */
export function TaxCompliancePanel() {
  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-[18px] p-[21px]">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-[22px] font-extrabold tracking-[-0.66px] text-ink">Tax & Compliance</h1>
        <p className="min-w-0 max-w-[680px] break-words text-[13px] font-medium text-gray-500">
          Configure GST and TDS defaults, keep compliance records organized, and maintain downloadable platform documentation.
        </p>
      </div>

      <GstConfigurationCard />
      <TransactionTaxCard />
      <GstTypeRulesCard />
      <ComplianceDocumentsCard />
    </Card>
  );
}
