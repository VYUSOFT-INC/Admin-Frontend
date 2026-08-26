"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { InfoIcon } from "@/components/icons/SettingsIcons";
import { RESELLER_COMMISSION_RATES, type ResellerCommissionRate } from "@/lib/mock-data/settings";

/** Clamp + coerce a rate input's raw string value to a percent in [0, 100], keeping one decimal
 * place (this table's rates include half-percents like 7.5/5.5, unlike `CommissionRatesPanel`'s
 * whole-percent-only vendor rates). Empty/invalid input falls back to 0 rather than `NaN`. */
function parseRateInput(raw: string): number {
  const parsed = Number.parseFloat(raw);
  if (Number.isNaN(parsed)) return 0;
  return Math.round(Math.min(100, Math.max(0, parsed)) * 10) / 10;
}

const RATE_BOX_CLASSES =
  "flex h-[36px] w-[100px] shrink-0 items-center justify-center gap-1 rounded-[10px] border border-border bg-white px-3 focus-within:border-primary disabled:opacity-60";
const RATE_INPUT_CLASSES =
  "min-w-0 flex-1 bg-transparent text-right text-[14px] font-bold text-ink focus:outline-none disabled:opacity-60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

/**
 * "Category-wise Commission Rates" card — the second of the four Reseller Program sections
 * (Figma "reseller program", node 1177:1389): what MIVYU pays *resellers* per category, distinct
 * from the vendor-side rates on `CommissionRatesPanel`. Follows the same save-round-trip
 * convention as every other card on this screen (draft state, `RESELLER_COMMISSION_RATES` only
 * updates on Save, Save disabled until something's actually changed).
 */
export function ResellerCommissionRatesCard() {
  const [savedRates, setSavedRates] = useState<ResellerCommissionRate[]>(RESELLER_COMMISSION_RATES);
  const [draftRates, setDraftRates] = useState<ResellerCommissionRate[]>(RESELLER_COMMISSION_RATES);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = useMemo(
    () => draftRates.some((draft, index) => draft.commissionPercent !== savedRates[index].commissionPercent),
    [draftRates, savedRates]
  );

  function handleRateChange(index: number, value: string) {
    const parsed = parseRateInput(value);
    setDraftRates((prev) => prev.map((rate, i) => (i === index ? { ...rate, commissionPercent: parsed } : rate)));
  }

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `CommissionRatesPanel`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    draftRates.forEach((draft, index) => {
      Object.assign(RESELLER_COMMISSION_RATES[index], draft);
    });
    setSavedRates(draftRates);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3.5 rounded-[10px] border border-border bg-white p-[19px]">
      <div className="min-w-0">
        <h2 className="text-[15px] font-extrabold text-ink">Category-wise Commission Rates</h2>
        <p className="mt-1 min-w-0 break-words text-[12px] font-medium text-gray-500">
          This is what MIVYU pays resellers — separate from vendor commission paid to MIVYU.
        </p>
      </div>

      <div className="min-w-0 overflow-x-auto rounded-[10px] border border-border">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Commission %</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {draftRates.map((rate, index) => (
              <TableRow key={rate.category}>
                <TableCell className="min-w-0 break-words font-semibold">{rate.category}</TableCell>
                <TableCell>
                  <label className={RATE_BOX_CLASSES}>
                    <span className="sr-only">{rate.category} commission percent</span>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      step={0.5}
                      inputMode="decimal"
                      value={rate.commissionPercent}
                      onChange={(event) => handleRateChange(index, event.target.value)}
                      disabled={isSaving}
                      className={RATE_INPUT_CLASSES}
                    />
                    <span className="shrink-0 text-[14px] font-bold text-ink">%</span>
                  </label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <span className="shrink-0 text-[12px] font-bold text-ink">Effective from: Next Month (1st)</span>
        <div className="flex min-w-0 items-center gap-1.5">
          <InfoIcon className="size-3.5 shrink-0 text-gray-500" />
          <span className="min-w-0 break-words text-[12px] font-medium text-gray-500">
            Rate changes take effect from the 1st of next month to protect in-flight reseller earnings.
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="inline-flex h-10 min-w-[130px] items-center justify-center gap-2 rounded-[10px] bg-primary px-[17px] text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SaveIcon className="size-3.5" />
          {isSaving ? "Saving…" : "Save Changes"}
        </button>
        {justSaved && <Badge variant="success">Saved</Badge>}
      </div>
    </div>
  );
}
