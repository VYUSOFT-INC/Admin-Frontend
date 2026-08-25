"use client";

import { useState } from "react";
import { ResellerDetailActionPanel } from "@/components/resellers/ResellerDetailActionPanel";
import { ResellerDetailFraudFlagsCard } from "@/components/resellers/ResellerDetailFraudFlagsCard";
import { ResellerDetailHeader } from "@/components/resellers/ResellerDetailHeader";
import { ResellerDetailLinkPerformanceCard } from "@/components/resellers/ResellerDetailLinkPerformanceCard";
import { ResellerDetailOutstandingBalanceCard } from "@/components/resellers/ResellerDetailOutstandingBalanceCard";
import { ResellerDetailPanPayoutCard } from "@/components/resellers/ResellerDetailPanPayoutCard";
import { ResellerDetailPerformanceSummaryCard } from "@/components/resellers/ResellerDetailPerformanceSummaryCard";
import { ResellerDetailProfileCard, type ResellerDetailTab } from "@/components/resellers/ResellerDetailProfileCard";
import { ResellerDetailStatsGrid } from "@/components/resellers/ResellerDetailStatsGrid";
import { ResellerDetailTopProductsCard } from "@/components/resellers/ResellerDetailTopProductsCard";
import { ResellerDetailTransactionHistoryCard } from "@/components/resellers/ResellerDetailTransactionHistoryCard";
import { getResellerDetail } from "@/lib/mock-data/resellers";
import type { Reseller, ResellerStatus, ResellerTier } from "@/lib/mock-data/resellers";

const SECTION_ID: Record<ResellerDetailTab, string> = {
  overview: "reseller-overview-section",
  links: "reseller-link-performance-section",
  transactions: "reseller-transaction-history-section",
};

interface ResellerDetailViewProps {
  reseller: Reseller;
}

/**
 * Client-side shell for the Reseller Detail screen. Owns the state shared across sections — the
 * reseller's (locally optimistic) status and tier, and the active tab pill — so the header badges,
 * Action Panel, and Performance Summary card all stay in sync (same pattern as `VendorDetailView`).
 *
 * The parent page renders this with `key={reseller.slug}`, so React remounts it (resetting all of
 * this local state) whenever the viewed reseller changes.
 *
 * The Figma design (node 1177:576) only has one designed state: every section — profile, stats,
 * Outstanding Balance, Top Products, Fraud Flags, Link Performance, and Transaction History — is
 * shown stacked at once with the "Overview" pill highlighted; there's no separate frame for what
 * "Link Performance"/"Transaction History" alone would look like. To keep the tabs functionally
 * real (not decorative) without inventing a layout the design never specified, every section stays
 * rendered exactly as shown, and the tab pills scroll to + highlight their section instead of
 * swapping content — the default "Overview" load still matches the Figma screenshot pixel-for-pixel.
 */
export function ResellerDetailView({ reseller }: ResellerDetailViewProps) {
  const [status, setStatus] = useState<ResellerStatus>(reseller.status);
  const [tier, setTier] = useState<ResellerTier>(reseller.tier);
  const [activeTab, setActiveTab] = useState<ResellerDetailTab>("overview");

  const detail = getResellerDetail(reseller);

  function handleTabChange(tab: ResellerDetailTab) {
    setActiveTab(tab);
    if (typeof document === "undefined") return;
    document.getElementById(SECTION_ID[tab])?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex flex-col gap-5">
      <ResellerDetailHeader reseller={reseller} status={status} tier={tier} onTierChange={setTier} />

      <ResellerDetailProfileCard reseller={reseller} detail={detail} status={status} activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex flex-col items-start gap-5 lg:flex-row">
        <div id={SECTION_ID.overview} className="flex min-w-0 flex-1 scroll-mt-5 flex-col gap-4">
          <ResellerDetailStatsGrid reseller={reseller} detail={detail} />
          <ResellerDetailOutstandingBalanceCard detail={detail} />
          <ResellerDetailTopProductsCard detail={detail} />
          <ResellerDetailFraudFlagsCard />
          <div id={SECTION_ID.links} className="scroll-mt-5">
            <ResellerDetailLinkPerformanceCard detail={detail} />
          </div>
          <div id={SECTION_ID.transactions} className="scroll-mt-5">
            <ResellerDetailTransactionHistoryCard detail={detail} dateRangeLabel="01 May 2026 - 12 Jun 2026" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-[372px] lg:shrink-0">
          <ResellerDetailActionPanel status={status} onStatusChange={setStatus} adminNote={detail.adminNote} />
          <ResellerDetailPanPayoutCard detail={detail} />
          <ResellerDetailPerformanceSummaryCard tier={tier} detail={detail} />
        </div>
      </div>
    </div>
  );
}
