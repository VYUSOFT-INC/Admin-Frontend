import type { KycDocument, SellerTier, VendorType } from "@/lib/mock-data/vendors";

export type ProductStatus = "Pending" | "Approved" | "Rejected" | "Flagged";
export type FulfillmentType = "Delivery" | "In-Store Pickup" | "Walk-in";

/** A single size/color SKU row shown in the Product Review screen's variants table. */
export interface ProductVariant {
  size: string;
  color: string;
  stock: number;
  price: number;
}

/** A single automated check row shown in the Product Review screen's quality checklist. */
export interface QualityCheck {
  label: string;
  detail: string;
  passed: boolean;
}

/**
 * Vendor "blurb" surfaced on the Product Review screen's Vendor/KYC cards. Kept as a
 * name-keyed lookup (see `PRODUCT_VENDOR_INFO` below) rather than fields on `Product`
 * itself, so every product from the same vendor renders identical vendor info instead of
 * risking two products disagreeing about their shared vendor's tier/KYC status.
 */
export interface ProductVendorInfo {
  tier: SellerTier;
  productsCount: number;
  /** Two-stop gradient passed to the `Avatar` component's `gradient` prop. */
  gradient: readonly [string, string];
  kycDocuments: KycDocument[];
  /** Slug into `VENDORS` (see `src/lib/mock-data/vendors.ts`) when this vendor also has a
   *  full Vendor Detail record — only "Urban Thread House" does in the current mock set.
   *  Used to deep-link the Vendor card / KYC "View All" action; falls back to `/vendors`
   *  (the Vendor Management list) when absent, so the link always goes somewhere real. */
  vendorSlug?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  /** Path under /public — see public/assets/images/products for the originals. */
  imageUrl: string;
  vendorName: string;
  vendorType: VendorType;
  category: string;
  price: number;
  /** Original/MRP shown struck through next to the selling price, when higher than `price`. */
  comparePrice: number;
  fulfillment: FulfillmentType;
  submittedDate: string;
  status: ProductStatus;
  /** Short note shown under the status badge, e.g. why it's pending/flagged/rejected. */
  statusReason: string;
  description: string;
  fabric: string;
  fitType: string;
  variants: ProductVariant[];
  qualityChecks: QualityCheck[];
}

/** Variants at or below this stock level are flagged as low stock (see the amber "⚠" cell). */
export const LOW_STOCK_THRESHOLD = 15;

export const PRODUCTS: Product[] = [
  {
    id: "slim-fit-oxford-shirt",
    name: "Slim Fit Oxford Shirt",
    sku: "UTH-OXF-001",
    imageUrl: "/assets/images/products/product-1.jpg",
    vendorName: "Urban Thread House",
    vendorType: "Online Seller",
    category: "Men's Shirts",
    price: 1299,
    comparePrice: 2199,
    fulfillment: "Delivery",
    submittedDate: "12 Jul 2025",
    status: "Pending",
    statusReason: "Basic Vendor",
    description:
      "A premium slim-fit Oxford shirt crafted from 100% pure cotton fabric. Designed with a point collar and single chest pocket, this versatile shirt transitions effortlessly from formal boardroom settings to smart-casual weekend outings. The breathable weave ensures all-day comfort while maintaining a crisp, polished look.",
    fabric: "100% Pure Cotton Oxford",
    fitType: "Slim Fit",
    variants: [
      { size: "S", color: "White", stock: 32, price: 1299 },
      { size: "M", color: "White", stock: 44, price: 1299 },
      { size: "L", color: "White", stock: 28, price: 1299 },
      { size: "S", color: "Blue", stock: 14, price: 1299 },
      { size: "M", color: "Blue", stock: 30, price: 1299 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · Passed", passed: true },
      { label: "Description Complete", detail: "Min 80 words · 104 words found", passed: true },
      { label: "Category Match", detail: "Men's Shirts · Verified", passed: true },
      { label: "Price in Range", detail: "₹1,299 within category range", passed: true },
      { label: "Store Location Pinned", detail: "Not required — delivery fulfillment only", passed: true },
      { label: "Pickup Availability Set", detail: "Not required — delivery fulfillment only", passed: true },
    ],
  },
  {
    id: "floral-anarkali-kurta",
    name: "Floral Anarkali Kurta",
    sku: "FNK-ANK-204",
    imageUrl: "/assets/images/products/product-2.jpg",
    vendorName: "Fusia Nari Kollection",
    vendorType: "Online Seller",
    category: "Women's Ethnic",
    price: 2499,
    comparePrice: 2999,
    fulfillment: "Delivery",
    submittedDate: "11 Jul 2025",
    status: "Pending",
    statusReason: "Price Check Failed",
    description:
      "An elegant floral-print Anarkali kurta in flowing georgette, featuring a flared silhouette and three-quarter sleeves. Finished with delicate thread embroidery at the yoke, it pairs beautifully with matching leggings or palazzo pants for festive and everyday ethnic wear.",
    fabric: "Georgette with Anarkali Flare",
    fitType: "Relaxed Fit",
    variants: [
      { size: "S", color: "Pink", stock: 18, price: 2499 },
      { size: "M", color: "Pink", stock: 22, price: 2499 },
      { size: "L", color: "Pink", stock: 9, price: 2499 },
      { size: "M", color: "Yellow", stock: 16, price: 2499 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · Passed", passed: true },
      { label: "Description Complete", detail: "Min 80 words · 96 words found", passed: true },
      { label: "Category Match", detail: "Women's Ethnic · Verified", passed: true },
      { label: "Price in Range", detail: "₹2,499 exceeds category range (₹800–₹2,200)", passed: false },
      { label: "Store Location Pinned", detail: "Not required — delivery fulfillment only", passed: true },
      { label: "Pickup Availability Set", detail: "Not required — delivery fulfillment only", passed: true },
    ],
  },
  {
    id: "cartoon-print-kids-tee",
    name: "Cartoon Print Kids Tee",
    sku: "LLK-TEE-089",
    imageUrl: "/assets/images/products/product-3.jpg",
    vendorName: "Little League Kids",
    vendorType: "Physical Store",
    category: "Kids Boys",
    price: 399,
    comparePrice: 599,
    fulfillment: "Delivery",
    submittedDate: "10 Jul 2025",
    status: "Pending",
    statusReason: "Basic Vendor",
    description:
      "A playful cartoon-print t-shirt for kids, made from soft, breathable 100% cotton jersey. Featuring a crew neckline and short sleeves, it's built for all-day comfort during play, school, or casual outings.",
    fabric: "100% Cotton Jersey",
    fitType: "Regular Fit",
    variants: [
      { size: "2-3Y", color: "Yellow", stock: 40, price: 399 },
      { size: "4-5Y", color: "Yellow", stock: 36, price: 399 },
      { size: "6-7Y", color: "Blue", stock: 12, price: 399 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · Passed", passed: true },
      { label: "Description Complete", detail: "Min 80 words · 88 words found", passed: true },
      { label: "Category Match", detail: "Kids Boys · Verified", passed: true },
      { label: "Price in Range", detail: "₹399 within category range", passed: true },
      { label: "Store Location Pinned", detail: "Not required — delivery fulfillment only", passed: true },
      { label: "Pickup Availability Set", detail: "Not required — delivery fulfillment only", passed: true },
    ],
  },
  {
    id: "slim-chino-trousers",
    name: "Slim Chino Trousers",
    sku: "UTH-CHN-015",
    imageUrl: "/assets/images/products/product-4.jpg",
    vendorName: "Urban Thread House",
    vendorType: "Online Seller",
    category: "Men's Trousers",
    price: 1199,
    comparePrice: 1699,
    fulfillment: "Delivery",
    submittedDate: "09 Jul 2025",
    status: "Pending",
    statusReason: "Image Quality",
    description:
      "Tailored slim chino trousers in stretch cotton twill, offering a modern silhouette with enough give for all-day movement. Featuring a flat front, side slant pockets, and a mid-rise waist suited for both casual and smart-casual pairing.",
    fabric: "Stretch Cotton Twill",
    fitType: "Slim Fit",
    variants: [
      { size: "30", color: "Khaki", stock: 20, price: 1199 },
      { size: "32", color: "Khaki", stock: 26, price: 1199 },
      { size: "34", color: "Navy", stock: 11, price: 1199 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · 2 images below minimum", passed: false },
      { label: "Description Complete", detail: "Min 80 words · 91 words found", passed: true },
      { label: "Category Match", detail: "Men's Trousers · Verified", passed: true },
      { label: "Price in Range", detail: "₹1,199 within category range", passed: true },
      { label: "Store Location Pinned", detail: "Not required — delivery fulfillment only", passed: true },
      { label: "Pickup Availability Set", detail: "Not required — delivery fulfillment only", passed: true },
    ],
  },
  {
    id: "washed-denim-jacket",
    name: "Washed Denim Jacket",
    sku: "DSN-DJK-302",
    imageUrl: "/assets/images/products/product-5.jpg",
    vendorName: "Denim Studio",
    vendorType: "Physical Store",
    category: "Women's Jackets",
    price: 3199,
    comparePrice: 3999,
    fulfillment: "In-Store Pickup",
    submittedDate: "08 Jul 2025",
    status: "Approved",
    statusReason: "Auto-approved",
    description:
      "A classic washed denim jacket with a rugged, lived-in finish. Featuring button-flap chest pockets and a sturdy button placket, it layers effortlessly over tees and shirts for a timeless casual look.",
    fabric: "Washed Rigid Denim",
    fitType: "Regular Fit",
    variants: [
      { size: "S", color: "Light Blue", stock: 15, price: 3199 },
      { size: "M", color: "Light Blue", stock: 19, price: 3199 },
      { size: "L", color: "Dark Blue", stock: 24, price: 3199 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · Passed", passed: true },
      { label: "Description Complete", detail: "Min 80 words · 82 words found", passed: true },
      { label: "Category Match", detail: "Women's Jackets · Verified", passed: true },
      { label: "Price in Range", detail: "₹3,199 within category range", passed: true },
      { label: "Store Location Pinned", detail: "Andheri West pickup point pinned", passed: true },
      { label: "Pickup Availability Set", detail: "Mon–Sat, 10am–7pm", passed: true },
    ],
  },
  {
    id: "classic-formal-blazer",
    name: "Classic Formal Blazer",
    sku: "ELT-BLZ-111",
    imageUrl: "/assets/images/products/product-6.jpg",
    vendorName: "Elite Formals",
    vendorType: "Online Seller",
    category: "Men's Blazers",
    price: 4999,
    comparePrice: 6499,
    fulfillment: "Delivery",
    submittedDate: "07 Jul 2025",
    status: "Approved",
    statusReason: "Auto-approved",
    description:
      "A sharply tailored formal blazer in a wool-blend suiting fabric, designed for boardrooms and formal events alike. Structured shoulders and a two-button closure lend a polished, confident silhouette.",
    fabric: "Wool-Blend Suiting",
    fitType: "Tailored Fit",
    variants: [
      { size: "38", color: "Charcoal", stock: 10, price: 4999 },
      { size: "40", color: "Charcoal", stock: 14, price: 4999 },
      { size: "42", color: "Navy", stock: 8, price: 4999 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · Passed", passed: true },
      { label: "Description Complete", detail: "Min 80 words · 87 words found", passed: true },
      { label: "Category Match", detail: "Men's Blazers · Verified", passed: true },
      { label: "Price in Range", detail: "₹4,999 within category range", passed: true },
      { label: "Store Location Pinned", detail: "Not required — delivery fulfillment only", passed: true },
      { label: "Pickup Availability Set", detail: "Not required — delivery fulfillment only", passed: true },
    ],
  },
  {
    id: "bow-tie-frock",
    name: "Bow Tie Frock",
    sku: "LLK-FRK-042",
    imageUrl: "/assets/images/products/product-7.jpg",
    vendorName: "Little League Kids",
    vendorType: "Physical Store",
    category: "Kids Girls",
    price: 699,
    comparePrice: 899,
    fulfillment: "Walk-in",
    submittedDate: "06 Jul 2025",
    status: "Flagged",
    statusReason: "System Flagged",
    description:
      "A charming bow-tie frock for little girls, cut from a soft cotton-poplin blend with a twirl-friendly A-line skirt. A statement bow at the waist and back button closure complete the party-ready look.",
    fabric: "Cotton-Poplin Blend",
    fitType: "A-Line Fit",
    variants: [
      { size: "2-3Y", color: "Red", stock: 6, price: 699 },
      { size: "4-5Y", color: "Red", stock: 13, price: 699 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · Passed", passed: true },
      { label: "Description Complete", detail: "Min 80 words · 52 words found", passed: false },
      { label: "Category Match", detail: "Kids Girls · Verified", passed: true },
      { label: "Price in Range", detail: "₹699 within category range", passed: true },
      { label: "Store Location Pinned", detail: "Required for walk-in — Not set", passed: false },
      { label: "Pickup Availability Set", detail: "Walk-in hours not configured", passed: false },
    ],
  },
  {
    id: "banarasi-silk-saree",
    name: "Banarasi Silk Saree",
    sku: "FNK-SAR-088",
    imageUrl: "/assets/images/products/product-8.jpg",
    vendorName: "Fusia Nari Kollection",
    vendorType: "Online Seller",
    category: "Women's Sarees",
    price: 8299,
    comparePrice: 9999,
    fulfillment: "Delivery",
    submittedDate: "05 Jul 2025",
    status: "Rejected",
    statusReason: "Invalid GST",
    description:
      "An exquisite handwoven Banarasi silk saree featuring intricate zari brocade work throughout the body and pallu. A rich, festive drape suited for weddings and celebratory occasions.",
    fabric: "Pure Banarasi Silk",
    fitType: "One Size (5.5m)",
    variants: [
      { size: "Free Size", color: "Maroon", stock: 5, price: 8299 },
      { size: "Free Size", color: "Gold", stock: 7, price: 8299 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · Passed", passed: true },
      { label: "Description Complete", detail: "Min 80 words · 84 words found", passed: true },
      { label: "Category Match", detail: "Women's Sarees · Verified", passed: true },
      { label: "Price in Range", detail: "₹8,299 within category range", passed: true },
      { label: "Store Location Pinned", detail: "Not required — delivery fulfillment only", passed: true },
      { label: "Pickup Availability Set", detail: "Not required — delivery fulfillment only", passed: true },
    ],
  },
  {
    id: "graphic-print-hoodie",
    name: "Graphic Print Hoodie",
    sku: "STW-HOD-077",
    imageUrl: "/assets/images/products/product-9.jpg",
    vendorName: "Streetvibe Co.",
    vendorType: "Online Seller",
    category: "Men's Hoodies",
    price: 1499,
    comparePrice: 1999,
    fulfillment: "Delivery",
    submittedDate: "04 Jul 2025",
    status: "Pending",
    statusReason: "Basic Vendor",
    description:
      "An oversized graphic-print hoodie in brushed cotton fleece, featuring a kangaroo pocket and adjustable drawstring hood. A streetwear staple built for everyday comfort and layering.",
    fabric: "Cotton Fleece",
    fitType: "Oversized Fit",
    variants: [
      { size: "M", color: "Black", stock: 28, price: 1499 },
      { size: "L", color: "Black", stock: 19, price: 1499 },
      { size: "XL", color: "Grey", stock: 12, price: 1499 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · Passed", passed: true },
      { label: "Description Complete", detail: "Min 80 words · 90 words found", passed: true },
      { label: "Category Match", detail: "Men's Hoodies · Verified", passed: true },
      { label: "Price in Range", detail: "₹1,499 within category range", passed: true },
      { label: "Store Location Pinned", detail: "Not required — delivery fulfillment only", passed: true },
      { label: "Pickup Availability Set", detail: "Not required — delivery fulfillment only", passed: true },
    ],
  },
  {
    id: "wide-leg-cotton-palazzo",
    name: "Wide Leg Cotton Palazzo",
    sku: "DSN-PLZ-060",
    imageUrl: "/assets/images/products/product-10.jpg",
    vendorName: "Denim Studio",
    vendorType: "Physical Store",
    category: "Women's Bottoms",
    price: 1599,
    comparePrice: 1899,
    fulfillment: "In-Store Pickup",
    submittedDate: "03 Jul 2025",
    status: "Approved",
    statusReason: "Manually reviewed",
    description:
      "Breezy wide-leg palazzo pants in pure cotton, featuring an elasticated waistband and flowing silhouette. A comfortable, versatile bottom for both everyday wear and warm-weather styling.",
    fabric: "Pure Cotton",
    fitType: "Wide Leg / Palazzo",
    variants: [
      { size: "S", color: "White", stock: 17, price: 1599 },
      { size: "M", color: "White", stock: 21, price: 1599 },
      { size: "L", color: "Beige", stock: 13, price: 1599 },
    ],
    qualityChecks: [
      { label: "Image Quality", detail: "Min 800×1000px resolution · Passed", passed: true },
      { label: "Description Complete", detail: "Min 80 words · 80 words found", passed: true },
      { label: "Category Match", detail: "Women's Bottoms · Verified", passed: true },
      { label: "Price in Range", detail: "₹1,599 within category range", passed: true },
      { label: "Store Location Pinned", detail: "Hinjewadi pickup point pinned", passed: true },
      { label: "Pickup Availability Set", detail: "Mon–Sat, 11am–8pm", passed: true },
    ],
  },
];

/** Vendor blurb shown on the Product Review screen — see `ProductVendorInfo` above. */
export const PRODUCT_VENDOR_INFO: Record<string, ProductVendorInfo> = {
  "Urban Thread House": {
    tier: "Basic",
    productsCount: 24,
    gradient: ["#082a67", "#123d8e"],
    vendorSlug: "urban-thread-house",
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Pending" },
    ],
  },
  "Fusia Nari Kollection": {
    tier: "Basic",
    productsCount: 12,
    gradient: ["#9d174d", "#be185d"],
    kycDocuments: [
      { name: "GST Certificate", status: "Rejected" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Verified" },
    ],
  },
  "Little League Kids": {
    tier: "Limited",
    productsCount: 31,
    gradient: ["#0e7490", "#0891b2"],
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Verified" },
    ],
  },
  "Denim Studio": {
    tier: "Verified",
    productsCount: 58,
    gradient: ["#374151", "#4b5563"],
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Verified" },
    ],
  },
  "Elite Formals": {
    tier: "Verified",
    productsCount: 19,
    gradient: ["#1e40af", "#2563eb"],
    kycDocuments: [
      { name: "GST Certificate", status: "Verified" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Verified" },
      { name: "Address Proof", status: "Verified" },
    ],
  },
  "Streetvibe Co.": {
    tier: "Basic",
    productsCount: 8,
    gradient: ["#b45309", "#d97706"],
    kycDocuments: [
      { name: "GST Certificate", status: "Pending" },
      { name: "PAN Card", status: "Verified" },
      { name: "Cancelled Cheque", status: "Pending" },
      { name: "Address Proof", status: "Pending" },
    ],
  },
};

export const STATUS_TABS: Array<{ label: string; value: ProductStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Approved", value: "Approved" },
  { label: "Pending Review", value: "Pending" },
  { label: "Rejected", value: "Rejected" },
  { label: "Flagged", value: "Flagged" },
];

export const TYPE_TABS: Array<{ label: string; value: VendorType | "All" }> = [
  { label: "All Types", value: "All" },
  { label: "Online Sellers", value: "Online Seller" },
  { label: "Physical Stores", value: "Physical Store" },
];

export const FULFILLMENT_OPTIONS: Array<{ label: string; value: FulfillmentType | "All" }> = [
  { label: "All", value: "All" },
  { label: "Delivery", value: "Delivery" },
  { label: "In-Store Pickup", value: "In-Store Pickup" },
  { label: "Walk-in", value: "Walk-in" },
];

/** Same values as `FULFILLMENT_OPTIONS` minus "All" — typed for the dropdown's options list. */
export const FULFILLMENT_TYPES: FulfillmentType[] = ["Delivery", "In-Store Pickup", "Walk-in"];

/** Derived from the mock catalog so the "Category" filter never lists an option with zero matches. */
export const CATEGORY_OPTIONS: string[] = Array.from(new Set(PRODUCTS.map((product) => product.category))).sort();

/** Derived from the mock catalog so the "Vendor" filter never lists an option with zero matches. */
export const VENDOR_OPTIONS: string[] = Array.from(new Set(PRODUCTS.map((product) => product.vendorName))).sort();
