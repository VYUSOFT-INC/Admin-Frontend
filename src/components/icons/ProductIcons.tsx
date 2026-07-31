import type { SVGProps } from "react";

/**
 * Icons used on the Products screen, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text utilities,
 * matching the pattern in `VendorIcons.tsx`. Path geometry is unchanged from
 * the exported assets (see public/assets/icons/products for the originals).
 * Search/Export/Chevron-left/Chevron-right are reused from `VendorIcons.tsx`
 * since the Figma exports for those are pixel-identical to the vendors set.
 */
type IconProps = SVGProps<SVGSVGElement>;

export function EyeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.9172 8.666" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.575524 4.5215C0.530381 4.39989 0.530381 4.26611 0.575524 4.1445C1.4747 1.96424 3.60021 0.541667 5.95861 0.541667C8.31701 0.541667 10.4425 1.96424 11.3417 4.1445C11.3868 4.26611 11.3868 4.39989 11.3417 4.5215C10.4425 6.70176 8.31701 8.12433 5.95861 8.12433C3.60021 8.12433 1.4747 6.70176 0.575524 4.5215"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.33361 4.333C4.33361 5.22986 5.06175 5.958 5.95861 5.958C6.85547 5.958 7.58361 5.22986 7.58361 4.333C7.58361 3.43614 6.85547 2.708 5.95861 2.708C5.06175 2.708 4.33361 3.43614 4.33361 4.333V4.333"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3.25 4.875L6.5 8.125L9.75 4.875" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Used on the Product Review screen's "Approve with Override" action — a shield-check glyph, distinct from the plain circle-check `ApproveIcon` in `VendorDetailIcons.tsx`. */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 14.6689" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.3333 8.0003C11.3333 11.3336 9 13.0003 6.22667 13.967C6.08144 14.0162 5.92369 14.0138 5.78 13.9603C3 13.0003 0.666667 11.3336 0.666667 8.0003V3.33363C0.666667 2.96569 0.96539 2.66697 1.33333 2.66697C2.66667 2.66697 4.33333 1.86697 5.49333 0.853633C5.78512 0.604345 6.21488 0.604345 6.50667 0.853633C7.67333 1.87363 9.33333 2.66697 10.6667 2.66697C11.0346 2.66697 11.3333 2.96569 11.3333 3.33363V8.0003"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4 7.33363L5.33333 8.66697L8 6.0003" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Bare "X" used inside a colored circle for a failed Quality Checklist row (the circle/background is applied by the parent, matching the Figma export). */
export function CrossIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Small padlock used next to the "Internal only — not visible to vendor" hint on the Product Review screen's Admin Notes. */
export function LockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 9.16667 10.0833" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.375 4.58333H7.79167C8.29759 4.58333 8.70833 4.99408 8.70833 5.5V8.70833C8.70833 9.21426 8.29759 9.625 7.79167 9.625H1.375C0.869078 9.625 0.458333 9.21426 0.458333 8.70833V5.5C0.458333 4.99408 0.869078 4.58333 1.375 4.58333V4.58333"
        stroke="currentColor"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.29167 4.58333V2.75C2.29167 1.48519 3.31853 0.458333 4.58333 0.458333C5.84814 0.458333 6.875 1.48519 6.875 2.75V4.58333" stroke="currentColor" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** External-link glyph used on the Product Review screen's Vendor card to indicate it navigates to the Vendor Detail/Management screen. */
export function ExternalLinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.375 1.875H13.125V5.625M6.25 8.75L13.125 1.875M11.25 8.125V11.875C11.25 12.5649 10.6899 13.125 10 13.125H3.125C2.43511 13.125 1.875 12.5649 1.875 11.875V5C1.875 4.31011 2.43511 3.75 3.125 3.75H6.875"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
