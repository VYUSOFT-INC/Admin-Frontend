import { Card } from "@/components/ui/Card";
import { ORDER_VOLUME_BY_WEEK } from "@/lib/mock-data/analytics";

const AXIS_MAX = 4000;
const CHART_HEIGHT = 260;
const TICKS = [4, 3, 2, 1, 0].map((step) => (AXIS_MAX / 4) * step);

function formatCount(value: number): string {
  return value === 0 ? "0" : `${(value / 1000).toFixed(1)}k`;
}

export function OrderVolumeCard() {
  return (
    <Card className="flex flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-base font-extrabold text-ink">Order Volume by Fulfillment</h2>
        <p className="min-w-0 break-words text-[12.5px] font-medium text-gray-500">
          Weekly order mix across delivery, pickup, and walk-in
        </p>
      </div>

      <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-3">
        <div className="flex flex-col items-end justify-between py-2 pb-6">
          {TICKS.map((tick) => (
            <span key={tick} className="text-[11px] font-bold text-gray-500">
              {formatCount(tick)}
            </span>
          ))}
        </div>

        <div className="relative h-[260px] overflow-hidden rounded-[10px] bg-gradient-to-b from-surface-page to-white">
          {TICKS.map((tick, index) => (
            <div key={tick} className="absolute inset-x-2 h-px bg-[#f1dce4]" style={{ top: `${24 + index * 54}px` }} aria-hidden />
          ))}

          <div className="absolute inset-x-3 bottom-[34px] top-[18px] flex items-end justify-between gap-2.5">
            {ORDER_VOLUME_BY_WEEK.map((week) => {
              const total = week.delivery + week.pickup;
              const totalHeight = Math.min((total / AXIS_MAX) * CHART_HEIGHT, CHART_HEIGHT - 42);
              const deliveryHeight = (week.delivery / total) * totalHeight;
              const pickupHeight = totalHeight - deliveryHeight;
              return (
                <div key={week.week} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2.5">
                  <div
                    className="flex w-full max-w-[52px] flex-col overflow-hidden rounded-t-[10px] rounded-b-[6px]"
                    style={{ height: `${totalHeight}px` }}
                  >
                    <div className="w-full bg-[#dd2e54]" style={{ height: `${deliveryHeight}px` }} />
                    <div className="w-full bg-[#57bd7d]" style={{ height: `${pickupHeight}px` }} />
                  </div>
                  <span className="min-w-0 truncate text-[11px] font-bold text-gray-500">{week.week}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3.5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-[5px] bg-[#dd2e54]" aria-hidden />
          <span className="text-xs font-bold text-ink">Delivery</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-[5px] bg-[#57bd7d]" aria-hidden />
          <span className="text-xs font-bold text-ink">In-Store Pickup</span>
        </div>
      </div>
    </Card>
  );
}
