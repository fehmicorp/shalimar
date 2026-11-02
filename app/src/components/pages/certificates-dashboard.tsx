"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  FileText,
  ShieldCheck,
  CalendarDays,
  ArrowUpRight,
  Download,
  Award,
} from "lucide-react";

import type { CertificateRecord } from "@/data/certificates";

interface CertificatesDashboardProps {
  certificates: CertificateRecord[];
}

export default function CertificatesDashboard({
  certificates,
}: CertificatesDashboardProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(certificates.map((item) => item.category))],
    [certificates]
  );

  const filteredCertificates = useMemo(() => {
    const query = search.toLowerCase().trim();

    return certificates.filter((certificate) => {
      const matchesCategory =
        category === "All" || certificate.category === category;

      const matchesSearch =
        !query ||
        certificate.title.toLowerCase().includes(query) ||
        certificate.certificateNumber.toLowerCase().includes(query) ||
        certificate.issuedBy.toLowerCase().includes(query) ||
        certificate.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [certificates, search, category]);

  return (
    <main className="min-h-screen bg-[#f8f5ee] text-[#382b20]">
      <section className="relative overflow-hidden border-b border-[#b18a50]/20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8f5ee] via-[#f8f5ee] to-[#eee5d6]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#b18a50]" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[#a47c43]">
              Shalimar Corp Limited
            </span>
          </div>
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl leading-tight md:text-6xl">
                Certificates &{" "}
                <span className="text-[#a47c43]">Accreditations</span>
              </h1>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-[#817361] md:text-base">
                Explore our corporate certificates, registrations and
                certifications. Access individual certificate details and
                view the original documents.
              </p>
            </div>
            <div className="flex items-center gap-4 border-t border-[#b18a50]/30 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b18a50]/40">
                <Award className="h-5 w-5 text-[#a47c43]" />
              </div>
              <div>
                <p className="font-serif text-3xl">
                  {certificates.length.toString().padStart(2, "0")}
                </p>
                <p className="text-xs uppercase tracking-wider text-[#817361]">
                  Published certificates
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a47c43]">
              Document library
            </p>
            <h2 className="mt-2 font-serif text-3xl">Our Certificates</h2>
            <p className="mt-2 text-sm text-[#817361]">
              Browse and access official company documents.
            </p>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a47c43]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search certificates..."
              className="h-12 w-full border border-[#d9cbb7] bg-white/70 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#a99b89] focus:border-[#a47c43]"
            />
          </div>
        </div>
        <div className="mb-9 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`border px-5 py-2.5 text-xs font-medium transition ${
                category === item
                  ? "border-[#382b20] bg-[#382b20] text-white"
                  : "border-[#d9cbb7] bg-transparent text-[#817361] hover:border-[#a47c43] hover:text-[#382b20]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {filteredCertificates.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCertificates.map((certificate) => (
              <article
                key={certificate.id}
                className="group flex flex-col border border-[#e1d7c8] bg-white/70 transition duration-300 hover:-translate-y-1 hover:border-[#b18a50]/60 hover:shadow-[0_15px_40px_rgba(56,43,32,0.08)]"
              >
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-[#f1ece3]">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-[#b18a50]/40 bg-[#f8f5ee]">
                    <FileText className="h-9 w-9 text-[#a47c43]" />
                  </div>

                  <span className="absolute left-5 top-5 border border-[#b18a50]/30 bg-[#f8f5ee] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#a47c43]">
                    {certificate.category}
                  </span>

                  <span className="absolute right-5 top-5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wider text-[#647a58]">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified document
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#a47c43]">
                    {certificate.certificateNumber}
                  </p>

                  <h3 className="mt-3 font-serif text-xl leading-snug text-[#382b20]">
                    {certificate.title}
                  </h3>

                  {certificate.description && (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#817361]">
                      {certificate.description}
                    </p>
                  )}
                  <div className="mt-6 space-y-3 border-t border-[#e9e0d4] pt-5">
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-[#a09280]">Issued by</span>
                      <span className="text-right font-medium text-[#574737]">
                        {certificate.issuedBy}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs">
                      <span className="text-[#a09280]">Issue date</span>
                      <span className="flex items-center gap-1.5 font-medium text-[#574737]">
                        <CalendarDays className="h-3.5 w-3.5 text-[#a47c43]" />
                        {new Date(
                          `${certificate.issueDate}T00:00:00`
                        ).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {certificate.validUntil && (
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="text-[#a09280]">Valid until</span>
                        <span className="font-medium text-[#574737]">
                          {new Date(
                            `${certificate.validUntil}T00:00:00`
                          ).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-7 flex items-center justify-between border-t border-[#e9e0d4] pt-5">
                    <Link
                      href={`/certificates/${certificate.id}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a47c43] transition hover:text-[#382b20]"
                    >
                      View certificate
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                    <a
                      href={certificate.pdfUrl}
                      download
                      aria-label={`Download ${certificate.title}`}
                      className="flex h-9 w-9 items-center justify-center border border-[#e1d7c8] text-[#817361] transition hover:border-[#a47c43] hover:text-[#a47c43]"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[#d9cbb7] py-20 text-center">
            <FileText className="mx-auto h-10 w-10 text-[#b18a50]" />
            <h3 className="mt-4 font-serif text-xl">No certificates found</h3>
            <p className="mt-2 text-sm text-[#817361]">
              Try another search term or select a different category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#a47c43] underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
      <section className="border-t border-[#b18a50]/20 bg-[#eee8dd]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-xs leading-6 text-[#817361] md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            All documents are provided for reference and verification purposes.
          </p>
          <p className="uppercase tracking-[0.16em]">
            Shalimar Corp Limited
          </p>
        </div>
      </section>
    </main>
  );
}