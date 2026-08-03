"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/Button";
import { PlusIcon } from "@/components/icons/PromotionIcons";
import { PromotionsTabs, type PromotionTab } from "@/components/promotions/PromotionsTabs";
import { CouponsTable } from "@/components/promotions/CouponsTable";
import { BannersGrid } from "@/components/promotions/BannersGrid";
import { BANNERS, COUPONS, type Banner, type Coupon } from "@/lib/mock-data/promotions";

export default function PromotionsPage() {
  // Lifted into state (not read straight off `COUPONS`/`BANNERS`) since row/card actions here —
  // status toggles, coupon delete, banner dates/images/strip fields — actually mutate the list,
  // unlike most other list screens where `PRODUCTS`/`ORDERS` etc. are only ever filtered, never
  // changed from the list itself.
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS);
  const [banners, setBanners] = useState<Banner[]>(BANNERS);
  const [activeTab, setActiveTab] = useState<PromotionTab>("coupons");

  const tabs = useMemo(
    () => [
      { label: "Coupons", value: "coupons" as const, count: coupons.length },
      { label: "Banners", value: "banners" as const, count: banners.length },
    ],
    [coupons.length, banners.length]
  );

  function handleToggleStatus(id: string) {
    setCoupons((prev) => prev.map((coupon) => (coupon.id === id ? { ...coupon, isActive: !coupon.isActive } : coupon)));
  }

  function handleDelete(id: string) {
    setCoupons((prev) => prev.filter((coupon) => coupon.id !== id));
  }

  function handleToggleBannerActive(id: string) {
    setBanners((prev) => prev.map((banner) => (banner.id === id ? { ...banner, isActive: !banner.isActive } : banner)));
  }

  function handleBannerDateChange(id: string, field: "startDate" | "endDate", value: string | null) {
    setBanners((prev) => prev.map((banner) => (banner.id === id ? { ...banner, [field]: value } : banner)));
  }

  function handleBannerImageChange(id: string, imageUrl: string | null) {
    setBanners((prev) => prev.map((banner) => (banner.id === id ? { ...banner, imageUrl } : banner)));
  }

  function handleSaveStrip(id: string, updates: { saleMessage: string; countdownEndsAt: string }) {
    setBanners((prev) => prev.map((banner) => (banner.id === id ? { ...banner, ...updates } : banner)));
  }

  return (
    <AdminLayout title="Promotions" description="Manage platform coupons and content banners">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PromotionsTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
          {/* Only shown on the Coupons tab. The Banners tab has no equivalent "Create Banner"
              button — its Figma design (node 1071:7435) is a fixed grid of six named banner
              slots the storefront already renders, not a dynamic list admins add entries to. */}
          {activeTab === "coupons" && (
            <Button href="/promotions/new" variant="primary" className="gap-[7px]">
              <PlusIcon className="size-[15px]" />
              Create Coupon
            </Button>
          )}
        </div>

        {activeTab === "coupons" ? (
          <CouponsTable
            coupons={coupons}
            totalCount={coupons.length}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        ) : (
          <BannersGrid
            banners={banners}
            onToggleActive={handleToggleBannerActive}
            onDateChange={handleBannerDateChange}
            onImageChange={handleBannerImageChange}
            onSaveStrip={handleSaveStrip}
          />
        )}
      </div>
    </AdminLayout>
  );
}
