import { Avatar } from "@/components/ui/Avatar";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { initialsOf } from "@/lib/initials";

type Fulfillment = "Delivery" | "Pickup" | "Walk-in";
type OrderStatus = "Processing" | "Ready for Pickup" | "Confirmed" | "Packed";

interface Order {
  id: string;
  itemsLabel: string;
  customerName: string;
  customerEmail: string;
  vendorName: string;
  vendorCategory: string;
  fulfillment: Fulfillment;
  amount: string;
  status: OrderStatus;
  placedAt: string;
}

const ORDERS: Order[] = [
  {
    id: "#MV-10482",
    itemsLabel: "2 items",
    customerName: "Aarav Shah",
    customerEmail: "aarav.shah@email.com",
    vendorName: "Urban Thread House",
    vendorCategory: "Men's Fashion",
    fulfillment: "Delivery",
    amount: "₹2,480",
    status: "Processing",
    placedAt: "09:18 AM",
  },
  {
    id: "#MV-10481",
    itemsLabel: "1 item",
    customerName: "Riya Kapoor",
    customerEmail: "riya.kapoor@email.com",
    vendorName: "Velora Styles",
    vendorCategory: "Women's Apparel",
    fulfillment: "Pickup",
    amount: "₹1,920",
    status: "Ready for Pickup",
    placedAt: "08:54 AM",
  },
  {
    id: "#MV-10480",
    itemsLabel: "3 items",
    customerName: "Naina Mehta",
    customerEmail: "naina.mehta@email.com",
    vendorName: "Aurel Lane",
    vendorCategory: "Women's Fashion",
    fulfillment: "Delivery",
    amount: "₹4,360",
    status: "Confirmed",
    placedAt: "08:21 AM",
  },
  {
    id: "#MV-10479",
    itemsLabel: "Walk-in order",
    customerName: "Priya Verma",
    customerEmail: "In-store checkout",
    vendorName: "Moss & Clay",
    vendorCategory: "Home Linen",
    fulfillment: "Walk-in",
    amount: "₹3,140",
    status: "Packed",
    placedAt: "07:42 AM",
  },
  {
    id: "#MV-10478",
    itemsLabel: "2 items",
    customerName: "Dev Taneja",
    customerEmail: "dev.taneja@email.com",
    vendorName: "Forme Mode",
    vendorCategory: "Women's Fashion",
    fulfillment: "Pickup",
    amount: "₹2,220",
    status: "Confirmed",
    placedAt: "07:15 AM",
  },
];

const FULFILLMENT_VARIANT: Record<Fulfillment, BadgeVariant> = {
  Delivery: "danger",
  Pickup: "warning",
  "Walk-in": "success",
};

const STATUS_VARIANT: Record<OrderStatus, BadgeVariant> = {
  Processing: "warning",
  "Ready for Pickup": "danger",
  Confirmed: "success",
  Packed: "neutral",
};

export function RecentOrdersTable() {
  return (
    <Card>
      <CardHeader
        title="Recent Orders"
        description="Latest transactions across delivery, pickup, and walk-in orders"
        action={<Button href="/orders">View All Orders</Button>}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Order</TableHeaderCell>
            <TableHeaderCell>Customer</TableHeaderCell>
            <TableHeaderCell>Vendor</TableHeaderCell>
            <TableHeaderCell>Fulfillment</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Placed</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ORDERS.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <p className="font-extrabold">{order.id}</p>
                <p className="mt-0.5 text-xs font-medium text-gray-500">{order.itemsLabel}</p>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar variant="pink" initials={initialsOf(order.customerName)} />
                  <div>
                    <p className="font-semibold">{order.customerName}</p>
                    <p className="text-xs font-medium text-gray-500">{order.customerEmail}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar variant="navy" initials={initialsOf(order.vendorName)} />
                  <div>
                    <p className="font-semibold">{order.vendorName}</p>
                    <p className="text-xs font-medium text-gray-500">{order.vendorCategory}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={FULFILLMENT_VARIANT[order.fulfillment]}>{order.fulfillment}</Badge>
              </TableCell>
              <TableCell className="font-semibold">{order.amount}</TableCell>
              <TableCell>
                <Badge variant={STATUS_VARIANT[order.status]}>{order.status}</Badge>
              </TableCell>
              <TableCell className="font-semibold">{order.placedAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
