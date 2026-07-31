"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductActionsCard } from "@/components/products/ProductActionsCard";
import { ProductGalleryCard } from "@/components/products/ProductGalleryCard";
import { ProductInfoTable } from "@/components/products/ProductInfoTable";
import { ProductKycSummaryCard } from "@/components/products/ProductKycSummaryCard";
import { ProductQualityChecklistCard } from "@/components/products/ProductQualityChecklistCard";
import { ProductReviewHeader } from "@/components/products/ProductReviewHeader";
import { ProductVariantsTable } from "@/components/products/ProductVariantsTable";
import { ProductVendorCard } from "@/components/products/ProductVendorCard";
import type { Product, ProductStatus } from "@/lib/mock-data/products";

interface ProductReviewViewProps {
  product: Product;
}

/**
 * Client-side shell for the Product Review screen. Owns the (locally optimistic) moderation
 * status shown across the header/actions card.
 *
 * There is no backend, so — matching the precedent set by `VendorDetailView` — approving or
 * rejecting also mutates the exact `Product` object this page was given in place (it's the
 * same object reference held inside the shared `PRODUCTS` array from `lib/mock-data/products`,
 * not a copy). That keeps this screen consistent with the Products list: navigating back via
 * `router.push` remounts `/products`, which re-reads `PRODUCTS` and picks up the change. A hard
 * page reload would of course reset everything to the bundled mock data, same as every other
 * screen in this app.
 *
 * The parent page renders this with `key={product.id}`, so React remounts it (resetting local
 * state) when navigating from one product's review screen directly to another's.
 */
export function ProductReviewView({ product }: ProductReviewViewProps) {
  const router = useRouter();
  const [status, setStatus] = useState<ProductStatus>(product.status);

  function commitStatus(next: ProductStatus, reason: string) {
    product.status = next;
    product.statusReason = reason;
    setStatus(next);
    router.push("/products");
  }

  function handleApprove() {
    commitStatus("Approved", "Manually reviewed");
  }

  function handleReject() {
    commitStatus("Rejected", "Manually reviewed");
  }

  return (
    <div className="flex flex-col gap-5">
      <ProductReviewHeader product={product} status={status} />

      <div className="flex flex-col items-start gap-5 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <ProductGalleryCard product={product} />
          <ProductInfoTable product={product} />
          <ProductVariantsTable product={product} />
        </div>

        <div className="flex w-full flex-col gap-4 lg:w-[400px] lg:shrink-0">
          <ProductVendorCard product={product} />
          <ProductQualityChecklistCard product={product} />
          <ProductActionsCard product={product} status={status} onApprove={handleApprove} onReject={handleReject} />
          <ProductKycSummaryCard product={product} />
        </div>
      </div>
    </div>
  );
}
