import type { SVGProps } from "react";

/**
 * Icons used on the Notifications screen (and the Topbar bell trigger it's reached from),
 * inlined from the Figma export SVGs with `stroke="currentColor"` so they recolor via Tailwind
 * text utilities — the same convention `SupportIcons.tsx` / `NavIcons.tsx` document. Path
 * geometry is unchanged from the exported assets (see public/assets/icons/notifications for the
 * originals).
 *
 * The notification list's per-category icons largely reuse existing sidebar glyphs from
 * `NavIcons.tsx` (Vendors/Products/Orders) and `SupportIcons.tsx`-adjacent icons — verified pixel
 * identical (same path data, scaled) against the Figma export before reuse:
 * - "Vendors" cards (vendor application / suspended / approved) reuse `VendorsIcon`.
 * - "Products" cards (product flagged) reuse `ProductsIcon`.
 * - "Orders" cards (NDR alerts) reuse `OrdersIcon`.
 * - The "Payments" (payout overdue) card's Figma glyph is actually the same chat/headset shape
 *   as `SupportIcon` (verified: identical path data scaled ~0.89x) — reused as-is for fidelity,
 *   even though the notification's filter *category* is Payments.
 * - The "Support" (ticket escalated) card's Figma glyph is actually the same two-person shape as
 *   `CustomersIcon` (verified: identical path data scaled ~0.89x) — reused as-is for fidelity.
 * Only the bell (topbar trigger), the double-checkmark ("Mark All as Read"), and the sliders
 * ("System") glyphs below are new — no existing icon in the codebase matched them.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** Topbar notification-bell trigger — links to `/notifications`. */
export function BellIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.84533 14C7.08352 14.4125 7.52367 14.6666 8 14.6666C8.47633 14.6666 8.91648 14.4125 9.15467 14M2.17467 10.2173C1.99673 10.4124 1.95064 10.694 2.05714 10.9356C2.16364 11.1772 2.40266 11.3331 2.66667 11.3333H13.3333C13.5973 11.3334 13.8365 11.1778 13.9433 10.9363C14.05 10.6949 14.0043 10.4132 13.8267 10.218C12.94 9.304 12 8.33267 12 5.33333C12 3.12567 10.2077 1.33333 8 1.33333C5.79234 1.33333 4 3.12567 4 5.33333C4 8.33267 3.05933 9.304 2.17467 10.2173"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Mark All as Read" button icon — a double checkmark, distinct from `SupportIcons.ResolvedCheckIcon`
 * (that one's a circle-check used for a different "resolve" action). */
export function MarkAllReadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.5 3.5L4.08333 9.91667L1.16667 7M12.8333 5.83333L8.45833 10.2083L7.58333 9.33333"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "System" category icon — a sliders/adjustments glyph for automated platform notifications. */
export function SystemIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.33333 9.33333H1.33333M10.6667 2.66667H4.66667"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33333 9.33333C7.33333 10.4372 8.2295 11.3333 9.33333 11.3333C10.4372 11.3333 11.3333 10.4372 11.3333 9.33333C11.3333 8.2295 10.4372 7.33333 9.33333 7.33333C8.2295 7.33333 7.33333 8.2295 7.33333 9.33333V9.33333"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.666667 2.66667C0.666667 3.7705 1.56284 4.66667 2.66667 4.66667C3.7705 4.66667 4.66667 3.7705 4.66667 2.66667C4.66667 1.56284 3.7705 0.666667 2.66667 0.666667C1.56284 0.666667 0.666667 1.56284 0.666667 2.66667V2.66667"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
