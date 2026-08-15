import { Card } from "@/components/ui/Card";
import { ModerationShieldIcon, ReviewsIcon, StarIcon } from "@/components/icons/ReviewIcons";
import { REVIEW_SUMMARY } from "@/lib/mock-data/reviews";

/** Renders `count` filled stars (amber, matching the Figma "AVG PLATFORM RATING" export) followed
 *  by `5 - count` empty ones (the same star outline in the `border` token's light pink). */
function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <StarIcon key={index} className={`size-3.5 ${index < count ? "text-[#f59e0b]" : "text-border"}`} />
      ))}
    </div>
  );
}

/** "Avg Platform Rating / Total Reviews / Pending Moderation" stat row shown above the Reviews
 *  filters bar — matches the Figma "reviews moderation" design's three summary cards. The last
 *  card gets a subtle amber gradient background per the Figma reference (distinct from the pink
 *  gradient `InventoryStatsCards` uses for its own warning-style tiles). */
export function ReviewsStatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="flex min-w-0 flex-col gap-3 p-[19px]">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">
            Avg Platform Rating
          </p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-primary-lighter">
            <StarIcon className="size-[18px] text-[#f59e0b]" />
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="break-words text-[28px] font-extrabold tracking-[-0.84px] text-ink">
            {REVIEW_SUMMARY.avgPlatformRating.toFixed(1)}
          </p>
          <StarRow count={Math.floor(REVIEW_SUMMARY.avgPlatformRating)} />
        </div>
        <p className="break-words text-[13px] font-medium text-gray-500">Across approved and pending customer reviews</p>
      </Card>

      <Card className="flex min-w-0 flex-col gap-3 p-[19px]">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">Total Reviews</p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-primary-lighter">
            <ReviewsIcon className="size-[18px] text-primary" />
          </span>
        </div>
        <p className="break-words text-[28px] font-extrabold tracking-[-0.84px] text-ink">
          {REVIEW_SUMMARY.totalReviews.toLocaleString("en-IN")}
        </p>
        <p className="break-words text-[13px] font-medium text-gray-500">Submitted across all listed products</p>
      </Card>

      {/* Plain div (not `Card`) — this tile's amber border/gradient would otherwise fight
          `Card`'s hard-coded `border-border`/`bg-white` for the same CSS property. */}
      <div
        className="flex min-w-0 flex-col gap-3 rounded-xl border border-[#f1ccb3] p-[19px]"
        style={{ backgroundImage: "linear-gradient(to bottom, #fef7eb, #ffffff)" }}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 break-words text-xs font-extrabold uppercase tracking-[0.48px] text-gray-500">
            Pending Moderation
          </p>
          <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-[#fdefd8]">
            <ModerationShieldIcon className="size-[18px] text-[#a16207]" />
          </span>
        </div>
        <p className="break-words text-[28px] font-extrabold tracking-[-0.84px] text-ink">{REVIEW_SUMMARY.pendingModeration}</p>
        <p className="break-words text-[13px] font-medium text-gray-500">Requires action from moderation queue</p>
      </div>
    </div>
  );
}
