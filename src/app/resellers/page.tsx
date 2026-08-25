"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ResellerFiltersBar } from "@/components/resellers/ResellerFiltersBar";
import { ResellerStatsCards } from "@/components/resellers/ResellerStatsCards";
import { ResellersTable } from "@/components/resellers/ResellersTable";
import { RESELLERS, type ResellerStatus, type ResellerTier } from "@/lib/mock-data/resellers";

export default function ResellersPage() {
  const [resellers, setResellers] = useState(RESELLERS);
  const [search, setSearch] = useState("");
  const [activeTier, setActiveTier] = useState<ResellerTier | "All">("All");
  const [activeStatus, setActiveStatus] = useState<ResellerStatus | "All">("All");

  const statusCounts = useMemo(() => {
    const counts: Partial<Record<ResellerStatus | "All", number>> = { All: resellers.length };
    for (const reseller of resellers) {
      counts[reseller.status] = (counts[reseller.status] ?? 0) + 1;
    }
    return counts;
  }, [resellers]);

  const filteredResellers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return resellers.filter((reseller) => {
      const matchesTier = activeTier === "All" || reseller.tier === activeTier;
      const matchesStatus = activeStatus === "All" || reseller.status === activeStatus;
      const matchesSearch =
        query.length === 0 ||
        reseller.name.toLowerCase().includes(query) ||
        reseller.email.toLowerCase().includes(query);
      return matchesTier && matchesStatus && matchesSearch;
    });
  }, [resellers, search, activeTier, activeStatus]);

  function handleVerify(slug: string) {
    setResellers((current) => current.map((reseller) => (reseller.slug === slug ? { ...reseller, status: "Active" } : reseller)));
  }

  function handleReinstate(slug: string) {
    setResellers((current) => current.map((reseller) => (reseller.slug === slug ? { ...reseller, status: "Active" } : reseller)));
  }

  return (
    <AdminLayout title="Resellers" description="Manage reseller accounts and monitor affiliate program performance">
      <div className="flex flex-col gap-5">
        <ResellerStatsCards />
        <ResellerFiltersBar
          searchValue={search}
          onSearchChange={setSearch}
          activeTier={activeTier}
          onTierChange={setActiveTier}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          statusCounts={statusCounts}
        />
        <ResellersTable resellers={filteredResellers} onVerify={handleVerify} onReinstate={handleReinstate} />
      </div>
    </AdminLayout>
  );
}
