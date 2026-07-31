import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { BackArrowIcon } from "@/components/icons/VendorDetailIcons";
import { ChevronRightIcon } from "@/components/icons/VendorIcons";
import { STATUS_BADGE_VARIANT, TYPE_BADGE_VARIANT } from "@/components/vendors/VendorsTable";
import type { Vendor, VendorStatus } from "@/lib/mock-data/vendors";

const STATUS_LABEL: Record<VendorStatus, string> = {
  Pending: "Pending Approval",
  Active: "Active",
  Suspended: "Suspended",
  Rejected: "Rejected",
};

interface VendorDetailHeaderProps {
  vendor: Vendor;
  status: VendorStatus;
}

/** Breadcrumb + page-header band for the Vendor Detail screen: back link, name, type/status badges. */
export function VendorDetailHeader({ vendor, status }: VendorDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-primary">
        <Link href="/vendors" className="hover:underline">
          Vendors
        </Link>
        <ChevronRightIcon className="size-3" />
        <span className="font-bold">{vendor.name}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/vendors"
          aria-label="Back to vendors"
          className="flex size-[34px] shrink-0 items-center justify-center rounded-lg border border-border bg-white text-ink hover:bg-surface-tint"
        >
          <BackArrowIcon className="size-4" />
        </Link>
        <h1 className="text-[22px] font-extrabold tracking-[-0.66px] text-ink">{vendor.name}</h1>
        <Badge variant={TYPE_BADGE_VARIANT[vendor.type]}>{vendor.type}</Badge>
        <Badge variant={STATUS_BADGE_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
      </div>
    </div>
  );
}
