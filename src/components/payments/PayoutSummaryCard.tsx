import { Card } from "@/components/ui/Card";
import type { Payout } from "@/lib/mock-data/payments";

interface SummaryRowProps {
  label: string;
  value: string;
  danger?: boolean;
}

/** One label/value line — `min-w-0` + `break-words` on both sides so a long vendor name or
 * period label never overflows this narrow sidebar card. */
function SummaryRow({ label, value, danger = false }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">{label}</p>
      <p className={`min-w-0 shrink-0 break-words text-right text-[13px] font-bold ${danger ? "text-primary" : "text-ink"}`}>{value}</p>
    </div>
  );
}

interface PayoutSummaryCardProps {
  payout: Payout;
}

/** "Payout Summary" sidebar card: a compact recap of the payout, ending in the same
 * `finalNetPayout` figure the "Fee Breakdown & Adjustments" card totals to. */
export function PayoutSummaryCard({ payout }: PayoutSummaryCardProps) {
  const adjustments = payout.shippingPenalty + payout.returnDeduction;

  return (
    <Card className="flex w-full min-w-0 flex-col gap-2.5 px-[19px] py-[17px]">
      <h2 className="text-xs font-extrabold uppercase tracking-[0.84px] text-gray-500">Payout Summary</h2>

      <SummaryRow label="Vendor" value={payout.vendorName} />
      <SummaryRow label="Payout Period" value={payout.periodLabel} />
      <SummaryRow label="Total Orders" value={String(payout.ordersCount)} />
      <SummaryRow label="Gross Amount" value={`₹${payout.grossAmount.toLocaleString("en-IN")}`} />
      <SummaryRow label="Commission Deducted" value={`−₹${payout.commission.toLocaleString("en-IN")}`} danger />
      <SummaryRow label="GST on Commission" value={`−₹${payout.gstOnCommission.toLocaleString("en-IN")}`} danger />
      <SummaryRow label="TDS Deducted" value={`−₹${payout.tdsDeducted.toLocaleString("en-IN")}`} danger />
      <SummaryRow label="Adjustments" value={`−₹${adjustments.toLocaleString("en-IN")}`} danger />

      <div className="h-px w-full bg-border" />

      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 break-words text-[15px] font-extrabold text-ink">Net Payout</p>
        <p className="min-w-0 shrink-0 break-words text-right text-base font-extrabold text-success">₹{payout.finalNetPayout.toLocaleString("en-IN")}</p>
      </div>
    </Card>
  );
}
