"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { OrderFiltersBar } from "@/components/orders/OrderFiltersBar";
import { OrderStatusTabs } from "@/components/orders/OrderStatusTabs";
import { OrdersTable } from "@/components/orders/OrdersTable";
import {
  FULFILLMENT_TABS,
  ORDERS,
  STATUS_TABS,
  type OrderStatus,
  type PaymentMethod,
} from "@/lib/mock-data/orders";
import type { FulfillmentType } from "@/lib/mock-data/products";

export default function OrdersPage() {
  const orders = ORDERS;
  const [search, setSearch] = useState("");
  const [activeStatus, setActiveStatus] = useState<OrderStatus | "All">("All");
  const [activeFulfillment, setActiveFulfillment] = useState<FulfillmentType | "All">("All");
  const [activePayment, setActivePayment] = useState<PaymentMethod | "All">("All");

  const statusCounts = useMemo(() => {
    const counts: Partial<Record<OrderStatus | "All", number>> = { All: orders.length };
    for (const order of orders) {
      counts[order.status] = (counts[order.status] ?? 0) + 1;
    }
    return counts;
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesStatus = activeStatus === "All" || order.status === activeStatus;
      const matchesFulfillment = activeFulfillment === "All" || order.fulfillment === activeFulfillment;
      const matchesPayment = activePayment === "All" || order.paymentMethod === activePayment;
      const matchesSearch =
        query.length === 0 ||
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query) ||
        order.vendorName.toLowerCase().includes(query);
      return matchesStatus && matchesFulfillment && matchesPayment && matchesSearch;
    });
  }, [orders, search, activeStatus, activeFulfillment, activePayment]);

  return (
    <AdminLayout title="Orders" description="Track and manage all marketplace orders">
      <div className="flex flex-col gap-5">
        <OrderStatusTabs tabs={STATUS_TABS} active={activeStatus} onChange={setActiveStatus} counts={statusCounts} />
        <OrderFiltersBar
          fulfillmentTabs={FULFILLMENT_TABS}
          activeFulfillment={activeFulfillment}
          onFulfillmentChange={setActiveFulfillment}
          activePayment={activePayment}
          onPaymentChange={setActivePayment}
        />
        <OrdersTable
          orders={filteredOrders}
          totalCount={orders.length}
          searchValue={search}
          onSearchChange={setSearch}
        />
      </div>
    </AdminLayout>
  );
}
