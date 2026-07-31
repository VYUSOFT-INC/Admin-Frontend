import { notFound } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { VendorDetailView } from "@/components/vendors/VendorDetailView";
import { VENDORS } from "@/lib/mock-data/vendors";

interface VendorDetailPageProps {
  params: { slug: string };
}

export default function VendorDetailPage({ params }: VendorDetailPageProps) {
  const vendor = VENDORS.find((candidate) => candidate.slug === params.slug);

  if (!vendor) {
    notFound();
  }

  return (
    <AdminLayout title={vendor.name} description={`${vendor.category} · ${vendor.location}`}>
      <VendorDetailView vendor={vendor} key={vendor.slug} />
    </AdminLayout>
  );
}
