import type { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-surface-tint">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="[&>td]:border-t [&>td]:border-border">{children}</tr>;
}

export function TableHeaderCell({ children, className = "", ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`whitespace-nowrap px-[18px] py-3.5 text-left text-[11px] font-extrabold uppercase tracking-[0.55px] text-gray-500 ${className}`}
      {...rest}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className = "", ...rest }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`px-[18px] py-4 align-top text-[13px] text-ink ${className}`} {...rest}>
      {children}
    </td>
  );
}
