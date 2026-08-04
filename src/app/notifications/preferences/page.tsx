"use client";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { NotificationPreferencesPanel } from "@/components/notifications/NotificationPreferencesPanel";
import { NotificationSectionTabs } from "@/components/notifications/NotificationSectionTabs";

/**
 * "Notification Preferences" screen (Figma "notification preferences", node 1087:325) — reached
 * from the "Preferences" tab of `NotificationSectionTabs`, shared with the `/notifications` feed
 * page. See `NotificationPreferencesPanel` for why this page doesn't reproduce the reference
 * frame's leftover category-filter-tabs/"Mark All as Read" header row.
 */
export default function NotificationPreferencesPage() {
  return (
    <AdminLayout title="Notifications" description="Platform activity and alerts that need your attention">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-white px-5 py-4">
          <NotificationSectionTabs />
        </div>

        <NotificationPreferencesPanel />
      </div>
    </AdminLayout>
  );
}
