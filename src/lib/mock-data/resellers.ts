export type ResellerTier = "Starter" | "Silver" | "Gold";
export type ResellerStatus = "Active" | "Suspended" | "Pending";

export interface ResellerTopProduct {
  name: string;
  category: string;
  /** Path under /public — see public/assets/images/resellers/products for the originals, exported
   *  straight from the Figma "Reseller Detail" design (node 1177:817, "Top 5 performing
   *  products"). Only 5 distinct product photos exist, so every reseller's top-products list
   *  cycles the same 5 (same approach `avatarUrl` already uses for reseller photos). */
  imageUrl: string;
  clicks: number;
  /** Pre-formatted ₹ display value (Indian digit grouping). */
  sales: string;
  commissionEarned: string;
}

export type ResellerLinkStatus = "Active" | "Expired";

export interface ResellerLink {
  productName: string;
  linkGeneratedDate: string;
  clicks: number;
  orders: number;
  commissionEarned: string;
  status: ResellerLinkStatus;
}

export type TransactionStatus = "Settled" | "Pending" | "Cancelled";

export interface ResellerTransaction {
  orderId: string;
  productName: string;
  saleDate: string;
  saleAmount: string;
  commissionPercent: string;
  commissionEarned: string;
  status: TransactionStatus;
}

/** Everything the Reseller Detail screen (Figma node 1177:576, `/resellers/[slug]`) needs beyond
 *  the list-screen columns above: contact/store info, PAN & payout, tier progress, admin note, and
 *  the three content tables. Optional on `Reseller` (see `detail` below) because only Aarohi
 *  Mehta's is hand-authored from the design — every other row gets an equivalent object built by
 *  `getResellerDetail`. */
export interface ResellerDetailData {
  phone: string;
  location: string;
  storeUrl: string;
  bio: string;
  panNumberMasked: string;
  panVerified: boolean;
  payoutMethod: string;
  payoutNote: string;
  totalClicks: number;
  /** Pre-formatted "N.N%" string. */
  conversionRate: string;
  outstandingBalance: string;
  nextPayoutDate: string;
  monthlyPerformance: string;
  nextTierThreshold: string;
  adminNote: string;
  topProducts: ResellerTopProduct[];
  linkPerformance: ResellerLink[];
  transactions: ResellerTransaction[];
}

export interface Reseller {
  /** Kebab-case slug, generated the same way as `Vendor.slug` in `vendors.ts` — used for the
   *  `/resellers/[slug]` detail route (Figma "Reseller Detail", node 1177:576). */
  slug: string;
  name: string;
  email: string;
  /** Path under /public — see public/assets/images/resellers for the originals. Only 10 distinct
   *  photos were exported from the source design, so rows beyond the first 10 cycle through them
   *  (same approach as `INVENTORY_ITEMS` reusing its 8 exported product photos). */
  avatarUrl: string;
  tier: ResellerTier;
  /** Pre-formatted ₹ display value (Indian digit grouping), matching this file's other ₹ fields
   *  and the convention already used in `promotions.ts`/`analytics.ts`. */
  totalSalesGenerated: string;
  commissionEarned: string;
  activeLinks: number;
  joinedDate: string;
  status: ResellerStatus;
  /** Hand-authored Reseller Detail data verified against the Figma screenshot — only set for
   *  Aarohi Mehta (the row the design shows). Every other row falls back to `getResellerDetail`'s
   *  deterministic derivation below, so `/resellers/[slug]` has real, self-consistent content for
   *  all 24 rows without hand-typing 23 more detail blocks. */
  detail?: ResellerDetailData;
}

/**
 * 24 rows so the pagination footer below the table is genuinely functional instead of a
 * decorative single page (same reasoning as `INVENTORY_ITEMS`). The first 10 rows match the
 * Figma "re-seller" table exactly (same names/emails/tiers/figures/order); rows 11-24 are
 * additional realistic rows invented to fill out pages 2-3, cycling the same 10 avatar photos
 * under new reseller identities.
 */
export const RESELLERS: Reseller[] = [
  {
    slug: "aarohi-mehta",
    name: "Aarohi Mehta",
    email: "aarohi.mehta@mivyu.in",
    avatarUrl: "/assets/images/resellers/aarohi-mehta.jpg",
    tier: "Gold",
    totalSalesGenerated: "₹8,92,400",
    commissionEarned: "₹1,14,280",
    activeLinks: 46,
    joinedDate: "18 Feb 2025",
    status: "Active",
    detail: {
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      storeUrl: "mivyu.com/store/aarohimehta",
      bio: "Top-performing fashion reseller with strong repeat conversion across premium apparel links",
      panNumberMasked: "ABCDE****F",
      panVerified: true,
      payoutMethod: "HDFC Bank •••• 4821",
      payoutNote: "Primary settlement account on file",
      totalClicks: 28460,
      conversionRate: "6.8%",
      outstandingBalance: "₹18,420",
      nextPayoutDate: "14 Jun 2026",
      monthlyPerformance: "₹3.42L",
      nextTierThreshold: "₹5.00L / month",
      adminNote:
        "Top performer in premium women category. Monitor pending payout release after weekly settlement window.",
      topProducts: [
        {
          name: "Navy Satin Shirt",
          category: "Women / Premium tops",
          imageUrl: "/assets/images/resellers/products/navy-satin-shirt.jpg",
          clicks: 4820,
          sales: "₹2,16,300",
          commissionEarned: "₹28,119",
        },
        {
          name: "Blush Co-ord Set",
          category: "Women / Occasion wear",
          imageUrl: "/assets/images/resellers/products/blush-co-ord-set.jpg",
          clicks: 3970,
          sales: "₹1,88,600",
          commissionEarned: "₹24,518",
        },
        {
          name: "Charcoal Cargo Pants",
          category: "Men / Casual bottoms",
          imageUrl: "/assets/images/resellers/products/charcoal-cargo-pants.jpg",
          clicks: 3210,
          sales: "₹1,34,420",
          commissionEarned: "₹17,475",
        },
        {
          name: "Kids Cotton Set",
          category: "Kids / Everyday wear",
          imageUrl: "/assets/images/resellers/products/kids-cotton-set.jpg",
          clicks: 2940,
          sales: "₹92,850",
          commissionEarned: "₹12,071",
        },
        {
          name: "Ivory Linen Kurta",
          category: "Men / Festive edit",
          imageUrl: "/assets/images/resellers/products/ivory-linen-kurta.jpg",
          clicks: 2315,
          sales: "₹74,110",
          commissionEarned: "₹9,634",
        },
      ],
      linkPerformance: [
        { productName: "Navy Satin Shirt", linkGeneratedDate: "04 Jun 2026", clicks: 4820, orders: 146, commissionEarned: "₹28,119", status: "Active" },
        { productName: "Blush Co-ord Set", linkGeneratedDate: "29 May 2026", clicks: 3970, orders: 122, commissionEarned: "₹24,518", status: "Active" },
        { productName: "Ivory Linen Kurta", linkGeneratedDate: "11 Apr 2026", clicks: 2315, orders: 58, commissionEarned: "₹9,634", status: "Expired" },
      ],
      transactions: [
        { orderId: "#MVY-84291", productName: "Navy Satin Shirt", saleDate: "11 Jun 2026", saleAmount: "₹5,490", commissionPercent: "13%", commissionEarned: "₹714", status: "Settled" },
        { orderId: "#MVY-84134", productName: "Blush Co-ord Set", saleDate: "10 Jun 2026", saleAmount: "₹6,290", commissionPercent: "13%", commissionEarned: "₹817", status: "Pending" },
        { orderId: "#MVY-83612", productName: "Charcoal Cargo Pants", saleDate: "07 Jun 2026", saleAmount: "₹3,990", commissionPercent: "12%", commissionEarned: "₹479", status: "Cancelled" },
        { orderId: "#MVY-82908", productName: "Kids Cotton Set", saleDate: "03 Jun 2026", saleAmount: "₹2,890", commissionPercent: "13%", commissionEarned: "₹376", status: "Settled" },
      ],
    },
  },
  {
    slug: "jason-parker",
    name: "Jason Parker",
    email: "jason.parker@resellpro.co",
    avatarUrl: "/assets/images/resellers/jason-parker.jpg",
    tier: "Silver",
    totalSalesGenerated: "₹6,28,900",
    commissionEarned: "₹78,600",
    activeLinks: 34,
    joinedDate: "09 Jan 2025",
    status: "Active",
  },
  {
    slug: "mila-rossi",
    name: "Mila Rossi",
    email: "mila.rossi@trendlane.com",
    avatarUrl: "/assets/images/resellers/mila-rossi.jpg",
    tier: "Gold",
    totalSalesGenerated: "₹11,24,700",
    commissionEarned: "₹1,46,211",
    activeLinks: 58,
    joinedDate: "27 Mar 2025",
    status: "Active",
  },
  {
    slug: "rohan-bedi",
    name: "Rohan Bedi",
    email: "rohan.bedi@shopcircle.in",
    avatarUrl: "/assets/images/resellers/rohan-bedi.jpg",
    tier: "Starter",
    totalSalesGenerated: "₹1,76,200",
    commissionEarned: "₹18,500",
    activeLinks: 12,
    joinedDate: "12 May 2026",
    status: "Pending",
  },
  {
    slug: "camila-torres",
    name: "Camila Torres",
    email: "camila.torres@stylepath.io",
    avatarUrl: "/assets/images/resellers/camila-torres.jpg",
    tier: "Silver",
    totalSalesGenerated: "₹4,15,080",
    commissionEarned: "₹51,880",
    activeLinks: 24,
    joinedDate: "03 Nov 2025",
    status: "Suspended",
  },
  {
    slug: "omar-haddad",
    name: "Omar Haddad",
    email: "omar.haddad@marketgrid.me",
    avatarUrl: "/assets/images/resellers/omar-haddad.jpg",
    tier: "Starter",
    totalSalesGenerated: "₹2,08,340",
    commissionEarned: "₹24,900",
    activeLinks: 16,
    joinedDate: "21 Apr 2026",
    status: "Active",
  },
  {
    slug: "yuna-kim",
    name: "Yuna Kim",
    email: "yuna.kim@linkloom.co",
    avatarUrl: "/assets/images/resellers/yuna-kim.jpg",
    tier: "Gold",
    totalSalesGenerated: "₹9,64,550",
    commissionEarned: "₹1,21,604",
    activeLinks: 51,
    joinedDate: "30 Aug 2025",
    status: "Active",
  },
  {
    slug: "noah-fischer",
    name: "Noah Fischer",
    email: "noah.fischer@brandpilot.de",
    avatarUrl: "/assets/images/resellers/noah-fischer.jpg",
    tier: "Silver",
    totalSalesGenerated: "₹5,86,900",
    commissionEarned: "₹68,420",
    activeLinks: 29,
    joinedDate: "14 Dec 2025",
    status: "Suspended",
  },
  {
    slug: "anya-cruz",
    name: "Anya Cruz",
    email: "anya.cruz@affinityhub.com",
    avatarUrl: "/assets/images/resellers/anya-cruz.jpg",
    tier: "Starter",
    totalSalesGenerated: "₹1,12,300",
    commissionEarned: "₹12,970",
    activeLinks: 8,
    joinedDate: "08 Jun 2026",
    status: "Pending",
  },
  {
    slug: "david-mensah",
    name: "David Mensah",
    email: "david.mensah@scalechain.africa",
    avatarUrl: "/assets/images/resellers/david-mensah.jpg",
    tier: "Gold",
    totalSalesGenerated: "₹10,08,100",
    commissionEarned: "₹1,30,940",
    activeLinks: 62,
    joinedDate: "17 Jul 2025",
    status: "Active",
  },
  {
    slug: "priya-nandakumar",
    name: "Priya Nandakumar",
    email: "priya.nandakumar@shopwave.in",
    avatarUrl: "/assets/images/resellers/aarohi-mehta.jpg",
    tier: "Gold",
    totalSalesGenerated: "₹9,48,600",
    commissionEarned: "₹1,21,420",
    activeLinks: 49,
    joinedDate: "05 Sep 2025",
    status: "Active",
  },
  {
    slug: "liam-oconnor",
    name: "Liam O'Connor",
    email: "liam.oconnor@clicknearn.ie",
    avatarUrl: "/assets/images/resellers/jason-parker.jpg",
    tier: "Silver",
    totalSalesGenerated: "₹5,32,750",
    commissionEarned: "₹66,590",
    activeLinks: 27,
    joinedDate: "22 Oct 2025",
    status: "Active",
  },
  {
    slug: "sara-al-farsi",
    name: "Sara Al-Farsi",
    email: "sara.alfarsi@dealloop.ae",
    avatarUrl: "/assets/images/resellers/mila-rossi.jpg",
    tier: "Starter",
    totalSalesGenerated: "₹1,45,900",
    commissionEarned: "₹16,280",
    activeLinks: 9,
    joinedDate: "02 Jan 2026",
    status: "Pending",
  },
  {
    slug: "diego-fernandez",
    name: "Diego Fernandez",
    email: "diego.fernandez@promolink.mx",
    avatarUrl: "/assets/images/resellers/rohan-bedi.jpg",
    tier: "Gold",
    totalSalesGenerated: "₹10,76,300",
    commissionEarned: "₹1,38,140",
    activeLinks: 55,
    joinedDate: "19 Nov 2025",
    status: "Active",
  },
  {
    slug: "hana-suzuki",
    name: "Hana Suzuki",
    email: "hana.suzuki@linkbridge.jp",
    avatarUrl: "/assets/images/resellers/camila-torres.jpg",
    tier: "Silver",
    totalSalesGenerated: "₹4,64,200",
    commissionEarned: "₹57,940",
    activeLinks: 21,
    joinedDate: "27 Dec 2025",
    status: "Suspended",
  },
  {
    slug: "tariq-rahman",
    name: "Tariq Rahman",
    email: "tariq.rahman@affilihub.bd",
    avatarUrl: "/assets/images/resellers/omar-haddad.jpg",
    tier: "Starter",
    totalSalesGenerated: "₹1,29,450",
    commissionEarned: "₹14,760",
    activeLinks: 6,
    joinedDate: "11 Feb 2026",
    status: "Active",
  },
  {
    slug: "elena-petrova",
    name: "Elena Petrova",
    email: "elena.petrova@clickchain.ru",
    avatarUrl: "/assets/images/resellers/yuna-kim.jpg",
    tier: "Gold",
    totalSalesGenerated: "₹11,86,900",
    commissionEarned: "₹1,52,340",
    activeLinks: 64,
    joinedDate: "14 Jul 2025",
    status: "Active",
  },
  {
    slug: "marco-rossi",
    name: "Marco Rossi",
    email: "marco.rossi@salesnet.it",
    avatarUrl: "/assets/images/resellers/noah-fischer.jpg",
    tier: "Silver",
    totalSalesGenerated: "₹3,87,650",
    commissionEarned: "₹48,460",
    activeLinks: 19,
    joinedDate: "30 Mar 2026",
    status: "Pending",
  },
  {
    slug: "ngozi-eze",
    name: "Ngozi Eze",
    email: "ngozi.eze@growlink.ng",
    avatarUrl: "/assets/images/resellers/anya-cruz.jpg",
    tier: "Starter",
    totalSalesGenerated: "₹1,58,700",
    commissionEarned: "₹19,340",
    activeLinks: 11,
    joinedDate: "24 May 2025",
    status: "Active",
  },
  {
    slug: "chloe-martin",
    name: "Chloe Martin",
    email: "chloe.martin@refercircle.fr",
    avatarUrl: "/assets/images/resellers/david-mensah.jpg",
    tier: "Gold",
    totalSalesGenerated: "₹9,15,200",
    commissionEarned: "₹1,17,180",
    activeLinks: 42,
    joinedDate: "08 Aug 2025",
    status: "Suspended",
  },
  {
    slug: "arjun-malhotra",
    name: "Arjun Malhotra",
    email: "arjun.malhotra@boostpartner.in",
    avatarUrl: "/assets/images/resellers/aarohi-mehta.jpg",
    tier: "Silver",
    totalSalesGenerated: "₹5,05,600",
    commissionEarned: "₹63,200",
    activeLinks: 25,
    joinedDate: "16 Jan 2026",
    status: "Active",
  },
  {
    slug: "freya-andersen",
    name: "Freya Andersen",
    email: "freya.andersen@clickmate.no",
    avatarUrl: "/assets/images/resellers/jason-parker.jpg",
    tier: "Starter",
    totalSalesGenerated: "₹1,04,850",
    commissionEarned: "₹11,930",
    activeLinks: 5,
    joinedDate: "19 Jun 2026",
    status: "Pending",
  },
  {
    slug: "kwame-boateng",
    name: "Kwame Boateng",
    email: "kwame.boateng@partnerloop.gh",
    avatarUrl: "/assets/images/resellers/mila-rossi.jpg",
    tier: "Gold",
    totalSalesGenerated: "₹10,42,300",
    commissionEarned: "₹1,33,410",
    activeLinks: 57,
    joinedDate: "03 Mar 2025",
    status: "Active",
  },
  {
    slug: "isabela-costa",
    name: "Isabela Costa",
    email: "isabela.costa@sharehive.br",
    avatarUrl: "/assets/images/resellers/rohan-bedi.jpg",
    tier: "Silver",
    totalSalesGenerated: "₹4,89,750",
    commissionEarned: "₹61,010",
    activeLinks: 23,
    joinedDate: "26 Sep 2025",
    status: "Active",
  },
];

/** Header stat-tile figures — platform-wide aggregates, not derived from `RESELLERS` (that mock
 *  array only ships enough rows for a realistic paginated table, not the full 864-reseller base
 *  these totals describe). Matches the Figma "re-seller" design's three summary cards exactly. */
export const RESELLER_SUMMARY = {
  totalActiveResellers: "864",
  totalActiveResellersNote: "+42 verified this month",
  totalGmv: "₹48.6L",
  totalGmvNote: "Across tracked reseller links",
  totalCommissionPaidOut: "₹6.24L",
  totalCommissionNote: "Settled through affiliate payouts",
};

export const TIER_OPTIONS: ResellerTier[] = ["Starter", "Silver", "Gold"];

export const STATUS_OPTIONS: ResellerStatus[] = ["Active", "Suspended", "Pending"];

/** Pill-tab labels above the table. "Pending" tab reads "Pending Verification" per the Figma
 *  copy, even though the underlying status value is just "Pending" (matches `Reseller.status`). */
export const STATUS_TABS: Array<{ label: string; value: ResellerStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Active", value: "Active" },
  { label: "Suspended", value: "Suspended" },
  { label: "Pending Verification", value: "Pending" },
];

// ---------------------------------------------------------------------------
// Reseller Detail derivation (Figma "Reseller Detail", node 1177:576)
//
// Only Aarohi Mehta's `detail` above is hand-authored from the design. Every other row's detail
// page is built here — deterministically (no `Math.random`/`Date.now`, so server- and
// client-rendered output always match and there's no hydration mismatch) from that row's own
// list-screen figures (sales/commission/links/tier), so numbers stay internally consistent
// (e.g. a Starter reseller never gets Gold-sized stats) without hand-typing 23 more detail blocks.
// ---------------------------------------------------------------------------

const DETAIL_PRODUCT_POOL: Array<Pick<ResellerTopProduct, "name" | "category" | "imageUrl">> = [
  { name: "Navy Satin Shirt", category: "Women / Premium tops", imageUrl: "/assets/images/resellers/products/navy-satin-shirt.jpg" },
  { name: "Blush Co-ord Set", category: "Women / Occasion wear", imageUrl: "/assets/images/resellers/products/blush-co-ord-set.jpg" },
  { name: "Charcoal Cargo Pants", category: "Men / Casual bottoms", imageUrl: "/assets/images/resellers/products/charcoal-cargo-pants.jpg" },
  { name: "Kids Cotton Set", category: "Kids / Everyday wear", imageUrl: "/assets/images/resellers/products/kids-cotton-set.jpg" },
  { name: "Ivory Linen Kurta", category: "Men / Festive edit", imageUrl: "/assets/images/resellers/products/ivory-linen-kurta.jpg" },
];

const DETAIL_CITIES = [
  "Mumbai, Maharashtra",
  "Bengaluru, Karnataka",
  "Delhi, NCR",
  "Pune, Maharashtra",
  "Chennai, Tamil Nadu",
  "Hyderabad, Telangana",
  "Kolkata, West Bengal",
  "Jaipur, Rajasthan",
  "Ahmedabad, Gujarat",
  "Kochi, Kerala",
  "London, United Kingdom",
  "Dubai, UAE",
  "Toronto, Canada",
  "Singapore",
  "Lagos, Nigeria",
];

const DETAIL_BANKS = ["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra Bank", "Yes Bank"];

const DETAIL_PAYOUT_DATES = ["05 Jun 2026", "07 Jun 2026", "10 Jun 2026", "12 Jun 2026", "14 Jun 2026", "18 Jun 2026", "21 Jun 2026"];

const DETAIL_LINK_DATES = ["04 Jun 2026", "29 May 2026", "22 May 2026", "11 Apr 2026", "02 Apr 2026", "18 Mar 2026"];

const DETAIL_TRANSACTION_DATES = ["11 Jun 2026", "10 Jun 2026", "07 Jun 2026", "03 Jun 2026", "29 May 2026", "24 May 2026"];

const DETAIL_TRANSACTION_STATUSES: TransactionStatus[] = ["Settled", "Pending", "Cancelled", "Settled"];

/** Monthly commission a reseller needs to reach/hold each tier. Exported so
 *  `ResellerDetailPerformanceSummaryCard` can look up the threshold for whatever tier is
 *  currently selected (which can change locally via the header's "Update Tier" control) instead of
 *  only the tier baked into `ResellerDetailData.nextTierThreshold` at load time. */
export const NEXT_TIER_THRESHOLD: Record<ResellerTier, string> = {
  Starter: "₹1.00L / month",
  Silver: "₹3.00L / month",
  Gold: "₹5.00L / month",
};

/** Small deterministic string hash (no crypto needed) used to vary derived figures per reseller
 *  without `Math.random` — same input always produces the same output on server and client. */
function seedFromSlug(slug: string): number {
  let hash = 0;
  for (let index = 0; index < slug.length; index += 1) {
    hash = (hash * 31 + slug.charCodeAt(index)) >>> 0;
  }
  return hash;
}

/** Parses a pre-formatted `"₹8,92,400"`-style string back to a plain number — used by
 *  `ResellerDetailStatsGrid` to render `Reseller.totalSalesGenerated`/`commissionEarned` in the
 *  Overview tab's compact-lakh stat tiles (e.g. `"₹8.92L"`) without duplicating those totals as
 *  separate fields on `ResellerDetailData`. */
export function parseINR(formatted: string): number {
  return Number(formatted.replace(/[^0-9]/g, ""));
}

function groupIndian(digits: string): string {
  if (digits.length <= 2) return digits;
  const groups: string[] = [];
  let end = digits.length;
  while (end > 2) {
    groups.unshift(digits.slice(end - 2, end));
    end -= 2;
  }
  groups.unshift(digits.slice(0, end));
  return groups.join(",");
}

/** Formats a plain count with Indian digit grouping, e.g. `28460` -> `"28,460"` — used for the
 *  Overview tab's "Total Clicks" stat tile, which (unlike this file's other figures) isn't a ₹
 *  amount. */
export function formatIndianCount(amount: number): string {
  const rounded = Math.max(0, Math.round(amount));
  const str = String(rounded);
  return str.length <= 3 ? str : `${groupIndian(str.slice(0, -3))},${str.slice(-3)}`;
}

/** Formats a whole-rupee amount with Indian digit grouping, e.g. `892400` -> `"₹8,92,400"`. */
function formatINR(amount: number): string {
  const rounded = Math.max(0, Math.round(amount));
  const str = String(rounded);
  if (str.length <= 3) return `₹${str}`;
  return `₹${groupIndian(str.slice(0, -3))},${str.slice(-3)}`;
}

/** Formats a whole-rupee amount in compact lakh form, e.g. `892400` -> `"₹8.92L"` — exported for
 *  `ResellerDetailStatsGrid`'s "Total Sales Generated (₹)" / "Total Commission Earned (₹)" tiles. */
export function formatLakh(amount: number): string {
  return `₹${(amount / 100000).toFixed(2)}L`;
}

function buildResellerDetail(reseller: Reseller, index: number): ResellerDetailData {
  const seed = seedFromSlug(reseller.slug);
  const sales = parseINR(reseller.totalSalesGenerated);
  const commission = parseINR(reseller.commissionEarned);

  const totalClicks = reseller.activeLinks * (520 + (seed % 260));
  const conversionRate = `${(4 + ((seed >> 3) % 35) / 10).toFixed(1)}%`;
  const outstandingBalance = formatINR(commission * (0.12 + ((seed >> 5) % 10) / 100));
  const nextPayoutDate = DETAIL_PAYOUT_DATES[seed % DETAIL_PAYOUT_DATES.length];
  const monthlyPerformance = formatLakh(commission * (2.4 + ((seed >> 7) % 10) / 10));

  const panLetters = (reseller.name.match(/[A-Za-z]/g) ?? ["A", "B", "C", "D", "E"]).slice(0, 5);
  while (panLetters.length < 5) panLetters.push("X");
  const panDigit = (seed % 9) + 1;
  const panNumberMasked = `${panLetters.join("").toUpperCase()}****${panDigit}`;

  const bank = DETAIL_BANKS[seed % DETAIL_BANKS.length];
  const accountLast4 = String(1000 + (seed % 9000));
  const phoneDigits = String(10000 + (seed % 89999)).padStart(5, "0");
  const phonePrefix = String(70000 + ((seed >> 2) % 29999)).padStart(5, "0");

  const productOffset = index % DETAIL_PRODUCT_POOL.length;
  const orderedProducts = [...DETAIL_PRODUCT_POOL.slice(productOffset), ...DETAIL_PRODUCT_POOL.slice(0, productOffset)];
  const productShares = [0.34, 0.27, 0.19, 0.12, 0.08];

  const topProducts: ResellerTopProduct[] = orderedProducts.map((product, productIndex) => {
    const productSales = sales * productShares[productIndex];
    const productCommission = commission * productShares[productIndex];
    return {
      ...product,
      clicks: Math.max(40, Math.round((totalClicks * productShares[productIndex]) / 6)),
      sales: formatINR(productSales),
      commissionEarned: formatINR(productCommission),
    };
  });

  const linkPerformance: ResellerLink[] = topProducts.slice(0, 3).map((product, linkIndex) => ({
    productName: product.name,
    linkGeneratedDate: DETAIL_LINK_DATES[(seed + linkIndex) % DETAIL_LINK_DATES.length],
    clicks: product.clicks,
    orders: Math.max(4, Math.round(product.clicks / 32)),
    commissionEarned: product.commissionEarned,
    status: linkIndex === 2 ? "Expired" : "Active",
  }));

  const transactions: ResellerTransaction[] = topProducts.slice(0, 4).map((product, transactionIndex) => {
    const orderAmount = Math.max(900, Math.round(sales / 160) + ((seed >> transactionIndex) % 4000));
    const commissionPercent = 12 + ((seed >> transactionIndex) % 3);
    return {
      orderId: `#MVY-${(80000 + ((seed + transactionIndex * 733) % 9999)).toString()}`,
      productName: product.name,
      saleDate: DETAIL_TRANSACTION_DATES[(seed + transactionIndex) % DETAIL_TRANSACTION_DATES.length],
      saleAmount: formatINR(orderAmount),
      commissionPercent: `${commissionPercent}%`,
      commissionEarned: formatINR((orderAmount * commissionPercent) / 100),
      status: DETAIL_TRANSACTION_STATUSES[transactionIndex],
    };
  });

  return {
    phone: `+91 ${phonePrefix.slice(0, 5)} ${phoneDigits.slice(0, 5)}`,
    location: DETAIL_CITIES[seed % DETAIL_CITIES.length],
    storeUrl: `mivyu.com/store/${reseller.slug.replace(/-/g, "")}`,
    bio: `Consistent ${reseller.tier.toLowerCase()}-tier reseller driving repeat conversion across tracked product links`,
    panNumberMasked,
    panVerified: reseller.status !== "Pending",
    payoutMethod: `${bank} •••• ${accountLast4}`,
    payoutNote: "Primary settlement account on file",
    totalClicks,
    conversionRate,
    outstandingBalance,
    nextPayoutDate,
    monthlyPerformance,
    nextTierThreshold: NEXT_TIER_THRESHOLD[reseller.tier],
    adminNote: `${reseller.tier} tier reseller with ${reseller.activeLinks} active tracked links. No escalations on file.`,
    topProducts,
    linkPerformance,
    transactions,
  };
}

/** Returns the Reseller Detail screen's data for a reseller — the hand-authored `detail` when
 *  present (Aarohi Mehta), otherwise a deterministic derivation (see `buildResellerDetail`). */
export function getResellerDetail(reseller: Reseller): ResellerDetailData {
  if (reseller.detail) return reseller.detail;
  const index = RESELLERS.findIndex((candidate) => candidate.slug === reseller.slug);
  return buildResellerDetail(reseller, index === -1 ? 0 : index);
}
