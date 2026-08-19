"use client";

import { useId, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { ChevronDownIcon, SaveIcon } from "@/components/icons/VendorDetailIcons";
import {
  MAX_ORDERS_PER_DAY_OPTIONS,
  SHIPPING_SLA_SETTINGS,
  STANDARD_DELIVERY_WINDOW_OPTIONS,
  type ShippingSlaSettings,
} from "@/lib/mock-data/shipping";

const FIELD_LABEL_CLASSES = "text-[11px] font-extrabold uppercase tracking-[0.48px] text-gray-500";
const SELECT_WRAPPER_CLASSES =
  "flex h-[38px] items-center justify-between gap-2 rounded-[10px] border border-border bg-[#fff8fb] px-3.5 focus-within:border-primary";
const SELECT_CLASSES = "min-w-0 flex-1 appearance-none bg-transparent text-[13px] font-bold text-ink focus:outline-none disabled:opacity-60";

/**
 * "SLA Configuration" card — the third of the three Shipping settings sections (Figma "shipping",
 * node 1143:1675): platform-wide delivery-speed defaults (standard window, express/same-day
 * availability, and the daily platform order cap). Follows `PickupStorePanel`'s /
 * `PlatformConfigPanel`'s save-round-trip convention: edits live in local draft state,
 * `SHIPPING_SLA_SETTINGS` only updates on Save, and Save stays disabled until something's
 * actually changed. See `shipping.ts` for why this mock config isn't wired back to `orders.ts`'s
 * existing seeded orders.
 */
export function ShippingSlaConfigCard() {
  const [savedSettings, setSavedSettings] = useState<ShippingSlaSettings>(SHIPPING_SLA_SETTINGS);
  const [draftSettings, setDraftSettings] = useState<ShippingSlaSettings>(SHIPPING_SLA_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const windowId = useId();
  const maxOrdersId = useId();

  const isDirty = useMemo(
    () =>
      draftSettings.standardDeliveryWindowDays !== savedSettings.standardDeliveryWindowDays ||
      draftSettings.expressDeliveryAvailable !== savedSettings.expressDeliveryAvailable ||
      draftSettings.sameDayDeliveryAvailable !== savedSettings.sameDayDeliveryAvailable ||
      draftSettings.maxOrdersPerDay !== savedSettings.maxOrdersPerDay,
    [draftSettings, savedSettings]
  );

  function updateDraft<K extends keyof ShippingSlaSettings>(field: K, value: ShippingSlaSettings[K]) {
    setDraftSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `PickupStorePanel`'s / `PlatformConfigPanel`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    Object.assign(SHIPPING_SLA_SETTINGS, draftSettings);
    setSavedSettings(draftSettings);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-[16px] font-extrabold text-ink">SLA Configuration</h2>
        <p className="mt-1 min-w-0 break-words text-[12.5px] font-medium text-gray-500">
          Configure delivery speed defaults, same-day options, and the daily platform order cap.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={windowId} className={FIELD_LABEL_CLASSES}>
            Standard Delivery Window
          </label>
          <div className={SELECT_WRAPPER_CLASSES}>
            <select
              id={windowId}
              value={draftSettings.standardDeliveryWindowDays}
              onChange={(event) => updateDraft("standardDeliveryWindowDays", Number.parseInt(event.target.value, 10))}
              disabled={isSaving}
              className={SELECT_CLASSES}
            >
              {STANDARD_DELIVERY_WINDOW_OPTIONS.map((days) => (
                <option key={days} value={days}>
                  {days} {days === 1 ? "day" : "days"}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="size-3.5 shrink-0 text-gray-400" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <span className={FIELD_LABEL_CLASSES}>Express Delivery Available</span>
          <div className="flex h-[38px] items-center gap-2.5 rounded-[10px] border border-border bg-[#fff8fb] px-3.5">
            <ToggleSwitch
              checked={draftSettings.expressDeliveryAvailable}
              onChange={() => updateDraft("expressDeliveryAvailable", !draftSettings.expressDeliveryAvailable)}
              ariaLabel={`Toggle express delivery availability (currently ${draftSettings.expressDeliveryAvailable ? "on" : "off"})`}
            />
            <span className={`whitespace-nowrap text-[13px] font-bold ${draftSettings.expressDeliveryAvailable ? "text-success" : "text-gray-500"}`}>
              {draftSettings.expressDeliveryAvailable ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <span className={FIELD_LABEL_CLASSES}>Same-Day Delivery</span>
          <div className="flex h-[38px] items-center gap-2.5 rounded-[10px] border border-border bg-[#fff8fb] px-3.5">
            <ToggleSwitch
              checked={draftSettings.sameDayDeliveryAvailable}
              onChange={() => updateDraft("sameDayDeliveryAvailable", !draftSettings.sameDayDeliveryAvailable)}
              ariaLabel={`Toggle same-day delivery availability (currently ${draftSettings.sameDayDeliveryAvailable ? "on" : "off"})`}
            />
            <span
              className={`whitespace-nowrap text-[13px] font-bold ${draftSettings.sameDayDeliveryAvailable ? "text-success" : "text-gray-500"}`}
            >
              {draftSettings.sameDayDeliveryAvailable ? "Enabled" : "Disabled"}
            </span>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2">
          <label htmlFor={maxOrdersId} className={FIELD_LABEL_CLASSES}>
            Max Orders Per Day
          </label>
          <div className={SELECT_WRAPPER_CLASSES}>
            <select
              id={maxOrdersId}
              value={draftSettings.maxOrdersPerDay}
              onChange={(event) => updateDraft("maxOrdersPerDay", Number.parseInt(event.target.value, 10))}
              disabled={isSaving}
              className={SELECT_CLASSES}
            >
              {MAX_ORDERS_PER_DAY_OPTIONS.map((count) => (
                <option key={count} value={count}>
                  {count.toLocaleString("en-IN")}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="size-3.5 shrink-0 text-gray-400" />
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
