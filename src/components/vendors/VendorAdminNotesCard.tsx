"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";

/** "ADMIN NOTES": internal-only free-text note with a local-only Save (no backend). */
export function VendorAdminNotesCard() {
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Card className="flex w-full flex-col gap-3.5 p-[19px]">
      <h2 className="border-b border-border pb-3 text-sm font-extrabold text-ink">Admin Notes</h2>

      <textarea
        value={note}
        onChange={(event) => {
          setNote(event.target.value);
          setIsSaved(false);
        }}
        placeholder="Write an internal note about this vendor..."
        rows={3}
        className="min-h-[72px] w-full resize-none rounded-md border border-border bg-surface-tint px-3.5 py-2.5 text-[13px] font-medium text-ink placeholder:text-gray-400 focus:outline-none"
      />

      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium text-gray-400">
          {isSaved ? "Saved — internal only, not visible to vendor" : "Internal only — not visible to vendor"}
        </p>
        <button
          type="button"
          disabled={note.trim().length === 0 || isSaved}
          onClick={() => setIsSaved(true)}
          className="flex min-h-[30px] items-center gap-1.5 rounded-md border border-border bg-surface-tint px-3.5 py-1.5 text-xs font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SaveIcon className="size-3" />
          {isSaved ? "Saved" : "Save Note"}
        </button>
      </div>
    </Card>
  );
}
