"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ChevronDownIcon } from "@/components/icons/VendorDetailIcons";
import type { CustomerActivityEntry } from "@/lib/mock-data/customers";

interface CustomerActivityLogProps {
  entries: CustomerActivityEntry[];
}

/** "Activity Log" timeline from the Figma design (node 1143:4387): a dot-and-divider timeline of
 * login/order/account events, each with a title, description, and right-aligned timestamp, behind
 * the same real collapse/expand toggle as `CustomerSavedAddresses` (defaults open). */
export function CustomerActivityLog({ entries }: CustomerActivityLogProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[15px] font-extrabold tracking-[-0.3px] text-ink">Activity Log</h3>
          <Badge variant="neutral">{entries.length}</Badge>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded((open) => !open)}
          aria-expanded={isExpanded}
          className="flex h-7 items-center gap-1.5 rounded-full border border-border bg-white px-3 text-xs font-bold text-gray-500 transition-colors hover:bg-surface-tint"
        >
          <ChevronDownIcon className={`size-3 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          {isExpanded ? "Expanded" : "Collapsed"}
        </button>
      </div>

      {isExpanded && (
        <div className="px-5 pb-2">
          {entries.map((entry, index) => (
            <div key={index} className="flex gap-3 border-t border-border py-3.5 first:border-t-0 first:pt-0">
              <span className="mt-1.5 flex w-3 shrink-0 justify-center" aria-hidden="true">
                <span className="size-[9px] shrink-0 rounded-full bg-primary" />
              </span>
              <div className="flex min-w-0 flex-1 flex-wrap items-start justify-between gap-x-4 gap-y-1">
                <div className="min-w-0 flex-1">
                  <p className="min-w-0 break-words text-[13px] font-extrabold text-ink">{entry.title}</p>
                  <p className="mt-0.5 min-w-0 break-words text-xs font-medium text-gray-500">{entry.description}</p>
                </div>
                <p className="shrink-0 whitespace-nowrap text-xs font-medium text-gray-400">{entry.timestamp}</p>
              </div>
            </div>
          ))}
          {entries.length === 0 && (
            <p className="py-6 text-center text-sm font-semibold text-gray-500">No activity recorded for this customer yet.</p>
          )}
        </div>
      )}
    </Card>
  );
}
