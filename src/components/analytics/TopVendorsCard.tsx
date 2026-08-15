import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { TOP_VENDORS, type TopVendor } from "@/lib/mock-data/analytics";

const SPARK_WIDTH = 92;
const SPARK_HEIGHT = 28;

/** Small trend line for one vendor's GMV row — plain inline SVG (no chart library), matching the
 *  house style set by `RevenueTrendCard`/`OrderVolumeCard`. */
function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const padding = 4;
  const path = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * SPARK_WIDTH;
      const y = padding + (1 - (value - min) / range) * (SPARK_HEIGHT - padding * 2);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div className="h-[28px] w-[92px] shrink-0 overflow-hidden rounded-lg bg-gradient-to-b from-[#fff8f9] to-white">
      <svg viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`} preserveAspectRatio="none" className="size-full" aria-hidden>
        <path d={path} fill="none" stroke="#d6002e" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function VendorRow({ vendor, isLast }: { vendor: TopVendor; isLast: boolean }) {
  return (
    <div className={`grid grid-cols-[minmax(0,1fr)_86px_92px] items-center gap-3 pt-3 ${isLast ? "" : "border-b border-[#f2dee5] pb-3"}`}>
      <div className="flex min-w-0 items-center gap-2.5">
        <Avatar initials={vendor.initials} size={36} className="text-[13px]" />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="min-w-0 truncate text-[13px] font-bold text-ink">{vendor.name}</p>
          <Badge variant="vendorTag" className="w-fit">
            {vendor.type}
          </Badge>
        </div>
      </div>
      <p className="min-w-0 truncate text-right text-[13px] font-extrabold text-ink">{vendor.gmvLabel}</p>
      <Sparkline values={vendor.trend} />
    </div>
  );
}

export function TopVendorsCard() {
  return (
    <Card className="flex h-full flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-base font-extrabold text-ink">Top Vendors This Month</h2>
        <p className="min-w-0 break-words text-[12.5px] font-medium text-gray-500">Best-performing vendors ranked by GMV</p>
      </div>

      <div className="flex flex-col">
        {TOP_VENDORS.map((vendor, index) => (
          <VendorRow key={vendor.slug} vendor={vendor} isLast={index === TOP_VENDORS.length - 1} />
        ))}
      </div>
    </Card>
  );
}
