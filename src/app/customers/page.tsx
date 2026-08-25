"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { CustomerSearchBar } from "@/components/customers/CustomerSearchBar";
import { CustomerProfileCard } from "@/components/customers/CustomerProfileCard";
import { CustomerOrdersTable } from "@/components/customers/CustomerOrdersTable";
import { CustomerSavedAddresses } from "@/components/customers/CustomerSavedAddresses";
import { CustomerActivityLog } from "@/components/customers/CustomerActivityLog";
import { CustomerAdminActions } from "@/components/customers/CustomerAdminActions";
import { CustomerSearchEmptyState } from "@/components/customers/CustomerSearchEmptyState";
import { CUSTOMERS, type Customer } from "@/lib/mock-data/customers";

/** Normalizes phone numbers so "+91 98765 43210" matches a query of "9876543210" or "98765". */
function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

function CustomersPageContent() {
  const searchParams = useSearchParams();
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
  const [query, setQuery] = useState("");
  // `null` = the admin hasn't searched yet (Figma's "Search for a customer to view their
  // profile." empty state, node 1071:10286) — distinct from a searched-but-empty string.
  const [searchedQuery, setSearchedQuery] = useState<string | null>(null);

  // The Topbar's global search deep-links here with `?q=<name>` (customers don't have their own
  // `/customers/[id]` detail route yet — see `src/lib/mock-data/customers.ts`), so a result
  // selected there resolves to a real, populated profile instead of a dead link. Re-runs whenever
  // the query param changes so picking a different customer from the global search while already
  // on this page updates the profile shown.
  useEffect(() => {
    const q = searchParams.get("q");
    if (q && q.trim().length > 0) {
      setQuery(q);
      setSearchedQuery(q);
    }
  }, [searchParams]);

  const matchedCustomer = useMemo(() => {
    if (searchedQuery === null) return null;
    const trimmed = searchedQuery.trim();
    if (trimmed.length === 0) return null;
    const q = trimmed.toLowerCase();
    const qDigits = normalizePhone(trimmed);
    return (
      customers.find((customer) => {
        const matchesPhone = qDigits.length > 0 && normalizePhone(customer.phone).includes(qDigits);
        const matchesEmail = customer.email.toLowerCase().includes(q);
        const matchesName = customer.name.toLowerCase().includes(q);
        const matchesOrder = customer.orderHistory.some((order) => order.orderNumber.toLowerCase().includes(q));
        return matchesPhone || matchesEmail || matchesName || matchesOrder;
      }) ?? null
    );
  }, [customers, searchedQuery]);

  function handleSearch() {
    const trimmed = query.trim();
    // An empty submission goes back to the initial empty state rather than surfacing a
    // confusing "No customer found for \"\"" message.
    setSearchedQuery(trimmed.length === 0 ? null : trimmed);
  }

  function handleToggleBlock(customerId: string) {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? { ...customer, status: customer.status === "Blocked" ? "Active" : "Blocked" }
          : customer
      )
    );
  }

  function handleAddNote(customerId: string, note: string) {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId ? { ...customer, adminNotes: [...customer.adminNotes, note] } : customer
      )
    );
  }

  return (
    <AdminLayout title="Customers" description="Search and manage customer accounts">
      <div className="flex flex-col gap-6">
        <CustomerSearchBar query={query} onQueryChange={setQuery} onSearch={handleSearch} />

        {searchedQuery === null ? (
          <CustomerSearchEmptyState />
        ) : matchedCustomer ? (
          // Keyed by customer id so switching between search results (e.g. via the global
          // search dropdown while already on this page) remounts the order table's pagination
          // page and the two collapsible sections' open/closed state, instead of carrying a
          // stale page number or collapsed state over from the previously viewed customer — the
          // same `key={slug}` remount fix used on the Vendor Detail screen.
          <div key={matchedCustomer.id} className="flex flex-col gap-6">
            <CustomerProfileCard customer={matchedCustomer} />
            <CustomerOrdersTable orders={matchedCustomer.orderHistory} />
            <CustomerSavedAddresses addresses={matchedCustomer.addresses} />
            <CustomerActivityLog entries={matchedCustomer.activityLog} />
            <CustomerAdminActions
              customer={matchedCustomer}
              onToggleBlock={handleToggleBlock}
              onAddNote={handleAddNote}
            />
          </div>
        ) : (
          <Card className="px-6 py-10 text-center">
            <p className="text-sm font-bold text-ink">No customer found for &ldquo;{searchedQuery}&rdquo;</p>
            <p className="mt-1.5 text-xs font-medium text-gray-500">
              Try searching by a different phone number, email address, or order ID.
            </p>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

export default function CustomersPage() {
  return (
    <Suspense fallback={null}>
      <CustomersPageContent />
    </Suspense>
  );
}
