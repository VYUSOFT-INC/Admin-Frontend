"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons/ProductIcons";

interface ProductFilterDropdownProps<T extends string> {
  label: string;
  value: T | "All";
  allLabel: string;
  options: T[];
  onChange: (value: T | "All") => void;
}

/** "Label: Value ▾" filter control used for Category/Vendor/Fulfillment on the Products screen. */
export function ProductFilterDropdown<T extends string>({
  label,
  value,
  allLabel,
  options,
  onChange,
}: ProductFilterDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={`flex h-9 items-center gap-2 rounded-lg border bg-white px-3.5 text-[13px] transition-colors ${
          value !== "All" ? "border-primary text-primary" : "border-border text-ink hover:bg-surface-tint"
        }`}
      >
        <span className="font-medium text-gray-500">{label}:</span>
        <span className="font-semibold">{value === "All" ? allLabel : value}</span>
        <ChevronDownIcon className="size-3 text-gray-400" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute left-0 top-[calc(100%+8px)] z-10 min-w-full w-max overflow-hidden rounded-[10px] border border-border bg-white py-1.5 shadow-lg"
        >
          <button
            type="button"
            role="menuitemradio"
            aria-checked={value === "All"}
            onClick={() => {
              onChange("All");
              setIsOpen(false);
            }}
            className={`block w-full whitespace-nowrap px-3.5 py-2 text-left text-[13px] font-semibold transition-colors ${
              value === "All" ? "bg-primary-lighter text-primary" : "text-ink hover:bg-surface-tint"
            }`}
          >
            {allLabel}
          </button>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="menuitemradio"
              aria-checked={value === option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`block w-full whitespace-nowrap px-3.5 py-2 text-left text-[13px] font-semibold transition-colors ${
                value === option ? "bg-primary-lighter text-primary" : "text-ink hover:bg-surface-tint"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
