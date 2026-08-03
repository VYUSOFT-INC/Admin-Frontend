import { AdminLayout } from "@/components/layout/AdminLayout";
import { CouponForm } from "@/components/promotions/CouponForm";

export default function CreateCouponPage() {
  return (
    <AdminLayout title="Create Coupon" description="Set up a new promotional coupon">
      <CouponForm />
    </AdminLayout>
  );
}
