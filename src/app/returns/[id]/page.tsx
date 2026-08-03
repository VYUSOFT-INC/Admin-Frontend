"use client";

import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ReturnDetailView } from "@/components/returns/ReturnDetailView";
import { RETURNS } from "@/lib/mock-data/returns";

// This page is a Client Component (matching `/returns/page.tsx`) specifically so both routes
// share the exact same in-memory `RETURNS` array instance. If this were a Server Component
// instead, `RETURNS.find(...)` would run server-side and hand the client a serialized *copy*
// of the return — mutating that copy in `ReturnDetailView` would never be visible back on the
// (client-side) Returns and Refunds list, silently breaking the cross-page sync described there.

interface ReturnDetailPageProps {
  params: { id: string };
}

export default function ReturnDetailPage({ params }: ReturnDetailPageProps) {
  const returnRequest = RETURNS.find((candidate) => candidate.id === params.id);

  if (!returnRequest) {
    notFound();
  }

  return (
    <AdminLayout title="Return Review" description={`${returnRequest.returnNumber} · ${returnRequest.vendorName}`}>
      <ReturnDetailView returnRequest={returnRequest} key={returnRequest.id} />
    </AdminLayout>
  );
}
