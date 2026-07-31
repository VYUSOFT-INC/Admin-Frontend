export type AvatarVariant = "pink" | "navy";

export interface AvatarProps {
  initials: string;
  variant?: AvatarVariant;
  size?: number;
  /** Overrides `variant` with a custom two-stop gradient, e.g. per-vendor brand colors. */
  gradient?: readonly [string, string];
  className?: string;
}

/** Initials avatar used for customers (pink), vendors/stores (navy gradient), or a custom gradient. */
export function Avatar({ initials, variant = "pink", size = 32, gradient, className = "" }: AvatarProps) {
  const style = { width: size, height: size };

  if (gradient) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-[10px] text-center text-xs font-extrabold text-white ${className}`}
        style={{ ...style, backgroundImage: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)` }}
      >
        {initials}
      </div>
    );
  }

  if (variant === "navy") {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-[10px] text-center text-xs font-extrabold text-white ${className}`}
        style={{ ...style, backgroundImage: "linear-gradient(135deg, #082a67 0%, #123d8e 100%)" }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-primary-lighter text-center text-xs font-extrabold text-primary ${className}`}
      style={style}
    >
      {initials}
    </div>
  );
}
