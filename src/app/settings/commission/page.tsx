import { AdminLayout } from "@/components/layout/AdminLayout";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { CommissionRatesPanel } from "@/components/settings/CommissionRatesPanel";

export default function CommissionRatesPage() {
  return (
    <AdminLayout title="Settings" description="Configure platform rules, commissions, and operations">
      <div className="flex min-w-0 items-start gap-5">
        <SettingsSubNav active="commission" />
        <CommissionRatesPanel />
      </div>
    </AdminLayout>
  );
}
