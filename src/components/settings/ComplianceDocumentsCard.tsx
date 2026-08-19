"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ExportIcon } from "@/components/icons/VendorIcons";
import { ReceiptCardIcon } from "@/components/icons/VendorDetailIcons";
import { CompanyCertificateIcon, GstCertificateIcon } from "@/components/icons/SettingsIcons";
import { COMPLIANCE_DOCUMENTS, type ComplianceDocument } from "@/lib/mock-data/tax-compliance";

type DownloadState = "idle" | "preparing" | "ready";

/** Per-document row icon, matched against the Figma export for each row (see `SettingsIcons.tsx`'s
 * file-level comment for which glyphs are reused vs. new). */
const DOC_ICON: Record<string, (props: { className?: string }) => JSX.Element> = {
  "doc-platform-gst-certificate": GstCertificateIcon,
  "doc-pan-card": ReceiptCardIcon,
  "doc-company-registration-certificate": CompanyCertificateIcon,
};

function formatToday(): string {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(/ /g, " ");
}

/**
 * "Compliance Documents" card — the fourth of the four Tax & Compliance sections (Figma "tax and
 * compliance", node 1143:2483): the platform-level document checklist (GST certificate, PAN card,
 * company registration). "Re-upload"/"Upload" both open a real file picker and, on selecting a
 * file, flip that row to "Verified" with today's date — there's no backend to actually persist the
 * file, matching `PincodeServiceabilityCard`'s CSV-upload mock convention. "Download All
 * Documents" mocks a prepare/ready round trip the same way that card's "Download Full
 * Serviceability List" does, rather than triggering a real browser download.
 */
export function ComplianceDocumentsCard() {
  const [documents, setDocuments] = useState<ComplianceDocument[]>(COMPLIANCE_DOCUMENTS);
  const [pendingUploadId, setPendingUploadId] = useState<string | null>(null);
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUploadClick(id: string) {
    setPendingUploadId(id);
    fileInputRef.current?.click();
  }

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !pendingUploadId) {
      setPendingUploadId(null);
      return;
    }
    const target = COMPLIANCE_DOCUMENTS.find((doc) => doc.id === pendingUploadId);
    if (target) {
      target.status = "verified";
      target.uploadedDate = formatToday();
    }
    setDocuments([...COMPLIANCE_DOCUMENTS]);
    setPendingUploadId(null);
  }

  function handleDownloadAll() {
    setDownloadState("preparing");
    setTimeout(() => setDownloadState("ready"), 700);
  }

  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 p-[19px]">
      <div className="min-w-0">
        <h2 className="text-[16px] font-extrabold text-ink">Compliance Documents</h2>
        <p className="mt-1 min-w-0 break-words text-[12.5px] font-medium text-gray-500">
          Track required records, re-upload outdated files, and export the latest compliance packet.
        </p>
      </div>

      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelected} />

      <div className="w-full overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Document</TableHeaderCell>
              <TableHeaderCell>Current Status</TableHeaderCell>
              <TableHeaderCell>Action</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((doc) => {
              const Icon = DOC_ICON[doc.id] ?? GstCertificateIcon;
              const isVerified = doc.status === "verified";
              return (
                <TableRow key={doc.id}>
                  <TableCell className="min-w-0">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primary-lighter text-primary">
                        <Icon className="size-[18px]" />
                      </span>
                      <div className="min-w-0">
                        <p className="min-w-0 break-words text-[13px] font-bold text-ink">{doc.name}</p>
                        <p className="mt-0.5 min-w-0 break-words text-[12px] font-medium text-gray-500">{doc.description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex min-w-0 flex-wrap items-center gap-2.5">
                      <span className="whitespace-nowrap text-[12px] font-medium text-gray-500">
                        {isVerified ? `Uploaded — ${doc.uploadedDate}` : "Pending upload"}
                      </span>
                      <Badge variant={isVerified ? "success" : "warning"}>{isVerified ? "Verified" : "Pending"}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {isVerified ? (
                      <button
                        type="button"
                        onClick={() => handleUploadClick(doc.id)}
                        className="text-[13px] font-bold text-primary transition-opacity hover:opacity-80"
                      >
                        Re-upload
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleUploadClick(doc.id)}
                        className="inline-flex min-h-[36px] items-center justify-center rounded-[10px] border border-border bg-white px-[15px] text-[13px] font-bold text-primary transition-colors hover:bg-surface-tint"
                      >
                        Upload
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <button
        type="button"
        onClick={handleDownloadAll}
        disabled={downloadState === "preparing"}
        className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[10px] border border-border bg-white px-[15px] text-[13px] font-bold text-ink transition-colors hover:bg-surface-tint disabled:cursor-wait disabled:opacity-60"
      >
        <ExportIcon className="size-3.5" />
        {downloadState === "idle" && "Download All Documents"}
        {downloadState === "preparing" && "Preparing packet…"}
        {downloadState === "ready" && "Packet ready — check your downloads (mock)"}
      </button>
    </Card>
  );
}
