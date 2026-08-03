"use client";

import { useState } from "react";
import { BlockIcon, NoteIcon } from "@/components/icons/CustomerIcons";
import type { Customer } from "@/lib/mock-data/customers";

interface CustomerAdminActionsProps {
  customer: Customer;
  onToggleBlock: (customerId: string) => void;
  onAddNote: (customerId: string, note: string) => void;
}

/** "Block Account" / "Add Admin Note" row from the Figma design. Both buttons are real actions:
 * Block Account flips `customer.status` (lifted into `CustomersPage`'s state, not a visual
 * no-op — see the Payout Detail-class bug this avoids), and Add Admin Note opens an inline
 * textarea whose saved notes are appended to `customer.adminNotes` and listed below. */
export function CustomerAdminActions({ customer, onToggleBlock, onAddNote }: CustomerAdminActionsProps) {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [draftNote, setDraftNote] = useState("");
  const isBlocked = customer.status === "Blocked";

  function handleSaveNote() {
    const trimmed = draftNote.trim();
    if (trimmed.length === 0) return;
    onAddNote(customer.id, trimmed);
    setDraftNote("");
    setIsAddingNote(false);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => onToggleBlock(customer.id)}
          className="flex min-h-[36px] items-center gap-1.5 rounded-[10px] border border-primary px-[17px] text-[13px] font-bold text-primary transition-colors hover:bg-primary-lighter"
        >
          <BlockIcon className="size-3.5" />
          {isBlocked ? "Unblock Account" : "Block Account"}
        </button>
        <button
          type="button"
          onClick={() => setIsAddingNote((open) => !open)}
          aria-expanded={isAddingNote}
          className="flex min-h-[36px] items-center gap-1.5 rounded-[10px] border border-border px-[17px] text-[13px] font-bold text-ink transition-colors hover:bg-surface-tint"
        >
          <NoteIcon className="size-3.5" />
          Add Admin Note
          {customer.adminNotes.length > 0 && (
            <span className="ml-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-surface-tint px-1 text-[11px] font-bold text-gray-500">
              {customer.adminNotes.length}
            </span>
          )}
        </button>
      </div>

      {isAddingNote && (
        <div className="flex flex-col gap-2 rounded-[10px] border border-border bg-white p-3.5">
          <textarea
            value={draftNote}
            onChange={(event) => setDraftNote(event.target.value)}
            placeholder="Add an internal note about this customer..."
            rows={3}
            className="w-full resize-none rounded-lg border border-border bg-surface-tint px-3 py-2 text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSaveNote}
              disabled={draftNote.trim().length === 0}
              className="flex min-h-[32px] items-center rounded-lg bg-primary px-4 text-xs font-bold text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save Note
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAddingNote(false);
                setDraftNote("");
              }}
              className="flex min-h-[32px] items-center rounded-lg border border-border px-4 text-xs font-bold text-ink transition-colors hover:bg-surface-tint"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {customer.adminNotes.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {customer.adminNotes.map((note, index) => (
            <li key={index} className="break-words rounded-lg border border-border bg-surface-tint px-3.5 py-2.5 text-xs font-medium text-gray-700">
              {note}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
