"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { COMMISSION_CATEGORY_RATES, type CommissionCategoryRate } from "@/lib/mock-data/settings";

/** Clamp + coerce a rate input's raw string value to a whole percent in [0, 100]. Empty/invalid
 * input falls back to 0 rather than `NaN`, so a cleared field never breaks the Save comparison. */
function parseRateInput(raw: string): number {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(100, Math.max(0, parsed));
}

const RATE_INPUT_CLASSES =
  "h-[34px] w-[72px] rounded-lg border border-border bg-[#fff8fb] text-center text-[13px] font-semibold text-ink focus:outline-none focus:border-primary disabled:opacity-60";

/**
 * "Commission Rates" settings panel (Figma "settings - commision rates", node 1071:8806) — a
 * per-category table of Delivery/In-Store Pickup commission percentages plus a Save Changes
 * action. Edits are held in local state and only committed to the shared
 * `COMMISSION_CATEGORY_RATES` mock array on Save, matching `CouponForm`'s / `BannersGrid`'s
 * save-round-trip pattern (`isSaving` while the mock request is in flight, a transient "Saved"
 * badge after, Save disabled until something's actually changed). See `settings.ts` for why this
 * mock table isn't wired to the flat 10% commission already hardcoded in `payments.ts`.
 */
export function CommissionRatesPanel() {
  const [savedRates, setSavedRates] = useState<CommissionCategoryRate[]>(COMMISSION_CATEGORY_RATES);
  const [draftRates, setDraftRates] = useState<CommissionCategoryRate[]>(COMMISSION_CATEGORY_RATES);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = useMemo(
    () => draftRates.some((draft, index) => draft.deliveryRate !== savedRates[index].deliveryRate || draft.pickupRate !== savedRates[index].pickupRate),
    [draftRates, savedRates]
  );

  function handleRateChange(index: number, field: "deliveryRate" | "pickupRate", value: string) {
    const parsed = parseRateInput(value);
    setDraftRates((prev) => prev.map((rate, i) => (i === index ? { ...rate, [field]: parsed } : rate)));
  }

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `CouponForm`'s / `BannersGrid`'s save pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Mutate the exact objects in place — same reference held inside the shared
    // `COMMISSION_CATEGORY_RATES` array, matching the pattern `CouponForm` uses for `COUPONS`.
    draftRates.forEach((draft, index) => {
      Object.assign(COMMISSION_CATEGORY_RATES[index], draft);
    });
    setSavedRates(draftRates);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <Card className="flex min-w-0 flex-1 flex-col">
      <CardHeader
        title="Commission Rates"
        description="Set commission percentages by category and fulfillment type. Changes apply to future settlements."
      />

      <div className="flex flex-col gap-5 p-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Delivery (%)</TableHeaderCell>
              <TableHeaderCell>In-Store Pickup (%)</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {draftRates.map((rate, index) => (
              <TableRow key={rate.category}>
                <TableCell className="min-w-0 break-words font-semibold">{rate.category}</TableCell>
                <TableCell>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    inputMode="numeric"
                    aria-label={`${rate.category} delivery commission percent`}
                    value={rate.deliveryRate}
                    onChange={(event) => handleRateChange(index, "deliveryRate", event.target.value)}
                    disabled={isSaving}
                    className={RATE_INPUT_CLASSES}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    inputMode="numeric"
                    aria-label={`${rate.category} in-store pickup commission percent`}
                    value={rate.pickupRate}
                    onChange={(event) => handleRateChange(index, "pickupRate", event.target.value)}
                    disabled={isSaving}
                    className={RATE_INPUT_CLASSES}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="min-w-0 rounded-lg border-l-[3px] border-border bg-[#fffdfe] py-2.5 pl-[17px] pr-3.5">
          <p className="min-w-0 break-words text-[11px] font-medium text-gray-500">
            Walk-in commission applies only when the purchase is confirmed through the MIVYU platform at point of sale. Off-platform
            walk-in transactions are not tracked.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-primary px-6 text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SaveIcon className="size-3.5" />
            {isSaving ? "Saving…" : "Save Changes"}
          </button>
          {justSaved && <Badge variant="success">Saved</Badge>}
        </div>
      </div>
    </Card>
  );
}
