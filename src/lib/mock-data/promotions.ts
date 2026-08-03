/**
 * Matches the Figma "promotions campaigns" design's Coupons table. Despite the Figma frame's
 * internal name, the rendered screen is titled "Promotions" with two tabs — Coupons (this
 * table) and Banners — per the header subtitle "Manage platform coupons and content banners".
 * Each coupon here is effectively a promotional "campaign": a code, a discount, a scope, and a
 * validity window, which is what admins actually manage on this screen.
 */
export type CouponDiscountType = "% Off" | "Fixed";

/** Matches the Figma table's APPLIES TO column — the same fulfillment-shaped values used
 * elsewhere in the app (see `PayoutFulfillment` in payments.ts), plus "All". */
export type CouponAppliesTo = "All" | "Delivery" | "Pickup" | "Walk-in";

export interface Coupon {
  /** Lowercase slug used for the `/promotions/[id]` edit route, e.g. "welcome20". */
  id: string;
  /** Display coupon code, e.g. "WELCOME20". */
  code: string;
  discountType: CouponDiscountType;
  /** Pre-formatted display value matching the discount type, e.g. "20%" or "₹150". */
  discountValue: string;
  appliesTo: CouponAppliesTo;
  /** "All Vendors" or a single vendor's display name. */
  vendorScope: string;
  minOrderAmount: number;
  usageCount: number;
  usageLimit: number;
  /** Display expiry date, e.g. "30 Jun 2025". */
  validUntil: string;
  isActive: boolean;
}

export const COUPONS: Coupon[] = [
  {
    id: "welcome20",
    code: "WELCOME20",
    discountType: "% Off",
    discountValue: "20%",
    appliesTo: "All",
    vendorScope: "All Vendors",
    minOrderAmount: 500,
    usageCount: 142,
    usageLimit: 500,
    validUntil: "30 Jun 2025",
    isActive: true,
  },
  {
    id: "flat150",
    code: "FLAT150",
    discountType: "Fixed",
    discountValue: "₹150",
    appliesTo: "Delivery",
    vendorScope: "All Vendors",
    minOrderAmount: 999,
    usageCount: 88,
    usageLimit: 200,
    validUntil: "15 Jul 2025",
    isActive: true,
  },
  {
    id: "pickup10",
    code: "PICKUP10",
    discountType: "% Off",
    discountValue: "10%",
    appliesTo: "Pickup",
    vendorScope: "All Vendors",
    minOrderAmount: 300,
    usageCount: 56,
    usageLimit: 300,
    validUntil: "31 Jul 2025",
    isActive: true,
  },
  {
    id: "walkin50",
    code: "WALKIN50",
    discountType: "Fixed",
    discountValue: "₹50",
    appliesTo: "Walk-in",
    vendorScope: "Urban Thread House",
    minOrderAmount: 200,
    usageCount: 23,
    usageLimit: 100,
    validUntil: "20 Jul 2025",
    isActive: true,
  },
  {
    id: "summer30",
    code: "SUMMER30",
    discountType: "% Off",
    discountValue: "30%",
    appliesTo: "All",
    vendorScope: "All Vendors",
    minOrderAmount: 800,
    usageCount: 310,
    usageLimit: 500,
    validUntil: "31 Aug 2025",
    isActive: true,
  },
  {
    id: "newuser15",
    code: "NEWUSER15",
    discountType: "% Off",
    discountValue: "15%",
    appliesTo: "Delivery",
    vendorScope: "All Vendors",
    minOrderAmount: 400,
    usageCount: 0,
    usageLimit: 1000,
    validUntil: "31 Dec 2025",
    isActive: true,
  },
  {
    id: "store200",
    code: "STORE200",
    discountType: "Fixed",
    discountValue: "₹200",
    appliesTo: "Pickup",
    vendorScope: "Zara Street Boutique",
    minOrderAmount: 1200,
    usageCount: 12,
    usageLimit: 50,
    validUntil: "10 Jul 2025",
    isActive: false,
  },
  {
    id: "flashsale",
    code: "FLASHSALE",
    discountType: "% Off",
    discountValue: "25%",
    appliesTo: "All",
    vendorScope: "All Vendors",
    minOrderAmount: 600,
    usageCount: 500,
    usageLimit: 500,
    validUntil: "1 Jun 2025",
    isActive: false,
  },
];

/**
 * Matches the Figma "banners content" screen (node 1071:7435) — a fixed grid of six named
 * banner *slots* (placements the storefront actually renders), not a dynamic list an admin adds
 * to or removes from. There's no "Create Banner" action anywhere in that design, which is why
 * this screen has no create form/route unlike Coupons — each slot already exists and admins only
 * toggle it on/off, reschedule it, or swap/remove its artwork.
 */
export type BannerKind = "image" | "strip";

export interface Banner {
  /** Lowercase slug, e.g. "homepage-hero". Not currently routed to anywhere (no detail screen
   * exists for banners, matching the design), but kept for stable React keys / future use. */
  id: string;
  title: string;
  kind: BannerKind;
  isActive: boolean;
  /** "image" banners only — the recommended crop shown under the title ("Recommended: 1200 ×
   * 400px") and used to size the preview to the same aspect ratio as the real placement. */
  recommendedWidth?: number;
  recommendedHeight?: number;
  /** "image" banners only — preview artwork, or null when no image has been uploaded yet
   * ("No banner set"), matching the App Home Top Banner slot in the design. */
  imageUrl?: string | null;
  imageAlt?: string;
  /** One-off purple note shown only under the Shop Nearby Discovery Banner's helper text. */
  note?: string;
  /** "image" banners only — display date strings e.g. "01 Jun 2025", or null for "— Not set —". */
  startDate?: string | null;
  endDate?: string | null;
  /** "strip" banners only (just the Flash Sale Countdown Strip) — no image, a text message and
   * a countdown target instead. */
  saleMessage?: string;
  /** "strip" banners only — `<input type="datetime-local">`-shaped ("2025-06-25T23:59"). */
  countdownEndsAt?: string;
}

export const BANNERS: Banner[] = [
  {
    id: "homepage-hero",
    title: "Homepage Hero Banner",
    kind: "image",
    isActive: true,
    recommendedWidth: 1200,
    recommendedHeight: 400,
    imageUrl: "/assets/images/banners/homepage-hero.jpg",
    imageAlt: "MIVYU Fashion Marketplace — Curated style. Unmatched you.",
    startDate: "01 Jun 2025",
    endDate: "30 Jun 2025",
  },
  {
    id: "homepage-secondary",
    title: "Homepage Secondary Banner",
    kind: "image",
    isActive: true,
    recommendedWidth: 600,
    recommendedHeight: 300,
    imageUrl: "/assets/images/banners/homepage-secondary.jpg",
    imageAlt: "MIVYU Summer Collection — Effortless elegance.",
    startDate: "05 Jun 2025",
    endDate: "05 Jul 2025",
  },
  {
    id: "app-home-top",
    title: "App Home Top Banner",
    kind: "image",
    isActive: false,
    recommendedWidth: 375,
    recommendedHeight: 200,
    imageUrl: null,
    startDate: null,
    endDate: null,
  },
  {
    id: "category-page",
    title: "Category Page Banner",
    kind: "image",
    isActive: true,
    recommendedWidth: 1200,
    recommendedHeight: 200,
    imageUrl: "/assets/images/banners/category-page.jpg",
    imageAlt: "Kurti Collection",
    startDate: "01 Jun 2025",
    endDate: "31 Jul 2025",
  },
  {
    id: "shop-nearby-discovery",
    title: "Shop Nearby Discovery Banner",
    kind: "image",
    isActive: true,
    recommendedWidth: 375,
    recommendedHeight: 200,
    imageUrl: "/assets/images/banners/shop-nearby.jpg",
    imageAlt: "Shop nearby. Pick up in-store.",
    note: "Promotes in-store pickup and walk-in discovery to customers",
    startDate: "10 Jun 2025",
    endDate: "10 Aug 2025",
  },
  {
    id: "flash-sale-strip",
    title: "Flash Sale Countdown Strip",
    kind: "strip",
    isActive: false,
    saleMessage: "⚡ Summer Flash Sale — Up to 50% Off!",
    // The Figma seed date (25 Jun 2025) has already passed relative to today — pushed forward
    // so the live countdown in `BannersGrid` actually counts down instead of reading "Ended" the
    // moment this screen loads. See the "Deviations" note in the build report.
    countdownEndsAt: "2026-08-10T23:59",
  },
];
