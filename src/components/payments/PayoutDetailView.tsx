"use client";

import { useState } from "react";
import { PayoutActionPanel } from "@/components/payments/PayoutActionPanel";
import { PayoutBankDetailsCard } from "@/components/payments/PayoutBankDetailsCard";
import { PayoutDeductionsCard } from "@/components/payments/PayoutDeductionsCard";
import { PayoutDetailHeader } from "@/components/payments/PayoutDetailHeader";
import { PayoutOrdersBreakdownCard } from "@/components/payments/PayoutOrdersBreakdownCard";
import { PayoutSummaryCard } from "@/components/payments/PayoutSummaryCard";
import type { Payout, PayoutStatus } from "@/lib/mock-data/payments";

interface PayoutDetailViewProps {
  payout: Payout;
}

/**
 * Client-side shell for the Payout Detail screen. Owns the (locally optimistic) payout status
 * so the header badge and action panel stay in sync.
 *
 * There is no backend, so — matching the precedent set by `OrderDetailView` / `ReturnDetailView`
 * — a status change also mutates `payout.status` on the exact `Payout` object this page was
 * given in place (it's the same object reference held inside the shared `PAYOUTS` array from
 * `lib/mock-data/payments`, not a copy). That keeps this screen consistent with the Payments &
 * Payouts list: navigating back via the header's `Link` remounts `/payments`, which re-reads
 * `PAYOUTS` and picks up the change.
 *
 * The parent page renders this with `key={payout.id}`, so React remounts it (resetting local
 * state) when navigating from one payout's detail screen directly to another's.
 */
export function PayoutDetailView({ payout }: PayoutDetailViewProps) {
  const [status, setStatus] = useState<PayoutStatus>(payout.status);

  function handleStatusChange(next: PayoutStatus) {
    payout.status = next;
    setStatus(next);
  }

  return (
    <div className="flex flex-col gap-4">
      <PayoutDetailHeader payout={payout} status={status} />

      <div className="flex flex-col items-start gap-3.5 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-3.5">
          <PayoutOrdersBreakdownCard payout={payout} />
          <PayoutDeductionsCard payout={payout} />
        </div>
        <div className="flex w-full flex-col gap-3.5 lg:w-[340px] lg:shrink-0">
          <PayoutActionPanel payout={payout} status={status} onStatusChange={handleStatusChange} />
          <PayoutSummaryCard payout={payout} />
          <PayoutBankDetailsCard payout={payout} />
        </div>
      </div>
    </div>
  );
}
