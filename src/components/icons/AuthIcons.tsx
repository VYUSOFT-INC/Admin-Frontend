import type { SVGProps } from "react";

/**
 * Line icons for the sign-in screen, inlined from the Figma export SVGs with
 * `stroke="currentColor"` so they can recolor via Tailwind text-color
 * utilities (same pattern as `NavIcons.tsx`). Path geometry is unchanged from
 * the exported assets — see `public/assets/icons/auth` for the originals.
 */
type IconProps = SVGProps<SVGSVGElement>;

export function MailIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16.5002 13.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.7501 3L9.00684 7.29525C8.54103 7.56581 7.96591 7.56581 7.50009 7.29525L0.750095 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25009 0.75H14.2501C15.078 0.75 15.7501 1.42213 15.7501 2.25V11.25C15.7501 12.0779 15.078 12.75 14.2501 12.75H2.25009C1.42222 12.75 0.750095 12.0779 0.750095 11.25V2.25C0.750095 1.42213 1.42222 0.75 2.25009 0.75V0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 15 16.5" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.75 11.25C6.75 11.6639 7.08606 12 7.5 12C7.91394 12 8.25 11.6639 8.25 11.25C8.25 10.8361 7.91394 10.5 7.5 10.5C7.08606 10.5 6.75 10.8361 6.75 11.25V11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.25 6.75H12.75C13.5779 6.75 14.25 7.42213 14.25 8.25V14.25C14.25 15.0779 13.5779 15.75 12.75 15.75H2.25C1.42213 15.75 0.75 15.0779 0.75 14.25V8.25C0.75 7.42213 1.42213 6.75 2.25 6.75V6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.75 6.75V4.5C3.75 2.43032 5.43032 0.75 7.5 0.75C9.56968 0.75 11.25 2.43032 11.25 4.5V6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Eye (visible) glyph — exported from Figma, shown when the password is hidden ("Show" state). */
export function EyeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.8339 9.33261" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.619795 4.86931C0.571179 4.73834 0.571179 4.59427 0.619795 4.46331C1.58814 2.11534 3.87715 0.583333 6.41696 0.583333C8.95678 0.583333 11.2458 2.11534 12.2141 4.46331C12.2627 4.59427 12.2627 4.73834 12.2141 4.86931C11.2458 7.21728 8.95678 8.74928 6.41696 8.74928C3.87715 8.74928 1.58814 7.21728 0.619795 4.86931"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66696 4.66631C4.66696 5.63216 5.45111 6.41631 6.41696 6.41631C7.38281 6.41631 8.16696 5.63216 8.16696 4.66631C8.16696 3.70046 7.38281 2.91631 6.41696 2.91631C5.45111 2.91631 4.66696 3.70046 4.66696 4.66631V4.66631"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Eye-off (hidden) glyph — not present in the Figma frame (only the "Show"
 * state was designed), added as the slashed counterpart so the show/hide
 * toggle has a symmetrical "Hide" state. Matches the same stroke weight and
 * viewBox scale as `EyeIcon` for visual consistency.
 */
export function EyeOffIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 12.8339 9.33261" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0.619795 4.86931C0.571179 4.73834 0.571179 4.59427 0.619795 4.46331C1.58814 2.11534 3.87715 0.583333 6.41696 0.583333C8.95678 0.583333 11.2458 2.11534 12.2141 4.46331C12.2627 4.59427 12.2627 4.73834 12.2141 4.86931C11.2458 7.21728 8.95678 8.74928 6.41696 8.74928C3.87715 8.74928 1.58814 7.21728 0.619795 4.86931"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.66696 4.66631C4.66696 5.63216 5.45111 6.41631 6.41696 6.41631C7.38281 6.41631 8.16696 5.63216 8.16696 4.66631C8.16696 3.70046 7.38281 2.91631 6.41696 2.91631C5.45111 2.91631 4.66696 3.70046 4.66696 4.66631V4.66631"
        stroke="currentColor"
        strokeWidth="1.16667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M0.583333 8.74928L12.2503 0.583333" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Check-circle glyph for success confirmations (reset link sent, password
 * updated). Not part of the Figma export — hand-authored to match the same
 * stroke weight/rounding as the other auth icons since no design exists for
 * these states.
 */
export function CheckCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M21 11.08V12a9 9 0 1 1-5.34-8.24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M15 9H3M3 9L8.25 3.75M3 9L8.25 14.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SignInArrowIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 12.75L11.25 9L7.5 5.25M11.25 9H2.25M11.25 2.25H14.25C15.0779 2.25 15.75 2.92213 15.75 3.75V14.25C15.75 15.0779 15.0779 15.75 14.25 15.75H11.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
