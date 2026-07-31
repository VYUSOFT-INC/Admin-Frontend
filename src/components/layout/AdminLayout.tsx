import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar, type TopbarProps } from "@/components/layout/Topbar";

export interface AdminLayoutProps extends TopbarProps {
  children: ReactNode;
}

/** Shared shell (sidebar + topbar + content slot) reused by every admin screen. */
export function AdminLayout({ title, description, children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-page">
      <Sidebar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <Topbar title={title} description={description} />
        <main className="flex-1 overflow-y-auto p-7">{children}</main>
      </div>
    </div>
  );
}
