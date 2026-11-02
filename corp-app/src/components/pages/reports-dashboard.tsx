
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Download,
  FileCheck2,
  FileText,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { ReportRecord, ReportCategory } from "@/data/reports";

interface ReportsDashboardProps {
  reports: ReportRecord[];
}

const categoryOptions: {
  label: string;
  value: ReportCategory | "all";
}[] = [
  { label: "All Reports", value: "all" },
  { label: "Annual Returns", value: "annual-return" },
  { label: "CSR Reports", value: "csr" },
  { label: "Financial Reports", value: "financial" },
  { label: "Compliance", value: "compliance" },
  { label: "Other Reports", value: "other" },
];

const categoryColors: Record<ReportCategory, string> = {
  "annual-return": "bg-[#b18a50]/10 text-[#947044]",
  csr: "bg-[#71866b]/10 text-[#657b5d]",
  financial: "bg-[#71849b]/10 text-[#60758d]",
  compliance: "bg-[#9a806c]/10 text-[#896e59]",
  other: "bg-[#817361]/10 text-[#817361]",
};

function ReportCard({ report }: { report: ReportRecord }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e8dfd1] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#b18a50]/50 hover:shadow-[0_18px_45px_rgba(56,43,32,0.08)]">
      {/* Card header */}
      <div className="relative flex min-h-[190px] flex-col justify-between overflow-hidden bg-[#eee8dc] p-6">
        <div className="pointer-events-none absolute -right-8 -top-10 h-48 w-48 rounded-full border border-[#b18a50]/20" />
        <div className="pointer-events-none absolute -right-1 -top-3 h-32 w-32 rounded-full border border-[#b18a50]/20" />
        <div className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full border border-[#b18a50]/20" />

        <div className="relative flex items-start justify-between gap-3">
          <span
            className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
              categoryColors[report.category]
            }`}
          >
            {report.categoryLabel}
          </span>

          {report.featured && (
            <span className="rounded-full border border-[#b18a50]/40 bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#947044]">
              Featured
            </span>
          )}
        </div>

        <div className="relative flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#927044]">
              Shalimar Corp Limited
            </p>
            <h3 className="max-w-[260px] font-serif text-2xl leading-tight text-[#382b20]">
              {report.shortTitle}
            </h3>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#b18a50]/30 bg-white/60 text-[#a47c43]">
            <FileText size={27} strokeWidth={1.4} />
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col p-6">
        <h4 className="line-clamp-2 min-h-[48px] text-base font-semibold leading-6 text-[#382b20]">
          {report.title}
        </h4>

        <p className="mt-3 line-clamp-3 min-h-[66px] text-sm leading-[1.6] text-[#817361]">
          {report.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#eee7dc] pt-4 text-xs text-[#928574]">
          {report.financialYear && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              FY {report.financialYear}
            </span>
          )}

          <span className="inline-flex items-center gap-1.5">
            <FileCheck2 size={14} />
            PDF Document
          </span>
        </div>

        <div className="mt-auto flex items-center gap-3 pt-6">
          <Link
            href={`/reports/${report.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#382b20] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#59432e]"
          >
            View Report
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <a
            href={report.pdfUrl}
            download
            aria-label={`Download ${report.title}`}
            title="Download PDF"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b18a50]/40 text-[#947044] transition hover:bg-[#b18a50] hover:text-white"
          >
            <Download size={17} />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function ReportsDashboard({
  reports,
}: ReportsDashboardProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ReportCategory | "all">("all");
  const [financialYear, setFinancialYear] = useState("all");

  const financialYears = useMemo(() => {
    return Array.from(
      new Set(
        reports
          .map((report) => report.financialYear)
          .filter((year): year is string => Boolean(year))
      )
    ).sort((a, b) => b.localeCompare(a));
  }, [reports]);

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        !query ||
        report.title.toLowerCase().includes(query) ||
        report.shortTitle.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.categoryLabel.toLowerCase().includes(query) ||
        report.financialYear?.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || report.category === category;

      const matchesYear =
        financialYear === "all" ||
        report.financialYear === financialYear;

      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [reports, search, category, financialYear]);

  const featuredReports = reports.filter((report) => report.featured);

  const hasActiveFilters =
    search.trim() !== "" ||
    category !== "all" ||
    financialYear !== "all";

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setFinancialYear("all");
  };

  return (
    <main className="min-h-screen bg-[#f8f5ee] text-[#382b20]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#b18a50]/20 bg-[#eee8dc]">
        <div className="pointer-events-none absolute -right-24 -top-32 h-[440px] w-[440px] rounded-full border border-[#b18a50]/20" />
        <div className="pointer-events-none absolute -right-12 -top-20 h-[320px] w-[320px] rounded-full border border-[#b18a50]/20" />
        <div className="pointer-events-none absolute -bottom-40 left-[35%] h-[420px] w-[420px] rounded-full border border-[#b18a50]/15" />

        <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
              <span className="h-px w-8 bg-[#b18a50]" />
              Corporate Information
            </div>

            <h1 className="font-serif text-4xl leading-[1.12] text-[#382b20] sm:text-5xl lg:text-6xl">
              Reports &{" "}
              <span className="italic text-[#a47c43]">Insights</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#817361] sm:text-base sm:leading-8">
              Explore corporate reports, annual returns and Corporate Social
              Responsibility publications from Shalimar Corp Limited. Access
              published documents and reporting information in one place.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-6 text-sm text-[#786a58]">
              <div className="flex items-center gap-2">
                <FileText size={17} className="text-[#a47c43]" />
                {reports.length} Published Reports
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-[#a47c43]" />
                Corporate Publications
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured reports */}
      {featuredReports.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 pt-14 sm:px-8 lg:px-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
                Selected Publications
              </p>
              <h2 className="font-serif text-2xl text-[#382b20] sm:text-3xl">
                Featured Reports
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {featuredReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </section>
      )}

      {/* All reports */}
      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
            Document Library
          </p>
          <h2 className="font-serif text-3xl text-[#382b20] sm:text-4xl">
            All Reports
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#817361]">
            Browse the available corporate publications by report type or
            financial year.
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 rounded-2xl border border-[#e8dfd1] bg-white p-4 sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px_200px]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a29380]"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search reports, titles or financial year..."
                className="h-12 w-full rounded-xl border border-[#e8dfd1] bg-[#fcfaf6] pl-11 pr-4 text-sm text-[#382b20] outline-none transition placeholder:text-[#aa9e8d] focus:border-[#b18a50]"
              />
            </div>

            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as ReportCategory | "all")
              }
              className="h-12 rounded-xl border border-[#e8dfd1] bg-[#fcfaf6] px-4 text-sm text-[#6f6252] outline-none transition focus:border-[#b18a50]"
              aria-label="Filter by report category"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={financialYear}
              onChange={(event) => setFinancialYear(event.target.value)}
              className="h-12 rounded-xl border border-[#e8dfd1] bg-[#fcfaf6] px-4 text-sm text-[#6f6252] outline-none transition focus:border-[#b18a50]"
              aria-label="Filter by financial year"
            >
              <option value="all">All Financial Years</option>
              {financialYears.map((year) => (
                <option key={year} value={year}>
                  FY {year}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#eee7dc] pt-4">
            <p className="text-xs text-[#928574]">
              Showing{" "}
              <span className="font-semibold text-[#382b20]">
                {filteredReports.length}
              </span>{" "}
              of {reports.length} reports
            </p>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-[#a47c43] transition hover:text-[#382b20]"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Report grid */}
        {filteredReports.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#d9cbb8] bg-white/60 px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#b18a50]/10 text-[#a47c43]">
              <Search size={25} />
            </div>

            <h3 className="font-serif text-2xl text-[#382b20]">
              No reports found
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#817361]">
              No reports match your current search or filters. Try another
              keyword, category or financial year.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-[#382b20] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#59432e]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Footer CTA */}
      <section className="border-t border-[#b18a50]/20 bg-[#eee8dc]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center lg:px-12">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
              Corporate Transparency
            </p>
            <h2 className="font-serif text-2xl text-[#382b20] sm:text-3xl">
              Access to corporate information
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#817361]">
              For further information regarding corporate publications, please
              contact Shalimar Corp Limited.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#382b20] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#59432e]"
          >
            Contact Us
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
