import { Card } from "@/components/ui/Card";
import { BanIcon, PackageIcon, WarningTriangleIcon } from "@/components/icons/InventoryIcons";
import { INVENTORY_SUMMARY, LOW_STOCK_MAX } from "@/lib/mock-data/inventory";

/** "Total Active SKUs / Low Stock SKUs / Out of Stock SKUs" stat row shown above the Inventory
 *  filters bar — matches the Figma "inventory managment" design's three summary cards. The
 *  latter two get a subtle pink gradient background per the Figma reference. */
export function InventoryStatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="flex min-w-0 flex-col gap-3 p-[19px]">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">
            Total Active SKUs
          </p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-primary-lighter">
            <PackageIcon className="size-[18px] text-primary" />
          </span>
        </div>
        <p className="break-words text-[28px] font-extrabold tracking-[-0.84px] text-ink">
          {INVENTORY_SUMMARY.totalActiveSkus.toLocaleString("en-IN")}
        </p>
        <p className="break-words text-[13px] font-medium text-gray-500">Currently sellable across approved catalog items</p>
      </Card>

      {/* Plain divs (not `Card`) for the two gradient tiles below — `Card` hard-codes
          `border-border`/`bg-white`, which would fight this tile's pink border and gradient
          for the same CSS property instead of layering cleanly. */}
      <div
        className="flex min-w-0 flex-col gap-3 rounded-xl border border-[#ecbbc9] p-[19px]"
        style={{ backgroundImage: "linear-gradient(to bottom, #fdf5f7, #ffffff)" }}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">
            Low Stock SKUs
          </p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#fcebee]">
            <WarningTriangleIcon className="size-[18px] text-primary" />
          </span>
        </div>
        <p className="break-words text-[28px] font-extrabold tracking-[-0.84px] text-ink">
          {INVENTORY_SUMMARY.lowStockSkus.toLocaleString("en-IN")}
        </p>
        <p className="break-words text-[13px] font-medium text-gray-500">Below {LOW_STOCK_MAX} units</p>
      </div>

      <div
        className="flex min-w-0 flex-col gap-3 rounded-xl border border-[#ecbbc9] p-[19px]"
        style={{ backgroundImage: "linear-gradient(to bottom, #fdf5f7, #ffffff)" }}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">
            Out of Stock SKUs
          </p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#fcebee]">
            <BanIcon className="size-[18px] text-primary" />
          </span>
        </div>
        <p className="break-words text-[28px] font-extrabold tracking-[-0.84px] text-ink">
          {INVENTORY_SUMMARY.outOfStockSkus.toLocaleString("en-IN")}
        </p>
        <p className="break-words text-[13px] font-medium text-gray-500">Requires vendor action to restock</p>
      </div>
    </div>
  );
}
