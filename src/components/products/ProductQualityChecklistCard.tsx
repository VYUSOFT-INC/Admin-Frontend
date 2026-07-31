import { Card } from "@/components/ui/Card";
import { CheckSmallIcon } from "@/components/icons/VendorDetailIcons";
import { CrossIcon } from "@/components/icons/ProductIcons";
import type { Product } from "@/lib/mock-data/products";

interface ProductQualityChecklistCardProps {
  product: Product;
}

/** "QUALITY CHECKLIST": automated pass/fail rows used to justify approve-with-override vs. a clean approve. */
export function ProductQualityChecklistCard({ product }: ProductQualityChecklistCardProps) {
  const passedCount = product.qualityChecks.filter((check) => check.passed).length;

  return (
    <Card className="w-full overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-surface-tint px-[18px] py-3.5">
        <h2 className="text-[13.5px] font-extrabold tracking-[-0.27px] text-ink">Quality Checklist</h2>
        <p className="text-xs font-bold text-ink">
          {passedCount} / {product.qualityChecks.length} passed
        </p>
      </div>
      <div className="flex flex-col px-[18px] py-1.5">
        {product.qualityChecks.map((check) => (
          <div key={check.label} className="flex items-start gap-2.5 border-b border-surface-tint py-2.5 last:border-b-0">
            <span
              className={`mt-px flex size-[22px] shrink-0 items-center justify-center rounded-full ${
                check.passed ? "bg-success-light" : "bg-primary-soft"
              }`}
            >
              {check.passed ? (
                <CheckSmallIcon className="size-3 text-success" />
              ) : (
                <CrossIcon className="size-3 text-primary" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-bold text-ink">{check.label}</p>
              <p className="break-words text-[11.5px] font-medium text-gray-400">{check.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
