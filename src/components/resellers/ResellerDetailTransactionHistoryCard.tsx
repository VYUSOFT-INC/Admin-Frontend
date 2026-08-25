"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ChevronDownIcon } from "@/components/icons/VendorDetailIcons";
import { SearchIcon } from "@/components/icons/VendorIcons";
import { CalendarIcon, FilterLinesIcon } from "@/components/icons/ResellerDetailIcons";
import type { ResellerDetailData, TransactionStatus } from "@/lib/mock-data/resellers";

const STATUS_FILTER_OPTIONS: Array<TransactionStatus | "All"> = ["All", "Settled", "Pending", "Cancelled"];

const STATUS_VARIANT: Record<TransactionStatus, "success" | "warning" | "muted"> = {
  Settled: "success",
  Pending: "warning",
  Cancelled: "muted",
};

interface ResellerDetailTransactionHistoryCardProps {
  detail: ResellerDetailData;
  /** Static date-range label the Figma design shows next to the calendar icon — this reseller's
   *  transaction rows all fall within it, so it isn't wired to a picker (there is no date-range
   *  picker elsewhere in this codebase to reuse, and the design renders it without a dropdown
   *  chevron, unlike the Status filter beside it — i.e. it's a display, not a trigger). */
  dateRangeLabel: string;
}

/** "Transaction History" card shown on the Transaction History tab: search + status filters over
 *  commission records (Figma node 1177:985). Search and Status are real, working filters over
 *  `detail.transactions` — not decorative. */
export function ResellerDetailTransactionHistoryCard({ detail, dateRangeLabel }: ResellerDetailTransactionHistoryCardProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "All">("All");

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return detail.transactions.filter((transaction) => {
      const matchesStatus = statusFilter === "All" || transaction.status === statusFilter;
      const matchesSearch =
        query.length === 0 ||
        transaction.orderId.toLowerCase().includes(query) ||
        transaction.productName.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [detail.transactions, search, statusFilter]);

  return (
    <Card className="overflow-hidden">
      <CardHeader title="Transaction History" description="Commission records by order and settlement state" />

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-4 pt-1">
        <div className="flex min-h-[42px] items-center gap-2.5 rounded-[10px] border border-[#f2dfe6] bg-white px-[17px]">
          <CalendarIcon className="size-4 shrink-0 text-gray-500" />
          <span className="text-[13px] font-medium text-gray-500">Date range</span>
          <span className="whitespace-nowrap text-[13px] font-bold text-ink">{dateRangeLabel}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-h-[42px] min-w-[220px] items-center gap-2.5 rounded-[10px] border border-[#f2dfe6] bg-white px-[17px]">
            <SearchIcon className="size-4 shrink-0 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search order / product"
              className="w-full min-w-0 bg-transparent text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
            />
          </div>

          <div className="relative flex min-h-[42px] min-w-[220px] items-center gap-2.5 rounded-[10px] border border-[#f2dfe6] bg-white px-[17px]">
            <FilterLinesIcon className="size-4 shrink-0 text-gray-500" />
            <span className="text-[13px] font-medium text-gray-500">Status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as TransactionStatus | "All")}
              aria-label="Filter by settlement status"
              className="flex-1 appearance-none bg-transparent pr-5 text-[13px] font-bold text-ink focus:outline-none"
            >
              {STATUS_FILTER_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All / Settled / Pending / Cancelled" : option}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3.5 size-3.5 text-gray-500" />
          </div>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Product name</TableHeaderCell>
            <TableHeaderCell>Sale Date</TableHeaderCell>
            <TableHeaderCell>Sale Amount (₹)</TableHeaderCell>
            <TableHeaderCell>Commission %</TableHeaderCell>
            <TableHeaderCell>Commission Earned (₹)</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.orderId}>
              <TableCell className="font-medium">{transaction.orderId}</TableCell>
              <TableCell className="font-bold">{transaction.productName}</TableCell>
              <TableCell className="font-medium">{transaction.saleDate}</TableCell>
              <TableCell className="font-medium">{transaction.saleAmount}</TableCell>
              <TableCell className="font-medium">{transaction.commissionPercent}</TableCell>
              <TableCell className="font-medium">{transaction.commissionEarned}</TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[transaction.status]}>{transaction.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
          {filteredTransactions.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="py-10 text-center text-sm font-semibold text-gray-500">
                No transactions match the current filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
