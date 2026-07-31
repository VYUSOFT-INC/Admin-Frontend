import Image from "next/image";
import { Card } from "@/components/ui/Card";

interface StatCardData {
  label: string;
  value: string;
  hint: string;
  icon: string;
}

const STATS: StatCardData[] = [
  {
    label: "Pending Approvals",
    value: "19",
    hint: "12 vendors · 7 store applications",
    icon: "/assets/icons/stats/pending-approvals.svg",
  },
  {
    label: "Orders Today",
    value: "184",
    hint: "126 delivery · 38 pickup · 20 walk-in",
    icon: "/assets/icons/stats/orders-today.svg",
  },
  {
    label: "Pending Payouts",
    value: "26",
    hint: "₹3.84L queued for seller settlement",
    icon: "/assets/icons/stats/pending-payouts.svg",
  },
  {
    label: "Open Returns",
    value: "21",
    hint: "8 need admin action",
    icon: "/assets/icons/stats/open-returns.svg",
  },
];

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
        <Card key={stat.label} className="flex flex-col gap-3 p-[19px]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-500">{stat.label}</p>
            <span className="flex size-[34px] items-center justify-center rounded-[10px] bg-primary-lighter">
              <Image src={stat.icon} alt="" width={18} height={18} />
            </span>
          </div>
          <p className="text-[28px] font-extrabold tracking-[-0.84px] text-ink">{stat.value}</p>
          <p className="text-xs font-semibold text-gray-500">{stat.hint}</p>
        </Card>
      ))}
    </div>
  );
}
