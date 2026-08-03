"use client";

import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { OrderDetailView } from "@/components/orders/OrderDetailView";
import { ORDERS } from "@/lib/mock-data/orders";

// This page is a Client Component (matching `/orders/page.tsx`) specifically so both routes
// share the exact same in-memory `ORDERS` array instance. If this were a Server Component
// instead, `ORDERS.find(...)` would run server-side and hand the client a serialized *copy*
// of the order — mutating that copy in `OrderDetailView` would never be visible back on the
// (client-side) Order Management list, silently breaking the cross-page sync described there.

interface OrderDetailPageProps {
  params: { id: string };
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = ORDERS.find((candidate) => candidate.id === params.id);

  if (!order) {
    notFound();
  }

  return (
    <AdminLayout title="Order Detail" description={`${order.orderNumber} · ${order.vendorName}`}>
      <OrderDetailView order={order} key={order.id} />
    </AdminLayout>
  );
}
