import type { VendorType } from "@/lib/mock-data/vendors";

export type StockStatus = "Healthy" | "Low Stock" | "Out of Stock";

/** Rows at or below this stock level are "Low Stock" (0 units is "Out of Stock" instead). Matches
 *  the Figma "Low Stock SKUs" stat card copy: "Below 20 units". */
export const LOW_STOCK_MAX = 20;

export interface InventoryItem {
  id: string;
  productName: string;
  sku: string;
  /** Path under /public — see public/assets/images/inventory for the originals. */
  imageUrl: string;
  vendorName: string;
  vendorType: VendorType;
  category: string;
  currentStock: number;
  stockStatus: StockStatus;
  /** Display string for the "Last Updated" column, e.g. "Today, 10:42 AM" / "Yesterday" / "2 days ago". */
  lastUpdated: string;
  /** Slug into `PRODUCTS` (see `src/lib/mock-data/products.ts`) when this row also has a full
   *  Product Review record — used to deep-link the "View Product" action. Falls back to the
   *  `/products` catalog list when absent, so the link always goes somewhere real. */
  productId?: string;
}

/**
 * 24 rows (3 pages of 8) so the pagination footer below the table is genuinely functional
 * instead of a decorative single page. The first 8 rows match the Figma "Inventory Overview"
 * table exactly (same products/vendors/stock figures); rows 9-24 are additional realistic
 * rows invented to fill out pages 2-3, cycling the same 8 product photos (only 8 were
 * exported from the source design) under new product names.
 */
export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "silk-embroidered-saree",
    productName: "Silk Embroidered Saree",
    sku: "MV-SAR-2198",
    imageUrl: "/assets/images/inventory/inventory-1-silk-saree.jpg",
    vendorName: "Fusia Kollection",
    vendorType: "Online Seller",
    category: "Women Ethnic",
    currentStock: 164,
    stockStatus: "Healthy",
    lastUpdated: "Today, 10:42 AM",
    productId: "banarasi-silk-saree",
  },
  {
    id: "handwoven-cane-pendant-lamp",
    productName: "Handwoven Cane Pendant Lamp",
    sku: "MV-HOM-4421",
    imageUrl: "/assets/images/inventory/inventory-2-cane-lamp.jpg",
    vendorName: "Harbor Blend Collective",
    vendorType: "Physical Store",
    category: "Home Décor",
    currentStock: 18,
    stockStatus: "Low Stock",
    lastUpdated: "Today, 9:18 AM",
  },
  {
    id: "ayurvedic-glow-face-oil",
    productName: "Ayurvedic Glow Face Oil",
    sku: "MV-BEA-1307",
    imageUrl: "/assets/images/inventory/inventory-3-face-oil.jpg",
    vendorName: "Bloom Cart",
    vendorType: "Online Seller",
    category: "Beauty",
    currentStock: 0,
    stockStatus: "Out of Stock",
    lastUpdated: "Yesterday",
  },
  {
    id: "tailored-linen-shirt-inv",
    productName: "Tailored Linen Shirt",
    sku: "MV-MEN-7710",
    imageUrl: "/assets/images/inventory/inventory-4-linen-shirt.jpg",
    vendorName: "Trend Co.",
    vendorType: "Online Seller",
    category: "Menswear",
    currentStock: 57,
    stockStatus: "Healthy",
    lastUpdated: "Today, 11:06 AM",
  },
  {
    id: "terracotta-planter-set",
    productName: "Terracotta Planter Set",
    sku: "MV-HOM-3904",
    imageUrl: "/assets/images/inventory/inventory-5-planter-set.jpg",
    vendorName: "Kochi Krafts",
    vendorType: "Physical Store",
    category: "Home Décor",
    currentStock: 12,
    stockStatus: "Low Stock",
    lastUpdated: "Today, 8:27 AM",
  },
  {
    id: "beaded-occasion-clutch",
    productName: "Beaded Occasion Clutch",
    sku: "MV-ACC-1045",
    imageUrl: "/assets/images/inventory/inventory-6-clutch.jpg",
    vendorName: "Nexa Collective Accessories House",
    vendorType: "Online Seller",
    category: "Accessories",
    currentStock: 7,
    stockStatus: "Low Stock",
    lastUpdated: "Today, 7:54 AM",
  },
  {
    id: "brass-temple-bell-decor",
    productName: "Brass Temple Bell Decor",
    sku: "MV-DEC-8834",
    imageUrl: "/assets/images/inventory/inventory-7-temple-bell.jpg",
    vendorName: "Harbor Blend Collective",
    vendorType: "Physical Store",
    category: "Home Décor",
    currentStock: 0,
    stockStatus: "Out of Stock",
    lastUpdated: "2 days ago",
  },
  {
    id: "printed-co-ord-set",
    productName: "Printed Co-ord Set",
    sku: "MV-WEA-2250",
    imageUrl: "/assets/images/inventory/inventory-8-coord-set.jpg",
    vendorName: "Urban Weave House",
    vendorType: "Physical Store",
    category: "Women Ethnic",
    currentStock: 89,
    stockStatus: "Healthy",
    lastUpdated: "Today, 12:05 PM",
  },
  {
    id: "cotton-yoga-mat-bag",
    productName: "Cotton Yoga Mat Bag",
    sku: "MV-ACC-3312",
    imageUrl: "/assets/images/inventory/inventory-6-clutch.jpg",
    vendorName: "Zenmat Studio",
    vendorType: "Online Seller",
    category: "Accessories",
    currentStock: 132,
    stockStatus: "Healthy",
    lastUpdated: "Today, 9:40 AM",
  },
  {
    id: "hand-painted-ceramic-vase",
    productName: "Hand-Painted Ceramic Vase",
    sku: "MV-HOM-5521",
    imageUrl: "/assets/images/inventory/inventory-5-planter-set.jpg",
    vendorName: "Kochi Krafts",
    vendorType: "Physical Store",
    category: "Home Décor",
    currentStock: 44,
    stockStatus: "Healthy",
    lastUpdated: "Today, 8:02 AM",
  },
  {
    id: "organic-turmeric-face-pack",
    productName: "Organic Turmeric Face Pack",
    sku: "MV-BEA-2280",
    imageUrl: "/assets/images/inventory/inventory-3-face-oil.jpg",
    vendorName: "Bloom Cart",
    vendorType: "Online Seller",
    category: "Beauty",
    currentStock: 16,
    stockStatus: "Low Stock",
    lastUpdated: "Today, 7:15 AM",
  },
  {
    id: "linen-blend-trousers",
    productName: "Linen Blend Trousers",
    sku: "MV-MEN-8801",
    imageUrl: "/assets/images/inventory/inventory-4-linen-shirt.jpg",
    vendorName: "Trend Co.",
    vendorType: "Online Seller",
    category: "Menswear",
    currentStock: 63,
    stockStatus: "Healthy",
    lastUpdated: "Today, 10:58 AM",
  },
  {
    id: "rattan-wall-mirror",
    productName: "Rattan Wall Mirror",
    sku: "MV-HOM-6620",
    imageUrl: "/assets/images/inventory/inventory-2-cane-lamp.jpg",
    vendorName: "Harbor Blend Collective",
    vendorType: "Physical Store",
    category: "Home Décor",
    currentStock: 0,
    stockStatus: "Out of Stock",
    lastUpdated: "3 days ago",
  },
  {
    id: "embellished-potli-bag",
    productName: "Embellished Potli Bag",
    sku: "MV-ACC-4470",
    imageUrl: "/assets/images/inventory/inventory-6-clutch.jpg",
    vendorName: "Nexa Collective Accessories House",
    vendorType: "Online Seller",
    category: "Accessories",
    currentStock: 9,
    stockStatus: "Low Stock",
    lastUpdated: "Today, 6:48 AM",
  },
  {
    id: "chanderi-silk-dupatta",
    productName: "Chanderi Silk Dupatta",
    sku: "MV-SAR-3319",
    imageUrl: "/assets/images/inventory/inventory-1-silk-saree.jpg",
    vendorName: "Fusia Kollection",
    vendorType: "Online Seller",
    category: "Women Ethnic",
    currentStock: 71,
    stockStatus: "Healthy",
    lastUpdated: "Today, 9:59 AM",
  },
  {
    id: "brass-diya-set",
    productName: "Brass Diya Set",
    sku: "MV-DEC-9012",
    imageUrl: "/assets/images/inventory/inventory-7-temple-bell.jpg",
    vendorName: "Kochi Krafts",
    vendorType: "Physical Store",
    category: "Home Décor",
    currentStock: 5,
    stockStatus: "Low Stock",
    lastUpdated: "Yesterday",
  },
  {
    id: "printed-cotton-kurta-set",
    productName: "Printed Cotton Kurta Set",
    sku: "MV-WEA-3390",
    imageUrl: "/assets/images/inventory/inventory-8-coord-set.jpg",
    vendorName: "Urban Weave House",
    vendorType: "Physical Store",
    category: "Women Ethnic",
    currentStock: 27,
    stockStatus: "Healthy",
    lastUpdated: "Today, 11:30 AM",
  },
  {
    id: "rose-clay-face-mask",
    productName: "Rose Clay Face Mask",
    sku: "MV-BEA-3391",
    imageUrl: "/assets/images/inventory/inventory-3-face-oil.jpg",
    vendorName: "Bloom Cart",
    vendorType: "Online Seller",
    category: "Beauty",
    currentStock: 0,
    stockStatus: "Out of Stock",
    lastUpdated: "4 days ago",
  },
  {
    id: "checked-flannel-shirt",
    productName: "Checked Flannel Shirt",
    sku: "MV-MEN-9910",
    imageUrl: "/assets/images/inventory/inventory-4-linen-shirt.jpg",
    vendorName: "Trend Co.",
    vendorType: "Online Seller",
    category: "Menswear",
    currentStock: 48,
    stockStatus: "Healthy",
    lastUpdated: "Today, 8:20 AM",
  },
  {
    id: "cane-storage-basket",
    productName: "Cane Storage Basket",
    sku: "MV-HOM-7712",
    imageUrl: "/assets/images/inventory/inventory-2-cane-lamp.jpg",
    vendorName: "Harbor Blend Collective",
    vendorType: "Physical Store",
    category: "Home Décor",
    currentStock: 14,
    stockStatus: "Low Stock",
    lastUpdated: "Today, 7:02 AM",
  },
  {
    id: "sequin-evening-clutch",
    productName: "Sequin Evening Clutch",
    sku: "MV-ACC-5541",
    imageUrl: "/assets/images/inventory/inventory-6-clutch.jpg",
    vendorName: "Nexa Collective Accessories House",
    vendorType: "Online Seller",
    category: "Accessories",
    currentStock: 38,
    stockStatus: "Healthy",
    lastUpdated: "Today, 10:11 AM",
  },
  {
    id: "banarasi-silk-blouse",
    productName: "Banarasi Silk Blouse",
    sku: "MV-SAR-4402",
    imageUrl: "/assets/images/inventory/inventory-1-silk-saree.jpg",
    vendorName: "Fusia Kollection",
    vendorType: "Online Seller",
    category: "Women Ethnic",
    currentStock: 0,
    stockStatus: "Out of Stock",
    lastUpdated: "5 days ago",
  },
  {
    id: "terracotta-wind-chime",
    productName: "Terracotta Wind Chime",
    sku: "MV-HOM-8823",
    imageUrl: "/assets/images/inventory/inventory-5-planter-set.jpg",
    vendorName: "Kochi Krafts",
    vendorType: "Physical Store",
    category: "Home Décor",
    currentStock: 19,
    stockStatus: "Low Stock",
    lastUpdated: "Today, 6:35 AM",
  },
  {
    id: "printed-satin-co-ord",
    productName: "Printed Satin Co-ord",
    sku: "MV-WEA-4451",
    imageUrl: "/assets/images/inventory/inventory-8-coord-set.jpg",
    vendorName: "Urban Weave House",
    vendorType: "Physical Store",
    category: "Women Ethnic",
    currentStock: 52,
    stockStatus: "Healthy",
    lastUpdated: "Today, 12:40 PM",
  },
];

/** Static header figures matching the Figma "Inventory Overview" stat cards — these represent
 *  the full production catalog (12,486 active SKUs across the whole marketplace), not just the
 *  24-row `INVENTORY_ITEMS` mock sample used to populate the table below them. */
export const INVENTORY_SUMMARY = {
  totalActiveSkus: 12486,
  lowStockSkus: 182,
  outOfStockSkus: 46,
};

export const STOCK_STATUS_OPTIONS: StockStatus[] = ["Healthy", "Low Stock", "Out of Stock"];

/** Derived from the mock dataset so the "Category" filter never lists an option with zero matches. */
export const INVENTORY_CATEGORY_OPTIONS: string[] = Array.from(
  new Set(INVENTORY_ITEMS.map((item) => item.category))
).sort();

/** Derived from the mock dataset so the "Vendor" filter never lists an option with zero matches. */
export const INVENTORY_VENDOR_OPTIONS: string[] = Array.from(
  new Set(INVENTORY_ITEMS.map((item) => item.vendorName))
).sort();
