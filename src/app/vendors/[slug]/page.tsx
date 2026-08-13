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

  // Physical Store vendors get a description that reflects the extra Overview-tab sections
  // this screen shows them (Store Hours, Store Location, KYC, Performance) — see
  // `VendorDetailView` — rather than the plain category/location line Online Sellers keep.
  const description =
    vendor.type === "Physical Store"
      ? "Review store information, KYC, operations, and performance"
      : `${vendor.category} · ${vendor.location}`;

  return (
    <AdminLayout title={vendor.name} description={description}>
      <VendorDetailView vendor={vendor} key={vendor.slug} />
    </AdminLayout>
  );
}
