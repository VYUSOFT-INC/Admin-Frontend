"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ChevronDownIcon } from "@/components/icons/VendorDetailIcons";
import type { CustomerAddress } from "@/lib/mock-data/customers";

interface CustomerSavedAddressesProps {
  addresses: CustomerAddress[];
}

/** "Saved Addresses" section from the Figma design (node 1143:4340): a 2-column grid of address
 * cards, each with an optional "Default" badge, and a real collapse/expand toggle (defaults open,
 * matching the Figma "Expanded" state) — the same disclosure pattern `CategoryManagementPanel`
 * already uses for its expandable rows. */
export function CustomerSavedAddresses({ addresses }: CustomerSavedAddressesProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <h3 className="text-[15px] font-extrabold tracking-[-0.3px] text-ink">Saved Addresses</h3>
          <Badge variant="neutral">{addresses.length}</Badge>
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
        <div className="grid grid-cols-1 gap-3.5 px-5 pb-5 md:grid-cols-2">
          {addresses.map((address, index) => (
            <div key={index} className="min-w-0 rounded-[10px] border border-border bg-surface-tint p-4">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-extrabold text-ink">{address.label}</p>
                {address.isDefault && <Badge variant="danger">Default</Badge>}
              </div>
              <p className="mt-2.5 min-w-0 break-words text-[13px] font-semibold text-ink">{address.addressLine}</p>
              <p className="mt-2 min-w-0 break-words text-xs font-medium text-gray-500">{address.note}</p>
            </div>
          ))}
          {addresses.length === 0 && (
            <p className="col-span-full py-6 text-center text-sm font-semibold text-gray-500">
              This customer has no saved addresses yet.
            </p>
          )}
        </div>
      )}
    </Card>
  );
}
