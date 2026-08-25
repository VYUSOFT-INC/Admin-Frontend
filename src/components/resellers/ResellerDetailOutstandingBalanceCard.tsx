import type { ResellerDetailData } from "@/lib/mock-data/resellers";

interface ResellerDetailOutstandingBalanceCardProps {
  detail: ResellerDetailData;
}

/** Amber "Outstanding Balance" banner on the Overview tab (Figma node 1177:805). Uses the raw
 *  Figma hex values (not the `warning` design token) since the token's text color reads noticeably
 *  more orange than this banner's amber — the skill's token-priority rule still applies when a
 *  token is actually a close visual match, but here it was not. */
export function ResellerDetailOutstandingBalanceCard({ detail }: ResellerDetailOutstandingBalanceCardProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-[#fdecce] bg-gradient-to-b from-[#fef5e7] to-[#fdefd8] p-[19px]">
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-lg font-extrabold tracking-[-0.54px] text-ink">Outstanding Balance</p>
        <p className="break-words text-[28px] font-extrabold tracking-[-1.12px] text-[#ba7d16]">
          {detail.outstandingBalance} pending payout
        </p>
        <p className="text-[13px] font-medium text-gray-500">Next payout on {detail.nextPayoutDate}</p>
      </div>
      <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#fef1dd] px-2.5 py-1 text-[12px] font-extrabold text-[#ba7d16]">
        Payout in queue
      </span>
    </div>
  );
}
