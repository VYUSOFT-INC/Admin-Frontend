import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { LOW_STOCK_THRESHOLD, type Product } from "@/lib/mock-data/products";

/** Swatch dot colors for the variants table's COLOR column — falls back to a neutral gray for anything not listed. */
const COLOR_SWATCH: Record<string, string> = {
  White: "#f8f8f8",
  Blue: "#93c5fd",
  Pink: "#f9a8d4",
  Yellow: "#fde047",
  Khaki: "#d6c9a1",
  Navy: "#1e3a5f",
  "Light Blue": "#93c5fd",
  "Dark Blue": "#1e3a8a",
  Charcoal: "#374151",
  Red: "#fca5a5",
  Maroon: "#7f1d1d",
  Gold: "#eab308",
  Black: "#111827",
  Grey: "#9ca3af",
  Beige: "#e7d9c2",
};

interface ProductVariantsTableProps {
  product: Product;
}

/** "VARIANTS TABLE": every size/color SKU row with stock and price, flagging low-stock rows. */
export function ProductVariantsTable({ product }: ProductVariantsTableProps) {
  const lowStockCount = product.variants.filter((variant) => variant.stock <= LOW_STOCK_THRESHOLD).length;

  return (
    <Card className="w-full overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-surface-tint px-[18px] py-3.5">
        <h2 className="text-[13.5px] font-extrabold tracking-[-0.27px] text-ink">Variants</h2>
        <p className="text-xs font-medium text-gray-500">
          {product.variants.length} variants
          {lowStockCount > 0 && <span className="font-bold text-warning"> &middot; {lowStockCount} low stock</span>}
        </p>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Size</TableHeaderCell>
            <TableHeaderCell>Color</TableHeaderCell>
            <TableHeaderCell>Stock</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.variants.map((variant, index) => {
            const isLowStock = variant.stock <= LOW_STOCK_THRESHOLD;
            return (
              <TableRow key={`${variant.size}-${variant.color}-${index}`}>
                <TableCell className="font-bold">{variant.size}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-2">
                    <span
                      className="size-3 shrink-0 rounded-[4px] border border-border"
                      style={{ backgroundColor: COLOR_SWATCH[variant.color] ?? "#e5e7eb" }}
                      aria-hidden="true"
                    />
                    {variant.color}
                  </span>
                </TableCell>
                <TableCell className={isLowStock ? "font-bold text-warning" : "font-medium"}>
                  {variant.stock}
                  {isLowStock && <span aria-label="Low stock"> &#9888;</span>}
                </TableCell>
                <TableCell className="font-medium">₹{variant.price.toLocaleString("en-IN")}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
