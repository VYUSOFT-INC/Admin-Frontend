"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import type { InventoryItem, StockStatus } from "@/lib/mock-data/inventory";
import { InventoryPagination } from "@/components/inventory/InventoryPagination";

const STOCK_STATUS_BADGE_VARIANT: Record<StockStatus, BadgeVariant> = {
  Healthy: "success",
  "Low Stock": "warning",
  "Out of Stock": "danger",
};

const PAGE_SIZE = 8;

interface InventoryTableProps {
  /** Full filtered set (every matching row across every page). */
  items: InventoryItem[];
}

/** "Inventory Overview" card: product/vendor/category/stock table + pagination. Notify Vendor
 *  is real, local state — clicking it marks that row as notified (disables the button, flips
 *  its label) instead of doing nothing, per the Vendor Management screen's earlier no-op-button bug. */
export function InventoryTable({ items }: InventoryTableProps) {
  const [page, setPage] = useState(1);
  const [notifiedIds, setNotifiedIds] = useState<Set<string>>(new Set());

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function goToPage(nextPage: number) {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  function notifyVendor(itemId: string) {
    setNotifiedIds((current) => {
      const next = new Set(current);
      next.add(itemId);
      return next;
    });
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border px-[18px] pb-4 pt-[18px]">
        <h2 className="text-base font-extrabold text-ink">Inventory Overview</h2>
        <p className="mt-0.5 text-xs font-medium text-gray-500">Stock health by product, vendor, and latest inventory update</p>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Vendor</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Current Stock</TableHeaderCell>
            <TableHeaderCell>Stock Status</TableHeaderCell>
            <TableHeaderCell>Last Updated</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pageItems.map((item) => {
            const needsAttention = item.stockStatus !== "Healthy";
            const isNotified = notifiedIds.has(item.id);
            const productHref = item.productId ? `/products/${item.productId}` : "/products";
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-[10px] border border-border bg-surface-tint">
                      <Image src={item.imageUrl} alt={item.productName} fill sizes="48px" className="object-cover" />
                    </div>
                    <div className="min-w-0 max-w-[220px]">
                      <p className="break-words font-bold">{item.productName}</p>
                      <p className="mt-0.5 break-words text-xs font-medium text-gray-500">SKU {item.sku}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex min-w-0 flex-col items-start gap-2">
                    <p className="min-w-0 break-words font-bold">{item.vendorName}</p>
                    <Badge variant="vendorTag">{item.vendorType}</Badge>
                  </div>
                </TableCell>
                <TableCell className="font-bold">{item.category}</TableCell>
                <TableCell className="font-bold">{item.currentStock}</TableCell>
                <TableCell>
                  <Badge variant={STOCK_STATUS_BADGE_VARIANT[item.stockStatus]}>{item.stockStatus}</Badge>
                </TableCell>
                <TableCell className="whitespace-nowrap text-[13px] font-medium text-gray-500">{item.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex min-w-0 flex-col items-start gap-2">
                    {needsAttention && (
                      <button
                        type="button"
                        onClick={() => notifyVendor(item.id)}
                        disabled={isNotified}
                        className="min-h-[32px] whitespace-nowrap rounded-[10px] border border-border bg-white px-3.5 text-xs font-bold text-ink transition-colors hover:bg-surface-tint disabled:cursor-not-allowed disabled:bg-surface-tint disabled:text-gray-400"
                      >
                        {isNotified ? "Notified" : "Notify Vendor"}
                      </button>
                    )}
                    <Link href={productHref} className="whitespace-nowrap text-[13px] font-bold text-primary hover:underline">
                      View Product
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {pageItems.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-sm font-semibold text-gray-500">
                No inventory rows match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <InventoryPagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={goToPage}
        shownCount={pageItems.length}
        filteredCount={items.length}
      />
    </Card>
  );
}
