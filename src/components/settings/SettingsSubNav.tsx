import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { Badge } from "@/components/ui/Badge";
import { LayersIcon, PayoutScheduleIcon, PercentIcon, PinIcon, SlidersIcon, TaxComplianceIcon, TruckIcon } from "@/components/icons/SettingsIcons";
import { SETTINGS_SUB_NAV } from "@/lib/mock-data/settings";

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  commission: PercentIcon,
  "payout-schedule": PayoutScheduleIcon,
  "category-management": LayersIcon,
  "platform-config": SlidersIcon,
  shipping: TruckIcon,
  "tax-compliance": TaxComplianceIcon,
  "pickup-store": PinIcon,
};

interface SettingsSubNavProps {
  /** Slug of the currently active sub-section, e.g. "commission". */
  active: string;
}

/**
 * Left-hand sub-navigation on every Settings screen (Figma "settings - commision rates",
 * node 1071:8766). All seven destinations — "Commission Rates", "Payout Schedule", "Category
 * Management", "Platform Config", "Shipping", "Tax & Compliance", and "Pickup & Store" — link
 * somewhere real now (see `SETTINGS_SUB_NAV`). The non-interactive "Soon"-badge branch below is
 * kept so a future eighth sub-nav destination can drop in the same way each of these did, without
 * ever linking to a route that doesn't exist yet.
 */
export function SettingsSubNav({ active }: SettingsSubNavProps) {
  return (
    <nav aria-label="Settings sections" className="flex w-[200px] shrink-0 flex-col gap-0.5 self-stretch">
      {SETTINGS_SUB_NAV.map((item) => {
        const Icon = ICONS[item.slug];
        const isActive = item.slug === active;

        if (!item.isAvailable) {
          return (
            <div
              key={item.slug}
              aria-disabled="true"
              title="Coming soon"
              className="flex h-10 min-w-0 items-center gap-2.5 rounded-[10px] px-3.5 text-[13px] font-medium text-gray-400"
            >
              <Icon className="size-[15px] shrink-0" />
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              <Badge variant="muted" className="shrink-0 !px-1.5 !py-0.5 !text-[9px]">
                Soon
              </Badge>
            </div>
          );
        }

        return (
          <Link
            key={item.slug}
            href={`/settings/${item.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex h-10 min-w-0 items-center gap-2.5 rounded-[10px] px-3.5 text-[13px] font-bold transition-colors ${
              isActive ? "bg-primary-lighter text-primary" : "text-gray-500 hover:bg-surface-tint hover:text-ink"
            }`}
          >
            <Icon className="size-[15px] shrink-0" />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
