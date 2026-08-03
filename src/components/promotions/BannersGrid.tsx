"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { ImagePlaceholderIcon, StorefrontNoteIcon, UploadIcon } from "@/components/icons/BannerIcons";
import { SaveIcon } from "@/components/icons/VendorDetailIcons";
import type { Banner } from "@/lib/mock-data/promotions";

/** Converts a display date like "30 Jun 2025" into the `yyyy-mm-dd` shape `<input type="date">`
 * needs; `null`/unset dates map to an empty string, matching the design's "— Not set —" slots. */
function toDateInputValue(display: string | null | undefined): string {
  if (!display) return "";
  const parsed = new Date(display);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Converts a `yyyy-mm-dd` input value back into the app's "D MMM YYYY" display format used
 * throughout Promotions; an empty value clears the date back to "not set". */
function fromDateInputValue(value: string): string | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(date);
}

/** Formats the live countdown from `now` to `targetIso` as `HH:MM:SS`, or "Ended" once it has
 * passed — a real clock instead of the Figma design's frozen "02:14:37" readout. */
function formatCountdown(targetIso: string, now: number): string {
  const target = new Date(targetIso).getTime();
  if (Number.isNaN(target)) return "—:--:--";
  const diffMs = target - now;
  if (diffMs <= 0) return "Ended";
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

const FIELD_LABEL_CLASSES = "text-[11px] font-bold uppercase tracking-[0.44px] text-gray-500";
const DATE_INPUT_CLASSES =
  "h-8 w-full min-w-0 rounded-[8px] border border-border bg-[#fff8fb] px-2.5 text-xs font-medium text-ink focus:outline-none focus:border-primary disabled:opacity-60";
const ACTION_BUTTON_CLASSES =
  "inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-border bg-white px-3.5 text-xs font-bold text-ink transition-colors hover:bg-surface-tint";

interface StatusToggleProps {
  isActive: boolean;
  onToggle: () => void;
  ariaLabel: string;
}

/** Toggle + "Active"/"Inactive" label, matching every banner card's top-right control. */
function StatusToggle({ isActive, onToggle, ariaLabel }: StatusToggleProps) {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <ToggleSwitch checked={isActive} onChange={onToggle} ariaLabel={ariaLabel} />
      <span className={`text-[11px] font-bold ${isActive ? "text-success" : "text-gray-500"}`}>
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

interface ImageBannerCardProps {
  banner: Banner;
  onToggleActive: (id: string) => void;
  onDateChange: (id: string, field: "startDate" | "endDate", value: string | null) => void;
  onImageChange: (id: string, imageUrl: string | null) => void;
}

/** One "image" banner slot — preview, START DATE / END DATE, Upload New / Remove. */
function ImageBannerCard({ banner, onToggleActive, onDateChange, onImageChange }: ImageBannerCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const startId = useId();
  const endId = useId();
  const aspectRatio =
    banner.recommendedWidth && banner.recommendedHeight ? `${banner.recommendedWidth} / ${banner.recommendedHeight}` : "3 / 1";

  function handleFileSelected(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    // No backend to upload to yet — a local object URL is a real, working preview of the exact
    // file the admin picked, not a decorative stand-in.
    onImageChange(banner.id, URL.createObjectURL(file));
  }

  return (
    <Card className="flex min-w-0 flex-col gap-3.5 p-[19px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate text-sm font-extrabold tracking-[-0.28px] text-ink">{banner.title}</h3>
          <p className="text-[11px] font-medium text-gray-500">
            Recommended: {banner.recommendedWidth} × {banner.recommendedHeight}px
          </p>
          {banner.note && (
            <div className="mt-1 flex items-center gap-1.5 rounded-lg bg-[#f5effe] px-2 py-1">
              <StorefrontNoteIcon className="size-2.5 shrink-0 text-[#7c3aed]" />
              <p className="min-w-0 break-words text-[11px] font-semibold text-[#7c3aed]">{banner.note}</p>
            </div>
          )}
        </div>
        <StatusToggle
          isActive={banner.isActive}
          onToggle={() => onToggleActive(banner.id)}
          ariaLabel={`Toggle ${banner.title} status (currently ${banner.isActive ? "active" : "inactive"})`}
        />
      </div>

      <div className="w-full overflow-hidden rounded-[10px] bg-surface-tint" style={{ aspectRatio }}>
        {banner.imageUrl ? (
          // Object URLs from local file picks aren't allowed through next/image's remote
          // loader, and these previews are small enough that unoptimized <img> is the right tool.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={banner.imageUrl} alt={banner.imageAlt ?? banner.title} className="size-full object-cover" />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-1.5 text-gray-400">
            <ImagePlaceholderIcon className="size-7" />
            <p className="text-xs font-semibold text-gray-500">No banner set</p>
          </div>
        )}
      </div>

      <div className="flex w-full gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <label htmlFor={startId} className={FIELD_LABEL_CLASSES}>
            Start Date
          </label>
          <input
            id={startId}
            type="date"
            value={toDateInputValue(banner.startDate)}
            onChange={(event) => onDateChange(banner.id, "startDate", fromDateInputValue(event.target.value))}
            className={DATE_INPUT_CLASSES}
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <label htmlFor={endId} className={FIELD_LABEL_CLASSES}>
            End Date
          </label>
          <input
            id={endId}
            type="date"
            value={toDateInputValue(banner.endDate)}
            onChange={(event) => onDateChange(banner.id, "endDate", fromDateInputValue(event.target.value))}
            className={DATE_INPUT_CLASSES}
          />
        </div>
      </div>

      <div className="flex w-full items-center gap-3">
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelected} />
        <button type="button" className={ACTION_BUTTON_CLASSES} onClick={() => fileInputRef.current?.click()}>
          <UploadIcon className="size-3.5" />
          Upload New
        </button>
        {banner.imageUrl && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm(`Remove the current image for "${banner.title}"? This can't be undone.`)) {
                onImageChange(banner.id, null);
              }
            }}
            className="text-xs font-semibold text-primary underline decoration-from-font underline-offset-2 hover:opacity-80"
          >
            Remove
          </button>
        )}
      </div>
    </Card>
  );
}

interface StripBannerCardProps {
  banner: Banner;
  onToggleActive: (id: string) => void;
  onSaveStrip: (id: string, updates: { saleMessage: string; countdownEndsAt: string }) => void;
}

/** The one "strip" banner slot (Flash Sale Countdown Strip) — a live countdown preview, a sale
 * message field, a countdown target field, and an explicit Save Strip action (unlike the image
 * cards, which save start/end date and status edits immediately). */
function StripBannerCard({ banner, onToggleActive, onSaveStrip }: StripBannerCardProps) {
  const [now, setNow] = useState<number | null>(null);
  const [messageDraft, setMessageDraft] = useState(banner.saleMessage ?? "");
  const [countdownDraft, setCountdownDraft] = useState(banner.countdownEndsAt ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const messageId = useId();
  const countdownId = useId();

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isDirty = messageDraft !== (banner.saleMessage ?? "") || countdownDraft !== (banner.countdownEndsAt ?? "");

  async function handleSave() {
    setIsSaving(true);
    // No backend yet — mock the round trip, matching `CouponForm`'s save pattern.
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSaveStrip(banner.id, { saleMessage: messageDraft, countdownEndsAt: countdownDraft });
    setIsSaving(false);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }

  return (
    <Card className="flex min-w-0 flex-col gap-3.5 p-[19px]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="truncate text-sm font-extrabold tracking-[-0.28px] text-ink">{banner.title}</h3>
          <p className="text-[11px] font-medium text-gray-500">Text strip — no image upload</p>
        </div>
        <StatusToggle
          isActive={banner.isActive}
          onToggle={() => onToggleActive(banner.id)}
          ariaLabel={`Toggle ${banner.title} status (currently ${banner.isActive ? "active" : "inactive"})`}
        />
      </div>

      <div className="flex h-11 w-full items-center justify-center gap-3 rounded-[10px] bg-primary px-4">
        <p className="min-w-0 truncate text-[13px] font-extrabold tracking-[0.13px] text-white">{banner.saleMessage}</p>
        <span className="shrink-0 rounded-lg bg-white/20 px-2.5 py-1 text-xs font-bold tracking-[0.6px] text-white">
          {now === null ? "—:--:--" : formatCountdown(banner.countdownEndsAt ?? "", now)}
        </span>
      </div>

      <div className="flex w-full flex-col gap-2.5">
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor={messageId} className={FIELD_LABEL_CLASSES}>
            Sale Message
          </label>
          <input
            id={messageId}
            type="text"
            value={messageDraft}
            onChange={(event) => setMessageDraft(event.target.value)}
            disabled={isSaving}
            className="h-[34px] w-full min-w-0 rounded-[10px] border border-border bg-[#fff8fb] px-3.5 text-[13px] font-medium text-ink focus:outline-none focus:border-primary disabled:opacity-60"
          />
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor={countdownId} className={FIELD_LABEL_CLASSES}>
            Countdown Ends At
          </label>
          <input
            id={countdownId}
            type="datetime-local"
            value={countdownDraft}
            onChange={(event) => setCountdownDraft(event.target.value)}
            disabled={isSaving}
            className="h-[34px] w-full min-w-0 rounded-[10px] border border-border bg-[#fff8fb] px-3.5 text-[13px] font-medium text-ink focus:outline-none focus:border-primary disabled:opacity-60"
          />
        </div>
      </div>

      <div className="flex w-full items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
          className="inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-primary bg-primary px-3.5 text-xs font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <SaveIcon className="size-3.5" />
          {isSaving ? "Saving…" : "Save Strip"}
        </button>
        {justSaved && <Badge variant="success">Saved</Badge>}
      </div>
    </Card>
  );
}

interface BannersGridProps {
  banners: Banner[];
  onToggleActive: (id: string) => void;
  onDateChange: (id: string, field: "startDate" | "endDate", value: string | null) => void;
  onImageChange: (id: string, imageUrl: string | null) => void;
  onSaveStrip: (id: string, updates: { saleMessage: string; countdownEndsAt: string }) => void;
}

/** "Banner Grid" — the six named banner-slot cards from the Figma "banners content" screen,
 * two per row (matching the design's `grid-cols-2`), each sized to its own content instead of
 * stretching to the row's tallest card. */
export function BannersGrid({ banners, onToggleActive, onDateChange, onImageChange, onSaveStrip }: BannersGridProps) {
  return (
    <div className="grid w-full grid-cols-1 items-start gap-5 lg:grid-cols-2">
      {banners.map((banner) =>
        banner.kind === "strip" ? (
          <StripBannerCard key={banner.id} banner={banner} onToggleActive={onToggleActive} onSaveStrip={onSaveStrip} />
        ) : (
          <ImageBannerCard
            key={banner.id}
            banner={banner}
            onToggleActive={onToggleActive}
            onDateChange={onDateChange}
            onImageChange={onImageChange}
          />
        )
      )}
    </div>
  );
}
