"use client";

import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ProductReviewView } from "@/components/products/ProductReviewView";
import { PRODUCTS } from "@/lib/mock-data/products";

// This page is a Client Component (matching `/products/page.tsx`) specifically so both routes
// share the exact same in-memory `PRODUCTS` array instance. If this were a Server Component
// instead, `PRODUCTS.find(...)` would run server-side and hand the client a serialized *copy*
// of the product — mutating that copy in `ProductReviewView` would never be visible back on
// the (client-side) Products list, silently breaking the cross-page sync described there.

interface ProductReviewPageProps {
  params: { id: string };
}

export default function ProductReviewPage({ params }: ProductReviewPageProps) {
  const product = PRODUCTS.find((candidate) => candidate.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <AdminLayout title="Product Review" description={`${product.category} · ${product.vendorName}`}>
      <ProductReviewView product={product} key={product.id} />
    </AdminLayout>
  );
}
