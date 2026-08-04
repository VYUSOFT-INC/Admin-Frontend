import { AdminLayout } from "@/components/layout/AdminLayout";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { PlatformConfigPanel } from "@/components/settings/PlatformConfigPanel";

export default function PlatformConfigPage() {
  return (
    <AdminLayout title="Settings" description="Configure platform rules, commissions, and operations">
      <div className="flex min-w-0 items-start gap-5">
        <SettingsSubNav active="platform-config" />
        <PlatformConfigPanel />
      </div>
    </AdminLayout>
  );
}
