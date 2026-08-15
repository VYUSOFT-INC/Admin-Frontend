import { Card } from "@/components/ui/Card";
import { TOP_CATEGORIES } from "@/lib/mock-data/analytics";

export function TopCategoriesCard() {
  return (
    <Card className="flex h-full flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-base font-extrabold text-ink">Top Categories</h2>
        <p className="min-w-0 break-words text-[12.5px] font-medium text-gray-500">Top 5 categories by GMV this month</p>
      </div>

      <div className="flex flex-col gap-3.5">
        {TOP_CATEGORIES.map((category) => (
          <div key={category.name} className="grid grid-cols-[minmax(0,124px)_minmax(0,1fr)_64px] items-center gap-3">
            <p className="min-w-0 truncate text-[13px] font-bold text-ink">{category.name}</p>
            <div className="h-3 min-w-[40px] overflow-hidden rounded-full border border-border bg-surface-tint">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-[#ed8ca1]"
                style={{ width: `${category.percent}%` }}
              />
            </div>
            <p className="min-w-0 truncate text-right text-[13px] font-bold text-ink">{category.gmvLabel}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
