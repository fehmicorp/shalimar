"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Maximize2,
  Printer,
} from "lucide-react";

import type { CertificateRecord } from "@/data/certificates";

interface CertificateViewerProps {
  certificate: CertificateRecord;
}

export default function CertificateViewer({
  certificate,
}: CertificateViewerProps) {
  const [loaded, setLoaded] = useState(false);

  const handlePrint = () => {
    const iframe = document.getElementById(
      "certificate-frame"
    ) as HTMLIFrameElement | null;

    if (!iframe?.contentWindow) return;

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  const handleFullscreen = () => {
    const iframe = document.getElementById(
      "certificate-frame"
    ) as HTMLIFrameElement | null;

    iframe?.requestFullscreen?.();
  };

  return (
    <main className="min-h-screen bg-[#eeeae3]">
      <header className="no-print sticky top-0 z-40 border-b border-[#e5ddd0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">

          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/certificates"
              aria-label="Back to certificates"
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#e8e0d3] text-[#382b20] transition hover:border-[#b18a50] hover:bg-[#f8f5ee]"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.18em] text-[#a47c43]">
                Shalimar Corp
              </p>
              <h1 className="mt-1 truncate text-sm font-medium text-[#382b20]">
                {certificate.title}
              </h1>
              <p className="mt-1 text-xs text-[#817361]">
                Certificate No. {certificate.certificateNumber}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleFullscreen}
              className="inline-flex items-center gap-2 border border-[#e8e0d3] px-4 py-2.5 text-xs font-medium text-[#382b20] hover:border-[#b18a50]"
            >
              <Maximize2 size={15} />
              <span className="hidden sm:inline">Fullscreen</span>
            </button>

            <a
              href={certificate.pdfUrl}
              download
              className="inline-flex items-center gap-2 border border-[#b18a50] px-4 py-2.5 text-xs font-medium text-[#382b20] hover:bg-[#b18a50] hover:text-white"
            >
              <Download size={15} />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-[#b18a50] px-5 py-2.5 text-xs font-medium text-white hover:bg-[#98703b]"
            >
              <Printer size={15} />
              Print Certificate
            </button>
          </div>
        </div>
      </header>

      {/* Certificate details */}
      <section className="no-print mx-auto max-w-7xl px-5 pt-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#817361]">
              {certificate.category}
            </p>
            <p className="mt-1 text-sm text-[#382b20]">
              Issued to: <strong>{certificate.issuedTo}</strong>
            </p>
          </div>

          <p className="text-xs text-[#817361]">
            Issued on:{" "}
            {new Date(
              `${certificate.issueDate}T00:00:00`
            ).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* PDF viewer */}
      <section className="mx-auto flex max-w-7xl justify-center px-3 py-8 md:px-6 md:py-12">
        <div className="relative w-full max-w-[900px] overflow-hidden bg-white shadow-[0_12px_45px_rgba(56,43,32,0.12)]">
          {!loaded && (
            <div className="absolute inset-0 z-10 flex min-h-[500px] items-center justify-center bg-white">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#e8e0d3] border-t-[#b18a50]" />
                <p className="mt-4 text-sm text-[#817361]">
                  Loading certificate...
                </p>
              </div>
            </div>
          )}

          <iframe
            id="certificate-frame"
            src={`${certificate.pdfUrl}#toolbar=0&navpanes=0&view=Fit`}
            title={certificate.title}
            onLoad={() => setLoaded(true)}
            className="block h-[calc(100vh-190px)] min-h-[650px] w-full border-0 bg-white"
          />
        </div>
      </section>
    </main>
  );
}
