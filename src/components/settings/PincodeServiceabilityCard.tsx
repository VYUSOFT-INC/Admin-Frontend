"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { UploadIcon } from "@/components/icons/BannerIcons";
import { SearchIcon, ExportIcon } from "@/components/icons/VendorIcons";
import { PINCODE_LOOKUP_SAMPLE, PINCODE_SERVICEABILITY_STATS } from "@/lib/mock-data/shipping";

const STAT_TILES: { label: string; value: number; description: string }[] = [
  {
    label: "Delivery Serviceable Pincodes",
    value: PINCODE_SERVICEABILITY_STATS.deliveryServiceablePincodes,
    description: "Home delivery enabled nationwide",
  },
  {
    label: "Pickup Serviceable Pincodes",
    value: PINCODE_SERVICEABILITY_STATS.pickupServiceablePincodes,
    description: "Backed by physical store locations",
  },
  {
    label: "Unserviceable Pincodes",
    value: PINCODE_SERVICEABILITY_STATS.unserviceablePincodes,
    description: "Pending courier or zone expansion",
  },
];

type LookupResult =
  | { status: "found"; city: string; deliveryServiceable: boolean; pickupServiceable: boolean }
  | { status: "not-found" };

type UploadState = "idle" | "uploading" | "done";
type DownloadState = "idle" | "preparing" | "ready";

/**
 * "Pincode Serviceability" card — the second of the three Shipping settings sections (Figma
 * "shipping", node 1143:1675). Coverage stat tiles match the Figma screenshot's exact figures.
 * "Check Pincode" and "Upload Pincode CSV" are standalone mocks (Figma shows neither a lookup
 * result nor an upload-progress state) backed by `PINCODE_LOOKUP_SAMPLE`'s small sample list —
 * see that export's doc comment in `shipping.ts` for why it's a handful of real pincodes rather
 * than an exhaustive 21,438-row dataset. "Download Full Serviceability List" mocks a prepare/ready
 * round trip rather than triggering a real browser download, matching this project's no-backend
 * convention for Settings actions (e.g. `PickupStorePanel`'s Save Changes).
 */
export function PincodeServiceabilityCard() {
  const [pincodeInput, setPincodeInput] = useState("");
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleCheckPincode(event: FormEvent) {
    event.preventDefault();
    const trimmed = pincodeInput.trim();
    if (!trimmed) {
      setLookupResult(null);
      return;
    }
    const match = PINCODE_LOOKUP_SAMPLE.find((entry) => entry.pincode === trimmed);
    setLookupResult(
      match
        ? { status: "found", city: match.city, deliveryServiceable: match.deliveryServiceable, pickupServiceable: match.pickupServiceable }
        : { status: "not-found" }
    );
  }

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
    setUploadState("uploading");
    // No backend yet — mock the round trip, matching `PickupStorePanel`'s Save Changes pattern.
    setTimeout(() => setUploadState("done"), 900);
    event.target.value = "";
  }

  function handleDownload() {
    setDownloadState("preparing");
    setTimeout(() => setDownloadState("ready"), 700);
  }

  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-[16px] font-extrabold text-ink">Pincode Serviceability</h2>
        <p className="mt-1 min-w-0 break-words text-[12.5px] font-medium text-gray-500">
          Track coverage across delivery and pickup networks, and validate serviceability before routing orders.
        </p>
      </div>

      <p className="min-w-0 break-words text-[13px] font-medium text-gray-500">
        Delivery is available to{" "}
        <span className="font-bold text-ink">{PINCODE_SERVICEABILITY_STATS.deliveryServiceablePincodes.toLocaleString("en-IN")}</span> pincodes
        across India.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileSelected} />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[10px] border border-border bg-white px-[15px] text-[13px] font-bold text-ink transition-colors hover:bg-surface-tint"
        >
          <UploadIcon className="size-3.5" />
          Upload Pincode CSV
        </button>

        <form onSubmit={handleCheckPincode} className="flex min-h-[38px] w-[280px] max-w-full items-center gap-2 rounded-[10px] border border-border bg-[#fff8fb] px-3.5">
          <SearchIcon className="size-3.5 shrink-0 text-gray-500" />
          <input
            type="text"
            inputMode="numeric"
            value={pincodeInput}
            onChange={(event) => setPincodeInput(event.target.value)}
            placeholder="Check Pincode"
            aria-label="Check pincode serviceability"
            className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-ink placeholder:text-gray-500 focus:outline-none"
          />
        </form>
      </div>

      {uploadState !== "idle" && (
        <p className="min-w-0 break-words text-xs font-semibold text-gray-500">
          {uploadState === "uploading" ? (
            `Uploading "${uploadedFileName}"…`
          ) : (
            <span className="text-success">{`"${uploadedFileName}" uploaded. New pincodes will sync within 24 hours.`}</span>
          )}
        </p>
      )}

      {lookupResult && (
        <div
          role="status"
          className={`min-w-0 break-words rounded-[10px] border px-4 py-3 text-xs font-semibold ${
            lookupResult.status === "found" ? "border-success-light bg-success-light text-success" : "border-border bg-surface-tint text-gray-500"
          }`}
        >
          {lookupResult.status === "found" ? (
            <span>
              <span className="font-bold">{pincodeInput.trim()}</span> ({lookupResult.city}) —{" "}
              {lookupResult.deliveryServiceable ? "delivery serviceable" : "delivery not available"},{" "}
              {lookupResult.pickupServiceable ? "pickup serviceable" : "pickup not available"}.
            </span>
          ) : (
            <span>
              No exact match for <span className="font-bold text-ink">{pincodeInput.trim()}</span> in this sample lookup. Try 400001, 560001, 110001,
              700001, 380001, 795001, or 194101.
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STAT_TILES.map((tile) => (
          <div key={tile.label} className="min-w-0 rounded-xl border border-border bg-[#fffcfd] p-[15px]">
            <p className="min-w-0 break-words text-[11px] font-extrabold uppercase tracking-[0.48px] text-gray-500">{tile.label}</p>
            <p className="mt-1.5 break-words text-[24px] font-extrabold tracking-[-0.48px] text-ink">{tile.value.toLocaleString("en-IN")}</p>
            <p className="mt-1.5 min-w-0 break-words text-xs font-medium text-gray-500">{tile.description}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={downloadState === "preparing"}
        className="inline-flex min-w-0 items-center gap-1.5 text-[13px] font-bold text-primary transition-opacity hover:opacity-80 disabled:cursor-wait disabled:opacity-60"
      >
        <ExportIcon className="size-3" />
        <span className="min-w-0 truncate">
          {downloadState === "idle" && "Download Full Serviceability List"}
          {downloadState === "preparing" && "Preparing list…"}
          {downloadState === "ready" && "List ready — check your downloads (mock)"}
        </span>
      </button>
    </Card>
  );
}
