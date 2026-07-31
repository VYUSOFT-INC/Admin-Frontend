import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/Card";

interface AttentionItem {
  title: string;
  description: string;
  icon: string;
  iconBg: string;
}

const ITEMS: AttentionItem[] = [
  {
    title: "12 vendor approvals pending",
    description: "7 online sellers and 5 physical stores are awaiting verification.",
    icon: "/assets/icons/attention/vendor-approvals.svg",
    iconBg: "bg-warning-light",
  },
  {
    title: "18 products flagged for review",
    description: "Pricing mismatch and incomplete descriptions need moderation.",
    icon: "/assets/icons/attention/products-flagged.svg",
    iconBg: "bg-primary-lighter",
  },
  {
    title: "Fulfillment SLA on track",
    description: "Delivery and pickup performance remained above target over the last 24 hours.",
    icon: "/assets/icons/attention/sla-on-track.svg",
    iconBg: "bg-success-light",
  },
];

export function AttentionQueueCard() {
  return (
    <Card>
      <CardHeader title="Attention Queue" description="Priority actions for today" />
      <div className="flex flex-col gap-4 px-5 pb-5 pt-[18px]">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex gap-3 rounded-[10px] bg-surface-tint p-3.5">
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-[10px] ${item.iconBg}`}>
              <Image src={item.icon} alt="" width={16} height={16} />
            </span>
            <div>
              <p className="text-[13px] font-extrabold text-ink">{item.title}</p>
              <p className="text-xs font-medium text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
