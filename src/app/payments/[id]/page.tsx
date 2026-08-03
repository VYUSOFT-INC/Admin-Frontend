"use client";

import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { PayoutDetailView } from "@/components/payments/PayoutDetailView";
import { PAYOUTS } from "@/lib/mock-data/payments";

// This page is a Client Component (matching `/payments/page.tsx`) specifically so both routes
// share the exact same in-memory `PAYOUTS` array instance. If this were a Server Component
// instead, `PAYOUTS.find(...)` would run server-side and hand the client a serialized *copy*
// of the payout — mutating that copy in `PayoutDetailView` would never be visible back on the
// (client-side) Payments & Payouts list, silently breaking the cross-page sync described there.

interface PayoutDetailPageProps {
  params: { id: string };
}

export default function PayoutDetailPage({ params }: PayoutDetailPageProps) {
  const payout = PAYOUTS.find((candidate) => candidate.id === params.id);

  if (!payout) {
    notFound();
  }

  return (
    <AdminLayout title="Payout Detail" description={`${payout.payoutNumber} · ${payout.vendorName}`}>
      <PayoutDetailView payout={payout} key={payout.id} />
    </AdminLayout>
  );
}
