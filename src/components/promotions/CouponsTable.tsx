"use client";

import Link from "next/link";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { EditIcon, TrashIcon } from "@/components/icons/PromotionIcons";
import { CouponsPagination } from "@/components/promotions/CouponsPagination";
import type { Coupon, CouponAppliesTo, CouponDiscountType } from "@/lib/mock-data/promotions";

/** Matches the Figma table's DISCOUNT TYPE column: "% Off" is purple, "Fixed" is sky blue
 * (kept distinct from `APPLIES_TO_BADGE_VARIANT.Delivery`'s blue so the two columns don't read
 * as the same tag in the same row). */
export const DISCOUNT_TYPE_BADGE_VARIANT: Record<CouponDiscountType, BadgeVariant> = {
  "% Off": "purple",
  Fixed: "sky",
};

/** Matches the Figma table's APPLIES TO column — same mapping `OrdersTable` already uses for
 * fulfillment tags (Delivery/Pickup/Walk-in), plus a neutral "All". */
export const APPLIES_TO_BADGE_VARIANT: Record<CouponAppliesTo, BadgeVariant> = {
  All: "muted",
  Delivery: "info",
  Pickup: "purple",
  "Walk-in": "success",
};

interface CouponsTableProps {
  coupons: Coupon[];
  totalCount: number;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

/** "Coupons Table" — COUPON CODE / DISCOUNT TYPE / VALUE / APPLIES TO / VENDOR SCOPE /
 * MIN ORDER / USAGE / VALID UNTIL / STATUS / ACTION columns, matching the Figma reference. */
export function CouponsTable({ coupons, totalCount, onToggleStatus, onDelete }: CouponsTableProps) {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Coupon Code</TableHeaderCell>
            <TableHeaderCell>Discount Type</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
            <TableHeaderCell>Applies To</TableHeaderCell>
            <TableHeaderCell>Vendor Scope</TableHeaderCell>
            <TableHeaderCell>Min Order</TableHeaderCell>
            <TableHeaderCell>Usage</TableHeaderCell>
            <TableHeaderCell>Valid Until</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>
                <span className="min-w-0 whitespace-nowrap rounded-lg bg-surface-tint px-1.5 py-0.5 font-mono text-xs font-bold tracking-wider text-ink">
                  {coupon.code}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant={DISCOUNT_TYPE_BADGE_VARIANT[coupon.discountType]}>{coupon.discountType}</Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium">{coupon.discountValue}</TableCell>
              <TableCell>
                <Badge variant={APPLIES_TO_BADGE_VARIANT[coupon.appliesTo]}>{coupon.appliesTo}</Badge>
              </TableCell>
              <TableCell>
                <p className="min-w-0 break-words font-medium">{coupon.vendorScope}</p>
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium">₹{coupon.minOrderAmount.toLocaleString("en-IN")}</TableCell>
              <TableCell className="whitespace-nowrap font-medium">
                {coupon.usageCount} / {coupon.usageLimit}
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-500">{coupon.validUntil}</TableCell>
              <TableCell>
                <ToggleSwitch
                  checked={coupon.isActive}
                  onChange={() => onToggleStatus(coupon.id)}
                  ariaLabel={`Toggle ${coupon.code} status (currently ${coupon.isActive ? "active" : "inactive"})`}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/promotions/${coupon.id}`}
                    aria-label={`Edit ${coupon.code}`}
                    className="flex size-7 items-center justify-center rounded-lg border border-border bg-surface-tint text-gray-500 transition-colors hover:bg-white"
                  >
                    <EditIcon className="size-3.5" />
                  </Link>
                  <button
                    type="button"
                    aria-label={`Delete ${coupon.code}`}
                    onClick={() => {
                      if (window.confirm(`Delete coupon "${coupon.code}"? This cannot be undone.`)) {
                        onDelete(coupon.id);
                      }
                    }}
                    className="flex size-7 items-center justify-center rounded-lg border border-border bg-surface-tint text-primary transition-colors hover:bg-primary-lighter"
                  >
                    <TrashIcon className="size-3.5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {coupons.length === 0 && (
            <TableRow>
              <TableCell colSpan={10} className="py-10 text-center text-sm font-semibold text-gray-500">
                No coupons yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <CouponsPagination shownCount={coupons.length} totalCount={totalCount} />
    </Card>
  );
}
