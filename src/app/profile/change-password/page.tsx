import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";

/**
 * "Change Password" screen — reached from the Super Admin dropdown menu in the `Topbar`
 * (Figma "super admin drop down", node 1088:672 / item 1088:717). Not part of the reference
 * frame itself (the dropdown only links to it); built as a minimal but real destination rather
 * than leaving the menu item as a dead click.
 */
export default function ChangePasswordPage() {
  return (
    <AdminLayout title="Change Password" description="Update the password for your Super Admin account">
      <div className="mx-auto w-full max-w-[480px]">
        <Card className="p-6">
          <ChangePasswordForm />
        </Card>
      </div>
    </AdminLayout>
  );
}
