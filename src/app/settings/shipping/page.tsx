import { AdminLayout } from "@/components/layout/AdminLayout";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { ShippingPanel } from "@/components/settings/ShippingPanel";

export default function ShippingSettingsPage() {
  return (
    <AdminLayout title="Settings" description="Configure platform rules, commissions, and operations">
      <div className="flex min-w-0 items-start gap-5">
        <SettingsSubNav active="shipping" />
        <ShippingPanel />
      </div>
    </AdminLayout>
  );
}
