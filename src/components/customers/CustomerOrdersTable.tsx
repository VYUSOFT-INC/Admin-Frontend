import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { FULFILLMENT_BADGE_VARIANT, STATUS_BADGE_VARIANT } from "@/components/orders/OrdersTable";
import { ORDERS } from "@/lib/mock-data/orders";
import type { CustomerRecentOrder } from "@/lib/mock-data/customers";

interface CustomerOrdersTableProps {
  orders: CustomerRecentOrder[];
}

/** "Recent Orders" table from the Figma design: Order ID / Date / Fulfillment Type / Amount /
 * Status / Action columns. Reuses the same fulfillment/status badge color maps as the Order
 * Management screen's `OrdersTable` so a status reads identically everywhere in the app. */
export function CustomerOrdersTable({ orders }: CustomerOrdersTableProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <h3 className="text-sm font-extrabold tracking-[-0.28px] text-ink">Recent Orders</h3>
      <Card className="overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Order ID</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
              <TableHeaderCell>Fulfillment Type</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => {
              // Older customer orders can predate the shared `ORDERS` window (see
              // `CustomerRecentOrder` in customers.ts) — fall back to the Order Management list
              // instead of a dead link, the same `orderExists` pattern `ReturnDetailHeader` uses.
              const orderExists = ORDERS.some((candidate) => candidate.id === order.orderId);
              const href = orderExists ? `/orders/${order.orderId}` : "/orders";
              return (
                <TableRow key={order.orderId}>
                  <TableCell>
                    <p className="min-w-0 whitespace-nowrap font-mono font-bold">{order.orderNumber}</p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-gray-500">{order.date}</TableCell>
                  <TableCell>
                    <Badge variant={FULFILLMENT_BADGE_VARIANT[order.fulfillment]}>{order.fulfillment}</Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap font-bold">₹{order.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>
                    <Badge variant={STATUS_BADGE_VARIANT[order.status]}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button href={href} className="min-h-[30px] px-3.5 text-xs">
                      View Order
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-sm font-semibold text-gray-500">
                  This customer has no recorded orders yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
