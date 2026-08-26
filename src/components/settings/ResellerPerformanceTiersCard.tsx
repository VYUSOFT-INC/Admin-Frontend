"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { InfoIcon } from "@/components/icons/SettingsIcons";
import {
  RESELLER_PERFORMANCE_TIER_INFO,
  RESELLER_TIER_BOUNDARIES,
  type ResellerTierBoundaries,
} from "@/lib/mock-data/settings";
import type { ResellerTier } from "@/lib/mock-data/resellers";

/** Per-tier card background/border/badge colors, matching the Figma export exactly (node
 * 1177:1476). Kept local to this component — `RESELLER_PERFORMANCE_TIER_INFO` in `settings.ts`
 * only owns the copy, not presentation, matching how other cards on this screen keep their own
 * color/class constants next to their JSX. */
const TIER_STYLES: Record<ResellerTier, { card: string; badge: string }> = {
  Starter: { card: "bg-[#fffafc] border-[#f4e2e9]", badge: "bg-[#fff8fb] text-gray-500" },
  Silver: { card: "bg-[#fff1f3] border-[#f9dbe2]", badge: "bg-[#fbe5ea] text-primary" },
  Gold: { card: "bg-[#fef1dd] border-[#fce4bb]", badge: "bg-[#fde8c4] text-[#8a5a00]" },
};

/** Groups a plain digit string with Indian digit grouping, e.g. `"200000"` -> `"2,00,000"` —
 * mirrors `resellers.ts`'s internal (unexported) `groupIndian` helper; kept local here since that
 * one isn't exported and this card has no other reason to import from `resellers.ts` beyond the
 * `ResellerTier` type. */
function groupIndian(digits: string): string {
  if (digits.length <= 2) return digits;
  const groups: string[] = [];
  let end = digits.length;
  while (end > 2) {
    groups.unshift(digits.slice(end - 2, end));
    end -= 2;
  }
  groups.unshift(digits.slice(0, end));
  return groups.join(",");
}

/** Formats a whole-rupee amount for display inside the boundary inputs, e.g. `200000` ->
 * `"₹2,00,000"`. */
function formatBoundary(amount: number): string {
  const rounded = Math.max(0, Math.round(amount));
  const str = String(rounded);
  return str.length <= 3 ? `₹${str}` : `₹${groupIndian(str.slice(0, -3))},${str.slice(-3)}`;
}

/** Strips everything but digits from a boundary input's raw typed value and parses it back to a
 * whole-rupee number, so the field can stay a controlled, always-formatted "₹N,NN,NNN" input. */
function parseBoundaryInput(raw: string): number {
  const digitsOnly = raw.replace(/[^0-9]/g, "");
  if (digitsOnly.length === 0) return 0;
  return Number.parseInt(digitsOnly, 10);
}

/**
 * "Performance Tiers" card — the third of the four Reseller Program sections (Figma "reseller
 * program", node 1177:1470): the read-only Starter/Silver/Gold tier ladder (auto-assigned monthly
 * from GMV) plus the two editable tier-boundary inputs beneath it. Follows the same
 * draft-state-plus-Save convention as `ResellerCommissionRatesCard`; only the two boundary
 * numbers are actually editable; the three tier cards above them are informational.
 */
export function ResellerPerformanceTiersCard() {
  const [savedBoundaries, setSavedBoundaries] = useState<ResellerTierBoundaries>(RESELLER_TIER_BOUNDARIES);
  const [draftBoundaries, setDraftBoundaries] = useState<ResellerTierBoundaries>(RESELLER_TIER_BOUNDARIES);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = useMemo(
    () =>
      draftBoundaries.starterToSilver !== savedBoundaries.starterToSilver ||
      draftBoundaries.silverToGold !== savedBoundaries.silverToGold,
    [draftBoundaries, savedBoundaries]
  );

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching this screen's other cards.
    await new Promise((resolve) => setTimeout(resolve, 600));
    Object.assign(RESELLER_TIER_BOUNDARIES, draftBoundaries);
    setSavedBoundaries(draftBoundaries);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3.5 rounded-[10px] border border-border bg-white p-[19px]">
      <div className="min-w-0">
        <h2 className="text-[15px] font-extrabold text-ink">Performance Tiers</h2>
        <p className="mt-1 min-w-0 break-words text-[12px] font-medium text-gray-500">
          Tiers are auto-assigned on the 1st of each month based on previous month&apos;s GMV generated.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {RESELLER_PERFORMANCE_TIER_INFO.map((tierInfo) => {
          const style = TIER_STYLES[tierInfo.tier];
          return (
            <div key={tierInfo.tier} className={`flex min-w-0 flex-col gap-3 rounded-[10px] border p-4 ${style.card}`}>
              <div className="flex min-w-0 items-center justify-between gap-2">
                <span className="text-[15px] font-extrabold text-ink">{tierInfo.tier}</span>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-extrabold ${style.badge}`}>{tierInfo.badgeLabel}</span>
              </div>
              <p className="min-w-0 break-words text-[13px] font-bold text-ink">{tierInfo.gmvRangeLabel}</p>
              <p className="min-w-0 break-words text-[12px] font-bold text-gray-500">{tierInfo.commissionFormula}</p>
              <ul className="flex min-w-0 flex-col gap-1.5">
                {tierInfo.benefits.map((benefit) => (
                  <li key={benefit} className="min-w-0 break-words text-[12px] font-medium text-gray-500">
                    • {benefit}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-[12px] font-bold text-ink">Starter → Silver boundary</span>
          <input
            type="text"
            inputMode="numeric"
            aria-label="Starter to Silver tier boundary, in rupees"
            value={formatBoundary(draftBoundaries.starterToSilver)}
            onChange={(event) =>
              setDraftBoundaries((prev) => ({ ...prev, starterToSilver: parseBoundaryInput(event.target.value) }))
            }
            disabled={isSaving}
            className="min-h-[44px] w-full min-w-0 rounded-[10px] border border-border bg-white px-[17px] text-[14px] font-bold text-ink focus:outline-none focus:border-primary disabled:opacity-60"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <span className="text-[12px] font-bold text-ink">Silver → Gold boundary</span>
          <input
            type="text"
            inputMode="numeric"
            aria-label="Silver to Gold tier boundary, in rupees"
            value={formatBoundary(draftBoundaries.silverToGold)}
            onChange={(event) => setDraftBoundaries((prev) => ({ ...prev, silverToGold: parseBoundaryInput(event.target.value) }))}
            disabled={isSaving}
            className="min-h-[44px] w-full min-w-0 rounded-[10px] border border-border bg-white px-[17px] text-[14px] font-bold text-ink focus:outline-none focus:border-primary disabled:opacity-60"
          />
        </div>
      </div>

      <div className="flex min-w-0 items-start gap-2.5 rounded-[10px] bg-[#fff2f4] px-4 py-3.5">
        <InfoIcon className="mt-0.5 size-4 shrink-0 text-gray-500" />
        <p className="min-w-0 break-words text-[12px] font-medium text-gray-500">
          When a reseller moves tiers, the new rate applies to all new orders from that day. Existing pending settlements pay
          at the rate active when the order was placed.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] bg-primary px-[17px] text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SaveIcon className="size-3.5" />
          {isSaving ? "Saving…" : "Save Tier Settings"}
        </button>
        {justSaved && <Badge variant="success">Saved</Badge>}
      </div>
    </div>
  );
}
