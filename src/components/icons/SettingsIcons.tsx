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
