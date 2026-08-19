/**
 * Matches the Figma "dispute managment" design's TYPE column badges: Return / Payment / Order /
 * Policy. "Policy" disputes are Platform-vs-Vendor (no customer involved), the rest are
 * Customer-vs-Vendor.
 */
export type DisputeType = "Return" | "Payment" | "Order" | "Policy";

/** Matches the Figma reference's status TABS/badges: All / Open / In Progress / Resolved / Escalated. */
export type DisputeStatus = "Open" | "In Progress" | "Resolved" | "Escalated";

/** Priority badge shown in the queue's PRIORITY column and the review panel header. */
export type DisputePriority = "Low" | "Medium" | "High";

export interface DisputeRecord {
  /** e.g. "DSP-1048". */
  id: string;
  /** Short secondary line under the Dispute ID, e.g. "Recent update" / "SLA breach". */
  updateNote: string;
  type: DisputeType;
  /** Display order number, e.g. "ORD-84521" — kept as its own field (distinct from `orderId`)
   *  since several rows intentionally don't resolve to a real `ORDERS` entry. */
  orderNumber: string;
  /** Present only when this dispute maps to a real `orders.ts` entry — powers the working
   *  "View Order" link (`/orders/[id]`); absent rows fall back to the `/orders` list route, the
   *  same conditional-fallback pattern `InventoryTable`'s `productHref` uses. */
  orderId?: string;
  /** Absent for Platform-vs-Vendor "Policy" disputes. */
  customerName?: string;
  /** Present only when this dispute matches a real `customers.ts` entry. `/customers/[id]` isn't
   *  built yet (see `Customer.id` in customers.ts), so this is a forward-looking field for now —
   *  same convention `SupportTicket.customerId` already documents. */
  customerId?: string;
  vendorName: string;
  /** Present only when this dispute matches a real `vendors.ts` entry — powers the working
   *  "View Vendor Profile" link (`/vendors/[slug]`). */
  vendorSlug?: string;
  /** Subtitle shown under the Customer vs Vendor names, e.g. "Damaged item reported after pickup". */
  description: string;
  amount: number;
  /** Short note shown under the amount, e.g. "Refund requested". */
  amountNote: string;
  /** Short list-column date, e.g. "28 Jun 2025". */
  raisedDate: string;
  /** Full timestamp, e.g. "28 Jun 2025, 10:15 AM" — shown in the review panel and used to
   *  compute the "Avg Resolution Time" stat for resolved disputes. */
  raisedAt: string;
  /** Only set once `status` is "Resolved" — paired with `raisedAt` to derive the resolution
   *  duration instead of hard-coding an average, the same "never hardcode what can be computed"
   *  rule `PayoutStatsCards`/`ReturnsPagination` already follow for their own stats. */
  resolvedAt?: string;
  status: DisputeStatus;
  priority: DisputePriority;
}

/**
 * Nineteen disputes: the first eight reproduce the Figma reference's sample rows verbatim
 * (same IDs, names, amounts, dates — none of which match a real vendor/customer/order in this
 * project's other mock-data files, so they exercise the "no real link" branch of the queue's
 * View Order/Vendor/Customer links). The remaining eleven are new, cross-referenced from
 * `orders.ts` / `vendors.ts` / `customers.ts` (same order id, vendor name + slug, customer name +
 * id) so the "real link" branch has genuine rows to resolve — the same convention `support.ts`
 * documents for its own `SUPPORT_TICKETS`. This also gives the queue's pagination (8 rows/page)
 * three real pages to move between, matching what the Figma reference's footer implies ("1 2 3").
 */
export const DISPUTES: DisputeRecord[] = [
  {
    id: "DSP-1048",
    updateNote: "Recent update",
    type: "Return",
    orderNumber: "ORD-84521",
    customerName: "Neha Arora",
    vendorName: "Urban Thread Co.",
    description: "Damaged item reported after pickup",
    amount: 2450,
    amountNote: "Refund requested",
    raisedDate: "28 Jun 2025",
    raisedAt: "2025-06-28T10:15:00",
    status: "Open",
    priority: "High",
  },
  {
    id: "DSP-1047",
    updateNote: "Evidence added",
    type: "Payment",
    orderNumber: "ORD-84492",
    customerName: "Riya Mehta",
    vendorName: "Kiosk Lane",
    description: "Duplicate debit on pickup order",
    amount: 1280,
    amountNote: "Chargeback risk",
    raisedDate: "28 Jun 2025",
    raisedAt: "2025-06-28T09:05:00",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "DSP-1046",
    updateNote: "SLA breach",
    type: "Order",
    orderNumber: "ORD-84470",
    customerName: "Arjun Shah",
    vendorName: "Fresh Cart Market",
    description: "Order marked delivered but not received",
    amount: 3920,
    amountNote: "Delivery proof contested",
    raisedDate: "27 Jun 2025",
    raisedAt: "2025-06-27T14:30:00",
    status: "Escalated",
    priority: "High",
  },
  {
    id: "DSP-1045",
    updateNote: "Policy check",
    type: "Policy",
    orderNumber: "ORD-84421",
    vendorName: "Metro Gadgets",
    description: "Restricted item listing on walk-in promo",
    amount: 6500,
    amountNote: "Penalty under review",
    raisedDate: "27 Jun 2025",
    raisedAt: "2025-06-27T11:00:00",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "DSP-1044",
    updateNote: "Vendor reply pending",
    type: "Return",
    orderNumber: "ORD-84388",
    customerName: "Sonal Iyer",
    vendorName: "The Linen Loft",
    description: "Fit mismatch dispute after exchange rejection",
    amount: 1760,
    amountNote: "Exchange requested",
    raisedDate: "26 Jun 2025",
    raisedAt: "2025-06-26T16:20:00",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "DSP-1043",
    updateNote: "Resolved draft",
    type: "Payment",
    orderNumber: "ORD-84351",
    customerName: "Kabir Nair",
    vendorName: "Glow Basket",
    description: "Settlement mismatch after coupon reversal",
    amount: 890,
    amountNote: "Vendor recovery",
    raisedDate: "26 Jun 2025",
    raisedAt: "2025-06-26T08:40:00",
    resolvedAt: "2025-06-27T02:10:00",
    status: "Resolved",
    priority: "Low",
  },
  {
    id: "DSP-1042",
    updateNote: "Awaiting docs",
    type: "Order",
    orderNumber: "ORD-84310",
    customerName: "Aman Khanna",
    vendorName: "HomeGrid Store",
    description: "Pickup ready time exceeded collection window",
    amount: 2180,
    amountNote: "Compensation sought",
    raisedDate: "25 Jun 2025",
    raisedAt: "2025-06-25T13:50:00",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "DSP-1041",
    updateNote: "Escalation requested",
    type: "Policy",
    orderNumber: "ORD-84277",
    vendorName: "Pristine Cosmetics",
    description: "Repeat review manipulation complaint",
    amount: 4200,
    amountNote: "Listing penalty risk",
    raisedDate: "25 Jun 2025",
    raisedAt: "2025-06-25T09:15:00",
    status: "Escalated",
    priority: "High",
  },
  {
    id: "DSP-1040",
    updateNote: "Refund processed",
    type: "Return",
    orderNumber: "#MVU-10481",
    orderId: "mvu-10481",
    customerName: "Arjun Mehta",
    customerId: "arjun-mehta",
    vendorName: "Urban Thread House",
    vendorSlug: "urban-thread-house",
    description: "Size mismatch reported after Shiprocket delivery",
    amount: 3897,
    amountNote: "Refund issued in full",
    raisedDate: "24 Jun 2025",
    raisedAt: "2025-06-24T12:00:00",
    resolvedAt: "2025-06-25T09:30:00",
    status: "Resolved",
    priority: "Low",
  },
  {
    id: "DSP-1039",
    updateNote: "Vendor contacted",
    type: "Payment",
    orderNumber: "#MVU-10476",
    orderId: "mvu-10476",
    customerName: "Ananya Iyer",
    customerId: "ananya-iyer",
    vendorName: "Velora Styles",
    vendorSlug: "velora-styles",
    description: "Shipping fee charged twice at checkout",
    amount: 149,
    amountNote: "Refund requested",
    raisedDate: "23 Jun 2025",
    raisedAt: "2025-06-23T18:45:00",
    status: "In Progress",
    priority: "Low",
  },
  {
    id: "DSP-1038",
    updateNote: "Awaiting customer",
    type: "Order",
    orderNumber: "#MVU-10477",
    orderId: "mvu-10477",
    customerName: "Vikram Singh",
    customerId: "vikram-singh",
    vendorName: "Desi Threads Co.",
    description: "Walk-in no-show billed as completed sale",
    amount: 650,
    amountNote: "Compensation sought",
    raisedDate: "22 Jun 2025",
    raisedAt: "2025-06-22T17:10:00",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "DSP-1037",
    updateNote: "Under senior review",
    type: "Policy",
    orderNumber: "#MVU-10474",
    orderId: "mvu-10474",
    vendorName: "Aurel Lane",
    vendorSlug: "aurel-lane",
    description: "Restricted category listing flagged twice this quarter",
    amount: 5400,
    amountNote: "Listing suspension risk",
    raisedDate: "21 Jun 2025",
    raisedAt: "2025-06-21T10:05:00",
    status: "Escalated",
    priority: "High",
  },
  {
    id: "DSP-1036",
    updateNote: "Evidence requested",
    type: "Return",
    orderNumber: "#MVU-10473",
    orderId: "mvu-10473",
    customerName: "Rahul Bhatt",
    vendorName: "Kraze Fashion",
    vendorSlug: "kraze-fashion",
    description: "Return picked up but refund not initiated",
    amount: 2210,
    amountNote: "Refund requested",
    raisedDate: "20 Jun 2025",
    raisedAt: "2025-06-20T15:25:00",
    status: "Open",
    priority: "High",
  },
  {
    id: "DSP-1035",
    updateNote: "Closed after review",
    type: "Payment",
    orderNumber: "#MVU-10472",
    orderId: "mvu-10472",
    customerName: "Divya Menon",
    vendorName: "Harbor Blend Collective",
    vendorSlug: "harbor-blend-collective",
    description: "UPI payment deducted, order not confirmed",
    amount: 1120,
    amountNote: "Vendor recovery",
    raisedDate: "19 Jun 2025",
    raisedAt: "2025-06-19T08:20:00",
    resolvedAt: "2025-06-19T20:55:00",
    status: "Resolved",
    priority: "Medium",
  },
  {
    id: "DSP-1034",
    updateNote: "Flagged order under review",
    type: "Order",
    orderNumber: "#MVU-10471",
    orderId: "mvu-10471",
    customerName: "Aditya Rao",
    vendorName: "Urban Thread House",
    vendorSlug: "urban-thread-house",
    description: "Customer claims order was never placed",
    amount: 2760,
    amountNote: "Chargeback risk",
    raisedDate: "18 Jun 2025",
    raisedAt: "2025-06-18T11:40:00",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "DSP-1033",
    updateNote: "Vendor reply pending",
    type: "Return",
    orderNumber: "#MVU-10470",
    orderId: "mvu-10470",
    customerName: "Kavya Reddy",
    vendorName: "Moss & Clay",
    description: "Wrong item delivered, exchange requested",
    amount: 1340,
    amountNote: "Exchange requested",
    raisedDate: "17 Jun 2025",
    raisedAt: "2025-06-17T09:50:00",
    status: "Open",
    priority: "Medium",
  },
  {
    id: "DSP-1032",
    updateNote: "Refund under processing",
    type: "Payment",
    orderNumber: "#MVU-10469",
    orderId: "mvu-10469",
    customerName: "Ibrahim Sheikh",
    vendorName: "StyleVault India",
    description: "NDR refund not credited after 10 days",
    amount: 4980,
    amountNote: "Refund overdue",
    raisedDate: "16 Jun 2025",
    raisedAt: "2025-06-16T13:15:00",
    status: "Escalated",
    priority: "High",
  },
  {
    id: "DSP-1031",
    updateNote: "Resolved with partial refund",
    type: "Order",
    orderNumber: "ORD-83984",
    customerName: "Farah Khan",
    vendorName: "Coastal Craft Studio",
    description: "One item missing from multi-item shipment",
    amount: 760,
    amountNote: "Partial refund issued",
    raisedDate: "15 Jun 2025",
    raisedAt: "2025-06-15T10:00:00",
    resolvedAt: "2025-06-16T14:30:00",
    status: "Resolved",
    priority: "Low",
  },
  {
    id: "DSP-1030",
    updateNote: "Policy check pending",
    type: "Policy",
    orderNumber: "ORD-83912",
    vendorName: "Blaze Zone",
    vendorSlug: "blaze-zone",
    description: "Store hours mismatch flagged by walk-in customers",
    amount: 1500,
    amountNote: "Penalty under review",
    raisedDate: "14 Jun 2025",
    raisedAt: "2025-06-14T16:00:00",
    status: "Open",
    priority: "Low",
  },
];

/** "All Types" filter dropdown options. */
export const DISPUTE_TYPE_OPTIONS: DisputeType[] = ["Return", "Payment", "Order", "Policy"];

/** "All Status" filter dropdown options / status tab pills. */
export const DISPUTE_STATUS_OPTIONS: DisputeStatus[] = ["Open", "In Progress", "Resolved", "Escalated"];

/** "Priority: All" filter dropdown options. */
export const DISPUTE_PRIORITY_OPTIONS: DisputePriority[] = ["Low", "Medium", "High"];

/** "Date Range" filter dropdown options — same preset-window convention `ReturnFiltersBar` uses
 *  for its own Date Range filter, evaluated against the real current date. */
export const DISPUTE_DATE_RANGE_OPTIONS = ["Last 7 Days", "Last 30 Days", "Last 90 Days"] as const;
export type DisputeDateRangeOption = (typeof DISPUTE_DATE_RANGE_OPTIONS)[number];
