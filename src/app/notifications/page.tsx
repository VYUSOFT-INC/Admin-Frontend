"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { MarkAllReadIcon } from "@/components/icons/NotificationIcons";
import { NotificationCategoryTabs } from "@/components/notifications/NotificationCategoryTabs";
import { NotificationList } from "@/components/notifications/NotificationList";
import { NotificationSectionTabs } from "@/components/notifications/NotificationSectionTabs";
import { NotificationsPagination } from "@/components/notifications/NotificationsPagination";
import { CATEGORY_TABS, NOTIFICATIONS, type NotificationCategory } from "@/lib/mock-data/notifications";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState<NotificationCategory | "All">("All");

  // Category tab counts are always derived from the full, unfiltered dataset — the same rule
  // `SupportTicketsPage`'s `statusCounts` follows — so switching tabs never makes a tab's own
  // count drift from what's actually in that category.
  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<NotificationCategory | "All", number>> = { All: notifications.length };
    for (const notification of notifications) {
      counts[notification.category] = (counts[notification.category] ?? 0) + 1;
    }
    return counts;
  }, [notifications]);

  const filteredNotifications = useMemo(
    () => (activeCategory === "All" ? notifications : notifications.filter((n) => n.category === activeCategory)),
    [notifications, activeCategory],
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAsRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <AdminLayout title="Notifications" description="Platform activity and alerts that need your attention">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-white px-5 py-4">
          <NotificationSectionTabs />
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex h-[34px] items-center gap-1.5 rounded-[10px] border border-border bg-white px-3.5 text-xs font-bold text-ink transition-colors hover:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MarkAllReadIcon className="size-3.5" />
            Mark All as Read
          </button>
        </div>

        <NotificationCategoryTabs tabs={CATEGORY_TABS} active={activeCategory} onChange={setActiveCategory} counts={categoryCounts} />

        <NotificationList notifications={filteredNotifications} onView={markAsRead} />

        <NotificationsPagination shownCount={filteredNotifications.length} totalCount={notifications.length} />
      </div>
    </AdminLayout>
  );
}
