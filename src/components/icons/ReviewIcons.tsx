import type { SVGProps } from "react";

/**
 * Icons used on the Reviews Moderation screen (Figma node 1143:1023), inlined from the Figma
 * export SVGs with `stroke="currentColor"` so they can recolor via Tailwind text utilities —
 * same convention as `InventoryIcons.tsx`. Chevron-down/left/right and the calendar glyph are
 * reused from `ProductIcons.tsx`/`VendorIcons.tsx`/`NavIcons.tsx` since the Figma exports for
 * those are pixel-equivalent to this screen's exports; only the glyphs unique to this screen
 * (star, moderation shield, review chat-bubbles) live here.
 */
type IconProps = SVGProps<SVGSVGElement>;

/** Single 5-pointed star outline used for both the "AVG PLATFORM RATING" stat card icon and the
 *  per-row rating stars — filled vs. empty is just a `currentColor` swap (`text-[#f59e0b]` vs.
 *  `text-border`), matching the Figma export exactly (both variants are the same stroke path). */
export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.72292 1.33875C6.77506 1.2334 6.88245 1.16673 7 1.16673C7.11755 1.16673 7.22494 1.2334 7.27708 1.33875L8.62458 4.06817C8.80454 4.43303 9.15244 4.68605 9.555 4.74483L12.5685 5.18583C12.685 5.20271 12.7818 5.28426 12.8182 5.39619C12.8546 5.50811 12.8243 5.631 12.74 5.71317L10.5607 7.83533C10.2686 8.11949 10.1353 8.52925 10.2042 8.93083L10.7187 11.9292C10.7393 12.0456 10.6917 12.1636 10.596 12.2331C10.5003 12.3026 10.3734 12.3114 10.269 12.2558L7.57517 10.8395C7.2149 10.6501 6.78451 10.6501 6.42425 10.8395L3.731 12.2558C3.62666 12.3111 3.49998 12.3021 3.40451 12.2326C3.30903 12.1632 3.26143 12.0454 3.28183 11.9292L3.79575 8.93142C3.86487 8.52964 3.73154 8.11961 3.43933 7.83533L1.26 5.71375C1.17502 5.63167 1.14424 5.50833 1.18071 5.39594C1.21718 5.28356 1.31451 5.20179 1.4315 5.18525L4.44442 4.74483C4.84741 4.68641 5.19582 4.43334 5.376 4.06817L6.72292 1.33875"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "PENDING MODERATION" stat card icon — a rounded shield outline. */
export function ModerationShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15 9.75C15 13.5 12.375 15.375 9.255 16.4625C9.09162 16.5179 8.91415 16.5152 8.7525 16.455C5.625 15.375 3 13.5 3 9.75V4.5C3 4.08606 3.33606 3.75 3.75 3.75C5.25 3.75 7.125 2.85 8.43 1.71C8.75826 1.42955 9.24174 1.42955 9.57 1.71C10.8825 2.8575 12.75 3.75 14.25 3.75C14.6639 3.75 15 4.08606 15 4.5V9.75M9 6V9M9 12H9.0075"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** "TOTAL REVIEWS" stat card icon — two overlapping speech bubbles. */
export function ReviewsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 7.5C12 8.32787 11.3279 9 10.5 9H5.121C4.72321 9.00008 4.34174 9.15818 4.0605 9.4395L2.409 11.091C2.25671 11.2433 2.02769 11.2888 1.82873 11.2064C1.62977 11.124 1.50003 10.9299 1.5 10.7145V3C1.5 2.17213 2.17213 1.5 3 1.5H10.5C11.3279 1.5 12 2.17213 12 3V7.5M15 6.75C15.8279 6.75 16.5 7.42213 16.5 8.25V15.9645C16.5 16.1799 16.3702 16.374 16.1713 16.4564C15.9723 16.5388 15.7433 16.4933 15.591 16.341L13.9395 14.6895C13.6583 14.4082 13.2768 14.2501 12.879 14.25H7.5C6.67213 14.25 6 13.5779 6 12.75V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
