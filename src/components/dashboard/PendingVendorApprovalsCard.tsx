import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { initialsOf } from "@/lib/initials";

interface VendorApplication {
  slug: string;
  name: string;
  category: string;
  city: string;
  channel: "Online Seller" | "Physical Store";
}

const APPLICATIONS: VendorApplication[] = [
  { slug: "urban-thread-house", name: "Urban Thread House", category: "Men's Fashion", city: "Mumbai", channel: "Online Seller" },
  { slug: "green-loom-studio", name: "Green Loom Studio", category: "Women's Apparel", city: "Bengaluru", channel: "Online Seller" },
  { slug: "north-square-atelier", name: "North Square Atelier", category: "Multi-brand Store", city: "Delhi", channel: "Physical Store" },
  { slug: "harbor-blend-collective", name: "Harbor Blend Collective", category: "Lifestyle Store", city: "Kochi", channel: "Physical Store" },
];

export function PendingVendorApprovalsCard() {
  return (
    <Card>
      <CardHeader
        title="Pending Vendor Approvals"
        description="Applications needing review across online sellers and physical stores"
        action={<Button href="/vendors?status=pending">View Queue</Button>}
      />
      <div className="flex flex-col px-5 pb-5 pt-2">
        {APPLICATIONS.map((application, index) => (
          <div
            key={application.slug}
            className={`flex items-center justify-between gap-4 py-[18px] ${
              index > 0 ? "border-t border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <Avatar variant="navy" initials={initialsOf(application.name)} />
              <div>
                <p className="text-sm font-extrabold text-ink">{application.name}</p>
                <p className="text-xs font-medium text-gray-500">
                  {application.category} &middot; {application.city}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <Badge variant={application.channel === "Online Seller" ? "danger" : "success"}>
                {application.channel}
              </Badge>
              <Button href={`/vendors/${application.slug}`}>Review</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
