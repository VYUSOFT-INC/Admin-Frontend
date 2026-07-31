import type { SVGProps } from "react";

/**
 * Icons used on the Vendor Management screen, inlined from the Figma export
 * SVGs with `stroke="currentColor"` so they can recolor via Tailwind text
 * utilities, matching the pattern in `NavIcons.tsx`. Path geometry is
 * unchanged from the exported assets (see public/assets/icons/vendors for
 * the original files).
 */
type IconProps = SVGProps<SVGSVGElement>;

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.5 12.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11.875 11.875L9.1625 9.1625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.625 5.625C0.625 8.38458 2.86542 10.625 5.625 10.625C8.38458 10.625 10.625 8.38458 10.625 5.625C10.625 2.86542 8.38458 0.625 5.625 0.625C2.86542 0.625 0.625 2.86542 0.625 5.625V5.625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.83333 2.91667H1.75M7 11.0833H1.75M8.16667 1.75V4.08333M9.33333 9.91667V12.25M12.25 7H7M12.25 11.0833H9.33333M12.25 2.91667H8.16667M4.66667 5.83333V8.16667M4.66667 7H1.75" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ExportIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.6667 11.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.83333 7.58333V0.583333M11.0833 7.58333V9.91667C11.0833 10.5606 10.5606 11.0833 9.91667 11.0833H1.75C1.1061 11.0833 0.583333 10.5606 0.583333 9.91667V7.58333" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.91667 4.66667L5.83333 7.58333L8.75 4.66667" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LocationIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 9 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.5 4.5C8.5 6.9965 5.7305 9.5965 4.8005 10.3995C4.62252 10.5333 4.37748 10.5333 4.1995 10.3995C3.2695 9.5965 0.5 6.9965 0.5 4.5C0.5 2.29234 2.29234 0.5 4.5 0.5C6.70766 0.5 8.5 2.29234 8.5 4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 4.5C3 5.32787 3.67213 6 4.5 6C5.32787 6 6 5.32787 6 4.5C6 3.67213 5.32787 3 4.5 3C3.67213 3 3 3.67213 3 4.5V4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VerifiedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.0031 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1.43047 3.80761C1.28214 3.13948 1.48576 2.4419 1.9702 1.95847C2.45465 1.47504 3.15265 1.27288 3.82047 1.42261C4.188 0.847798 4.8232 0.5 5.50547 0.5C6.18773 0.5 6.82293 0.847798 7.19047 1.42261C7.85934 1.27223 8.55862 1.47492 9.04339 1.95968C9.52816 2.44445 9.73085 3.14374 9.58047 3.81261C10.1553 4.18014 10.5031 4.81534 10.5031 5.49761C10.5031 6.17987 10.1553 6.81507 9.58047 7.18261C9.73019 7.85042 9.52804 8.54843 9.04461 9.03287C8.56117 9.51732 7.8636 9.72093 7.19547 9.57261C6.82838 10.1497 6.19189 10.4991 5.50797 10.4991C4.82405 10.4991 4.18755 10.1497 3.82047 9.57261C3.15265 9.72233 2.45465 9.52018 1.9702 9.03675C1.48576 8.55331 1.28214 7.85574 1.43047 7.18761C0.851156 6.82098 0.5 6.18318 0.5 5.49761C0.5 4.81203 0.851156 4.17423 1.43047 3.80761" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.00547 5.49761L5.00547 6.49761L7.00547 4.49761" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.25 10.5L8.75 7L5.25 3.5" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
