"use client";

import Image from "next/image";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ExportIcon, SearchIcon } from "@/components/icons/VendorIcons";
import { EyeIcon } from "@/components/icons/ProductIcons";
import type { FulfillmentType, Product, ProductStatus } from "@/lib/mock-data/products";
import type { VendorType } from "@/lib/mock-data/vendors";
import { ProductsPagination } from "@/components/products/ProductsPagination";

/** Shared with the quick-view modal so badge colors stay consistent everywhere they're shown. */
export const TYPE_BADGE_VARIANT: Record<VendorType, BadgeVariant> = {
  "Online Seller": "info",
  "Physical Store": "success",
};

export const STATUS_BADGE_VARIANT: Record<ProductStatus, BadgeVariant> = {
  Pending: "warning",
  Approved: "success",
  Rejected: "muted",
  Flagged: "danger",
};

export const FULFILLMENT_BADGE_VARIANT: Record<FulfillmentType, BadgeVariant> = {
  Delivery: "info",
  "In-Store Pickup": "purple",
  "Walk-in": "success",
};

interface ProductsTableProps {
  products: Product[];
  totalCount: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

/** "All Products" card: search + export, the products table, and pagination. */
export function ProductsTable({ products, totalCount, searchValue, onSearchChange }: ProductsTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-[18px]">
        <div>
          <h2 className="text-base font-extrabold text-ink">All Products</h2>
          <p className="mt-0.5 text-xs font-medium text-gray-500">
            Showing {products.length} of {totalCount} products &mdash; sorted by submission date
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex min-h-[38px] items-center gap-2 rounded-[10px] border border-border bg-surface-tint px-3">
            <SearchIcon className="size-3.5 text-gray-500" />
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search products, SKU or vendor..."
              className="w-52 bg-transparent text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <Button type="button" className="gap-2">
            <ExportIcon className="size-3" />
            Export
          </Button>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Product Name</TableHeaderCell>
            <TableHeaderCell>Vendor</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Fulfillment</TableHeaderCell>
            <TableHeaderCell>Submitted</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="relative size-11 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-tint">
                    <Image src={product.imageUrl} alt={product.name} fill sizes="44px" className="object-cover" priority />
                  </div>
                  <div className="min-w-0 max-w-[180px]">
                    <p className="break-words font-extrabold">{product.name}</p>
                    <p className="mt-0.5 break-words text-[11.5px] font-medium text-gray-400">SKU: {product.sku}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-start gap-1">
                  <p className="break-words font-semibold">{product.vendorName}</p>
                  <Badge variant={TYPE_BADGE_VARIANT[product.vendorType]}>{product.vendorType}</Badge>
                </div>
              </TableCell>
              <TableCell className="font-medium">{product.category}</TableCell>
              <TableCell className="font-bold">₹{product.price.toLocaleString("en-IN")}</TableCell>
              <TableCell>
                <Badge variant={FULFILLMENT_BADGE_VARIANT[product.fulfillment]}>{product.fulfillment}</Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap text-[12.5px] font-medium text-gray-500">
                {product.submittedDate}
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-start gap-1">
                  <Badge variant={STATUS_BADGE_VARIANT[product.status]}>{product.status}</Badge>
                  <p className="text-[11px] font-medium text-gray-400">{product.statusReason}</p>
                </div>
              </TableCell>
              <TableCell>
                {product.status === "Pending" || product.status === "Flagged" ? (
                  <Button
                    href={`/products/${product.id}`}
                    className="min-h-[30px] gap-1.5 border-[#fecdd3] bg-primary-soft px-3.5 text-xs text-primary hover:bg-primary-soft"
                  >
                    <EyeIcon className="size-3" />
                    Review
                  </Button>
                ) : (
                  <Button href={`/products/${product.id}`} className="min-h-[30px] px-3.5 text-xs">
                    View
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="py-10 text-center text-sm font-semibold text-gray-500">
                No products match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ProductsPagination shownCount={products.length} totalCount={totalCount} />
    </Card>
  );
}
