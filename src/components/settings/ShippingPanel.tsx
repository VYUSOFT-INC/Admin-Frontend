import { Card } from "@/components/ui/Card";
import { CourierPartnersCard } from "@/components/settings/CourierPartnersCard";
import { PincodeServiceabilityCard } from "@/components/settings/PincodeServiceabilityCard";
import { ShippingSlaConfigCard } from "@/components/settings/ShippingSlaConfigCard";

/**
 * "Shipping" settings panel (Figma "shipping", node 1143:1675) — the outer white card that holds
 * the "Shipping Management" heading plus the three nested sub-cards (Courier Partners, Pincode
 * Serviceability, SLA Configuration), matching the Figma design's nested-card layout (distinct
 * from `PickupStorePanel`'s/`PlatformConfigPanel`'s single flat card with divider lines).
 */
export function ShippingPanel() {
  return (
    <Card className="flex min-w-0 flex-1 flex-col gap-[18px] p-[21px]">
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-[22px] font-extrabold tracking-[-0.66px] text-ink">Shipping Management</h1>
        <p className="min-w-0 max-w-[680px] break-words text-[13px] font-medium text-gray-500">
          Manage courier partners, pincode serviceability, and SLA configuration for marketplace fulfillment.
        </p>
      </div>

      <CourierPartnersCard />
      <PincodeServiceabilityCard />
      <ShippingSlaConfigCard />
    </Card>
  );
}
