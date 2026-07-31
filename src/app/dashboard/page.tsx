import { AdminLayout } from "@/components/layout/AdminLayout";
import { AccountHealthCard } from "@/components/dashboard/AccountHealthCard";
import { AttentionQueueCard } from "@/components/dashboard/AttentionQueueCard";
import { PendingProductReviewsCard } from "@/components/dashboard/PendingProductReviewsCard";
import { PendingVendorApprovalsCard } from "@/components/dashboard/PendingVendorApprovalsCard";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { StatsGrid } from "@/components/dashboard/StatsGrid";

export default function DashboardPage() {
  return (
    <AdminLayout
      title="Dashboard"
      description="Monitor approvals, sales activity, account health, and order fulfillment across MIVYU."
    >
      <div className="flex flex-col gap-5">
        <StatsGrid />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-5">
            <PendingVendorApprovalsCard />
            <PendingProductReviewsCard />
          </div>
          <div className="flex flex-col gap-5">
            <AccountHealthCard />
            <AttentionQueueCard />
          </div>
        </div>

        <RecentOrdersTable />
      </div>
    </AdminLayout>
  );
}
