import type { VendorType } from "@/lib/mock-data/vendors";
import type { StockStatus } from "@/lib/mock-data/inventory";
import { STOCK_STATUS_OPTIONS } from "@/lib/mock-data/inventory";
import { ProductFilterDropdown } from "@/components/products/ProductFilterDropdown";

const TYPE_TABS: Array<{ label: string; value: VendorType | "All" }> = [
  { label: "All Types", value: "All" },
  { label: "Online Sellers", value: "Online Seller" },
  { label: "Physical Stores", value: "Physical Store" },
];

interface InventoryFiltersBarProps {
  categoryOptions: string[];
  activeCategory: string | "All";
  onCategoryChange: (value: string | "All") => void;
  vendorOptions: string[];
  activeVendor: string | "All";
  onVendorChange: (value: string | "All") => void;
  activeType: VendorType | "All";
  onTypeChange: (value: VendorType | "All") => void;
  activeStockStatus: StockStatus | "All";
  onStockStatusChange: (value: StockStatus | "All") => void;
}

/** Category/Vendor dropdowns + vendor-type segmented control + Stock Status dropdown shown
 *  above the Inventory Overview table. Reuses `ProductFilterDropdown` (already generic) from
 *  the Products screen instead of building a new dropdown primitive. */
export function InventoryFiltersBar({
  categoryOptions,
  activeCategory,
  onCategoryChange,
  vendorOptions,
  activeVendor,
  onVendorChange,
  activeType,
  onTypeChange,
  activeStockStatus,
  onStockStatusChange,
}: InventoryFiltersBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <ProductFilterDropdown
        label="Category"
        allLabel="All Categories"
        value={activeCategory}
        options={categoryOptions}
        onChange={onCategoryChange}
      />
      <ProductFilterDropdown label="Vendor" allLabel="All Vendors" value={activeVendor} options={vendorOptions} onChange={onVendorChange} />

      <div className="flex items-center gap-0.5 rounded-lg border border-border bg-white p-1">
        {TYPE_TABS.map((tab) => {
          const isActive = tab.value === activeType;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onTypeChange(tab.value)}
              className={`whitespace-nowrap rounded-md px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors ${
                isActive ? "bg-primary-light text-primary" : "text-gray-500 hover:bg-surface-tint"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <ProductFilterDropdown
        label="Stock Status"
        allLabel="All"
        value={activeStockStatus}
        options={STOCK_STATUS_OPTIONS}
        onChange={onStockStatusChange}
      />
    </div>
  );
}
