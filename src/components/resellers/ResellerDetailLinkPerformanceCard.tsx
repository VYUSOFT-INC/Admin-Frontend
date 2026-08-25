import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { formatIndianCount } from "@/lib/mock-data/resellers";
import type { ResellerDetailData, ResellerLinkStatus } from "@/lib/mock-data/resellers";

const LINK_STATUS_VARIANT: Record<ResellerLinkStatus, "success" | "muted"> = {
  Active: "success",
  Expired: "muted",
};

interface ResellerDetailLinkPerformanceCardProps {
  detail: ResellerDetailData;
}

/** "Link Performance" card shown on the Link Performance tab — active/expired tracked product
 *  links (Figma node 1177:922). */
export function ResellerDetailLinkPerformanceCard({ detail }: ResellerDetailLinkPerformanceCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader title="Link Performance" description="Preview of active and expired product links" />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Product name</TableHeaderCell>
            <TableHeaderCell>Link generated date</TableHeaderCell>
            <TableHeaderCell>Clicks</TableHeaderCell>
            <TableHeaderCell>Orders</TableHeaderCell>
            <TableHeaderCell>Commission</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detail.linkPerformance.map((link) => (
            <TableRow key={`${link.productName}-${link.linkGeneratedDate}`}>
              <TableCell className="font-bold">{link.productName}</TableCell>
              <TableCell className="font-medium">{link.linkGeneratedDate}</TableCell>
              <TableCell>{formatIndianCount(link.clicks)}</TableCell>
              <TableCell>{link.orders}</TableCell>
              <TableCell className="font-medium">{link.commissionEarned}</TableCell>
              <TableCell>
                <Badge variant={LINK_STATUS_VARIANT[link.status]}>{link.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
