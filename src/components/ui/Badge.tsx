import type { ReactNode } from "react";

export type BadgeVariant = "danger" | "success" | "warning" | "neutral" | "muted" | "info" | "purple" | "sky";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  danger: "bg-primary-soft text-primary",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  neutral: "bg-primary-light text-ink",
  muted: "bg-surface-tint text-gray-500",
  /** Blue — used for e.g. "Online Seller" / "Delivery" tags that aren't a status. */
  info: "bg-[#dbeafe] text-[#1d4ed8]",
  /** Purple — used for e.g. "In-Store Pickup" tags that aren't a status. */
  purple: "bg-[#ede9fe] text-[#6d28d9]",
  /** Sky blue — distinct from `info`'s deeper blue; used for the Promotions Coupons table's
   * "Fixed" discount type so it doesn't read the same as that row's "Delivery" applies-to tag. */
  sky: "bg-[#e7f6fd] text-[#0ea5e9]",
};

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, variant = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-extrabold leading-none ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
