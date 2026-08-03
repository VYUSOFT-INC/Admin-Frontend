import { Card } from "@/components/ui/Card";
import type { Payout } from "@/lib/mock-data/payments";

interface BankRowProps {
  label: string;
  value: string;
}

/** `min-w-0` + `break-words` on both sides so a long account holder / bank name never overflows
 * this narrow sidebar card. */
function BankRow({ label, value }: BankRowProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">{label}</p>
      <p className="min-w-0 shrink-0 break-words text-right text-[13px] font-bold text-ink">{value}</p>
    </div>
  );
}

interface PayoutBankDetailsCardProps {
  payout: Payout;
}

/** "Bank Details" sidebar card: the vendor's settlement account this payout will be released
 * to. Reuses the same masked-account convention (`Vendor.bankAccountMasked` / `ifscCode`)
 * already established on the Vendor Detail screen rather than inventing a new format. */
export function PayoutBankDetailsCard({ payout }: PayoutBankDetailsCardProps) {
  return (
    <Card className="flex w-full min-w-0 flex-col gap-2.5 px-[19px] py-[17px]">
      <h2 className="text-xs font-extrabold uppercase tracking-[0.84px] text-gray-500">Bank Details</h2>

      <BankRow label="Account Number" value={payout.bankAccountMasked} />
      <BankRow label="IFSC Code" value={payout.ifscCode} />
      <BankRow label="Bank" value={payout.bankName} />
      <BankRow label="Account Holder" value={payout.accountHolderName} />
    </Card>
  );
}
