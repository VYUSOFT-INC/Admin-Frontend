import { AdminLayout } from "@/components/layout/AdminLayout";
import { AnalyticsHeaderActions } from "@/components/analytics/AnalyticsHeaderActions";
import { AnalyticsStatsGrid } from "@/components/analytics/AnalyticsStatsGrid";
import { ConversionFunnelCard } from "@/components/analytics/ConversionFunnelCard";
import { OperationalMetricsRow } from "@/components/analytics/OperationalMetricsRow";
import { OrderVolumeCard } from "@/components/analytics/OrderVolumeCard";
import { RevenueTrendCard } from "@/components/analytics/RevenueTrendCard";
import { TopCategoriesCard } from "@/components/analytics/TopCategoriesCard";
import { TopVendorsCard } from "@/components/analytics/TopVendorsCard";

export default function AnalyticsPage() {
  return (
    <AdminLayout
      title="Analytics & Reports"
      description="Track platform growth, fulfillment mix, vendor performance, and operational health"
    >
      <div className="flex flex-col gap-5">
        <AnalyticsHeaderActions />
        <AnalyticsStatsGrid />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_1fr]">
          <RevenueTrendCard />
          <OrderVolumeCard />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_0.9fr_1fr]">
          <TopCategoriesCard />
          <ConversionFunnelCard />
          <TopVendorsCard />
        </div>

        <OperationalMetricsRow />
      </div>
    </AdminLayout>
  );
}
