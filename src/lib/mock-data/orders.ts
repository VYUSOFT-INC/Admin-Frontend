import type { SellerTier, VendorType } from "@/lib/mock-data/vendors";
import type { FulfillmentType } from "@/lib/mock-data/products";

export type PaymentMethod = "Prepaid" | "COD";

/**
 * Full status vocabulary an order can carry. Only the values in `STATUS_TABS`
 * below get a dedicated filter pill (matching the Figma "order management"
 * design's FILTER TABS, which has 9 status tabs + "All"); "Completed" and
 * "No Show" — both Walk-in-specific outcomes — appear in the table but are
 * only reachable via the "All" tab, exactly as in the reference design.
 */
export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Ready for Pickup"
  | "Shipped"
  | "Delivered"
  | "Collected"
  | "Completed"
  | "Cancelled"
  | "No Show"
  | "Flagged"
  | "NDR";

/** Order statuses that represent a finished order — no further status-changing action applies. */
export const TERMINAL_STATUSES: OrderStatus[] = ["Delivered", "Collected", "Completed", "Cancelled", "No Show"];

/** A single size/color line item shown in the Order Detail screen's Order Summary card. */
export interface OrderItem {
  name: string;
  size: string;
  color: string;
  qty: number;
  price: number;
  /** Path under /public — see public/assets/images/orders and /products for the originals. */
  imageUrl: string;
}

export type OrderTimelineStepState = "done" | "current" | "upcoming" | "cancelled";

/** A single row shown in the Order Detail screen's Order Timeline card. */
export interface OrderTimelineStep {
  label: string;
  timestamp: string;
  state: OrderTimelineStepState;
  /** Only set on the "Shipped" step — renders the "Tracking No:" chip underneath it. */
  trackingNumber?: string;
}

export interface Order {
  /** Lowercase slug used for the `/orders/[id]` detail route, e.g. "mvu-10481". */
  id: string;
  /** Display order number, e.g. "#MVU-10481". */
  orderNumber: string;
  itemsCount: number;
  customerName: string;
  customerEmail: string;
  vendorName: string;
  vendorType: VendorType;
  fulfillment: FulfillmentType;
  amount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  date: string;
  /** Fields below are only surfaced on the Order Detail screen. */
  placedAt: string;
  customerPhone: string;
  /** Multi-line (\n separated) delivery address for Delivery orders; a pickup/walk-in note for the others. */
  shippingAddress: string;
  vendorPhone: string;
  vendorAddress: string;
  vendorTier: SellerTier;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  /** 0 renders as "Free". */
  shippingFee: number;
  timeline: OrderTimelineStep[];
}

export const ORDERS: Order[] = [
  {
    id: "mvu-10481",
    orderNumber: "#MVU-10481",
    itemsCount: 3,
    customerName: "Arjun Mehta",
    customerEmail: "arjun.mehta@gmail.com",
    vendorName: "Urban Thread House",
    vendorType: "Online Seller",
    fulfillment: "Delivery",
    amount: 3897,
    paymentMethod: "Prepaid",
    status: "Shipped",
    date: "12 Jul 2025",
    placedAt: "12 Jul 2025, 10:42 AM",
    customerPhone: "+91 98765 43210",
    shippingAddress: "Flat 4B, Sunrise Apartments,\nMG Road, Bengaluru,\nKarnataka — 560001",
    vendorPhone: "+91 80012 34567",
    vendorAddress: "Plot 22, Industrial Area,\nPeenya Phase II, Bengaluru,\nKarnataka — 560058",
    vendorTier: "Basic",
    items: [
      { name: "Slim Fit Cotton Shirt", size: "M", color: "Navy Blue", qty: 2, price: 1299, imageUrl: "/assets/images/orders/order-item-1.jpg" },
      { name: "Relaxed Chino Trousers", size: "32", color: "Khaki", qty: 1, price: 1299, imageUrl: "/assets/images/orders/order-item-2.jpg" },
    ],
    subtotal: 4197,
    discount: 300,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "12 Jul 2025 · 10:42 AM", state: "done" },
      { label: "Payment Confirmed", timestamp: "12 Jul 2025 · 10:43 AM · Razorpay", state: "done" },
      { label: "Vendor Accepted", timestamp: "12 Jul 2025 · 11:15 AM", state: "done" },
      { label: "Shipped", timestamp: "12 Jul 2025 · 3:30 PM · Delhivery", state: "current", trackingNumber: "DL2025071234567" },
      { label: "Delivered", timestamp: "Expected: 14 Jul 2025", state: "upcoming" },
    ],
  },
  {
    id: "mvu-10480",
    orderNumber: "#MVU-10480",
    itemsCount: 1,
    customerName: "Priya Nair",
    customerEmail: "priya.nair@outlook.com",
    vendorName: "The Fabric Studio",
    vendorType: "Physical Store",
    fulfillment: "In-Store Pickup",
    amount: 1450,
    paymentMethod: "Prepaid",
    status: "Ready for Pickup",
    date: "12 Jul 2025",
    placedAt: "12 Jul 2025, 9:10 AM",
    customerPhone: "+91 98123 45678",
    shippingAddress: "Pickup at The Fabric Studio — Bhandup, Mumbai",
    vendorPhone: "+91 22011 22334",
    vendorAddress: "12 Textile Lane, Bhandup,\nMumbai, Maharashtra — 400078",
    vendorTier: "Basic",
    items: [{ name: "Cotton Saree Blouse", size: "M", color: "Maroon", qty: 1, price: 1450, imageUrl: "/assets/images/products/product-2.jpg" }],
    subtotal: 1450,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "12 Jul 2025 · 9:10 AM", state: "done" },
      { label: "Payment Confirmed", timestamp: "12 Jul 2025 · 9:11 AM · Razorpay", state: "done" },
      { label: "Vendor Accepted", timestamp: "12 Jul 2025 · 9:40 AM", state: "done" },
      { label: "Ready for Pickup", timestamp: "12 Jul 2025 · 11:00 AM", state: "current" },
      { label: "Collected", timestamp: "Awaiting customer pickup", state: "upcoming" },
    ],
  },
  {
    id: "mvu-10479",
    orderNumber: "#MVU-10479",
    itemsCount: 2,
    customerName: "Rohan Kapoor",
    customerEmail: "rohan.k@yahoo.com",
    vendorName: "Desi Threads Co.",
    vendorType: "Physical Store",
    fulfillment: "Walk-in",
    amount: 2280,
    paymentMethod: "COD",
    status: "Completed",
    date: "11 Jul 2025",
    placedAt: "11 Jul 2025, 4:05 PM",
    customerPhone: "+91 90001 11222",
    shippingAddress: "Walk-in purchase — collected in person, no shipping address",
    vendorPhone: "+91 74012 55667",
    vendorAddress: "45 MG Road, Indiranagar,\nBengaluru, Karnataka — 560038",
    vendorTier: "Limited",
    items: [
      { name: "Kurta Pajama Set", size: "L", color: "White", qty: 1, price: 1580, imageUrl: "/assets/images/products/product-3.jpg" },
      { name: "Nehru Jacket", size: "L", color: "Beige", qty: 1, price: 700, imageUrl: "/assets/images/products/product-6.jpg" },
    ],
    subtotal: 2280,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "11 Jul 2025 · 4:05 PM", state: "done" },
      { label: "Vendor Accepted", timestamp: "11 Jul 2025 · 4:06 PM", state: "done" },
      { label: "Completed", timestamp: "11 Jul 2025 · 4:20 PM", state: "done" },
    ],
  },
  {
    id: "mvu-10478",
    orderNumber: "#MVU-10478",
    itemsCount: 1,
    customerName: "Sneha Joshi",
    customerEmail: "sneha.joshi@icloud.com",
    vendorName: "StyleVault India",
    vendorType: "Online Seller",
    fulfillment: "Delivery",
    amount: 899,
    paymentMethod: "COD",
    status: "Pending",
    date: "11 Jul 2025",
    placedAt: "11 Jul 2025, 8:15 AM",
    customerPhone: "+91 91234 56780",
    shippingAddress: "22, Lake View Residency,\nBanjara Hills, Hyderabad,\nTelangana — 500034",
    vendorPhone: "+91 40011 22556",
    vendorAddress: "Plot 9, Gachibowli Tech Park,\nHyderabad, Telangana — 500032",
    vendorTier: "Basic",
    items: [{ name: "Printed Maxi Dress", size: "S", color: "Teal", qty: 1, price: 899, imageUrl: "/assets/images/products/product-2.jpg" }],
    subtotal: 899,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "11 Jul 2025 · 8:15 AM", state: "done" },
      { label: "Vendor Acceptance", timestamp: "Awaiting vendor acceptance", state: "current" },
      { label: "Shipped", timestamp: "Not yet shipped", state: "upcoming" },
      { label: "Delivered", timestamp: "Not yet delivered", state: "upcoming" },
    ],
  },
  {
    id: "mvu-10477",
    orderNumber: "#MVU-10477",
    itemsCount: 1,
    customerName: "Vikram Singh",
    customerEmail: "vikram.singh@gmail.com",
    vendorName: "Desi Threads Co.",
    vendorType: "Physical Store",
    fulfillment: "Walk-in",
    amount: 650,
    paymentMethod: "COD",
    status: "No Show",
    date: "11 Jul 2025",
    placedAt: "11 Jul 2025, 5:00 PM",
    customerPhone: "+91 99887 66554",
    shippingAddress: "Walk-in purchase — collected in person, no shipping address",
    vendorPhone: "+91 74012 55667",
    vendorAddress: "45 MG Road, Indiranagar,\nBengaluru, Karnataka — 560038",
    vendorTier: "Limited",
    items: [{ name: "Cotton Kurta", size: "M", color: "Blue", qty: 1, price: 650, imageUrl: "/assets/images/products/product-1.jpg" }],
    subtotal: 650,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "11 Jul 2025 · 5:00 PM", state: "done" },
      { label: "Vendor Accepted", timestamp: "11 Jul 2025 · 5:01 PM", state: "done" },
      { label: "Marked No Show", timestamp: "11 Jul 2025 · 6:00 PM", state: "cancelled" },
    ],
  },
  {
    id: "mvu-10476",
    orderNumber: "#MVU-10476",
    itemsCount: 2,
    customerName: "Ananya Iyer",
    customerEmail: "ananya.iyer@gmail.com",
    vendorName: "Velora Styles",
    vendorType: "Online Seller",
    fulfillment: "Delivery",
    amount: 5120,
    paymentMethod: "Prepaid",
    status: "Processing",
    date: "10 Jul 2025",
    placedAt: "10 Jul 2025, 1:20 PM",
    customerPhone: "+91 98450 33221",
    shippingAddress: "7, Palm Grove Apartments,\nKoregaon Park, Pune,\nMaharashtra — 411001",
    vendorPhone: "+91 20011 88990",
    vendorAddress: "18 FC Road, Shivajinagar,\nPune, Maharashtra — 411005",
    vendorTier: "Verified",
    items: [
      { name: "Embroidered Kaftan", size: "L", color: "Mustard", qty: 1, price: 2999, imageUrl: "/assets/images/products/product-2.jpg" },
      { name: "Layered Necklace Set", size: "Free Size", color: "Gold", qty: 1, price: 2121, imageUrl: "/assets/images/products/product-8.jpg" },
    ],
    subtotal: 5120,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "10 Jul 2025 · 1:20 PM", state: "done" },
      { label: "Payment Confirmed", timestamp: "10 Jul 2025 · 1:21 PM · Razorpay", state: "done" },
      { label: "Vendor Accepted", timestamp: "10 Jul 2025 · 2:05 PM", state: "done" },
      { label: "Processing", timestamp: "Vendor is preparing your order", state: "current" },
      { label: "Shipped", timestamp: "Not yet shipped", state: "upcoming" },
      { label: "Delivered", timestamp: "Not yet delivered", state: "upcoming" },
    ],
  },
  {
    id: "mvu-10475",
    orderNumber: "#MVU-10475",
    itemsCount: 4,
    customerName: "Karan Malhotra",
    customerEmail: "karan.m@hotmail.com",
    vendorName: "North Square Atelier",
    vendorType: "Physical Store",
    fulfillment: "In-Store Pickup",
    amount: 3220,
    paymentMethod: "Prepaid",
    status: "Collected",
    date: "10 Jul 2025",
    placedAt: "10 Jul 2025, 10:00 AM",
    customerPhone: "+91 96543 21098",
    shippingAddress: "Pickup at North Square Atelier — Sector 17, Chandigarh",
    vendorPhone: "+91 17245 67890",
    vendorAddress: "Sector 17-C,\nChandigarh — 160017",
    vendorTier: "Limited",
    items: [
      { name: "Formal Trousers", size: "34", color: "Grey", qty: 2, price: 900, imageUrl: "/assets/images/products/product-4.jpg" },
      { name: "Dress Shirt", size: "L", color: "White", qty: 2, price: 710, imageUrl: "/assets/images/products/product-1.jpg" },
    ],
    subtotal: 3220,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "10 Jul 2025 · 10:00 AM", state: "done" },
      { label: "Payment Confirmed", timestamp: "10 Jul 2025 · 10:01 AM · Razorpay", state: "done" },
      { label: "Vendor Accepted", timestamp: "10 Jul 2025 · 10:30 AM", state: "done" },
      { label: "Ready for Pickup", timestamp: "10 Jul 2025 · 1:00 PM", state: "done" },
      { label: "Collected", timestamp: "10 Jul 2025 · 5:45 PM", state: "done" },
    ],
  },
  {
    id: "mvu-10474",
    orderNumber: "#MVU-10474",
    itemsCount: 1,
    customerName: "Neha Kulkarni",
    customerEmail: "neha.k@gmail.com",
    vendorName: "Aurel Lane",
    vendorType: "Online Seller",
    fulfillment: "Delivery",
    amount: 1299,
    paymentMethod: "COD",
    status: "Delivered",
    date: "09 Jul 2025",
    placedAt: "09 Jul 2025, 9:00 AM",
    customerPhone: "+91 90210 45678",
    shippingAddress: "14, Green Valley Society,\nKothrud, Pune,\nMaharashtra — 411038",
    vendorPhone: "+91 80099 11223",
    vendorAddress: "56 Residency Road,\nBengaluru, Karnataka — 560025",
    vendorTier: "Verified",
    items: [{ name: "Linen Co-ord Set", size: "M", color: "Sage Green", qty: 1, price: 1299, imageUrl: "/assets/images/products/product-5.jpg" }],
    subtotal: 1299,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "09 Jul 2025 · 9:00 AM", state: "done" },
      { label: "Vendor Accepted", timestamp: "09 Jul 2025 · 9:30 AM", state: "done" },
      { label: "Shipped", timestamp: "09 Jul 2025 · 2:00 PM · Bluedart", state: "done", trackingNumber: "DL2025070987654" },
      { label: "Delivered", timestamp: "10 Jul 2025 · 11:15 AM", state: "done" },
    ],
  },
  {
    id: "mvu-10473",
    orderNumber: "#MVU-10473",
    itemsCount: 3,
    customerName: "Rahul Bhatt",
    customerEmail: "rahul.bhatt@yahoo.com",
    vendorName: "Kraze Fashion",
    vendorType: "Online Seller",
    fulfillment: "Delivery",
    amount: 4599,
    paymentMethod: "Prepaid",
    status: "Cancelled",
    date: "09 Jul 2025",
    placedAt: "09 Jul 2025, 10:00 AM",
    customerPhone: "+91 99110 22334",
    shippingAddress: "9, Silver Oak Enclave,\nVastrapur, Ahmedabad,\nGujarat — 380015",
    vendorPhone: "+91 79022 33445",
    vendorAddress: "B-12 Naroda Industrial Estate,\nAhmedabad, Gujarat — 382330",
    vendorTier: "Limited",
    items: [
      { name: "Denim Jacket", size: "L", color: "Blue", qty: 1, price: 2599, imageUrl: "/assets/images/products/product-5.jpg" },
      { name: "Graphic Tee", size: "L", color: "Black", qty: 2, price: 1000, imageUrl: "/assets/images/products/product-9.jpg" },
    ],
    subtotal: 4599,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "09 Jul 2025 · 10:00 AM", state: "done" },
      { label: "Payment Confirmed", timestamp: "09 Jul 2025 · 10:01 AM · Razorpay", state: "done" },
      { label: "Order Cancelled", timestamp: "09 Jul 2025 · 2:45 PM — Cancelled by admin, vendor unable to fulfill", state: "cancelled" },
    ],
  },
  {
    id: "mvu-10472",
    orderNumber: "#MVU-10472",
    itemsCount: 2,
    customerName: "Divya Menon",
    customerEmail: "divya.menon@gmail.com",
    vendorName: "Harbor Blend Collective",
    vendorType: "Physical Store",
    fulfillment: "In-Store Pickup",
    amount: 1875,
    paymentMethod: "Prepaid",
    status: "Ready for Pickup",
    date: "08 Jul 2025",
    placedAt: "08 Jul 2025, 11:30 AM",
    customerPhone: "+91 88991 22110",
    shippingAddress: "Pickup at Harbor Blend Collective — Fort Kochi, Kerala",
    vendorPhone: "+91 48423 11009",
    vendorAddress: "Princess Street, Fort Kochi,\nKerala — 682001",
    vendorTier: "Verified",
    items: [
      { name: "Handloom Stole", size: "Free Size", color: "Indigo", qty: 1, price: 975, imageUrl: "/assets/images/products/product-8.jpg" },
      { name: "Cotton Blouse", size: "M", color: "White", qty: 1, price: 900, imageUrl: "/assets/images/products/product-2.jpg" },
    ],
    subtotal: 1875,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "08 Jul 2025 · 11:30 AM", state: "done" },
      { label: "Payment Confirmed", timestamp: "08 Jul 2025 · 11:31 AM · Razorpay", state: "done" },
      { label: "Vendor Accepted", timestamp: "08 Jul 2025 · 1:00 PM", state: "done" },
      { label: "Ready for Pickup", timestamp: "08 Jul 2025 · 4:00 PM", state: "current" },
      { label: "Collected", timestamp: "Awaiting customer pickup", state: "upcoming" },
    ],
  },
  {
    id: "mvu-10471",
    orderNumber: "#MVU-10471",
    itemsCount: 1,
    customerName: "Aditya Rao",
    customerEmail: "aditya.rao@outlook.com",
    vendorName: "Urban Thread House",
    vendorType: "Online Seller",
    fulfillment: "Delivery",
    amount: 1299,
    paymentMethod: "Prepaid",
    status: "Flagged",
    date: "08 Jul 2025",
    placedAt: "08 Jul 2025, 9:45 AM",
    customerPhone: "+91 99887 12345",
    shippingAddress: "3, Cedar Heights,\nWhitefield, Bengaluru,\nKarnataka — 560066",
    vendorPhone: "+91 80012 34567",
    vendorAddress: "Plot 22, Industrial Area,\nPeenya Phase II, Bengaluru,\nKarnataka — 560058",
    vendorTier: "Basic",
    items: [{ name: "Slim Fit Oxford Shirt", size: "M", color: "White", qty: 1, price: 1299, imageUrl: "/assets/images/products/product-1.jpg" }],
    subtotal: 1299,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "08 Jul 2025 · 9:45 AM", state: "done" },
      { label: "Payment Confirmed", timestamp: "08 Jul 2025 · 9:46 AM · Razorpay", state: "done" },
      { label: "Vendor Accepted", timestamp: "08 Jul 2025 · 10:20 AM", state: "done" },
      { label: "Flagged for Review", timestamp: "08 Jul 2025 · 3:00 PM — Suspicious address mismatch", state: "current" },
      { label: "Shipped", timestamp: "On hold pending review", state: "upcoming" },
      { label: "Delivered", timestamp: "Not yet delivered", state: "upcoming" },
    ],
  },
  {
    id: "mvu-10470",
    orderNumber: "#MVU-10470",
    itemsCount: 1,
    customerName: "Kavya Reddy",
    customerEmail: "kavya.reddy@gmail.com",
    vendorName: "Moss & Clay",
    vendorType: "Physical Store",
    fulfillment: "Walk-in",
    amount: 720,
    paymentMethod: "COD",
    status: "Completed",
    date: "07 Jul 2025",
    placedAt: "07 Jul 2025, 3:00 PM",
    customerPhone: "+91 90456 78123",
    shippingAddress: "Walk-in purchase — collected in person, no shipping address",
    vendorPhone: "+91 40033 22110",
    vendorAddress: "Jubilee Hills Road No. 5,\nHyderabad, Telangana — 500033",
    vendorTier: "Limited",
    items: [{ name: "Ceramic Jewelry Set", size: "Free Size", color: "Terracotta", qty: 1, price: 720, imageUrl: "/assets/images/products/product-8.jpg" }],
    subtotal: 720,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "07 Jul 2025 · 3:00 PM", state: "done" },
      { label: "Vendor Accepted", timestamp: "07 Jul 2025 · 3:02 PM", state: "done" },
      { label: "Completed", timestamp: "07 Jul 2025 · 3:15 PM", state: "done" },
    ],
  },
  {
    id: "mvu-10469",
    orderNumber: "#MVU-10469",
    itemsCount: 2,
    customerName: "Ibrahim Sheikh",
    customerEmail: "ibrahim.s@gmail.com",
    vendorName: "StyleVault India",
    vendorType: "Online Seller",
    fulfillment: "Delivery",
    amount: 2450,
    paymentMethod: "COD",
    status: "NDR",
    date: "07 Jul 2025",
    placedAt: "07 Jul 2025, 8:30 AM",
    customerPhone: "+91 91772 65432",
    shippingAddress: "27, Rose Villa,\nSecunderabad, Hyderabad,\nTelangana — 500003",
    vendorPhone: "+91 40011 22556",
    vendorAddress: "Plot 9, Gachibowli Tech Park,\nHyderabad, Telangana — 500032",
    vendorTier: "Basic",
    items: [
      { name: "Casual Shirt", size: "L", color: "Olive", qty: 1, price: 1250, imageUrl: "/assets/images/products/product-1.jpg" },
      { name: "Slim Trousers", size: "32", color: "Black", qty: 1, price: 1200, imageUrl: "/assets/images/products/product-4.jpg" },
    ],
    subtotal: 2450,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "07 Jul 2025 · 8:30 AM", state: "done" },
      { label: "Vendor Accepted", timestamp: "07 Jul 2025 · 9:00 AM", state: "done" },
      { label: "Shipped", timestamp: "07 Jul 2025 · 1:00 PM · Ecom Express", state: "done", trackingNumber: "DL2025070745612" },
      { label: "Delivery Attempt Failed (NDR)", timestamp: "07 Jul 2025 · 5:30 PM — Customer unreachable, non-delivery report raised", state: "cancelled" },
    ],
  },
  {
    id: "mvu-10468",
    orderNumber: "#MVU-10468",
    itemsCount: 5,
    customerName: "Meera Pillai",
    customerEmail: "meera.pillai@icloud.com",
    vendorName: "Aurel Lane",
    vendorType: "Online Seller",
    fulfillment: "Delivery",
    amount: 8940,
    paymentMethod: "Prepaid",
    status: "Delivered",
    date: "06 Jul 2025",
    placedAt: "06 Jul 2025, 9:15 AM",
    customerPhone: "+91 98123 65478",
    shippingAddress: "11, Willow Park,\nJP Nagar, Bengaluru,\nKarnataka — 560078",
    vendorPhone: "+91 80099 11223",
    vendorAddress: "56 Residency Road,\nBengaluru, Karnataka — 560025",
    vendorTier: "Verified",
    items: [
      { name: "Linen Shirt", size: "L", color: "White", qty: 2, price: 1499, imageUrl: "/assets/images/products/product-1.jpg" },
      { name: "Cotton Trousers", size: "32", color: "Beige", qty: 2, price: 1299, imageUrl: "/assets/images/products/product-4.jpg" },
      { name: "Leather Jacket", size: "L", color: "Brown", qty: 1, price: 3344, imageUrl: "/assets/images/products/product-6.jpg" },
    ],
    subtotal: 8940,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "06 Jul 2025 · 9:15 AM", state: "done" },
      { label: "Payment Confirmed", timestamp: "06 Jul 2025 · 9:16 AM · Razorpay", state: "done" },
      { label: "Vendor Accepted", timestamp: "06 Jul 2025 · 10:00 AM", state: "done" },
      { label: "Shipped", timestamp: "06 Jul 2025 · 2:30 PM · Delhivery", state: "done", trackingNumber: "DL2025070656789" },
      { label: "Delivered", timestamp: "07 Jul 2025 · 1:20 PM", state: "done" },
    ],
  },
  {
    id: "mvu-10467",
    orderNumber: "#MVU-10467",
    itemsCount: 1,
    customerName: "Sameer Qureshi",
    customerEmail: "sameer.q@yahoo.com",
    vendorName: "Desi Threads Co.",
    vendorType: "Physical Store",
    fulfillment: "Walk-in",
    amount: 410,
    paymentMethod: "COD",
    status: "No Show",
    date: "06 Jul 2025",
    placedAt: "06 Jul 2025, 4:30 PM",
    customerPhone: "+91 99001 44556",
    shippingAddress: "Walk-in purchase — collected in person, no shipping address",
    vendorPhone: "+91 74012 55667",
    vendorAddress: "45 MG Road, Indiranagar,\nBengaluru, Karnataka — 560038",
    vendorTier: "Limited",
    items: [{ name: "Cotton Handkerchief Set", size: "Free Size", color: "White", qty: 1, price: 410, imageUrl: "/assets/images/products/product-3.jpg" }],
    subtotal: 410,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "06 Jul 2025 · 4:30 PM", state: "done" },
      { label: "Vendor Accepted", timestamp: "06 Jul 2025 · 4:31 PM", state: "done" },
      { label: "Marked No Show", timestamp: "06 Jul 2025 · 7:00 PM", state: "cancelled" },
    ],
  },
  {
    id: "mvu-10466",
    orderNumber: "#MVU-10466",
    itemsCount: 3,
    customerName: "Tanya Chopra",
    customerEmail: "tanya.chopra@gmail.com",
    vendorName: "The Fabric Studio",
    vendorType: "Physical Store",
    fulfillment: "In-Store Pickup",
    amount: 2860,
    paymentMethod: "Prepaid",
    status: "Collected",
    date: "05 Jul 2025",
    placedAt: "05 Jul 2025, 10:15 AM",
    customerPhone: "+91 98234 56712",
    shippingAddress: "Pickup at The Fabric Studio — Bhandup, Mumbai",
    vendorPhone: "+91 22011 22334",
    vendorAddress: "12 Textile Lane, Bhandup,\nMumbai, Maharashtra — 400078",
    vendorTier: "Basic",
    items: [
      { name: "Silk Blouse", size: "S", color: "Pink", qty: 1, price: 1360, imageUrl: "/assets/images/products/product-2.jpg" },
      { name: "Cotton Palazzo", size: "M", color: "White", qty: 2, price: 750, imageUrl: "/assets/images/products/product-10.jpg" },
    ],
    subtotal: 2860,
    discount: 0,
    shippingFee: 0,
    timeline: [
      { label: "Order Placed", timestamp: "05 Jul 2025 · 10:15 AM", state: "done" },
      { label: "Payment Confirmed", timestamp: "05 Jul 2025 · 10:16 AM · Razorpay", state: "done" },
      { label: "Vendor Accepted", timestamp: "05 Jul 2025 · 11:00 AM", state: "done" },
      { label: "Ready for Pickup", timestamp: "05 Jul 2025 · 2:00 PM", state: "done" },
      { label: "Collected", timestamp: "05 Jul 2025 · 6:30 PM", state: "done" },
    ],
  },
];

export const STATUS_TABS: Array<{ label: string; value: OrderStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Ready for Pickup", value: "Ready for Pickup" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Collected", value: "Collected" },
  { label: "Cancelled", value: "Cancelled" },
  { label: "Flagged", value: "Flagged" },
  { label: "NDR", value: "NDR" },
];

/** Fulfillment segmented control shown in the Orders filter bar. */
export const FULFILLMENT_TABS: Array<{ label: string; value: FulfillmentType | "All" }> = [
  { label: "All", value: "All" },
  { label: "Delivery", value: "Delivery" },
  { label: "In-Store Pickup", value: "In-Store Pickup" },
  { label: "Walk-in", value: "Walk-in" },
];

/** Same values as `PAYMENT_OPTIONS` minus "All" — typed for the dropdown's options list. */
export const PAYMENT_METHODS: PaymentMethod[] = ["Prepaid", "COD"];
