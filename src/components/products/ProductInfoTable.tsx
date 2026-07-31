import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import type { Product } from "@/lib/mock-data/products";

interface ProductInfoTableProps {
  product: Product;
}

interface InfoRow {
  label: string;
  value: ReactNode;
}

/** "PRODUCT INFORMATION": category/pricing/stock/variant-summary/fabric/fit key-value rows. */
export function ProductInfoTable({ product }: ProductInfoTableProps) {
  const totalStock = product.variants.reduce((sum, variant) => sum + variant.stock, 0);
  const sizeCount = new Set(product.variants.map((variant) => variant.size)).size;
  const colorCount = new Set(product.variants.map((variant) => variant.color)).size;
  const hasDiscount = product.comparePrice > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.comparePrice) * 100) : 0;

  const rows: InfoRow[] = [
    { label: "Category", value: product.category },
    { label: "Selling Price", value: <span className="text-primary">₹{product.price.toLocaleString("en-IN")}</span> },
    ...(hasDiscount
      ? ([
          {
            label: "Compare Price (MRP)",
            value: <span className="text-gray-400 line-through">₹{product.comparePrice.toLocaleString("en-IN")}</span>,
          },
          {
            label: "Discount %",
            value: (
              <span className="inline-flex items-center rounded-md bg-success-light px-2 py-0.5 text-xs font-bold text-success">
                {discountPercent}% OFF
              </span>
            ),
          },
        ] satisfies InfoRow[])
      : []),
    { label: "SKU", value: <span className="font-mono text-[12.5px] font-bold">{product.sku}</span> },
    { label: "Total Stock", value: `${totalStock} units` },
    {
      label: "Variants",
      value: `${sizeCount} ${sizeCount === 1 ? "size" : "sizes"} × ${colorCount} ${colorCount === 1 ? "color" : "colors"}`,
    },
    { label: "Fabric", value: product.fabric },
    { label: "Fit Type", value: product.fitType },
  ];

  return (
    <Card className="w-full overflow-hidden">
      <div className="border-b border-surface-tint px-[18px] py-3.5">
        <h2 className="text-[13.5px] font-extrabold tracking-[-0.27px] text-ink">Product Information</h2>
      </div>
      <div className="px-[18px]">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-4 border-b border-surface-tint py-2.5 last:border-b-0">
            <p className="min-w-0 shrink-0 basis-[42%] text-[13px] font-semibold text-gray-500">{row.label}</p>
            <div className="min-w-0 flex-1 break-words text-right text-[13px] font-bold text-ink">{row.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
