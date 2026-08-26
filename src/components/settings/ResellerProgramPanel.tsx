import { Card } from "@/components/ui/Card";
import { ResellerCommissionRatesCard } from "@/components/settings/ResellerCommissionRatesCard";
import { ResellerPerformanceTiersCard } from "@/components/settings/ResellerPerformanceTiersCard";
import { ResellerProgramRulesCard } from "@/components/settings/ResellerProgramRulesCard";
import { ResellerProgramStatusCard } from "@/components/settings/ResellerProgramStatusCard";

/**
 * "Reseller Program" settings panel (Figma "reseller program", node 1177:1184) — the outer white
 * card that holds the heading plus the four nested sub-cards (Program Status, Category-wise
 * Commission Rates, Performance Tiers, Program Rules), matching `ShippingPanel`'s /
 * `TaxCompliancePanel`'s nested-card layout convention. This is the eighth and final Settings
 * sub-page — the configuration screen behind the read-only reseller data shown on the "Resellers"
 * list (`/resellers`) and "Reseller Detail" (`/resellers/[slug]`) screens.
 */
export function ResellerProgramPanel() {
  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-[18px] p-[21px]">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-[18px] font-extrabold text-ink">Reseller Program</h1>
        <p className="min-w-0 max-w-[760px] break-words text-[13px] font-medium text-gray-500">
          Configure reseller activation, commission logic, performance tiers, and payout rules for the MIVYU reseller
          ecosystem.
        </p>
      </div>

      <ResellerProgramStatusCard />
      <ResellerCommissionRatesCard />
      <ResellerPerformanceTiersCard />
      <ResellerProgramRulesCard />
    </Card>
  );
}
