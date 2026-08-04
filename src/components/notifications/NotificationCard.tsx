import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { OrdersIcon, ProductsIcon, SupportIcon, VendorsIcon, CustomersIcon } from "@/components/icons/NavIcons";
import { SystemIcon } from "@/components/icons/NotificationIcons";
import type { AppNotification, NotificationIconKey } from "@/lib/mock-data/notifications";

/**
 * Maps each notification's `iconKey` to the glyph + circle colors verified against the Figma
 * export (see `NotificationIcons.tsx` for the path-comparison notes on the reused glyphs).
 */
const ICON_STYLES: Record<
  NotificationIconKey,
  { Icon: ComponentType<SVGProps<SVGSVGElement>>; bgClassName: string; colorClassName: string }
> = {
  vendor: { Icon: VendorsIcon, bgClassName: "bg-[#e5ecfd]", colorClassName: "text-[#2563eb]" },
  product: { Icon: ProductsIcon, bgClassName: "bg-[#fcebe2]", colorClassName: "text-[#ea580c]" },
  payout: { Icon: SupportIcon, bgClassName: "bg-primary-soft", colorClassName: "text-primary" },
  ticket: { Icon: CustomersIcon, bgClassName: "bg-[#efe7fd]", colorClassName: "text-[#7c3aed]" },
  order: { Icon: OrdersIcon, bgClassName: "bg-success-light", colorClassName: "text-success" },
  system: { Icon: SystemIcon, bgClassName: "bg-[#eceef1]", colorClassName: "text-[#64748b]" },
};

interface NotificationCardProps {
  notification: AppNotification;
  /** Marks this notification read — called on click, before navigating to its real `href`. */
  onView: (id: string) => void;
}

/** A single row in the Notifications list — icon, title/subtitle/timestamp, an unread dot, and a
 * "View" action that both marks the notification read and deep-links to its real screen. The
 * whole row is one `Link` (not a nested anchor around a "View" link) so it stays valid HTML while
 * still reading as a single clickable item, matching the Figma reference's row-as-link intent. */
export function NotificationCard({ notification, onView }: NotificationCardProps) {
  const { Icon, bgClassName, colorClassName } = ICON_STYLES[notification.iconKey];
  const isUnread = !notification.read;

  return (
    <Link
      href={notification.href}
      onClick={() => onView(notification.id)}
      className={`flex items-start gap-3.5 px-5 py-4 transition-colors hover:bg-surface-tint ${isUnread ? "bg-[#fdf5f7]" : "bg-white"}`}
    >
      <span className={`mt-0.5 flex size-[38px] shrink-0 items-center justify-center rounded-full ${bgClassName}`}>
        <Icon className={`size-4 ${colorClassName}`} />
      </span>

      <div className="min-w-0 flex-1">
        <p className={`min-w-0 break-words text-[13px] text-ink ${isUnread ? "font-bold" : "font-medium"}`}>{notification.title}</p>
        <p className="mt-1 min-w-0 break-words text-xs font-medium text-gray-500">{notification.subtitle}</p>
        <p className="mt-1.5 min-w-0 break-words text-[11px] font-medium text-gray-500">{notification.timestamp}</p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-2">
        {isUnread && <span className="size-2 rounded-sm bg-[#2563eb]" aria-hidden />}
        <span className="text-[11px] font-bold text-primary">View</span>
      </div>
    </Link>
  );
}
