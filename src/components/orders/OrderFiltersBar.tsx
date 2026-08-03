import type { FulfillmentType } from "@/lib/mock-data/products";
import { PAYMENT_METHODS, type PaymentMethod } from "@/lib/mock-data/orders";
import { ProductFilterDropdown } from "@/components/products/ProductFilterDropdown";

interface OrderFiltersBarProps {
  fulfillmentTabs: Array<{ label: string; value: FulfillmentType | "All" }>;
  activeFulfillment: FulfillmentType | "All";
  onFulfillmentChange: (value: FulfillmentType | "All") => void;
  activePayment: PaymentMethod | "All";
  onPaymentChange: (value: PaymentMethod | "All") => void;
}

/**
 * Fulfillment segmented control shown above the orders table — matches the Figma
 * "order management" design's FILTER BAR. A Payment dropdown is added alongside it
 * (reusing the same `ProductFilterDropdown` component Products uses for its
 * Category/Vendor/Fulfillment filters) since Payment method is a core order column
 * that would otherwise have no way to filter by; the Figma filter bar itself only
 * shows the Fulfillment control.
 */
export function OrderFiltersBar({
  fulfillmentTabs,
  activeFulfillment,
  onFulfillmentChange,
  activePayment,
  onPaymentChange,
}: OrderFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-border bg-white px-[17px] py-3">
      <span className="text-xs font-bold text-gray-500">Fulfillment:</span>
      <div className="flex items-center gap-0.5 rounded-lg bg-surface-tint p-1">
        {fulfillmentTabs.map((tab) => {
          const isActive = tab.value === activeFulfillment;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onFulfillmentChange(tab.value)}
              className={`rounded-md px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                isActive ? "bg-white text-ink shadow-sm" : "text-gray-500 hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <ProductFilterDropdown
        label="Payment"
        allLabel="All"
        value={activePayment}
        options={PAYMENT_METHODS}
        onChange={onPaymentChange}
      />
    </div>
  );
}
