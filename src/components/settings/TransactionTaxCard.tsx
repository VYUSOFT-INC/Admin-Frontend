"use client";

import { useId, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { TDS_SETTINGS, type TdsSettings } from "@/lib/mock-data/tax-compliance";

const FIELD_LABEL_CLASSES = "text-[12px] font-extrabold uppercase tracking-[0.48px] text-gray-500";
const FIELD_BOX_CLASSES = "flex min-h-[44px] w-full items-center gap-2 rounded-[10px] border border-border bg-[#fff8fb] px-3.5";
const FIELD_INPUT_CLASSES = "min-w-0 flex-1 bg-transparent text-[13px] font-bold text-ink focus:outline-none disabled:opacity-60";

/**
 * "Transaction Tax (TDS)" card — the second of the four Tax & Compliance sections (Figma "tax and
 * compliance", node 1143:2483): marketplace TDS treatment applied to vendor settlements and
 * monthly tax reporting. Follows `GstConfigurationCard`'s save-round-trip convention.
 */
export function TransactionTaxCard() {
  const [savedSettings, setSavedSettings] = useState<TdsSettings>(TDS_SETTINGS);
  const [draftSettings, setDraftSettings] = useState<TdsSettings>(TDS_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const rateLabelId = useId();
  const thresholdId = useId();

  const isDirty = useMemo(
    () =>
      draftSettings.tdsRateLabel !== savedSettings.tdsRateLabel ||
      draftSettings.annualThresholdRupees !== savedSettings.annualThresholdRupees ||
      draftSettings.settlementDeductionEnabled !== savedSettings.settlementDeductionEnabled ||
      draftSettings.monthlyReportingEnabled !== savedSettings.monthlyReportingEnabled,
    [draftSettings, savedSettings]
  );

  function updateDraft<K extends keyof TdsSettings>(field: K, value: TdsSettings[K]) {
    setDraftSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `GstConfigurationCard`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    Object.assign(TDS_SETTINGS, draftSettings);
    setSavedSettings(draftSettings);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-[16px] font-extrabold text-ink">Transaction Tax (TDS)</h2>
        <p className="mt-1 min-w-0 break-words text-[12.5px] font-medium text-gray-500">
          Review marketplace TDS treatment applied to vendor settlements and monthly tax reporting.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={rateLabelId} className={FIELD_LABEL_CLASSES}>
            TDS Rate
          </label>
          <div className={FIELD_BOX_CLASSES}>
            <input
              id={rateLabelId}
              type="text"
              value={draftSettings.tdsRateLabel}
              onChange={(event) => updateDraft("tdsRateLabel", event.target.value)}
              disabled={isSaving}
              className={FIELD_INPUT_CLASSES}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={thresholdId} className={FIELD_LABEL_CLASSES}>
            Annual Threshold
          </label>
          <div className={FIELD_BOX_CLASSES}>
            <span className="shrink-0 text-[14px] font-bold text-gray-500">₹</span>
            <input
              id={thresholdId}
              type="number"
              min={0}
              step={1000}
              inputMode="numeric"
              value={draftSettings.annualThresholdRupees}
              onChange={(event) => updateDraft("annualThresholdRupees", Math.max(0, Number.parseInt(event.target.value, 10) || 0))}
              disabled={isSaving}
              className={FIELD_INPUT_CLASSES}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <span className={FIELD_LABEL_CLASSES}>Settlement Deduction</span>
          <div className={`${FIELD_BOX_CLASSES} justify-between`}>
            <span className="min-w-0 break-words text-[13px] font-bold text-ink">Automatically deduct TDS from vendor settlements</span>
            <div className="flex shrink-0 items-center gap-2.5">
              <ToggleSwitch
                checked={draftSettings.settlementDeductionEnabled}
                onChange={() => updateDraft("settlementDeductionEnabled", !draftSettings.settlementDeductionEnabled)}
                ariaLabel={`Toggle automatic TDS settlement deduction (currently ${draftSettings.settlementDeductionEnabled ? "on" : "off"})`}
              />
              <span className={`whitespace-nowrap text-[12px] font-bold ${draftSettings.settlementDeductionEnabled ? "text-success" : "text-gray-500"}`}>
                {draftSettings.settlementDeductionEnabled ? "On" : "Off"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <span className={FIELD_LABEL_CLASSES}>Monthly Reporting</span>
          <div className={`${FIELD_BOX_CLASSES} justify-between`}>
            <span className="min-w-0 break-words text-[13px] font-bold text-ink">Include TDS certificate in monthly report</span>
            <div className="flex shrink-0 items-center gap-2.5">
              <ToggleSwitch
                checked={draftSettings.monthlyReportingEnabled}
                onChange={() => updateDraft("monthlyReportingEnabled", !draftSettings.monthlyReportingEnabled)}
                ariaLabel={`Toggle TDS certificate in monthly report (currently ${draftSettings.monthlyReportingEnabled ? "on" : "off"})`}
              />
              <span className={`whitespace-nowrap text-[12px] font-bold ${draftSettings.monthlyReportingEnabled ? "text-success" : "text-gray-500"}`}>
                {draftSettings.monthlyReportingEnabled ? "On" : "Off"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2 sm:col-span-2 lg:col-span-3">
          <span className={FIELD_LABEL_CLASSES}>Note</span>
          <div className="min-w-0 rounded-[10px] bg-primary-light px-3.5 py-3">
            <p className="min-w-0 break-words text-[13px] font-medium text-ink">
              TDS certificates are auto-generated and available for vendors to download from their Payments section.
            </p>
          </div>
        </div>
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
    </Card>
  );
}
