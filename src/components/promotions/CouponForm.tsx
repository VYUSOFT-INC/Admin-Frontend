"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { BackArrowIcon, ChevronDownIcon } from "@/components/icons/VendorDetailIcons";
import { ChevronRightIcon } from "@/components/icons/VendorIcons";
import { COUPONS, type Coupon, type CouponAppliesTo, type CouponDiscountType } from "@/lib/mock-data/promotions";
import { VENDORS } from "@/lib/mock-data/vendors";

const DISCOUNT_TYPES: CouponDiscountType[] = ["% Off", "Fixed"];
const APPLIES_TO_OPTIONS: CouponAppliesTo[] = ["All", "Delivery", "Pickup", "Walk-in"];
const ALL_VENDORS = "All Vendors";

/** Pulls the bare number out of a pre-formatted display value, e.g. "20%" → 20, "₹150" → 150. */
function parseDiscountValue(display: string): number {
  const numeric = Number.parseFloat(display.replace(/[^0-9.]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

function formatDiscountValue(type: CouponDiscountType, raw: number): string {
  return type === "% Off" ? `${raw}%` : `₹${raw.toLocaleString("en-IN")}`;
}

/** Converts a display date like "30 Jun 2025" into the `yyyy-mm-dd` shape `<input type="date">` needs. */
function toDateInputValue(display: string): string {
  const parsed = new Date(display);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Converts a `yyyy-mm-dd` input value back into the app's "D MMM YYYY" display format. */
function fromDateInputValue(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

/** Lowercases and strips a coupon code down to the slug shape used for the `/promotions/[code]` route. */
function slugify(code: string): string {
  return code.trim().toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const INPUT_WRAPPER_CLASSES =
  "flex h-10 w-full items-center gap-1.5 rounded-[10px] border border-border bg-white px-3.5 focus-within:border-primary";
const INPUT_CLASSES = "min-w-0 flex-1 bg-transparent text-sm font-medium text-ink placeholder:text-gray-400 focus:outline-none disabled:opacity-60";
const LABEL_CLASSES = "text-[13px] font-bold text-ink";
const SELECT_CLASSES =
  "min-w-0 flex-1 appearance-none bg-transparent text-sm font-medium text-ink focus:outline-none disabled:opacity-60";

interface CouponFormProps {
  /** Omit to create a new coupon; pass the coupon being edited to pre-fill and mutate it in place. */
  existingCoupon?: Coupon;
}

/**
 * Shared create/edit form for the Promotions Coupon screen. The Figma node for this screen
 * ("promotion coupon", 1071:6973) turned out to render the exact same Coupons table already
 * built for `/promotions` (identical sidebar/topbar/tabs/table/pagination, right down to the
 * COUPON CODE / DISCOUNT TYPE / VALUE / APPLIES TO / VENDOR SCOPE / MIN ORDER / USAGE / VALID
 * UNTIL / STATUS columns) rather than a distinct create/edit form — there is no dedicated form
 * layout to port. So this form's fields are drawn directly from those same columns (the `Coupon`
 * type), styled with this app's established auth-form conventions (controlled inputs, inline
 * error banner, disabled-while-submitting) rather than inventing an unrelated layout.
 */
export function CouponForm({ existingCoupon }: CouponFormProps) {
  const router = useRouter();
  const isEditMode = Boolean(existingCoupon);

  const [code, setCode] = useState(existingCoupon?.code ?? "");
  const [discountType, setDiscountType] = useState<CouponDiscountType>(existingCoupon?.discountType ?? "% Off");
  const [discountValueInput, setDiscountValueInput] = useState(
    existingCoupon ? String(parseDiscountValue(existingCoupon.discountValue)) : ""
  );
  const [appliesTo, setAppliesTo] = useState<CouponAppliesTo>(existingCoupon?.appliesTo ?? "All");
  const [vendorScope, setVendorScope] = useState(existingCoupon?.vendorScope ?? ALL_VENDORS);
  const [minOrderAmountInput, setMinOrderAmountInput] = useState(
    existingCoupon ? String(existingCoupon.minOrderAmount) : ""
  );
  const [usageLimitInput, setUsageLimitInput] = useState(existingCoupon ? String(existingCoupon.usageLimit) : "");
  const [validUntilInput, setValidUntilInput] = useState(existingCoupon ? toDateInputValue(existingCoupon.validUntil) : "");
  const [isActive, setIsActive] = useState(existingCoupon?.isActive ?? true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const codeId = useId();
  const discountValueId = useId();
  const minOrderId = useId();
  const usageLimitId = useId();
  const validUntilId = useId();

  // "Zara Street Boutique" (on the seed "STORE200" coupon) has no matching entry in `VENDORS` —
  // union both sources plus the coupon's own current scope so editing never silently drops an
  // option the native <select> can't render, which would otherwise reset the field unnoticed.
  const vendorOptions = useMemo(() => {
    const names = new Set<string>();
    VENDORS.forEach((vendor) => names.add(vendor.name));
    COUPONS.forEach((coupon) => {
      if (coupon.vendorScope !== ALL_VENDORS) names.add(coupon.vendorScope);
    });
    if (existingCoupon && existingCoupon.vendorScope !== ALL_VENDORS) names.add(existingCoupon.vendorScope);
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [existingCoupon]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setError("Please enter a coupon code.");
      return;
    }
    const slug = existingCoupon ? existingCoupon.id : slugify(trimmedCode);
    if (!slug) {
      setError("Coupon code must contain at least one letter or number.");
      return;
    }
    const isDuplicate = COUPONS.some(
      (coupon) =>
        coupon.id !== existingCoupon?.id &&
        (coupon.id === slug || coupon.code.toUpperCase() === trimmedCode.toUpperCase())
    );
    if (isDuplicate) {
      setError("A coupon with this code already exists.");
      return;
    }

    const discountValueRaw = Number.parseFloat(discountValueInput);
    if (!discountValueInput || Number.isNaN(discountValueRaw) || discountValueRaw <= 0) {
      setError("Please enter a valid discount value.");
      return;
    }
    if (discountType === "% Off" && discountValueRaw > 100) {
      setError("A percentage discount can't exceed 100%.");
      return;
    }

    const minOrderAmountRaw = Number.parseFloat(minOrderAmountInput);
    if (!minOrderAmountInput || Number.isNaN(minOrderAmountRaw) || minOrderAmountRaw < 0) {
      setError("Please enter a valid minimum order amount.");
      return;
    }
    if (discountType === "Fixed" && discountValueRaw > minOrderAmountRaw) {
      setError("A fixed discount amount can't exceed the minimum order amount.");
      return;
    }

    const usageLimitRaw = Number.parseInt(usageLimitInput, 10);
    if (!usageLimitInput || Number.isNaN(usageLimitRaw) || usageLimitRaw <= 0) {
      setError("Please enter a valid usage limit.");
      return;
    }
    if (existingCoupon && usageLimitRaw < existingCoupon.usageCount) {
      setError(`Usage limit can't be less than the current usage count (${existingCoupon.usageCount}).`);
      return;
    }

    if (!validUntilInput) {
      setError("Please select a valid-until date.");
      return;
    }

    setIsSubmitting(true);
    // No backend yet — mock the round trip, matching the auth forms' pattern.
    await new Promise((resolve) => setTimeout(resolve, 600));

    const updatedFields: Omit<Coupon, "id" | "usageCount"> = {
      code: trimmedCode.toUpperCase(),
      discountType,
      discountValue: formatDiscountValue(discountType, discountValueRaw),
      appliesTo,
      vendorScope,
      minOrderAmount: minOrderAmountRaw,
      usageLimit: usageLimitRaw,
      validUntil: fromDateInputValue(validUntilInput),
      isActive,
    };

    if (existingCoupon) {
      // Mutate the exact object in place — it's the same reference held inside the shared
      // `COUPONS` array, so `/promotions` picks up the change once it remounts on navigation
      // back, matching the pattern `OrderDetailView` uses for `ORDERS`.
      Object.assign(existingCoupon, updatedFields);
    } else {
      COUPONS.push({ id: slug, usageCount: 0, ...updatedFields });
    }

    router.push("/promotions");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] font-semibold text-primary">
          <Link href="/promotions" className="hover:underline">
            Promotions
          </Link>
          <ChevronRightIcon className="size-3" />
          <span className="font-bold text-ink">{isEditMode ? existingCoupon?.code : "Create Coupon"}</span>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/promotions"
            aria-label="Back to promotions"
            className="flex size-[34px] shrink-0 items-center justify-center rounded-lg border border-border bg-white text-ink hover:bg-surface-tint"
          >
            <BackArrowIcon className="size-4" />
          </Link>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-extrabold text-ink">{isEditMode ? "Edit Coupon" : "Create Coupon"}</h1>
            <p className="text-xs font-medium text-gray-500">
              {isEditMode ? "Update the details and validity of this coupon." : "Set up a new promotional coupon."}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {error && (
          <div role="alert" className="w-full rounded-[10px] border border-primary-soft bg-primary-lighter px-4 py-3 text-xs font-semibold text-primary">
            {error}
          </div>
        )}

        <Card>
          <CardHeader title="Coupon Details" description="These fields match the Coupons table on the Promotions screen." />
          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor={codeId} className={LABEL_CLASSES}>
                Coupon Code
              </label>
              <div className={INPUT_WRAPPER_CLASSES}>
                <input
                  id={codeId}
                  type="text"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="e.g. WELCOME20"
                  disabled={isSubmitting}
                  className={`${INPUT_CLASSES} font-mono uppercase tracking-wider placeholder:font-sans placeholder:normal-case placeholder:tracking-normal`}
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <span className={LABEL_CLASSES}>Discount Type</span>
              <div className={INPUT_WRAPPER_CLASSES}>
                <select
                  aria-label="Discount Type"
                  value={discountType}
                  onChange={(event) => setDiscountType(event.target.value as CouponDiscountType)}
                  disabled={isSubmitting}
                  className={SELECT_CLASSES}
                >
                  {DISCOUNT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="size-3 shrink-0 text-gray-400" />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor={discountValueId} className={LABEL_CLASSES}>
                Discount Value
              </label>
              <div className={INPUT_WRAPPER_CLASSES}>
                {discountType === "Fixed" && <span className="shrink-0 text-sm font-semibold text-gray-500">₹</span>}
                <input
                  id={discountValueId}
                  type="number"
                  min="0"
                  step="0.01"
                  value={discountValueInput}
                  onChange={(event) => setDiscountValueInput(event.target.value)}
                  placeholder={discountType === "% Off" ? "20" : "150"}
                  disabled={isSubmitting}
                  className={INPUT_CLASSES}
                />
                {discountType === "% Off" && <span className="shrink-0 text-sm font-semibold text-gray-500">%</span>}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <span className={LABEL_CLASSES}>Applies To</span>
              <div className={INPUT_WRAPPER_CLASSES}>
                <select
                  aria-label="Applies To"
                  value={appliesTo}
                  onChange={(event) => setAppliesTo(event.target.value as CouponAppliesTo)}
                  disabled={isSubmitting}
                  className={SELECT_CLASSES}
                >
                  {APPLIES_TO_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="size-3 shrink-0 text-gray-400" />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <span className={LABEL_CLASSES}>Vendor Scope</span>
              <div className={INPUT_WRAPPER_CLASSES}>
                <select
                  aria-label="Vendor Scope"
                  value={vendorScope}
                  onChange={(event) => setVendorScope(event.target.value)}
                  disabled={isSubmitting}
                  className={SELECT_CLASSES}
                >
                  <option value={ALL_VENDORS}>{ALL_VENDORS}</option>
                  {vendorOptions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="size-3 shrink-0 text-gray-400" />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor={minOrderId} className={LABEL_CLASSES}>
                Min Order Amount
              </label>
              <div className={INPUT_WRAPPER_CLASSES}>
                <span className="shrink-0 text-sm font-semibold text-gray-500">₹</span>
                <input
                  id={minOrderId}
                  type="number"
                  min="0"
                  step="1"
                  value={minOrderAmountInput}
                  onChange={(event) => setMinOrderAmountInput(event.target.value)}
                  placeholder="500"
                  disabled={isSubmitting}
                  className={INPUT_CLASSES}
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor={usageLimitId} className={LABEL_CLASSES}>
                Usage Limit
              </label>
              <div className={INPUT_WRAPPER_CLASSES}>
                <input
                  id={usageLimitId}
                  type="number"
                  min="1"
                  step="1"
                  value={usageLimitInput}
                  onChange={(event) => setUsageLimitInput(event.target.value)}
                  placeholder="500"
                  disabled={isSubmitting}
                  className={INPUT_CLASSES}
                />
              </div>
              {existingCoupon && (
                <p className="min-w-0 break-words text-xs font-medium text-gray-500">
                  Used {existingCoupon.usageCount} time{existingCoupon.usageCount === 1 ? "" : "s"} so far.
                </p>
              )}
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <label htmlFor={validUntilId} className={LABEL_CLASSES}>
                Valid Until
              </label>
              <div className={INPUT_WRAPPER_CLASSES}>
                <input
                  id={validUntilId}
                  type="date"
                  value={validUntilInput}
                  onChange={(event) => setValidUntilInput(event.target.value)}
                  disabled={isSubmitting}
                  className={INPUT_CLASSES}
                />
              </div>
            </div>

            <div className="flex min-w-0 flex-col justify-center gap-2 sm:col-span-2">
              <div className="flex items-center gap-3 rounded-[10px] border border-border bg-surface-tint px-3.5 py-2.5">
                <ToggleSwitch checked={isActive} onChange={() => setIsActive((prev) => !prev)} ariaLabel="Toggle coupon active status" />
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-ink">Active</p>
                  <p className="min-w-0 break-words text-xs font-medium text-gray-500">
                    Inactive coupons stay saved but can&apos;t be redeemed by customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Button href="/promotions" variant="outline" className={isSubmitting ? "pointer-events-none opacity-60" : ""}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Saving…" : isEditMode ? "Save Changes" : "Create Coupon"}
          </Button>
        </div>
      </form>
    </div>
  );
}
