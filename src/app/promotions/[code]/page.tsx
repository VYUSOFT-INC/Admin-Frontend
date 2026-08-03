"use client";

import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { CouponForm } from "@/components/promotions/CouponForm";
import { COUPONS } from "@/lib/mock-data/promotions";

// Client Component (matching `/orders/[id]/page.tsx`'s precedent) so this reads the exact same
// in-memory `COUPONS` array instance the `/promotions` list page does — a Server Component would
// hand the client a serialized copy, and mutations in `CouponForm` would never be visible back on
// the list.

interface EditCouponPageProps {
  params: { code: string };
}

export default function EditCouponPage({ params }: EditCouponPageProps) {
  const coupon = COUPONS.find((candidate) => candidate.id === params.code);

  if (!coupon) {
    notFound();
  }

  return (
    <AdminLayout title="Edit Coupon" description={`${coupon.code} · ${coupon.vendorScope}`}>
      <CouponForm existingCoupon={coupon} key={coupon.id} />
    </AdminLayout>
  );
}
