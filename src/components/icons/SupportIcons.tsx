import type { SVGProps } from "react";

/**
 * Icons used on the Support Tickets screen, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching the pattern
 * in `OrderIcons.tsx` / `PaymentIcons.tsx`. Path geometry is unchanged from the exported assets
 * (see public/assets/icons/support for the originals). This screen also reuses, unchanged:
 * `ChevronDownIcon` from `ProductIcons.tsx` (filter dropdowns), `ChevronLeftIcon`/
 * `ChevronRightIcon` from `VendorIcons.tsx` (pagination), and `SendIcon` from `PaymentIcons.tsx`
 * ("Send Reply") — all pixel-identical glyphs to this screen's Figma exports, just at a
 * different scale, the same reuse convention those files already document.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** Ticket detail panel close ("X") button. */
export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Mark Resolved" reply-action button icon — a circle-check, distinct export from the stat-card
 * `CheckCircleIcon` in `PaymentIcons.tsx` (same concept, different path geometry in the Figma source). */
export function ResolvedCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.9173 11.9174" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.266 4.87706C11.7757 7.37876 10.4694 9.89677 8.13054 10.9206C5.79171 11.9444 3.05548 11.1961 1.56324 9.1245C0.071 7.05289 0.227934 4.22052 1.9399 2.32645C3.65187 0.432374 6.45403 -0.00909972 8.66543 1.26685"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.33209 5.41873L5.95709 7.04373L11.3738 1.62706" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Escalate" reply-action button icon — a warning triangle, distinct from `OrderIcons.EscalateIcon`
 * (that one's a headset glyph used for a different escalate action elsewhere). */
export function EscalateWarningIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.7704 9.75L7.43708 2.16667C7.24473 1.82725 6.88472 1.61747 6.49458 1.61747C6.10445 1.61747 5.74444 1.82725 5.55208 2.16667L1.21875 9.75C1.02434 10.0867 1.02526 10.5017 1.22116 10.8376C1.41706 11.1734 1.77789 11.3785 2.16667 11.375H10.8333C11.2202 11.3746 11.5774 11.168 11.7707 10.8329C11.9639 10.4977 11.9638 10.085 11.7704 9.75M6.5 4.875V7.04167M6.5 9.20833H6.50542"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
