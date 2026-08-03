import type { OrderStatus } from "@/lib/mock-data/orders";

interface OrderStatusTabsProps {
  tabs: Array<{ label: string; value: OrderStatus | "All" }>;
  active: OrderStatus | "All";
  onChange: (value: OrderStatus | "All") => void;
  counts: Partial<Record<OrderStatus | "All", number>>;
}

/** "All / Pending / Processing / ... / NDR" pill row shown above the Orders filter bar. */
export function OrderStatusTabs({ tabs, active, onChange, counts }: OrderStatusTabsProps) {
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
