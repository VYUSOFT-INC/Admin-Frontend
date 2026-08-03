import type { SVGProps } from "react";

/**
 * Icons used on the Return Review (return detail) screen, inlined from the Figma export SVGs
 * with `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching the
 * pattern in `OrderIcons.tsx` / `ReturnIcons.tsx`. Path geometry is unchanged from the exported
 * assets (see public/assets/icons/returns for the originals). Several icons on this screen are
 * pixel-identical to existing exports and are reused directly instead of being redeclared here:
 * the back arrow (`BackArrowIcon`), calendar (`CalendarIcon`), lock (`LockIcon`), save
 * (`SaveIcon`), reject/circle-X (`RejectIcon`), plain checkmark (`CheckSmallIcon`), clock
 * (`ClockIcon`), and store (`StoreIcon`) — see each component file for details.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** Small chain-link glyph before the "Order #MVU-10481" reference in the order strip. */
export function OrderLinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.16667 7.58333L3.27775 12.4717C2.79482 12.9548 2.01054 12.9549 1.52746 12.472C1.04437 11.989 1.04424 11.2048 1.52717 10.7217L6.41783 5.83275M9.33333 9.33333L12.8333 5.83333M12.5417 6.125L7.875 1.45833M4.66667 4.66667L8.16667 1.16667M4.95833 4.375L9.625 9.04167"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Customer's Claim" card header icon. */
export function ClaimIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 1.5H9M3 4H9M3 6.5L7.25 10.5M3 6.5H4.5M4.5 6.5C7.8335 6.5 7.8335 1.5 4.5 1.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Circle-checkmark glyph reused for both the "Vendor's Recommendation" banner and the
 * "Approve Full Refund" button — same exported asset in both places in the Figma design.
 */
export function CheckCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14.6667 14.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.666667 7.33333C0.666667 11.0128 3.6539 14 7.33333 14C11.0128 14 14 11.0128 14 7.33333C14 3.6539 11.0128 0.666667 7.33333 0.666667C3.6539 0.666667 0.666667 3.6539 0.666667 7.33333V7.33333"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5.33333 7.33333L6.66667 8.66667L9.33333 6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Order Context" card header icon — a package/box glyph. */
export function PackageBoxIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.6667 12.8333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.16667 5.25C8.16667 6.5378 7.12113 7.58333 5.83333 7.58333C4.54553 7.58333 3.5 6.5378 3.5 5.25M0.643417 2.9365H11.0232"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.816667 2.60575C0.665207 2.8077 0.583333 3.05332 0.583333 3.30575V11.0833C0.583333 11.7272 1.1061 12.25 1.75 12.25H9.91667C10.5606 12.25 11.0833 11.7272 11.0833 11.0833V3.30575C11.0833 3.05332 11.0015 2.8077 10.85 2.60575L9.68333 1.05C9.463 0.756226 9.11722 0.583333 8.75 0.583333H2.91667C2.54945 0.583333 2.20366 0.756226 1.98333 1.05L0.816667 2.60575"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Refund Decision" card header icon — two arcing arrows representing a refund/exchange. */
export function RefundExchangeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 10.9436 10.9336" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.47178 5.96678C4.90626 6.54763 5.57159 6.91113 6.29511 6.96295C7.01862 7.01476 7.72896 6.74978 8.24178 6.23678L9.74178 4.73678C10.6892 3.75583 10.6757 2.19657 9.71133 1.23223C8.74699 0.267899 7.18773 0.25435 6.20678 1.20178L5.34678 2.05678"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.47178 4.96678C6.0373 4.38593 5.37197 4.02243 4.64846 3.97061C3.92494 3.9188 3.2146 4.18378 2.70178 4.69678L1.20178 6.19678C0.25435 7.17773 0.267899 8.73699 1.23223 9.70133C2.19657 10.6657 3.75583 10.6792 4.73678 9.73178L5.59178 8.87678"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Approve Partial Refund" button icon — corner brackets closing in on a split center. */
export function PartialRefundIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.5 13.125" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.75 0.625H11.875V3.75M3.75 0.625H0.625V3.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M6.25 12.5V7.3125C6.25722 6.64 5.99317 5.99295 5.5175 5.5175L0.625 0.625M8.125 4.375L11.875 0.625"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Refund Processed" (upcoming) timeline-step icon — a circled account glyph, the refund's destination. */
export function RefundProcessedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.8333 12.8333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.583333 6.41667C0.583333 9.63617 3.19716 12.25 6.41667 12.25C9.63617 12.25 12.25 9.63617 12.25 6.41667C12.25 3.19716 9.63617 0.583333 6.41667 0.583333C3.19716 0.583333 0.583333 3.19716 0.583333 6.41667V6.41667"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66667 5.25C4.66667 6.21585 5.45082 7 6.41667 7C7.38252 7 8.16667 6.21585 8.16667 5.25C8.16667 4.28415 7.38252 3.5 6.41667 3.5C5.45082 3.5 4.66667 4.28415 4.66667 5.25V5.25"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 11.4695V10.5C3.5 9.8561 4.02277 9.33333 4.66667 9.33333H8.16667C8.81057 9.33333 9.33333 9.8561 9.33333 10.5V11.4695"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
