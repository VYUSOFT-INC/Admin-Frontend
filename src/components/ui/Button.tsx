import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "outline" | "primary";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  outline: "bg-white border border-border text-ink hover:bg-surface-tint",
  primary: "bg-primary border border-primary text-white hover:opacity-90",
};

const BASE_CLASSES =
  "inline-flex min-h-[36px] items-center justify-center whitespace-nowrap rounded-[10px] px-4 text-[13px] font-bold transition-colors";

interface ButtonAsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
  children: ReactNode;
  variant?: ButtonVariant;
}

interface ButtonAsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

/** Renders a Next.js `<Link>` when `href` is provided, otherwise a native `<button>`. */
export function Button({ children, variant = "outline", className = "", ...rest }: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsLinkProps;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
