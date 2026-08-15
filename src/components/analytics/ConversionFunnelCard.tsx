import { Card } from "@/components/ui/Card";
import { CONVERSION_FUNNEL } from "@/lib/mock-data/analytics";

export function ConversionFunnelCard() {
  return (
    <Card className="flex h-full flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-base font-extrabold text-ink">Conversion Funnel</h2>
        <p className="min-w-0 break-words text-[12.5px] font-medium text-gray-500">Drop-off from visit to completed order</p>
      </div>

      <div className="flex flex-col gap-2.5 pt-1">
        {CONVERSION_FUNNEL.map((stage) => (
          <div key={stage.label} className="min-w-[140px]" style={{ width: `${stage.widthPercent}%` }}>
            <div
              className="flex min-h-[54px] items-center justify-between gap-2 rounded-l-[10px] rounded-r-[6px] px-4 py-[16.5px]"
              style={{ backgroundColor: stage.background }}
            >
              <span className="min-w-0 truncate text-sm font-bold text-ink">{stage.label}</span>
              <span className="shrink-0 text-xs font-bold text-gray-500">{stage.percent}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
