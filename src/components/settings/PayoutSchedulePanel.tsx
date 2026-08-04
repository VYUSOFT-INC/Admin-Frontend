"use client";

import { useId, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ChevronDownIcon, SaveIcon } from "@/components/icons/VendorDetailIcons";
import { DueClockIcon, PayoutCalendarIcon } from "@/components/icons/PaymentIcons";
import { MailIcon } from "@/components/icons/OrderIcons";
import { CycleIcon, InfoIcon, RupeeIcon } from "@/components/icons/SettingsIcons";
import {
  PAYOUT_NOTIFICATION_OPTIONS,
  PAYOUT_SCHEDULE_SETTINGS,
  PROCESSING_DAY_OPTIONS,
  SETTLEMENT_CYCLE_OPTIONS,
  type PayoutNotificationMethod,
  type PayoutScheduleSettings,
  type ProcessingDay,
  type SettlementCycle,
} from "@/lib/mock-data/settings";

const WEEKDAY_INDEX: Record<ProcessingDay, number> = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

/** Mock "today" the Schedule Preview's "Next Scheduled Payout" is computed against — the day
 * after the most recent seed payout's due date ("10 Jul 2025" on pay-7791/pay-7790/pay-7789 in
 * `payments.ts`), so the preview always lands after every payout already on record instead of
 * drifting against the real system clock (which the rest of this app's 2025-dated mock data
 * doesn't track either). */
const SCHEDULE_PREVIEW_ANCHOR = new Date(2025, 6, 16);

const DATE_FORMATTER = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "short", year: "numeric" });

/** Next date on/after `anchor` that falls on `day`, always strictly in the future (never `anchor`
 * itself) so changing the Processing Day always visibly moves the preview forward. */
function getNextProcessingDate(anchor: Date, day: ProcessingDay): Date {
  const targetIndex = WEEKDAY_INDEX[day];
  const result = new Date(anchor);
  const diff = ((targetIndex - result.getDay() + 7) % 7) || 7;
  result.setDate(result.getDate() + diff);
  return result;
}

/** Clamp + coerce a whole-number input's raw string value to a non-negative integer, matching
 * `CommissionRatesPanel`'s `parseRateInput` pattern. Empty/invalid input falls back to 0 rather
 * than `NaN`. */
function parseWholeNumberInput(raw: string, max: number): number {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(max, Math.max(0, parsed));
}

const FIELD_LABEL_CLASSES = "text-[13px] font-bold text-ink";
const HELP_TEXT_CLASSES = "min-w-0 break-words text-[11px] font-medium text-gray-500";
const SELECT_WRAPPER_CLASSES =
  "flex h-[42px] w-full items-center gap-1.5 rounded-[10px] border border-border bg-[#fff8fb] px-3.5 focus-within:border-primary";
const SELECT_CLASSES = "min-w-0 flex-1 appearance-none bg-transparent text-[13px] font-medium text-ink focus:outline-none disabled:opacity-60";
const SPLIT_INPUT_WRAPPER_CLASSES = "flex h-[42px] w-full items-stretch overflow-hidden rounded-[10px] border border-border bg-[#fff8fb]";
const SPLIT_INPUT_CLASSES = "min-w-0 flex-1 bg-transparent px-3.5 text-[13px] font-medium text-ink focus:outline-none disabled:opacity-60";
const SPLIT_SUFFIX_CLASSES = "flex shrink-0 items-center whitespace-nowrap border-l border-border bg-[#fffcfd] px-3.5 text-xs font-semibold text-gray-500";
const SPLIT_PREFIX_CLASSES = "flex shrink-0 items-center whitespace-nowrap border-r border-border bg-[#fffcfd] px-3.5 text-xs font-semibold text-gray-500";

/**
 * "Payout Schedule" settings panel (Figma "settings - payout schedule", node 1071:8929) — how and
 * when vendor settlements are calculated and released: settlement cycle, processing day, hold
 * period, minimum payout threshold, and the vendor notification method, plus a live "Current
 * Schedule Preview" of the *active* (saved) configuration. Follows `CommissionRatesPanel`'s /
 * `CouponForm`'s save-round-trip conventions: edits live in local draft state, the preview and
 * `PAYOUT_SCHEDULE_SETTINGS` only update on Save, and Save stays disabled until something's
 * actually changed. See `settings.ts` for why this mock config isn't wired to `payments.ts`'s
 * already-settled payout dates.
 */
export function PayoutSchedulePanel() {
  const [savedSettings, setSavedSettings] = useState<PayoutScheduleSettings>(PAYOUT_SCHEDULE_SETTINGS);
  const [draftSettings, setDraftSettings] = useState<PayoutScheduleSettings>(PAYOUT_SCHEDULE_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const cycleId = useId();
  const dayId = useId();
  const holdId = useId();
  const thresholdId = useId();
  const notificationId = useId();

  const isDirty = useMemo(
    () =>
      draftSettings.settlementCycle !== savedSettings.settlementCycle ||
      draftSettings.processingDay !== savedSettings.processingDay ||
      draftSettings.holdPeriodDays !== savedSettings.holdPeriodDays ||
      draftSettings.minimumPayoutThreshold !== savedSettings.minimumPayoutThreshold ||
      draftSettings.notificationMethod !== savedSettings.notificationMethod,
    [draftSettings, savedSettings]
  );

  const nextScheduledPayout = useMemo(
    () => DATE_FORMATTER.format(getNextProcessingDate(SCHEDULE_PREVIEW_ANCHOR, savedSettings.processingDay)),
    [savedSettings.processingDay]
  );

  function updateDraft<K extends keyof PayoutScheduleSettings>(field: K, value: PayoutScheduleSettings[K]) {
    setDraftSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `CommissionRatesPanel`'s / `CouponForm`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Mutate the shared `PAYOUT_SCHEDULE_SETTINGS` object in place, same pattern `CommissionRatesPanel`
    // uses for `COMMISSION_CATEGORY_RATES`.
    Object.assign(PAYOUT_SCHEDULE_SETTINGS, draftSettings);
    setSavedSettings(draftSettings);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <Card className="flex min-w-0 flex-1 flex-col">
      <div className="flex flex-col gap-6 px-9 py-8">
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="text-base font-extrabold tracking-[-0.48px] text-ink">Payout Schedule</h2>
          <p className="min-w-0 break-words text-xs font-medium text-gray-500">
            Define how and when vendor settlements are calculated and released.
          </p>
        </div>

        <div className="flex min-w-0 items-start gap-2.5 rounded-[10px] border-l-[3px] border-primary bg-[#fff9fa] px-4 py-3.5">
          <InfoIcon className="mt-0.5 size-[15px] shrink-0 text-primary" />
          <p className="min-w-0 break-words text-xs font-medium text-ink">
            Changes to payout schedule take effect from the <span className="font-bold text-primary">next settlement cycle</span>. Ongoing or
            pending payouts are not affected.
          </p>
        </div>

        <div className="flex max-w-[520px] flex-col gap-6">
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={cycleId} className="flex items-center gap-1.5">
              <CycleIcon className="size-3.5 shrink-0 text-ink" />
              <span className={FIELD_LABEL_CLASSES}>Settlement Cycle</span>
            </label>
            <div className={SELECT_WRAPPER_CLASSES}>
              <select
                id={cycleId}
                value={draftSettings.settlementCycle}
                onChange={(event) => updateDraft("settlementCycle", event.target.value as SettlementCycle)}
                disabled={isSaving}
                className={SELECT_CLASSES}
              >
                {SETTLEMENT_CYCLE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="size-3 shrink-0 text-gray-400" />
            </div>
            <p className={HELP_TEXT_CLASSES}>How often vendor payouts are batched and calculated.</p>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={dayId} className="flex items-center gap-1.5">
              <PayoutCalendarIcon className="size-3.5 shrink-0 text-ink" />
              <span className={FIELD_LABEL_CLASSES}>Processing Day</span>
            </label>
            <div className={SELECT_WRAPPER_CLASSES}>
              <select
                id={dayId}
                value={draftSettings.processingDay}
                onChange={(event) => updateDraft("processingDay", event.target.value as ProcessingDay)}
                disabled={isSaving}
                className={SELECT_CLASSES}
              >
                {PROCESSING_DAY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="size-3 shrink-0 text-gray-400" />
            </div>
            <p className={HELP_TEXT_CLASSES}>Day of the week when payout processing is initiated.</p>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={holdId} className="flex items-center gap-1.5">
              <DueClockIcon className="size-3.5 shrink-0 text-ink" />
              <span className={FIELD_LABEL_CLASSES}>Settlement Hold Period</span>
            </label>
            <div className={SPLIT_INPUT_WRAPPER_CLASSES}>
              <input
                id={holdId}
                type="number"
                min={0}
                max={90}
                step={1}
                inputMode="numeric"
                value={draftSettings.holdPeriodDays}
                onChange={(event) => updateDraft("holdPeriodDays", parseWholeNumberInput(event.target.value, 90))}
                disabled={isSaving}
                className={SPLIT_INPUT_CLASSES}
              />
              <span className={SPLIT_SUFFIX_CLASSES}>days after order completion</span>
            </div>
            <p className={HELP_TEXT_CLASSES}>
              Number of days to hold payout after order is marked completed, allowing time for return window to pass.
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex min-w-0 flex-col gap-3">
          <h3 className="text-[13px] font-extrabold tracking-[-0.39px] text-ink">Current Schedule Preview</h3>
          <div className="flex max-w-[520px] flex-col gap-2.5 rounded-[10px] border border-border bg-[#fffdfe] px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.6px] text-gray-500">Active Configuration</p>

            <div className="flex min-w-0 items-center justify-between gap-3">
              <span className="min-w-0 shrink-0 text-[13px] font-medium text-gray-500">Settlement Cycle</span>
              <Badge variant="danger" className="min-w-0 gap-1 !py-1">
                <CycleIcon className="size-2.5 shrink-0" />
                <span className="min-w-0 break-words">{savedSettings.settlementCycle}</span>
              </Badge>
            </div>
            <div className="flex min-w-0 items-center justify-between gap-3">
              <span className="min-w-0 shrink-0 text-[13px] font-medium text-gray-500">Processing Day</span>
              <span className="min-w-0 break-words text-right text-[13px] font-bold text-ink">Every {savedSettings.processingDay}</span>
            </div>
            <div className="flex min-w-0 items-center justify-between gap-3">
              <span className="min-w-0 shrink-0 text-[13px] font-medium text-gray-500">Hold Period</span>
              <span className="min-w-0 break-words text-right text-[13px] font-bold text-ink">
                {savedSettings.holdPeriodDays} days post-completion
              </span>
            </div>
            <div className="flex min-w-0 items-center justify-between gap-3">
              <span className="min-w-0 shrink-0 text-[13px] font-medium text-gray-500">Next Scheduled Payout</span>
              <span className="min-w-0 break-words text-right text-[13px] font-bold text-primary">{nextScheduledPayout}</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex max-w-[520px] flex-col gap-6">
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={thresholdId} className="flex items-center gap-1.5">
              <RupeeIcon className="size-3.5 shrink-0 text-ink" />
              <span className={FIELD_LABEL_CLASSES}>Minimum Payout Threshold</span>
            </label>
            <div className={SPLIT_INPUT_WRAPPER_CLASSES}>
              <span className={SPLIT_PREFIX_CLASSES}>₹</span>
              <input
                id={thresholdId}
                type="number"
                min={0}
                max={100000}
                step={1}
                inputMode="numeric"
                value={draftSettings.minimumPayoutThreshold}
                onChange={(event) => updateDraft("minimumPayoutThreshold", parseWholeNumberInput(event.target.value, 100000))}
                disabled={isSaving}
                className={SPLIT_INPUT_CLASSES}
              />
            </div>
            <p className={HELP_TEXT_CLASSES}>Vendors with a net payout below this amount will have their balance carried over to the next cycle.</p>
          </div>

          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={notificationId} className="flex items-center gap-1.5">
              <MailIcon className="size-3.5 shrink-0 text-ink" />
              <span className={FIELD_LABEL_CLASSES}>Payout Notification</span>
            </label>
            <div className={SELECT_WRAPPER_CLASSES}>
              <select
                id={notificationId}
                value={draftSettings.notificationMethod}
                onChange={(event) => updateDraft("notificationMethod", event.target.value as PayoutNotificationMethod)}
                disabled={isSaving}
                className={SELECT_CLASSES}
              >
                {PAYOUT_NOTIFICATION_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="size-3 shrink-0 text-gray-400" />
            </div>
            <p className={HELP_TEXT_CLASSES}>How vendors are notified when a payout is processed or released.</p>
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
      </div>
    </Card>
  );
}
