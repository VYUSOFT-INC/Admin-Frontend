import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";

interface ProductReview {
  slug: string;
  name: string;
  vendor: string;
  sku: string;
  icon: string;
  channel: "Online Seller" | "Physical Store";
}

const PRODUCTS: ProductReview[] = [
  {
    slug: "oversized-graphic-tee",
    name: "Oversized Graphic Tee",
    vendor: "Urban Thread House",
    sku: "MV-UT-2281",
    icon: "/assets/icons/queue/tee.svg",
    channel: "Online Seller",
  },
  {
    slug: "pleated-summer-dress",
    name: "Pleated Summer Dress",
    vendor: "Green Loom Studio",
    sku: "MV-GL-1014",
    icon: "/assets/icons/queue/dress.svg",
    channel: "Online Seller",
  },
  {
    slug: "textured-linen-co-ord-set",
    name: "Textured Linen Co-ord Set",
    vendor: "North Square Atelier",
    sku: "MV-NS-7420",
    icon: "/assets/icons/queue/coord-set.svg",
    channel: "Physical Store",
  },
  {
    slug: "canvas-street-sneakers",
    name: "Canvas Street Sneakers",
    vendor: "Harbor Blend Collective",
    sku: "MV-HB-3348",
    icon: "/assets/icons/queue/sneakers.svg",
    channel: "Physical Store",
  },
];

export function PendingProductReviewsCard() {
  return (
    <Card>
      <CardHeader
        title="Pending Product Reviews"
        description="Products waiting for moderation before going live"
        action={<Button href="/products?status=pending">View Queue</Button>}
      />
      <div className="flex flex-col px-5 pb-5 pt-2">
        {PRODUCTS.map((product, index) => (
          <div
            key={product.slug}
            className={`flex items-center justify-between gap-4 py-[18px] ${
              index > 0 ? "border-t border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[10px]" style={{ backgroundImage: "linear-gradient(135deg, #fff0f3 0%, #ffe4ed 100%)" }}>
                <Image src={product.icon} alt="" width={18} height={18} />
              </span>
              <div>
                <p className="text-sm font-extrabold text-ink">{product.name}</p>
                <p className="text-xs font-medium text-gray-500">
                  {product.vendor} &middot; SKU {product.sku}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Badge variant={product.channel === "Online Seller" ? "danger" : "success"}>
                {product.channel}
              </Badge>
              <Button href={`/products/${product.slug}/review`}>Review</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
