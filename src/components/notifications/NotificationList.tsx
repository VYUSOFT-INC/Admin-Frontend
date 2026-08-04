import { Card } from "@/components/ui/Card";
import { NotificationCard } from "@/components/notifications/NotificationCard";
import type { AppNotification } from "@/lib/mock-data/notifications";

interface NotificationListProps {
  notifications: AppNotification[];
  onView: (id: string) => void;
}

/** The notification feed card — a `divide-y` stack of `NotificationCard` rows (so only rows
 * between two items get a border, matching the Figma reference's last row having none), with an
 * empty state when the active category filter matches nothing. */
export function NotificationList({ notifications, onView }: NotificationListProps) {
  return (
    <Card className="overflow-hidden">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center gap-1 px-5 py-16 text-center">
          <p className="text-sm font-bold text-ink">No notifications here</p>
          <p className="text-xs font-medium text-gray-500">Nothing matches this filter right now — check back later.</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} onView={onView} />
          ))}
        </div>
      )}
    </Card>
  );
}
