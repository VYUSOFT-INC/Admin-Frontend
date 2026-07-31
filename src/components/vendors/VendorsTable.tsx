"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ExportIcon, FilterIcon, LocationIcon, SearchIcon, VerifiedIcon } from "@/components/icons/VendorIcons";
import { initialsOf } from "@/lib/initials";
import type { SellerTier, Vendor, VendorStatus, VendorType } from "@/lib/mock-data/vendors";
import { VendorsPagination } from "@/components/vendors/VendorsPagination";

const TIER_FILTER_OPTIONS: Array<{ label: string; value: SellerTier | "All" }> = [
  { label: "All Tiers", value: "All" },
  { label: "Basic", value: "Basic" },
  { label: "Limited", value: "Limited" },
  { label: "Verified", value: "Verified" },
];

/** Shared with the Vendor Detail screen so type/status colors stay consistent across both. */
export const TYPE_BADGE_VARIANT: Record<VendorType, BadgeVariant> = {
  "Online Seller": "danger",
  "Physical Store": "success",
};

export const STATUS_BADGE_VARIANT: Record<VendorStatus, BadgeVariant> = {
  Pending: "warning",
  Active: "success",
  Suspended: "danger",
  Rejected: "muted",
};

const TIER_BADGE_VARIANT: Record<Exclude<SellerTier, "Verified">, BadgeVariant> = {
  Basic: "muted",
  Limited: "muted",
};

interface VendorsTableProps {
  vendors: Vendor[];
  totalCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  activeTier: SellerTier | "All";
  onTierChange: (tier: SellerTier | "All") => void;
  onReinstate: (slug: string) => void;
}

/** "All Vendors" card: search + filter/export actions, the vendor table, and pagination. */
export function VendorsTable({
  vendors,
  totalCount,
  searchValue,
  onSearchChange,
  activeTier,
  onTierChange,
  onReinstate,
}: VendorsTableProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-[18px]">
        <div>
          <h2 className="text-base font-extrabold text-ink">All Vendors</h2>
          <p className="mt-0.5 text-xs font-medium text-gray-500">
            Showing {vendors.length} of {totalCount} vendors &mdash; sorted by registration date
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex min-h-[38px] items-center gap-2 rounded-[10px] border border-border bg-surface-tint px-3">
            <SearchIcon className="size-3.5 text-gray-500" />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search vendors..."
              className="w-40 bg-transparent text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <Button
              type="button"
              onClick={() => setIsFilterOpen((open) => !open)}
              aria-expanded={isFilterOpen}
              aria-haspopup="menu"
              className={`gap-2 ${activeTier !== "All" ? "border-primary text-primary" : ""}`}
            >
              <FilterIcon className="size-3.5" />
              Filter
              {activeTier !== "All" && (
                <span className="ml-0.5 inline-flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-extrabold text-white">
                  1
                </span>
              )}
            </Button>

            {isFilterOpen && (
              <div
                role="menu"
                className="absolute right-0 top-[calc(100%+8px)] z-10 w-48 overflow-hidden rounded-[10px] border border-border bg-white py-1.5 shadow-lg"
              >
                <p className="px-3.5 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-[0.44px] text-gray-400">Seller Tier</p>
                {TIER_FILTER_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="menuitemradio"
                    aria-checked={activeTier === option.value}
                    onClick={() => {
                      onTierChange(option.value);
                      setIsFilterOpen(false);
                    }}
                    className={`block w-full px-3.5 py-2 text-left text-[13px] font-semibold transition-colors ${
                      activeTier === option.value ? "bg-primary-lighter text-primary" : "text-ink hover:bg-surface-tint"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button type="button" className="gap-2">
            <ExportIcon className="size-3" />
            Export
          </Button>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Vendor Name</TableHeaderCell>
            <TableHeaderCell>Vendor Type</TableHeaderCell>
            <TableHeaderCell>Location</TableHeaderCell>
            <TableHeaderCell>Registered Date</TableHeaderCell>
            <TableHeaderCell>Products Listed</TableHeaderCell>
            <TableHeaderCell>Seller Tier</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.slug}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar gradient={vendor.gradient} initials={initialsOf(vendor.name)} size={34} />
                  <div>
                    <p className="font-extrabold">{vendor.name}</p>
                    <p className="mt-0.5 text-xs font-medium text-gray-500">{vendor.category}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={TYPE_BADGE_VARIANT[vendor.type]}>{vendor.type}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-gray-500">
                  <LocationIcon className="size-3 shrink-0" />
                  {vendor.location}
                </div>
              </TableCell>
              <TableCell className="font-semibold">{vendor.registeredDate}</TableCell>
              <TableCell className="font-semibold">{vendor.productsListed}</TableCell>
              <TableCell>
                {vendor.sellerTier === "Verified" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-surface-tint px-2.5 py-1 text-[11px] font-extrabold text-ink">
                    <VerifiedIcon className="size-3" />
                    Verified
                  </span>
                ) : (
                  <Badge variant={TIER_BADGE_VARIANT[vendor.sellerTier]}>{vendor.sellerTier}</Badge>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={STATUS_BADGE_VARIANT[vendor.status]}>{vendor.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-start gap-2">
                  <Button
                    href={`/vendors/${vendor.slug}`}
                    variant={vendor.status === "Pending" ? "primary" : "outline"}
                    className="min-h-[30px] px-3.5 text-xs"
                  >
                    {vendor.status === "Pending" ? "Review" : "View"}
                  </Button>
                  {vendor.status === "Suspended" && (
                    <Button type="button" onClick={() => onReinstate(vendor.slug)} className="min-h-[30px] px-3.5 text-xs">
                      Reinstate
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {vendors.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="py-10 text-center text-sm font-semibold text-gray-500">
                No vendors match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <VendorsPagination shownCount={vendors.length} totalCount={totalCount} />
    </Card>
  );
}
