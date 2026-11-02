
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Maximize2,
  Printer,
} from "lucide-react";

import type { ReportRecord } from "@/data/reports";

interface ReportViewerProps {
  report: ReportRecord;
}

export default function ReportViewer({ report }: ReportViewerProps) {
  const [loaded, setLoaded] = useState(false);

  const handlePrint = () => {
    const iframe = document.getElementById(
      "report-frame"
    ) as HTMLIFrameElement | null;

    if (!iframe?.contentWindow) return;

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  const handleFullscreen = () => {
    const iframe = document.getElementById(
      "report-frame"
    ) as HTMLIFrameElement | null;

    iframe?.requestFullscreen?.();
  };

  return (
    <main className="min-h-screen bg-[#eeeae3]">
      {/* Header */}
      <header className="no-print sticky top-0 z-40 border-b border-[#e5ddd0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/reports"
              aria-label="Back to reports"
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#e8e0d3] text-[#382b20] transition hover:border-[#b18a50] hover:bg-[#f8f5ee]"
            >
              <ArrowLeft size={18} />
            </Link>

            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.18em] text-[#a47c43]">
                Shalimar Corp
              </p>

              <h1 className="mt-1 truncate text-sm font-medium text-[#382b20]">
                {report.title}
              </h1>

              <p className="mt-1 text-xs text-[#817361]">
                {report.categoryLabel}
                {report.financialYear && ` · FY ${report.financialYear}`}
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
              href={report.pdfUrl}
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
              <span className="hidden sm:inline">Print Report</span>
              <span className="sm:hidden">Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* Report details */}
      <section className="no-print mx-auto max-w-7xl px-5 pt-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#817361]">
              {report.categoryLabel}
            </p>

            <p className="mt-1 text-sm text-[#382b20]">
              {report.shortTitle}
            </p>

            <p className="mt-1 text-xs text-[#817361]">
              {report.description}
            </p>
          </div>

          {report.financialYear && (
            <p className="text-xs text-[#817361]">
              Financial Year:{" "}
              <strong className="font-medium text-[#382b20]">
                {report.financialYear}
              </strong>
            </p>
          )}
        </div>
      </section>

      {/* Insights */}
      {report.insights && report.insights.length > 0 && (
        <section className="no-print mx-auto max-w-7xl px-5 pt-6">
          <div className="border border-[#e5ddd0] bg-white p-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a47c43]">
              Report Insights
            </h2>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {report.insights.map((insight, index) => (
                <li
                  key={`${report.id}-insight-${index}`}
                  className="flex gap-3 text-sm leading-6 text-[#817361]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b18a50]" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* PDF viewer */}
      <section className="mx-auto flex max-w-7xl justify-center px-3 py-8 md:px-6 md:py-12">
        <div className="relative w-full max-w-[900px] overflow-hidden bg-white shadow-[0_12px_45px_rgba(56,43,32,0.12)]">
          {!loaded && (
            <div className="absolute inset-0 z-10 flex min-h-[500px] items-center justify-center bg-white">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#e8e0d3] border-t-[#b18a50]" />

                <p className="mt-4 text-sm text-[#817361]">
                  Loading report...
                </p>
              </div>
            </div>
          )}

          <iframe
            id="report-frame"
            src={`${report.pdfUrl}#toolbar=0&navpanes=0&view=Fit`}
            title={report.title}
            onLoad={() => setLoaded(true)}
            className="block h-[calc(100vh-190px)] min-h-[650px] w-full border-0 bg-white"
          />
        </div>
      </section>
    </main>
  );
}
