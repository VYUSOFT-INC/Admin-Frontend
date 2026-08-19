/**
 * Mock data for the "Shipping" settings screen (Figma "shipping", node 1143:1675) — the sixth
 * `SETTINGS_SUB_NAV` destination, slotted between "Platform Config" and "Pickup & Store" to match
 * the order Figma's own sub-nav shows. Three sections, matching the three bordered sub-cards the
 * design shows top to bottom: `COURIER_PARTNERS` (a courier's operational status, COD support,
 * on-time performance, and dispatch priority), `PINCODE_SERVICEABILITY_STATS` +
 * `PINCODE_LOOKUP_SAMPLE` (coverage numbers and a small sample of pincodes "Check Pincode" can
 * actually look up), and `SHIPPING_SLA_SETTINGS` (platform-wide delivery-speed defaults).
 *
 * Standalone-mock note, matching this project's other `settings.ts` tables: there's no real
 * backend here, so none of this is wired back to `orders.ts`'s existing seeded orders — e.g.
 * toggling a courier `isActive` off doesn't retroactively reassign any in-flight seeded order's
 * carrier, the same way editing `PLATFORM_CONFIG_SETTINGS` doesn't rewrite historical orders.
 */

export interface CourierPartner {
  id: string;
  name: string;
  /** Short one-line description shown under the courier's name, matching the Figma copy. */
  description: string;
  codSupported: boolean;
  isActive: boolean;
  /** Whole-percent on-time delivery rate. */
  onTimePercent: number;
  /** Average service-level-agreement transit time, in whole days. */
  avgSlaDays: number;
  /** Dispatch priority rank — 1 is tried first. Unique across active + inactive partners alike,
   * matching the Figma design's simple 1-5 numbering (not scoped to only-active couriers). */
  priority: number;
}

/**
 * The 5 courier rows shown in the Figma design, in its exact order/values: names, descriptions,
 * COD support, active/inactive, on-time %, avg SLA days, and priority all match the screenshot.
 */
export const COURIER_PARTNERS: CourierPartner[] = [
  {
    id: "courier-delhivery",
    name: "Delhivery",
    description: "National surface and express network",
    codSupported: true,
    isActive: true,
    onTimePercent: 94,
    avgSlaDays: 3,
    priority: 1,
  },
  {
    id: "courier-bluedart",
    name: "Bluedart",
    description: "Premium air express coverage",
    codSupported: false,
    isActive: true,
    onTimePercent: 98,
    avgSlaDays: 2,
    priority: 2,
  },
  {
    id: "courier-ecom-express",
    name: "Ecom Express",
    description: "Strong COD coverage in tier 2 and tier 3",
    codSupported: true,
    isActive: true,
    onTimePercent: 91,
    avgSlaDays: 4,
    priority: 3,
  },
  {
    id: "courier-dtdc",
    name: "DTDC",
    description: "Balanced metro and regional deliveries",
    codSupported: true,
    isActive: false,
    onTimePercent: 87,
    avgSlaDays: 5,
    priority: 4,
  },
  {
    id: "courier-xpressbees",
    name: "Xpressbees",
    description: "Economy fulfillment for nationwide orders",
    codSupported: true,
    isActive: true,
    onTimePercent: 89,
    avgSlaDays: 4,
    priority: 5,
  },
];

/** On-time-rate color thresholds, read off the Figma design's own per-row text colors: 94%/98%
 * render green, 91% renders amber, and 87%/89% (both under 90%) render red/primary. */
export function getOnTimePercentClasses(percent: number): string {
  if (percent >= 94) return "text-success";
  if (percent >= 90) return "text-[#f59e0b]";
  return "text-primary";
}

/** "Pincode Serviceability" section's three summary tiles — figures match the Figma screenshot
 * exactly ("Delivery is available to 21,438 pincodes across India."). */
export interface PincodeServiceabilityStats {
  deliveryServiceablePincodes: number;
  pickupServiceablePincodes: number;
  unserviceablePincodes: number;
}

export const PINCODE_SERVICEABILITY_STATS: PincodeServiceabilityStats = {
  deliveryServiceablePincodes: 21438,
  pickupServiceablePincodes: 6284,
  unserviceablePincodes: 1192,
};

/** A single pincode's coverage, for the "Check Pincode" lookup. Figma doesn't show the design for
 * an actual lookup result, so this is a standalone mock — a small, editorially-picked sample of
 * real Indian pincodes (not an exhaustive 21,438-row dataset) covering every combination the
 * lookup can show: both serviceable, delivery-only, pickup-only, and fully unserviceable. */
export interface PincodeCoverage {
  pincode: string;
  city: string;
  deliveryServiceable: boolean;
  pickupServiceable: boolean;
}

export const PINCODE_LOOKUP_SAMPLE: PincodeCoverage[] = [
  { pincode: "400001", city: "Mumbai, Maharashtra", deliveryServiceable: true, pickupServiceable: true },
  { pincode: "560001", city: "Bengaluru, Karnataka", deliveryServiceable: true, pickupServiceable: true },
  { pincode: "110001", city: "New Delhi, Delhi", deliveryServiceable: true, pickupServiceable: true },
  { pincode: "700001", city: "Kolkata, West Bengal", deliveryServiceable: true, pickupServiceable: false },
  { pincode: "380001", city: "Ahmedabad, Gujarat", deliveryServiceable: false, pickupServiceable: true },
  { pincode: "795001", city: "Imphal, Manipur", deliveryServiceable: false, pickupServiceable: false },
  { pincode: "194101", city: "Leh, Ladakh", deliveryServiceable: false, pickupServiceable: false },
];

/** Whole-day options for the "Standard Delivery Window" select. */
export const STANDARD_DELIVERY_WINDOW_OPTIONS = [1, 2, 3, 4, 5, 7] as const;

/** Preset options for the "Max Orders Per Day" select. */
export const MAX_ORDERS_PER_DAY_OPTIONS = [8000, 10000, 12000, 15000, 20000] as const;

export interface ShippingSlaSettings {
  /** Whole days, one of `STANDARD_DELIVERY_WINDOW_OPTIONS`. */
  standardDeliveryWindowDays: number;
  expressDeliveryAvailable: boolean;
  sameDayDeliveryAvailable: boolean;
  /** One of `MAX_ORDERS_PER_DAY_OPTIONS`. */
  maxOrdersPerDay: number;
}

/**
 * Standalone-mock note, mirroring `PLATFORM_CONFIG_SETTINGS`'s comment in `settings.ts`: a
 * *forward-looking global configuration* edited here, not wired back to `orders.ts`'s existing
 * seeded orders or their delivery dates — editing `standardDeliveryWindowDays` doesn't
 * retroactively recompute any already-placed order's expected delivery date.
 */
export const SHIPPING_SLA_SETTINGS: ShippingSlaSettings = {
  standardDeliveryWindowDays: 3,
  expressDeliveryAvailable: true,
  sameDayDeliveryAvailable: false,
  maxOrdersPerDay: 12000,
};
