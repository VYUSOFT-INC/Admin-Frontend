import type { SVGProps } from "react";

/**
 * Icons used on the Analytics & Reports screen (Figma node 1143:2), inlined from the Figma
 * export SVGs with `stroke="currentColor"` so they can recolor via Tailwind text utilities,
 * matching the pattern in `NavIcons.tsx`. Path geometry is unchanged from the exported assets.
 * The sidebar nav glyph lives in `NavIcons.tsx` (`AnalyticsIcon`) alongside the other nav icons;
 * `Total Orders`' stat-card icon reuses `NavIcons.OrdersIcon` (identical glyph); the header's
 * "Export Reports" button reuses `VendorIcons.ExportIcon` (identical glyph, different export
 * scale); the date-range dropdown's chevron reuses `VendorDetailIcons.ChevronDownIcon` (identical
 * glyph).
 */
type IconProps = SVGProps<SVGSVGElement>;

/** "Last 30 days" date-range dropdown icon — a calendar with dashes, distinct from
 * `NavIcons.CalendarIcon` (dot grid) used on the Topbar's "Today" pill. */
export function DateRangeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.5 13.75" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.875 1.875H10.625C11.3149 1.875 11.875 2.43511 11.875 3.125V11.875C11.875 12.5649 11.3149 13.125 10.625 13.125H1.875C1.18511 13.125 0.625 12.5649 0.625 11.875V3.125C0.625 2.43511 1.18511 1.875 1.875 1.875V1.875"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.75 0.625V3.125M0.625 5.625H11.875M3.75 0.625V3.125M9.375 8.125H5.625M6.875 10.625H3.125M3.125 8.125H3.13125M9.375 10.625H9.38125"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Total GMV" stat card icon — a rupee mark inside a scalloped/flower badge. */
export function GmvIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16.5046 16.4987" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.1457 5.71141C1.92322 4.70922 2.22863 3.66285 2.9553 2.9377C3.68197 2.21255 4.72898 1.90933 5.7307 2.13391C6.282 1.2717 7.2348 0.75 8.2582 0.75C9.2816 0.75 10.2344 1.2717 10.7857 2.13391C11.789 1.90834 12.8379 2.21237 13.5651 2.93953C14.2922 3.66668 14.5963 4.71561 14.3707 5.71891C15.2329 6.27021 15.7546 7.22301 15.7546 8.24641C15.7546 9.26981 15.2329 10.2226 14.3707 10.7739C14.5953 11.7756 14.2921 12.8226 13.5669 13.5493C12.8418 14.276 11.7954 14.5814 10.7932 14.3589C10.2426 15.2245 9.28783 15.7487 8.26195 15.7487C7.23607 15.7487 6.28133 15.2245 5.7307 14.3589C4.72898 14.5835 3.68197 14.2803 2.9553 13.5551C2.22863 12.83 1.92322 11.7836 2.1457 10.7814C1.27673 10.2315 0.75 9.27477 0.75 8.24641C0.75 7.21805 1.27673 6.26135 2.1457 5.71141M5.2582 5.24641H11.2582M5.2582 8.24641H11.2582"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.0082 11.9964L5.2582 11.2464H6.0082C7.66395 11.2464 9.0082 9.90216 9.0082 8.24641C9.0082 6.59067 7.66395 5.24641 6.0082 5.24641"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Platform Revenue" stat card icon — an inbox/tray glyph. */
export function RevenueIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.25 0.75H12.75C13.5779 0.75 14.25 1.42213 14.25 2.25V12.75C14.25 13.5779 13.5779 14.25 12.75 14.25H2.25C1.42213 14.25 0.75 13.5779 0.75 12.75V2.25C0.75 1.42213 1.42213 0.75 2.25 0.75V0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.75 5.25C0.75 4.42213 1.42213 3.75 2.25 3.75H12.75C13.5779 3.75 14.25 4.42213 14.25 5.25M0.75 6.75H3C3.6 6.75 4.2 6.975 4.575 7.425L5.4 8.1C6.6 9.3 8.475 9.3 9.675 8.1L10.5 7.425C10.875 7.05 11.475 6.75 12.075 6.75H14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Avg Order Value" stat card icon — a scalloped receipt/ticket glyph. */
export function AvgOrderValueIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.75 12H6M10.5 6H6M12 9H6M3 2.25C3 1.83606 3.33606 1.5 3.75 1.5C3.93571 1.49898 4.11786 1.55102 4.275 1.65L4.97475 2.1C5.29486 2.30455 5.70464 2.30455 6.02475 2.1L6.72525 1.65C7.04536 1.44545 7.45514 1.44545 7.77525 1.65L8.475 2.1C8.79511 2.30455 9.20489 2.30455 9.525 2.1L10.2248 1.65C10.5449 1.44545 10.9546 1.44545 11.2747 1.65L11.9753 2.1C12.2954 2.30455 12.7051 2.30455 13.0253 2.1L13.725 1.65C13.8821 1.55102 14.0643 1.49898 14.25 1.5C14.6639 1.5 15 1.83606 15 2.25V15.75C15 16.1639 14.6639 16.5 14.25 16.5C14.0643 16.501 13.8821 16.449 13.725 16.35L13.0253 15.9C12.7051 15.6954 12.2954 15.6954 11.9753 15.9L11.2747 16.35C10.9546 16.5546 10.5449 16.5546 10.2248 16.35L9.525 15.9C9.20489 15.6954 8.79511 15.6954 8.475 15.9L7.77525 16.35C7.45514 16.5546 7.04536 16.5546 6.72525 16.35L6.02475 15.9C5.70464 15.6954 5.29486 15.6954 4.97475 15.9L4.275 16.35C4.11786 16.449 3.93571 16.501 3.75 16.5C3.33606 16.5 3 16.1639 3 15.75L9.75 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
