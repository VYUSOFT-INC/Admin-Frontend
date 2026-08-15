import type { SVGProps } from "react";

/**
 * Icons used on the Inventory Management screen, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching the
 * pattern in `ProductIcons.tsx`/`VendorIcons.tsx`. Path geometry is unchanged from the
 * exported assets. Search/Export/Chevron-down/Chevron-left/Chevron-right are reused from
 * `VendorIcons.tsx`/`ProductIcons.tsx` since the Figma exports for those are pixel-identical
 * to the vendors/products set — no need to duplicate them here.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** "Total Active SKUs" stat card icon — an isometric open package/box. */
export function PackageIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16.5 16.0017" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.4775 8.68921C1.02713 8.9598 0.751153 9.44631 0.750002 9.97171V12.4017C0.751153 12.9271 1.02713 13.4136 1.4775 13.6842L3.7275 15.0342C4.2029 15.3198 4.7971 15.3198 5.2725 15.0342L8.25 13.2492V9.12421L4.5 6.87421L1.4775 8.68921M4.5 11.3742L0.945002 9.23671M4.5 11.3742L8.25 9.12421M4.5 11.3742V15.2517M8.25 9.12421V13.2492L11.2275 15.0342C11.7029 15.3198 12.2971 15.3198 12.7725 15.0342L15.0225 13.6842C15.4729 13.4136 15.7489 12.9271 15.75 12.4017V9.97171C15.7489 9.44631 15.4729 8.9598 15.0225 8.68921L12 6.87421L4.5 11.3742M8.25 13.6242L4.5 11.3742M8.25 13.6242L11.805 11.4867M12 11.3742V15.2517"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.2275 2.31421C4.77713 2.5848 4.50115 3.07131 4.5 3.59671V6.87421L8.25 9.12422L12 6.87421V3.59671C11.9989 3.07131 11.7229 2.5848 11.2725 2.31421L9.0225 0.964215C8.5471 0.678595 7.9529 0.678595 7.4775 0.964215L5.2275 2.31421M8.25 4.99921L4.695 2.86171M8.25 4.99921L11.805 2.86171M8.25 9.12422V4.99921"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Low Stock SKUs" stat card icon — warning triangle with exclamation mark. */
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

/** "Out of Stock SKUs" stat card icon — a "no entry" / ban circle-slash glyph. */
export function BanIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.5 1.5L16.5 16.5M6.2625 2.0175C9.03741 0.933701 12.1907 1.59498 14.2964 3.70231C16.4021 5.80963 17.0609 8.96343 15.975 11.7375M14.31 14.31C11.3793 17.2407 6.62067 17.2407 3.69 14.31C0.759331 11.3793 0.759331 6.62067 3.69 3.69"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
