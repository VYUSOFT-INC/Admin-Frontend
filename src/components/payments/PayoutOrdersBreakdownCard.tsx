import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import type { Payout, PayoutFulfillment } from "@/lib/mock-data/payments";

/** Same coloring convention `ReturnsTable`/`OrdersTable`/`ProductsTable` use for this exact set
 * of fulfillment values, kept local per that same established pattern. */
const FULFILLMENT_BADGE_VARIANT: Record<PayoutFulfillment, BadgeVariant> = {
  Delivery: "info",
  Pickup: "purple",
  "Walk-in": "success",
};

interface PayoutOrdersBreakdownCardProps {
  payout: Payout;
}

/**
 * "Transaction Breakdown" table: a representative sample of the orders in this payout cycle
 * (`payout.orders`, capped at 8 in the Figma design) with a footer "Subtotal (N Orders)" row
 * that reflects the payout's *full* `grossAmount`/`commission`/`netAmount` — not a sum of only
 * the visible sample rows. See `PayoutOrderLine`'s doc comment in `payments.ts` for why.
 */
export function PayoutOrdersBreakdownCard({ payout }: PayoutOrdersBreakdownCardProps) {
  return (
    <Card className="flex w-full min-w-0 flex-col overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-[18px] py-3.5">
        <div>
          <h2 className="text-sm font-extrabold tracking-[-0.28px] text-ink">Transaction Breakdown</h2>
          <p className="mt-0.5 text-xs font-medium text-gray-500">Individual orders included in this payout cycle</p>
        </div>
        <Badge variant="danger">{payout.ordersCount} Orders</Badge>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Fulfillment</TableHeaderCell>
            <TableHeaderCell>Order Date</TableHeaderCell>
            <TableHeaderCell>Order Amt</TableHeaderCell>
            <TableHeaderCell>Comm %</TableHeaderCell>
            <TableHeaderCell>Comm Amt</TableHeaderCell>
            <TableHeaderCell>Net to Vendor</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payout.orders.map((line) => (
            <TableRow key={line.orderId}>
              <TableCell className="whitespace-nowrap font-bold text-primary">{line.orderId}</TableCell>
              <TableCell>
                <Badge variant={FULFILLMENT_BADGE_VARIANT[line.fulfillment]}>{line.fulfillment}</Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap">{line.orderDate}</TableCell>
              <TableCell className="whitespace-nowrap">₹{line.amount.toLocaleString("en-IN")}</TableCell>
              <TableCell className="whitespace-nowrap">{line.commissionRate}%</TableCell>
              <TableCell className="whitespace-nowrap">&minus;₹{line.commissionAmount.toLocaleString("en-IN")}</TableCell>
              <TableCell className="whitespace-nowrap">₹{line.netToVendor.toLocaleString("en-IN")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-border bg-surface-tint px-[18px] py-3">
        <p className="text-[13px] font-extrabold text-ink">Subtotal ({payout.ordersCount} Orders)</p>
        <div className="flex flex-wrap items-center gap-5 text-[13px] font-extrabold text-ink">
          <span className="whitespace-nowrap">₹{payout.grossAmount.toLocaleString("en-IN")}</span>
          <span className="whitespace-nowrap">&minus;₹{payout.commission.toLocaleString("en-IN")}</span>
          <span className="whitespace-nowrap">₹{payout.netAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>
    </Card>
  );
}
