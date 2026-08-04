"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import { LockIcon } from "@/components/icons/ProductIcons";
import { NOTIFICATION_PREFERENCES, type NotificationPreferenceRow } from "@/lib/mock-data/notifications";

/**
 * "Notification Preferences" panel (Figma "notification preferences", node 1087:325) — per
 * notification-type control over delivery channels. In-App delivery is a locked platform policy
 * for every row (the design's padlock "Locked On" pill, not a toggle) — these are admin-critical
 * alerts that must always surface in-app — while Email is the one channel an admin can actually
 * opt in/out of per notification type. Follows `CommissionRatesPanel`'s save-round-trip
 * convention: edits live in local draft state, `NOTIFICATION_PREFERENCES` only updates on Save
 * (mutated in place, index-for-index, the same pattern that panel uses for
 * `COMMISSION_CATEGORY_RATES`), and Save stays disabled until something's actually changed.
 *
 * Deviation from Figma: the reference frame's header area above this card duplicates the
 * `/notifications` feed page's category filter tabs ("All 8 / Vendors 1 / Products 1 / ...") and
 * "Mark All as Read" button verbatim — down to counts that don't even sum consistently (the
 * individual category counts add to 6, not the shown "All 8"). Neither control has anything to
 * filter or mark-read against on a preferences screen, so this reads as a leftover/duplicated
 * frame from the feed screen rather than real preferences-page content (see
 * `NotificationPreferencesPage`, which renders only the shared `NotificationSectionTabs` above
 * this card). Reproducing it here would mean a non-functional decorative control, against this
 * codebase's "every interactive-looking element must actually work" rule.
 */
export function NotificationPreferencesPanel() {
  const [savedPreferences, setSavedPreferences] = useState<NotificationPreferenceRow[]>(NOTIFICATION_PREFERENCES);
  const [draftPreferences, setDraftPreferences] = useState<NotificationPreferenceRow[]>(NOTIFICATION_PREFERENCES);
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const isDirty = useMemo(
    () => draftPreferences.some((draft, index) => draft.emailEnabled !== savedPreferences[index].emailEnabled),
    [draftPreferences, savedPreferences]
  );

  function toggleEmail(index: number) {
    setDraftPreferences((prev) => prev.map((row, i) => (i === index ? { ...row, emailEnabled: !row.emailEnabled } : row)));
  }

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `CommissionRatesPanel`'s / `PlatformConfigPanel`'s pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Mutate the exact row objects in place — same reference held inside the shared
    // `NOTIFICATION_PREFERENCES` array, matching the pattern `CommissionRatesPanel` uses for
    // `COMMISSION_CATEGORY_RATES`.
    draftPreferences.forEach((draft, index) => {
      Object.assign(NOTIFICATION_PREFERENCES[index], draft);
    });
    setSavedPreferences(draftPreferences);
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <Card className="flex min-w-0 flex-1 flex-col">
      <CardHeader title="Notification Preferences" description="Configure which notifications you receive and how." />

      <div className="flex flex-col gap-5 p-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Notification Type</TableHeaderCell>
              <TableHeaderCell className="w-[160px]">In-App</TableHeaderCell>
              <TableHeaderCell className="w-[160px]">Email</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {draftPreferences.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="min-w-0 break-words font-semibold">{row.label}</TableCell>
                <TableCell>
                  <span
                    title="In-app notifications for admin-critical alerts can't be turned off"
                    className="inline-flex min-w-0 items-center gap-1.5 rounded-full bg-primary-lighter px-2.5 py-1.5 text-[12px] font-bold text-ink"
                  >
                    <LockIcon className="size-[13px] shrink-0" />
                    <span className="break-words">Locked On</span>
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex min-w-0 items-center gap-2.5">
                    <ToggleSwitch
                      checked={row.emailEnabled}
                      onChange={() => toggleEmail(index)}
                      ariaLabel={`Toggle email notifications for ${row.label} (currently ${row.emailEnabled ? "on" : "off"})`}
                    />
                    <span className="break-words text-[12px] font-bold text-gray-500">{row.emailEnabled ? "ON" : "OFF"}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className="inline-flex h-10 items-center gap-2 rounded-[10px] bg-primary px-6 text-[13px] font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SaveIcon className="size-3.5" />
            {isSaving ? "Saving…" : "Save Preferences"}
          </button>
          {justSaved && <Badge variant="success">Saved</Badge>}
        </div>
      </div>
    </Card>
  );
}
