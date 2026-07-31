import type { VendorType } from "@/lib/mock-data/vendors";
import { FULFILLMENT_TYPES, type FulfillmentType } from "@/lib/mock-data/products";
import { ProductFilterDropdown } from "@/components/products/ProductFilterDropdown";

interface ProductFiltersBarProps {
  typeTabs: Array<{ label: string; value: VendorType | "All" }>;
  activeType: VendorType | "All";
  onTypeChange: (value: VendorType | "All") => void;
  categoryOptions: string[];
  activeCategory: string | "All";
  onCategoryChange: (value: string | "All") => void;
  vendorOptions: string[];
  activeVendor: string | "All";
  onVendorChange: (value: string | "All") => void;
  activeFulfillment: FulfillmentType | "All";
  onFulfillmentChange: (value: FulfillmentType | "All") => void;
}

/** Vendor-type segmented control + Category/Vendor/Fulfillment dropdowns shown above the products table. */
export function ProductFiltersBar({
  typeTabs,
  activeType,
  onTypeChange,
  categoryOptions,
  activeCategory,
  onCategoryChange,
  vendorOptions,
  activeVendor,
  onVendorChange,
  activeFulfillment,
  onFulfillmentChange,
}: ProductFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <div className="flex items-center gap-0.5 rounded-lg border border-border bg-white p-1">
        {typeTabs.map((tab) => {
          const isActive = tab.value === activeType;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTypeChange(tab.value)}
              className={`rounded-md px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                isActive ? "bg-primary-light text-primary" : "text-gray-500 hover:bg-surface-tint"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <ProductFilterDropdown
        label="Category"
        allLabel="All Categories"
        value={activeCategory}
        options={categoryOptions}
        onChange={onCategoryChange}
      />
      <ProductFilterDropdown
        label="Vendor"
        allLabel="All Vendors"
        value={activeVendor}
        options={vendorOptions}
        onChange={onVendorChange}
      />
      <ProductFilterDropdown
        label="Fulfillment"
        allLabel="All"
        value={activeFulfillment}
        options={FULFILLMENT_TYPES}
        onChange={onFulfillmentChange}
      />
    </div>
  );
}
