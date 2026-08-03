export type PromotionTab = "coupons" | "banners";

interface PromotionsTabsProps {
  tabs: Array<{ label: string; value: PromotionTab; count: number }>;
  active: PromotionTab;
  onChange: (value: PromotionTab) => void;
}

/**
 * "Coupons / Banners" segmented pill tabs — matches the Figma "promotions campaigns" design's
 * Tabs + Create Button row. Distinct from the underline `PayoutStatusTabs`/`OrderStatusTabs`
 * style: this one is a filled pill (bg-surface-tint track, active tab gets a white background)
 * since that's what this specific Figma frame shows.
 */
export function PromotionsTabs({ tabs, active, onChange }: PromotionsTabsProps) {
  return (
    <div className="flex shrink-0 items-start gap-1 rounded-[10px] bg-surface-tint p-1">
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={`flex h-8 items-center gap-[7px] rounded-lg px-[18px] text-[13px] font-semibold transition-colors ${
              isActive ? "bg-white text-ink" : "text-gray-500 hover:text-ink"
            }`}
          >
            {tab.label}
            <span
              className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1.5 text-[10px] font-extrabold ${
                isActive ? "bg-primary text-white" : "bg-primary-soft text-primary"
              }`}
            >
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
