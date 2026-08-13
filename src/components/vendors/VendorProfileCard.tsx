"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { initialsOf } from "@/lib/initials";
import type { SellerTier, Vendor } from "@/lib/mock-data/vendors";

interface VendorProfileCardProps {
  vendor: Vendor;
  sellerTier: SellerTier;
}

/** "VENDOR HEADER CARD": avatar, owner/category line, and the email/phone/location/registered/tier/products grid.
 *  Physical Store vendors additionally get a "Request Update" action (Figma "pickup store", node
 *  1101:2) for asking the vendor to refresh their store details/hours/location — Online Sellers
 *  have no store-specific fields to request updates on, so the button is scoped to that type. */
export function VendorProfileCard({ vendor, sellerTier }: VendorProfileCardProps) {
  const [updateRequested, setUpdateRequested] = useState(false);

  const fields = [
    { label: "Email", value: vendor.email },
    { label: "Phone", value: vendor.phone },
    { label: "Location", value: vendor.location },
    { label: "Registered", value: vendor.registeredDate },
    { label: "Seller Tier", value: <Badge variant="muted">{sellerTier}</Badge> },
    { label: "Products Listed", value: vendor.productsListed },
  ];

  return (
    <Card className="flex items-start justify-between gap-4 p-[21px]">
      <div className="flex min-w-0 flex-1 gap-4">
        <Avatar
          gradient={vendor.gradient}
          initials={initialsOf(vendor.name)}
          size={64}
          className="!rounded-2xl !text-xl"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h2 className="text-lg font-extrabold text-ink">{vendor.name}</h2>
          <p className="text-[13px] font-medium text-gray-500">
            Owner: {vendor.ownerName} &middot; {vendor.category}
          </p>
          <div className="grid grid-cols-3 gap-x-5 gap-y-2.5 pt-1">
            {fields.map((field) => (
              <div key={field.label} className="flex min-w-0 flex-col gap-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.44px] text-gray-500">{field.label}</p>
                <div className="min-w-0 break-words text-[13px] font-semibold text-ink">{field.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {vendor.type === "Physical Store" && (
        <button
          type="button"
          disabled={updateRequested}
          onClick={() => setUpdateRequested(true)}
          className="flex min-h-[36px] shrink-0 items-center justify-center whitespace-nowrap rounded-[10px] border border-border bg-white px-4 text-[13px] font-bold text-ink transition-colors hover:bg-surface-tint disabled:cursor-not-allowed disabled:border-success disabled:bg-success-light disabled:text-success"
        >
          {updateRequested ? "Request Sent" : "Request Update"}
        </button>
      )}
    </Card>
  );
}
