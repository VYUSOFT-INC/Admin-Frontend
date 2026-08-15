"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarIcon } from "@/components/icons/NavIcons";
import { ProductFilterDropdown } from "@/components/products/ProductFilterDropdown";
import {
  RATING_FILTER_OPTIONS,
  REVIEW_DATE_RANGE_OPTIONS,
  REVIEW_STATUSES,
  type RatingFilterOption,
  type ReviewDateRangeOption,
  type ReviewStatus,
} from "@/lib/mock-data/reviews";

interface ReviewDateRangeDropdownProps {
  value: ReviewDateRangeOption | "All";
  onChange: (value: ReviewDateRangeOption | "All") => void;
}

/** "Last 30 Days ▾" trigger for the Reviews Moderation filters card — visually distinct from
 *  `ProductFilterDropdown` (no "Label:" prefix, a trailing calendar glyph instead of a chevron),
 *  matching the Figma design's fourth filter slot exactly. A dedicated component rather than a
 *  new prop on `ProductFilterDropdown`, since no other screen's date filter looks like this. */
function ReviewDateRangeDropdown({ value, onChange }: ReviewDateRangeDropdownProps) {
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
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-border bg-white px-3.5 text-[13px] text-ink transition-colors hover:bg-surface-tint"
      >
        <span className="truncate font-semibold">{value === "All" ? "All Time" : value}</span>
        <CalendarIcon className="size-3.5 shrink-0 text-gray-500" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-10 min-w-full w-max overflow-hidden rounded-[10px] border border-border bg-white py-1.5 shadow-lg"
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
            All Time
          </button>
          {REVIEW_DATE_RANGE_OPTIONS.map((option) => (
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

interface ReviewsFiltersBarProps {
  productOptions: string[];
  activeProduct: string | "All";
  onProductChange: (value: string | "All") => void;
  activeRating: RatingFilterOption | "All";
  onRatingChange: (value: RatingFilterOption | "All") => void;
  activeStatus: ReviewStatus | "All";
  onStatusChange: (value: ReviewStatus | "All") => void;
  activeDateRange: ReviewDateRangeOption | "All";
  onDateRangeChange: (value: ReviewDateRangeOption | "All") => void;
}

/** Product/Rating/Status/Date-range filter row shown above the Review Queue table — wrapped in
 *  its own bordered card with a 4-column grid, matching the Figma design (unlike the bare
 *  `flex-wrap` rows `ProductFiltersBar`/`InventoryFiltersBar` use, this screen's filters share one
 *  card). */
export function ReviewsFiltersBar({
  productOptions,
  activeProduct,
  onProductChange,
  activeRating,
  onRatingChange,
  activeStatus,
  onStatusChange,
  activeDateRange,
  onDateRangeChange,
}: ReviewsFiltersBarProps) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-white p-[17px] sm:grid-cols-2 lg:grid-cols-4">
      <ProductFilterDropdown
        label=""
        allLabel="All Products"
        value={activeProduct}
        options={productOptions}
        onChange={onProductChange}
        fullWidth
      />
      <ProductFilterDropdown
        label="Rating"
        allLabel="All"
        value={activeRating}
        options={[...RATING_FILTER_OPTIONS]}
        onChange={onRatingChange}
        fullWidth
      />
      <ProductFilterDropdown
        label="Status"
        allLabel="All"
        value={activeStatus}
        options={REVIEW_STATUSES}
        onChange={onStatusChange}
        fullWidth
      />
      <ReviewDateRangeDropdown value={activeDateRange} onChange={onDateRangeChange} />
    </div>
  );
}
