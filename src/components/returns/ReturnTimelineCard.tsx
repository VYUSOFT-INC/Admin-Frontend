import type { ComponentType, SVGProps } from "react";
import { Card } from "@/components/ui/Card";
import { CheckSmallIcon, ClockIcon, RejectIcon } from "@/components/icons/VendorDetailIcons";
import { RefundProcessedIcon } from "@/components/icons/ReturnDetailIcons";
import type { ReturnRequest, ReturnTimelineStep } from "@/lib/mock-data/returns";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Picks the node icon for an "upcoming" (not yet reached) timeline step. */
function upcomingStepIcon(label: string): IconComponent {
  if (label.includes("Refund Processed")) return RefundProcessedIcon;
  return ClockIcon;
}

interface StepRowProps {
  step: ReturnTimelineStep;
  isLast: boolean;
}

function StepRow({ step, isLast }: StepRowProps) {
  const dividerColor = step.state === "done" ? "bg-success" : "bg-[#e5e7eb]";

  let nodeClasses = "flex size-7 shrink-0 items-center justify-center rounded-full border-2";
  let Icon: IconComponent;
  let iconClasses = "size-3";
  let labelClasses = "text-[13px] font-bold";

  if (step.state === "done") {
    nodeClasses += " border-success bg-success";
    Icon = CheckSmallIcon;
    iconClasses += " text-white";
    labelClasses += " text-ink";
  } else if (step.state === "current") {
    nodeClasses += " border-warning bg-warning-light";
    Icon = ClockIcon;
    iconClasses += " text-warning";
    labelClasses += " text-warning";
  } else if (step.state === "cancelled") {
    nodeClasses += " border-primary bg-primary";
    Icon = RejectIcon;
    iconClasses += " text-white";
    labelClasses += " text-primary";
  } else {
    nodeClasses += " border-[#e5e7eb] bg-white";
    Icon = upcomingStepIcon(step.label);
    iconClasses += " text-gray-300";
    labelClasses += " text-gray-400";
  }

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={nodeClasses}>
          <Icon className={iconClasses} />
        </div>
        {!isLast && <div className={`w-0.5 flex-1 ${dividerColor}`} style={{ minHeight: "24px" }} />}
      </div>
      <div className={`min-w-0 flex-1 ${isLast ? "" : "pb-6"}`}>
        <p className={`break-words ${labelClasses}`}>{step.label}</p>
        <p className="mt-[3px] break-words text-[11.5px] font-medium text-gray-500">{step.timestamp}</p>
      </div>
    </div>
  );
}

interface ReturnTimelineCardProps {
  returnRequest: ReturnRequest;
}

/** "Return Timeline" card: a vertical stepper reflecting `returnRequest.timeline`. */
export function ReturnTimelineCard({ returnRequest }: ReturnTimelineCardProps) {
  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 px-[19px] py-[19px]">
      <h2 className="flex items-center gap-1.5 text-sm font-extrabold text-ink">
        <ClockIcon className="size-3.5 text-gray-500" />
        Return Timeline
      </h2>
      <div className="flex flex-col">
        {returnRequest.timeline.map((step, index) => (
          <StepRow key={step.label} step={step} isLast={index === returnRequest.timeline.length - 1} />
        ))}
      </div>
    </Card>
  );
}
