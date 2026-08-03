import type { SVGProps } from "react";

/**
 * Icons used on the Payments & Payouts screen (list + detail), inlined from the Figma export
 * SVGs with `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching
 * the pattern in `VendorIcons.tsx` / `OrderIcons.tsx` / `ReturnIcons.tsx`. Path geometry is
 * unchanged from the exported assets (see public/assets/icons/payments for the originals).
 * Search/Export/Chevron-left/Chevron-right are reused from `VendorIcons.tsx` since the Figma
 * exports for those are pixel-identical to the vendors set. On the Payout Detail screen, the
 * "Flag for Review" action button reuses `FlagIcon` from `OrderIcons.tsx` (same glyph, a
 * slightly different export scale) instead of redeclaring it here.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** "Total Pending Payouts" stat card icon. */
export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16.5 16.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.75 8.25C0.75 12.3894 4.11064 15.75 8.25 15.75C12.3894 15.75 15.75 12.3894 15.75 8.25C15.75 4.11064 12.3894 0.75 8.25 0.75C4.11064 0.75 0.75 4.11064 0.75 8.25V8.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8.25 3.75V8.25H11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Total Processed This Month" stat card icon. */
export function CheckCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16.5 16.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.75 8.25C0.75 12.3894 4.11064 15.75 8.25 15.75C12.3894 15.75 15.75 12.3894 15.75 8.25C15.75 4.11064 12.3894 0.75 8.25 0.75C4.11064 0.75 0.75 4.11064 0.75 8.25V8.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 8.25L7.5 9.75L10.5 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Overdue Payouts" stat card icon. */
export function WarningTriangleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.2975 13.5L10.2975 3C10.0312 2.53003 9.53269 2.23958 8.9925 2.23958C8.45231 2.23958 7.95384 2.53003 7.6875 3L1.6875 13.5C1.41832 13.9662 1.41959 14.5409 1.69083 15.0059C1.96208 15.4709 2.4617 15.7548 3 15.75H15C15.5356 15.7495 16.0303 15.4633 16.2979 14.9993C16.5655 14.5353 16.5653 13.9639 16.2975 13.5M9 6.75V9.75M9 12.75H9.0075"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Payout Detail "Period" meta-row icon — a plain calendar, distinct from `NavIcons.CalendarIcon`
 * (that one also draws a day-grid of dots this export doesn't have). */
export function PayoutCalendarIcon(props: IconProps) {
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

/** Payout Detail "Payout ID" meta-row icon — a "#" hash glyph. */
export function HashIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.16667 4.875H10.8333M2.16667 8.125H10.8333M5.41667 1.625L4.33333 11.375M8.66667 1.625L7.58333 11.375"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Payout Detail "Due" meta-row icon — a clock face, distinct export from this file's stat-card
 * `ClockIcon` above (same concept, different hand angle/scale in the Figma source). */
export function DueClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.9167 11.9167" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.541667 5.95833C0.541667 8.94787 2.96879 11.375 5.95833 11.375C8.94787 11.375 11.375 8.94787 11.375 5.95833C11.375 2.96879 8.94787 0.541667 5.95833 0.541667C2.96879 0.541667 0.541667 2.96879 0.541667 5.95833V5.95833"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.95833 2.70833V5.95833L8.125 7.04167" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Payout Detail "N Orders" meta-row icon — a shopping cart/basket glyph. */
export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.9383 11.8896" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.22292 10.8063C3.22292 11.1052 3.46563 11.3479 3.76458 11.3479C4.06354 11.3479 4.30625 11.1052 4.30625 10.8063C4.30625 10.5073 4.06354 10.2646 3.76458 10.2646C3.46563 10.2646 3.22292 10.5073 3.22292 10.8063V10.8063"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.18125 10.8063C9.18125 11.1052 9.42396 11.3479 9.72292 11.3479C10.0219 11.3479 10.2646 11.1052 10.2646 10.8063C10.2646 10.5073 10.0219 10.2646 9.72292 10.2646C9.42396 10.2646 9.18125 10.5073 9.18125 10.8063V10.8063"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.541667 0.541667H1.625L3.06583 7.26917C3.17486 7.7774 3.6295 8.13656 4.14917 8.125H9.44667C9.95457 8.12418 10.3937 7.77061 10.5029 7.27458L11.3967 3.25H2.20458"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Release Payout" action button icon — a paper-plane/send glyph. */
export function SendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.69067 14.4573C9.74254 14.5866 9.86932 14.67 10.0086 14.6664C10.1478 14.6629 10.2702 14.5731 10.3153 14.4413L14.6487 1.77467C14.6922 1.65408 14.6621 1.51918 14.5715 1.42852C14.4808 1.33786 14.3459 1.30778 14.2253 1.35133L1.55867 5.68467C1.42691 5.72985 1.33714 5.8522 1.33357 5.99144C1.33001 6.13068 1.4134 6.25746 1.54267 6.30933L6.82933 8.42933C7.16705 8.56454 7.43485 8.83187 7.57067 9.16933L9.69067 14.4573M14.5693 1.43133L7.276 8.724"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Hold Payout" action button icon — a pause glyph. */
export function PauseCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.75 13.75" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.625 6.875C0.625 10.3245 3.42553 13.125 6.875 13.125C10.3245 13.125 13.125 10.3245 13.125 6.875C13.125 3.42553 10.3245 0.625 6.875 0.625C3.42553 0.625 0.625 3.42553 0.625 6.875V6.875"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.625 8.75V5M8.125 8.75V5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
