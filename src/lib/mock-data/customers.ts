import type { FulfillmentType } from "@/lib/mock-data/products";
import type { OrderStatus } from "@/lib/mock-data/orders";

/** Matches the Figma "customers search" design's single status badge on the profile card
 * (green "Active"); "Blocked" is added so `CustomerAdminActions`'s "Block Account" button
 * has a real second state to toggle into, reusing the danger/red token already used for
 * blocked/rejected states elsewhere in the app. */
export type CustomerStatus = "Active" | "Blocked";

/**
 * A customer's order-history status vocabulary. Mostly the shared order-management `OrderStatus`
 * union, plus "Picked Up" and "Returned" — two states the Figma "customer" detail view (node
 * 1143:3885) shows in its Order History table that the Order Management screen's own status set
 * doesn't use. Kept as its own union (rather than widening `OrderStatus` itself) so this screen's
 * two extra states can't leak into Order Management's status filter tabs.
 */
export type CustomerOrderStatus = OrderStatus | "Picked Up" | "Returned";

/**
 * A single row in a customer's "Order History" table (Figma node 1143:4098). Deliberately its
 * own shape (not a reference into `ORDERS`) — a customer's full order history can reach further
 * back than the handful of orders the shared `ORDERS` array carries for the Order Management
 * screen, exactly like `ReturnRequest.orderId` in `returns.ts` already references order ids the
 * `ORDERS` list doesn't have. `orderId` still matches a real `ORDERS` entry where one exists (so
 * "View Order" genuinely opens that order), and callers fall back to the `/orders` list
 * otherwise — the same `orderExists` pattern `ReturnDetailHeader` uses.
 */
export interface CustomerRecentOrder {
  orderId: string;
  orderNumber: string;
  date: string;
  fulfillment: FulfillmentType;
  amount: number;
  status: CustomerOrderStatus;
}

/** A single card in the "Saved Addresses" section (Figma node 1143:4340). */
export interface CustomerAddress {
  /** "Home" / "Work" / "Other" — the Figma design repeats "Other" for more than one card. */
  label: string;
  /** Only the customer's one "Home" address carries this in the Figma design. */
  isDefault?: boolean;
  addressLine: string;
  /** e.g. "Primary delivery address • Mumbai" — small caption under the address. */
  note: string;
}

/** A single row in the "Activity Log" timeline (Figma node 1143:4387). */
export interface CustomerActivityEntry {
  title: string;
  description: string;
  timestamp: string;
}

export interface Customer {
  /** Lowercase slug reserved for the future `/customers/[id]` detail route (not built by this screen). */
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  registeredDate: string;
  status: CustomerStatus;
  totalReturns: number;
  /** Lifetime order counts by fulfillment channel — the Figma "FULFILLMENT PREFERENCE" strip.
   * The profile card's "N Total Orders" figure is always derived by summing these three (see
   * `getTotalOrders` below) rather than stored separately, so the two can never drift apart —
   * the exact class of stat-mismatch bug caught on the Payout Detail screen. `orderHistory`
   * below always carries exactly this many rows, for the same reason. */
  fulfillmentBreakdown: {
    delivery: number;
    pickup: number;
    walkin: number;
  };
  /** Full "Order History" table, most recent first — length always equals `getTotalOrders`. */
  orderHistory: CustomerRecentOrder[];
  addresses: CustomerAddress[];
  activityLog: CustomerActivityEntry[];
  adminNotes: string[];
}

/** Single source of truth for a customer's lifetime order count — always the sum of the
 * fulfillment breakdown, never a separately hardcoded figure. */
export function getTotalOrders(customer: Customer): number {
  const { delivery, pickup, walkin } = customer.fulfillmentBreakdown;
  return delivery + pickup + walkin;
}

/**
 * Six customers cross-referenced from `orders.ts` / `returns.ts` (same name, email, phone, and
 * at least one real order/return id) rather than invented from scratch, so this screen's search
 * results stay consistent with the Order Management and Returns screens. Each customer's
 * `orderHistory` leads with their real order from `ORDERS`, followed by older orders predating
 * the shared `ORDERS` window (ids like "mvu-102xx"/"mvu-101xx"/"mvu-099xx" that intentionally
 * aren't in `ORDERS` — see `CustomerRecentOrder` above) so the full history matches each
 * customer's lifetime `fulfillmentBreakdown` total exactly, and so `CustomerOrdersTable`'s
 * pagination has real multi-page customers (Arjun, Meera) to page through alongside single-page
 * ones (everyone else) — the same "wired but only one page when the dataset is small" pattern
 * `OrdersPagination` already documents.
 */
export const CUSTOMERS: Customer[] = [
  {
    id: "arjun-mehta",
    name: "Arjun Mehta",
    email: "arjun.mehta@gmail.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka",
    registeredDate: "18 Feb 2024",
    status: "Active",
    totalReturns: 1,
    fulfillmentBreakdown: { delivery: 9, pickup: 2, walkin: 0 },
    orderHistory: [
      { orderId: "mvu-10481", orderNumber: "#MVU-10481", date: "12 Jul 2025", fulfillment: "Delivery", amount: 3897, status: "Shipped" },
      { orderId: "mvu-10298", orderNumber: "#MVU-10298", date: "02 May 2025", fulfillment: "Delivery", amount: 2140, status: "Delivered" },
      { orderId: "mvu-10176", orderNumber: "#MVU-10176", date: "14 Mar 2025", fulfillment: "In-Store Pickup", amount: 1580, status: "Collected" },
      { orderId: "mvu-10102", orderNumber: "#MVU-10102", date: "20 Jan 2025", fulfillment: "Delivery", amount: 990, status: "Cancelled" },
      { orderId: "mvu-10061", orderNumber: "#MVU-10061", date: "05 Dec 2024", fulfillment: "Delivery", amount: 3120, status: "Delivered" },
      { orderId: "mvu-10034", orderNumber: "#MVU-10034", date: "18 Nov 2024", fulfillment: "In-Store Pickup", amount: 1450, status: "Collected" },
      { orderId: "mvu-10009", orderNumber: "#MVU-10009", date: "02 Oct 2024", fulfillment: "Delivery", amount: 2780, status: "Delivered" },
      { orderId: "mvu-09988", orderNumber: "#MVU-09988", date: "14 Sep 2024", fulfillment: "Delivery", amount: 1990, status: "Delivered" },
      { orderId: "mvu-09951", orderNumber: "#MVU-09951", date: "22 Aug 2024", fulfillment: "Delivery", amount: 890, status: "Returned" },
      { orderId: "mvu-09918", orderNumber: "#MVU-09918", date: "30 Jul 2024", fulfillment: "Delivery", amount: 3450, status: "Delivered" },
      { orderId: "mvu-09887", orderNumber: "#MVU-09887", date: "09 Jul 2024", fulfillment: "Delivery", amount: 1675, status: "Delivered" },
    ],
    addresses: [
      {
        label: "Home",
        isDefault: true,
        addressLine: "204, Prestige Meridian, MG Road, Bengaluru, Karnataka 560001",
        note: "Primary delivery address • Bengaluru",
      },
      {
        label: "Work",
        addressLine: "Tower B, Cessna Business Park, Kadubeesanahalli, Bengaluru, Karnataka 560103",
        note: "Office address • Saved for weekday deliveries",
      },
    ],
    activityLog: [
      { title: "Order placed — #MVU-10481", description: "Delivery order placed from iPhone 14 • Bengaluru", timestamp: "12 Jul 2025 · 11:20 AM" },
      { title: "Login event", description: "Successful login from Safari on iOS • Bengaluru", timestamp: "12 Jul 2025 · 11:15 AM" },
      { title: "Order placed — #MVU-10298", description: "Delivery order placed from Chrome on macOS • Bengaluru", timestamp: "02 May 2025 · 04:40 PM" },
      { title: "Return raised — #MVU-10176", description: "Return request submitted for size mismatch", timestamp: "20 Mar 2025 · 09:12 AM" },
      { title: "Order placed — #MVU-10176", description: "In-store pickup order placed for MG Road store", timestamp: "14 Mar 2025 · 06:05 PM" },
      { title: "Address changed", description: "Added work address at Cessna Business Park", timestamp: "05 Feb 2025 · 01:30 PM" },
      { title: "Account created", description: "Customer account registered using email and phone verification", timestamp: "18 Feb 2024 · 10:02 AM" },
    ],
    adminNotes: [],
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    email: "priya.nair@outlook.com",
    phone: "+91 98123 45678",
    location: "Mumbai, Maharashtra",
    registeredDate: "03 Jun 2024",
    status: "Active",
    totalReturns: 0,
    fulfillmentBreakdown: { delivery: 3, pickup: 6, walkin: 1 },
    orderHistory: [
      { orderId: "mvu-10480", orderNumber: "#MVU-10480", date: "12 Jul 2025", fulfillment: "In-Store Pickup", amount: 1450, status: "Ready for Pickup" },
      { orderId: "mvu-10254", orderNumber: "#MVU-10254", date: "19 Apr 2025", fulfillment: "In-Store Pickup", amount: 2200, status: "Collected" },
      { orderId: "mvu-10133", orderNumber: "#MVU-10133", date: "08 Feb 2025", fulfillment: "Delivery", amount: 860, status: "Delivered" },
      { orderId: "mvu-10087", orderNumber: "#MVU-10087", date: "22 Dec 2024", fulfillment: "Delivery", amount: 1650, status: "Delivered" },
      { orderId: "mvu-10052", orderNumber: "#MVU-10052", date: "30 Nov 2024", fulfillment: "In-Store Pickup", amount: 1340, status: "Picked Up" },
      { orderId: "mvu-10021", orderNumber: "#MVU-10021", date: "14 Nov 2024", fulfillment: "Walk-in", amount: 620, status: "Completed" },
      { orderId: "mvu-09995", orderNumber: "#MVU-09995", date: "27 Oct 2024", fulfillment: "In-Store Pickup", amount: 1760, status: "Collected" },
      { orderId: "mvu-09962", orderNumber: "#MVU-09962", date: "05 Oct 2024", fulfillment: "Delivery", amount: 990, status: "Delivered" },
      { orderId: "mvu-09930", orderNumber: "#MVU-09930", date: "18 Sep 2024", fulfillment: "In-Store Pickup", amount: 1520, status: "Collected" },
      { orderId: "mvu-09901", orderNumber: "#MVU-09901", date: "02 Sep 2024", fulfillment: "In-Store Pickup", amount: 880, status: "Cancelled" },
    ],
    addresses: [
      {
        label: "Home",
        isDefault: true,
        addressLine: "Flat 802, Sunrise Apartments, Linking Road, Bandra West, Mumbai, Maharashtra 400050",
        note: "Primary delivery address • Mumbai",
      },
      {
        label: "Work",
        addressLine: "Unit 305, One BKC, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
        note: "Office address • Saved for weekday deliveries",
      },
      {
        label: "Other",
        addressLine: "Store Pickup Contact, Phoenix Palladium, Lower Parel, Mumbai, Maharashtra 400013",
        note: "Preferred pickup zone • Mall landmark added",
      },
    ],
    activityLog: [
      { title: "Order placed — #MVU-10480", description: "In-store pickup order placed for Bandra store", timestamp: "12 Jul 2025 · 05:50 PM" },
      { title: "Login event", description: "Successful login from Android app • Mumbai", timestamp: "12 Jul 2025 · 05:40 PM" },
      { title: "Order placed — #MVU-10254", description: "In-store pickup order placed for BKC store", timestamp: "19 Apr 2025 · 12:15 PM" },
      { title: "Login event", description: "Successful login from Chrome on Windows • Mumbai", timestamp: "19 Apr 2025 · 11:50 AM" },
      { title: "Order placed — #MVU-10133", description: "Delivery order placed from mobile web • Mumbai", timestamp: "08 Feb 2025 · 02:22 PM" },
      { title: "Address changed", description: "Added pickup contact address for Lower Parel mall", timestamp: "22 Dec 2024 · 10:05 AM" },
      { title: "Account created", description: "Customer account registered using email and phone verification", timestamp: "03 Jun 2024 · 09:15 AM" },
    ],
    adminNotes: [],
  },
  {
    id: "ananya-iyer",
    name: "Ananya Iyer",
    email: "ananya.iyer@gmail.com",
    phone: "+91 98450 33221",
    location: "Pune, Maharashtra",
    registeredDate: "27 Sep 2023",
    status: "Active",
    totalReturns: 1,
    fulfillmentBreakdown: { delivery: 7, pickup: 1, walkin: 0 },
    orderHistory: [
      { orderId: "mvu-10476", orderNumber: "#MVU-10476", date: "10 Jul 2025", fulfillment: "Delivery", amount: 5120, status: "Processing" },
      { orderId: "mvu-10321", orderNumber: "#MVU-10321", date: "30 May 2025", fulfillment: "Delivery", amount: 3299, status: "Delivered" },
      { orderId: "mvu-10214", orderNumber: "#MVU-10214", date: "11 Apr 2025", fulfillment: "Delivery", amount: 1750, status: "Delivered" },
      { orderId: "mvu-10165", orderNumber: "#MVU-10165", date: "22 Mar 2025", fulfillment: "In-Store Pickup", amount: 1420, status: "Collected" },
      { orderId: "mvu-10098", orderNumber: "#MVU-10098", date: "15 Feb 2025", fulfillment: "Delivery", amount: 2860, status: "Delivered" },
      { orderId: "mvu-10047", orderNumber: "#MVU-10047", date: "28 Jan 2025", fulfillment: "Delivery", amount: 3980, status: "Delivered" },
      { orderId: "mvu-10002", orderNumber: "#MVU-10002", date: "09 Jan 2025", fulfillment: "Delivery", amount: 1240, status: "Returned" },
      { orderId: "mvu-09965", orderNumber: "#MVU-09965", date: "20 Dec 2024", fulfillment: "Delivery", amount: 2210, status: "Delivered" },
    ],
    addresses: [
      {
        label: "Home",
        isDefault: true,
        addressLine: "B-14, Green Meadows Society, Baner Road, Pune, Maharashtra 411045",
        note: "Primary delivery address • Pune",
      },
      {
        label: "Other",
        addressLine: "C/o Ramesh Iyer, Kothrud, Pune, Maharashtra 411038",
        note: "Family address • Weekend delivery preference",
      },
    ],
    activityLog: [
      { title: "Order placed — #MVU-10476", description: "Delivery order placed from Android app • Pune", timestamp: "10 Jul 2025 · 08:35 AM" },
      { title: "Login event", description: "Successful login from Chrome on Android • Pune", timestamp: "10 Jul 2025 · 08:30 AM" },
      { title: "Order placed — #MVU-10321", description: "Delivery order placed from iPhone 13 • Pune", timestamp: "30 May 2025 · 03:12 PM" },
      { title: "Return raised — #MVU-10002", description: "Return request submitted for wrong item received", timestamp: "12 Jan 2025 · 06:48 PM" },
      { title: "Order placed — #MVU-10002", description: "Delivery order placed from Safari on macOS • Pune", timestamp: "09 Jan 2025 · 11:02 AM" },
      { title: "Login event", description: "Successful login from Firefox on Windows • Pune", timestamp: "09 Jan 2025 · 10:58 AM" },
      { title: "Account created", description: "Customer account registered using email and phone verification", timestamp: "27 Sep 2023 · 04:20 PM" },
    ],
    adminNotes: [],
  },
  {
    id: "tanya-chopra",
    name: "Tanya Chopra",
    email: "tanya.chopra@gmail.com",
    phone: "+91 98234 56712",
    location: "Mumbai, Maharashtra",
    registeredDate: "11 Nov 2023",
    status: "Active",
    totalReturns: 1,
    fulfillmentBreakdown: { delivery: 2, pickup: 5, walkin: 2 },
    orderHistory: [
      { orderId: "mvu-10466", orderNumber: "#MVU-10466", date: "05 Jul 2025", fulfillment: "In-Store Pickup", amount: 2860, status: "Collected" },
      { orderId: "mvu-10287", orderNumber: "#MVU-10287", date: "26 Apr 2025", fulfillment: "In-Store Pickup", amount: 1340, status: "Collected" },
      { orderId: "mvu-10159", orderNumber: "#MVU-10159", date: "02 Mar 2025", fulfillment: "Walk-in", amount: 540, status: "Completed" },
      { orderId: "mvu-10108", orderNumber: "#MVU-10108", date: "09 Feb 2025", fulfillment: "Delivery", amount: 1980, status: "Delivered" },
      { orderId: "mvu-10061", orderNumber: "#MVU-10061", date: "21 Jan 2025", fulfillment: "In-Store Pickup", amount: 1120, status: "Picked Up" },
      { orderId: "mvu-10019", orderNumber: "#MVU-10019", date: "03 Jan 2025", fulfillment: "Walk-in", amount: 460, status: "No Show" },
      { orderId: "mvu-09978", orderNumber: "#MVU-09978", date: "15 Dec 2024", fulfillment: "In-Store Pickup", amount: 1650, status: "Collected" },
      { orderId: "mvu-09941", orderNumber: "#MVU-09941", date: "27 Nov 2024", fulfillment: "In-Store Pickup", amount: 980, status: "Cancelled" },
      { orderId: "mvu-09905", orderNumber: "#MVU-09905", date: "08 Nov 2024", fulfillment: "Delivery", amount: 2340, status: "Delivered" },
    ],
    addresses: [
      {
        label: "Home",
        isDefault: true,
        addressLine: "12, Silver Oak CHS, Yari Road, Versova, Mumbai, Maharashtra 400061",
        note: "Primary delivery address • Mumbai",
      },
      {
        label: "Other",
        addressLine: "Store Pickup Contact, Infiniti Mall, Malad West, Mumbai, Maharashtra 400064",
        note: "Preferred pickup zone • Weekend walk-ins",
      },
      {
        label: "Other",
        addressLine: "45, Sea View Apartments, Carter Road, Bandra West, Mumbai, Maharashtra 400050",
        note: "Family address • Weekend pickup preference",
      },
    ],
    activityLog: [
      { title: "Return raised — #MVU-10466", description: "Return request submitted for damaged item photo evidence", timestamp: "09 Jul 2025 · 10:06 AM" },
      { title: "Order placed — #MVU-10466", description: "In-store pickup order placed for Versova store", timestamp: "05 Jul 2025 · 01:18 PM" },
      { title: "Login event", description: "Successful login from iPhone 15 app • Mumbai", timestamp: "05 Jul 2025 · 01:10 PM" },
      { title: "Order placed — #MVU-10159", description: "Walk-in purchase confirmed through partner store", timestamp: "02 Mar 2025 · 05:40 PM" },
      { title: "Address changed", description: "Updated pickup contact address for Malad mall", timestamp: "15 Dec 2024 · 02:18 PM" },
      { title: "Login event", description: "Successful login from Chrome on Windows • Mumbai", timestamp: "27 Nov 2024 · 09:02 AM" },
      { title: "Account created", description: "Customer account registered using email and phone verification", timestamp: "11 Nov 2023 · 03:44 PM" },
    ],
    adminNotes: [],
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "+91 99887 66554",
    location: "Bengaluru, Karnataka",
    registeredDate: "05 Jan 2025",
    status: "Blocked",
    totalReturns: 1,
    fulfillmentBreakdown: { delivery: 1, pickup: 0, walkin: 4 },
    orderHistory: [
      { orderId: "mvu-10477", orderNumber: "#MVU-10477", date: "11 Jul 2025", fulfillment: "Walk-in", amount: 650, status: "No Show" },
      { orderId: "mvu-10309", orderNumber: "#MVU-10309", date: "27 May 2025", fulfillment: "Walk-in", amount: 410, status: "No Show" },
      { orderId: "mvu-10201", orderNumber: "#MVU-10201", date: "16 Mar 2025", fulfillment: "Walk-in", amount: 780, status: "Completed" },
      { orderId: "mvu-10142", orderNumber: "#MVU-10142", date: "20 Feb 2025", fulfillment: "Walk-in", amount: 520, status: "No Show" },
      { orderId: "mvu-10088", orderNumber: "#MVU-10088", date: "25 Jan 2025", fulfillment: "Delivery", amount: 890, status: "Cancelled" },
    ],
    addresses: [
      {
        label: "Home",
        isDefault: true,
        addressLine: "17, Indiranagar 100ft Road, Bengaluru, Karnataka 560038",
        note: "Primary address • Bengaluru",
      },
      {
        label: "Other",
        addressLine: "Store Pickup Contact, Desi Threads Co., Koramangala, Bengaluru, Karnataka 560095",
        note: "Walk-in reservation location",
      },
    ],
    activityLog: [
      { title: "Account status changed", description: "Status changed to Blocked after repeated no-shows", timestamp: "11 Jul 2025 · 06:20 PM" },
      { title: "Order placed — #MVU-10477", description: "Walk-in purchase confirmed through partner store", timestamp: "11 Jul 2025 · 05:30 PM" },
      { title: "Login event", description: "Successful login from Android app • Bengaluru", timestamp: "11 Jul 2025 · 05:15 PM" },
      { title: "Order placed — #MVU-10309", description: "Walk-in purchase confirmed through partner store", timestamp: "27 May 2025 · 04:10 PM" },
      { title: "Return raised — #MVU-10201", description: "Requested size exchange after walk-in purchase", timestamp: "20 Mar 2025 · 02:00 PM" },
      { title: "Order placed — #MVU-10201", description: "Walk-in purchase confirmed through partner store", timestamp: "16 Mar 2025 · 12:35 PM" },
      { title: "Login event", description: "Successful login from Chrome on Android • Bengaluru", timestamp: "16 Mar 2025 · 12:20 PM" },
      { title: "Account created", description: "Customer account registered using email and phone verification", timestamp: "05 Jan 2025 · 09:50 AM" },
    ],
    adminNotes: ["Repeated no-shows on walk-in reservations — flagged by Desi Threads Co. on 11 Jul 2025."],
  },
  {
    id: "meera-pillai",
    name: "Meera Pillai",
    email: "meera.pillai@icloud.com",
    phone: "+91 98123 65478",
    location: "Bengaluru, Karnataka",
    registeredDate: "14 Aug 2023",
    status: "Active",
    totalReturns: 1,
    fulfillmentBreakdown: { delivery: 12, pickup: 0, walkin: 0 },
    orderHistory: [
      { orderId: "mvu-10468", orderNumber: "#MVU-10468", date: "06 Jul 2025", fulfillment: "Delivery", amount: 8940, status: "Delivered" },
      { orderId: "mvu-10276", orderNumber: "#MVU-10276", date: "23 Apr 2025", fulfillment: "Delivery", amount: 4120, status: "Delivered" },
      { orderId: "mvu-10188", orderNumber: "#MVU-10188", date: "09 Mar 2025", fulfillment: "Delivery", amount: 2260, status: "Delivered" },
      { orderId: "mvu-10140", orderNumber: "#MVU-10140", date: "20 Feb 2025", fulfillment: "Delivery", amount: 3650, status: "Delivered" },
      { orderId: "mvu-10095", orderNumber: "#MVU-10095", date: "05 Feb 2025", fulfillment: "Delivery", amount: 1980, status: "Delivered" },
      { orderId: "mvu-10052", orderNumber: "#MVU-10052", date: "22 Jan 2025", fulfillment: "Delivery", amount: 5420, status: "Delivered" },
      { orderId: "mvu-10011", orderNumber: "#MVU-10011", date: "08 Jan 2025", fulfillment: "Delivery", amount: 2890, status: "Delivered" },
      { orderId: "mvu-09972", orderNumber: "#MVU-09972", date: "20 Dec 2024", fulfillment: "Delivery", amount: 1450, status: "Returned" },
      { orderId: "mvu-09935", orderNumber: "#MVU-09935", date: "03 Dec 2024", fulfillment: "Delivery", amount: 3980, status: "Delivered" },
      { orderId: "mvu-09902", orderNumber: "#MVU-09902", date: "15 Nov 2024", fulfillment: "Delivery", amount: 2670, status: "Delivered" },
      { orderId: "mvu-09865", orderNumber: "#MVU-09865", date: "28 Oct 2024", fulfillment: "Delivery", amount: 4210, status: "Delivered" },
      { orderId: "mvu-09830", orderNumber: "#MVU-09830", date: "10 Oct 2024", fulfillment: "Delivery", amount: 1890, status: "Delivered" },
    ],
    addresses: [
      {
        label: "Home",
        isDefault: true,
        addressLine: "88, Whitefield Main Road, Bengaluru, Karnataka 560066",
        note: "Primary delivery address • Bengaluru",
      },
      {
        label: "Work",
        addressLine: "4th Floor, RMZ Ecoworld, Bellandur, Bengaluru, Karnataka 560103",
        note: "Office address • Saved for weekday deliveries",
      },
    ],
    activityLog: [
      { title: "Order placed — #MVU-10468", description: "Delivery order placed from iPhone 14 • Bengaluru", timestamp: "06 Jul 2025 · 07:44 PM" },
      { title: "Login event", description: "Successful login from Safari on iOS • Bengaluru", timestamp: "06 Jul 2025 · 07:38 PM" },
      { title: "Order placed — #MVU-10276", description: "Delivery order placed from Chrome on macOS • Bengaluru", timestamp: "23 Apr 2025 · 02:05 PM" },
      { title: "Return raised — #MVU-09972", description: "Return request submitted for size exchange", timestamp: "22 Dec 2024 · 11:30 AM" },
      { title: "Order placed — #MVU-09972", description: "Delivery order placed from mobile web • Bengaluru", timestamp: "20 Dec 2024 · 03:15 PM" },
      { title: "Address changed", description: "Added work address at RMZ Ecoworld", timestamp: "02 Nov 2024 · 10:40 AM" },
      { title: "Account created", description: "Customer account registered using email and phone verification", timestamp: "14 Aug 2023 · 01:12 PM" },
    ],
    adminNotes: [],
  },
];
