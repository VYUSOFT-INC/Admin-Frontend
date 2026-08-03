import type { ComponentType, SVGProps } from "react";
import { Card } from "@/components/ui/Card";
import { CheckSmallIcon, ClockIcon, RejectIcon } from "@/components/icons/VendorDetailIcons";
import { FlagIcon, PackageDeliveredIcon, ShippedTruckIcon, StoreIcon, TrackingIcon } from "@/components/icons/OrderIcons";
import type { Order, OrderTimelineStep } from "@/lib/mock-data/orders";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Picks the node icon for a "current"/active timeline step, keyed by a keyword in its label. */
function currentStepIcon(label: string): IconComponent {
  if (label.includes("Shipped")) return ShippedTruckIcon;
  if (label.includes("Ready for Pickup")) return StoreIcon;
  if (label.includes("Flagged")) return FlagIcon;
  return ClockIcon;
}

/** Picks the node icon for an "upcoming" (not yet reached) timeline step. */
function upcomingStepIcon(label: string): IconComponent {
  if (label.includes("Delivered") || label.includes("Collected") || label.includes("Completed")) return PackageDeliveredIcon;
  return ClockIcon;
}

interface StepRowProps {
  step: OrderTimelineStep;
  isLast: boolean;
}

function StepRow({ step, isLast }: StepRowProps) {
  const dividerColor = step.state === "done" ? "bg-primary" : "bg-[#e5e7eb]";

  let nodeClasses = "flex size-7 shrink-0 items-center justify-center rounded-full border-2";
  let Icon: IconComponent;
  let iconClasses = "size-3";
  let labelClasses = "text-[13.5px] font-bold";

  if (step.state === "done") {
    nodeClasses += " border-primary bg-primary";
    Icon = CheckSmallIcon;
    iconClasses += " text-white";
    labelClasses += " text-ink";
  } else if (step.state === "current") {
    nodeClasses += " border-primary bg-primary-lighter";
    Icon = currentStepIcon(step.label);
    iconClasses += " text-primary";
    labelClasses += " text-ink";
  } else if (step.state === "cancelled") {
    nodeClasses += " border-[#991b1b] bg-[#991b1b]";
    Icon = RejectIcon;
    iconClasses += " text-white";
    labelClasses += " text-[#991b1b]";
  } else {
    nodeClasses += " border-[#e5e7eb] bg-white";
    Icon = upcomingStepIcon(step.label);
    iconClasses += " text-gray-300";
    labelClasses += " text-gray-400";
  }

  return (
    <div className="flex gap-3.5">
      <div className="flex flex-col items-center">
        <div className={nodeClasses}>
          <Icon className={iconClasses} />
        </div>
        {!isLast && <div className={`w-0.5 flex-1 ${dividerColor}`} style={{ minHeight: "24px" }} />}
      </div>
      <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-6"}`}>
        <p className={`break-words ${labelClasses}`}>{step.label}</p>
        <p className="mt-[3px] break-words text-xs font-medium text-gray-500">{step.timestamp}</p>
        {step.trackingNumber && (
          <div className="mt-2 flex flex-wrap items-center gap-2 rounded-[7px] border border-border bg-surface-tint px-3.5 py-2">
            <TrackingIcon className="size-[13px] shrink-0 text-gray-500" />
            <span className="text-[11px] font-bold text-gray-500">Tracking No:</span>
            <span className="break-all font-mono text-xs font-bold text-ink">{step.trackingNumber}</span>
          </div>
        )}
      </div>
    </div>
  );
}

interface OrderTimelineCardProps {
  order: Order;
}

/** "Order Timeline" card: a vertical stepper reflecting `order.timeline`. */
export function OrderTimelineCard({ order }: OrderTimelineCardProps) {
  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 px-[23px] py-[21px]">
      <h2 className="text-sm font-extrabold text-ink">Order Timeline</h2>
      <div className="flex flex-col">
        {order.timeline.map((step, index) => (
          <StepRow key={step.label} step={step} isLast={index === order.timeline.length - 1} />
        ))}
      </div>
    </Card>
  );
}
