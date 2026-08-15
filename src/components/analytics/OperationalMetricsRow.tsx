import { Card } from "@/components/ui/Card";
import { OPERATIONAL_METRICS } from "@/lib/mock-data/analytics";

export function OperationalMetricsRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {OPERATIONAL_METRICS.map((metric) => (
        <Card key={metric.label} className="flex flex-col gap-2.5 p-[19px]">
          <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">
            {metric.label}
          </p>
          <div className="flex min-w-0 items-center justify-between gap-2">
            <p className="min-w-0 shrink-0 text-2xl font-extrabold tracking-[-0.72px] text-ink">{metric.value}</p>
            <p className={`min-w-0 truncate text-xs font-extrabold ${metric.statusTone === "success" ? "text-success" : "text-primary"}`}>
              {metric.status}
            </p>
          </div>
          <p className="min-w-0 break-words text-xs font-semibold text-gray-500">{metric.benchmark}</p>
        </Card>
      ))}
    </div>
  );
}
