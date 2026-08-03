"use client";

import { SearchIcon } from "@/components/icons/VendorIcons";

interface CustomerSearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

/** "Find a Customer" heading + search input/button — the Figma "Search Section". Submits on
 * both Enter (native form submit) and the Search button click. */
export function CustomerSearchBar({ query, onQueryChange, onSearch }: CustomerSearchBarProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-1">
      <h2 className="text-[20px] font-extrabold tracking-[-0.6px] text-ink">Find a Customer</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSearch();
        }}
        className="flex w-full max-w-[620px] items-center gap-2.5"
      >
        <div className="flex min-h-[44px] flex-1 items-center gap-2.5 rounded-[10px] border border-border bg-white px-[15px]">
          <SearchIcon className="size-4 shrink-0 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by phone number, email or order ID"
            aria-label="Search by phone number, email or order ID"
            className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="flex min-h-[44px] shrink-0 items-center gap-2 rounded-[10px] bg-primary px-[22px] text-[13px] font-bold text-white transition-colors hover:opacity-90"
        >
          <SearchIcon className="size-3.5" />
          Search
        </button>
      </form>
    </div>
  );
}
