"use client";

import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/VendorIcons";
import type { SupportTicket, TicketCategory, TicketPriority, TicketRaisedByType, TicketStatus } from "@/lib/mock-data/support";

export const RAISED_BY_BADGE_VARIANT: Record<TicketRaisedByType, BadgeVariant> = {
  Vendor: "info",
  Customer: "purple",
};

export const CATEGORY_BADGE_VARIANT: Record<TicketCategory, BadgeVariant> = {
  Pickup: "purple",
  Delivery: "info",
  "Walk-in": "sky",
  General: "muted",
};

export const PRIORITY_BADGE_VARIANT: Record<TicketPriority, BadgeVariant> = {
  Low: "success",
  Medium: "warning",
  High: "danger",
};

/** Matches the Figma reference exactly for Escalated (bg-[#fbe5ea]/text-[#d6002e] — the same
 * `danger` token); Open/In Progress/Resolved get info/warning/success respectively so all four
 * statuses stay visually distinct from the Vendor/Customer type badge in the same row. */
export const STATUS_BADGE_VARIANT: Record<TicketStatus, BadgeVariant> = {
  Open: "info",
  "In Progress": "warning",
  Resolved: "success",
  Escalated: "danger",
};

interface TicketListProps {
  tickets: SupportTicket[];
  totalCount: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/** LEFT: Ticket List — a compact table (id+date / type / issue / subject+requester / priority /
 * status) whose rows select a ticket for the detail panel on the right, matching the Figma
 * reference's "LEFT: Ticket List" split-layout pane. */
export function TicketList({ tickets, totalCount, selectedId, onSelect }: TicketListProps) {
  return (
    <Card className="flex h-[640px] w-full shrink-0 flex-col overflow-hidden lg:w-[420px]">
      <div className="flex-1 overflow-y-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell className="px-3">Ticket</TableHeaderCell>
              <TableHeaderCell className="px-3">Type</TableHeaderCell>
              <TableHeaderCell className="px-3">Issue</TableHeaderCell>
              <TableHeaderCell className="px-3">Subject / Raised By</TableHeaderCell>
              <TableHeaderCell className="px-3">Priority</TableHeaderCell>
              <TableHeaderCell className="px-3">Status</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => {
              const isSelected = ticket.id === selectedId;
              return (
                <TableRow
                  key={ticket.id}
                  onClick={() => onSelect(ticket.id)}
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(ticket.id);
                    }
                  }}
                  aria-label={`View ${ticket.ticketNumber}`}
                  aria-current={isSelected}
                  className={`cursor-pointer transition-colors ${isSelected ? "bg-primary-lighter" : "hover:bg-surface-tint"}`}
                >
                  <TableCell className="px-3 py-2.5">
                    <p className="min-w-0 whitespace-nowrap break-words text-[12px] font-bold text-ink">{ticket.ticketNumber}</p>
                    <p className="mt-0.5 min-w-0 whitespace-nowrap text-[11px] font-medium text-gray-500">{ticket.date}</p>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <Badge variant={RAISED_BY_BADGE_VARIANT[ticket.raisedByType]} className="text-[10px]">
                      {ticket.raisedByType}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <Badge variant={CATEGORY_BADGE_VARIANT[ticket.category]} className="text-[10px]">
                      {ticket.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <div className="min-w-0 max-w-[170px]">
                      <p className="break-words text-[12px] font-bold text-ink">{ticket.subject}</p>
                      <p className="mt-0.5 min-w-0 break-words text-[11px] font-medium text-gray-400">{ticket.requesterName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <Badge variant={PRIORITY_BADGE_VARIANT[ticket.priority]} className="text-[10px]">
                      {ticket.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-3 py-2.5">
                    <Badge variant={STATUS_BADGE_VARIANT[ticket.status]} className="text-[10px]">
                      {ticket.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
            {tickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm font-semibold text-gray-500">
                  No tickets match the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination footer. Like `ReturnsPagination`/`VendorsPagination`, the bundled mock
          dataset (12 tickets — see `src/lib/mock-data/support.ts`) only ever fills a single page,
          unlike the Figma reference's "Showing 1–10 of 48" implying several pages, so Prev/Next
          stay disabled and only page "1" is active. */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-[#fffcfd] px-3.5 py-3">
        <p className="text-[11px] font-semibold text-gray-500">
          Showing <span className="font-bold text-ink">{tickets.length}</span> of{" "}
          <span className="font-bold text-ink">{totalCount}</span> tickets
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled
            aria-label="Previous page"
            className="flex h-[30px] items-center gap-1 rounded-[10px] border border-border bg-white px-3 text-xs font-semibold text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeftIcon className="size-3" />
            Prev
          </button>
          <button
            type="button"
            className="flex h-[30px] min-w-[30px] items-center justify-center rounded-[10px] bg-primary text-xs font-bold text-white"
          >
            1
          </button>
          <button
            type="button"
            disabled
            aria-label="Next page"
            className="flex h-[30px] items-center gap-1 rounded-[10px] border border-border bg-white px-3 text-xs font-semibold text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRightIcon className="size-3" />
          </button>
        </div>
      </div>
    </Card>
  );
}
