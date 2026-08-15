"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DateRangeIcon } from "@/components/icons/AnalyticsIcons";
import { ChevronDownIcon } from "@/components/icons/VendorDetailIcons";
import { ExportIcon } from "@/components/icons/VendorIcons";
import { DATE_RANGE_OPTIONS, type AnalyticsDateRange } from "@/lib/mock-data/analytics";

/**
 * Right-aligned action row above the Analytics content — matches the Figma header's "Last 30
 * days" date-range dropdown + "Export Reports" button (node 1143:108). The title/description
 * and the "Super Admin" account control from that same Figma frame are NOT reproduced here: this
 * app's shared `Topbar` (rendered once by `AdminLayout` for every screen) already owns both, so
 * duplicating them in page content would show two account menus stacked on top of each other.
 */
export function AnalyticsHeaderActions() {
  const [dateRange, setDateRange] = useState<AnalyticsDateRange>("Last 30 days");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center justify-end gap-3">
      <div className="relative shrink-0" ref={containerRef}>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="flex min-h-[38px] items-center gap-2 rounded-[10px] border border-border bg-surface-tint px-[13px] py-[9px] text-[13px] font-semibold text-ink transition-colors hover:bg-white"
        >
          <DateRangeIcon className="size-[15px] text-ink" />
          {dateRange}
          <ChevronDownIcon className="size-3.5 text-gray-500" />
        </button>

        {isOpen && (
          <div
            role="menu"
            className="absolute right-0 top-[calc(100%+8px)] z-10 min-w-full w-max overflow-hidden rounded-[10px] border border-border bg-white py-1.5 shadow-lg"
          >
            {DATE_RANGE_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                role="menuitemradio"
                aria-checked={option === dateRange}
                onClick={() => {
                  setDateRange(option);
                  setIsOpen(false);
                }}
                className={`block w-full whitespace-nowrap px-3.5 py-2 text-left text-[13px] font-semibold transition-colors ${
                  option === dateRange ? "bg-primary-lighter text-primary" : "text-ink hover:bg-surface-tint"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <Button type="button" className="gap-2">
        <ExportIcon className="size-3" />
        Export Reports
      </Button>
    </div>
  );
}
