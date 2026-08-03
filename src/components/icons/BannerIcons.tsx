import type { SVGProps } from "react";

/**
 * Icons specific to the Banners Content screen (Figma node 1071:7435), inlined from the
 * Figma export SVGs with `stroke="currentColor"` so they can recolor via Tailwind text
 * utilities, matching the pattern in `PromotionIcons.tsx`. Path geometry is unchanged from the
 * exported assets (see public/assets/icons/promotions for the originals). The "Save Strip"
 * button reuses `SaveIcon` from `VendorDetailIcons.tsx` instead of a new asset here — that
 * glyph's path data is pixel-identical to this screen's Figma export for the same action.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** "Upload New" button icon — an upload-to-tray glyph. */
export function UploadIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.5 1.625V8.125M9.20833 4.33333L6.5 1.625L3.79167 4.33333M11.375 8.125V10.2917C11.375 10.8896 10.8896 11.375 10.2917 11.375H2.70833C2.11043 11.375 1.625 10.8896 1.625 10.2917V8.125"
        stroke="currentColor"
        strokeWidth="1.08333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Empty banner slot's "No banner set" placeholder icon — a photo/image glyph. */
export function ImagePlaceholderIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 23.3333 23.3333" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 1.16667H19.8333C21.1211 1.16667 22.1667 2.2122 22.1667 3.5V19.8333C22.1667 21.1211 21.1211 22.1667 19.8333 22.1667H3.5C2.2122 22.1667 1.16667 21.1211 1.16667 19.8333V3.5C1.16667 2.2122 2.2122 1.16667 3.5 1.16667V1.16667"
        stroke="currentColor"
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83333 8.16667C5.83333 9.45447 6.87886 10.5 8.16667 10.5C9.45447 10.5 10.5 9.45447 10.5 8.16667C10.5 6.87886 9.45447 5.83333 8.16667 5.83333C6.87886 5.83333 5.83333 6.87886 5.83333 8.16667V8.16667"
        stroke="currentColor"
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.1667 15.1667L18.5663 11.5663C17.6552 10.6554 16.1782 10.6554 15.267 11.5663L4.66667 22.1667"
        stroke="currentColor"
        strokeWidth="2.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Discovery banner's purple info-note icon — a small shopping-bag glyph. */
export function StorefrontNoteIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 9.16863 8.75" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.83377 8.33333V6.25C5.83377 6.01988 5.64722 5.83333 5.4171 5.83333H3.75043C3.52032 5.83333 3.33377 6.01988 3.33377 6.25V8.33333M6.9896 3.87917C6.80914 3.70641 6.52464 3.70641 6.34418 3.87917C5.94173 4.26303 5.30872 4.26303 4.90627 3.87917C4.72586 3.70668 4.44167 3.70668 4.26127 3.87917C3.85876 4.26329 3.22544 4.26329 2.82293 3.87917C2.64248 3.70641 2.35798 3.70641 2.17752 3.87917C1.78977 4.24918 1.18453 4.26457 0.778478 3.91474C0.372426 3.56491 0.298106 2.96406 0.606684 2.52583L1.81043 0.7825C1.96552 0.553657 2.22399 0.416616 2.50043 0.416667H6.6671C6.94271 0.416561 7.20055 0.552731 7.35585 0.780417L8.5621 2.52708C8.87076 2.96567 8.79597 3.56694 8.38925 3.91654C7.98254 4.26613 7.37686 4.24978 6.9896 3.87875"
        stroke="currentColor"
        strokeWidth="0.833333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.25043 4.14583V7.5C1.25043 7.96024 1.62353 8.33333 2.08377 8.33333H7.08377C7.544 8.33333 7.9171 7.96024 7.9171 7.5V4.14583"
        stroke="currentColor"
        strokeWidth="0.833333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
