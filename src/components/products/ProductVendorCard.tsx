import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ExternalLinkIcon } from "@/components/icons/ProductIcons";
import { TYPE_BADGE_VARIANT } from "@/components/products/ProductsTable";
import { initialsOf } from "@/lib/initials";
import { PRODUCT_VENDOR_INFO, type Product } from "@/lib/mock-data/products";

interface ProductVendorCardProps {
  product: Product;
}

/**
 * "VENDOR CARD": avatar, type/tier/product-count badges, and a link into the Vendor screens.
 * Only vendors that also exist in the full `VENDORS` mock (see `PRODUCT_VENDOR_INFO.vendorSlug`)
 * get a deep link straight to their Vendor Detail page; everyone else links to the Vendor
 * Management list instead, so the action always goes somewhere real rather than a dead end.
 */
export function ProductVendorCard({ product }: ProductVendorCardProps) {
  const vendorInfo = PRODUCT_VENDOR_INFO[product.vendorName];
  const href = vendorInfo?.vendorSlug ? `/vendors/${vendorInfo.vendorSlug}` : "/vendors";

  return (
    <Card className="w-full overflow-hidden">
      <div className="border-b border-surface-tint px-[18px] py-3.5">
        <h2 className="text-[13.5px] font-extrabold tracking-[-0.27px] text-ink">Vendor</h2>
      </div>
      <Link href={href} className="flex items-center gap-3 px-4 py-3.5 hover:bg-surface-tint">
        <Avatar
          gradient={vendorInfo?.gradient}
          initials={initialsOf(product.vendorName)}
          size={48}
          className="!rounded-xl !text-lg"
        />
        <div className="min-w-0 flex-1">
          <p className="break-words text-sm font-extrabold text-primary">{product.vendorName}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge variant={TYPE_BADGE_VARIANT[product.vendorType]}>{product.vendorType}</Badge>
            {vendorInfo && <Badge variant="muted">{vendorInfo.tier}</Badge>}
            {vendorInfo && (
              <span className="rounded-md bg-surface-tint px-2 py-0.5 text-xs font-semibold text-ink">
                {vendorInfo.productsCount} products
              </span>
            )}
          </div>
        </div>
        <ExternalLinkIcon className="size-[15px] shrink-0 text-gray-400" />
      </Link>
    </Card>
  );
}
