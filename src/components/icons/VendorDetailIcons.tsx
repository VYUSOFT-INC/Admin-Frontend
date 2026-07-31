import type { SVGProps } from "react";

/**
 * Icons used on the Vendor Detail screen, inlined from the Figma export SVGs
 * with `stroke="currentColor"` so they can recolor via Tailwind text
 * utilities, matching the pattern in `VendorIcons.tsx`. Path geometry is
 * unchanged from the exported assets (see public/assets/icons/vendors for
 * the original files). The address-proof pin reuses `LocationIcon` from
 * `VendorIcons.tsx` since it is the same glyph at a different export scale.
 */
type IconProps = SVGProps<SVGSVGElement>;

export function BackArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 12.6667L3.33333 8L8 3.33333M12.6667 8H3.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckSmallIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.16667 2.75L4.125 7.79167L1.83333 5.5" stroke="currentColor" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ApproveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14.6674 14.6676" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.8658 6.00254C14.4932 9.08155 12.8854 12.1806 10.0068 13.4407C7.12826 14.7009 3.76059 13.7798 1.92399 11.2302C0.0873846 8.68048 0.280534 5.19448 2.38757 2.86332C4.49461 0.532153 7.94342 -0.0111997 10.6651 1.5592" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.33181 6.6692L7.33181 8.6692L13.9985 2.00254" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RejectIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14.6667 14.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.666667 7.33333C0.666667 11.0128 3.6539 14 7.33333 14C11.0128 14 14 11.0128 14 7.33333C14 3.6539 11.0128 0.666667 7.33333 0.666667C3.6539 0.666667 0.666667 3.6539 0.666667 7.33333V7.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.33333 5.33333L5.33333 9.33333M5.33333 5.33333L9.33333 9.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SuspendIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14.6667 14.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.666667 7.33333C0.666667 11.0128 3.6539 14 7.33333 14C11.0128 14 14 11.0128 14 7.33333C14 3.6539 11.0128 0.666667 7.33333 0.666667C3.6539 0.666667 0.666667 3.6539 0.666667 7.33333V7.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 9.33333V5.33333M8.66667 9.33333V5.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ReinstateIcon(props: IconProps) {
  // Reuses the Approve glyph — Reinstate is the positive/allow action for a
  // Suspended vendor, mirroring how "Approve" is the positive action for Pending.
  return <ApproveIcon {...props} />;
}

export function SaveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 10.8334 10.8333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.15 0.541668C7.43575 0.545738 7.70832 0.662552 7.90833 0.866668L9.96667 2.925C10.1708 3.12502 10.2876 3.39758 10.2917 3.68333V9.20833C10.2917 9.80624 9.80624 10.2917 9.20833 10.2917H1.625C1.02709 10.2917 0.541667 9.80624 0.541667 9.20833V1.625C0.541667 1.02709 1.02709 0.541668 1.625 0.541668H7.15" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.125 10.2917V6.5C8.125 6.20105 7.88229 5.95833 7.58333 5.95833H3.25C2.95105 5.95833 2.70833 6.20105 2.70833 6.5V10.2917M2.70833 0.541668V2.70833C2.70833 3.00729 2.95105 3.25 3.25 3.25H7.04167" stroke="currentColor" strokeWidth="1.08333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CertificateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.83333 10.5V6.41667M6.48608 1.28625C6.81023 1.1272 7.18976 1.1272 7.51392 1.28625L12.0872 3.52975C12.2092 3.58951 12.2738 3.72554 12.243 3.85782C12.2122 3.9901 12.0941 4.08361 11.9583 4.08333H2.04167C1.90596 4.08333 1.78818 3.98974 1.75753 3.85753C1.72689 3.72533 1.79147 3.58946 1.91333 3.52975L5.83333 10.5M8.16667 10.5V6.41667M10.5 10.5V6.41667M1.75 12.8333H12.25M3.5 10.5V6.41667" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IdCardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 10.5 12.8333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1.75 12.25C1.1061 12.25 0.583333 11.7272 0.583333 11.0833V1.75C0.583333 1.1061 1.1061 0.583335 1.75 0.583335H6.41667C6.78963 0.582731 7.14742 0.730969 7.41067 0.995168L9.50367 3.08817C9.76858 3.35151 9.91727 3.7098 9.91667 4.08333V11.0833C9.91667 11.7272 9.3939 12.25 8.75 12.25H1.75" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.41667 0.583335V3.5C6.41667 3.82195 6.67805 4.08334 7 4.08334H9.91667M4.08333 4.66667H2.91667M7.58333 7H2.91667M7.58333 9.33334H2.91667" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ReceiptCardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.8333 9.33333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1.75 0.583333H11.0833C11.7272 0.583333 12.25 1.1061 12.25 1.75V7.58333C12.25 8.22723 11.7272 8.75 11.0833 8.75H1.75C1.1061 8.75 0.583333 8.22723 0.583333 7.58333V1.75C0.583333 1.1061 1.1061 0.583333 1.75 0.583333V0.583333" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.583333 3.5H12.25" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 10.0833 10.0833" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.458333 5.04167C0.458333 7.57128 2.51206 9.625 5.04167 9.625C7.57128 9.625 9.625 7.57128 9.625 5.04167C9.625 2.51206 7.57128 0.458333 5.04167 0.458333C2.51206 0.458333 0.458333 2.51206 0.458333 5.04167V5.04167" stroke="currentColor" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.04167 2.29167V5.04167L6.875 5.95833" stroke="currentColor" strokeWidth="0.916667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
