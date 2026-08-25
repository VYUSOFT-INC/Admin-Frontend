"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { BackArrowIcon } from "@/components/icons/VendorDetailIcons";
import { ChevronRightIcon } from "@/components/icons/VendorIcons";
import { TierEditIcon } from "@/components/icons/ResellerDetailIcons";
import { STATUS_BADGE_VARIANT, TIER_BADGE_VARIANT } from "@/components/resellers/ResellersTable";
import { TIER_OPTIONS } from "@/lib/mock-data/resellers";
import type { Reseller, ResellerStatus, ResellerTier } from "@/lib/mock-data/resellers";

interface ResellerDetailHeaderProps {
  reseller: Reseller;
  status: ResellerStatus;
  tier: ResellerTier;
  onTierChange: (tier: ResellerTier) => void;
}

/** Breadcrumb + page-header band for the Reseller Detail screen: back-to-list pill, big name with
 *  tier/status badges, and the "Update Tier" control (Figma nodes 1177:692 and 1177:703). Tier
 *  changes are real, local state — clicking a tier in the menu updates the header badge and the
 *  sidebar Performance Summary card together (both read the same lifted `tier` state in
 *  `ResellerDetailView`), matching this project's no-op-button bug fix on the Vendor screens. */
export function ResellerDetailHeader({ reseller, status, tier, onTierChange }: ResellerDetailHeaderProps) {
  const [isTierMenuOpen, setIsTierMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsTierMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2">
        <Link
          href="/resellers"
          aria-label="Back to resellers"
          className="flex min-h-[34px] items-center gap-2 rounded-full border border-[#f2dfe6] bg-white px-[13px] text-[13px] font-bold text-gray-500 transition-colors hover:bg-surface-tint"
        >
          <BackArrowIcon className="size-3.5" />
          Resellers
        </Link>
        <ChevronRightIcon className="size-3.5 shrink-0 text-gray-400" />
        <span className="min-w-0 truncate text-[13px] font-bold text-ink">{reseller.name}</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-white px-[23px] py-[21px]">
        <div className="flex min-w-0 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="min-w-0 break-words text-[26px] font-extrabold tracking-[-1.2px] text-ink">{reseller.name}</h1>
            <Badge variant={TIER_BADGE_VARIANT[tier]}>{tier}</Badge>
            <Badge variant={STATUS_BADGE_VARIANT[status]}>{status}</Badge>
          </div>
          <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">
            {reseller.email} &nbsp;|&nbsp; Joined: {reseller.joinedDate}
          </p>
        </div>

        <div className="relative shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsTierMenuOpen((open) => !open)}
            aria-expanded={isTierMenuOpen}
            aria-haspopup="menu"
            className="flex min-h-[40px] items-center gap-2 rounded-[10px] border border-[#af0026] bg-primary px-[17px] text-[14px] font-bold text-white transition-colors hover:opacity-90"
          >
            <TierEditIcon className="size-4" />
            Update Tier
          </button>
          {isTierMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-[calc(100%+8px)] z-10 w-40 overflow-hidden rounded-[10px] border border-border bg-white py-1.5 shadow-lg"
            >
              {TIER_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="menuitemradio"
                  aria-checked={option === tier}
                  onClick={() => {
                    onTierChange(option);
                    setIsTierMenuOpen(false);
                  }}
                  className={`block w-full whitespace-nowrap px-3.5 py-2 text-left text-[13px] font-semibold transition-colors ${
                    option === tier ? "bg-primary-lighter text-primary" : "text-ink hover:bg-surface-tint"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
