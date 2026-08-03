import type { SVGProps } from "react";

/**
 * Icons used on the Promotions Campaigns screen, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching the pattern
 * in `PaymentIcons.tsx` / `OrderIcons.tsx`. Path geometry is unchanged from the exported assets
 * (see public/assets/icons/promotions for the originals). Pagination chevrons reuse
 * `ChevronLeftIcon`/`ChevronRightIcon` from `VendorIcons.tsx` since those exports are
 * pixel-identical (same convention `PayoutsPagination` already follows).
 */
type IconProps = SVGProps<SVGSVGElement>;

/** "Create Coupon" button icon — a plus glyph. */
export function PlusIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3.125 7.5H11.875M7.5 3.125V11.875" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Coupon row "Edit" action icon — a pencil glyph. */
export function EditIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.4693 3.68983C12.0652 3.09402 12.0653 2.12644 11.4695 1.53048C10.8737 0.934514 9.90613 0.934393 9.31017 1.53021L2.08108 8.76092C1.95532 8.88631 1.86231 9.04071 1.81025 9.2105L1.09471 11.5678C1.06619 11.6633 1.09236 11.7667 1.16285 11.837C1.23334 11.9074 1.33677 11.9334 1.43217 11.9048L3.79004 11.1898C3.95968 11.1382 4.11405 11.0457 4.23963 10.9205L11.4693 3.68983M8.125 2.70833L10.2917 4.875"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Coupon row "Delete" action icon — a trash-can glyph. */
export function TrashIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.41667 5.95833V9.20833M7.58333 5.95833V9.20833M10.2917 3.25V10.8333C10.2917 11.4312 9.80624 11.9167 9.20833 11.9167H3.79167C3.19376 11.9167 2.70833 11.4312 2.70833 10.8333V3.25M1.625 3.25H11.375M4.33333 3.25V2.16667C4.33333 1.56876 4.81876 1.08333 5.41667 1.08333H7.58333C8.18124 1.08333 8.66667 1.56876 8.66667 2.16667V3.25"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
