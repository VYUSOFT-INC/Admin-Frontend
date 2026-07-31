import type { SVGProps } from "react";

/**
 * Sidebar and topbar line icons, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so nav items can recolor on hover/active state
 * via Tailwind text-color utilities. Path geometry is unchanged from the
 * exported assets (see public/assets/icons/sidebar and /topbar for the
 * original files).
 */
type IconProps = SVGProps<SVGSVGElement>;

export function DashboardIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1.5 0.75H5.25C5.66394 0.75 6 1.08606 6 1.5V6.75C6 7.16394 5.66394 7.5 5.25 7.5H1.5C1.08606 7.5 0.75 7.16394 0.75 6.75V1.5C0.75 1.08606 1.08606 0.75 1.5 0.75V0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.75 0.75H13.5C13.9139 0.75 14.25 1.08606 14.25 1.5V3.75C14.25 4.16394 13.9139 4.5 13.5 4.5H9.75C9.33606 4.5 9 4.16394 9 3.75V1.5C9 1.08606 9.33606 0.75 9.75 0.75V0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.75 7.5H13.5C13.9139 7.5 14.25 7.83606 14.25 8.25V13.5C14.25 13.9139 13.9139 14.25 13.5 14.25H9.75C9.33606 14.25 9 13.9139 9 13.5V8.25C9 7.83606 9.33606 7.5 9.75 7.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 10.5H5.25C5.66394 10.5 6 10.8361 6 11.25V13.5C6 13.9139 5.66394 14.25 5.25 14.25H1.5C1.08606 14.25 0.75 13.9139 0.75 13.5V11.25C0.75 10.8361 1.08606 10.5 1.5 10.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VendorsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16.5035 15.75" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10.5008 15V11.25C10.5008 10.8361 10.1647 10.5 9.75078 10.5H6.75078C6.33685 10.5 6.00078 10.8361 6.00078 11.25V15M12.5813 6.9825C12.2565 6.67154 11.7444 6.67154 11.4195 6.9825C10.6951 7.67345 9.55569 7.67345 8.83128 6.9825C8.50655 6.67202 7.99501 6.67202 7.67028 6.9825C6.94577 7.67393 5.80579 7.67393 5.08128 6.9825C4.75646 6.67154 4.24436 6.67154 3.91953 6.9825C3.22158 7.64853 2.13216 7.67623 1.40126 7.04653C0.670367 6.41684 0.536591 5.3353 1.09203 4.5465L3.25878 1.4085C3.53793 0.996583 4.00319 0.749908 4.50078 0.75H12.0008C12.4969 0.74981 12.961 0.994917 13.2405 1.40475L15.4118 4.54875C15.9674 5.33821 15.8327 6.4205 15.1007 7.04977C14.3686 7.67904 13.2783 7.64961 12.5813 6.98175" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.25078 7.4625V13.5C2.25078 14.3279 2.92291 15 3.75078 15H12.7508C13.5787 15 14.2508 14.3279 14.2508 13.5V7.4625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProductsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 16.4985" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.75 15.546C7.2141 15.8139 7.7859 15.8139 8.25 15.546L13.5 12.546C13.9636 12.2783 14.2495 11.7838 14.25 11.2485V5.24846C14.2495 4.71311 13.9636 4.21864 13.5 3.95096L8.25 0.950962C7.7859 0.683013 7.2141 0.683013 6.75 0.950962L1.5 3.95096C1.03637 4.21864 0.75055 4.71311 0.75 5.24846V11.2485C0.75055 11.7838 1.03637 12.2783 1.5 12.546L6.75 15.546M7.5 15.7485V8.24846" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.9675 4.49846L7.5 8.24846L14.0325 4.49846M4.125 2.45096L10.875 6.31346" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function OrdersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 16.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10.5 6.75C10.5 8.40574 9.15575 9.75 7.5 9.75C5.84425 9.75 4.5 8.40574 4.5 6.75M0.82725 3.7755H14.1727" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.05 3.35025C0.855267 3.60989 0.75 3.92569 0.75 4.25025V14.25C0.75 15.0779 1.42213 15.75 2.25 15.75H12.75C13.5779 15.75 14.25 15.0779 14.25 14.25V4.25025C14.25 3.92569 14.1447 3.60989 13.95 3.35025L12.45 1.35C12.1667 0.972291 11.7221 0.75 11.25 0.75H3.75C3.27786 0.75 2.83328 0.972291 2.55 1.35L1.05 3.35025" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ReturnsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.5 13.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4.5 8.25L0.75 4.5L4.5 0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.75 4.5H8.625C10.9016 4.5 12.75 6.34835 12.75 8.625C12.75 10.9016 10.9016 12.75 8.625 12.75H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PaymentsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 15.7501" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.75 3.00001C9.03103 3.05877 11.2604 2.31564 13.05 0.900009C13.2773 0.729561 13.5813 0.702144 13.8354 0.829188C14.0895 0.956232 14.25 1.21593 14.25 1.50001V10.5C14.25 10.7841 14.0895 11.0438 13.8354 11.1708C13.5813 11.2979 13.2773 11.2705 13.05 11.1C11.2604 9.68438 9.03103 8.94125 6.75 9.00001H2.25C1.42213 9.00001 0.75 8.32788 0.75 7.50001V4.50001C0.75 3.67214 1.42213 3.00001 2.25 3.00001H6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 9.00001C3 10.9473 3.6316 12.8421 4.8 14.4C5.29706 15.0627 6.23726 15.1971 6.9 14.7C7.56274 14.203 7.69706 13.2628 7.2 12.6C6.42107 11.5614 6 10.2982 6 9.00001M4.5 3.00001V9.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PromotionsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16.5 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M11.25 14.25V12.75C11.25 11.0943 9.90575 9.75 8.25 9.75H3.75C2.09425 9.75 0.75 11.0943 0.75 12.75V14.25M11.25 0.846C12.5732 1.18902 13.4971 2.3831 13.4971 3.75C13.4971 5.1169 12.5732 6.31098 11.25 6.654M15.75 14.25V12.75C15.749 11.3828 14.8237 10.1893 13.5 9.8475" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 3.75C3 5.40575 4.34425 6.75 6 6.75C7.65575 6.75 9 5.40575 9 3.75C9 2.09425 7.65575 0.75 6 0.75C4.34425 0.75 3 2.09425 3 3.75V3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CustomersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 16.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0.75 7.5H3C3.82787 7.5 4.5 8.17213 4.5 9V11.25C4.5 12.0779 3.82787 12.75 3 12.75H2.25C1.42213 12.75 0.75 12.0779 0.75 11.25V7.5M0.75 7.5C0.75 3.77457 3.77457 0.75 7.5 0.75C11.2254 0.75 14.25 3.77457 14.25 7.5M14.25 7.5V11.25C14.25 12.0779 13.5779 12.75 12.75 12.75H12C11.1721 12.75 10.5 12.0779 10.5 11.25V9C10.5 8.17213 11.1721 7.5 12 7.5H0.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.25 11.25V12.75C14.25 14.4057 12.9057 15.75 11.25 15.75H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SupportIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4.5 2.25H13.5M4.5 6H13.5M4.5 9.75L10.875 15.75M4.5 9.75H6.75M6.75 9.75C11.7502 9.75 11.7502 2.25 6.75 2.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SettingsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14.935 16.4731" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5.72074 2.33893C5.80637 1.43806 6.56294 0.75 7.46787 0.75C8.37279 0.75 9.12936 1.43806 9.21499 2.33893C9.2654 2.90889 9.59049 3.41848 10.0861 3.70444C10.5817 3.99039 11.1856 4.01679 11.7042 3.77518C12.5264 3.4019 13.4977 3.71341 13.9494 4.49526C14.4011 5.27711 14.1858 6.27411 13.4517 6.79993C12.9835 7.12847 12.7048 7.66457 12.7048 8.23656C12.7048 8.80854 12.9835 9.34464 13.4517 9.67318C14.1858 10.199 14.4011 11.196 13.9494 11.9779C13.4977 12.7597 12.5264 13.0712 11.7042 12.6979C11.1856 12.4563 10.5817 12.4827 10.0861 12.7687C9.59049 13.0546 9.2654 13.5642 9.21499 14.1342C9.12936 15.035 8.37279 15.7231 7.46787 15.7231C6.56294 15.7231 5.80637 15.035 5.72074 14.1342C5.67043 13.564 5.34523 13.0542 4.84942 12.7682C4.3536 12.4822 3.74948 12.456 3.23074 12.6979C2.40856 13.0712 1.43731 12.7597 0.985605 11.9779C0.533902 11.196 0.749181 10.199 1.48324 9.67318C1.95146 9.34464 2.23021 8.80854 2.23021 8.23656C2.23021 7.66457 1.95146 7.12847 1.48324 6.79993C0.750251 6.27388 0.53554 5.27777 0.98673 4.49646C1.43792 3.71516 2.408 3.40325 3.22999 3.77518C3.74866 4.01679 4.35254 3.99039 4.84814 3.70444C5.34375 3.41848 5.66884 2.90889 5.71924 2.33893" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.21749 8.23693C5.21749 9.47874 6.22568 10.4869 7.46749 10.4869C8.7093 10.4869 9.71749 9.47874 9.71749 8.23693C9.71749 6.99512 8.7093 5.98693 7.46749 5.98693C6.22568 5.98693 5.21749 6.99512 5.21749 8.23693V8.23693" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.3333 14.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 0.666667V3.33333M9.33333 0.666667V3.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 2H11.3333C12.0692 2 12.6667 2.59745 12.6667 3.33333V12.6667C12.6667 13.4026 12.0692 14 11.3333 14H2C1.26411 14 0.666667 13.4026 0.666667 12.6667V3.33333C0.666667 2.59745 1.26411 2 2 2V2" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.666667 6H12.6667M4 8.66667H4.00667M6.66667 8.66667H6.67333M9.33333 8.66667H9.34M4 11.3333H4.00667M6.66667 11.3333H6.67333M9.33333 11.3333H9.34" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AdminIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 9.33333 11.6667" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.75 11.0833V9.91667C8.75 8.62886 7.70447 7.58333 6.41667 7.58333H2.91667C1.62886 7.58333 0.583333 8.62886 0.583333 9.91667V11.0833" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.33333 2.91667C2.33333 4.20447 3.37886 5.25 4.66667 5.25C5.95447 5.25 7 4.20447 7 2.91667C7 1.62886 5.95447 0.583333 4.66667 0.583333C3.37886 0.583333 2.33333 1.62886 2.33333 2.91667C2.33333 2.91667" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
