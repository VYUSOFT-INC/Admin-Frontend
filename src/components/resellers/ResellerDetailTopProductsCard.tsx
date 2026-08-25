import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { formatIndianCount } from "@/lib/mock-data/resellers";
import type { ResellerDetailData } from "@/lib/mock-data/resellers";

interface ResellerDetailTopProductsCardProps {
  detail: ResellerDetailData;
}

/** "Top 5 performing products" table on the Overview tab (Figma node 1177:817). */
export function ResellerDetailTopProductsCard({ detail }: ResellerDetailTopProductsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader title="Top 5 performing products" description="Highest sales-driving products from reseller links this month" />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Clicks</TableHeaderCell>
            <TableHeaderCell>Sales</TableHeaderCell>
            <TableHeaderCell>Commission earned</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detail.topProducts.map((product) => (
            <TableRow key={product.name}>
              <TableCell>
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative size-[42px] shrink-0 overflow-hidden rounded-[10px]">
                    <Image src={product.imageUrl} alt="" fill sizes="42px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-bold">{product.name}</p>
                    <p className="mt-0.5 truncate text-xs font-medium text-gray-500">{product.category}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{formatIndianCount(product.clicks)}</TableCell>
              <TableCell className="font-medium">{product.sales}</TableCell>
              <TableCell className="font-medium">{product.commissionEarned}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
