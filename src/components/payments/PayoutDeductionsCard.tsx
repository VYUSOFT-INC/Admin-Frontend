import { Card } from "@/components/ui/Card";
import type { Payout } from "@/lib/mock-data/payments";

interface DeductionRowProps {
  label: string;
  value: string;
}

/** One label/value line in the fee waterfall — `min-w-0` + `break-words` on both sides so long
 * labels (e.g. "Shipping Penalty (2 late dispatches)") never overflow the card at narrow widths. */
function DeductionRow({ label, value }: DeductionRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">{label}</p>
      <p className="min-w-0 shrink-0 break-words text-right text-[13px] font-bold text-primary">{value}</p>
    </div>
  );
}

interface PayoutDeductionsCardProps {
  payout: Payout;
}

/**
 * "Fee Breakdown & Adjustments" card: the full waterfall from gross order value down to the
 * `finalNetPayout` actually released to the vendor — commission, GST on that commission, TDS,
 * a late-dispatch shipping penalty, and a return deduction.
 */
export function PayoutDeductionsCard({ payout }: PayoutDeductionsCardProps) {
  const commissionRate = Math.round((payout.commission / payout.grossAmount) * 100);

  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 px-[19px] py-[17px]">
      <h2 className="border-b border-surface-tint pb-[15px] text-sm font-extrabold tracking-[-0.28px] text-ink">Fee Breakdown &amp; Adjustments</h2>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">Gross Order Value</p>
          <p className="min-w-0 shrink-0 break-words text-right text-[13px] font-bold text-ink">₹{payout.grossAmount.toLocaleString("en-IN")}</p>
        </div>
        <DeductionRow label={`Platform Commission (${commissionRate}%)`} value={`−₹${payout.commission.toLocaleString("en-IN")}`} />
        <DeductionRow label="GST on Commission (18%)" value={`−₹${payout.gstOnCommission.toLocaleString("en-IN")}`} />
        <DeductionRow label="TDS Deducted (1%)" value={`−₹${payout.tdsDeducted.toLocaleString("en-IN")}`} />
        {payout.shippingPenalty > 0 && (
          <DeductionRow
            label={`Shipping Penalty (${payout.lateDispatchCount} late dispatch${payout.lateDispatchCount === 1 ? "" : "es"})`}
            value={`−₹${payout.shippingPenalty.toLocaleString("en-IN")}`}
          />
        )}
        {payout.returnDeduction > 0 && (
          <DeductionRow
            label={`Return Deduction (${payout.returnsCount} return${payout.returnsCount === 1 ? "" : "s"})`}
            value={`−₹${payout.returnDeduction.toLocaleString("en-IN")}`}
          />
        )}
      </div>

      <div className="h-px w-full bg-border" />

      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 break-words text-[15px] font-black tracking-[-0.3px] text-ink">Final Net Payout</p>
        <p className="min-w-0 shrink-0 break-words text-right text-[16px] font-black tracking-[-0.3px] text-success">
          ₹{payout.finalNetPayout.toLocaleString("en-IN")}
        </p>
      </div>
    </Card>
  );
}
