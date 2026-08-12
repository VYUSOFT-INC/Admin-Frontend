"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { SearchIcon } from "@/components/icons/VendorIcons";
import { SearchResultArrowIcon } from "@/components/icons/NavIcons";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { VENDORS } from "@/lib/mock-data/vendors";
import { TYPE_BADGE_VARIANT as VENDOR_TYPE_VARIANT, STATUS_BADGE_VARIANT as VENDOR_STATUS_VARIANT } from "@/components/vendors/VendorsTable";
import { ORDERS } from "@/lib/mock-data/orders";
import {
  FULFILLMENT_BADGE_VARIANT as ORDER_FULFILLMENT_VARIANT,
  STATUS_BADGE_VARIANT as ORDER_STATUS_VARIANT,
} from "@/components/orders/OrdersTable";
import { PRODUCTS } from "@/lib/mock-data/products";
import { STATUS_BADGE_VARIANT as PRODUCT_STATUS_VARIANT } from "@/components/products/ProductsTable";
import { CUSTOMERS, getTotalOrders } from "@/lib/mock-data/customers";

/** Results shown per entity group before the list is capped — the mock catalog is small enough
 * that this only ever kicks in for very short/common queries (e.g. a single letter). */
const MAX_RESULTS_PER_GROUP = 5;

/** Figma's dropdown (node 1092:1233) is 860px wide, centered under the search input — much wider
 * than the input itself. Kept as a `position: fixed` overlay (viewport-relative, computed in
 * `computePanelStyle` below) rather than a plain Tailwind `absolute left-1/2 -translate-x-1/2`,
 * because the input sits left-of-center in the Topbar (title on the left, notification/date/admin
 * pills on the right): a centered-on-input panel this wide would run past the viewport edge on
 * common laptop widths, and — since it lives inside `AdminLayout`'s `overflow-hidden` columns —
 * silently clip instead of just overflowing. Fixed positioning escapes that clipping and lets us
 * clamp the panel to stay fully on-screen. */
const DROPDOWN_WIDTH = 860;
const VIEWPORT_MARGIN = 16;

interface PanelStyle {
  top: number;
  left: number;
  width: number;
}

function computePanelStyle(anchor: HTMLElement): PanelStyle {
  const rect = anchor.getBoundingClientRect();
  // Keep the panel from drifting left over the fixed sidebar nav — clamp to the Topbar's own
  // left edge (i.e. the sidebar's right edge) rather than the raw viewport edge.
  const contentLeft = anchor.closest("header")?.getBoundingClientRect().left ?? 0;
  const width = Math.min(DROPDOWN_WIDTH, window.innerWidth - contentLeft - VIEWPORT_MARGIN * 2);
  const idealLeft = rect.left + rect.width / 2 - width / 2;
  const minLeft = contentLeft + VIEWPORT_MARGIN;
  const maxLeft = window.innerWidth - VIEWPORT_MARGIN - width;
  const left = Math.min(Math.max(idealLeft, minLeft), maxLeft);
  return { top: rect.bottom + 8, left, width };
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const second = parts.length > 1 ? parts[parts.length - 1][0] : parts[0]?.[1] ?? "";
  return `${first}${second}`.toUpperCase();
}

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

function normalizeOrderQuery(value: string): string {
  return value.replace(/^#/, "").trim().toLowerCase();
}

interface VendorResult {
  key: string;
  href: string;
  initials: string;
  name: string;
  type: (typeof VENDORS)[number]["type"];
  status: (typeof VENDORS)[number]["status"];
}

interface OrderResult {
  key: string;
  href: string;
  orderNumber: string;
  customerName: string;
  amount: number;
  fulfillment: (typeof ORDERS)[number]["fulfillment"];
  status: (typeof ORDERS)[number]["status"];
}

interface ProductResult {
  key: string;
  href: string;
  imageUrl: string;
  name: string;
  vendorName: string;
  status: (typeof PRODUCTS)[number]["status"];
}

interface CustomerResult {
  key: string;
  href: string;
  name: string;
  phone: string;
  totalOrders: number;
}

/** Client-side substring search across the mock vendors/orders/products/customers datasets,
 * matching the Figma "search drop down" (node 1092:1233) grouping. Each match links to the
 * real detail route for that entity — customers don't have a `/customers/[id]` route yet (see
 * `src/lib/mock-data/customers.ts`), so those results deep-link into the existing `/customers`
 * search screen via a `?q=` param instead of a dead link. */
function useGlobalSearchResults(query: string) {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length === 0) {
      return { vendors: [], orders: [], products: [], customers: [], total: 0 };
    }

    const vendors: VendorResult[] = VENDORS.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(q) ||
        vendor.category.toLowerCase().includes(q) ||
        vendor.location.toLowerCase().includes(q)
    )
      .slice(0, MAX_RESULTS_PER_GROUP)
      .map((vendor) => ({
        key: vendor.slug,
        href: `/vendors/${vendor.slug}`,
        initials: initialsOf(vendor.name),
        name: vendor.name,
        type: vendor.type,
        status: vendor.status,
      }));

    const orderQuery = normalizeOrderQuery(query);
    const orders: OrderResult[] = ORDERS.filter(
      (order) =>
        normalizeOrderQuery(order.orderNumber).includes(orderQuery) ||
        order.id.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.customerEmail.toLowerCase().includes(q)
    )
      .slice(0, MAX_RESULTS_PER_GROUP)
      .map((order) => ({
        key: order.id,
        href: `/orders/${order.id}`,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        amount: order.amount,
        fulfillment: order.fulfillment,
        status: order.status,
      }));

    const products: ProductResult[] = PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.vendorName.toLowerCase().includes(q)
    )
      .slice(0, MAX_RESULTS_PER_GROUP)
      .map((product) => ({
        key: product.id,
        href: `/products/${product.id}`,
        imageUrl: product.imageUrl,
        name: product.name,
        vendorName: product.vendorName,
        status: product.status,
      }));

    const qDigits = normalizePhone(query);
    const customers: CustomerResult[] = CUSTOMERS.filter(
      (customer) =>
        customer.name.toLowerCase().includes(q) ||
        customer.email.toLowerCase().includes(q) ||
        (qDigits.length > 0 && normalizePhone(customer.phone).includes(qDigits))
    )
      .slice(0, MAX_RESULTS_PER_GROUP)
      .map((customer) => ({
        key: customer.id,
        href: `/customers?q=${encodeURIComponent(customer.name)}`,
        name: customer.name,
        phone: customer.phone,
        totalOrders: getTotalOrders(customer),
      }));

    return {
      vendors,
      orders,
      products,
      customers,
      total: vendors.length + orders.length + products.length + customers.length,
    };
  }, [query]);
}

const GROUP_LABEL_CLASSES = "px-[18px] pb-2 text-[11px] font-extrabold uppercase tracking-[0.88px] text-gray-500";
const ROW_CLASSES =
  "group flex min-h-[48px] w-full items-center justify-between gap-3 px-[18px] py-2 text-left transition-colors hover:bg-surface-tint";
const ROW_ARROW_CLASSES = "size-[18px] shrink-0 text-gray-400 transition-colors group-hover:text-primary";

export function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<PanelStyle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const results = useGlobalSearchResults(query);

  const firstResultHref =
    results.vendors[0]?.href ?? results.orders[0]?.href ?? results.products[0]?.href ?? results.customers[0]?.href ?? null;

  // Close on outside click and on Escape — mirrors the Super Admin dropdown's listener pattern
  // in `Topbar.tsx`. Also keeps the fixed-position panel's coordinates in sync with the input's
  // on-screen position (see `computePanelStyle` above) whenever the viewport is resized.
  useEffect(() => {
    if (!isOpen) return;

    function recomputePanelStyle() {
      if (containerRef.current) {
        setPanelStyle(computePanelStyle(containerRef.current));
      }
    }
    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    recomputePanelStyle();
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", recomputePanelStyle);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", recomputePanelStyle);
    };
  }, [isOpen]);

  function handleSelect() {
    setIsOpen(false);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    if (firstResultHref) {
      setIsOpen(false);
      router.push(firstResultHref);
    }
  }

  const hasQuery = query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative min-w-0 max-w-[420px] flex-1">
      <form onSubmit={handleFormSubmit}>
        <div className="flex min-h-[44px] items-center gap-2.5 rounded-full border border-border bg-white px-[15px] py-3 drop-shadow-[0px_10px_12px_rgba(0,22,57,0.06)]">
          <SearchIcon className="size-4 shrink-0 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search vendors, orders, products, customers…"
            aria-label="Search vendors, orders, products, customers"
            className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
          />
        </div>
      </form>

      {isOpen && panelStyle && (
        <div
          style={{ position: "fixed", top: panelStyle.top, left: panelStyle.left, width: panelStyle.width } as CSSProperties}
          className="z-30 max-h-[75vh] overflow-y-auto rounded-xl border border-border bg-white shadow-[0px_20px_44px_0px_rgba(0,22,57,0.12)]"
        >
          {!hasQuery ? (
            <p className="px-[18px] py-6 text-center text-[13px] font-medium text-gray-500">
              Start typing to search across vendors, orders, products and customers.
            </p>
          ) : results.total === 0 ? (
            <p className="px-[18px] py-6 text-center text-[13px] font-medium text-gray-500">
              No results found for &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            <>
              {results.vendors.length > 0 && (
                <div className="border-b border-border py-3 last:border-b-0">
                  <p className={GROUP_LABEL_CLASSES}>Vendors</p>
                  {results.vendors.map((vendor) => (
                    <Link key={vendor.key} href={vendor.href} onClick={handleSelect} className={ROW_CLASSES}>
                      <div className="flex min-w-0 flex-1 items-center gap-2.5">
                        <Avatar initials={vendor.initials} size={34} />
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                          <p className="shrink-0 break-words text-xs font-extrabold text-ink">{vendor.name}</p>
                          <Badge variant={VENDOR_TYPE_VARIANT[vendor.type]}>{vendor.type}</Badge>
                          <Badge variant={VENDOR_STATUS_VARIANT[vendor.status]}>{vendor.status}</Badge>
                        </div>
                      </div>
                      <SearchResultArrowIcon className={ROW_ARROW_CLASSES} />
                    </Link>
                  ))}
                </div>
              )}

              {results.orders.length > 0 && (
                <div className="border-b border-border py-3 last:border-b-0">
                  <p className={GROUP_LABEL_CLASSES}>Orders</p>
                  {results.orders.map((order) => (
                    <Link key={order.key} href={order.href} onClick={handleSelect} className={ROW_CLASSES}>
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                        <p className="shrink-0 break-words text-xs font-extrabold text-primary">{order.orderNumber}</p>
                        <p className="shrink-0 break-words text-xs font-medium text-gray-500">{order.customerName}</p>
                        <p className="shrink-0 text-xs font-medium text-gray-500">₹{order.amount.toLocaleString("en-IN")}</p>
                        <Badge variant={ORDER_FULFILLMENT_VARIANT[order.fulfillment]}>{order.fulfillment}</Badge>
                        <Badge variant={ORDER_STATUS_VARIANT[order.status]}>{order.status}</Badge>
                      </div>
                      <SearchResultArrowIcon className={ROW_ARROW_CLASSES} />
                    </Link>
                  ))}
                </div>
              )}

              {results.products.length > 0 && (
                <div className="border-b border-border py-3 last:border-b-0">
                  <p className={GROUP_LABEL_CLASSES}>Products</p>
                  {results.products.map((product) => (
                    <Link key={product.key} href={product.href} onClick={handleSelect} className={ROW_CLASSES}>
                      <div className="flex min-w-0 flex-1 items-center gap-2.5">
                        <div className="relative size-[34px] shrink-0 overflow-hidden rounded-[10px] bg-surface-tint">
                          <Image src={product.imageUrl} alt="" fill sizes="34px" className="object-cover" />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                          <p className="shrink-0 break-words text-xs font-extrabold text-ink">{product.name}</p>
                          <p className="shrink-0 break-words text-xs font-medium text-gray-500">{product.vendorName}</p>
                          <Badge variant={PRODUCT_STATUS_VARIANT[product.status]}>{product.status}</Badge>
                        </div>
                      </div>
                      <SearchResultArrowIcon className={ROW_ARROW_CLASSES} />
                    </Link>
                  ))}
                </div>
              )}

              {results.customers.length > 0 && (
                <div className="py-3">
                  <p className={GROUP_LABEL_CLASSES}>Customers</p>
                  {results.customers.map((customer) => (
                    <Link key={customer.key} href={customer.href} onClick={handleSelect} className={ROW_CLASSES}>
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                        <p className="shrink-0 break-words text-xs font-extrabold text-ink">{customer.name}</p>
                        <p className="shrink-0 break-words text-xs font-medium text-gray-500">{customer.phone}</p>
                        <p className="shrink-0 text-xs font-medium text-gray-500">{customer.totalOrders} orders</p>
                      </div>
                      <SearchResultArrowIcon className={ROW_ARROW_CLASSES} />
                    </Link>
                  ))}
                </div>
              )}

              <div className="border-t border-border bg-surface-tint px-[18px] py-3.5">
                <p className="text-xs font-medium text-gray-500">Press Enter to see all results</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
