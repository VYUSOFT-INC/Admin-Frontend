import type { VendorType } from "@/lib/mock-data/vendors";
import type { PaymentMethod } from "@/lib/mock-data/orders";

/**
 * Return-request vocabulary, matching the Figma "returns and refunds" design's FILTER
 * TABS: All / Pending Review / Refund Approved / Refund Rejected / Escalated. The table's
 * STATUS column uses the shorter form of each label (see `STATUS_BADGE_VARIANT` below).
 */
export type ReturnStatus = "Pending" | "Approved" | "Rejected" | "Escalated";

/** Matches the Figma FILTER ROW's return-type segmented control (All / Delivery Returns / Pickup Returns). */
export type ReturnFulfillment = "Delivery" | "Pickup";

/** Distinct return reasons surfaced across the mock dataset — used to populate the Reason filter dropdown. */
export const RETURN_REASONS = [
  "Wrong Size Delivered",
  "Defective Item",
  "Color Mismatch",
  "Not as Described",
  "Received Torn Item",
  "Size Unavailable",
] as const;
export type ReturnReason = (typeof RETURN_REASONS)[number];

/** Preset windows for the "Date Range" filter dropdown, evaluated against each return's `requestedAt` ISO date. */
export const DATE_RANGE_OPTIONS = ["Last 7 Days", "Last 30 Days", "Last 90 Days"] as const;
export type DateRangeOption = (typeof DATE_RANGE_OPTIONS)[number];

/** Outcome of the vendor's quality-check on the returned item, shown in the "Vendor's Response" card. */
export type QcResult = "Intact" | "Damaged" | "Missing";

/** The three decisions available on the Return Review screen's "Refund Decision" panel. */
export type ReturnDecisionType = "approve-full" | "approve-partial" | "reject";

export interface ReturnVendorRecommendation {
  type: ReturnDecisionType;
  /** One-line justification shown inside the recommendation banner. */
  note: string;
}

/** Reuses the same done/current/upcoming/cancelled vocabulary as `OrderTimelineStepState`. */
export type ReturnTimelineStepState = "done" | "current" | "upcoming" | "cancelled";

/** A single row shown in the Return Review screen's Return Timeline card. */
export interface ReturnTimelineStep {
  label: string;
  timestamp: string;
  state: ReturnTimelineStepState;
}

export interface ReturnRequest {
  /** Lowercase slug used for the `/returns/[id]` detail route, e.g. "ret-4401". */
  id: string;
  /** Display return number, e.g. "RET-4401". */
  returnNumber: string;
  /** Lowercase slug matching the order this return originated from, e.g. "mvu-10481". */
  orderId: string;
  /** Display order number, e.g. "#MVU-10481". */
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  vendorName: string;
  vendorType: VendorType;
  productName: string;
  /** Path under /public — see public/assets/images/products for the originals (reused from the Products/Orders mock data). */
  productImage: string;
  fulfillment: ReturnFulfillment;
  reason: ReturnReason;
  amount: number;
  status: ReturnStatus;
  /** Display date, e.g. "30 Jul 2026". */
  requestedDate: string;
  /** ISO date (yyyy-mm-dd) backing the Date Range filter. */
  requestedAt: string;

  /** Fields below are only surfaced on the Return Review (`/returns/[id]`) detail screen. */
  customerPhone: string;
  /** Display timestamp backing the Return Timeline's first step, e.g. "30 Jul 2026, 10:24 AM". */
  requestedTimestamp: string;
  /** Longer claim description shown under "Return Reason" in the Customer's Claim card. */
  claimDescription: string;
  /** Paths under /public — evidence photos the customer attached to the claim. */
  customerPhotos: string[];
  /** Vendor's written response to the claim, shown in the "Vendor's Response" card. */
  vendorResponseText: string;
  qcResult: QcResult;
  vendorRecommendation: ReturnVendorRecommendation;
  /** "Order Context" card fields. */
  orderPlacedDate: string;
  orderAmount: number;
  paymentMethod: PaymentMethod;
  /** e.g. "Size M (Ordered) / XL (Received)". */
  productSizeNote: string;
  timeline: ReturnTimelineStep[];
}

export const RETURNS: ReturnRequest[] = [
  {
    id: "ret-4401",
    returnNumber: "RET-4401",
    orderId: "mvu-10481",
    orderNumber: "#MVU-10481",
    customerName: "Arjun Mehta",
    customerEmail: "arjun.mehta@gmail.com",
    vendorName: "Urban Thread House",
    vendorType: "Online Seller",
    productName: "Slim Fit Cotton Shirt",
    productImage: "/assets/images/returns/ret-4401-order-item.jpg",
    fulfillment: "Delivery",
    reason: "Wrong Size Delivered",
    amount: 1299,
    status: "Pending",
    requestedDate: "30 Jul 2026",
    requestedAt: "2026-07-30",
    customerPhone: "+91 98765 43210",
    requestedTimestamp: "30 Jul 2026, 10:24 AM",
    claimDescription: "Wrong Size Delivered — Customer ordered size M but received size XL. Tags and packaging intact.",
    customerPhotos: [
      "/assets/images/returns/ret-4401-photo-1.jpg",
      "/assets/images/returns/ret-4401-photo-2.jpg",
      "/assets/images/returns/ret-4401-photo-3.jpg",
      "/assets/images/returns/ret-4401-photo-4.jpg",
    ],
    vendorResponseText:
      "We have reviewed the customer's complaint. Our warehouse dispatch log confirms size M was packed. However, we acknowledge the error may have occurred at sorting stage. We accept the return and recommend a full refund.",
    qcResult: "Intact",
    vendorRecommendation: { type: "approve-full", note: "Approve Full Refund — Vendor accepts liability" },
    orderPlacedDate: "12 Jul 2025",
    orderAmount: 1299,
    paymentMethod: "Prepaid",
    productSizeNote: "Size M (Ordered) / XL (Received)",
    timeline: [
      { label: "Return Requested", timestamp: "30 Jul 2026, 10:24 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "30 Jul 2026, 10:25 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "31 Jul 2026, 3:10 PM", state: "done" },
      { label: "Admin Review", timestamp: "Pending decision", state: "current" },
      { label: "Refund Processed", timestamp: "Awaiting decision", state: "upcoming" },
    ],
  },
  {
    id: "ret-4398",
    returnNumber: "RET-4398",
    orderId: "mvu-10462",
    orderNumber: "#MVU-10462",
    customerName: "Priya Sharma",
    customerEmail: "priya.sharma@yahoo.com",
    vendorName: "The Loom Studio",
    vendorType: "Physical Store",
    productName: "Floral Printed Kurta",
    productImage: "/assets/images/products/product-2.jpg",
    fulfillment: "Pickup",
    reason: "Defective Item",
    amount: 2149,
    status: "Pending",
    requestedDate: "29 Jul 2026",
    requestedAt: "2026-07-29",
    customerPhone: "+91 91234 56789",
    requestedTimestamp: "29 Jul 2026, 11:05 AM",
    claimDescription: "Defective Item — Zipper on the kurta is broken and a loose thread runs along the side seam.",
    customerPhotos: ["/assets/images/products/product-2.jpg", "/assets/images/products/product-3.jpg"],
    vendorResponseText:
      "Our quality team inspected similar units from this batch and found no defects. We suspect this may be a handling issue during transit, but we're willing to offer a partial refund as a goodwill gesture rather than a full return.",
    qcResult: "Damaged",
    vendorRecommendation: { type: "approve-partial", note: "Approve Partial Refund — Goodwill gesture, defect unconfirmed" },
    orderPlacedDate: "24 Jul 2026",
    orderAmount: 2149,
    paymentMethod: "COD",
    productSizeNote: "Size M · Floral Print",
    timeline: [
      { label: "Return Requested", timestamp: "29 Jul 2026, 11:05 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "29 Jul 2026, 11:10 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "30 Jul 2026, 5:40 PM", state: "done" },
      { label: "Admin Review", timestamp: "Pending decision", state: "current" },
      { label: "Refund Processed", timestamp: "Awaiting decision", state: "upcoming" },
    ],
  },
  {
    id: "ret-4391",
    returnNumber: "RET-4391",
    orderId: "mvu-10450",
    orderNumber: "#MVU-10450",
    customerName: "Rohit Verma",
    customerEmail: "rohit.v@gmail.com",
    vendorName: "Denim Republic",
    vendorType: "Online Seller",
    productName: "Slim Fit Dark Jeans",
    productImage: "/assets/images/products/product-5.jpg",
    fulfillment: "Delivery",
    reason: "Color Mismatch",
    amount: 1799,
    status: "Approved",
    requestedDate: "25 Jul 2026",
    requestedAt: "2026-07-25",
    customerPhone: "+91 98811 22334",
    requestedTimestamp: "25 Jul 2026, 9:40 AM",
    claimDescription: "Color Mismatch — Listing showed jet black denim; the delivered pair is a dark indigo wash.",
    customerPhotos: ["/assets/images/products/product-5.jpg", "/assets/images/products/product-4.jpg"],
    vendorResponseText:
      "We've cross-checked the listing photos against our current stock and agree the product images need updating. Since this is a genuine mismatch, we accept the return and support a full refund.",
    qcResult: "Intact",
    vendorRecommendation: { type: "approve-full", note: "Approve Full Refund — Listing photo discrepancy confirmed" },
    orderPlacedDate: "20 Jul 2026",
    orderAmount: 1799,
    paymentMethod: "Prepaid",
    productSizeNote: "Size 32 · Dark Indigo",
    timeline: [
      { label: "Return Requested", timestamp: "25 Jul 2026, 9:40 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "25 Jul 2026, 9:45 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "26 Jul 2026, 2:15 PM", state: "done" },
      { label: "Admin Review", timestamp: "27 Jul 2026 · Full refund approved", state: "done" },
      { label: "Refund Processed", timestamp: "28 Jul 2026 · Refunded to original payment method", state: "done" },
    ],
  },
  {
    id: "ret-4385",
    returnNumber: "RET-4385",
    orderId: "mvu-10438",
    orderNumber: "#MVU-10438",
    customerName: "Kavya Nair",
    customerEmail: "kavya.nair@outlook.com",
    vendorName: "Silk Threads Co.",
    vendorType: "Physical Store",
    productName: "Pure Silk Blouse",
    productImage: "/assets/images/products/product-2.jpg",
    fulfillment: "Pickup",
    reason: "Not as Described",
    amount: 3499,
    status: "Pending",
    requestedDate: "22 Jul 2026",
    requestedAt: "2026-07-22",
    customerPhone: "+91 90045 67812",
    requestedTimestamp: "22 Jul 2026, 4:15 PM",
    claimDescription: "Not as Described — Listing advertised pure mulberry silk; the fabric received feels synthetic and lacks the expected sheen.",
    customerPhotos: ["/assets/images/products/product-2.jpg"],
    vendorResponseText:
      "We source directly from our silk weaving unit and stand by the fabric composition. We'd like to arrange a physical inspection at our store before agreeing to any refund.",
    qcResult: "Missing",
    vendorRecommendation: { type: "reject", note: "Reject Refund — Requesting in-person fabric inspection first" },
    orderPlacedDate: "16 Jul 2026",
    orderAmount: 3499,
    paymentMethod: "Prepaid",
    productSizeNote: "Size S · Ivory",
    timeline: [
      { label: "Return Requested", timestamp: "22 Jul 2026, 4:15 PM", state: "done" },
      { label: "Vendor Notified", timestamp: "22 Jul 2026, 4:20 PM", state: "done" },
      { label: "Vendor Responded", timestamp: "23 Jul 2026, 10:30 AM", state: "done" },
      { label: "Admin Review", timestamp: "Pending decision", state: "current" },
      { label: "Refund Processed", timestamp: "Awaiting decision", state: "upcoming" },
    ],
  },
  {
    id: "ret-4379",
    returnNumber: "RET-4379",
    orderId: "mvu-10421",
    orderNumber: "#MVU-10421",
    customerName: "Aditya Kumar",
    customerEmail: "aditya.k@gmail.com",
    vendorName: "Casual Basics",
    vendorType: "Online Seller",
    productName: "Cotton Polo T-Shirt",
    productImage: "/assets/images/products/product-9.jpg",
    fulfillment: "Delivery",
    reason: "Received Torn Item",
    amount: 699,
    status: "Escalated",
    requestedDate: "18 Jul 2026",
    requestedAt: "2026-07-18",
    customerPhone: "+91 99223 45671",
    requestedTimestamp: "18 Jul 2026, 8:50 AM",
    claimDescription: "Received Torn Item — A visible tear along the collar seam was noticed immediately after unboxing.",
    customerPhotos: ["/assets/images/products/product-9.jpg", "/assets/images/products/product-1.jpg"],
    vendorResponseText:
      "This is the third such complaint against this batch this month. We're unable to confirm whether the tear happened at our end or during courier handling, so we've flagged this to our escalations desk.",
    qcResult: "Damaged",
    vendorRecommendation: { type: "approve-partial", note: "Approve Partial Refund — Recurring batch issue, liability unclear" },
    orderPlacedDate: "13 Jul 2026",
    orderAmount: 699,
    paymentMethod: "COD",
    productSizeNote: "Size L · Olive Green",
    timeline: [
      { label: "Return Requested", timestamp: "18 Jul 2026, 8:50 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "18 Jul 2026, 8:55 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "19 Jul 2026, 1:20 PM", state: "done" },
      { label: "Escalated to Senior Team", timestamp: "Escalated for recurring batch defect", state: "current" },
      { label: "Refund Processed", timestamp: "Awaiting final decision", state: "upcoming" },
    ],
  },
  {
    id: "ret-4372",
    returnNumber: "RET-4372",
    orderId: "mvu-10409",
    orderNumber: "#MVU-10409",
    customerName: "Sneha Pillai",
    customerEmail: "sneha.p@hotmail.com",
    vendorName: "FabWeave India",
    vendorType: "Online Seller",
    productName: "Embroidered Anarkali",
    productImage: "/assets/images/products/product-3.jpg",
    fulfillment: "Delivery",
    reason: "Size Unavailable",
    amount: 1899,
    status: "Rejected",
    requestedDate: "10 Jul 2026",
    requestedAt: "2026-07-10",
    customerPhone: "+91 90876 54321",
    requestedTimestamp: "10 Jul 2026, 2:30 PM",
    claimDescription: "Size Unavailable — Customer requested an exchange for a smaller size, but the vendor has no replacement stock; requesting a refund instead.",
    customerPhotos: ["/assets/images/products/product-3.jpg"],
    vendorResponseText:
      "Exchange isn't possible since the size is out of stock, but our return policy for made-to-order embroidered pieces excludes refunds once the item has shipped. We recommend rejecting this refund request.",
    qcResult: "Intact",
    vendorRecommendation: { type: "reject", note: "Reject Refund — Made-to-order item, non-refundable per policy" },
    orderPlacedDate: "05 Jul 2026",
    orderAmount: 1899,
    paymentMethod: "Prepaid",
    productSizeNote: "Size M (Requested S — Unavailable)",
    timeline: [
      { label: "Return Requested", timestamp: "10 Jul 2026, 2:30 PM", state: "done" },
      { label: "Vendor Notified", timestamp: "10 Jul 2026, 2:35 PM", state: "done" },
      { label: "Vendor Responded", timestamp: "11 Jul 2026, 9:00 AM", state: "done" },
      { label: "Admin Review", timestamp: "12 Jul 2026 · Refund rejected", state: "done" },
      { label: "Refund Rejected", timestamp: "Return closed — no refund issued", state: "cancelled" },
    ],
  },
  {
    id: "ret-4366",
    returnNumber: "RET-4366",
    orderId: "mvu-10480",
    orderNumber: "#MVU-10480",
    customerName: "Priya Nair",
    customerEmail: "priya.nair@outlook.com",
    vendorName: "The Fabric Studio",
    vendorType: "Physical Store",
    productName: "Cotton Saree Blouse",
    productImage: "/assets/images/products/product-2.jpg",
    fulfillment: "Pickup",
    reason: "Wrong Size Delivered",
    amount: 1450,
    status: "Approved",
    requestedDate: "05 Jul 2026",
    requestedAt: "2026-07-05",
    customerPhone: "+91 98123 45678",
    requestedTimestamp: "05 Jul 2026, 9:10 AM",
    claimDescription: "Wrong Size Delivered — Blouse ordered in size M arrived in size S.",
    customerPhotos: ["/assets/images/products/product-2.jpg", "/assets/images/products/product-10.jpg"],
    vendorResponseText:
      "Our packing log confirms a size M unit was dispatched, but we understand mix-ups can happen at the courier's sorting facility. We're happy to process a full refund for the inconvenience.",
    qcResult: "Intact",
    vendorRecommendation: { type: "approve-full", note: "Approve Full Refund — Customer inconvenience acknowledged" },
    orderPlacedDate: "12 Jul 2025",
    orderAmount: 1450,
    paymentMethod: "Prepaid",
    productSizeNote: "Size M (Ordered) / S (Received)",
    timeline: [
      { label: "Return Requested", timestamp: "05 Jul 2026, 9:10 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "05 Jul 2026, 9:15 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "05 Jul 2026, 4:30 PM", state: "done" },
      { label: "Admin Review", timestamp: "06 Jul 2026 · Full refund approved", state: "done" },
      { label: "Refund Processed", timestamp: "07 Jul 2026 · Refunded to original payment method", state: "done" },
    ],
  },
  {
    id: "ret-4359",
    returnNumber: "RET-4359",
    orderId: "mvu-10476",
    orderNumber: "#MVU-10476",
    customerName: "Ananya Iyer",
    customerEmail: "ananya.iyer@gmail.com",
    vendorName: "Velora Styles",
    vendorType: "Online Seller",
    productName: "Embroidered Kaftan",
    productImage: "/assets/images/products/product-2.jpg",
    fulfillment: "Delivery",
    reason: "Defective Item",
    amount: 2999,
    status: "Rejected",
    requestedDate: "28 Jun 2026",
    requestedAt: "2026-06-28",
    customerPhone: "+91 98450 33221",
    requestedTimestamp: "28 Jun 2026, 12:05 PM",
    claimDescription: "Defective Item — Loose embroidery threads and a small hole near the hemline.",
    customerPhotos: ["/assets/images/products/product-2.jpg", "/assets/images/products/product-8.jpg"],
    vendorResponseText:
      "Our QC team examined the returned unit and found the embroidery intact with no manufacturing fault. The damage pattern is consistent with post-delivery wear, so we do not support a refund.",
    qcResult: "Damaged",
    vendorRecommendation: { type: "reject", note: "Reject Refund — Damage assessed as post-delivery wear" },
    orderPlacedDate: "10 Jul 2025",
    orderAmount: 2999,
    paymentMethod: "Prepaid",
    productSizeNote: "Size L · Mustard",
    timeline: [
      { label: "Return Requested", timestamp: "28 Jun 2026, 12:05 PM", state: "done" },
      { label: "Vendor Notified", timestamp: "28 Jun 2026, 12:10 PM", state: "done" },
      { label: "Vendor Responded", timestamp: "29 Jun 2026, 3:45 PM", state: "done" },
      { label: "Admin Review", timestamp: "30 Jun 2026 · Refund rejected", state: "done" },
      { label: "Refund Rejected", timestamp: "Return closed — no refund issued", state: "cancelled" },
    ],
  },
  {
    id: "ret-4351",
    returnNumber: "RET-4351",
    orderId: "mvu-10474",
    orderNumber: "#MVU-10474",
    customerName: "Neha Kulkarni",
    customerEmail: "neha.k@gmail.com",
    vendorName: "Aurel Lane",
    vendorType: "Online Seller",
    productName: "Linen Co-ord Set",
    productImage: "/assets/images/products/product-5.jpg",
    fulfillment: "Delivery",
    reason: "Color Mismatch",
    amount: 1299,
    status: "Approved",
    requestedDate: "20 Jun 2026",
    requestedAt: "2026-06-20",
    customerPhone: "+91 90210 45678",
    requestedTimestamp: "20 Jun 2026, 10:50 AM",
    claimDescription: "Color Mismatch — Ordered in Sage Green, received in a much darker Olive shade.",
    customerPhotos: ["/assets/images/products/product-5.jpg", "/assets/images/products/product-4.jpg"],
    vendorResponseText:
      "We've compared the dispatched unit's dye lot against our reference swatch and confirm a noticeable shade variation. We accept full liability and recommend a full refund.",
    qcResult: "Intact",
    vendorRecommendation: { type: "approve-full", note: "Approve Full Refund — Dye lot variation confirmed" },
    orderPlacedDate: "09 Jul 2025",
    orderAmount: 1299,
    paymentMethod: "COD",
    productSizeNote: "Size M · Sage Green (Ordered) / Olive (Received)",
    timeline: [
      { label: "Return Requested", timestamp: "20 Jun 2026, 10:50 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "20 Jun 2026, 10:55 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "21 Jun 2026, 5:10 PM", state: "done" },
      { label: "Admin Review", timestamp: "22 Jun 2026 · Full refund approved", state: "done" },
      { label: "Refund Processed", timestamp: "23 Jun 2026 · Refunded to original payment method", state: "done" },
    ],
  },
  {
    id: "ret-4344",
    returnNumber: "RET-4344",
    orderId: "mvu-10473",
    orderNumber: "#MVU-10473",
    customerName: "Rahul Bhatt",
    customerEmail: "rahul.bhatt@yahoo.com",
    vendorName: "Kraze Fashion",
    vendorType: "Online Seller",
    productName: "Denim Jacket",
    productImage: "/assets/images/products/product-5.jpg",
    fulfillment: "Delivery",
    reason: "Not as Described",
    amount: 2599,
    status: "Escalated",
    requestedDate: "12 Jun 2026",
    requestedAt: "2026-06-12",
    customerPhone: "+91 99110 22334",
    requestedTimestamp: "12 Jun 2026, 9:25 AM",
    claimDescription: "Not as Described — Jacket listing showed a heavyweight denim finish; the item received is a much lighter, thinner fabric.",
    customerPhotos: ["/assets/images/products/product-5.jpg", "/assets/images/products/product-9.jpg"],
    vendorResponseText:
      "We've received multiple similar complaints about this listing this week and are still verifying with our supplier whether the fabric spec changed. We've escalated this internally before responding further.",
    qcResult: "Intact",
    vendorRecommendation: { type: "approve-partial", note: "Approve Partial Refund — Supplier fabric spec under verification" },
    orderPlacedDate: "09 Jul 2025",
    orderAmount: 2599,
    paymentMethod: "Prepaid",
    productSizeNote: "Size L · Blue",
    timeline: [
      { label: "Return Requested", timestamp: "12 Jun 2026, 9:25 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "12 Jun 2026, 9:30 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "13 Jun 2026, 4:00 PM", state: "done" },
      { label: "Escalated to Senior Team", timestamp: "Escalated pending supplier verification", state: "current" },
      { label: "Refund Processed", timestamp: "Awaiting final decision", state: "upcoming" },
    ],
  },
  {
    id: "ret-4338",
    returnNumber: "RET-4338",
    orderId: "mvu-10469",
    orderNumber: "#MVU-10469",
    customerName: "Ibrahim Sheikh",
    customerEmail: "ibrahim.s@gmail.com",
    vendorName: "StyleVault India",
    vendorType: "Online Seller",
    productName: "Casual Shirt",
    productImage: "/assets/images/products/product-1.jpg",
    fulfillment: "Delivery",
    reason: "Received Torn Item",
    amount: 1250,
    status: "Rejected",
    requestedDate: "30 May 2026",
    requestedAt: "2026-05-30",
    customerPhone: "+91 91772 65432",
    requestedTimestamp: "30 May 2026, 8:40 AM",
    claimDescription: "Received Torn Item — A small tear near the cuff, visible on arrival.",
    customerPhotos: ["/assets/images/products/product-1.jpg"],
    vendorResponseText:
      "The returned shirt shows no signs of a manufacturing tear under our inspection lamp — the fray pattern suggests wear after delivery. We're unable to support this refund request.",
    qcResult: "Damaged",
    vendorRecommendation: { type: "reject", note: "Reject Refund — No manufacturing defect found on inspection" },
    orderPlacedDate: "07 Jul 2025",
    orderAmount: 1250,
    paymentMethod: "COD",
    productSizeNote: "Size L · Olive",
    timeline: [
      { label: "Return Requested", timestamp: "30 May 2026, 8:40 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "30 May 2026, 8:45 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "31 May 2026, 2:00 PM", state: "done" },
      { label: "Admin Review", timestamp: "01 Jun 2026 · Refund rejected", state: "done" },
      { label: "Refund Rejected", timestamp: "Return closed — no refund issued", state: "cancelled" },
    ],
  },
  {
    id: "ret-4330",
    returnNumber: "RET-4330",
    orderId: "mvu-10468",
    orderNumber: "#MVU-10468",
    customerName: "Meera Pillai",
    customerEmail: "meera.pillai@icloud.com",
    vendorName: "Aurel Lane",
    vendorType: "Online Seller",
    productName: "Leather Jacket",
    productImage: "/assets/images/products/product-6.jpg",
    fulfillment: "Delivery",
    reason: "Size Unavailable",
    amount: 3344,
    status: "Approved",
    requestedDate: "18 May 2026",
    requestedAt: "2026-05-18",
    customerPhone: "+91 98123 65478",
    requestedTimestamp: "18 May 2026, 9:15 AM",
    claimDescription: "Size Unavailable — Customer requested a size exchange, but the vendor has no stock in the required size; refund requested instead.",
    customerPhotos: ["/assets/images/products/product-6.jpg", "/assets/images/products/product-4.jpg"],
    vendorResponseText:
      "We regret we're out of stock in the requested size and won't be restocking this style. We support a full refund in place of the exchange.",
    qcResult: "Intact",
    vendorRecommendation: { type: "approve-full", note: "Approve Full Refund — Exchange size permanently out of stock" },
    orderPlacedDate: "06 Jul 2025",
    orderAmount: 3344,
    paymentMethod: "Prepaid",
    productSizeNote: "Size L (Requested XL — Unavailable)",
    timeline: [
      { label: "Return Requested", timestamp: "18 May 2026, 9:15 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "18 May 2026, 9:20 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "19 May 2026, 1:00 PM", state: "done" },
      { label: "Admin Review", timestamp: "20 May 2026 · Full refund approved", state: "done" },
      { label: "Refund Processed", timestamp: "21 May 2026 · Refunded to original payment method", state: "done" },
    ],
  },
  {
    id: "ret-4321",
    returnNumber: "RET-4321",
    orderId: "mvu-10466",
    orderNumber: "#MVU-10466",
    customerName: "Tanya Chopra",
    customerEmail: "tanya.chopra@gmail.com",
    vendorName: "The Fabric Studio",
    vendorType: "Physical Store",
    productName: "Silk Blouse",
    productImage: "/assets/images/products/product-2.jpg",
    fulfillment: "Pickup",
    reason: "Wrong Size Delivered",
    amount: 1360,
    status: "Pending",
    requestedDate: "02 May 2026",
    requestedAt: "2026-05-02",
    customerPhone: "+91 98234 56712",
    requestedTimestamp: "02 May 2026, 11:30 AM",
    claimDescription: "Wrong Size Delivered — Ordered size S, received size M; tags still attached.",
    customerPhotos: ["/assets/images/products/product-2.jpg", "/assets/images/products/product-10.jpg"],
    vendorResponseText:
      "Our dispatch record shows size S was packed, but we're happy to inspect the returned unit in-store and process a refund once confirmed.",
    qcResult: "Intact",
    vendorRecommendation: { type: "approve-full", note: "Approve Full Refund — Pending in-store size confirmation" },
    orderPlacedDate: "05 Jul 2025",
    orderAmount: 1360,
    paymentMethod: "Prepaid",
    productSizeNote: "Size S (Ordered) / M (Received)",
    timeline: [
      { label: "Return Requested", timestamp: "02 May 2026, 11:30 AM", state: "done" },
      { label: "Vendor Notified", timestamp: "02 May 2026, 11:35 AM", state: "done" },
      { label: "Vendor Responded", timestamp: "03 May 2026, 4:20 PM", state: "done" },
      { label: "Admin Review", timestamp: "Pending decision", state: "current" },
      { label: "Refund Processed", timestamp: "Awaiting decision", state: "upcoming" },
    ],
  },
  {
    id: "ret-4312",
    returnNumber: "RET-4312",
    orderId: "mvu-10477",
    orderNumber: "#MVU-10477",
    customerName: "Vikram Singh",
    customerEmail: "vikram.singh@gmail.com",
    vendorName: "Desi Threads Co.",
    vendorType: "Physical Store",
    productName: "Cotton Kurta",
    productImage: "/assets/images/products/product-1.jpg",
    fulfillment: "Pickup",
    reason: "Defective Item",
    amount: 650,
    status: "Rejected",
    requestedDate: "15 Apr 2026",
    requestedAt: "2026-04-15",
    customerPhone: "+91 99887 66554",
    requestedTimestamp: "15 Apr 2026, 3:05 PM",
    claimDescription: "Defective Item — Loose stitching along the side slit noticed after purchase.",
    customerPhotos: ["/assets/images/products/product-1.jpg"],
    vendorResponseText:
      "On inspection at our store counter, the stitching was found intact and within our quality standards. We're unable to support this refund.",
    qcResult: "Intact",
    vendorRecommendation: { type: "reject", note: "Reject Refund — Stitching found within quality standards" },
    orderPlacedDate: "11 Jul 2025",
    orderAmount: 650,
    paymentMethod: "COD",
    productSizeNote: "Size M · Blue",
    timeline: [
      { label: "Return Requested", timestamp: "15 Apr 2026, 3:05 PM", state: "done" },
      { label: "Vendor Notified", timestamp: "15 Apr 2026, 3:10 PM", state: "done" },
      { label: "Vendor Responded", timestamp: "16 Apr 2026, 10:00 AM", state: "done" },
      { label: "Admin Review", timestamp: "17 Apr 2026 · Refund rejected", state: "done" },
      { label: "Refund Rejected", timestamp: "Return closed — no refund issued", state: "cancelled" },
    ],
  },
  {
    id: "ret-4300",
    returnNumber: "RET-4300",
    orderId: "mvu-10472",
    orderNumber: "#MVU-10472",
    customerName: "Divya Menon",
    customerEmail: "divya.menon@gmail.com",
    vendorName: "Harbor Blend Collective",
    vendorType: "Physical Store",
    productName: "Handloom Stole",
    productImage: "/assets/images/products/product-8.jpg",
    fulfillment: "Pickup",
    reason: "Not as Described",
    amount: 975,
    status: "Escalated",
    requestedDate: "28 Mar 2026",
    requestedAt: "2026-03-28",
    customerPhone: "+91 88991 22110",
    requestedTimestamp: "28 Mar 2026, 1:45 PM",
    claimDescription: "Not as Described — Stole listing showed a hand-block print; the piece received has a plain woven texture.",
    customerPhotos: ["/assets/images/products/product-8.jpg", "/assets/images/products/product-2.jpg"],
    vendorResponseText:
      "We're checking with our weaving unit on whether the print run was substituted for this batch. Given the ambiguity, we've escalated this to our merchandising team before responding.",
    qcResult: "Intact",
    vendorRecommendation: { type: "approve-partial", note: "Approve Partial Refund — Print discrepancy under merchandising review" },
    orderPlacedDate: "08 Jul 2025",
    orderAmount: 975,
    paymentMethod: "Prepaid",
    productSizeNote: "Free Size · Indigo",
    timeline: [
      { label: "Return Requested", timestamp: "28 Mar 2026, 1:45 PM", state: "done" },
      { label: "Vendor Notified", timestamp: "28 Mar 2026, 1:50 PM", state: "done" },
      { label: "Vendor Responded", timestamp: "29 Mar 2026, 11:15 AM", state: "done" },
      { label: "Escalated to Senior Team", timestamp: "Escalated for merchandising review", state: "current" },
      { label: "Refund Processed", timestamp: "Awaiting final decision", state: "upcoming" },
    ],
  },
];

/** "All / Pending Review / Refund Approved / Refund Rejected / Escalated" pill row — matches the Figma FILTER TABS. */
export const STATUS_TABS: Array<{ label: string; value: ReturnStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Pending Review", value: "Pending" },
  { label: "Refund Approved", value: "Approved" },
  { label: "Refund Rejected", value: "Rejected" },
  { label: "Escalated", value: "Escalated" },
];

/** "All / Delivery Returns / Pickup Returns" segmented control — matches the Figma FILTER ROW's return-type toggle. */
export const RETURN_TYPE_TABS: Array<{ label: string; value: ReturnFulfillment | "All" }> = [
  { label: "All", value: "All" },
  { label: "Delivery Returns", value: "Delivery" },
  { label: "Pickup Returns", value: "Pickup" },
];

/** Distinct vendor names in the mock dataset — populates the "All Vendors" filter dropdown. */
export const RETURN_VENDORS: string[] = Array.from(new Set(RETURNS.map((item) => item.vendorName))).sort();
