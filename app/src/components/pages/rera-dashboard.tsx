
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Building2,
  ExternalLink,
  FileCheck2,
  Landmark,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import type {
  RERAProject,
  RERAPromoter,
} from "@/data/rera";

interface RERADashboardProps {
  type: "projects" | "promoters";
  projects?: RERAProject[];
  promoters?: RERAPromoter[];
}

export default function RERADashboard({
  type,
  projects = [],
  promoters = [],
}: RERADashboardProps) {
  const [search, setSearch] = useState("");

  const isProjects = type === "projects";

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return projects;

    return projects.filter((project) =>
      [
        project.name,
        project.id,
        project.promoterRegistrationNo,
        project.reraRegistrationNo,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [projects, search]);

  const filteredPromoters = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return promoters;

    return promoters.filter((promoter) =>
      [
        promoter.company,
        promoter.id,
        promoter.cin,
        promoter.reraRegistrationNo,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [promoters, search]);

  const totalRecords = isProjects
    ? filteredProjects.length
    : filteredPromoters.length;

  const clearSearch = () => setSearch("");

  return (
    <main className="min-h-screen bg-[#f8f5ee] text-[#382b20]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#b18a50]/20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-[-8%] h-[420px] w-[420px] rounded-full border border-[#b18a50]/10" />
          <div className="absolute -top-28 right-[-4%] h-[320px] w-[320px] rounded-full border border-[#b18a50]/10" />
          <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-[#b18a50]/[0.04] to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b18a50]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
                Regulatory Information
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
              {isProjects ? (
                <>
                  RERA Registered
                  <span className="block italic text-[#a47c43]">
                    Projects
                  </span>
                </>
              ) : (
                <>
                  Registered
                  <span className="block italic text-[#a47c43]">
                    Promoters
                  </span>
                </>
              )}
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-[#817361] sm:text-base">
              {isProjects
                ? "Explore project registration details, promoter registration references and regulatory information associated with our developments."
                : "View company information and promoter registration details associated with Shalimar Group entities."}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/rera/projects"
                className={`inline-flex items-center gap-2 border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                  isProjects
                    ? "border-[#a47c43] bg-[#a47c43] text-white"
                    : "border-[#b18a50]/40 text-[#6f5940] hover:border-[#a47c43]"
                }`}
              >
                <Building2 size={15} />
                Projects
              </Link>

              <Link
                href="/rera/promoters"
                className={`inline-flex items-center gap-2 border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                  !isProjects
                    ? "border-[#a47c43] bg-[#a47c43] text-white"
                    : "border-[#b18a50]/40 text-[#6f5940] hover:border-[#a47c43]"
                }`}
              >
                <Landmark size={15} />
                Promoters
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        {/* SUMMARY + SEARCH */}
        <div className="mb-10 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck
                size={17}
                className="text-[#a47c43]"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
                Registration Directory
              </span>
            </div>

            <h2 className="mt-3 font-serif text-3xl">
              {isProjects
                ? "Project Registration Details"
                : "Promoter Registration Details"}
            </h2>

            <p className="mt-2 text-sm text-[#817361]">
              {isProjects
                ? "Search and review the available project registration records."
                : "Search and review promoter registration records."}
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
            <div className="relative w-full sm:w-[340px]">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={
                  isProjects
                    ? "Search project or registration no."
                    : "Search company or registration no."
                }
                className="h-12 w-full border border-[#b18a50]/25 bg-white/70 pl-11 pr-10 text-sm text-[#382b20] outline-none transition placeholder:text-[#a99c8b] focus:border-[#a47c43]"
              />

              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#817361] hover:text-[#382b20]"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* COUNT */}
        <div className="mb-6 flex items-center justify-between border-y border-[#b18a50]/20 py-4">
          <p className="text-xs text-[#817361]">
            Showing{" "}
            <span className="font-semibold text-[#382b20]">
              {totalRecords}
            </span>{" "}
            {isProjects ? "projects" : "promoters"}
          </p>

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
            Shalimar Corp
          </span>
        </div>

        {/* PROJECT GRID */}
        {isProjects && (
          <>
            {filteredProjects.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project, index) => (
                  <article
                    key={project.id}
                    className="group flex h-full flex-col border border-[#b18a50]/20 bg-white/65 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#b18a50]/60 hover:shadow-[0_15px_40px_rgba(56,43,32,0.06)] sm:p-7"
                  >
                    <div className="mb-7 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center border border-[#b18a50]/25 bg-[#f8f5ee] text-[#a47c43]">
                        <Building2 size={19} strokeWidth={1.5} />
                      </div>

                      <span className="text-[10px] tracking-[0.18em] text-[#b3a28c]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl leading-snug text-[#382b20]">
                      {project.name}
                    </h3>

                    <div className="mt-6 space-y-4">
                      <RegistrationField
                        label="Promoter Registration No."
                        value={project.promoterRegistrationNo}
                      />

                      <RegistrationField
                        label="RERA Registration No."
                        value={project.reraRegistrationNo}
                      />
                    </div>

                    <div className="mt-auto border-t border-[#b18a50]/15 pt-5">
                      {project.reraLink ? (
                        <a
                          href={project.reraLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a47c43] transition hover:text-[#382b20]"
                        >
                          View on {project.reraLink.label}
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="text-xs text-[#9b8c79]">
                          External registration link not available
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState onClear={clearSearch} />
            )}
          </>
        )}

        {/* PROMOTER GRID */}
        {!isProjects && (
          <>
            {filteredPromoters.length > 0 ? (
              <div className="grid gap-5 lg:grid-cols-2">
                {filteredPromoters.map((promoter, index) => (
                  <article
                    key={promoter.id}
                    className="border border-[#b18a50]/20 bg-white/65 p-6 transition duration-300 hover:border-[#b18a50]/60 hover:shadow-[0_15px_40px_rgba(56,43,32,0.06)] sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#b18a50]/25 bg-[#f8f5ee] text-[#a47c43]">
                        <Landmark size={20} strokeWidth={1.5} />
                      </div>

                      <span className="text-[10px] tracking-[0.18em] text-[#b3a28c]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-6 font-serif text-2xl leading-snug">
                      {promoter.company}
                    </h3>

                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <RegistrationField
                        label="Corporate Identification No. (CIN)"
                        value={promoter.cin}
                      />

                      <RegistrationField
                        label="Promoter Registration No."
                        value={promoter.reraRegistrationNo}
                      />
                    </div>

                    <div className="mt-7 border-t border-[#b18a50]/15 pt-5">
                      {promoter.reraLink ? (
                        <a
                          href={promoter.reraLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a47c43] transition hover:text-[#382b20]"
                        >
                          View Promoter Registration
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="text-xs text-[#9b8c79]">
                          External registration link not available
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState onClear={clearSearch} />
            )}
          </>
        )}
      </section>

      {/* DISCLAIMER */}
      <section className="border-t border-[#b18a50]/20 bg-[#f1ece2]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <FileCheck2
              size={19}
              className="shrink-0 text-[#a47c43]"
            />

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em]">
                Regulatory Information Disclaimer
              </h3>

              <p className="mt-3 max-w-4xl text-xs leading-7 text-[#817361]">
                The registration details displayed on this page are provided
                for general information. Visitors should verify the latest
                registration particulars, project status and applicable
                disclosures directly with the Uttar Pradesh Real Estate
                Regulatory Authority (UPRERA). In case of any discrepancy,
                the official regulatory records shall prevail.
              </p>

              <a
                href="https://www.up-rera.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a47c43] hover:text-[#382b20]"
              >
                Visit Official UPRERA Website
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// --------------------------------------------------
// REUSABLE REGISTRATION FIELD
// --------------------------------------------------

function RegistrationField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#a08e77]">
        {label}
      </p>

      <p className="break-words font-mono text-xs leading-6 text-[#554536]">
        {value}
      </p>
    </div>
  );
}

// --------------------------------------------------
// EMPTY SEARCH STATE
// --------------------------------------------------

function EmptyState({
  onClear,
}: {
  onClear: () => void;
}) {
  return (
    <div className="border border-dashed border-[#b18a50]/30 bg-white/40 px-6 py-16 text-center">
      <Search
        size={25}
        className="mx-auto text-[#b18a50]"
      />

      <h3 className="mt-5 font-serif text-2xl">
        No records found
      </h3>

      <p className="mt-2 text-sm text-[#817361]">
        Try searching with another name or registration number.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 inline-flex items-center gap-2 border border-[#a47c43] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a47c43] transition hover:bg-[#a47c43] hover:text-white"
      >
        Clear Search
        <X size={13} />
      </button>
    </div>
  );
}
