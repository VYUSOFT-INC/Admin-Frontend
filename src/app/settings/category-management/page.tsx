import { AdminLayout } from "@/components/layout/AdminLayout";
import { SettingsSubNav } from "@/components/settings/SettingsSubNav";
import { CategoryManagementPanel } from "@/components/settings/CategoryManagementPanel";

export default function CategoryManagementPage() {
  return (
    <AdminLayout title="Settings" description="Configure platform rules, commissions, and operations">
      <div className="flex min-w-0 items-start gap-5">
        <SettingsSubNav active="category-management" />
        <CategoryManagementPanel />
      </div>
    </AdminLayout>
  );
}
