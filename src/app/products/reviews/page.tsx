"use client";

import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ReviewsFiltersBar } from "@/components/reviews/ReviewsFiltersBar";
import { ReviewsStatsCards } from "@/components/reviews/ReviewsStatsCards";
import { ReviewsTable } from "@/components/reviews/ReviewsTable";
import { ReviewsTabs } from "@/components/reviews/ReviewsTabs";
import {
  REVIEW_PRODUCT_OPTIONS,
  REVIEWS,
  type RatingFilterOption,
  type Review,
  type ReviewDateRangeOption,
  type ReviewStatus,
} from "@/lib/mock-data/reviews";

/** Number of days each date-range preset covers, evaluated against the real current date — same
 *  convention as the Returns & Refunds screen's `DATE_RANGE_DAYS`. Default is "All" (not a preset)
 *  so the queue never renders empty on load just because the mock `submittedAt` dates happen to
 *  be older than whichever preset would otherwise be selected by default. */
const DATE_RANGE_DAYS: Record<ReviewDateRangeOption, number> = {
  "Last 7 Days": 7,
  "Last 30 Days": 30,
  "Last 90 Days": 90,
};

export default function ReviewsModerationPage() {
  const [activeProduct, setActiveProduct] = useState<string | "All">("All");
  const [activeRating, setActiveRating] = useState<RatingFilterOption | "All">("All");
  const [activeStatus, setActiveStatus] = useState<ReviewStatus | "All">("All");
  const [activeDateRange, setActiveDateRange] = useState<ReviewDateRangeOption | "All">("All");

  const filteredReviews = useMemo(() => {
    const cutoff =
      activeDateRange === "All"
        ? null
        : (() => {
            const date = new Date();
            date.setDate(date.getDate() - DATE_RANGE_DAYS[activeDateRange]);
            return date;
          })();

    return REVIEWS.filter((review: Review) => {
      const matchesProduct = activeProduct === "All" || review.productName === activeProduct;
      const matchesRating = activeRating === "All" || review.rating === Number(activeRating.charAt(0));
      const matchesStatus = activeStatus === "All" || review.status === activeStatus;
      const matchesDateRange = cutoff === null || new Date(review.submittedAt) >= cutoff;
      return matchesProduct && matchesRating && matchesStatus && matchesDateRange;
    });
  }, [activeProduct, activeRating, activeStatus, activeDateRange]);

  return (
    <AdminLayout title="Reviews Moderation" description="Review, approve, flag, and remove product feedback across the catalog">
      <div className="flex flex-col gap-5">
        <ReviewsTabs />
        <ReviewsStatsCards />
        <ReviewsFiltersBar
          productOptions={REVIEW_PRODUCT_OPTIONS}
          activeProduct={activeProduct}
          onProductChange={setActiveProduct}
          activeRating={activeRating}
          onRatingChange={setActiveRating}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          activeDateRange={activeDateRange}
          onDateRangeChange={setActiveDateRange}
        />
        <ReviewsTable reviews={filteredReviews} />
      </div>
    </AdminLayout>
  );
}
