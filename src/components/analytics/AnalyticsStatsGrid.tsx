import type { ComponentType, SVGProps } from "react";
import { Card } from "@/components/ui/Card";
import { OrdersIcon } from "@/components/icons/NavIcons";
import { AvgOrderValueIcon, GmvIcon, RevenueIcon } from "@/components/icons/AnalyticsIcons";
import { ANALYTICS_SUMMARY_STATS } from "@/lib/mock-data/analytics";

/** Icons paired with `ANALYTICS_SUMMARY_STATS` by array index — the 4-item set and its order are
 *  fixed by the Figma design, so an index lookup here is simpler than threading icon components
 *  through the mock-data module. */
const STAT_ICONS: Array<ComponentType<SVGProps<SVGSVGElement>>> = [GmvIcon, OrdersIcon, RevenueIcon, AvgOrderValueIcon];

export function AnalyticsStatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ANALYTICS_SUMMARY_STATS.map((stat, index) => {
        const Icon = STAT_ICONS[index];
        return (
          <Card key={stat.label} className="flex flex-col gap-3 p-[19px]">
            <div className="flex items-start justify-between gap-2">
              <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">
                {stat.label}
              </p>
              <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px] bg-primary-lighter">
                <Icon className="size-[18px] text-primary" />
              </span>
            </div>
            <p className="min-w-0 break-words text-[28px] font-extrabold tracking-[-0.84px] text-ink">{stat.value}</p>
            <div className="flex min-w-0 items-center gap-2">
              <span
                className={`shrink-0 text-[13px] font-bold ${stat.deltaDirection === "up" ? "text-success" : "text-primary"}`}
              >
                {stat.deltaDirection === "up" ? "↑" : "↓"} {stat.deltaLabel}
              </span>
              <span className="min-w-0 truncate text-sm font-normal text-gray-500">vs last month</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
