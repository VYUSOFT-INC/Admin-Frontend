"use client";

import { useId, useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { InfoIcon } from "@/components/icons/SettingsIcons";
import { PICKUP_STORE_SETTINGS, type PickupStoreSettings } from "@/lib/mock-data/settings";

/** Clamp + coerce a whole-number input's raw string value to a non-negative integer, matching
 * `PlatformConfigPanel`'s / `PayoutSchedulePanel`'s `parseWholeNumberInput` pattern. Empty/invalid
 * input falls back to 0 rather than `NaN`. */
function parseWholeNumberInput(raw: string, max: number): number {
  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.min(max, Math.max(0, parsed));
}

const FIELD_LABEL_CLASSES = "text-[13px] font-bold text-ink";
const HELP_TEXT_CLASSES = "min-w-0 break-words text-[11px] font-medium text-gray-500";
const NUMBER_BOX_CLASSES =
  "flex h-[38px] w-[120px] shrink-0 items-center justify-center rounded-[10px] border border-border bg-[#fff8fb] px-3 text-center text-sm font-semibold text-ink focus:outline-none focus:border-primary disabled:opacity-60";
const UNIT_LABEL_CLASSES = "text-[13px] font-semibold text-gray-500";

/**
 * "Pickup & Store" settings panel (Figma "pickup store settings", node 1071:10046) — global rules
 * for how in-store/walk-in pickup fulfillment works platform-wide: discovery radius, pickup
 * collection window, the auto-cancel deadline for uncollected orders, and whether new physical
 * stores need manual admin verification before going live. Follows `PlatformConfigPanel`'s /
 * `PayoutSchedulePanel`'s save-round-trip conventions: edits live in local draft state,
 * `PICKUP_STORE_SETTINGS` only updates on Save, and Save stays disabled until something's actually
 * changed. See `settings.ts` for why this mock config isn't wired to `vendors.ts`'s
 * `pickupAddress` field or the separate, not-yet-built "Pickup Store" (individual store) screen.
 */
export function PickupStorePanel() {
  const [savedSettings, setSavedSettings] = useState<PickupStoreSettings>(PICKUP_STORE_SETTINGS);
  const [draftSettings, setDraftSettings] = useState<PickupStoreSettings>(PICKUP_STORE_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const radiusId = useId();
  const collectionWindowId = useId();
  const autoCancelId = useId();

  const isDirty = useMemo(
    () =>
      draftSettings.maxPickupRadiusKm !== savedSettings.maxPickupRadiusKm ||
      draftSettings.pickupCollectionWindowHours !== savedSettings.pickupCollectionWindowHours ||
      draftSettings.autoCancelUnpickedOrdersAfterHours !== savedSettings.autoCancelUnpickedOrdersAfterHours ||
      draftSettings.storeVerificationRequired !== savedSettings.storeVerificationRequired,
    [draftSettings, savedSettings]
  );

  function updateDraft<K extends keyof PickupStoreSettings>(field: K, value: PickupStoreSettings[K]) {
    setDraftSettings((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `PlatformConfigPanel`'s / `PayoutSchedulePanel`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Mutate the shared `PICKUP_STORE_SETTINGS` object in place, same pattern `PlatformConfigPanel`
    // uses for `PLATFORM_CONFIG_SETTINGS`.
    Object.assign(PICKUP_STORE_SETTINGS, draftSettings);
    setSavedSettings(draftSettings);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <Card className="flex min-w-0 flex-1 flex-col">
      <div className="flex flex-col gap-1 px-8 pt-7">
        <h2 className="text-base font-extrabold tracking-[-0.48px] text-ink">Pickup & Store Settings</h2>
        <p className="min-w-0 break-words text-xs font-medium text-gray-500">
          Control discovery radius, collection windows, and physical store verification requirements.
        </p>
      </div>

      <div className="flex max-w-[560px] flex-col gap-5 px-8 pt-6">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={radiusId} className={FIELD_LABEL_CLASSES}>
            Max Pickup Radius
          </label>
          <div className="flex items-center gap-2.5">
            <input
              id={radiusId}
              type="number"
              min={0}
              max={200}
              step={1}
              inputMode="numeric"
              value={draftSettings.maxPickupRadiusKm}
              onChange={(event) => updateDraft("maxPickupRadiusKm", parseWholeNumberInput(event.target.value, 200))}
              disabled={isSaving}
              className={NUMBER_BOX_CLASSES}
            />
            <span className={UNIT_LABEL_CLASSES}>km</span>
          </div>
          <p className={HELP_TEXT_CLASSES}>
            Maximum distance within which customers can discover and browse nearby physical stores for in-store pickup.
          </p>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={collectionWindowId} className={FIELD_LABEL_CLASSES}>
            Pickup Collection Window
          </label>
          <div className="flex items-center gap-2.5">
            <input
              id={collectionWindowId}
              type="number"
              min={0}
              max={500}
              step={1}
              inputMode="numeric"
              value={draftSettings.pickupCollectionWindowHours}
              onChange={(event) => updateDraft("pickupCollectionWindowHours", parseWholeNumberInput(event.target.value, 500))}
              disabled={isSaving}
              className={NUMBER_BOX_CLASSES}
            />
            <span className={UNIT_LABEL_CLASSES}>hours</span>
          </div>
          <p className={HELP_TEXT_CLASSES}>
            How long a customer has to collect their order after the vendor marks it &quot;Ready for Pickup&quot;. After this
            window, auto-cancellation rules apply.
          </p>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor={autoCancelId} className={FIELD_LABEL_CLASSES}>
            Auto-cancel Unpicked Orders After
          </label>
          <div className="flex items-center gap-2.5">
            <input
              id={autoCancelId}
              type="number"
              min={0}
              max={500}
              step={1}
              inputMode="numeric"
              value={draftSettings.autoCancelUnpickedOrdersAfterHours}
              onChange={(event) =>
                updateDraft("autoCancelUnpickedOrdersAfterHours", parseWholeNumberInput(event.target.value, 500))
              }
              disabled={isSaving}
              className={NUMBER_BOX_CLASSES}
            />
            <span className={UNIT_LABEL_CLASSES}>hours</span>
          </div>
          <p className={HELP_TEXT_CLASSES}>
            Orders not collected within this period from the &quot;Ready for Pickup&quot; timestamp will be automatically
            cancelled and restocked.
          </p>
        </div>

        <div className="h-px w-full bg-border" />

        <div className="flex min-w-0 flex-col gap-1.5">
          <span className={FIELD_LABEL_CLASSES}>Store Verification Required</span>
          <div className="flex min-w-0 items-start justify-between gap-3 pt-1.5">
            <div className="min-w-0 flex-1">
              <p className="min-w-0 break-words text-[13px] font-medium text-ink">
                Require manual admin verification before new physical stores go live
              </p>
              <p className="min-w-0 break-words text-[11px] font-medium text-gray-500">
                When enabled, newly registered physical stores are held in a pending state until reviewed and approved by an
                admin. Online sellers are not affected.
              </p>
            </div>
            <ToggleSwitch
              checked={draftSettings.storeVerificationRequired}
              onChange={() => updateDraft("storeVerificationRequired", !draftSettings.storeVerificationRequired)}
              ariaLabel={`Toggle store verification requirement (currently ${draftSettings.storeVerificationRequired ? "on" : "off"})`}
              className="mt-0.5 shrink-0"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-8 pt-6 pb-9">
        <div className="flex min-w-0 items-start gap-2.5 rounded-[10px] border border-border bg-[#fffdfe] px-4 py-3.5">
          <InfoIcon className="mt-0.5 size-4 shrink-0 text-gray-500" />
          <p className="min-w-0 break-words text-xs font-medium text-gray-500">
            Changes to radius and collection window settings take effect immediately for all new orders. Existing active
            pickup orders are not affected. Walk-in discovery radius changes update on the customer app within 30 minutes.
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
