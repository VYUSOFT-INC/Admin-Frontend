import { AdminLayout } from "@/components/layout/AdminLayout";
import { ResellerProgramPanel } from "@/components/settings/ResellerProgramPanel";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";

export default function ResellerProgramSettingsPage() {
  return (
    <AdminLayout title="Settings" description="Configure platform rules, commissions, and operations">
      <div className="flex min-w-0 items-start gap-5">
        <SettingsSubNav active="reseller-program" />
        <ResellerProgramPanel />
      </div>
    </AdminLayout>
  );
}
