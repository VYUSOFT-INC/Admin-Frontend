"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { VendorFiltersBar } from "@/components/vendors/VendorFiltersBar";
import { VendorsTable } from "@/components/vendors/VendorsTable";
import {
  STATUS_TABS,
  TYPE_TABS,
  VENDORS,
  type SellerTier,
  type VendorStatus,
  type VendorType,
} from "@/lib/mock-data/vendors";

export default function VendorsPage() {
  const [vendors, setVendors] = useState(VENDORS);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<VendorStatus | "All">("All");
  const [activeType, setActiveType] = useState<VendorType | "All">("All");
  const [activeTier, setActiveTier] = useState<SellerTier | "All">("All");

  const statusCounts = useMemo(() => {
    const counts: Partial<Record<VendorStatus | "All", number>> = { All: vendors.length };
    for (const vendor of vendors) {
      counts[vendor.status] = (counts[vendor.status] ?? 0) + 1;
    }
    return counts;
  }, [vendors]);

  const filteredVendors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return vendors.filter((vendor) => {
      const matchesStatus = activeStatus === "All" || vendor.status === activeStatus;
      const matchesType = activeType === "All" || vendor.type === activeType;
      const matchesTier = activeTier === "All" || vendor.sellerTier === activeTier;
      const matchesSearch =
        query.length === 0 ||
        vendor.name.toLowerCase().includes(query) ||
        vendor.location.toLowerCase().includes(query) ||
        vendor.category.toLowerCase().includes(query);
      return matchesStatus && matchesType && matchesTier && matchesSearch;
    });
  }, [vendors, search, activeStatus, activeType, activeTier]);

  function handleReinstate(slug: string) {
    setVendors((current) =>
      current.map((vendor) => (vendor.slug === slug ? { ...vendor, status: "Active" } : vendor)),
    );
  }

  return (
    <AdminLayout title="Vendors" description="Manage online sellers and physical store accounts">
      <div className="flex flex-col gap-5">
        <VendorFiltersBar
          statusTabs={STATUS_TABS}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          statusCounts={statusCounts}
          typeTabs={TYPE_TABS}
          activeType={activeType}
          onTypeChange={setActiveType}
        />
        <VendorsTable
          vendors={filteredVendors}
          totalCount={vendors.length}
          searchValue={search}
          onSearchChange={setSearch}
          activeTier={activeTier}
          onTierChange={setActiveTier}
          onReinstate={handleReinstate}
        />
      </div>
    </AdminLayout>
  );
}
