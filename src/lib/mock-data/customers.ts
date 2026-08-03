import type { FulfillmentType } from "@/lib/mock-data/products";
import type { OrderStatus } from "@/lib/mock-data/orders";

/** Matches the Figma "customers search" design's single status badge on the profile card
 * (green "Active"); "Blocked" is added so `CustomerAdminActions`'s "Block Account" button
 * has a real second state to toggle into, reusing the danger/red token already used for
 * blocked/rejected states elsewhere in the app. */
export type CustomerStatus = "Active" | "Blocked";

/**
 * A single row in a customer's "Recent Orders" table. Deliberately its own shape (not a
 * reference into `ORDERS`) — a customer's full order history can reach further back than the
 * handful of orders the shared `ORDERS` array carries for the Order Management screen, exactly
 * like `ReturnRequest.orderId` in `returns.ts` already references order ids the `ORDERS` list
 * doesn't have. `orderId` still matches a real `ORDERS` entry where one exists (so "View Order"
 * genuinely opens that order), and callers fall back to the `/orders` list otherwise — the same
 * `orderExists` pattern `ReturnDetailHeader` uses.
 */
export interface CustomerRecentOrder {
  orderId: string;
  orderNumber: string;
  date: string;
  fulfillment: FulfillmentType;
  amount: number;
  status: OrderStatus;
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
   * the exact class of stat-mismatch bug caught on the Payout Detail screen. */
  fulfillmentBreakdown: {
    delivery: number;
    pickup: number;
    walkin: number;
  };
  /** Most recent orders shown in the "Recent Orders" table — a subset of the lifetime total above. */
  recentOrders: CustomerRecentOrder[];
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
 * `recentOrders` leads with their real order from `ORDERS`, followed by a couple of older
 * orders predating the shared `ORDERS` window (ids like "mvu-102xx"/"mvu-101xx" that
 * intentionally aren't in `ORDERS` — see `CustomerRecentOrder` above).
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
    recentOrders: [
      { orderId: "mvu-10481", orderNumber: "#MVU-10481", date: "12 Jul 2025", fulfillment: "Delivery", amount: 3897, status: "Shipped" },
      { orderId: "mvu-10298", orderNumber: "#MVU-10298", date: "02 May 2025", fulfillment: "Delivery", amount: 2140, status: "Delivered" },
      { orderId: "mvu-10176", orderNumber: "#MVU-10176", date: "14 Mar 2025", fulfillment: "In-Store Pickup", amount: 1580, status: "Collected" },
      { orderId: "mvu-10102", orderNumber: "#MVU-10102", date: "20 Jan 2025", fulfillment: "Delivery", amount: 990, status: "Cancelled" },
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
    recentOrders: [
      { orderId: "mvu-10480", orderNumber: "#MVU-10480", date: "12 Jul 2025", fulfillment: "In-Store Pickup", amount: 1450, status: "Ready for Pickup" },
      { orderId: "mvu-10254", orderNumber: "#MVU-10254", date: "19 Apr 2025", fulfillment: "In-Store Pickup", amount: 2200, status: "Collected" },
      { orderId: "mvu-10133", orderNumber: "#MVU-10133", date: "08 Feb 2025", fulfillment: "Delivery", amount: 860, status: "Delivered" },
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
    recentOrders: [
      { orderId: "mvu-10476", orderNumber: "#MVU-10476", date: "10 Jul 2025", fulfillment: "Delivery", amount: 5120, status: "Processing" },
      { orderId: "mvu-10321", orderNumber: "#MVU-10321", date: "30 May 2025", fulfillment: "Delivery", amount: 3299, status: "Delivered" },
      { orderId: "mvu-10214", orderNumber: "#MVU-10214", date: "11 Apr 2025", fulfillment: "Delivery", amount: 1750, status: "Delivered" },
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
    recentOrders: [
      { orderId: "mvu-10466", orderNumber: "#MVU-10466", date: "05 Jul 2025", fulfillment: "In-Store Pickup", amount: 2860, status: "Collected" },
      { orderId: "mvu-10287", orderNumber: "#MVU-10287", date: "26 Apr 2025", fulfillment: "In-Store Pickup", amount: 1340, status: "Collected" },
      { orderId: "mvu-10159", orderNumber: "#MVU-10159", date: "02 Mar 2025", fulfillment: "Walk-in", amount: 540, status: "Completed" },
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
    recentOrders: [
      { orderId: "mvu-10477", orderNumber: "#MVU-10477", date: "11 Jul 2025", fulfillment: "Walk-in", amount: 650, status: "No Show" },
      { orderId: "mvu-10309", orderNumber: "#MVU-10309", date: "27 May 2025", fulfillment: "Walk-in", amount: 410, status: "No Show" },
      { orderId: "mvu-10201", orderNumber: "#MVU-10201", date: "16 Mar 2025", fulfillment: "Walk-in", amount: 780, status: "Completed" },
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
    recentOrders: [
      { orderId: "mvu-10468", orderNumber: "#MVU-10468", date: "06 Jul 2025", fulfillment: "Delivery", amount: 8940, status: "Delivered" },
      { orderId: "mvu-10276", orderNumber: "#MVU-10276", date: "23 Apr 2025", fulfillment: "Delivery", amount: 4120, status: "Delivered" },
      { orderId: "mvu-10188", orderNumber: "#MVU-10188", date: "09 Mar 2025", fulfillment: "Delivery", amount: 2260, status: "Delivered" },
    ],
    adminNotes: [],
  },
];
