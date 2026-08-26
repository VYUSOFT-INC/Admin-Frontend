"use client";

import { useId, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { ChevronDownIcon, SaveIcon } from "@/components/icons/VendorDetailIcons";
import { InfoIcon } from "@/components/icons/SettingsIcons";
import {
  RESELLER_PAYOUT_CYCLE_OPTIONS,
  RESELLER_PROGRAM_RULES,
  type ResellerPayoutCycle,
  type ResellerProgramRules,
} from "@/lib/mock-data/settings";

/** Clamp + coerce a whole-number input's raw string value to a non-negative integer, matching
 * `PickupStorePanel`'s / `PlatformConfigPanel`'s `parseWholeNumberInput` pattern. Empty/invalid
 * input falls back to 0 rather than `NaN`. */
function parseWholeNumberInput(raw: string, max: number): number {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(max, Math.max(0, parsed));
}

const FIELD_LABEL_ROW_CLASSES = "flex items-center gap-1.5";
const FIELD_LABEL_CLASSES = "text-[12px] font-bold text-ink";
const FIELD_HELP_CLASSES = "min-w-0 break-words text-[12px] font-medium text-gray-500";
const FIELD_BOX_CLASSES =
  "flex min-h-[44px] w-full min-w-0 items-center justify-between gap-2 rounded-[10px] border border-border bg-white px-[17px] focus-within:border-primary";
const FIELD_INPUT_CLASSES =
  "min-w-0 flex-1 bg-transparent text-[14px] font-bold text-ink focus:outline-none disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
const UNIT_LABEL_CLASSES = "shrink-0 text-[13px] font-semibold text-gray-500";

/**
 * "Program Rules" card — the fourth and last of the four Reseller Program sections (Figma
 * "reseller program", node 1177:1550): eligibility, attribution, payout, and promotion limits
 * applied to every registered reseller. Follows the same draft-state-plus-Save convention as this
 * screen's other cards. The two pink banners ("Self-purchase detection" / "Allow resellers to
 * promote all products") match the Figma design's own highlighted-row treatment for its two
 * platform-wide toggle rules, distinct from the plain bordered boxes used for the four numeric/
 * dropdown fields.
 */
export function ResellerProgramRulesCard() {
  const [savedRules, setSavedRules] = useState<ResellerProgramRules>(RESELLER_PROGRAM_RULES);
  const [draftRules, setDraftRules] = useState<ResellerProgramRules>(RESELLER_PROGRAM_RULES);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const cookieDurationId = useId();
  const minOrderValueId = useId();
  const minPayoutThresholdId = useId();
  const payoutCycleId = useId();
  const maxLinksId = useId();

  const isDirty = useMemo(
    () =>
      draftRules.cookieDurationHours !== savedRules.cookieDurationHours ||
      draftRules.minimumOrderValueForCommission !== savedRules.minimumOrderValueForCommission ||
      draftRules.minimumPayoutThreshold !== savedRules.minimumPayoutThreshold ||
      draftRules.payoutCycle !== savedRules.payoutCycle ||
      draftRules.selfPurchaseDetectionEnabled !== savedRules.selfPurchaseDetectionEnabled ||
      draftRules.maxLinksPerResellerPerDay !== savedRules.maxLinksPerResellerPerDay ||
      draftRules.allowPromoteAllProducts !== savedRules.allowPromoteAllProducts,
    [draftRules, savedRules]
  );

  function updateDraft<K extends keyof ResellerProgramRules>(field: K, value: ResellerProgramRules[K]) {
    setDraftRules((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching this screen's other cards.
    await new Promise((resolve) => setTimeout(resolve, 600));
    Object.assign(RESELLER_PROGRAM_RULES, draftRules);
    setSavedRules(draftRules);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 rounded-[10px] border border-border bg-white p-[19px]">
      <div className="min-w-0">
        <h2 className="text-[15px] font-extrabold text-ink">Program Rules</h2>
        <p className="mt-1 min-w-0 break-words text-[12px] font-medium text-gray-500">
          Set eligibility, attribution, payout, and promotion limits for all registered resellers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-2">
          <div className={FIELD_LABEL_ROW_CLASSES}>
            <label htmlFor={cookieDurationId} className={FIELD_LABEL_CLASSES}>
              Cookie duration
            </label>
            <InfoIcon className="size-3.5 shrink-0 text-gray-500" />
          </div>
          <p className={FIELD_HELP_CLASSES}>How long after a click is the reseller credited for a sale.</p>
          <div className={FIELD_BOX_CLASSES}>
            <input
              id={cookieDurationId}
              type="number"
              min={0}
              max={720}
              step={1}
              inputMode="numeric"
              value={draftRules.cookieDurationHours}
              onChange={(event) => updateDraft("cookieDurationHours", parseWholeNumberInput(event.target.value, 720))}
              disabled={isSaving}
              className={FIELD_INPUT_CLASSES}
            />
            <span className={UNIT_LABEL_CLASSES}>hours</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div className={FIELD_LABEL_ROW_CLASSES}>
            <label htmlFor={minOrderValueId} className={FIELD_LABEL_CLASSES}>
              Minimum order value for commission
            </label>
            <InfoIcon className="size-3.5 shrink-0 text-gray-500" />
          </div>
          <p className={FIELD_HELP_CLASSES}>Orders below this value do not earn reseller commission.</p>
          <div className={FIELD_BOX_CLASSES}>
            <span className="shrink-0 text-[14px] font-bold text-ink">₹</span>
            <input
              id={minOrderValueId}
              type="number"
              min={0}
              max={100000}
              step={1}
              inputMode="numeric"
              value={draftRules.minimumOrderValueForCommission}
              onChange={(event) => updateDraft("minimumOrderValueForCommission", parseWholeNumberInput(event.target.value, 100000))}
              disabled={isSaving}
              className={FIELD_INPUT_CLASSES}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <div className={FIELD_LABEL_ROW_CLASSES}>
            <label htmlFor={minPayoutThresholdId} className={FIELD_LABEL_CLASSES}>
              Minimum payout threshold
            </label>
            <InfoIcon className="size-3.5 shrink-0 text-gray-500" />
          </div>
          <p className={FIELD_HELP_CLASSES}>Reseller must accumulate this amount before payout is triggered.</p>
          <div className={FIELD_BOX_CLASSES}>
            <span className="shrink-0 text-[14px] font-bold text-ink">₹</span>
            <input
              id={minPayoutThresholdId}
              type="number"
              min={0}
              max={100000}
              step={1}
              inputMode="numeric"
              value={draftRules.minimumPayoutThreshold}
              onChange={(event) => updateDraft("minimumPayoutThreshold", parseWholeNumberInput(event.target.value, 100000))}
              disabled={isSaving}
              className={FIELD_INPUT_CLASSES}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={payoutCycleId} className={FIELD_LABEL_CLASSES}>
            Payout cycle
          </label>
          <div className={FIELD_BOX_CLASSES}>
            <select
              id={payoutCycleId}
              value={draftRules.payoutCycle}
              onChange={(event) => updateDraft("payoutCycle", event.target.value as ResellerPayoutCycle)}
              disabled={isSaving}
              className={`${FIELD_INPUT_CLASSES} appearance-none`}
            >
              {RESELLER_PAYOUT_CYCLE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="size-3.5 shrink-0 text-gray-400" />
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3 rounded-[10px] bg-[#fff2f4] px-4 py-3.5 sm:col-span-2">
          <div className="min-w-0 flex-1">
            <p className="min-w-0 break-words text-[13px] font-bold text-ink">Self-purchase detection</p>
            <p className="min-w-0 break-words text-[12px] font-medium text-gray-500">
              Block resellers from earning commission on their own purchases.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ToggleSwitch
              checked={draftRules.selfPurchaseDetectionEnabled}
              onChange={() => updateDraft("selfPurchaseDetectionEnabled", !draftRules.selfPurchaseDetectionEnabled)}
              ariaLabel={`Toggle self-purchase detection (currently ${draftRules.selfPurchaseDetectionEnabled ? "on" : "off"})`}
            />
            <span className={`whitespace-nowrap text-[12px] font-bold ${draftRules.selfPurchaseDetectionEnabled ? "text-success" : "text-gray-500"}`}>
              {draftRules.selfPurchaseDetectionEnabled ? "On" : "Off"}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={maxLinksId} className={FIELD_LABEL_CLASSES}>
            Max links per reseller per day
          </label>
          <div className={FIELD_BOX_CLASSES}>
            <input
              id={maxLinksId}
              type="number"
              min={0}
              max={1000}
              step={1}
              inputMode="numeric"
              value={draftRules.maxLinksPerResellerPerDay}
              onChange={(event) => updateDraft("maxLinksPerResellerPerDay", parseWholeNumberInput(event.target.value, 1000))}
              disabled={isSaving}
              className={FIELD_INPUT_CLASSES}
            />
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3 rounded-[10px] bg-[#fff2f4] px-4 py-3.5">
          <div className="min-w-0 flex-1">
            <p className="min-w-0 break-words text-[13px] font-bold text-ink">Allow resellers to promote all products</p>
            <p className="min-w-0 break-words text-[12px] font-medium text-gray-500">
              When on, resellers can generate links for any active product. When off, vendors must opt-in.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ToggleSwitch
              checked={draftRules.allowPromoteAllProducts}
              onChange={() => updateDraft("allowPromoteAllProducts", !draftRules.allowPromoteAllProducts)}
              ariaLabel={`Toggle allowing resellers to promote all products (currently ${draftRules.allowPromoteAllProducts ? "on" : "off"})`}
            />
            <span className={`whitespace-nowrap text-[12px] font-bold ${draftRules.allowPromoteAllProducts ? "text-success" : "text-gray-500"}`}>
              {draftRules.allowPromoteAllProducts ? "On" : "Off"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-[10px] bg-primary px-[17px] text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SaveIcon className="size-3.5" />
          {isSaving ? "Saving…" : "Save Rules"}
        </button>
        {justSaved && <Badge variant="success">Saved</Badge>}
      </div>
    </div>
  );
}
