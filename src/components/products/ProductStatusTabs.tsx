import type { ProductStatus } from "@/lib/mock-data/products";

interface ProductStatusTabsProps {
  tabs: Array<{ label: string; value: ProductStatus | "All" }>;
  active: ProductStatus | "All";
  onChange: (value: ProductStatus | "All") => void;
  counts: Partial<Record<ProductStatus | "All", number>>;
}

/** "All / Approved / Pending Review / Rejected / Flagged" pill row shown above the products filter bar. */
export function ProductStatusTabs({ tabs, active, onChange, counts }: ProductStatusTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-[10px] border border-border bg-white p-1.5">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        const count = counts[tab.value] ?? 0;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13.5px] font-semibold transition-colors ${
              isActive ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:bg-surface-tint"
            }`}
          >
            {tab.label}
            <span
              className={`inline-flex h-[18px] min-w-[22px] items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                isActive ? "bg-primary-lighter text-primary" : "bg-surface-tint text-gray-500"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
