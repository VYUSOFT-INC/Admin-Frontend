import type { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

/** Base white, bordered, rounded surface used for stat tiles, list cards, and table shells. */
export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-xl border border-border bg-white ${className}`}>
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-[18px]">
      <div>
        <h2 className="text-[17px] font-extrabold tracking-[-0.34px] text-ink">{title}</h2>
        {description && <p className="mt-1 text-xs font-medium text-gray-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}
