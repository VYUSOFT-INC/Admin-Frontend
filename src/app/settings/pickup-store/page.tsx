import { AdminLayout } from "@/components/layout/AdminLayout";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { PickupStorePanel } from "@/components/settings/PickupStorePanel";

export default function PickupStoreSettingsPage() {
  return (
    <AdminLayout title="Settings" description="Configure platform rules, commissions, and operations">
      <div className="flex min-w-0 items-start gap-5">
        <SettingsSubNav active="pickup-store" />
        <PickupStorePanel />
      </div>
    </AdminLayout>
  );
}
