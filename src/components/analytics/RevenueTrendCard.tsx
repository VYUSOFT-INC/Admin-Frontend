"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import {
  REVENUE_TREND_DAILY,
  REVENUE_TREND_MONTHLY,
  REVENUE_TREND_WEEKLY,
  type RevenueTrendRange,
} from "@/lib/mock-data/analytics";

const RANGES: RevenueTrendRange[] = ["Daily", "Weekly", "Monthly"];

const RANGE_CONFIG: Record<RevenueTrendRange, { data: typeof REVENUE_TREND_DAILY; axisMax: number; description: string }> = {
  Daily: { data: REVENUE_TREND_DAILY, axisMax: 12, description: "Revenue generated over the last 30 days" },
  Weekly: { data: REVENUE_TREND_WEEKLY, axisMax: 80, description: "Revenue generated over the last 4 weeks" },
  Monthly: { data: REVENUE_TREND_MONTHLY, axisMax: 320, description: "Revenue generated over the last 6 months" },
};

const CHART_WIDTH = 480;
const CHART_HEIGHT = 210;

/** Formats a value in ₹ lakhs as "₹XL" (or "₹X.XXCr" once it crosses 100L). */
function formatLakhs(value: number): string {
  if (value >= 100) {
    return `₹${(value / 100).toFixed(2).replace(/\.?0+$/, "")}Cr`;
  }
  return `₹${Number(value.toFixed(1)).toString()}L`;
}

/** Picks up to 5 evenly-spaced label indices so the x-axis never crowds. The 30-point Daily
 *  series is special-cased to land on whole week boundaries ("Day 1 / 7 / 14 / 21 / 30") instead
 *  of the generic even split (which would land on "Day 8 / 16 / 23"). */
function pickLabelIndices(length: number, maxLabels = 5): number[] {
  if (length === 30) return [0, 6, 13, 20, 29];
  if (length <= maxLabels) return Array.from({ length }, (_, i) => i);
  const indices: number[] = [];
  for (let i = 0; i < maxLabels; i++) {
    indices.push(Math.round((i * (length - 1)) / (maxLabels - 1)));
  }
  return Array.from(new Set(indices));
}

export function RevenueTrendCard() {
  const [range, setRange] = useState<RevenueTrendRange>("Daily");
  const { data, axisMax, description } = RANGE_CONFIG[range];

  const points = data.map((point, index) => {
    const x = data.length === 1 ? 0 : (index / (data.length - 1)) * CHART_WIDTH;
    const y = CHART_HEIGHT - (point.value / axisMax) * CHART_HEIGHT;
    return { x, y };
  });
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const lastPoint = points[points.length - 1];

  const yTicks = [4, 3, 2, 1, 0].map((step) => (axisMax / 4) * step);
  const labelIndices = pickLabelIndices(data.length);

  return (
    <Card className="flex flex-col gap-4 p-[19px]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-extrabold text-ink">Revenue Trend</h2>
          <p className="min-w-0 break-words text-[12.5px] font-medium text-gray-500">{description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 rounded-[10px] border border-border bg-surface-tint p-[5px]">
          {RANGES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRange(option)}
              aria-pressed={range === option}
              className={`min-h-[30px] rounded-[8px] px-[11px] py-[6px] text-xs font-bold transition-colors ${
                range === option
                  ? "border border-[#ecb6c5] bg-white text-primary"
                  : "border border-transparent text-gray-500 hover:text-ink"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-3">
        <div className="flex flex-col items-end justify-between py-2 pb-6">
          {yTicks.map((tick) => (
            <span key={tick} className="text-[11px] font-bold text-gray-500">
              {formatLakhs(tick)}
            </span>
          ))}
        </div>

        <div className="relative h-[260px] overflow-hidden rounded-[10px] bg-gradient-to-b from-surface-page to-white">
          {yTicks.map((tick, index) => (
            <div
              key={tick}
              className="absolute inset-x-2 h-px bg-[#f1dce4]"
              style={{ top: `${24 + index * 54}px` }}
              aria-hidden
            />
          ))}

          <svg
            className="absolute left-[10px] top-4 h-[210px] w-[calc(100%-20px)]"
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            preserveAspectRatio="none"
            aria-hidden
          >
            <path d={linePath} fill="none" stroke="#d6002e" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {lastPoint && (
            <span
              className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary"
              style={{ left: `calc(10px + ${lastPoint.x / CHART_WIDTH} * (100% - 20px))`, top: `${16 + lastPoint.y}px` }}
              aria-hidden
            />
          )}

          <div className="absolute inset-x-[18px] bottom-[10px] flex items-start justify-between">
            {data.map((point, index) =>
              labelIndices.includes(index) ? (
                <span key={point.label} className="text-[11px] font-bold text-gray-500">
                  {point.label}
                </span>
              ) : null,
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
