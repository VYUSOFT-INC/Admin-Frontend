"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { InventoryFiltersBar } from "@/components/inventory/InventoryFiltersBar";
import { InventoryStatsCards } from "@/components/inventory/InventoryStatsCards";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { InventoryTabs } from "@/components/inventory/InventoryTabs";
import { INVENTORY_CATEGORY_OPTIONS, INVENTORY_ITEMS, INVENTORY_VENDOR_OPTIONS, type StockStatus } from "@/lib/mock-data/inventory";
import type { VendorType } from "@/lib/mock-data/vendors";

export default function InventoryPage() {
  const [activeCategory, setActiveCategory] = useState<string | "All">("All");
  const [activeVendor, setActiveVendor] = useState<string | "All">("All");
  const [activeType, setActiveType] = useState<VendorType | "All">("All");
  const [activeStockStatus, setActiveStockStatus] = useState<StockStatus | "All">("All");

  const filteredItems = useMemo(() => {
    return INVENTORY_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesVendor = activeVendor === "All" || item.vendorName === activeVendor;
      const matchesType = activeType === "All" || item.vendorType === activeType;
      const matchesStockStatus = activeStockStatus === "All" || item.stockStatus === activeStockStatus;
      return matchesCategory && matchesVendor && matchesType && matchesStockStatus;
    });
  }, [activeCategory, activeVendor, activeType, activeStockStatus]);

  return (
    <AdminLayout title="Inventory Management" description="Monitor stock health across products, vendors, and fulfillment types">
      <div className="flex flex-col gap-5">
        <InventoryTabs />
        <InventoryStatsCards />
        <InventoryFiltersBar
          categoryOptions={INVENTORY_CATEGORY_OPTIONS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          vendorOptions={INVENTORY_VENDOR_OPTIONS}
          activeVendor={activeVendor}
          onVendorChange={setActiveVendor}
          activeType={activeType}
          onTypeChange={setActiveType}
          activeStockStatus={activeStockStatus}
          onStockStatusChange={setActiveStockStatus}
        />
        <InventoryTable items={filteredItems} />
      </div>
    </AdminLayout>
  );
}
