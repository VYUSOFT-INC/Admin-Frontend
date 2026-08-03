import type { SVGProps } from "react";

/**
 * Icons used on the Order Detail screen, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching the
 * pattern in `VendorIcons.tsx` / `ProductIcons.tsx`. Path geometry is unchanged from the
 * exported assets (see public/assets/icons/orders for the originals). Back arrow, breadcrumb
 * chevron, location pin, timeline checkmark, reject/cancel, save, and lock icons are reused
 * from `VendorDetailIcons.tsx` / `VendorIcons.tsx` / `ProductIcons.tsx` since those glyphs are
 * pixel-identical to this screen's exports; the calendar icon reuses `NavIcons.tsx`'s.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** "Delivery" fulfillment badge icon (order strip). */
export function TruckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 10.0833 8.25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.95833 6.875V1.375C5.95833 0.869078 5.54759 0.458333 5.04167 0.458333H1.375C0.869078 0.458333 0.458333 0.869078 0.458333 1.375V6.41667C0.458333 6.66963 0.663706 6.875 0.916667 6.875H1.83333M6.41667 6.875H3.66667M8.25 6.875H9.16667C9.41963 6.875 9.625 6.66963 9.625 6.41667V4.74375C9.62482 4.63974 9.58926 4.53888 9.52417 4.45775L7.92917 2.464C7.84234 2.35527 7.71082 2.29187 7.57167 2.29167H5.95833"
        stroke="currentColor"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.41667 6.875C6.41667 7.38092 6.82741 7.79167 7.33333 7.79167C7.83926 7.79167 8.25 7.38092 8.25 6.875C8.25 6.36908 7.83926 5.95833 7.33333 5.95833C6.82741 5.95833 6.41667 6.36908 6.41667 6.875V6.875"
        stroke="currentColor"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.83333 6.875C1.83333 7.38092 2.24408 7.79167 2.75 7.79167C3.25592 7.79167 3.66667 7.38092 3.66667 6.875C3.66667 6.36908 3.25592 5.95833 2.75 5.95833C2.24408 5.95833 1.83333 6.36908 1.83333 6.875V6.875"
        stroke="currentColor"
        strokeWidth="0.916667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Shipped" active timeline-step icon — a distinct truck export from `TruckIcon` above. */
export function ShippedTruckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.5 7.5V1.5C6.5 0.948085 6.05192 0.5 5.5 0.5H1.5C0.948085 0.5 0.5 0.948085 0.5 1.5V7C0.5 7.27596 0.724042 7.5 1 7.5H2M7 7.5H4M9 7.5H10C10.276 7.5 10.5 7.27596 10.5 7V5.175C10.4998 5.06153 10.461 4.95151 10.39 4.863L8.65 2.688C8.55528 2.56938 8.4118 2.50022 8.26 2.5H6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 7.5C7 8.05192 7.44808 8.5 8 8.5C8.55192 8.5 9 8.05192 9 7.5C9 6.94808 8.55192 6.5 8 6.5C7.44808 6.5 7 6.94808 7 7.5V7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7.5C2 8.05192 2.44808 8.5 3 8.5C3.55192 8.5 4 8.05192 4 7.5C4 6.94808 3.55192 6.5 3 6.5C2.44808 6.5 2 6.94808 2 7.5V7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Customer card "Full Name" row icon. */
export function PersonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 10 12.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M9.375 11.875V10.625C9.375 9.24521 8.25479 8.125 6.875 8.125H3.125C1.74521 8.125 0.625 9.24521 0.625 10.625V11.875" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 3.125C2.5 4.50479 3.62021 5.625 5 5.625C6.37979 5.625 7.5 4.50479 7.5 3.125C7.5 1.74521 6.37979 0.625 5 0.625C3.62021 0.625 2.5 1.74521 2.5 3.125V3.125" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Customer/Vendor card "Phone"/"Contact" row icon. */
export function PhoneIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.645 10.355C8.91088 10.4771 9.22589 10.3984 9.40312 10.1656L9.625 9.875C9.86107 9.56024 10.2316 9.375 10.625 9.375H12.5C13.1899 9.375 13.75 9.93511 13.75 10.625V12.5C13.75 13.1899 13.1899 13.75 12.5 13.75C6.29096 13.75 1.25 8.70904 1.25 2.5C1.25 1.81011 1.81011 1.25 2.5 1.25H4.375C5.06489 1.25 5.625 1.81011 5.625 2.5V4.375C5.625 4.76845 5.43976 5.13893 5.125 5.375L4.8325 5.59438C4.59592 5.77502 4.51956 6.09744 4.65 6.365C5.50418 8.09992 6.90902 9.503 8.645 10.355"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Customer card "Email" row icon. */
export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.7502 11.25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.1251 2.5L7.5057 6.07938C7.11753 6.30484 6.63826 6.30484 6.25008 6.07938L0.625079 2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M1.87508 0.625H11.8751C12.565 0.625 13.1251 1.18511 13.1251 1.875V9.375C13.1251 10.0649 12.565 10.625 11.8751 10.625H1.87508C1.18519 10.625 0.625079 10.0649 0.625079 9.375V1.875C0.625079 1.18511 1.18519 0.625 1.87508 0.625V0.625"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Vendor card "Vendor" row icon — storefront with scalloped awning. */
export function StoreIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.7529 13.125" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.75065 12.5V9.375C8.75065 9.03005 8.4706 8.75 8.12565 8.75H5.62565C5.28071 8.75 5.00065 9.03005 5.00065 9.375V12.5M10.4844 5.81875C10.2137 5.55962 9.78697 5.55962 9.51628 5.81875C8.9126 6.39454 7.96308 6.39454 7.3594 5.81875C7.0888 5.56002 6.66251 5.56002 6.3919 5.81875C5.78815 6.39494 4.83816 6.39494 4.2344 5.81875C3.96371 5.55962 3.53697 5.55962 3.26628 5.81875C2.68465 6.37377 1.7768 6.39686 1.16772 5.87211C0.558639 5.34737 0.447159 4.44608 0.910027 3.78875L2.71565 1.17375C2.94828 0.830486 3.33599 0.624924 3.75065 0.625H10.0007C10.4141 0.624841 10.8008 0.829097 11.0338 1.17063L12.8432 3.79063C13.3061 4.44851 13.194 5.35041 12.5839 5.87481C11.9738 6.3992 11.0653 6.37467 10.4844 5.81813"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M1.87565 6.21875V11.25C1.87565 11.9399 2.43576 12.5 3.12565 12.5H10.6257C11.3155 12.5 11.8757 11.9399 11.8757 11.25V6.21875" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Vendor card "Warehouse Address" row icon — a building, distinct from the customer's plain location pin. */
export function WarehouseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13.75 13.1252" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10.625 12.5002V5.62524C10.625 5.28029 10.3449 5.00024 10 5.00024H3.75C3.40505 5.00024 3.125 5.28029 3.125 5.62524V12.5002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M13.125 11.2502C13.125 11.9401 12.5649 12.5002 11.875 12.5002H1.875C1.18511 12.5002 0.625 11.9401 0.625 11.2502V4.37524C0.624718 3.89488 0.899733 3.45684 1.3325 3.24837L6.30125 0.764616C6.66132 0.578461 7.0893 0.578461 7.44938 0.764616L12.4169 3.24837C12.8499 3.45667 13.1252 3.89473 13.125 4.37524V11.2502M3.125 7.50024H10.625M3.125 10.0002H10.625"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Tracking No:" chip icon on the Shipped timeline step. */
export function TrackingIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.625 3.79167V2.70833C1.625 2.11043 2.11043 1.625 2.70833 1.625H3.79167M9.20833 1.625H10.2917C10.8896 1.625 11.375 2.11043 11.375 2.70833V3.79167M11.375 9.20833V10.2917C11.375 10.8896 10.8896 11.375 10.2917 11.375H9.20833M3.79167 11.375H2.70833C2.11043 11.375 1.625 10.8896 1.625 10.2917V9.20833M4.33333 3.79167V9.20833M6.5 3.79167V9.20833M9.20833 3.79167V9.20833"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Delivered" upcoming/done timeline-step icon — a package with a checkmark. */
export function PackageDeliveredIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 10.5 10.999" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M5 10.499V5.49897M7 7.99897L8 8.99897L10 6.99897" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M9.5 5.06247V3.49897C9.49963 3.14208 9.30908 2.81242 9 2.63397L5.5 0.633975C5.1906 0.455342 4.8094 0.455342 4.5 0.633975L1 2.63397C0.690917 2.81242 0.500367 3.14208 0.500001 3.49897V7.49897C0.500545 7.8557 0.691071 8.18511 1 8.36347L4.5 10.3635C4.80931 10.5423 5.19051 10.5425 5.5 10.364L6.16 9.98747"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M0.645001 2.99897L5 5.49897L9.355 2.99897M2.75 1.63397L7.2485 4.20797" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** "Flag Order" admin action icon. */
export function FlagIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2.33333 12.8333V2.33333C2.33333 2.14972 2.41978 1.97683 2.56667 1.86667C3.1725 1.41229 3.90937 1.16667 4.66667 1.16667C6.41667 1.16667 7.58333 2.33333 8.94425 2.33333C9.72203 2.33333 10.3184 2.17778 10.7333 1.86667C10.9101 1.7341 11.1466 1.71277 11.3442 1.81158C11.5418 1.9104 11.6667 2.11238 11.6667 2.33333V8.16667C11.6667 8.35028 11.5802 8.52317 11.4333 8.63333C10.8275 9.08771 10.0906 9.33333 9.33333 9.33333C7.58333 9.33333 6.41667 8.16667 4.66667 8.16667C3.80573 8.16669 2.97501 8.48402 2.33333 9.058"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "Escalate" admin action icon — headset/support glyph. */
export function EscalateIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 11.6667 12.8333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.583333 5.83333H2.33333C2.97723 5.83333 3.5 6.3561 3.5 7V8.75C3.5 9.3939 2.97723 9.91667 2.33333 9.91667H1.75C1.1061 9.91667 0.583333 9.3939 0.583333 8.75V5.83333M0.583333 5.83333C0.583333 2.93578 2.93578 0.583333 5.83333 0.583333C8.73089 0.583333 11.0833 2.93578 11.0833 5.83333M11.0833 5.83333V8.75C11.0833 9.3939 10.5606 9.91667 9.91667 9.91667H9.33333C8.68943 9.91667 8.16667 9.3939 8.16667 8.75V7C8.16667 6.3561 8.68943 5.83333 9.33333 5.83333H0.583333"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11.0833 8.75V9.91667C11.0833 11.2045 10.0378 12.25 8.75 12.25H5.83333" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
