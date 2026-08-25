import type { SVGProps } from "react";

/**
 * Icons used on the Reseller Detail screen, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching the pattern
 * in `NavIcons.tsx`/`VendorDetailIcons.tsx`. Path geometry is unchanged from the exported assets
 * (Figma "Reseller Detail", node 1177:576). The breadcrumb back-arrow, chevron separator, store-URL
 * link glyph, dropdown chevron, and search glyph reuse existing icons elsewhere in the codebase
 * (`BackArrowIcon`/`ChevronDownIcon` in `VendorDetailIcons.tsx`, `ChevronRightIcon`/`SearchIcon` in
 * `VendorIcons.tsx`, `LinkIcon` in `ResellerIcons.tsx`) since they are the same glyphs.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** "Update Tier" button glyph (edit-pencil over a tag/file outline). Figma node 1177:716 (Group11). */
export function TierEditIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.3335 14.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.576 8.42267C7.4175 8.58108 7.30148 8.77689 7.23867 8.992L6.68067 10.9053C6.64659 11.0222 6.6789 11.1483 6.76496 11.2344C6.85103 11.3204 6.97716 11.3527 7.094 11.3187L9.00733 10.7607C9.22244 10.6979 9.41825 10.5818 9.57667 10.4233L12.252 7.75067C12.6097 7.39293 12.7495 6.87151 12.6185 6.38282C12.4876 5.89414 12.1059 5.51243 11.6172 5.38149C11.1285 5.25055 10.6071 5.39026 10.2493 5.748L7.576 8.42267M7.658 4.572C7.45671 4.45171 7.33342 4.2345 7.33333 4V0.666669"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.3333 12.43V12.6667C11.3333 13.4026 10.7359 14 10 14H2C1.26411 14 0.666667 13.4026 0.666667 12.6667V2C0.666667 1.26412 1.26411 0.666669 2 0.666669H7.33333C7.75958 0.665978 8.16848 0.835393 8.46933 1.13734L10.1467 2.81467M3.33333 11.3333H4"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "No flags detected" glyph on the Fraud Flags card. Figma node 1177:917 (Group16). */
export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.5 16.5025" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.75 9.00034C12.75 12.7503 10.125 14.6253 7.005 15.7128C6.84162 15.7682 6.66415 15.7656 6.5025 15.7053C3.375 14.6253 0.75 12.7503 0.75 9.00034V3.75034C0.75 3.3364 1.08606 3.00034 1.5 3.00034C3 3.00034 4.875 2.10034 6.18 0.960337C6.50826 0.679888 6.99174 0.679888 7.32 0.960337C8.6325 2.10784 10.5 3.00034 12 3.00034C12.4139 3.00034 12.75 3.3364 12.75 3.75034V9.00034"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.5 8.25034L6 9.75034L9 6.75034" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Copy Link" button glyph. Figma node 1177:764 (Group13). */
export function CopyIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.8333 12.8333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.25 4.08333H11.0833C11.7272 4.08333 12.25 4.6061 12.25 5.25V11.0833C12.25 11.7272 11.7272 12.25 11.0833 12.25H5.25C4.6061 12.25 4.08333 11.7272 4.08333 11.0833V5.25C4.08333 4.6061 4.6061 4.08333 5.25 4.08333V4.08333"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.75 8.75C1.10833 8.75 0.583333 8.225 0.583333 7.58333V1.75C0.583333 1.10833 1.10833 0.583333 1.75 0.583333H7.58333C8.225 0.583333 8.75 1.10833 8.75 1.75"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Date range" filter glyph on the Transaction History card. Figma node 1177:996 (Group). */
export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.3333 14.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2 2H11.3333C12.0692 2 12.6667 2.59745 12.6667 3.33333V12.6667C12.6667 13.4026 12.0692 14 11.3333 14H2C1.26411 14 0.666667 13.4026 0.666667 12.6667V3.33333C0.666667 2.59745 1.26411 2 2 2V2"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33333 0.666667V3.33333M0.666667 6H12.6667M4 0.666667V3.33333M10 8.66667H6M7.33333 11.3333H3.33333M3.33333 8.66667H3.34M10 11.3333H10.0067"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Status" filter label glyph on the Transaction History card. Figma node 1177:995 (SVG). */
export function FilterLinesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1.33333 3.33333H14.6667M4 8H12M6 12.6667H10" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Suspend Reseller" button glyph (circle-slash / no-entry), distinct from `SuspendIcon` in
 *  `VendorDetailIcons.tsx` (which uses a pause-bars glyph) — the Reseller Detail Action Panel uses
 *  this circle-slash glyph instead. Figma node 1177:1121 (Group). */
export function BanIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14.6667 14.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.666667 7.33333C0.666667 11.0128 3.6539 14 7.33333 14C11.0128 14 14 11.0128 14 7.33333C14 3.6539 11.0128 0.666667 7.33333 0.666667C3.6539 0.666667 0.666667 3.6539 0.666667 7.33333V7.33333"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M2.61933 2.61933L12.0467 12.0473" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "PAN Number ... Verified" badge glyph (scalloped seal). Figma node 1177:1151 (Group). */
export function VerifiedRosetteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16.5046 16.4987" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.1457 5.71141C1.92322 4.70922 2.22863 3.66285 2.9553 2.9377C3.68197 2.21255 4.72898 1.90933 5.7307 2.13391C6.282 1.2717 7.2348 0.75 8.2582 0.75C9.2816 0.75 10.2344 1.2717 10.7857 2.13391C11.789 1.90834 12.8379 2.21237 13.5651 2.93953C14.2922 3.66668 14.5963 4.71561 14.3707 5.71891C15.2329 6.27021 15.7546 7.22301 15.7546 8.24641C15.7546 9.26981 15.2329 10.2226 14.3707 10.7739C14.5953 11.7756 14.2921 12.8226 13.5669 13.5493C12.8418 14.276 11.7954 14.5814 10.7932 14.3589C10.2426 15.2245 9.28783 15.7487 8.26195 15.7487C7.23607 15.7487 6.28133 15.2245 5.7307 14.3589C4.72898 14.5835 3.68197 14.2803 2.9553 13.5551C2.22863 12.83 1.92322 11.7836 2.1457 10.7814C1.27673 10.2315 0.75 9.27477 0.75 8.24641C0.75 7.21805 1.27673 6.26135 2.1457 5.71141"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6.0082 8.24641L7.5082 9.74641L10.5082 6.74641" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
