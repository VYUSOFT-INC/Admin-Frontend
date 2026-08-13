import { Card, CardHeader } from "@/components/ui/Card";
import { LocationIcon } from "@/components/icons/VendorIcons";
import type { Vendor } from "@/lib/mock-data/vendors";

interface VendorStoreLocationCardProps {
  vendor: Vendor;
}

/**
 * "STORE LOCATION" (Vendor Detail Overview tab, Physical Store vendors only — Figma "pickup
 * store", node 1101:2): the address visibility used for customer discovery, walk-ins, and pickup
 * routing. The design's map preview is an abstract pink circle-and-pin illustration rather than an
 * actual map tile — there's no mapping provider wired into this mock app, so it's reproduced here
 * with the same `LocationIcon` glyph the rest of the Vendor Detail screen already uses for
 * addresses, scaled up, rather than pulling in a map library for a screen with no real geocoding
 * behind it.
 */
export function VendorStoreLocationCard({ vendor }: VendorStoreLocationCardProps) {
  const address = vendor.storeAddress ?? vendor.pickupAddress;

  return (
    <Card className="w-full">
      <CardHeader title="Store Location" description="Address visibility used for discovery, walk-ins, and pickup routing" />

      <div className="flex flex-col items-start gap-4 p-5 lg:flex-row">
        <div
          aria-hidden
          className="flex h-[220px] w-full shrink-0 items-center justify-center rounded-xl bg-primary-lighter lg:h-[260px] lg:w-[260px]"
        >
          <div className="flex size-[110px] items-center justify-center rounded-full bg-primary-light">
            <LocationIcon className="size-9 text-primary" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div className="flex min-w-0 flex-col gap-1 rounded-md border border-border bg-surface-tint px-3.5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.44px] text-gray-500">Store Address</p>
            <p className="min-w-0 break-words text-[13.5px] font-bold text-ink">{address}</p>
          </div>

          <div className="flex min-w-0 flex-col gap-1 rounded-md border border-border bg-surface-tint px-3.5 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.44px] text-gray-500">Directions / Landmarks</p>
            <p className="min-w-0 break-words text-[13.5px] font-bold text-ink">
              {vendor.directionsLandmark ?? "Not provided"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
