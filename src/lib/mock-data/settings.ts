/**
 * Mock data for the Settings section. "Commission Rates" (Figma node 1071:8652), "Payout
 * Schedule" (node 1071:8929), "Category Management" (node 1071:9230), "Platform Config"
 * (node 1071:9795), "Shipping" (node 1143:1675), "Tax & Compliance" (node 1143:2483),
 * "Pickup & Store" (node 1071:10046), and "Reseller Program" (node 1177:1184) are all built —
 * every `SETTINGS_SUB_NAV` destination now links somewhere real.
 *
 * Standalone-mock note: these category commission rates are a *forward-looking configuration*
 * an admin edits here — matching the Figma copy "Changes apply to future settlements." They are
 * intentionally **not** wired to `payments.ts`'s `commissionRate`/`commissionAmount` fields on
 * already-settled `PayoutOrderLine`s (all of which are a flat 10, recorded at the rate that was
 * actually charged at the time — like a paid invoice, historical lines don't retroactively
 * change when a rate is edited later). Re-deriving every past payout's numbers from this table
 * would require a real backend to recompute settlements; there's no such backend here. This
 * mirrors how `CouponForm.tsx` and `BannersGrid.tsx` mock their own save round-trips without
 * touching unrelated mock data elsewhere.
 */
import type { ResellerTier } from "@/lib/mock-data/resellers";

export interface CommissionCategoryRate {
  /** Matches the display categories used across the catalog (see `products.ts`'s `category`
   * field) closely enough to read as the same taxonomy, though this table groups a few of those
   * finer product categories under one umbrella row (e.g. "Women's Ethnic Wear" covers both
   * "Women's Ethnic" and "Women's Sarees"), matching the 8 rows the Figma design shows. */
  category: string;
  /** Whole-percent commission rate charged on delivery-fulfilled orders in this category. */
  deliveryRate: number;
  /** Whole-percent commission rate charged on in-store-pickup-fulfilled orders in this category. */
  pickupRate: number;
}

export const COMMISSION_CATEGORY_RATES: CommissionCategoryRate[] = [
  { category: "Women's Ethnic Wear", deliveryRate: 12, pickupRate: 9 },
  { category: "Men's Casual Wear", deliveryRate: 12, pickupRate: 9 },
  { category: "Footwear", deliveryRate: 14, pickupRate: 11 },
  { category: "Accessories", deliveryRate: 15, pickupRate: 12 },
  { category: "Kids' Wear", deliveryRate: 11, pickupRate: 8 },
  { category: "Activewear & Sports", deliveryRate: 13, pickupRate: 10 },
  { category: "Lingerie & Innerwear", deliveryRate: 14, pickupRate: 11 },
  { category: "Western Wear", deliveryRate: 12, pickupRate: 9 },
];

export interface SettingsSubNavItem {
  label: string;
  /** Route slug under `/settings/`, e.g. "commission" → `/settings/commission`. */
  slug: string;
  /** All seven sections now have a built screen, so this is always `true` — kept as a flag (rather
   * than deleted) since `SettingsSubNav.tsx`'s Link/"Soon"-badge branching reads off it, and a
   * future eighth sub-nav destination would drop in the same way "Tax & Compliance" did. */
  isAvailable: boolean;
}

/** Order matches the Figma "reseller program" screen's own sub-nav screenshot exactly:
 * "Reseller Program" is the eighth and last entry, after "Pickup & Store". */
export const SETTINGS_SUB_NAV: SettingsSubNavItem[] = [
  { label: "Commission Rates", slug: "commission", isAvailable: true },
  { label: "Payout Schedule", slug: "payout-schedule", isAvailable: true },
  { label: "Category Management", slug: "category-management", isAvailable: true },
  { label: "Platform Config", slug: "platform-config", isAvailable: true },
  { label: "Shipping", slug: "shipping", isAvailable: true },
  { label: "Tax & Compliance", slug: "tax-compliance", isAvailable: true },
  { label: "Pickup & Store", slug: "pickup-store", isAvailable: true },
  { label: "Reseller Program", slug: "reseller-program", isAvailable: true },
];

/**
 * "Platform Config" settings (Figma "platform config", node 1071:9795) — global platform rules
 * applied uniformly to every vendor and customer (not per-category like `COMMISSION_CATEGORY_RATES`,
 * and not a cadence like `PAYOUT_SCHEDULE_SETTINGS`).
 */
export interface PlatformConfigSettings {
  /** Whole-rupee floor — customers cannot place an order below this subtotal. */
  minimumOrderValue: number;
  /** Days after delivery within which a customer can raise a return request. */
  maximumReturnWindowDays: number;
  /** Whether Cash on Delivery is offered as a payment option platform-wide. */
  codAvailable: boolean;
  /** Whole-percent GST applied to platform commission and fees (not vendor-side GST, which is
   * each vendor's own responsibility per the Figma copy). */
  gstRatePercent: number;
  /** Failed delivery attempts allowed before an order is auto-marked Return to Origin (RTO). */
  maxDeliveryAttemptsBeforeRTO: number;
  /** Shown to customers on order confirmation and support pages. */
  customerSupportEmail: string;
}

/**
 * Standalone-mock note, mirroring this file's other settings tables: this is a *forward-looking
 * global configuration* an admin edits here, with no real backend joining it back to other mock
 * tables that already encode related facts. In particular:
 * - Toggling `codAvailable` off does not retroactively rewrite `orders.ts`'s existing
 *   `paymentMethod: "COD"` orders (e.g. ord-3391) or remove `"COD"` from its `PAYMENT_METHODS`
 *   list — those are historical/seeded orders, like a paid invoice, the same way editing
 *   `PAYOUT_SCHEDULE_SETTINGS` doesn't rewrite already-settled payouts.
 * - `maximumReturnWindowDays` is likewise not wired to `returns.ts`'s existing seeded return
 *   requests or their eligibility — there's no backend here to recompute which past returns would
 *   or wouldn't have qualified under a newly edited window.
 * - `gstRatePercent` is not wired into any commission math in `payments.ts` or
 *   `COMMISSION_CATEGORY_RATES` for the same reason.
 */
export const PLATFORM_CONFIG_SETTINGS: PlatformConfigSettings = {
  minimumOrderValue: 199,
  maximumReturnWindowDays: 7,
  codAvailable: true,
  gstRatePercent: 18,
  maxDeliveryAttemptsBeforeRTO: 3,
  customerSupportEmail: "support@mivyu.com",
};

/**
 * "Pickup & Store" settings (Figma "pickup store settings", node 1071:10046) — global platform
 * rules for how in-store/walk-in pickup fulfillment works everywhere (not a list of individual
 * physical stores; that's the separate "Pickup Store" screen, Figma node 1101:2, which manages
 * each Physical Store vendor's own store hours/location on the Vendor Detail screen's Overview
 * tab — see `VendorStoreHoursCard`/`VendorStoreLocationCard` and the `storeHours`/`storeAddress`
 * fields on `Vendor` in `vendors.ts`). This screen's settings apply uniformly to every
 * vendor's pickup-enabled store, the same "global platform rules" scope as `PlatformConfigSettings`
 * above, just scoped to pickup/walk-in fulfillment instead of orders/payments/support generally.
 */
export interface PickupStoreSettings {
  /** Maximum distance (whole km) within which customers can discover and browse nearby physical
   * stores for in-store pickup. */
  maxPickupRadiusKm: number;
  /** Whole hours a customer has to collect their order after the vendor marks it "Ready for
   * Pickup" before auto-cancellation rules apply. */
  pickupCollectionWindowHours: number;
  /** Whole hours after the "Ready for Pickup" timestamp before an uncollected order is
   * automatically cancelled and restocked. */
  autoCancelUnpickedOrdersAfterHours: number;
  /** When on, newly registered physical stores are held in a pending state until reviewed and
   * approved by an admin; online sellers are unaffected. */
  storeVerificationRequired: boolean;
}

/**
 * Standalone-mock note, mirroring this file's other settings tables: this is a *forward-looking
 * global configuration* an admin edits here (the Figma info strip literally says "Existing active
 * pickup orders are not affected"), so it's intentionally **not** wired back to
 * `vendors.ts`'s existing `pickupAddress` values or to any seeded order/return records — editing
 * `maxPickupRadiusKm` doesn't retroactively recompute which past walk-in orders would've been in
 * range, the same way editing a commission rate here doesn't retroactively rewrite a settled
 * payout. `storeVerificationRequired` likewise doesn't reach into `vendors.ts` and flip any
 * existing vendor's approval status — there's no backend here to recompute that.
 */
export const PICKUP_STORE_SETTINGS: PickupStoreSettings = {
  maxPickupRadiusKm: 15,
  pickupCollectionWindowHours: 48,
  autoCancelUnpickedOrdersAfterHours: 72,
  storeVerificationRequired: true,
};

/** How often vendor payouts are batched and calculated (Figma "settings - payout schedule",
 * node 1071:8929, "Settlement Cycle" dropdown). */
export type SettlementCycle = "Weekly" | "Bi-weekly" | "Monthly";
export const SETTLEMENT_CYCLE_OPTIONS: SettlementCycle[] = ["Weekly", "Bi-weekly", "Monthly"];

/** Day of the week payout processing is initiated ("Processing Day" dropdown). */
export type ProcessingDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
export const PROCESSING_DAY_OPTIONS: ProcessingDay[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

/** How vendors are notified when a payout is processed or released ("Payout Notification"
 * dropdown). */
export type PayoutNotificationMethod = "Email" | "In-app" | "Email + In-app";
export const PAYOUT_NOTIFICATION_OPTIONS: PayoutNotificationMethod[] = ["Email", "In-app", "Email + In-app"];

export interface PayoutScheduleSettings {
  settlementCycle: SettlementCycle;
  processingDay: ProcessingDay;
  /** Days to hold a payout after the order is marked completed, before it's eligible for release
   * (lets the return window pass first). */
  holdPeriodDays: number;
  /** Vendors with a net payout below this (in ₹) have their balance carried over to the next
   * cycle instead of being released. */
  minimumPayoutThreshold: number;
  notificationMethod: PayoutNotificationMethod;
}

/**
 * Standalone-mock note, mirroring this file's `COMMISSION_CATEGORY_RATES` comment above: this is
 * a *forward-looking configuration* (the Figma info strip literally says "Changes to payout
 * schedule take effect from the next settlement cycle. Ongoing or pending payouts are not
 * affected."), so it's intentionally **not** used to recompute `payments.ts`'s already-settled
 * `Payout.periodLabel`/`dueDate` values. Those seed payouts already follow a semi-monthly
 * "1st–15th, 16th–end of month" cutoff with the release a few days after each cutoff — the
 * closest existing `SettlementCycle` option to that cadence is "Bi-weekly" (payouts batched
 * roughly twice a month), which is why it's the seeded default below rather than "Weekly" or
 * "Monthly". Editing this panel does not rewrite any historical payout's dates, the same way
 * editing a commission rate here doesn't retroactively change a settled payout's commission.
 */
export const PAYOUT_SCHEDULE_SETTINGS: PayoutScheduleSettings = {
  settlementCycle: "Bi-weekly",
  processingDay: "Wednesday",
  holdPeriodDays: 7,
  minimumPayoutThreshold: 500,
  notificationMethod: "Email + In-app",
};

/** A single row in Category Management's category tree (Figma "category management", node
 * 1071:9230) — either a top-level category (`parentId: null`) or a sub-category nested one level
 * under a top-level category (`parentId` set to that category's `id`). The tree is only ever two
 * levels deep, matching every row the Figma design shows. */
export interface PlatformCategory {
  id: string;
  name: string;
  /** `null` for a top-level category; otherwise the `id` of the top-level category this
   * sub-category is nested under. */
  parentId: string | null;
  /** Count of catalog products tagged to this exact category/sub-category row (not a rollup of
   * its children's counts, though the seed data below happens to add up that way for the two
   * branches Figma actually shows expanded). */
  productCount: number;
  isActive: boolean;
}

/**
 * Category Management's catalog category tree. The 8 top-level rows are seeded from
 * `COMMISSION_CATEGORY_RATES[n].category` above rather than retyped as fresh strings — Category
 * Management is the screen that owns the platform's product-category taxonomy (add, rename,
 * re-parent, activate/deactivate), while Commission Rates lists a commission percentage *for*
 * that same taxonomy, so both screens need to read as one consistent list of category names, not
 * two independently-invented ones. That's also why the Figma design's own 8 top-level category
 * names line up one-for-one with `COMMISSION_CATEGORY_RATES`'s 8 rows.
 *
 * Standalone-mock note, matching this file's other tables: there's still no real backend joining
 * the two arrays, so a rename/edit made here does not reach back and rewrite the matching
 * `COMMISSION_CATEGORY_RATES` row (or vice versa) — the same way editing a commission rate here
 * doesn't retroactively rewrite `payments.ts`'s already-settled payout lines. Sub-category rows,
 * product counts, and active status below are fields this screen owns that Commission Rates has
 * no equivalent for.
 *
 * Product counts and statuses for "Women's Ethnic Wear" and "Accessories" (the two branches Figma
 * shows expanded) match the exact numbers in the design; "Bags & Wallets" is also seeded Inactive
 * and "Watches" is added beyond what Figma shows so Accessories' children add up to its shown
 * 521 total. The other 6 branches' sub-categories aren't shown expanded in Figma, so their names
 * are filled in editorially, sized so each branch's children add up to that branch's shown total.
 * "Western Wear" matches Figma's own "(parent, collapsed, inactive)" row — the only top-level
 * category seeded Inactive — with its two sub-categories inactive to match.
 */
export const PLATFORM_CATEGORIES: PlatformCategory[] = [
  { id: "cat-womens-ethnic-wear", name: COMMISSION_CATEGORY_RATES[0].category, parentId: null, productCount: 1204, isActive: true },
  { id: "sub-sarees", name: "Sarees", parentId: "cat-womens-ethnic-wear", productCount: 412, isActive: true },
  { id: "sub-kurtas-suits", name: "Kurtas & Suits", parentId: "cat-womens-ethnic-wear", productCount: 389, isActive: true },
  { id: "sub-lehengas-ghagras", name: "Lehengas & Ghagras", parentId: "cat-womens-ethnic-wear", productCount: 403, isActive: true },

  { id: "cat-mens-casual-wear", name: COMMISSION_CATEGORY_RATES[1].category, parentId: null, productCount: 876, isActive: true },
  { id: "sub-shirts", name: "Shirts", parentId: "cat-mens-casual-wear", productCount: 512, isActive: true },
  { id: "sub-tshirts-polos", name: "T-Shirts & Polos", parentId: "cat-mens-casual-wear", productCount: 364, isActive: true },

  { id: "cat-footwear", name: COMMISSION_CATEGORY_RATES[2].category, parentId: null, productCount: 643, isActive: true },
  { id: "sub-casual-shoes", name: "Casual Shoes", parentId: "cat-footwear", productCount: 401, isActive: true },
  { id: "sub-formal-shoes", name: "Formal Shoes", parentId: "cat-footwear", productCount: 242, isActive: true },

  { id: "cat-accessories", name: COMMISSION_CATEGORY_RATES[3].category, parentId: null, productCount: 521, isActive: true },
  { id: "sub-jewellery", name: "Jewellery", parentId: "cat-accessories", productCount: 218, isActive: true },
  { id: "sub-bags-wallets", name: "Bags & Wallets", parentId: "cat-accessories", productCount: 147, isActive: false },
  { id: "sub-sunglasses", name: "Sunglasses", parentId: "cat-accessories", productCount: 88, isActive: true },
  { id: "sub-watches", name: "Watches", parentId: "cat-accessories", productCount: 68, isActive: true },

  { id: "cat-kids-wear", name: COMMISSION_CATEGORY_RATES[4].category, parentId: null, productCount: 394, isActive: true },
  { id: "sub-boys-clothing", name: "Boys' Clothing", parentId: "cat-kids-wear", productCount: 210, isActive: true },
  { id: "sub-girls-clothing", name: "Girls' Clothing", parentId: "cat-kids-wear", productCount: 184, isActive: true },

  { id: "cat-activewear-sports", name: COMMISSION_CATEGORY_RATES[5].category, parentId: null, productCount: 287, isActive: true },
  { id: "sub-gym-training-wear", name: "Gym & Training Wear", parentId: "cat-activewear-sports", productCount: 167, isActive: true },
  { id: "sub-outdoor-sports-shoes", name: "Outdoor & Sports Shoes", parentId: "cat-activewear-sports", productCount: 120, isActive: true },

  { id: "cat-western-wear", name: COMMISSION_CATEGORY_RATES[7].category, parentId: null, productCount: 192, isActive: false },
  { id: "sub-dresses", name: "Dresses", parentId: "cat-western-wear", productCount: 110, isActive: false },
  { id: "sub-tops-tshirts", name: "Tops & T-Shirts", parentId: "cat-western-wear", productCount: 82, isActive: false },

  { id: "cat-lingerie-innerwear", name: COMMISSION_CATEGORY_RATES[6].category, parentId: null, productCount: 158, isActive: true },
  { id: "sub-bras", name: "Bras", parentId: "cat-lingerie-innerwear", productCount: 90, isActive: true },
  { id: "sub-nightwear", name: "Nightwear", parentId: "cat-lingerie-innerwear", productCount: 68, isActive: true },
];

/** Top-level categories expanded by default on first render, matching the two branches Figma
 * shows as "(parent, expanded)" — every other branch starts collapsed. */
export const DEFAULT_EXPANDED_CATEGORY_IDS: string[] = ["cat-womens-ethnic-wear", "cat-accessories"];

// ---------------------------------------------------------------------------
// "Reseller Program" settings (Figma "reseller program", node 1177:1184) — the eighth and final
// Settings sub-page: whether reseller registration/link tracking is active platform-wide, the
// per-category commission rates MIVYU pays resellers, the auto-assigned performance-tier ladder,
// and the eligibility/attribution/payout rules applied to every registered reseller. This is the
// configuration screen behind the read-only reseller data in `resellers.ts` (the "Re-seller" list
// and "Reseller Detail" screens) — see the standalone-mock notes below for how the two relate.
// ---------------------------------------------------------------------------

/** "Program Status" card (Figma node 1177:1363) — the master on/off switch for the whole reseller
 * program. Mirrors this file's other single-flag settings objects (e.g. `codAvailable` on
 * `PlatformConfigSettings`) rather than a bare boolean export, so `ResellerProgramStatusCard` can
 * follow the same draft-state Save pattern as every other card on this screen. */
export interface ResellerProgramStatusSettings {
  active: boolean;
}

export const RESELLER_PROGRAM_STATUS: ResellerProgramStatusSettings = { active: true };

/** "Category-wise Commission Rates" card (Figma node 1177:1389) — what MIVYU pays *resellers* per
 * category, explicitly called out in the Figma copy as separate from `COMMISSION_CATEGORY_RATES`
 * above (the vendor-side commission MIVYU charges *sellers*). The category taxonomy is close to
 * but not identical to that table's (e.g. "Women's Western" / "Activewear" here vs. "Western Wear"
 * / "Activewear & Sports" there) — kept as its own list since that's exactly what the Figma design
 * shows for this screen, rather than silently reconciling two independently-sourced category
 * labels. Standalone-mock note, matching this file's other tables: there's no backend joining this
 * back to `COMMISSION_CATEGORY_RATES` or to `resellers.ts`'s seeded `commissionEarned` figures. */
export interface ResellerCommissionRate {
  category: string;
  /** Whole-or-half-percent commission rate, e.g. `8` or `7.5`. */
  commissionPercent: number;
}

export const RESELLER_COMMISSION_RATES: ResellerCommissionRate[] = [
  { category: "Women's Ethnic Wear", commissionPercent: 8 },
  { category: "Women's Western", commissionPercent: 7.5 },
  { category: "Men's Casual Wear", commissionPercent: 6.5 },
  { category: "Footwear", commissionPercent: 5 },
  { category: "Accessories", commissionPercent: 6 },
  { category: "Kids' Wear", commissionPercent: 6 },
  { category: "Activewear", commissionPercent: 7 },
  { category: "Lingerie & Innerwear", commissionPercent: 5.5 },
];

/** "Performance Tiers" card (Figma node 1177:1470) — the read-only per-tier display (GMV range,
 * commission formula, benefits) shown above the two editable tier-boundary inputs below. Reuses
 * `ResellerTier` from `resellers.ts` so this screen's tier ladder and the Resellers list/detail
 * screens' `Reseller.tier` field stay the same three-value type. */
export interface ResellerPerformanceTierInfo {
  tier: ResellerTier;
  /** "Base" for Starter, "Bonus +0.5%" for Silver, "Bonus +1.5%" for Gold — matches the Figma
   * badge copy on each tier card exactly. */
  badgeLabel: string;
  gmvRangeLabel: string;
  commissionFormula: string;
  benefits: string[];
}

export const RESELLER_PERFORMANCE_TIER_INFO: ResellerPerformanceTierInfo[] = [
  {
    tier: "Starter",
    badgeLabel: "Base",
    gmvRangeLabel: "₹0 – ₹50,000 monthly GMV",
    commissionFormula: "Commission = base rate",
    benefits: ["Basic dashboard", "Standard support"],
  },
  {
    tier: "Silver",
    badgeLabel: "Bonus +0.5%",
    gmvRangeLabel: "₹50,000 – ₹2,00,000 monthly GMV",
    commissionFormula: "Commission = base + 0.5% bonus",
    benefits: ["Analytics access", "Priority support"],
  },
  {
    tier: "Gold",
    badgeLabel: "Bonus +1.5%",
    gmvRangeLabel: "₹2,00,000+ monthly GMV",
    commissionFormula: "Commission = base + 1.5% bonus",
    benefits: ["Dedicated support", "Featured reseller badge"],
  },
];

/** The two editable monthly-GMV cutoffs between tiers, in whole rupees (Figma's "Starter → Silver
 * boundary" / "Silver → Gold boundary" inputs: ₹50,000 and ₹2,00,000).
 *
 * Standalone-mock note: these intentionally do **not** match `resellers.ts`'s
 * `NEXT_TIER_THRESHOLD` export (₹1.00L / ₹3.00L / ₹5.00L "monthly performance" targets shown on
 * the Reseller Detail screen). Both figures are verified, genuine Figma content from their own
 * screens — this card's ₹50,000 / ₹2,00,000 boundaries were confirmed against a fresh screenshot
 * of node 1177:1184, not assumed — and, like `COMMISSION_CATEGORY_RATES` vs. `payments.ts`'s flat
 * 10% commission elsewhere in this file, there's no backend here to reconcile a forward-looking
 * admin-editable config screen with figures baked into a different, already-shipped screen's mock
 * data. Editing these boundaries does not rewrite `NEXT_TIER_THRESHOLD`. */
export interface ResellerTierBoundaries {
  starterToSilver: number;
  silverToGold: number;
}

export const RESELLER_TIER_BOUNDARIES: ResellerTierBoundaries = {
  starterToSilver: 50000,
  silverToGold: 200000,
};

/** "Payout cycle" dropdown options on the Program Rules card (Figma node 1177:1550). Only
 * "Monthly on 1st" is shown selected in the design; the other three options round out a plausible
 * cadence list the same way `SETTLEMENT_CYCLE_OPTIONS` does for vendor payouts above. */
export type ResellerPayoutCycle = "Weekly" | "Bi-weekly" | "Monthly on 1st" | "Monthly on 15th";
export const RESELLER_PAYOUT_CYCLE_OPTIONS: ResellerPayoutCycle[] = ["Weekly", "Bi-weekly", "Monthly on 1st", "Monthly on 15th"];

/** "Program Rules" card (Figma node 1177:1550) — eligibility, attribution, payout, and promotion
 * limits applied to every registered reseller. Standalone-mock note, matching this file's other
 * tables: not wired to `resellers.ts`'s seeded `activeLinks`/`commissionEarned` figures — editing
 * `maxLinksPerResellerPerDay` here doesn't retroactively cap any seeded reseller's `activeLinks`. */
export interface ResellerProgramRules {
  /** Whole hours after a click within which a sale is still credited to the reseller. */
  cookieDurationHours: number;
  /** Whole-rupee floor — orders below this value earn no reseller commission. */
  minimumOrderValueForCommission: number;
  /** Whole-rupee balance a reseller must accumulate before a payout is triggered. */
  minimumPayoutThreshold: number;
  payoutCycle: ResellerPayoutCycle;
  /** Blocks a reseller from earning commission on their own purchases. */
  selfPurchaseDetectionEnabled: boolean;
  /** Whole-count cap on affiliate links a single reseller can generate per day. */
  maxLinksPerResellerPerDay: number;
  /** When on, resellers can generate links for any active product; when off, vendors must opt in
   * per product. */
  allowPromoteAllProducts: boolean;
}

export const RESELLER_PROGRAM_RULES: ResellerProgramRules = {
  cookieDurationHours: 48,
  minimumOrderValueForCommission: 199,
  minimumPayoutThreshold: 500,
  payoutCycle: "Monthly on 1st",
  selfPurchaseDetectionEnabled: true,
  maxLinksPerResellerPerDay: 50,
  allowPromoteAllProducts: true,
};
