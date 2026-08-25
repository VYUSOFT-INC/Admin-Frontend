import { Card } from "@/components/ui/Card";
import { formatIndianCount, formatLakh, parseINR } from "@/lib/mock-data/resellers";
import type { Reseller, ResellerDetailData } from "@/lib/mock-data/resellers";

interface ResellerDetailStatsGridProps {
  reseller: Reseller;
  detail: ResellerDetailData;
}

/** Overview tab's 4-tile stat row: Total Clicks / Total Sales Generated / Total Commission Earned
 *  / Conversion Rate % (Figma node 1177:776). */
export function ResellerDetailStatsGrid({ reseller, detail }: ResellerDetailStatsGridProps) {
  const stats = [
    {
      label: "Total Clicks",
      value: formatIndianCount(detail.totalClicks),
      note: [`Across ${reseller.activeLinks} active`, "tracked links"],
    },
    {
      label: ["Total Sales", "Generated (₹)"],
      value: formatLakh(parseINR(reseller.totalSalesGenerated)),
      note: ["GMV from attributed", "orders"],
    },
    {
      label: ["Total Commission", "Earned (₹)"],
      value: formatLakh(parseINR(reseller.commissionEarned)),
      note: ["Settled + pending", "commission earnings"],
    },
    {
      label: "Conversion Rate %",
      value: detail.conversionRate,
      note: ["Based on clicks to", "confirmed orders"],
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={Array.isArray(stat.label) ? stat.label.join(" ") : stat.label} className="flex min-w-0 flex-col gap-2.5 p-[18px]">
          <p className="min-w-0 break-words text-[13px] font-bold text-gray-500">
            {Array.isArray(stat.label) ? stat.label.map((line) => <span key={line} className="block">{line}</span>) : stat.label}
          </p>
          <p className="break-words text-[28px] font-extrabold tracking-[-1.12px] text-ink">{stat.value}</p>
          <p className="min-w-0 break-words text-xs font-medium text-gray-500">
            {stat.note.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Card>
      ))}
    </div>
  );
}
