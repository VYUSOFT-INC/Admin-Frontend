import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";

interface HealthMetric {
  label: string;
  value: string;
}

const METRICS: HealthMetric[] = [
  { label: "Policy Violations", value: "3" },
  { label: "Late Shipment Risk", value: "5.1%" },
  { label: "KYC Completion", value: "94%" },
  { label: "Avg Fulfillment Rate", value: "96.8%" },
];

export function AccountHealthCard() {
  return (
    <Card>
      <CardHeader
        title="Account Health"
        description="Seller ecosystem standing at a glance"
        action={<Badge variant="success">Healthy</Badge>}
      />
      <div className="flex flex-col gap-4 px-5 pb-5 pt-[18px]">
        <div className="flex items-center gap-4">
          <div className="flex size-[94px] shrink-0 items-center justify-center rounded-full bg-primary-lighter">
            <div className="flex size-[70px] flex-col items-center justify-center rounded-full bg-white">
              <p className="text-2xl font-extrabold tracking-[-0.72px] text-ink">90</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.6px] text-gray-500">Score</p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-extrabold text-ink">Strong marketplace health</h3>
            <p className="text-xs font-medium text-gray-500">
              Low cancellation risk, high SLA compliance, and only a few pending escalations across active vendors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {METRICS.map((metric) => (
            <div key={metric.label} className="rounded-[10px] bg-surface-tint p-3">
              <p className="text-[11px] font-bold text-gray-500">{metric.label}</p>
              <p className="text-lg font-extrabold text-ink">{metric.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
