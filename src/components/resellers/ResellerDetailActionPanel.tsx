"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ApproveIcon, ReinstateIcon } from "@/components/icons/VendorDetailIcons";
import { BanIcon } from "@/components/icons/ResellerDetailIcons";
import { STATUS_BADGE_VARIANT } from "@/components/resellers/ResellersTable";
import type { ResellerStatus } from "@/lib/mock-data/resellers";

interface ResellerDetailActionPanelProps {
  status: ResellerStatus;
  onStatusChange: (status: ResellerStatus) => void;
  adminNote: string;
}

/** "Action Panel" sidebar card: current status pill, the status-dependent moderation action
 *  (Verify for Pending, Suspend for Active, Reinstate for Suspended — matching the list screen's
 *  own Verify/Reinstate actions in `ResellersTable`), and the Admin Notes textarea (Figma node
 *  1177:1106/1107). Notes use draft state with a dirty-check so "Save Note" only enables once the
 *  text actually changed from what's saved, per this project's earlier no-op-Save-button fix on
 *  the Vendor Detail screen. */
export function ResellerDetailActionPanel({ status, onStatusChange, adminNote }: ResellerDetailActionPanelProps) {
  const [savedNote, setSavedNote] = useState(adminNote);
  const [draftNote, setDraftNote] = useState(adminNote);
  const isNoteDirty = draftNote.trim() !== savedNote.trim();

  return (
    <Card className="flex w-full flex-col gap-4 p-[19px]">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-lg font-extrabold tracking-[-0.54px] text-ink">Action Panel</h2>
        <p className="text-[13px] font-medium text-gray-500">Administrative controls for reseller account status and notes</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-500">Current Status</p>
          <Badge variant={STATUS_BADGE_VARIANT[status]} className="w-full !py-2.5 !text-[13px]">
            {status}
          </Badge>
        </div>

        {status === "Active" && (
          <button
            type="button"
            onClick={() => onStatusChange("Suspended")}
            className="flex min-h-[40px] w-full items-center justify-center gap-2 rounded-[10px] border border-[#f6c7d1] bg-[#fdf0f2] text-[14px] font-bold text-primary transition-colors hover:bg-primary-light"
          >
            <BanIcon className="size-4" />
            Suspend Reseller
          </button>
        )}

        {status === "Suspended" && (
          <button
            type="button"
            onClick={() => onStatusChange("Active")}
            className="flex min-h-[40px] w-full items-center justify-center gap-2 rounded-[10px] bg-success text-[14px] font-bold text-white transition-colors hover:opacity-90"
          >
            <ReinstateIcon className="size-4" />
            Reinstate Reseller
          </button>
        )}

        {status === "Pending" && (
          <button
            type="button"
            onClick={() => onStatusChange("Active")}
            className="flex min-h-[40px] w-full items-center justify-center gap-2 rounded-[10px] bg-success text-[14px] font-bold text-white transition-colors hover:opacity-90"
          >
            <ApproveIcon className="size-4" />
            Verify Reseller
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <p className="text-xs font-bold text-gray-500">Admin Notes</p>
        <textarea
          value={draftNote}
          onChange={(event) => setDraftNote(event.target.value)}
          rows={3}
          placeholder="Write an internal note about this reseller..."
          className="min-h-[92px] w-full resize-none rounded-[10px] border border-[#f2dee6] bg-[#fff9fb] px-[15px] py-3 text-[13px] font-medium text-gray-500 placeholder:text-gray-400 focus:outline-none"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-gray-500">{isNoteDirty ? "Unsaved changes" : "Internal use only"}</p>
          <button
            type="button"
            disabled={!isNoteDirty}
            onClick={() => setSavedNote(draftNote)}
            className="flex min-h-[34px] items-center justify-center rounded-[10px] bg-primary px-[15px] text-[13px] font-bold text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Save Note
          </button>
        </div>
      </div>
    </Card>
  );
}
