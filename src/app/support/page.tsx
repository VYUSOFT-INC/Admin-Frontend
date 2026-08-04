"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { SupportFiltersBar } from "@/components/support/SupportFiltersBar";
import { SupportStatusTabs } from "@/components/support/SupportStatusTabs";
import { TicketDetailPanel } from "@/components/support/TicketDetailPanel";
import { TicketList } from "@/components/support/TicketList";
import {
  CATEGORY_OPTIONS,
  PRIORITY_OPTIONS,
  RAISED_BY_TABS,
  STATUS_TABS,
  SUPPORT_TICKETS,
  type TicketCategory,
  type TicketPriority,
  type TicketRaisedByType,
  type TicketStatus,
} from "@/lib/mock-data/support";

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState(SUPPORT_TICKETS);
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<TicketStatus | "All">("All");
  const [activeRaisedBy, setActiveRaisedBy] = useState<TicketRaisedByType | "All">("All");
  const [activeCategory, setActiveCategory] = useState<TicketCategory | "All">("All");
  const [activePriority, setActivePriority] = useState<TicketPriority | "All">("All");
  const [selectedId, setSelectedId] = useState<string | null>(tickets[0]?.id ?? null);

  // Status tab counts are always derived from the full, unfiltered dataset — the same rule
  // `PayoutStatsCards`/`OrdersPage` follow — so switching the Type/Category/Priority filters
  // never makes a tab's own count drift from what's actually in that status.
  const statusCounts = useMemo(() => {
    const counts: Partial<Record<TicketStatus | "All", number>> = { All: tickets.length };
    for (const ticket of tickets) {
      counts[ticket.status] = (counts[ticket.status] ?? 0) + 1;
    }
    return counts;
  }, [tickets]);

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();
    return tickets.filter((ticket) => {
      const matchesStatus = activeStatus === "All" || ticket.status === activeStatus;
      const matchesRaisedBy = activeRaisedBy === "All" || ticket.raisedByType === activeRaisedBy;
      const matchesCategory = activeCategory === "All" || ticket.category === activeCategory;
      const matchesPriority = activePriority === "All" || ticket.priority === activePriority;
      const matchesSearch =
        query.length === 0 ||
        ticket.ticketNumber.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.requesterName.toLowerCase().includes(query) ||
        ticket.requesterEmail.toLowerCase().includes(query);
      return matchesStatus && matchesRaisedBy && matchesCategory && matchesPriority && matchesSearch;
    });
  }, [tickets, search, activeStatus, activeRaisedBy, activeCategory, activePriority]);

  // Looked up from the full `tickets` array (not `filteredTickets`) so marking a ticket
  // Resolved/Escalated while a different status tab is active doesn't yank the detail panel
  // out from under the admin just because the ticket no longer matches the active filters.
  const selectedTicket = tickets.find((ticket) => ticket.id === selectedId) ?? null;

  function updateTicketStatus(id: string, status: TicketStatus) {
    setTickets((prev) => prev.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket)));
  }

  function handleSendReply(id: string, message: string) {
    setTickets((prev) =>
      prev.map((ticket) => {
        if (ticket.id !== id) return ticket;
        const timestamp = new Date().toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
        });
        return {
          ...ticket,
          status: ticket.status === "Open" ? "In Progress" : ticket.status,
          conversation: [...ticket.conversation, { sender: "Admin", senderType: "admin", timestamp, message }],
        };
      }),
    );
  }

  return (
    <AdminLayout title="Support Tickets" description="Manage vendor and customer support requests">
      <div className="flex flex-col gap-4">
        <SupportStatusTabs tabs={STATUS_TABS} active={activeStatus} onChange={setActiveStatus} counts={statusCounts} />
        <SupportFiltersBar
          raisedByTabs={RAISED_BY_TABS}
          activeRaisedBy={activeRaisedBy}
          onRaisedByChange={setActiveRaisedBy}
          categoryOptions={CATEGORY_OPTIONS}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          priorityOptions={PRIORITY_OPTIONS}
          activePriority={activePriority}
          onPriorityChange={setActivePriority}
          searchValue={search}
          onSearchChange={setSearch}
        />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <TicketList tickets={filteredTickets} totalCount={tickets.length} selectedId={selectedId} onSelect={setSelectedId} />
          <TicketDetailPanel
            ticket={selectedTicket}
            onClose={() => setSelectedId(null)}
            onMarkResolved={(id) => updateTicketStatus(id, "Resolved")}
            onEscalate={(id) => updateTicketStatus(id, "Escalated")}
            onSendReply={handleSendReply}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
