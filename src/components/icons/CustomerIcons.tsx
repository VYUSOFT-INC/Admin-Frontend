import type { SVGProps } from "react";

/**
 * Icons used on the Customers Search screen, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching the pattern
 * in `OrderIcons.tsx` / `ReturnIcons.tsx`. Path geometry is unchanged from the exported assets
 * (see public/assets/icons/customers for the originals). This screen also reuses, unchanged,
 * `SearchIcon`/`LocationIcon` from `VendorIcons.tsx` and `PhoneIcon`/`MailIcon`/`TruckIcon`/
 * `StoreIcon` from `OrderIcons.tsx` — those exports are pixel-identical to this screen's Figma
 * assets, just at a different scale. The registered-date calendar below is its own export
 * (not `NavIcons.CalendarIcon`) because the Figma source omits that icon's day-grid dots,
 * the same distinction `PaymentIcons.tsx`'s `PayoutCalendarIcon` already draws.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** Profile card "N Total Orders" stat chip icon — a shopping bag. */
export function BagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 4.5C7 5.60383 6.10383 6.5 5 6.5C3.89617 6.5 3 5.60383 3 4.5M0.5515 2.517H9.4485" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M0.7 2.2335C0.570178 2.4066 0.5 2.61713 0.5 2.8335V9.5C0.5 10.0519 0.948085 10.5 1.5 10.5H8.5C9.05192 10.5 9.5 10.0519 9.5 9.5V2.8335C9.5 2.61713 9.42982 2.4066 9.3 2.2335L8.3 0.9C8.11115 0.648194 7.81476 0.5 7.5 0.5H2.5C2.18524 0.5 1.88885 0.648194 1.7 0.9L0.7 2.2335"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Profile card "N Returns" stat chip icon — a curved return/undo arrow. */
export function ReturnArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 5.5L0.5 3L3 0.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.5 3H5.75C7.26777 3 8.5 4.23223 8.5 5.75C8.5 7.26777 7.26777 8.5 5.75 8.5H4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Fulfillment Preference Strip "Walk-in" icon — a pair of footprints. */
export function WalkInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.16667 8.66667V7.3775C2.16667 6.22917 1.60875 5.6875 1.625 4.33333C1.64125 2.86 2.43208 1.08333 4.0625 1.08333C5.07542 1.08333 5.41667 2.05833 5.41667 2.97917C5.41667 4.66375 4.33333 6.045 4.33333 7.68083V8.66667C4.33333 9.26457 3.84791 9.75 3.25 9.75C2.65209 9.75 2.16667 9.26457 2.16667 8.66667M10.8333 10.8333V9.54417C10.8333 8.39583 11.3913 7.85417 11.375 6.5C11.3587 5.02667 10.5679 3.25 8.9375 3.25C7.92458 3.25 7.58333 4.225 7.58333 5.14583C7.58333 6.83042 8.66667 8.21167 8.66667 9.8475V10.8333C8.66667 11.4312 9.15209 11.9167 9.75 11.9167C10.3479 11.9167 10.8333 11.4312 10.8333 10.8333M8.66667 9.20833H10.8333M2.16667 7.04167H4.33333"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Profile card "Registered ..." row icon — a plain calendar (no day-grid dots). */
export function CustomerCalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 10.8333 11.9167" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3.25 0.541667V2.70833M7.58333 0.541667V2.70833" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M1.625 1.625H9.20833C9.80624 1.625 10.2917 2.11043 10.2917 2.70833V10.2917C10.2917 10.8896 9.80624 11.375 9.20833 11.375H1.625C1.02709 11.375 0.541667 10.8896 0.541667 10.2917V2.70833C0.541667 2.11043 1.02709 1.625 1.625 1.625V1.625"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M0.541667 4.875H10.2917" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Block Account" action button icon — a "no entry" circle-slash. */
export function BlockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.8333 12.8333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.583333 6.41667C0.583333 9.63617 3.19716 12.25 6.41667 12.25C9.63617 12.25 12.25 9.63617 12.25 6.41667C12.25 3.19716 9.63617 0.583333 6.41667 0.583333C3.19716 0.583333 0.583333 3.19716 0.583333 6.41667V6.41667"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.29192 2.29192L10.5408 10.5414" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Add Admin Note" action button icon — a pencil writing on a line. */
export function NoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.58333 12.25H12.25M8.75 2.91667L11.0833 5.25M12.3515 3.97367C12.9933 3.33202 12.9934 2.29002 12.3518 1.64821C11.7101 1.0064 10.6681 1.00627 10.0263 1.64792L2.24117 9.43483C2.10573 9.56987 2.00557 9.73614 1.9495 9.919L1.17892 12.4577C1.1482 12.5604 1.17638 12.6718 1.2523 12.7476C1.32821 12.8234 1.4396 12.8514 1.54233 12.8205L4.08158 12.0505C4.26427 11.9949 4.43052 11.8954 4.56575 11.7606L7.58333 12.25"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
