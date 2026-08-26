"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { RESELLER_PROGRAM_STATUS } from "@/lib/mock-data/settings";

/**
 * "Program Status" card — the first of the four Reseller Program sections (Figma "reseller
 * program", node 1177:1363): the master on/off switch for reseller registration and link
 * tracking platform-wide. Follows `ShippingSlaConfigCard`'s save-round-trip convention: the
 * toggle lives in local draft state, `RESELLER_PROGRAM_STATUS` only updates on Save, and Save
 * stays disabled until the toggle actually changed.
 */
export function ResellerProgramStatusCard() {
  const [savedActive, setSavedActive] = useState(RESELLER_PROGRAM_STATUS.active);
  const [draftActive, setDraftActive] = useState(RESELLER_PROGRAM_STATUS.active);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = useMemo(() => draftActive !== savedActive, [draftActive, savedActive]);

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `ShippingSlaConfigCard`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    RESELLER_PROGRAM_STATUS.active = draftActive;
    setSavedActive(draftActive);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3 rounded-[10px] border border-border bg-white p-[19px] sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 max-w-[760px] flex-col gap-2.5">
        <h2 className="text-[15px] font-extrabold text-ink">Program Status</h2>

        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <span className="text-[14px] font-bold text-ink">Reseller Program Active</span>
          <div className="flex shrink-0 items-center gap-2">
            <ToggleSwitch
              checked={draftActive}
              onChange={() => setDraftActive((prev) => !prev)}
              ariaLabel={`Toggle reseller program active status (currently ${draftActive ? "on" : "off"})`}
            />
            <span className="text-[12px] font-bold text-ink">{draftActive ? "On" : "Off"}</span>
          </div>
          <Badge variant={draftActive ? "success" : "muted"}>{draftActive ? "Active" : "Inactive"}</Badge>
        </div>

        <p className="min-w-0 max-w-[720px] break-words text-[12px] font-medium text-gray-500">
          When disabled, new registrations are blocked and link tracking is paused. Existing reseller accounts are preserved.
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3">
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
