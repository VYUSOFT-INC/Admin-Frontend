"use client";

import { useId, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { MailIcon } from "@/components/icons/OrderIcons";
import { PLATFORM_CONFIG_SETTINGS, type PlatformConfigSettings } from "@/lib/mock-data/settings";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Clamp + coerce a whole-number input's raw string value to a non-negative integer, matching
 * `CommissionRatesPanel`'s / `PayoutSchedulePanel`'s `parseRateInput`/`parseWholeNumberInput`
 * pattern. Empty/invalid input falls back to 0 rather than `NaN`. */
function parseWholeNumberInput(raw: string, max: number): number {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(max, Math.max(0, parsed));
}

const FIELD_LABEL_CLASSES = "text-[13px] font-bold text-ink";
const HELP_TEXT_CLASSES = "min-w-0 break-words text-[11px] font-medium text-gray-500";
const SPLIT_INPUT_WRAPPER_CLASSES = "flex h-[38px] w-full items-stretch overflow-hidden rounded-[10px] border border-border bg-[#fff8fb]";
const SPLIT_INPUT_CLASSES = "min-w-0 flex-1 bg-transparent px-3 text-[13px] font-semibold text-ink focus:outline-none disabled:opacity-60";
const SPLIT_SUFFIX_CLASSES = "flex shrink-0 items-center whitespace-nowrap border-l border-border bg-[#fffbfc] px-3 text-xs font-semibold text-gray-500";
const SPLIT_PREFIX_CLASSES = "flex shrink-0 items-center whitespace-nowrap border-r border-border bg-[#fffbfc] px-3 text-xs font-bold text-gray-500";

/**
 * "Platform Config" settings panel (Figma "platform config", node 1071:9795) — global platform
 * rules that apply to every vendor and customer: minimum order value, maximum return window, COD
 * availability, GST rate, max delivery attempts before RTO, and the customer support email shown
 * on order/support pages. Follows `PayoutSchedulePanel`'s / `CommissionRatesPanel`'s save-round-trip
 * conventions: edits live in local draft state, `PLATFORM_CONFIG_SETTINGS` only updates on Save,
 * and Save stays disabled until something's actually changed (or fails validation). See
 * `settings.ts` for why this mock config isn't wired to `orders.ts`/`returns.ts`/`payments.ts`.
 */
export function PlatformConfigPanel() {
  const [savedSettings, setSavedSettings] = useState<PlatformConfigSettings>(PLATFORM_CONFIG_SETTINGS);
  const [draftSettings, setDraftSettings] = useState<PlatformConfigSettings>(PLATFORM_CONFIG_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const minOrderValueId = useId();
  const returnWindowId = useId();
  const gstRateId = useId();
  const maxAttemptsId = useId();
  const supportEmailId = useId();

  const isDirty = useMemo(
    () =>
      draftSettings.minimumOrderValue !== savedSettings.minimumOrderValue ||
      draftSettings.maximumReturnWindowDays !== savedSettings.maximumReturnWindowDays ||
      draftSettings.codAvailable !== savedSettings.codAvailable ||
      draftSettings.gstRatePercent !== savedSettings.gstRatePercent ||
      draftSettings.maxDeliveryAttemptsBeforeRTO !== savedSettings.maxDeliveryAttemptsBeforeRTO ||
      draftSettings.customerSupportEmail !== savedSettings.customerSupportEmail,
    [draftSettings, savedSettings]
  );

  function updateDraft<K extends keyof PlatformConfigSettings>(field: K, value: PlatformConfigSettings[K]) {
    setDraftSettings((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  }

  async function handleSave() {
    const trimmedEmail = draftSettings.customerSupportEmail.trim();
    if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail)) {
      setFormError("Enter a valid customer support email address.");
      return;
    }

    setIsSaving(true);
    // No backend yet — mock the round trip, matching `PayoutSchedulePanel`'s / `CommissionRatesPanel`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    const nextSettings: PlatformConfigSettings = { ...draftSettings, customerSupportEmail: trimmedEmail };
    // Mutate the shared `PLATFORM_CONFIG_SETTINGS` object in place, same pattern `PayoutSchedulePanel`
    // uses for `PAYOUT_SCHEDULE_SETTINGS`.
    Object.assign(PLATFORM_CONFIG_SETTINGS, nextSettings);
    setSavedSettings(nextSettings);
    setDraftSettings(nextSettings);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <Card className="flex min-w-0 flex-1 flex-col">
      <div className="flex flex-col gap-1 px-8 pt-7">
        <h2 className="text-base font-extrabold tracking-[-0.48px] text-ink">Platform Configuration</h2>
        <p className="min-w-0 break-words text-xs font-medium text-gray-500">
          Set global platform rules that apply to all vendors and customers.
        </p>
      </div>

      <div className="flex max-w-[560px] flex-col gap-5 px-8 pt-6 pb-9">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={minOrderValueId} className={FIELD_LABEL_CLASSES}>
            Minimum Order Value
          </label>
          <div className={SPLIT_INPUT_WRAPPER_CLASSES}>
            <span className={SPLIT_PREFIX_CLASSES}>₹</span>
            <input
              id={minOrderValueId}
              type="number"
              min={0}
              max={100000}
              step={1}
              inputMode="numeric"
              value={draftSettings.minimumOrderValue}
              onChange={(event) => updateDraft("minimumOrderValue", parseWholeNumberInput(event.target.value, 100000))}
              disabled={isSaving}
              className={SPLIT_INPUT_CLASSES}
            />
          </div>
          <p className={HELP_TEXT_CLASSES}>Customers cannot place orders below this amount.</p>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={returnWindowId} className={FIELD_LABEL_CLASSES}>
            Maximum Return Window
          </label>
          <div className={SPLIT_INPUT_WRAPPER_CLASSES}>
            <input
              id={returnWindowId}
              type="number"
              min={0}
              max={90}
              step={1}
              inputMode="numeric"
              value={draftSettings.maximumReturnWindowDays}
              onChange={(event) => updateDraft("maximumReturnWindowDays", parseWholeNumberInput(event.target.value, 90))}
              disabled={isSaving}
              className={SPLIT_INPUT_CLASSES}
            />
            <span className={SPLIT_SUFFIX_CLASSES}>days</span>
          </div>
          <p className={HELP_TEXT_CLASSES}>Number of days after delivery within which a customer can raise a return request.</p>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex min-w-0 flex-col gap-1.5">
          <span className={FIELD_LABEL_CLASSES}>Cash on Delivery (COD)</span>
          <div className="flex min-w-0 items-center justify-between gap-3 rounded-[10px] border border-border bg-[#fffdfe] px-4 py-3.5">
            <div className="min-w-0">
              <p className="min-w-0 break-words text-[13px] font-bold text-ink">COD Available</p>
              <p className="min-w-0 break-words text-[11px] font-medium text-gray-500">
                Allow customers to pay cash on delivery for eligible orders
              </p>
            </div>
            <ToggleSwitch
              checked={draftSettings.codAvailable}
              onChange={() => updateDraft("codAvailable", !draftSettings.codAvailable)}
              ariaLabel={`Toggle Cash on Delivery availability (currently ${draftSettings.codAvailable ? "on" : "off"})`}
              className="shrink-0"
            />
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={gstRateId} className={FIELD_LABEL_CLASSES}>
            GST Rate
          </label>
          <div className={SPLIT_INPUT_WRAPPER_CLASSES}>
            <input
              id={gstRateId}
              type="number"
              min={0}
              max={100}
              step={1}
              inputMode="numeric"
              value={draftSettings.gstRatePercent}
              onChange={(event) => updateDraft("gstRatePercent", parseWholeNumberInput(event.target.value, 100))}
              disabled={isSaving}
              className={SPLIT_INPUT_CLASSES}
            />
            <span className={SPLIT_SUFFIX_CLASSES}>%</span>
          </div>
          <p className={HELP_TEXT_CLASSES}>Applied to platform commission and fees. Vendor-side GST is vendor&apos;s responsibility.</p>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={maxAttemptsId} className={FIELD_LABEL_CLASSES}>
            Max Delivery Attempts before RTO
          </label>
          <div className={SPLIT_INPUT_WRAPPER_CLASSES}>
            <input
              id={maxAttemptsId}
              type="number"
              min={1}
              max={10}
              step={1}
              inputMode="numeric"
              value={draftSettings.maxDeliveryAttemptsBeforeRTO}
              onChange={(event) => updateDraft("maxDeliveryAttemptsBeforeRTO", parseWholeNumberInput(event.target.value, 10))}
              disabled={isSaving}
              className={SPLIT_INPUT_CLASSES}
            />
            <span className={SPLIT_SUFFIX_CLASSES}>attempts</span>
          </div>
          <p className={HELP_TEXT_CLASSES}>
            After this many failed delivery attempts, the order is automatically marked Return to Origin (RTO).
          </p>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={supportEmailId} className={FIELD_LABEL_CLASSES}>
            Customer Support Email
          </label>
          <div className={SPLIT_INPUT_WRAPPER_CLASSES}>
            <span className={SPLIT_PREFIX_CLASSES}>
              <MailIcon className="size-3.5 shrink-0" />
            </span>
            <input
              id={supportEmailId}
              type="email"
              value={draftSettings.customerSupportEmail}
              onChange={(event) => updateDraft("customerSupportEmail", event.target.value)}
              disabled={isSaving}
              placeholder="support@example.com"
              className={SPLIT_INPUT_CLASSES}
            />
          </div>
          <p className={HELP_TEXT_CLASSES}>Displayed to customers on order confirmation and support pages.</p>
        </div>

        {formError && (
          <div role="alert" className="min-w-0 break-words rounded-lg bg-primary-lighter px-3 py-2 text-xs font-semibold text-primary">
            {formError}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-1">
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
