import { AdminLayout } from "@/components/layout/AdminLayout";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { TaxCompliancePanel } from "@/components/settings/TaxCompliancePanel";

export default function TaxComplianceSettingsPage() {
  return (
    <AdminLayout title="Settings" description="Configure platform rules, commissions, and operations">
      <div className="flex min-w-0 items-start gap-5">
        <SettingsSubNav active="tax-compliance" />
        <TaxCompliancePanel />
      </div>
    </AdminLayout>
  );
}
