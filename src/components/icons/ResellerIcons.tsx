import type { SVGProps } from "react";

/**
 * Icons used on the Reseller Management screen, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text utilities, matching the pattern
 * in `NavIcons.tsx`/`VendorIcons.tsx`. Path geometry is unchanged from the exported assets
 * (Figma "re-seller", node 1177:2).
 */
type IconProps = SVGProps<SVGSVGElement>;

/** Stacked-layers glyph for the "Performance Tier" filter dropdown. Figma node 1177:168 (Group12). */
export function TierIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 14.6754 14.6656" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.88436 0.786905C7.53289 0.626587 7.12917 0.626587 6.7777 0.786905L1.06436 3.3869C0.822649 3.49348 0.666667 3.73274 0.666667 3.9969C0.666667 4.26107 0.822649 4.50032 1.06436 4.6069L6.78436 7.21357C7.13583 7.37389 7.53956 7.37389 7.89103 7.21357L13.611 4.61357C13.8527 4.50699 14.0087 4.26774 14.0087 4.00357C14.0087 3.7394 13.8527 3.50015 13.611 3.39357L7.88436 0.786905"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.38436 5.66691L1.05103 6.73357C0.81723 6.84347 0.667972 7.07856 0.667972 7.33691C0.667972 7.59525 0.81723 7.83034 1.05103 7.94024L6.78436 10.5469C7.13395 10.7052 7.53478 10.7052 7.88436 10.5469L13.6044 7.94691C13.8461 7.84033 14.0021 7.60107 14.0021 7.33691C14.0021 7.07274 13.8461 6.83349 13.6044 6.72691L11.271 5.66691"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.38436 9.00024L1.05103 10.0669C0.81723 10.1768 0.667972 10.4119 0.667972 10.6702C0.667972 10.9286 0.81723 11.1637 1.05103 11.2736L6.78436 13.8802C7.13395 14.0385 7.53478 14.0385 7.88436 13.8802L13.6044 11.2802C13.8461 11.1737 14.0021 10.9344 14.0021 10.6702C14.0021 10.4061 13.8461 10.1668 13.6044 10.0602L11.271 9.00024"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Shield-check glyph for the "Status" filter dropdown. Figma node 1177:169 (Group13). */
export function StatusFilterIcon(props: IconProps) {
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

/** Chain-link glyph for the table's "Active Links" column. Figma node 1177:239 (Group14). */
export function LinkIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.7675 12.7558" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.21708 6.96124C5.72397 7.6389 6.50019 8.06299 7.34429 8.12344C8.18839 8.18389 9.01712 7.87475 9.61541 7.27624L11.3654 5.52624C12.4707 4.3818 12.4549 2.56266 11.3299 1.43761C10.2048 0.312549 8.38568 0.296741 7.24124 1.40208L6.23791 2.39958"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.55041 5.79458C7.04352 5.11692 6.26729 4.69283 5.4232 4.63238C4.5791 4.57193 3.75036 4.88107 3.15208 5.47958L1.40208 7.22958C0.296741 8.37402 0.312549 10.1932 1.43761 11.3182C2.56266 12.4433 4.3818 12.4591 5.52624 11.3537L6.52374 10.3562"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
