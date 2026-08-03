"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card } from "@/components/ui/Card";
import { CustomerSearchBar } from "@/components/customers/CustomerSearchBar";
import { CustomerProfileCard } from "@/components/customers/CustomerProfileCard";
import { CustomerOrdersTable } from "@/components/customers/CustomerOrdersTable";
import { CustomerAdminActions } from "@/components/customers/CustomerAdminActions";
import { CUSTOMERS, type Customer } from "@/lib/mock-data/customers";

/** Normalizes phone numbers so "+91 98765 43210" matches a query of "9876543210" or "98765". */
function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS);
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");

  // Mirrors the Figma design's always-populated profile card: land on the first customer
  // until the admin actually searches for someone else.
  const matchedCustomer = useMemo(() => {
    const trimmed = searchedQuery.trim();
    if (trimmed.length === 0) {
      return customers[0] ?? null;
    }
    const q = trimmed.toLowerCase();
    const qDigits = normalizePhone(trimmed);
    return (
      customers.find((customer) => {
        const matchesPhone = qDigits.length > 0 && normalizePhone(customer.phone).includes(qDigits);
        const matchesEmail = customer.email.toLowerCase().includes(q);
        const matchesName = customer.name.toLowerCase().includes(q);
        const matchesOrder = customer.recentOrders.some((order) => order.orderNumber.toLowerCase().includes(q));
        return matchesPhone || matchesEmail || matchesName || matchesOrder;
      }) ?? null
    );
  }, [customers, searchedQuery]);

  function handleSearch() {
    setSearchedQuery(query);
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

        {matchedCustomer ? (
          <>
            <CustomerProfileCard customer={matchedCustomer} />
            <CustomerOrdersTable orders={matchedCustomer.recentOrders} />
            <CustomerAdminActions
              customer={matchedCustomer}
              onToggleBlock={handleToggleBlock}
              onAddNote={handleAddNote}
            />
          </>
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
