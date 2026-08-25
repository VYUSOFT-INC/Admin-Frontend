import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ResellerDetailView } from "@/components/resellers/ResellerDetailView";
import { RESELLERS } from "@/lib/mock-data/resellers";

interface ResellerDetailPageProps {
  params: { slug: string };
}

export default function ResellerDetailPage({ params }: ResellerDetailPageProps) {
  const reseller = RESELLERS.find((candidate) => candidate.slug === params.slug);

  if (!reseller) {
    notFound();
  }

  return (
    <AdminLayout title="Reseller Detail" description="Review reseller profile, payouts, performance, and account controls">
      <ResellerDetailView reseller={reseller} key={reseller.slug} />
    </AdminLayout>
  );
}
