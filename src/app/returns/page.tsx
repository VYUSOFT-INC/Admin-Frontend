"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ReturnFiltersBar } from "@/components/returns/ReturnFiltersBar";
import { ReturnStatusTabs } from "@/components/returns/ReturnStatusTabs";
import { ReturnsTable } from "@/components/returns/ReturnsTable";
import {
  RETURNS,
  RETURN_TYPE_TABS,
  RETURN_VENDORS,
  STATUS_TABS,
  type DateRangeOption,
  type ReturnFulfillment,
  type ReturnReason,
  type ReturnStatus,
} from "@/lib/mock-data/returns";

/** Number of days each `DateRangeOption` preset covers, evaluated against the real current date. */
const DATE_RANGE_DAYS: Record<DateRangeOption, number> = {
  "Last 7 Days": 7,
  "Last 30 Days": 30,
  "Last 90 Days": 90,
};

export default function ReturnsPage() {
  const returns = RETURNS;
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<ReturnStatus | "All">("All");
  const [activeType, setActiveType] = useState<ReturnFulfillment | "All">("All");
  const [activeDateRange, setActiveDateRange] = useState<DateRangeOption | "All">("All");
  const [activeVendor, setActiveVendor] = useState<string | "All">("All");
  const [activeReason, setActiveReason] = useState<ReturnReason | "All">("All");

  const statusCounts = useMemo(() => {
    const counts: Partial<Record<ReturnStatus | "All", number>> = { All: returns.length };
    for (const item of returns) {
      counts[item.status] = (counts[item.status] ?? 0) + 1;
    }
    return counts;
  }, [returns]);

  const filteredReturns = useMemo(() => {
    const query = search.trim().toLowerCase();
    const cutoff =
      activeDateRange === "All"
        ? null
        : (() => {
            const date = new Date();
            date.setDate(date.getDate() - DATE_RANGE_DAYS[activeDateRange]);
            return date;
          })();

    return returns.filter((item) => {
      const matchesStatus = activeStatus === "All" || item.status === activeStatus;
      const matchesType = activeType === "All" || item.fulfillment === activeType;
      const matchesVendor = activeVendor === "All" || item.vendorName === activeVendor;
      const matchesReason = activeReason === "All" || item.reason === activeReason;
      const matchesDateRange = cutoff === null || new Date(item.requestedAt) >= cutoff;
      const matchesSearch =
        query.length === 0 ||
        item.returnNumber.toLowerCase().includes(query) ||
        item.orderNumber.toLowerCase().includes(query) ||
        item.customerName.toLowerCase().includes(query) ||
        item.customerEmail.toLowerCase().includes(query) ||
        item.vendorName.toLowerCase().includes(query);
      return matchesStatus && matchesType && matchesVendor && matchesReason && matchesDateRange && matchesSearch;
    });
  }, [returns, search, activeStatus, activeType, activeVendor, activeReason, activeDateRange]);

  return (
    <AdminLayout title="Returns & Refunds" description="Review, approve, and track customer return requests">
      <div className="flex flex-col gap-5">
        <ReturnStatusTabs tabs={STATUS_TABS} active={activeStatus} onChange={setActiveStatus} counts={statusCounts} />
        <ReturnFiltersBar
          typeTabs={RETURN_TYPE_TABS}
          activeType={activeType}
          onTypeChange={setActiveType}
          activeDateRange={activeDateRange}
          onDateRangeChange={setActiveDateRange}
          vendors={RETURN_VENDORS}
          activeVendor={activeVendor}
          onVendorChange={setActiveVendor}
          activeReason={activeReason}
          onReasonChange={setActiveReason}
        />
        <ReturnsTable
          returns={filteredReturns}
          totalCount={returns.length}
          searchValue={search}
          onSearchChange={setSearch}
        />
      </div>
    </AdminLayout>
  );
}
