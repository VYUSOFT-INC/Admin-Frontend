/**
 * Matches the Figma "support tickets" design's status TABS: All / Open / In Progress /
 * Resolved / Escalated.
 */
export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Escalated";

/** Priority badge shown in the list PRIORITY column and the detail header. */
export type TicketPriority = "Low" | "Medium" | "High";

/** Who raised the ticket — drives the list TYPE column and the "All / Vendor / Customer"
 * segmented filter, matching the Figma reference's FILTER ROW. */
export type TicketRaisedByType = "Vendor" | "Customer";

/** Short category shown in the list ISSUE column and the "All Issues" filter dropdown. The
 * detail header's category badge shows the longer `issueLabel` instead (e.g. "Pickup Issue"). */
export type TicketCategory = "Pickup" | "Delivery" | "Walk-in" | "General";

/** A single message in a ticket's conversation thread — alternates left (requester) / right
 * (admin) in `TicketDetailPanel`, matching the Figma reference's chat-bubble CONVERSATION panel. */
export interface TicketMessage {
  sender: string;
  senderType: "requester" | "admin";
  /** e.g. "15 Jun 2025, 10:42 AM". */
  timestamp: string;
  message: string;
}

export interface SupportTicket {
  /** Lowercase slug reserved for the `/support/[id]` detail route (not built by this screen). */
  id: string;
  /** Display ticket number, e.g. "#TKT-4821". */
  ticketNumber: string;
  /** Short list-column date, e.g. "15 Jun 2025". */
  date: string;
  raisedByType: TicketRaisedByType;
  category: TicketCategory;
  /** Full badge label shown on the ticket detail header, e.g. "Pickup Issue" — deliberately its
   * own field rather than a derived `${category} Issue` string, since a couple of tickets read
   * better with a more specific label ("Payout Issue", "Coupon Issue") than their short category. */
  issueLabel: string;
  subject: string;
  requesterName: string;
  /** Phone number shown next to the requester name in the list's SUBJECT / RAISED BY column and
   * the detail header's meta line, e.g. "+91 98204 11823". */
  requesterContact: string;
  requesterEmail: string;
  /** e.g. "15 Jun 2025, 10:42 AM" — shown in the detail header's "Raised ..." meta line. */
  raisedAt: string;
  priority: TicketPriority;
  status: TicketStatus;
  /** Present only for Vendor tickets that match a real `vendors.ts` entry — powers the working
   * "View Vendor Profile" link (`/vendors/[slug]`). */
  vendorSlug?: string;
  /** Present only for Customer tickets that match a real `customers.ts` entry — powers "View
   * Customer Profile", the same forward-looking `/customers/[id]` link `CustomerRecentOrder`
   * already reserves for a not-yet-built detail route. */
  customerId?: string;
  conversation: TicketMessage[];
}

/**
 * Twelve tickets cross-referenced from `vendors.ts` / `customers.ts` / `orders.ts` (same vendor
 * names + type, same customer names/emails/phones, same order-number format) rather than
 * invented from scratch — the same convention `customers.ts` documents for its own cross-file
 * consistency. The Figma reference's sample rows implied a much larger dataset (status tabs read
 * "All 48 / Open 14 / In Progress 11 / Resolved 19 / Escalated 4"); this screen instead ships a
 * smaller, real dataset and derives every tab count and pagination figure from it at render time
 * (see `SupportTicketsPage`), the same "never hardcode what can be computed" rule
 * `PayoutStatsCards` and `ReturnsPagination` already follow for their own screens.
 */
export const SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: "tkt-4825",
    ticketNumber: "#TKT-4825",
    date: "16 Jun 2025",
    raisedByType: "Vendor",
    category: "General",
    issueLabel: "Commission Issue",
    subject: "Commission calculation looks incorrect for June payout",
    requesterName: "Kraze Fashion",
    requesterContact: "+91 98220 11223",
    requesterEmail: "accounts@krazefashion.in",
    raisedAt: "16 Jun 2025, 9:20 AM",
    priority: "Medium",
    status: "In Progress",
    vendorSlug: "kraze-fashion",
    conversation: [
      {
        sender: "Kraze Fashion",
        senderType: "requester",
        timestamp: "16 Jun 2025, 9:20 AM",
        message:
          "Our June 1–15 payout shows a commission deduction of 12% instead of the agreed 10%. Can you please check and correct this before release?",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "16 Jun 2025, 11:05 AM",
        message:
          "Thank you for flagging this. We're reviewing the commission calculation for your June payout cycle and will confirm the correct rate within 24 hours.",
      },
    ],
  },
  {
    id: "tkt-4821",
    ticketNumber: "#TKT-4821",
    date: "15 Jun 2025",
    raisedByType: "Vendor",
    category: "Pickup",
    issueLabel: "Pickup Issue",
    subject: "Pickup code not accepted at store — customer unable to collect order #MVU-20481",
    requesterName: "Moss & Clay",
    requesterContact: "+91 98204 11823",
    requesterEmail: "vendor@mossandclay.in",
    raisedAt: "15 Jun 2025, 10:42 AM",
    priority: "High",
    status: "Open",
    vendorSlug: "moss-and-clay",
    conversation: [
      {
        sender: "Moss & Clay",
        senderType: "requester",
        timestamp: "15 Jun 2025, 10:42 AM",
        message:
          "The customer came to our store with order #MVU-20481 but the pickup code they entered (7823) was showing as invalid on our device. We tried 3 times and it kept failing. The customer had to leave without collecting their order. Please help resolve this urgently.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "15 Jun 2025, 11:15 AM",
        message:
          "Thank you for reporting this. We are investigating the pickup code generation issue for order #MVU-20481. Please ask the customer to wait — we will issue a fresh code within the hour and notify both parties.",
      },
      {
        sender: "Moss & Clay",
        senderType: "requester",
        timestamp: "15 Jun 2025, 2:30 PM",
        message:
          "The customer came back but the new code also failed. This is now causing serious customer dissatisfaction — they're very upset and threatening to leave a bad review.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "15 Jun 2025, 3:05 PM",
        message:
          "We've flagged this to our engineering team — it looks like a time-sync error on the pickup verification device. A fix is being deployed. We'll update you within 2 hours.",
      },
    ],
  },
  {
    id: "tkt-4819",
    ticketNumber: "#TKT-4819",
    date: "14 Jun 2025",
    raisedByType: "Customer",
    category: "Delivery",
    issueLabel: "Delivery Issue",
    subject: "Order delivered to wrong address",
    requesterName: "Arjun Mehta",
    requesterContact: "+91 98765 43210",
    requesterEmail: "arjun.mehta@gmail.com",
    raisedAt: "14 Jun 2025, 2:10 PM",
    priority: "High",
    status: "In Progress",
    customerId: "arjun-mehta",
    conversation: [
      {
        sender: "Arjun Mehta",
        senderType: "requester",
        timestamp: "14 Jun 2025, 2:10 PM",
        message:
          "My order #MVU-10481 was marked delivered but I never received it. The delivery photo shows a door that isn't mine. Please investigate.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "14 Jun 2025, 4:45 PM",
        message: "We're sorry for the trouble. We've asked Delhivery to trace the delivery and will share an update within 24 hours.",
      },
    ],
  },
  {
    id: "tkt-4815",
    ticketNumber: "#TKT-4815",
    date: "13 Jun 2025",
    raisedByType: "Vendor",
    category: "General",
    issueLabel: "Payout Issue",
    subject: "Payout not received for May cycle",
    requesterName: "Aurel Lane",
    requesterContact: "+91 80099 11223",
    requesterEmail: "accounts@aurellane.in",
    raisedAt: "13 Jun 2025, 9:00 AM",
    priority: "Medium",
    status: "Escalated",
    vendorSlug: "aurel-lane",
    conversation: [
      {
        sender: "Aurel Lane",
        senderType: "requester",
        timestamp: "13 Jun 2025, 9:00 AM",
        message: "Our payout for the 16–31 May cycle (PAY-7798) was due on 5 Jun but hasn't reflected in our account yet. Please check.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "13 Jun 2025, 11:30 AM",
        message: "We see the payout was initiated on our end. Let us confirm with the bank and get back to you within a day.",
      },
      {
        sender: "Aurel Lane",
        senderType: "requester",
        timestamp: "13 Jun 2025, 5:00 PM",
        message:
          "It's been over a week now and still nothing. This is affecting our ability to pay our own suppliers. We need this escalated.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "13 Jun 2025, 5:40 PM",
        message:
          "Understood — escalating this to our finance team for priority processing. We'll release the payout within 48 hours and share the transaction reference.",
      },
    ],
  },
  {
    id: "tkt-4810",
    ticketNumber: "#TKT-4810",
    date: "12 Jun 2025",
    raisedByType: "Customer",
    category: "Walk-in",
    issueLabel: "Walk-in Issue",
    subject: "Store refused walk-in purchase",
    requesterName: "Vikram Singh",
    requesterContact: "+91 99887 66554",
    requesterEmail: "vikram.singh@gmail.com",
    raisedAt: "12 Jun 2025, 4:45 PM",
    priority: "Medium",
    status: "Open",
    customerId: "vikram-singh",
    conversation: [
      {
        sender: "Vikram Singh",
        senderType: "requester",
        timestamp: "12 Jun 2025, 4:45 PM",
        message:
          "I visited Harbor Blend Collective to buy a stole in person but they refused, saying walk-ins aren't accepted without a prior online order. Isn't walk-in purchase supposed to be supported?",
      },
    ],
  },
  {
    id: "tkt-4807",
    ticketNumber: "#TKT-4807",
    date: "11 Jun 2025",
    raisedByType: "Vendor",
    category: "Delivery",
    issueLabel: "Listing Issue",
    subject: "Product rejected without clear reason",
    requesterName: "Urban Thread House",
    requesterContact: "+91 80012 34567",
    requesterEmail: "support@urbanthreadhouse.in",
    raisedAt: "11 Jun 2025, 11:00 AM",
    priority: "Low",
    status: "Resolved",
    vendorSlug: "urban-thread-house",
    conversation: [
      {
        sender: "Urban Thread House",
        senderType: "requester",
        timestamp: "11 Jun 2025, 11:00 AM",
        message: "Our listing 'Slim Fit Cotton Shirt' was rejected during review with no reason given. Can you clarify what needs fixing?",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "11 Jun 2025, 1:20 PM",
        message:
          "Apologies for the missing detail — the product images didn't meet our size-chart requirement. Please re-upload with a visible size chart and we'll re-review.",
      },
      {
        sender: "Urban Thread House",
        senderType: "requester",
        timestamp: "11 Jun 2025, 3:00 PM",
        message: "Done, re-uploaded with the size chart included.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "11 Jun 2025, 3:40 PM",
        message: "Reviewed and approved — the listing is now live. Thanks for the quick fix!",
      },
    ],
  },
  {
    id: "tkt-4802",
    ticketNumber: "#TKT-4802",
    date: "10 Jun 2025",
    raisedByType: "Customer",
    category: "Delivery",
    issueLabel: "Refund Issue",
    subject: "Refund not credited after 7 days",
    requesterName: "Meera Pillai",
    requesterContact: "+91 98123 65478",
    requesterEmail: "meera.pillai@icloud.com",
    raisedAt: "10 Jun 2025, 8:30 AM",
    priority: "High",
    status: "In Progress",
    customerId: "meera-pillai",
    conversation: [
      {
        sender: "Meera Pillai",
        senderType: "requester",
        timestamp: "10 Jun 2025, 8:30 AM",
        message: "I returned order #MVU-10276 and it was approved, but the refund hasn't reflected in my account after 7 days.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "10 Jun 2025, 10:15 AM",
        message: "We're sorry for the delay. Checking with our payments team on the refund status — will update you shortly.",
      },
    ],
  },
  {
    id: "tkt-4799",
    ticketNumber: "#TKT-4799",
    date: "9 Jun 2025",
    raisedByType: "Vendor",
    category: "Pickup",
    issueLabel: "Pickup Issue",
    subject: "Inventory not syncing for pickup orders",
    requesterName: "North Square Atelier",
    requesterContact: "+91 17245 67890",
    requesterEmail: "ops@northsquareatelier.in",
    raisedAt: "9 Jun 2025, 10:15 AM",
    priority: "Medium",
    status: "Escalated",
    vendorSlug: "north-square-atelier",
    conversation: [
      {
        sender: "North Square Atelier",
        senderType: "requester",
        timestamp: "9 Jun 2025, 10:15 AM",
        message: "Pickup order inventory counts on our dashboard don't match what's in-store. We've had two double-bookings this week.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "9 Jun 2025, 12:00 PM",
        message: "Thanks for flagging — we're looking into the sync job between your store inventory and the pickup module.",
      },
      {
        sender: "North Square Atelier",
        senderType: "requester",
        timestamp: "9 Jun 2025, 3:30 PM",
        message: "This keeps happening and is costing us customer trust. Please escalate — we need a fix urgently.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "9 Jun 2025, 4:10 PM",
        message: "Escalated to engineering. A patch for the sync job is being tested and should deploy within 24 hours.",
      },
    ],
  },
  {
    id: "tkt-4793",
    ticketNumber: "#TKT-4793",
    date: "8 Jun 2025",
    raisedByType: "Customer",
    category: "General",
    issueLabel: "Coupon Issue",
    subject: "Unable to apply coupon FIRST50",
    requesterName: "Ananya Iyer",
    requesterContact: "+91 98450 33221",
    requesterEmail: "ananya.iyer@gmail.com",
    raisedAt: "8 Jun 2025, 6:50 PM",
    priority: "Low",
    status: "Resolved",
    customerId: "ananya-iyer",
    conversation: [
      {
        sender: "Ananya Iyer",
        senderType: "requester",
        timestamp: "8 Jun 2025, 6:50 PM",
        message: "The FIRST50 coupon keeps saying 'invalid code' at checkout even though it's listed as active.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "8 Jun 2025, 7:30 PM",
        message:
          "Thanks for reporting — the coupon had a minimum order value of ₹2,000 that wasn't shown on the banner. We've updated the messaging; please try again.",
      },
      {
        sender: "Ananya Iyer",
        senderType: "requester",
        timestamp: "8 Jun 2025, 7:42 PM",
        message: "Applied successfully now, thank you!",
      },
    ],
  },
  {
    id: "tkt-4790",
    ticketNumber: "#TKT-4790",
    date: "7 Jun 2025",
    raisedByType: "Vendor",
    category: "Delivery",
    issueLabel: "Shipping Issue",
    subject: "Shipping label failed to generate",
    requesterName: "Velora Styles",
    requesterContact: "+91 20011 88990",
    requesterEmail: "dispatch@velorastyles.in",
    raisedAt: "7 Jun 2025, 8:00 AM",
    priority: "Medium",
    status: "Open",
    vendorSlug: "velora-styles",
    conversation: [
      {
        sender: "Velora Styles",
        senderType: "requester",
        timestamp: "7 Jun 2025, 8:00 AM",
        message:
          "We can't generate the shipping label for order #MVU-10476 — the courier partner panel throws a 'pincode not serviceable' error, though we've shipped to this pincode before.",
      },
    ],
  },
  {
    id: "tkt-4784",
    ticketNumber: "#TKT-4784",
    date: "6 Jun 2025",
    raisedByType: "Customer",
    category: "Pickup",
    issueLabel: "Pickup Issue",
    subject: "Store closed during pickup window",
    requesterName: "Tanya Chopra",
    requesterContact: "+91 98234 56712",
    requesterEmail: "tanya.chopra@gmail.com",
    raisedAt: "6 Jun 2025, 5:30 PM",
    priority: "Low",
    status: "Resolved",
    customerId: "tanya-chopra",
    conversation: [
      {
        sender: "Tanya Chopra",
        senderType: "requester",
        timestamp: "6 Jun 2025, 5:30 PM",
        message: "I went to collect my order within the pickup window but the store was closed early.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "6 Jun 2025, 6:15 PM",
        message: "Apologies for the inconvenience — we've coordinated with the store to extend your pickup window by 3 days at no extra cost.",
      },
      {
        sender: "Tanya Chopra",
        senderType: "requester",
        timestamp: "9 Jun 2025, 1:00 PM",
        message: "Picked it up today, thanks for sorting this out.",
      },
    ],
  },
  {
    id: "tkt-4780",
    ticketNumber: "#TKT-4780",
    date: "5 Jun 2025",
    raisedByType: "Vendor",
    category: "Walk-in",
    issueLabel: "Walk-in Issue",
    subject: "Customer disputes walk-in purchase amount",
    requesterName: "Harbor Blend Collective",
    requesterContact: "+91 48423 11009",
    requesterEmail: "store@harborblendcollective.in",
    raisedAt: "5 Jun 2025, 3:15 PM",
    priority: "Low",
    status: "Resolved",
    vendorSlug: "harbor-blend-collective",
    conversation: [
      {
        sender: "Harbor Blend Collective",
        senderType: "requester",
        timestamp: "5 Jun 2025, 3:15 PM",
        message:
          "A walk-in customer is disputing the billed amount for a stole purchase, claiming we overcharged. We have the receipt on file.",
      },
      {
        sender: "Admin",
        senderType: "admin",
        timestamp: "5 Jun 2025, 4:00 PM",
        message: "Thanks for sharing the receipt — the amount matches the listed price. We've explained this to the customer and they're satisfied. Closing this out.",
      },
    ],
  },
];

/** "All / Open / In Progress / Resolved / Escalated" pill row — matches the Figma FILTER TABS. */
export const STATUS_TABS: Array<{ label: string; value: TicketStatus | "All" }> = [
  { label: "All", value: "All" },
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
  { label: "Escalated", value: "Escalated" },
];

/** "All / Vendor / Customer" segmented control shown in the filters row. */
export const RAISED_BY_TABS: Array<{ label: string; value: TicketRaisedByType | "All" }> = [
  { label: "All", value: "All" },
  { label: "Vendor", value: "Vendor" },
  { label: "Customer", value: "Customer" },
];

/** Options list for the "All Issues" category filter dropdown. */
export const CATEGORY_OPTIONS: TicketCategory[] = ["Pickup", "Delivery", "Walk-in", "General"];

/** Options list for the "All Priorities" filter dropdown. */
export const PRIORITY_OPTIONS: TicketPriority[] = ["Low", "Medium", "High"];
