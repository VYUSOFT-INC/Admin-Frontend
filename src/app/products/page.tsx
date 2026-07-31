"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProductFiltersBar } from "@/components/products/ProductFiltersBar";
import { ProductStatusTabs } from "@/components/products/ProductStatusTabs";
import { ProductsTable } from "@/components/products/ProductsTable";
import {
  CATEGORY_OPTIONS,
  PRODUCTS,
  STATUS_TABS,
  TYPE_TABS,
  VENDOR_OPTIONS,
  type FulfillmentType,
  type ProductStatus,
} from "@/lib/mock-data/products";
import type { VendorType } from "@/lib/mock-data/vendors";

export default function ProductsPage() {
  // `PRODUCTS` is read fresh on every mount of this page (not copied into local state), so
  // navigating back from `/products/[id]` after an approve/reject — which mutates the shared
  // `Product` object in place, see `ProductReviewView` — shows the updated status here too.
  const products = PRODUCTS;
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<ProductStatus | "All">("All");
  const [activeType, setActiveType] = useState<VendorType | "All">("All");
  const [activeCategory, setActiveCategory] = useState<string | "All">("All");
  const [activeVendor, setActiveVendor] = useState<string | "All">("All");
  const [activeFulfillment, setActiveFulfillment] = useState<FulfillmentType | "All">("All");

  const statusCounts = useMemo(() => {
    const counts: Partial<Record<ProductStatus | "All", number>> = { All: products.length };
    for (const product of products) {
      counts[product.status] = (counts[product.status] ?? 0) + 1;
    }
    return counts;
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesStatus = activeStatus === "All" || product.status === activeStatus;
      const matchesType = activeType === "All" || product.vendorType === activeType;
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesVendor = activeVendor === "All" || product.vendorName === activeVendor;
      const matchesFulfillment = activeFulfillment === "All" || product.fulfillment === activeFulfillment;
      const matchesSearch =
        query.length === 0 ||
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.vendorName.toLowerCase().includes(query);
      return matchesStatus && matchesType && matchesCategory && matchesVendor && matchesFulfillment && matchesSearch;
    });
  }, [products, search, activeStatus, activeType, activeCategory, activeVendor, activeFulfillment]);

  return (
    <AdminLayout title="Products" description="Review and moderate catalog submissions">
      <div className="flex flex-col gap-5">
        <ProductStatusTabs tabs={STATUS_TABS} active={activeStatus} onChange={setActiveStatus} counts={statusCounts} />
        <ProductFiltersBar
          typeTabs={TYPE_TABS}
          activeType={activeType}
          onTypeChange={setActiveType}
          categoryOptions={CATEGORY_OPTIONS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          vendorOptions={VENDOR_OPTIONS}
          activeVendor={activeVendor}
          onVendorChange={setActiveVendor}
          activeFulfillment={activeFulfillment}
          onFulfillmentChange={setActiveFulfillment}
        />
        <ProductsTable
          products={filteredProducts}
          totalCount={products.length}
          searchValue={search}
          onSearchChange={setSearch}
        />
      </div>
    </AdminLayout>
  );
}
