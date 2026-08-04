import { AdminLayout } from "@/components/layout/AdminLayout";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { PayoutSchedulePanel } from "@/components/settings/PayoutSchedulePanel";

export default function PayoutSchedulePage() {
  return (
    <AdminLayout title="Settings" description="Configure platform rules, commissions, and operations">
      <div className="flex min-w-0 items-start gap-5">
        <SettingsSubNav active="payout-schedule" />
        <PayoutSchedulePanel />
      </div>
    </AdminLayout>
  );
}
