import type { SVGProps } from "react";

/**
 * Icons used on the Returns and Refunds screen, inlined from the Figma export SVGs with
 * `stroke`/`fill="currentColor"` so they can recolor via Tailwind text utilities, matching
 * the pattern in `VendorIcons.tsx` / `OrderIcons.tsx`. Path geometry is unchanged from the
 * exported assets (see public/assets/icons/returns for the originals). Search/Export/
 * Chevron-left/Chevron-right are reused from `VendorIcons.tsx`, the dropdown chevron from
 * `ProductIcons.tsx`, the "Date Range" filter icon from `NavIcons.tsx`'s `CalendarIcon`
 * (same substitution `OrderIcons.tsx` already made), and the "All Vendors" / "Reason"
 * filter icons from `OrderIcons.tsx`'s `StoreIcon` and `VendorIcons.tsx`'s `FilterIcon`
 * respectively, since those glyphs are pixel-equivalent (same paths at a different export
 * scale) to this screen's exports.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** Checkmark-on-clipboard icon shown inside the red "Review" row action button. */
export function ReviewIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 0.5H6C6.27614 0.5 6.5 0.723858 6.5 1V2C6.5 2.27596 6.27596 2.5 6 2.5H3C2.72404 2.5 2.5 2.27596 2.5 2V1C2.5 0.724042 2.72404 0.5 3 0.5V0.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 1.5H7.5C8.05192 1.5 8.5 1.94808 8.5 2.5V9.5C8.5 10.0519 8.05192 10.5 7.5 10.5H1.5C0.948085 10.5 0.5 10.0519 0.5 9.5V2.5C0.5 1.94808 0.948085 1.5 1.5 1.5H2.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 6.5L4 7.5L6 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
