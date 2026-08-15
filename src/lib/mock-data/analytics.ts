import type { VendorType } from "@/lib/mock-data/vendors";

/** Matches the Figma "analytics" design's header date-range dropdown (node 1143:108). */
export const DATE_RANGE_OPTIONS = ["Last 7 days", "Last 30 days", "Last 90 days", "This year"] as const;
export type AnalyticsDateRange = (typeof DATE_RANGE_OPTIONS)[number];

/** One of the 4 top summary tiles (Total GMV / Total Orders / Platform Revenue / Avg Order
 *  Value). Order matches the Figma layout exactly — `AnalyticsStatsGrid` pairs each entry with
 *  its icon by array index rather than storing a component reference in mock data. */
export interface AnalyticsSummaryStat {
  label: string;
  value: string;
  deltaLabel: string;
  deltaDirection: "up" | "down";
}

export const ANALYTICS_SUMMARY_STATS: AnalyticsSummaryStat[] = [
  { label: "Total GMV", value: "₹2.84Cr", deltaLabel: "12.8%", deltaDirection: "up" },
  { label: "Total Orders", value: "18,426", deltaLabel: "8.4%", deltaDirection: "up" },
  { label: "Platform Revenue", value: "₹24.7L", deltaLabel: "10.1%", deltaDirection: "up" },
  { label: "Avg Order Value", value: "₹1,542", deltaLabel: "1.9%", deltaDirection: "down" },
];

/** One point of the "Revenue Trend" line chart. `value` is in ₹ lakhs so the y-axis can show
 *  round "₹3L" / "₹6L" gridlines. */
export interface RevenueTrendPoint {
  label: string;
  value: number;
}

/** Daily revenue over the last 30 days — Figma shows an upward trend from ~₹2.5L/day to
 *  ~₹11.5L/day with a couple of small dips, axis capped at ₹12L. */
export const REVENUE_TREND_DAILY: RevenueTrendPoint[] = [
  { label: "Day 1", value: 2.6 },
  { label: "Day 2", value: 2.9 },
  { label: "Day 3", value: 3.4 },
  { label: "Day 4", value: 3.1 },
  { label: "Day 5", value: 3.8 },
  { label: "Day 6", value: 4.2 },
  { label: "Day 7", value: 4.0 },
  { label: "Day 8", value: 4.6 },
  { label: "Day 9", value: 5.1 },
  { label: "Day 10", value: 4.8 },
  { label: "Day 11", value: 5.4 },
  { label: "Day 12", value: 5.9 },
  { label: "Day 13", value: 5.6 },
  { label: "Day 14", value: 6.2 },
  { label: "Day 15", value: 6.7 },
  { label: "Day 16", value: 6.4 },
  { label: "Day 17", value: 7.0 },
  { label: "Day 18", value: 7.4 },
  { label: "Day 19", value: 7.1 },
  { label: "Day 20", value: 7.7 },
  { label: "Day 21", value: 8.2 },
  { label: "Day 22", value: 8.5 },
  { label: "Day 23", value: 8.1 },
  { label: "Day 24", value: 8.8 },
  { label: "Day 25", value: 9.3 },
  { label: "Day 26", value: 9.6 },
  { label: "Day 27", value: 9.2 },
  { label: "Day 28", value: 10.1 },
  { label: "Day 29", value: 10.6 },
  { label: "Day 30", value: 11.4 },
];

/** Weekly rollup of the same trend, shown when the "Weekly" toggle is active. */
export const REVENUE_TREND_WEEKLY: RevenueTrendPoint[] = [
  { label: "Week 1", value: 22.4 },
  { label: "Week 2", value: 34.6 },
  { label: "Week 3", value: 48.9 },
  { label: "Week 4", value: 62.1 },
];

/** Monthly rollup, shown when the "Monthly" toggle is active — labelled with the 6 months
 *  leading up to the current month so the chart reads as "trailing 6 months". */
export const REVENUE_TREND_MONTHLY: RevenueTrendPoint[] = [
  { label: "Mar", value: 178 },
  { label: "Apr", value: 195 },
  { label: "May", value: 208 },
  { label: "Jun", value: 224 },
  { label: "Jul", value: 251 },
  { label: "Aug", value: 284 },
];

export type RevenueTrendRange = "Daily" | "Weekly" | "Monthly";

/** One week of the "Order Volume by Fulfillment" stacked bar chart. Values are order counts. */
export interface OrderVolumeWeek {
  week: string;
  delivery: number;
  pickup: number;
}

export const ORDER_VOLUME_BY_WEEK: OrderVolumeWeek[] = [
  { week: "Week 1", delivery: 1420, pickup: 980 },
  { week: "Week 2", delivery: 1650, pickup: 1150 },
  { week: "Week 3", delivery: 1700, pickup: 1380 },
  { week: "Week 4", delivery: 1720, pickup: 1680 },
];

/** One row of the "Top Categories" ranked-bar list. `percent` (0-100) sizes the fill bar
 *  relative to the top category. */
export interface TopCategory {
  name: string;
  gmvLabel: string;
  percent: number;
}

export const TOP_CATEGORIES: TopCategory[] = [
  { name: "Women Ethnic", gmvLabel: "₹58L", percent: 100 },
  { name: "Home Décor", gmvLabel: "₹49L", percent: 84 },
  { name: "Beauty", gmvLabel: "₹41L", percent: 71 },
  { name: "Menswear", gmvLabel: "₹33L", percent: 57 },
  { name: "Accessories", gmvLabel: "₹28L", percent: 48 },
];

/** One stage of the "Conversion Funnel" card. `widthPercent` narrows each successive bar (a
 *  purely visual funnel taper) while `percent` is the actual drop-off number displayed. */
export interface ConversionFunnelStage {
  label: string;
  percent: number;
  widthPercent: number;
  background: string;
}

export const CONVERSION_FUNNEL: ConversionFunnelStage[] = [
  { label: "Visits", percent: 100, widthPercent: 100, background: "#fff0f2" },
  { label: "Product Views", percent: 61, widthPercent: 47, background: "#ffe4ed" },
  { label: "Add to Cart", percent: 24, widthPercent: 39, background: "#f8d1d9" },
  { label: "Orders", percent: 11, widthPercent: 31, background: "#fdeac9" },
  { label: "Completed", percent: 8, widthPercent: 23, background: "#d5eede" },
];

/** One row of the "Top Vendors This Month" ranked list. `trend` is a small series of relative
 *  values (unitless) driving each row's mini sparkline. */
export interface TopVendor {
  slug: string;
  initials: string;
  name: string;
  type: VendorType;
  gmvLabel: string;
  trend: number[];
}

export const TOP_VENDORS: TopVendor[] = [
  {
    slug: "harbor-blend-collective",
    initials: "HB",
    name: "Harbor Blend Collective",
    type: "Physical Store",
    gmvLabel: "₹18.6L",
    trend: [4, 6, 5, 7, 6, 9, 12],
  },
  {
    slug: "fusia-kollection",
    initials: "FK",
    name: "Fusia Kollection",
    type: "Online Seller",
    gmvLabel: "₹16.2L",
    trend: [5, 4, 7, 6, 8, 7, 10],
  },
  {
    slug: "trend-co",
    initials: "TC",
    name: "Trend Co.",
    type: "Online Seller",
    gmvLabel: "₹14.9L",
    trend: [6, 7, 6, 8, 7, 9, 8],
  },
  {
    slug: "kochi-krafts",
    initials: "KK",
    name: "Kochi Krafts",
    type: "Physical Store",
    gmvLabel: "₹12.8L",
    trend: [4, 5, 4, 6, 5, 6, 7],
  },
  {
    slug: "bloom-cart",
    initials: "BC",
    name: "Bloom Cart",
    type: "Online Seller",
    gmvLabel: "₹11.3L",
    trend: [3, 5, 4, 6, 5, 7, 9],
  },
];

/** One tile of the bottom "operational health" row. */
export interface OperationalMetric {
  label: string;
  value: string;
  status: string;
  statusTone: "success" | "danger";
  benchmark: string;
}

export const OPERATIONAL_METRICS: OperationalMetric[] = [
  {
    label: "Return Rate",
    value: "3.4%",
    status: "Below target",
    statusTone: "success",
    benchmark: "Target benchmark: < 4.0%",
  },
  {
    label: "Cancellation Rate",
    value: "2.8%",
    status: "Healthy",
    statusTone: "success",
    benchmark: "Target benchmark: < 3.5%",
  },
  {
    label: "NDR Rate",
    value: "5.1%",
    status: "Above target",
    statusTone: "danger",
    benchmark: "Target benchmark: < 4.5%",
  },
  {
    label: "Avg Customer Rating",
    value: "4.6",
    status: "On track",
    statusTone: "success",
    benchmark: "Target benchmark: > 4.4",
  },
];
