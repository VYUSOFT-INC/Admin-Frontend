export interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  /** Accessible label since the control has no visible text, e.g. "Toggle WELCOME20 status". */
  ariaLabel: string;
  className?: string;
}

/** Small pill on/off switch — matches the Figma "promotions campaigns" Coupons table's STATUS
 * column control. Green/right when on, gray/left when off. Reusable wherever a list needs an
 * inline active/inactive toggle (e.g. future Notification Preferences). */
export function ToggleSwitch({ checked, onChange, ariaLabel, className = "" }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`flex h-4 w-[30px] shrink-0 items-center rounded-full px-0.5 transition-colors ${
        checked ? "justify-end bg-success" : "justify-start bg-gray-500"
      } ${className}`}
    >
      <span className="size-3 shrink-0 rounded-full bg-white" />
    </button>
  );
}
