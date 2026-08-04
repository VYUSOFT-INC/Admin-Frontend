"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CloseIcon, EscalateWarningIcon, ResolvedCheckIcon } from "@/components/icons/SupportIcons";
import { SendIcon } from "@/components/icons/PaymentIcons";
import { SupportIcon } from "@/components/icons/NavIcons";
import { initialsOf } from "@/lib/initials";
import type { SupportTicket } from "@/lib/mock-data/support";
import { CATEGORY_BADGE_VARIANT, PRIORITY_BADGE_VARIANT, RAISED_BY_BADGE_VARIANT, STATUS_BADGE_VARIANT } from "@/components/support/TicketList";

interface TicketDetailPanelProps {
  ticket: SupportTicket | null;
  onClose: () => void;
  onMarkResolved: (id: string) => void;
  onEscalate: (id: string) => void;
  onSendReply: (id: string, message: string) => void;
}

interface TicketDetailPanelContentProps extends Omit<TicketDetailPanelProps, "ticket"> {
  ticket: SupportTicket;
}

/** RIGHT: Ticket Detail Panel — header badges + close, requester info, the conversation thread,
 * and the reply box + action buttons. Matches the Figma reference's "RIGHT: Ticket Detail Panel". */
export function TicketDetailPanel({ ticket, onClose, onMarkResolved, onEscalate, onSendReply }: TicketDetailPanelProps) {
  if (!ticket) {
    return (
      <Card className="flex h-[640px] flex-1 flex-col items-center justify-center gap-2 text-center">
        <span className="flex size-11 items-center justify-center rounded-full bg-surface-tint text-gray-400">
          <SupportIcon className="size-5" />
        </span>
        <p className="text-sm font-bold text-ink">No ticket selected</p>
        <p className="max-w-[240px] text-xs font-medium text-gray-500">Select a ticket from the list to view its details and conversation.</p>
      </Card>
    );
  }

  return <TicketDetailPanelContent key={ticket.id} ticket={ticket} onClose={onClose} onMarkResolved={onMarkResolved} onEscalate={onEscalate} onSendReply={onSendReply} />;
}

/** Keyed by `ticket.id` from the parent so the reply draft resets whenever the selected ticket changes. */
function TicketDetailPanelContent({ ticket, onClose, onMarkResolved, onEscalate, onSendReply }: TicketDetailPanelContentProps) {
  const [reply, setReply] = useState("");
  const isVendor = ticket.raisedByType === "Vendor";
  const profileLabel = isVendor ? "View Vendor Profile" : "View Customer Profile";
  // Customer detail routes aren't built yet (see `Customer.id` in customers.ts) — link to the
  // reserved-but-not-yet-built `/customers/[id]` route so it's ready the moment that screen ships,
  // the exact forward-looking pattern `CustomerRecentOrder` already uses for its own order links.
  const resolvedProfileHref = isVendor ? (ticket.vendorSlug ? `/vendors/${ticket.vendorSlug}` : undefined) : ticket.customerId ? `/customers/${ticket.customerId}` : undefined;

  function handleSend() {
    const trimmed = reply.trim();
    if (!trimmed) return;
    onSendReply(ticket.id, trimmed);
    setReply("");
  }

  return (
    <Card className="flex h-[640px] flex-1 flex-col overflow-hidden">
      <div className="flex flex-col gap-[7px] border-b border-border px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <p className="text-[13px] font-extrabold tracking-[-0.26px] text-ink">{ticket.ticketNumber}</p>
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant={RAISED_BY_BADGE_VARIANT[ticket.raisedByType]} className="text-[10px]">
                {ticket.raisedByType}
              </Badge>
              <Badge variant={CATEGORY_BADGE_VARIANT[ticket.category]} className="text-[10px]">
                {ticket.issueLabel}
              </Badge>
              <Badge variant={STATUS_BADGE_VARIANT[ticket.status]} className="text-[10px]">
                {ticket.status}
              </Badge>
              <Badge variant={PRIORITY_BADGE_VARIANT[ticket.priority]} className="text-[10px]">
                {ticket.priority} Priority
              </Badge>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close ticket detail"
            className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px] border border-border bg-white text-gray-500 hover:bg-surface-tint"
          >
            <CloseIcon className="size-3.5" />
          </button>
        </div>

        <p className="break-words text-sm font-bold text-ink">{ticket.subject}</p>

        <div className="flex items-center gap-2 pt-0.5">
          <Avatar initials={initialsOf(ticket.requesterName)} variant={isVendor ? "navy" : "pink"} size={28} />
          <div className="min-w-0">
            <p className="min-w-0 break-words text-xs font-bold text-ink">
              {ticket.requesterName} <span className="font-medium text-gray-400">({ticket.raisedByType})</span>
            </p>
            <p className="min-w-0 break-words text-[11px] font-medium text-gray-500">
              {ticket.requesterContact} &middot; {ticket.requesterEmail} &middot; Raised {ticket.raisedAt}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {ticket.conversation.map((entry, index) => {
          const fromAdmin = entry.senderType === "admin";
          return (
            <div key={index} className={`flex flex-col ${fromAdmin ? "items-end" : "items-start"}`}>
              <div className="flex max-w-[85%] flex-col gap-0.5">
                <p className="text-[10px] font-semibold text-gray-500">
                  {entry.sender} &mdash; {entry.timestamp}
                </p>
                <div
                  className={`rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    fromAdmin ? "rounded-br-[4px] bg-ink text-white" : "rounded-bl-[4px] bg-surface-tint text-ink"
                  }`}
                >
                  {entry.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2.5 border-t border-border px-5 py-3.5">
        <textarea
          value={reply}
          onChange={(event) => setReply(event.target.value)}
          placeholder="Type your reply here…"
          rows={2}
          className="min-h-[68px] w-full resize-none rounded-[10px] border border-border bg-surface-tint px-3.5 py-2.5 text-xs font-medium text-ink placeholder:text-gray-500 focus:outline-none"
        />
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onMarkResolved(ticket.id)}
              disabled={ticket.status === "Resolved"}
              className="flex h-[34px] items-center gap-1.5 rounded-[10px] border border-success px-3.5 text-xs font-bold text-success transition-colors hover:bg-success-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ResolvedCheckIcon className="size-3" />
              Mark Resolved
            </button>
            <button
              type="button"
              onClick={() => onEscalate(ticket.id)}
              disabled={ticket.status === "Escalated"}
              className="flex h-[34px] items-center gap-1.5 rounded-[10px] border border-primary px-3.5 text-xs font-bold text-primary transition-colors hover:bg-primary-lighter disabled:cursor-not-allowed disabled:opacity-50"
            >
              <EscalateWarningIcon className="size-3" />
              Escalate
            </button>
          </div>
          <div className="flex items-center gap-3">
            {resolvedProfileHref && (
              <Link href={resolvedProfileHref} className="text-xs font-semibold text-primary underline hover:opacity-80">
                {profileLabel}
              </Link>
            )}
            <button
              type="button"
              onClick={handleSend}
              disabled={reply.trim().length === 0}
              className="flex h-[34px] items-center gap-1.5 rounded-[10px] bg-primary px-4 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <SendIcon className="size-3" />
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
