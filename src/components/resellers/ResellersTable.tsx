"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { LinkIcon } from "@/components/icons/ResellerIcons";
import type { Reseller, ResellerStatus, ResellerTier } from "@/lib/mock-data/resellers";
import { ResellersPagination } from "@/components/resellers/ResellersPagination";

/** Shared with the future Reseller Detail screen so tier/status colors stay consistent across
 *  both (same pattern as `VendorsTable`'s exported `TYPE_BADGE_VARIANT`/`STATUS_BADGE_VARIANT`). */
export const TIER_BADGE_VARIANT: Record<ResellerTier, BadgeVariant> = {
  Starter: "starterTier",
  Silver: "silver",
  Gold: "gold",
};

export const STATUS_BADGE_VARIANT: Record<ResellerStatus, BadgeVariant> = {
  Active: "success",
  Suspended: "danger",
  Pending: "warning",
};

const DEFAULT_ROWS_PER_PAGE = 10;

interface ResellersTableProps {
  /** Full filtered set (every matching row across every page). */
  resellers: Reseller[];
  onVerify: (slug: string) => void;
  onReinstate: (slug: string) => void;
}

/** "Resellers" table card: name/tier/sales/commission/links/status columns, row actions, and a
 *  paginated footer. Verify/Reinstate are real, local state — clicking them flips that row's
 *  status to Active instead of doing nothing, per the Vendor Management screen's earlier
 *  no-op-button bug (see `VendorsTable`'s `onReinstate`). */
export function ResellersTable({ resellers, onVerify, onReinstate }: ResellersTableProps) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const totalPages = Math.max(1, Math.ceil(resellers.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const pageRows = resellers.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  function goToPage(nextPage: number) {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  function changeRowsPerPage(rows: number) {
    setRowsPerPage(rows);
    setPage(1);
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Reseller Name</TableHeaderCell>
            <TableHeaderCell>Plan Tier</TableHeaderCell>
            <TableHeaderCell>Total Sales Generated (₹)</TableHeaderCell>
            <TableHeaderCell>Commission Earned (₹)</TableHeaderCell>
            <TableHeaderCell>Active Links</TableHeaderCell>
            <TableHeaderCell>Joined Date</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pageRows.map((reseller) => (
            <TableRow key={reseller.slug}>
              <TableCell>
                <div className="flex min-w-0 items-center gap-2.5">
                  <div className="relative size-[34px] shrink-0 overflow-hidden rounded-full">
                    <Image src={reseller.avatarUrl} alt="" fill sizes="34px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="break-words font-bold">{reseller.name}</p>
                    <p className="mt-0.5 break-words text-xs font-medium text-gray-500">{reseller.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={TIER_BADGE_VARIANT[reseller.tier]}>{reseller.tier}</Badge>
              </TableCell>
              <TableCell className="font-bold">{reseller.totalSalesGenerated}</TableCell>
              <TableCell className="font-bold">{reseller.commissionEarned}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 font-bold">
                  <LinkIcon className="size-3.5 shrink-0 text-gray-500" />
                  {reseller.activeLinks}
                </div>
              </TableCell>
              <TableCell className="font-medium">{reseller.joinedDate}</TableCell>
              <TableCell>
                <Badge variant={STATUS_BADGE_VARIANT[reseller.status]}>{reseller.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-start gap-2">
                  {reseller.status === "Pending" ? (
                    <Button type="button" variant="primary" onClick={() => onVerify(reseller.slug)} className="min-h-[30px] px-3.5 text-xs">
                      Verify
                    </Button>
                  ) : (
                    <Button href={`/resellers/${reseller.slug}`} className="min-h-[30px] px-3.5 text-xs">
                      View
                    </Button>
                  )}
                  {reseller.status === "Suspended" && (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => onReinstate(reseller.slug)}
                      className="min-h-[30px] px-3.5 text-xs"
                    >
                      Reinstate
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {pageRows.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="py-10 text-center text-sm font-semibold text-gray-500">
                No resellers match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ResellersPagination
        currentPage={safePage}
        totalPages={totalPages}
        onPageChange={goToPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={changeRowsPerPage}
        filteredCount={resellers.length}
      />
    </Card>
  );
}
