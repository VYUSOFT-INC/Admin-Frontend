import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

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

/** `className`/`onClick`/etc. are optional passthroughs — added for `TicketList`'s clickable,
 * selectable rows; every existing caller keeps rendering a plain, non-interactive row. */
export function TableRow({ children, className = "", ...rest }: { children: ReactNode; className?: string } & HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={`[&>td]:border-t [&>td]:border-border ${className}`} {...rest}>
      {children}
    </tr>
  );
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
