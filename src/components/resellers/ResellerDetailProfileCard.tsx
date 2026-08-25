"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CopyIcon } from "@/components/icons/ResellerDetailIcons";
import { LinkIcon } from "@/components/icons/ResellerIcons";
import { STATUS_BADGE_VARIANT } from "@/components/resellers/ResellersTable";
import type { Reseller, ResellerDetailData, ResellerStatus } from "@/lib/mock-data/resellers";

export type ResellerDetailTab = "overview" | "links" | "transactions";

const TABS: Array<{ value: ResellerDetailTab; label: string }> = [
  { value: "overview", label: "Overview" },
  { value: "links", label: "Link Performance" },
  { value: "transactions", label: "Transaction History" },
];

/** Figma copy for the profile card's status pill varies by account status — "Verified reseller"
 *  is the only wording the design shows (Aarohi Mehta is Active), so Suspended/Pending get an
 *  equivalent label in the same slot instead of always claiming "Verified". */
const STATUS_PILL_LABEL: Record<ResellerStatus, string> = {
  Active: "Verified reseller",
  Suspended: "Account suspended",
  Pending: "Pending verification",
};

interface ResellerDetailProfileCardProps {
  reseller: Reseller;
  detail: ResellerDetailData;
  status: ResellerStatus;
  activeTab: ResellerDetailTab;
  onTabChange: (tab: ResellerDetailTab) => void;
}

/** "PROFILE CARD": avatar, bio, status pill, the email/phone/location/store-URL grid, and the
 *  Overview / Link Performance / Transaction History tab switcher — all inside one bordered card
 *  in the Figma design (node 1177:723), unlike Vendor Detail's separate profile-card + tabs-card. */
export function ResellerDetailProfileCard({ reseller, detail, status, activeTab, onTabChange }: ResellerDetailProfileCardProps) {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`https://${detail.storeUrl}`).catch(() => {});
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Card className="flex flex-col gap-[18px] p-[21px]">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <div className="relative size-[70px] shrink-0 overflow-hidden rounded-full">
            <Image src={reseller.avatarUrl} alt="" fill sizes="70px" className="object-cover" />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <h2 className="min-w-0 break-words text-2xl font-extrabold tracking-[-0.72px] text-ink">{reseller.name}</h2>
            <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">{detail.bio}</p>
          </div>
        </div>
        <Badge variant={STATUS_BADGE_VARIANT[status]} className="shrink-0">
          {STATUS_PILL_LABEL[status]}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-x-[18px] gap-y-3.5 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-xs font-bold text-gray-500">Email address</p>
          <p className="min-w-0 break-words text-sm font-bold text-ink">{reseller.email}</p>
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-xs font-bold text-gray-500">Phone number</p>
          <p className="min-w-0 break-words text-sm font-bold text-ink">{detail.phone}</p>
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-xs font-bold text-gray-500">Location</p>
          <p className="min-w-0 break-words text-sm font-bold text-ink">{detail.location}</p>
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="text-xs font-bold text-gray-500">Store URL</p>
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex min-w-0 max-w-full items-center gap-2 rounded-[10px] bg-primary-lighter px-3 py-2.5">
              <LinkIcon className="size-3.5 shrink-0 text-primary" />
              <span className="min-w-0 truncate text-[13px] font-bold text-ink">{detail.storeUrl}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex min-h-[34px] shrink-0 items-center gap-2 rounded-[10px] border border-border bg-white px-3.5 text-[13px] font-bold text-ink transition-colors hover:bg-surface-tint"
            >
              <CopyIcon className="size-3.5" />
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 border-t border-border pt-[18px]">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onTabChange(tab.value)}
            className={`flex min-h-[40px] items-center whitespace-nowrap rounded-full border px-[17px] text-[13px] font-bold transition-colors ${
              activeTab === tab.value ? "border-[#f2dfe7] bg-primary-light text-primary" : "border-[#f2dfe7] bg-white text-gray-500 hover:bg-surface-tint"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </Card>
  );
}
