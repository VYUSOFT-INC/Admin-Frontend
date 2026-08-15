export type ReviewStatus = "Approved" | "Pending" | "Flagged" | "Removed";

export const REVIEW_STATUSES: ReviewStatus[] = ["Approved", "Pending", "Flagged", "Removed"];

/** "5 Stars" / "4 Stars" / ... filter option strings — the leading digit is parsed back out to
 *  compare against `Review.rating` (see `ReviewsFiltersBar`'s `matchesRating` logic). */
export const RATING_FILTER_OPTIONS = ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"] as const;
export type RatingFilterOption = (typeof RATING_FILTER_OPTIONS)[number];

export const REVIEW_DATE_RANGE_OPTIONS = ["Last 7 Days", "Last 30 Days", "Last 90 Days"] as const;
export type ReviewDateRangeOption = (typeof REVIEW_DATE_RANGE_OPTIONS)[number];

export interface Review {
  id: string;
  productName: string;
  vendorName: string;
  /** Path under /public — reuses the Inventory screen's product photography (see
   *  `public/assets/images/inventory`) since the Figma "reviews moderation" design's first 8
   *  rows are the exact same products/vendors as the Inventory Overview table's first 8 rows. */
  imageUrl: string;
  /** Masked per the Figma design, e.g. "A***v S." — customer identity is redacted in the queue. */
  customerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  reviewText: string;
  /** Display string matching the Figma copy, e.g. "12 Jun 2026". */
  submittedDate: string;
  /** ISO date used for the "Last 7/30/90 Days" filter's real date-math (see `ReviewsFiltersBar`),
   *  same convention as `DATE_RANGE_DAYS` on the Returns screen. */
  submittedAt: string;
  status: ReviewStatus;
}

/**
 * 24 rows (3 pages of 8) so the pagination footer is genuinely functional instead of a
 * decorative single page — same convention as `INVENTORY_ITEMS`. The first 8 rows match the
 * Figma "Review Queue" table exactly (same products/vendors/ratings/copy/status); rows 9-24 are
 * additional realistic rows invented to fill out pages 2-3, cycling the same 8 product photos
 * under new product names and progressively older dates.
 *
 * There is no "View Product" / "View Vendor" deep-link on this screen — verified via
 * `get_design_context` on the Figma "Data" product cell (node 1143:1272), which renders as a
 * plain, non-interactive `<div>` (no anchor, no link hint), and the Action column is already
 * fully occupied by up to 3 moderation buttons. So unlike `InventoryItem`, `Review` has no
 * `productId` fallback-link field — there's nothing here that should link anywhere.
 */
export const REVIEWS: Review[] = [
  {
    id: "silk-embroidered-saree-1",
    productName: "Silk Embroidered Saree",
    vendorName: "Fusia Kollection",
    imageUrl: "/assets/images/inventory/inventory-1-silk-saree.jpg",
    customerName: "A***v S.",
    rating: 5,
    reviewText: "Beautiful fabric quality and the zari work looks even better in person.",
    submittedDate: "12 Jun 2026",
    submittedAt: "2026-06-12",
    status: "Approved",
  },
  {
    id: "tailored-linen-shirt-1",
    productName: "Tailored Linen Shirt",
    vendorName: "Trend Co.",
    imageUrl: "/assets/images/inventory/inventory-4-linen-shirt.jpg",
    customerName: "N***a R.",
    rating: 3,
    reviewText: "Fit is decent but the fabric wrinkles quickly after a few hours.",
    submittedDate: "11 Jun 2026",
    submittedAt: "2026-06-11",
    status: "Pending",
  },
  {
    id: "ayurvedic-glow-face-oil-1",
    productName: "Ayurvedic Glow Face Oil",
    vendorName: "Bloom Cart",
    imageUrl: "/assets/images/inventory/inventory-3-face-oil.jpg",
    customerName: "R***n K.",
    rating: 1,
    reviewText: "Contains inappropriate language and unrelated promotional content.",
    submittedDate: "10 Jun 2026",
    submittedAt: "2026-06-10",
    status: "Flagged",
  },
  {
    id: "terracotta-planter-set-1",
    productName: "Terracotta Planter Set",
    vendorName: "Kochi Krafts",
    imageUrl: "/assets/images/inventory/inventory-5-planter-set.jpg",
    customerName: "P***i M.",
    rating: 4,
    reviewText: "Looks handmade and premium, but delivery packaging could be improved slightly.",
    submittedDate: "09 Jun 2026",
    submittedAt: "2026-06-09",
    status: "Approved",
  },
  {
    id: "beaded-occasion-clutch-1",
    productName: "Beaded Occasion Clutch",
    vendorName: "Nexa Collective Accessories House",
    imageUrl: "/assets/images/inventory/inventory-6-clutch.jpg",
    customerName: "S***a P.",
    rating: 3,
    reviewText: "Pretty design, but I expected slightly heavier beadwork on the front panel.",
    submittedDate: "08 Jun 2026",
    submittedAt: "2026-06-08",
    status: "Pending",
  },
  {
    id: "brass-temple-bell-decor-1",
    productName: "Brass Temple Bell Decor",
    vendorName: "Harbor Blend Collective",
    imageUrl: "/assets/images/inventory/inventory-7-temple-bell.jpg",
    customerName: "K***n D.",
    rating: 5,
    reviewText: "Excellent finish and the sound is lovely. Great for festive decor and gifting.",
    submittedDate: "08 Jun 2026",
    submittedAt: "2026-06-08",
    status: "Approved",
  },
  {
    id: "printed-co-ord-set-1",
    productName: "Printed Co-ord Set",
    vendorName: "Urban Weave House",
    imageUrl: "/assets/images/inventory/inventory-8-coord-set.jpg",
    customerName: "D***a T.",
    rating: 2,
    reviewText: "Received a different shade than expected and sizing felt inconsistent.",
    submittedDate: "07 Jun 2026",
    submittedAt: "2026-06-07",
    status: "Pending",
  },
  {
    id: "handwoven-cane-pendant-lamp-1",
    productName: "Handwoven Cane Pendant Lamp",
    vendorName: "Harbor Blend Collective",
    imageUrl: "/assets/images/inventory/inventory-2-cane-lamp.jpg",
    customerName: "T***a J.",
    rating: 4,
    reviewText: "Very stylish piece. Installation took time, but the final look is worth it.",
    submittedDate: "06 Jun 2026",
    submittedAt: "2026-06-06",
    status: "Removed",
  },
  // Page 2-3: additional invented rows, cycling the same 8 product photos with new names/vendors.
  {
    id: "chanderi-silk-dupatta-1",
    productName: "Chanderi Silk Dupatta",
    vendorName: "Fusia Kollection",
    imageUrl: "/assets/images/inventory/inventory-1-silk-saree.jpg",
    customerName: "M***h V.",
    rating: 5,
    reviewText: "Lightweight and drapes beautifully — colors match the listing photos exactly.",
    submittedDate: "04 Jun 2026",
    submittedAt: "2026-06-04",
    status: "Approved",
  },
  {
    id: "rattan-wall-mirror-1",
    productName: "Rattan Wall Mirror",
    vendorName: "Harbor Blend Collective",
    imageUrl: "/assets/images/inventory/inventory-2-cane-lamp.jpg",
    customerName: "J***a K.",
    rating: 2,
    reviewText: "Arrived with a small crack near the frame edge — packaging wasn't sturdy enough.",
    submittedDate: "03 Jun 2026",
    submittedAt: "2026-06-03",
    status: "Pending",
  },
  {
    id: "organic-turmeric-face-pack-1",
    productName: "Organic Turmeric Face Pack",
    vendorName: "Bloom Cart",
    imageUrl: "/assets/images/inventory/inventory-3-face-oil.jpg",
    customerName: "R***a S.",
    rating: 4,
    reviewText: "Skin felt noticeably brighter after a week of use. Packaging could seal better.",
    submittedDate: "02 Jun 2026",
    submittedAt: "2026-06-02",
    status: "Approved",
  },
  {
    id: "linen-blend-trousers-1",
    productName: "Linen Blend Trousers",
    vendorName: "Trend Co.",
    imageUrl: "/assets/images/inventory/inventory-4-linen-shirt.jpg",
    customerName: "V***k P.",
    rating: 1,
    reviewText: "Free promo code for followers — DM me for a discount!! Clearly spam, not a review.",
    submittedDate: "01 Jun 2026",
    submittedAt: "2026-06-01",
    status: "Flagged",
  },
  {
    id: "hand-painted-ceramic-vase-1",
    productName: "Hand-Painted Ceramic Vase",
    vendorName: "Kochi Krafts",
    imageUrl: "/assets/images/inventory/inventory-5-planter-set.jpg",
    customerName: "A***i N.",
    rating: 5,
    reviewText: "Stunning craftsmanship, exactly like the photos. Arrived well packed too.",
    submittedDate: "30 May 2026",
    submittedAt: "2026-05-30",
    status: "Approved",
  },
  {
    id: "embellished-potli-bag-1",
    productName: "Embellished Potli Bag",
    vendorName: "Nexa Collective Accessories House",
    imageUrl: "/assets/images/inventory/inventory-6-clutch.jpg",
    customerName: "S***i R.",
    rating: 3,
    reviewText: "Cute size for evening wear, but the drawstring feels a little flimsy.",
    submittedDate: "28 May 2026",
    submittedAt: "2026-05-28",
    status: "Pending",
  },
  {
    id: "brass-diya-set-1",
    productName: "Brass Diya Set",
    vendorName: "Kochi Krafts",
    imageUrl: "/assets/images/inventory/inventory-7-temple-bell.jpg",
    customerName: "H***h M.",
    rating: 5,
    reviewText: "Beautifully finished set, perfect for Diwali gifting. Would order again.",
    submittedDate: "26 May 2026",
    submittedAt: "2026-05-26",
    status: "Approved",
  },
  {
    id: "printed-cotton-kurta-set-1",
    productName: "Printed Cotton Kurta Set",
    vendorName: "Urban Weave House",
    imageUrl: "/assets/images/inventory/inventory-8-coord-set.jpg",
    customerName: "P***a D.",
    rating: 4,
    reviewText: "Comfortable fabric and true to size. Print faded slightly after the first wash.",
    submittedDate: "24 May 2026",
    submittedAt: "2026-05-24",
    status: "Approved",
  },
  {
    id: "rose-clay-face-mask-1",
    productName: "Rose Clay Face Mask",
    vendorName: "Bloom Cart",
    imageUrl: "/assets/images/inventory/inventory-3-face-oil.jpg",
    customerName: "K***a B.",
    rating: 2,
    reviewText: "Dried out my skin more than expected — wish the ingredients were listed clearer.",
    submittedDate: "20 May 2026",
    submittedAt: "2026-05-20",
    status: "Removed",
  },
  {
    id: "checked-flannel-shirt-1",
    productName: "Checked Flannel Shirt",
    vendorName: "Trend Co.",
    imageUrl: "/assets/images/inventory/inventory-4-linen-shirt.jpg",
    customerName: "G***v T.",
    rating: 5,
    reviewText: "Warm, well-stitched, and the check pattern lines up perfectly at the seams.",
    submittedDate: "18 May 2026",
    submittedAt: "2026-05-18",
    status: "Approved",
  },
  {
    id: "cane-storage-basket-1",
    productName: "Cane Storage Basket",
    vendorName: "Harbor Blend Collective",
    imageUrl: "/assets/images/inventory/inventory-2-cane-lamp.jpg",
    customerName: "L***a F.",
    rating: 3,
    reviewText: "Sturdy enough for light storage, though the weave is looser than pictured.",
    submittedDate: "15 May 2026",
    submittedAt: "2026-05-15",
    status: "Pending",
  },
  {
    id: "sequin-evening-clutch-1",
    productName: "Sequin Evening Clutch",
    vendorName: "Nexa Collective Accessories House",
    imageUrl: "/assets/images/inventory/inventory-6-clutch.jpg",
    customerName: "I***a W.",
    rating: 5,
    reviewText: "Eye-catching and compact — got compliments the first time I carried it out.",
    submittedDate: "12 May 2026",
    submittedAt: "2026-05-12",
    status: "Approved",
  },
  {
    id: "terracotta-wind-chime-1",
    productName: "Terracotta Wind Chime",
    vendorName: "Kochi Krafts",
    imageUrl: "/assets/images/inventory/inventory-5-planter-set.jpg",
    customerName: "O***r C.",
    rating: 1,
    reviewText: "Two pieces arrived shattered. Vendor needs to fix their packaging urgently.",
    submittedDate: "09 May 2026",
    submittedAt: "2026-05-09",
    status: "Flagged",
  },
  {
    id: "printed-satin-co-ord-1",
    productName: "Printed Satin Co-ord",
    vendorName: "Urban Weave House",
    imageUrl: "/assets/images/inventory/inventory-8-coord-set.jpg",
    customerName: "E***n H.",
    rating: 4,
    reviewText: "Great drape and finish for the price point. Runs slightly large at the waist.",
    submittedDate: "05 May 2026",
    submittedAt: "2026-05-05",
    status: "Approved",
  },
  {
    id: "cotton-yoga-mat-bag-1",
    productName: "Cotton Yoga Mat Bag",
    vendorName: "Zenmat Studio",
    imageUrl: "/assets/images/inventory/inventory-6-clutch.jpg",
    customerName: "C***e L.",
    rating: 3,
    reviewText: "Does the job, but the strap could be padded better for longer walks to class.",
    submittedDate: "01 May 2026",
    submittedAt: "2026-05-01",
    status: "Pending",
  },
  {
    id: "banarasi-silk-blouse-1",
    productName: "Banarasi Silk Blouse",
    vendorName: "Fusia Kollection",
    imageUrl: "/assets/images/inventory/inventory-1-silk-saree.jpg",
    customerName: "N***i J.",
    rating: 5,
    reviewText: "The zari border is even richer in person, and it paired perfectly with my saree.",
    submittedDate: "28 Apr 2026",
    submittedAt: "2026-04-28",
    status: "Approved",
  },
];

/** Static header figures matching the Figma "Reviews Moderation" stat cards — these represent
 *  the full production review corpus, not just the 24-row `REVIEWS` mock sample used to
 *  populate the queue table below them (same convention as `INVENTORY_SUMMARY`). */
export const REVIEW_SUMMARY = {
  avgPlatformRating: 4.4,
  totalReviews: 18246,
  pendingModeration: 84,
};

/** Derived from the mock dataset so the "Product" filter never lists an option with zero matches. */
export const REVIEW_PRODUCT_OPTIONS: string[] = Array.from(new Set(REVIEWS.map((review) => review.productName))).sort();
