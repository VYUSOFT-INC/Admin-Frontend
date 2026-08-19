"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { GST_TYPE_RULES_SETTINGS, type GstTypeRulesSettings } from "@/lib/mock-data/tax-compliance";

const FIELD_LABEL_CLASSES = "text-[12px] font-extrabold uppercase tracking-[0.48px] text-gray-500";

/**
 * "GST Type Rules" card — the third of the four Tax & Compliance sections (Figma "tax and
 * compliance", node 1143:2483): automatic IGST/CGST+SGST selection based on vendor and customer
 * location, plus whether the customer invoice shows that breakdown. The "Automatic order tax
 * selection" info strip is static platform logic (Figma shows no control for it, just an
 * explanatory strip), matching `PickupStorePanel`'s info-strip convention; only "Customer Invoice
 * Visibility" below it is editable.
 */
export function GstTypeRulesCard() {
  const [savedSettings, setSavedSettings] = useState<GstTypeRulesSettings>(GST_TYPE_RULES_SETTINGS);
  const [draftSettings, setDraftSettings] = useState<GstTypeRulesSettings>(GST_TYPE_RULES_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = useMemo(
    () => draftSettings.showGstBreakdownInCustomerInvoice !== savedSettings.showGstBreakdownInCustomerInvoice,
    [draftSettings, savedSettings]
  );

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `GstConfigurationCard`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    Object.assign(GST_TYPE_RULES_SETTINGS, draftSettings);
    setSavedSettings(draftSettings);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-[16px] font-extrabold text-ink">GST Type Rules</h2>
        <p className="mt-1 min-w-0 break-words text-[12.5px] font-medium text-gray-500">
          Automatically apply the correct GST treatment based on vendor and customer location.
        </p>
      </div>

      <div className="min-w-0 rounded-[10px] border border-border bg-surface-tint px-[17px] py-[15px]">
        <p className="min-w-0 break-words text-[13px] font-extrabold text-ink">Automatic order tax selection</p>
        <p className="mt-2 min-w-0 break-words text-[13px] font-medium text-gray-500">
          Inter-state orders use IGST. Intra-state orders use CGST + SGST. This is automatically applied based on vendor and customer location.
        </p>
      </div>

      <div className="flex min-w-0 flex-col gap-2 w-full">
        <span className={FIELD_LABEL_CLASSES}>Customer Invoice Visibility</span>
        <div className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-[10px] border border-border bg-[#fff8fb] px-3.5 py-3">
          <span className="min-w-0 break-words text-[13px] font-bold text-ink">Show GST breakdown in customer invoice</span>
          <div className="flex shrink-0 items-center gap-2.5">
            <ToggleSwitch
              checked={draftSettings.showGstBreakdownInCustomerInvoice}
              onChange={() => setDraftSettings((prev) => ({ ...prev, showGstBreakdownInCustomerInvoice: !prev.showGstBreakdownInCustomerInvoice }))}
              ariaLabel={`Toggle GST breakdown visibility on customer invoices (currently ${draftSettings.showGstBreakdownInCustomerInvoice ? "on" : "off"})`}
            />
            <span
              className={`whitespace-nowrap text-[12px] font-bold ${draftSettings.showGstBreakdownInCustomerInvoice ? "text-success" : "text-gray-500"}`}
            >
              {draftSettings.showGstBreakdownInCustomerInvoice ? "On" : "Off"}
            </span>
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
