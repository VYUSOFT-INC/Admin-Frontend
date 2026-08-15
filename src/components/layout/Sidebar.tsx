"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import {
  AnalyticsIcon,
  CustomersIcon,
  DashboardIcon,
  OrdersIcon,
  PaymentsIcon,
  ProductsIcon,
  PromotionsIcon,
  ReturnsIcon,
  SettingsIcon,
  SupportIcon,
  VendorsIcon,
} from "@/components/icons/NavIcons";

interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "Vendors", href: "/vendors", icon: VendorsIcon },
  { label: "Products", href: "/products", icon: ProductsIcon },
  { label: "Orders", href: "/orders", icon: OrdersIcon },
  { label: "Returns", href: "/returns", icon: ReturnsIcon },
  { label: "Payments", href: "/payments", icon: PaymentsIcon },
  { label: "Analytics", href: "/analytics", icon: AnalyticsIcon },
  { label: "Promotions", href: "/promotions", icon: PromotionsIcon },
  { label: "Customers", href: "/customers", icon: CustomersIcon },
  { label: "Support", href: "/support", icon: SupportIcon },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[264px] shrink-0 flex-col border-r border-border bg-white">
      <div className="flex h-[72px] shrink-0 items-center gap-3 border-b border-border px-[22px]">
        <div
          className="size-[30px] shrink-0 rounded-[10px]"
          style={{ backgroundImage: "linear-gradient(135deg, #d6002e 0%, #e8738c 100%)" }}
          aria-hidden
        />
        <div>
          <p className="text-[21px] font-extrabold leading-[1.5] tracking-[-0.84px] text-ink">MIVYU</p>
          <p className="text-[11px] font-semibold leading-[1.5] text-gray-500">Admin Console</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3.5 py-4" aria-label="Primary">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-[40px] items-center gap-[11px] rounded-[10px] px-3 py-[9.5px] text-sm font-semibold transition-colors ${
                isActive ? "bg-primary-light text-primary" : "text-gray-500 hover:bg-surface-tint hover:text-ink"
              }`}
            >
              <Icon className="size-[18px] shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
