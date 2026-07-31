import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { BackArrowIcon } from "@/components/icons/VendorDetailIcons";
import { ChevronRightIcon } from "@/components/icons/VendorIcons";
import { FULFILLMENT_BADGE_VARIANT, STATUS_BADGE_VARIANT } from "@/components/products/ProductsTable";
import type { Product, ProductStatus } from "@/lib/mock-data/products";

const STATUS_LABEL: Record<ProductStatus, string> = {
  Pending: "Pending Review",
  Approved: "Approved",
  Rejected: "Rejected",
  Flagged: "Flagged",
};

interface ProductReviewHeaderProps {
  product: Product;
  status: ProductStatus;
}

/** Breadcrumb + page-header band for the Product Review screen: back link, SKU/date/fulfillment meta, and the current status badge. */
export function ProductReviewHeader({ product, status }: ProductReviewHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-primary">
        <Link href="/products" className="hover:underline">
          Products
        </Link>
        <ChevronRightIcon className="size-3" />
        <span className="font-bold">{product.name}</span>
      </nav>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/products"
          aria-label="Back to products"
          className="flex size-[34px] shrink-0 items-center justify-center rounded-lg border border-border bg-white text-ink hover:bg-surface-tint"
        >
          <BackArrowIcon className="size-4" />
        </Link>
        <div className="min-w-0">
          <h1 className="break-words text-[22px] font-extrabold tracking-[-0.66px] text-ink">{product.name}</h1>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12.5px] font-medium text-gray-500">
            <span>
              SKU: <span className="font-bold text-ink">{product.sku}</span>
            </span>
            <span className="text-gray-300">&middot;</span>
            <span>Submitted {product.submittedDate}</span>
            <span className="text-gray-300">&middot;</span>
            <span>Fulfillment:</span>
            <Badge variant={FULFILLMENT_BADGE_VARIANT[product.fulfillment]}>{product.fulfillment}</Badge>
          </p>
        </div>
        <Badge variant={STATUS_BADGE_VARIANT[status]} className="ml-auto">
          {STATUS_LABEL[status]}
        </Badge>
      </div>
    </div>
  );
}
