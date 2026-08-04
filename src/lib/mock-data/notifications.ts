/**
 * Matches the Figma "notifcation page" design's filter TABS: All / Vendors / Products / Orders /
 * Payments / Support / System.
 */
export type NotificationCategory = "Vendors" | "Products" | "Orders" | "Payments" | "Support" | "System";

/**
 * Which icon glyph a notification renders. Deliberately its own field rather than derived from
 * `category` — the Figma reference's "Payments" (payout overdue) card actually reuses the
 * Support/chat glyph, and its "Support" (ticket escalated) card reuses the Customers/people
 * glyph (see `NotificationIcons.tsx` for the verified path comparisons), so icon and filter
 * category don't always match 1:1 in the source design.
 */
export type NotificationIconKey = "vendor" | "product" | "payout" | "ticket" | "order" | "system";

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  iconKey: NotificationIconKey;
  title: string;
  subtitle: string;
  /** Relative display timestamp, e.g. "2 min ago" — matches the Figma reference's format. */
  timestamp: string;
  read: boolean;
  /** Real in-app route this notification deep-links to via its "View" action. */
  href: string;
}

/**
 * Eight notifications cross-referenced from `vendors.ts` / `products.ts` / `orders.ts` /
 * `payments.ts` — the same convention `support.ts` documents for its own dataset — rather than
 * the Figma reference's invented entities ("Kochi Krafts", "Silk Embroidered Saree" by "Fusia
 * Kollection", etc.). Every "View" link therefore resolves to a real, already-built detail route.
 * Category tab counts and the "All" count are derived from this array at render time in
 * `NotificationsPage`, never hardcoded, the same rule `SupportTicketsPage`'s `statusCounts`
 * follows.
 */
export const NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif-1",
    category: "Vendors",
    iconKey: "vendor",
    title: 'New vendor application from "Maple Wear Co."',
    subtitle: "Physical Store · Pending review",
    timestamp: "2 min ago",
    read: false,
    href: "/vendors/maple-wear-co",
  },
  {
    id: "notif-2",
    category: "Products",
    iconKey: "product",
    title: '"Floral Anarkali Kurta" flagged — Fusia Nari Kollection',
    subtitle: "Price Check Failed",
    timestamp: "15 min ago",
    read: false,
    href: "/products/floral-anarkali-kurta",
  },
  {
    id: "notif-3",
    category: "Payments",
    iconKey: "payout",
    title: "Payout PAY-7796 overdue — Blossom Wear",
    subtitle: "₹30,420 pending release",
    timestamp: "1 hour ago",
    read: false,
    href: "/payments/pay-7796",
  },
  {
    id: "notif-4",
    category: "Support",
    iconKey: "ticket",
    title: "Support ticket escalated #TKT-4821",
    subtitle: "Pickup Issue · High priority",
    timestamp: "2 hours ago",
    read: false,
    href: "/support",
  },
  {
    id: "notif-5",
    category: "Orders",
    iconKey: "order",
    title: "NDR alert: order #MVU-10469 delivery failed",
    subtitle: "Requires vendor action · StyleVault India",
    timestamp: "3 hours ago",
    read: true,
    href: "/orders/mvu-10469",
  },
  {
    id: "notif-6",
    category: "Vendors",
    iconKey: "vendor",
    title: "Vendor suspended: Kraze Fashion",
    subtitle: "Policy violation",
    timestamp: "5 hours ago",
    read: true,
    href: "/vendors/kraze-fashion",
  },
  {
    id: "notif-7",
    category: "Vendors",
    iconKey: "vendor",
    title: "New vendor approved: Harbor Blend Collective",
    subtitle: "Physical Store",
    timestamp: "8 hours ago",
    read: true,
    href: "/vendors/harbor-blend-collective",
  },
  {
    id: "notif-8",
    category: "System",
    iconKey: "system",
    title: "System: Auto-approval processed 18 products",
    subtitle: "All quality checks passed",
    timestamp: "Yesterday",
    read: true,
    href: "/products",
  },
];

/** "All / Vendors / Products / Orders / Payments / Support / System" filter tabs. */
export const CATEGORY_TABS: Array<{ label: string; value: NotificationCategory | "All" }> = [
  { label: "All", value: "All" },
  { label: "Vendors", value: "Vendors" },
  { label: "Products", value: "Products" },
  { label: "Orders", value: "Orders" },
  { label: "Payments", value: "Payments" },
  { label: "Support", value: "Support" },
  { label: "System", value: "System" },
];

/**
 * A single row in the "Notification Preferences" screen's table (Figma "notification
 * preferences", node 1087:325) — per-notification-type control over delivery channels. `category`
 * reuses the same `NotificationCategory` taxonomy `NOTIFICATIONS` above is tagged with (not a
 * separately invented one), even though this screen's table doesn't render the category itself —
 * every row still maps onto a real category from the feed.
 */
export interface NotificationPreferenceRow {
  id: string;
  category: NotificationCategory;
  label: string;
  /** Always `true` for every row in the Figma reference — the design renders it as a "Locked On"
   * pill (a padlock glyph + label), never as a toggle, unlike `emailEnabled` below. In-app
   * delivery for these admin-critical alerts is a fixed platform policy an admin can't turn off.
   * Kept as an explicit field rather than assumed so a future row that *is* toggleable can drop in
   * without restructuring this type. */
  inAppLocked: true;
  emailEnabled: boolean;
}

/**
 * Seed matches the Figma reference's 9 rows and their exact ON/OFF Email states one-for-one.
 * `NotificationPreferencesPanel` holds edits in local draft state and only mutates this array in
 * place on Save, the same convention `COMMISSION_CATEGORY_RATES` follows for `CommissionRatesPanel`.
 */
export const NOTIFICATION_PREFERENCES: NotificationPreferenceRow[] = [
  { id: "pref-new-vendor-application", category: "Vendors", label: "New Vendor Application", inAppLocked: true, emailEnabled: true },
  { id: "pref-product-flagged", category: "Products", label: "Product Flagged by System", inAppLocked: true, emailEnabled: true },
  { id: "pref-payout-overdue", category: "Payments", label: "Payout Overdue", inAppLocked: true, emailEnabled: true },
  { id: "pref-ndr-alert", category: "Orders", label: "NDR Alert", inAppLocked: true, emailEnabled: false },
  { id: "pref-support-ticket-escalated", category: "Support", label: "Support Ticket Escalated", inAppLocked: true, emailEnabled: true },
  { id: "pref-return-dispute", category: "Orders", label: "Return Dispute", inAppLocked: true, emailEnabled: true },
  { id: "pref-vendor-suspended", category: "Vendors", label: "Vendor Suspended", inAppLocked: true, emailEnabled: false },
  { id: "pref-system-health-alert", category: "System", label: "System Health Alert", inAppLocked: true, emailEnabled: true },
  { id: "pref-auto-approval-summary", category: "System", label: "Auto-Approval Summary (daily digest)", inAppLocked: true, emailEnabled: false },
];
