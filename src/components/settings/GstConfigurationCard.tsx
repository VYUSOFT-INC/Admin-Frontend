"use client";

import { useId, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { ChevronDownIcon, IdCardIcon, SaveIcon } from "@/components/icons/VendorDetailIcons";
import {
  GST_CONFIG_SETTINGS,
  INVOICE_NUMBERING_FORMAT_OPTIONS,
  type GstConfigSettings,
  type InvoiceNumberingFormat,
} from "@/lib/mock-data/tax-compliance";

const FIELD_LABEL_CLASSES = "text-[12px] font-extrabold uppercase tracking-[0.48px] text-gray-500";
const FIELD_BOX_CLASSES = "flex min-h-[44px] w-full items-center gap-2 rounded-[10px] border border-border bg-[#fff8fb] px-3.5";
const FIELD_INPUT_CLASSES = "min-w-0 flex-1 bg-transparent text-[13px] font-bold text-ink focus:outline-none disabled:opacity-60";

/**
 * "GST Configuration" card — the first of the four Tax & Compliance sections (Figma "tax and
 * compliance", node 1143:2483): invoicing identifiers and GST values used across platform-level
 * settlement and invoicing workflows. Follows `ShippingSlaConfigCard`'s save-round-trip
 * convention: edits live in local draft state, `GST_CONFIG_SETTINGS` only updates on Save, and
 * Save stays disabled until something's actually changed. "Preview Invoice Template" is a
 * standalone mock (Figma doesn't show a template preview state) that renders a live sample
 * invoice number built from the *draft* prefix/format so it reads as a genuine, non-decorative
 * control rather than a no-op button.
 */
export function GstConfigurationCard() {
  const [savedSettings, setSavedSettings] = useState<GstConfigSettings>(GST_CONFIG_SETTINGS);
  const [draftSettings, setDraftSettings] = useState<GstConfigSettings>(GST_CONFIG_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const gstinId = useId();
  const rateId = useId();
  const prefixId = useId();
  const formatId = useId();

  const isDirty = useMemo(
    () =>
      draftSettings.platformGstin !== savedSettings.platformGstin ||
      draftSettings.gstRateOnCommissionPercent !== savedSettings.gstRateOnCommissionPercent ||
      draftSettings.invoicePrefix !== savedSettings.invoicePrefix ||
      draftSettings.invoiceNumberingFormat !== savedSettings.invoiceNumberingFormat ||
      draftSettings.autoGenerateInvoicesEnabled !== savedSettings.autoGenerateInvoicesEnabled,
    [draftSettings, savedSettings]
  );

  function updateDraft<K extends keyof GstConfigSettings>(field: K, value: GstConfigSettings[K]) {
    setDraftSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `ShippingSlaConfigCard`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    Object.assign(GST_CONFIG_SETTINGS, draftSettings);
    setSavedSettings(draftSettings);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  const sampleInvoiceNumber =
    draftSettings.invoiceNumberingFormat === "Fiscal Year Reset"
      ? `${draftSettings.invoicePrefix}/2026-27/0001`
      : draftSettings.invoiceNumberingFormat === "Custom Prefix + Sequence"
        ? `${draftSettings.invoicePrefix}-CUST-000001`
        : `${draftSettings.invoicePrefix}-000001`;

  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-[16px] font-extrabold text-ink">GST Configuration</h2>
        <p className="mt-1 min-w-0 break-words text-[12.5px] font-medium text-gray-500">
          Set invoicing identifiers and GST values used across platform-level settlement and invoicing workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={gstinId} className={FIELD_LABEL_CLASSES}>
            Platform GSTIN
          </label>
          <div className={FIELD_BOX_CLASSES}>
            <input
              id={gstinId}
              type="text"
              value={draftSettings.platformGstin}
              onChange={(event) => updateDraft("platformGstin", event.target.value)}
              disabled={isSaving}
              className={FIELD_INPUT_CLASSES}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={rateId} className={FIELD_LABEL_CLASSES}>
            GST Rate on Commission
          </label>
          <div className={FIELD_BOX_CLASSES}>
            <input
              id={rateId}
              type="number"
              min={0}
              max={100}
              step={1}
              inputMode="numeric"
              value={draftSettings.gstRateOnCommissionPercent}
              onChange={(event) => updateDraft("gstRateOnCommissionPercent", Math.min(100, Math.max(0, Number.parseInt(event.target.value, 10) || 0)))}
              disabled={isSaving}
              className={FIELD_INPUT_CLASSES}
            />
            <span className="shrink-0 text-[13px] font-bold text-gray-500">%</span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={prefixId} className={FIELD_LABEL_CLASSES}>
            Invoice Prefix
          </label>
          <div className={FIELD_BOX_CLASSES}>
            <input
              id={prefixId}
              type="text"
              value={draftSettings.invoicePrefix}
              onChange={(event) => updateDraft("invoicePrefix", event.target.value)}
              disabled={isSaving}
              className={FIELD_INPUT_CLASSES}
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={formatId} className={FIELD_LABEL_CLASSES}>
            Invoice Numbering Format
          </label>
          <div className={`${FIELD_BOX_CLASSES} justify-between`}>
            <select
              id={formatId}
              value={draftSettings.invoiceNumberingFormat}
              onChange={(event) => updateDraft("invoiceNumberingFormat", event.target.value as InvoiceNumberingFormat)}
              disabled={isSaving}
              className={`${FIELD_INPUT_CLASSES} appearance-none`}
            >
              {INVOICE_NUMBERING_FORMAT_OPTIONS.map((format) => (
                <option key={format} value={format}>
                  {format}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="size-3.5 shrink-0 text-gray-400" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2 sm:col-span-2 lg:col-span-3">
          <span className={FIELD_LABEL_CLASSES}>Invoice Generation</span>
          <div className={`${FIELD_BOX_CLASSES} justify-between`}>
            <span className="min-w-0 break-words text-[13px] font-bold text-ink">Auto-generate invoices for all orders</span>
            <div className="flex shrink-0 items-center gap-2.5">
              <ToggleSwitch
                checked={draftSettings.autoGenerateInvoicesEnabled}
                onChange={() => updateDraft("autoGenerateInvoicesEnabled", !draftSettings.autoGenerateInvoicesEnabled)}
                ariaLabel={`Toggle automatic invoice generation (currently ${draftSettings.autoGenerateInvoicesEnabled ? "on" : "off"})`}
              />
              <span className={`whitespace-nowrap text-[12px] font-bold ${draftSettings.autoGenerateInvoicesEnabled ? "text-success" : "text-gray-500"}`}>
                {draftSettings.autoGenerateInvoicesEnabled ? "On" : "Off"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <div role="status" className="min-w-0 break-words rounded-[10px] border border-border bg-surface-tint px-4 py-3 text-xs font-semibold text-gray-500">
          Sample invoice number under <span className="font-bold text-ink">{draftSettings.invoiceNumberingFormat}</span>:{" "}
          <span className="font-bold text-ink">{sampleInvoiceNumber}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowPreview((prev) => !prev)}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[10px] border border-border bg-white px-[15px] text-[13px] font-bold text-ink transition-colors hover:bg-surface-tint"
        >
          <IdCardIcon className="size-3.5" />
          {showPreview ? "Hide Invoice Preview" : "Preview Invoice Template"}
        </button>
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
