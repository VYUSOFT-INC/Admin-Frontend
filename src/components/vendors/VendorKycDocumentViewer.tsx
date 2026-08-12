"use client";

import { useState } from "react";
import { ApproveIcon, ClockIcon, SaveIcon, ZoomInIcon, ZoomOutIcon } from "@/components/icons/VendorDetailIcons";
import { getKycDocumentPreview } from "@/lib/kyc-document-preview";
import type { KycDocument, KycDocumentStatus, Vendor } from "@/lib/mock-data/vendors";

const MIN_ZOOM = 50;
const MAX_ZOOM = 150;
const ZOOM_STEP = 10;

interface VendorKycDocumentViewerProps {
  vendor: Vendor;
  doc: KycDocument;
  onStatusChange: (status: KycDocumentStatus) => void;
}

/**
 * "DOCUMENT VIEWER": the right-hand pane of the KYC Documents tab. Renders a certificate-style
 * preview of the selected document (built from the vendor's own mock fields — there is no real
 * scanned file to display), plus zoom controls, Verified/Pending actions, and a per-document
 * admin note. Mounted with `key={doc.name}` by the caller so switching documents resets the zoom
 * level and the note draft instead of leaking one document's UI state into the next.
 */
export function VendorKycDocumentViewer({ vendor, doc, onStatusChange }: VendorKycDocumentViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [note, setNote] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const preview = getKycDocumentPreview(vendor, doc.name);

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg border border-border bg-surface-tint p-[21px]">
      <h3 className="text-[13px] font-bold uppercase tracking-[0.78px] text-ink">Document Viewer</h3>

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h4 className="truncate text-lg font-extrabold text-ink">{doc.name}</h4>
          <p className="truncate text-[12.5px] font-medium text-gray-500">
            Uploaded by {vendor.name} &middot; {doc.uploadedOn ?? vendor.registeredDate}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((current) => Math.max(MIN_ZOOM, current - ZOOM_STEP))}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
            className="flex size-[34px] items-center justify-center rounded-lg border border-border bg-white text-ink hover:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ZoomOutIcon className="size-4" />
          </button>
          <span className="min-w-[36px] text-center text-xs font-bold text-gray-500">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom((current) => Math.min(MAX_ZOOM, current + ZOOM_STEP))}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            className="flex size-[34px] items-center justify-center rounded-lg border border-border bg-white text-ink hover:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ZoomInIcon className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex min-h-[420px] w-full items-center justify-center overflow-auto rounded-lg border border-border bg-white p-6 sm:min-h-[520px] sm:p-[29px]">
        <div
          className="w-full max-w-[560px] shrink-0 rounded-md border border-border bg-gradient-to-b from-white to-surface-tint p-6 shadow-[0px_14px_16px_rgba(0,22,57,0.06)] transition-transform duration-150"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <h5 className="text-base font-extrabold text-ink">{preview.badgeLabel}</h5>
              <span className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-primary-lighter px-2.5 py-1 text-[11px] font-bold text-primary">
                Certificate Preview
              </span>
            </div>
            <div className="h-px w-full bg-border" />
            <p className="text-center text-xl font-extrabold text-ink">{preview.title}</p>

            <div className="grid grid-cols-[minmax(0,140px)_minmax(0,1fr)] gap-x-3.5 gap-y-2.5 sm:grid-cols-[160px_minmax(0,1fr)]">
              {preview.fields.map((field) => (
                <div key={field.label} className="contents">
                  <div className="min-w-0 text-[12.5px] font-semibold text-gray-500">{field.label}</div>
                  <div className="min-w-0 break-words text-[12.5px] font-bold text-ink">{field.value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-end justify-between gap-4 pt-2">
              <p className="text-[11px] leading-[1.6] text-gray-500">{preview.disclaimer}</p>
              <div
                aria-hidden
                className="h-24 w-[55px] shrink-0 rounded border border-border"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, rgb(0, 22, 57) 10%, rgba(0, 22, 57, 0) 10%), linear-gradient(180deg, rgb(0, 22, 57) 10%, rgba(0, 22, 57, 0) 10%), linear-gradient(90deg, rgba(0, 22, 57, 0) 50%, rgb(0, 22, 57) 50%), linear-gradient(180deg, rgba(0, 22, 57, 0) 50%, rgb(0, 22, 57) 50%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-start gap-2.5">
        <button
          type="button"
          onClick={() => onStatusChange("Verified")}
          disabled={doc.status === "Verified"}
          className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg border border-success px-4 text-[13px] font-bold text-success hover:bg-success-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ApproveIcon className="size-4" />
          Mark as Verified
        </button>
        <button
          type="button"
          onClick={() => onStatusChange("Pending")}
          disabled={doc.status === "Pending"}
          className="flex min-h-[38px] items-center justify-center gap-1.5 rounded-lg border border-border px-4 text-[13px] font-bold text-gray-500 hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ClockIcon className="size-4" />
          Mark as Pending
        </button>
      </div>

      <div className="flex w-full flex-col gap-2">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.46px] text-gray-500">Admin Notes</p>
        <textarea
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
            setIsSaved(false);
          }}
          placeholder={`Write an internal note about this ${doc.name.toLowerCase()}...`}
          rows={3}
          className="min-h-[88px] w-full resize-none rounded-md border border-border bg-white px-3.5 py-2.5 text-[13px] font-medium text-ink placeholder:text-gray-400 focus:outline-none"
        />
        <button
          type="button"
          disabled={note.trim().length === 0 || isSaved}
          onClick={() => setIsSaved(true)}
          className="flex min-h-[38px] w-fit items-center gap-1.5 self-start rounded-lg border border-border bg-white px-4 text-[13px] font-bold text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SaveIcon className="size-3.5" />
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </div>
  );
}
