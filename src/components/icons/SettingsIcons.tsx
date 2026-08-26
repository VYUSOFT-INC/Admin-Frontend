import type { SVGProps } from "react";

/**
 * Icons used on the Settings screens, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching the pattern
 * in `PromotionIcons.tsx` / `PaymentIcons.tsx`. Path geometry is unchanged from the exported
 * assets (see public/assets/icons/settings for the originals). The "Save Changes" button reuses
 * `SaveIcon` from `VendorDetailIcons.tsx` since that export is pixel-identical (same convention
 * `PayoutsPagination` already follows for its chevrons), and the "Pickup & Store" sub-nav icon
 * reuses the pin glyph from `public/assets/icons/vendors/location.svg` (same convention) rather
 * than redeclaring either.
 *
 * The Payout Schedule panel (node 1071:8929) reuses three more pixel-identical-but-rescaled
 * exports rather than redeclaring them: `DueClockIcon` and `PayoutCalendarIcon` from
 * `PaymentIcons.tsx` for "Settlement Hold Period" / "Processing Day", and `MailIcon` from
 * `OrderIcons.tsx` for "Payout Notification". Its select-dropdown chevrons reuse
 * `ChevronDownIcon` from `VendorDetailIcons.tsx` (same glyph `CouponForm` already uses). Only
 * `InfoIcon`, `CycleIcon`, and `RupeeIcon` below are new exports for that screen.
 *
 * The Category Management panel (node 1071:9230) verified every icon in its exported SVGs against
 * existing exports before adding anything new, and every one of them turned out pixel-identical
 * (just rescaled) to something already declared: "+ Add New Category" reuses `PlusIcon` from
 * `PromotionIcons.tsx`; a row's expand/collapse chevron reuses `ChevronDownIcon` from
 * `VendorDetailIcons.tsx` (expanded) and `ChevronRightIcon` from `VendorIcons.tsx` (collapsed); a
 * row's edit-pencil action reuses `EditIcon` from `PromotionIcons.tsx`; the inline edit form's
 * "Parent Category" select chevron reuses `ChevronDownIcon` again; and its "Save" button
 * checkmark reuses `CheckSmallIcon` from `VendorDetailIcons.tsx`. Only `SubcategoryArrowIcon`
 * below (the "↳" glyph marking a sub-category row) is a genuinely new export for that screen.
 *
 * The "Reseller Program" sub-nav icon (`ResellerProgramIcon`) is a genuine Figma export (node
 * 1177:1350's icon layer) — a seal/badge glyph with a percent-style diagonal slash, distinct from
 * `PercentIcon`'s plain percent sign, so kept as its own new export rather than reused.
 *
 * The Tax & Compliance panel (node 1143:2483) again verified every icon against existing exports
 * first: "Preview Invoice Template" reuses `IdCardIcon` from `VendorDetailIcons.tsx` (the Figma
 * export's path data is pixel-identical to that icon, despite the button's own label suggesting an
 * eye/preview glyph — verified by diffing the exported SVG's path coordinates, not just eyeballing
 * the render); the Compliance Documents table's "PAN Card" row reuses `ReceiptCardIcon` from
 * `VendorDetailIcons.tsx` (identical path geometry scaled ~1.29x, the same kind of rescaled reuse
 * `PinIcon` above documents); "Download All Documents" reuses `ExportIcon` from `VendorIcons.tsx`
 * (pixel-identical); and its select chevron reuses `ChevronDownIcon` from `VendorDetailIcons.tsx`
 * again. `GstCertificateIcon` and `CompanyCertificateIcon` below are new exports for that screen's
 * "Platform GST Certificate" / "Company Registration Certificate" table rows — neither shape
 * matches anything already declared. `TaxComplianceIcon` (this file's sub-nav icon for the new
 * "Tax & Compliance" entry) is hand-authored: like `TruckIcon` above, the Figma sub-nav's own row
 * has no icon layer for any of its seven entries (verified against a fresh screenshot), so a new
 * icon was added in the same stroke style as its six siblings rather than leaving one shared-nav
 * entry bare.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** "Commission Rates" sub-nav icon — a percent glyph. */
export function PercentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.25 11.25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 1.25L1.25 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M0.625 2.1875C0.625 3.04987 1.32513 3.75 2.1875 3.75C3.04987 3.75 3.75 3.04987 3.75 2.1875C3.75 1.32513 3.04987 0.625 2.1875 0.625C1.32513 0.625 0.625 1.32513 0.625 2.1875V2.1875"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.0625C7.5 9.92487 8.20013 10.625 9.0625 10.625C9.92487 10.625 10.625 9.92487 10.625 9.0625C10.625 8.20013 9.92487 7.5 9.0625 7.5C8.20013 7.5 7.5 8.20013 7.5 9.0625V9.0625"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Payout Schedule" sub-nav icon — a calendar with a clock face, distinct from the plain
 * calendar glyphs elsewhere (`NavIcons.CalendarIcon`, `customers/calendar.svg`) since this
 * export pairs the calendar with a clock to signal a recurring schedule. */
export function PayoutScheduleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.125 13.75" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.75 8.125V9.5L9.75 10.125M8.75 0.625V3.125M11.875 4.0625V3.125C11.875 2.43511 11.3149 1.875 10.625 1.875H1.875C1.18511 1.875 0.625 2.43511 0.625 3.125V11.875C0.625 12.5649 1.18511 13.125 1.875 13.125H4.0625M0.625 5.625H3.75M3.75 0.625V3.125"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 9.375C5 11.4447 6.68032 13.125 8.75 13.125C10.8197 13.125 12.5 11.4447 12.5 9.375C12.5 7.30532 10.8197 5.625 8.75 5.625C6.68032 5.625 5 7.30532 5 9.375V9.375"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Category Management" sub-nav icon — a two-tray inbox/layers glyph. */
export function LayersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.5 12.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.25 5C11.5949 5 11.875 4.71995 11.875 4.375V2.5C11.875 2.15505 11.5949 1.875 11.25 1.875H9.6875C9.49078 1.875 9.30553 1.78238 9.1875 1.625L8.625 0.875C8.50697 0.717621 8.32172 0.625 8.125 0.625H6.875C6.53005 0.625 6.25 0.905053 6.25 1.25V4.375C6.25 4.71995 6.53005 5 6.875 5H11.25M11.25 11.875C11.5949 11.875 11.875 11.5949 11.875 11.25V9.375C11.875 9.03005 11.5949 8.75 11.25 8.75H9.4375C9.20441 8.74695 8.99238 8.61444 8.8875 8.40625L8.625 7.875C8.52528 7.64651 8.2993 7.49913 8.05 7.5H6.875C6.53005 7.5 6.25 7.78005 6.25 8.125V11.25C6.25 11.5949 6.53005 11.875 6.875 11.875H11.25M0.625 1.875C0.625 2.56489 1.18511 3.125 1.875 3.125H3.75"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M0.625 0.625V8.75C0.625 9.43989 1.18511 10 1.875 10H3.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Platform Config" sub-nav icon — a wiring/connector-node grid glyph. */
export function SlidersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.25 3.125H1.875M7.5 11.875H1.875M8.75 1.875V4.375M10 10.625V13.125M13.125 7.5H7.5M13.125 11.875H10M13.125 3.125H8.75M5 6.25V8.75M5 7.5H1.875"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Shipping" sub-nav icon — a delivery-truck glyph. Hand-authored: unlike every other icon on
 * this screen (all of which turned out to be pixel-identical exports already declared elsewhere,
 * see the file-level comment above), the Figma "shipping" node's sub-nav row has no icon layer at
 * all for *any* of its six entries — verified against both a fresh screenshot and `get_metadata`,
 * not just the one row. Since `SettingsSubNav.tsx` is the one shared component every Settings
 * screen renders through, and its other five, already-shipped entries all render with an icon,
 * dropping icons platform-wide (or leaving only "Shipping" bare) would read as broken/inconsistent
 * rather than matching this one screen's apparent one-off omission — so a new icon was added here
 * instead, in the same stroke-based style as its siblings. */
export function TruckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 12.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.625 1.875C0.625 1.52505 0.905051 1.25 1.25 1.25H8.125C8.47495 1.25 8.75 1.52505 8.75 1.875V9.375H0.625V1.875Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 4.375H11.6797C11.9013 4.375 12.1064 4.49216 12.2192 4.68306L13.9145 7.55495C13.971 7.65083 14.0008 7.76013 14.0008 7.87148V9.375H8.75"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.4375 11.875C4.16688 11.875 4.75 11.2925 4.75 10.5625C4.75 9.83249 4.16688 9.25 3.4375 9.25C2.70812 9.25 2.125 9.83249 2.125 10.5625C2.125 11.2925 2.70812 11.875 3.4375 11.875Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0625 11.875C11.7919 11.875 12.375 11.2925 12.375 10.5625C12.375 9.83249 11.7919 9.25 11.0625 9.25C10.3331 9.25 9.75 9.83249 9.75 10.5625C9.75 11.2925 10.3331 11.875 11.0625 11.875Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Pickup & Store" sub-nav icon — the same pin-drop glyph as `public/assets/icons/vendors/location.svg`
 * scaled up (identical path geometry at 1.25x), reused rather than redeclared. */
export function PinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.25 13.7498" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.625 5.625C10.625 8.74563 7.16313 11.9956 6.00063 12.9994C5.77815 13.1667 5.47185 13.1667 5.24937 12.9994C4.08687 11.9956 0.625 8.74563 0.625 5.625C0.625 2.86542 2.86542 0.625 5.625 0.625C8.38458 0.625 10.625 2.86542 10.625 5.625"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 5.625C3.75 6.65984 4.59016 7.5 5.625 7.5C6.65984 7.5 7.5 6.65984 7.5 5.625C7.5 4.59016 6.65984 3.75 5.625 3.75C4.59016 3.75 3.75 4.59016 3.75 5.625V5.625"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Payout Schedule info-strip icon — a circled "i", used at its exported red tint on the
 * "Changes take effect from the next settlement cycle" banner. */
export function InfoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.75 13.75" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.625 6.875C0.625 10.3245 3.42553 13.125 6.875 13.125C10.3245 13.125 13.125 10.3245 13.125 6.875C13.125 3.42553 10.3245 0.625 6.875 0.625C3.42553 0.625 0.625 3.42553 0.625 6.875V6.875"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.875 9.375V6.875M6.875 4.375H6.88125" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Payout Schedule "Settlement Cycle" field icon — a two-arrow refresh/cycle glyph. Also reused,
 * smaller and at the exported red tint, inside the "Current Schedule Preview" card's cycle
 * badge. */
export function CycleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.6667 11.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.583333 5.83333C0.583333 2.93384 2.93384 0.583333 5.83333 0.583333C7.30103 0.588855 8.70977 1.16155 9.765 2.18167L11.0833 3.5"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0833 0.583333V3.5H8.16667M11.0833 5.83333C11.0833 8.73283 8.73283 11.0833 5.83333 11.0833C4.36564 11.0778 2.9569 10.5051 1.90167 9.485L0.583333 8.16667"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.5 8.16667H0.583333V11.0833" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Payout Schedule "Minimum Payout Threshold" field icon — a rupee ("₹") glyph, distinct from the
 * plain "₹" text character used inside the input's own prefix box. */
export function RupeeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 1.75H10.5M3.5 4.66667H10.5M3.5 7.58333L8.45833 12.25M3.5 7.58333H5.25M5.25 7.58333C9.13908 7.58333 9.13908 1.75 5.25 1.75"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Tax & Compliance" sub-nav icon — a clipboard-with-checkmark glyph. Hand-authored; see the
 * file-level comment above for why (Figma's sub-nav row has no icon layer for any entry). */
export function TaxComplianceIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.5 13.75" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.375 1.875H2.5C1.81 1.875 1.25 2.435 1.25 3.125V11.875C1.25 12.565 1.81 13.125 2.5 13.125H10C10.69 13.125 11.25 12.565 11.25 11.875V3.125C11.25 2.435 10.69 1.875 10 1.875H8.125"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.6875 0.625H7.8125C8.1577 0.625 8.4375 0.904822 8.4375 1.25V2.1875C8.4375 2.53268 8.1577 2.8125 7.8125 2.8125H4.6875C4.34232 2.8125 4.0625 2.53268 4.0625 2.1875V1.25C4.0625 0.904822 4.34232 0.625 4.6875 0.625V0.625Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3.75 7.5L5.3125 9.0625L8.75 5.625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Reseller Program" sub-nav icon — a seal/badge glyph with a percent-style diagonal slash,
 * matching the Figma export exactly (node 1177:1350). */
export function ResellerProgramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.40625 5.3875C2.22085 4.55234 2.47536 3.68037 3.08092 3.07608C3.68648 2.47179 4.55898 2.2191 5.39375 2.40625C5.85317 1.68774 6.64717 1.25299 7.5 1.25299C8.35283 1.25299 9.14683 1.68774 9.60625 2.40625C10.4423 2.21827 11.3164 2.47164 11.9224 3.0776C12.5284 3.68356 12.7817 4.55766 12.5937 5.39375C13.3123 5.85317 13.747 6.64717 13.747 7.5C13.747 8.35283 13.3123 9.14683 12.5937 9.60625C12.7809 10.441 12.5282 11.3135 11.9239 11.9191C11.3196 12.5246 10.4477 12.7792 9.6125 12.5938C9.15365 13.3151 8.35802 13.7519 7.50312 13.7519C6.64823 13.7519 5.8526 13.3151 5.39375 12.5938C4.55898 12.7809 3.68648 12.5282 3.08092 11.9239C2.47536 11.3196 2.22085 10.4477 2.40625 9.6125C1.68211 9.15422 1.24317 8.35697 1.24317 7.5C1.24317 6.64303 1.68211 5.84578 2.40625 5.3875M9.375 5.625L5.625 9.375M5.625 5.625H5.63125M9.375 9.375H9.38125"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Compliance Documents table's "Platform GST Certificate" row icon — a ticket/certificate glyph
 * with a scalloped bottom edge, matching the Figma export exactly (node 1143:2786). Distinct from
 * `ReceiptCardIcon`'s plain rectangle and `IdCardIcon`'s folded-corner card, so kept as a new export. */
export function GstCertificateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.75 12H6M10.5 6H6M12 9H6M3 2.25C3 1.83606 3.33606 1.5 3.75 1.5C3.93571 1.49898 4.11786 1.55102 4.275 1.65L4.97475 2.1C5.29486 2.30455 5.70464 2.30455 6.02475 2.1L6.72525 1.65C7.04536 1.44545 7.45514 1.44545 7.77525 1.65L8.475 2.1C8.79511 2.30455 9.20489 2.30455 9.525 2.1L10.2248 1.65C10.5449 1.44545 10.9546 1.44545 11.2747 1.65L11.9753 2.1C12.2954 2.30455 12.7051 2.30455 13.0253 2.1L13.725 1.65C13.8821 1.55102 14.0643 1.49898 14.25 1.5C14.6639 1.5 15 1.83606 15 2.25V15.75C15 16.1639 14.6639 16.5 14.25 16.5C14.0643 16.501 13.8821 16.449 13.725 16.35L13.0253 15.9C12.7051 15.6954 12.2954 15.6954 11.9753 15.9L11.2747 16.35C10.9546 16.5546 10.5449 16.5546 10.2248 16.35L9.525 15.9C9.20489 15.6954 8.79511 15.6954 8.475 15.9L7.77525 16.35C7.45514 16.5546 7.04536 16.5546 6.72525 16.35L6.02475 15.9C5.70464 15.6954 5.29486 15.6954 4.97475 15.9L4.275 16.35C4.11786 16.449 3.93571 16.501 3.75 16.5C3.33606 16.5 3 16.1639 3 15.75L9.75 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Compliance Documents table's "Company Registration Certificate" row icon — a document with a
 * ribbon/seal, matching the Figma export exactly (node 1143:2829). */
export function CompanyCertificateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14.25 16.5002" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.25 15.75H12C12.8279 15.75 13.5 15.0779 13.5 14.25V5.25001C13.5012 4.76996 13.3106 4.30934 12.9705 3.97051L10.2795 1.27951C9.94067 0.939451 9.48004 0.748828 9 0.750005H3C2.17213 0.750005 1.5 1.42213 1.5 2.25001V4.72501"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 0.750005V4.50001C9 4.91394 9.33606 5.25001 9.75 5.25001H13.5M4.2675 11.6093L5.235 15.2693C5.27692 15.4117 5.23088 15.5654 5.11758 15.6613C5.00428 15.7573 4.84505 15.7773 4.7115 15.7125L3.32925 15.0758C3.12116 14.9742 2.87785 14.9745 2.67 15.0765L1.2855 15.714C1.15204 15.7765 0.994347 15.755 0.882444 15.6592C0.770542 15.5633 0.725179 15.4107 0.7665 15.2693L1.734 11.6093"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.75 9.75001C0.75 10.9918 1.75819 12 3 12C4.24181 12 5.25 10.9918 5.25 9.75001C5.25 8.5082 4.24181 7.50001 3 7.50001C1.75819 7.50001 0.75 8.5082 0.75 9.75001H0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Category Management sub-category row marker — a "↳" corner-down-right glyph in front of a
 * sub-category's name, and again (recolored via `currentColor`) in the inline edit form's
 * "Editing: <name>" / "Adding New Category" breadcrumb line. */
export function SubcategoryArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 9.75 9.75" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.5 3.79167L9.20833 6.5L6.5 9.20833" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M0.541667 0.541667V4.33333C0.541667 5.52915 1.51252 6.5 2.70833 6.5H9.20833"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
