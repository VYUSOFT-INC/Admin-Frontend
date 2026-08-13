"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { ClockIcon } from "@/components/icons/VendorDetailIcons";
import type { StoreHoursEntry } from "@/lib/mock-data/vendors";

interface VendorStoreHoursCardProps {
  hours: StoreHoursEntry[];
}

/**
 * "STORE HOURS" (Vendor Detail Overview tab, Physical Store vendors only — Figma "pickup store",
 * node 1101:2): the weekly open/close schedule used for customer discovery and pickup timing.
 * Matches this file's Admin-Notes/Action-Panel convention of owning its own local optimistic
 * state (no backend) rather than lifting it into `VendorDetailView` — nothing else on the page
 * needs to read it. Starts read-only ("Default read-only schedule" per the design's own caption);
 * clicking "Edit Hours" opens a draft copy that "Save Changes"/"Cancel" commit or discard, so the
 * toggle switches and time fields are only ever genuinely interactive while actively editing.
 */
export function VendorStoreHoursCard({ hours }: VendorStoreHoursCardProps) {
  const [savedHours, setSavedHours] = useState(hours);
  const [draftHours, setDraftHours] = useState(hours);
  const [isEditing, setIsEditing] = useState(false);

  function startEditing() {
    setDraftHours(savedHours);
    setIsEditing(true);
  }

  function handleSave() {
    setSavedHours(draftHours);
    setIsEditing(false);
  }

  function handleCancel() {
    setDraftHours(savedHours);
    setIsEditing(false);
  }

  function updateDraftDay(day: string, patch: Partial<StoreHoursEntry>) {
    setDraftHours((current) => current.map((entry) => (entry.day === day ? { ...entry, ...patch } : entry)));
  }

  const displayedHours = isEditing ? draftHours : savedHours;

  return (
    <Card className="w-full">
      <CardHeader
        title="Store Hours"
        description="Default read-only schedule for customer discovery and pickup timing"
        action={
          !isEditing && (
            <Button type="button" onClick={startEditing}>
              Edit Hours
            </Button>
          )
        }
      />

      <div className="flex flex-col gap-2.5 px-5 py-5">
        {displayedHours.map((entry) => (
          <div
            key={entry.day}
            className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-surface-tint px-4 py-3"
          >
            <span className="w-full min-w-0 shrink-0 text-[13.5px] font-bold text-ink sm:w-24">{entry.day}</span>

            <div className="flex min-w-0 shrink-0 items-center gap-2">
              {isEditing ? (
                <ToggleSwitch
                  checked={entry.isOpen}
                  onChange={() => updateDraftDay(entry.day, { isOpen: !entry.isOpen })}
                  ariaLabel={`Toggle ${entry.day} open status (currently ${entry.isOpen ? "open" : "closed"})`}
                />
              ) : (
                <span
                  aria-hidden
                  className={`flex h-4 w-[30px] shrink-0 items-center rounded-full px-0.5 ${
                    entry.isOpen ? "justify-end bg-success" : "justify-start bg-gray-500"
                  }`}
                >
                  <span className="size-3 shrink-0 rounded-full bg-white" />
                </span>
              )}
              <span className="min-w-0 text-[13px] font-semibold text-ink">{entry.isOpen ? "Open" : "Closed"}</span>
            </div>

            <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-2.5">
              <TimeField
                isEditing={isEditing}
                value={entry.openTime}
                disabled={!entry.isOpen}
                onChange={(value) => updateDraftDay(entry.day, { openTime: value })}
                ariaLabel={`${entry.day} opening time`}
              />
              <TimeField
                isEditing={isEditing}
                value={entry.closeTime}
                disabled={!entry.isOpen}
                onChange={(value) => updateDraftDay(entry.day, { closeTime: value })}
                ariaLabel={`${entry.day} closing time`}
              />
            </div>
          </div>
        ))}

        {isEditing && (
          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={handleSave}
              className="flex min-h-[36px] items-center justify-center rounded-lg bg-primary px-4 text-[13px] font-bold text-white hover:opacity-90"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-[13px] font-bold text-gray-500 hover:text-ink"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

interface TimeFieldProps {
  isEditing: boolean;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  ariaLabel: string;
}

/** Read-only pill (clock icon + display string) outside edit mode; a genuinely editable text
 *  input while editing. Plain text rather than `<input type="time">` because these are display
 *  strings like "10:00 AM" (matching every other display-string field in `vendors.ts`), not
 *  parsed time values — there's no backend here to validate a stricter format against. */
function TimeField({ isEditing, value, disabled, onChange, ariaLabel }: TimeFieldProps) {
  if (isEditing) {
    return (
      <div className="flex min-w-0 items-center gap-1.5 rounded-md border border-border bg-white px-3 py-2">
        <ClockIcon className="size-3.5 shrink-0 text-gray-500" />
        <input
          type="text"
          aria-label={ariaLabel}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          className="w-[84px] min-w-0 bg-transparent text-[13px] font-semibold text-ink focus:outline-none disabled:text-gray-400"
        />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 items-center gap-1.5 rounded-md border border-border bg-white px-3 py-2 text-[13px] font-semibold text-ink">
      <ClockIcon className="size-3.5 shrink-0 text-gray-500" />
      <span className="min-w-0 break-words">{value}</span>
    </div>
  );
}
