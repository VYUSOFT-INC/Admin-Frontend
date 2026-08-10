import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AdminLayout } from "@/components/layout/AdminLayout";

/**
 * "My Profile" screen — reached from the Super Admin dropdown menu in the `Topbar` (Figma
 * "super admin drop down", node 1088:672 / item 1088:708). No dedicated admin-profile screen
 * exists elsewhere in the Figma file or the app, so this is a minimal but real destination
 * (account identity + a real link into "Change Password") rather than a dead click. The name/
 * email/role shown here match the same mock Super Admin identity used in the dropdown header and
 * the Topbar's "SA" pill — there's no backend/auth session yet, so it's a static snapshot like
 * every other cross-screen mock value in this app.
 */
export default function ProfilePage() {
  return (
    <AdminLayout title="My Profile" description="View and manage your Super Admin account details">
      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-4">
        <Card className="flex flex-col gap-5 p-6">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="flex size-16 shrink-0 items-center justify-center rounded-full text-xl font-extrabold tracking-[0.28px] text-white"
              style={{ backgroundImage: "linear-gradient(135deg, #d6002e 0%, #e8738c 100%)" }}
            >
              SA
            </span>
            <div className="flex min-w-0 flex-col gap-1.5">
              <h2 className="min-w-0 break-words text-xl font-extrabold tracking-[-0.4px] text-ink">Super Admin</h2>
              <Badge variant="danger">Super Admin</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 border-t border-border pt-5 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.55px] text-gray-500">Email</p>
              <p className="min-w-0 break-words text-sm font-semibold text-ink">admin@mivyu.com</p>
            </div>
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.55px] text-gray-500">Role</p>
              <p className="min-w-0 break-words text-sm font-semibold text-ink">Super Admin</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <Button href="/profile/change-password" variant="primary">
              Change Password
            </Button>
            <Button href="/dashboard" variant="outline">
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
