import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
} from "lucide-react";

import type { JobRecord } from "@/data/careers";
import { getPublishedJobs } from "@/data/careers";

const portalNames: Record<string, string> = {
  LinkedIn: "Apply on LinkedIn",
  Naukri: "Apply on Naukri",
  Indeed: "Apply on Indeed",
  "Company Website": "Apply on Company Website",
  Other: "Apply Online",
};

export default function CareerDetail({ job }: { job: JobRecord }) {
  const relatedJobs = getPublishedJobs()
    .filter(
      (item) =>
        item.id !== job.id && item.department === job.department
    )
    .slice(0, 2);

  return (
    <main className="bg-[#f8f5ee]">
      <section className="bg-[#382b20] px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/career"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-[#c6a16c]"
          >
            <ArrowLeft size={16} />
            All Careers
          </Link>
          <p className="text-xs uppercase tracking-[0.2em] text-[#c6a16c]">
            {job.department}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-3xl leading-tight md:text-5xl">
            {job.title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-8 text-white/65">
            {job.shortDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm text-white/75">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-[#c6a16c]" />
              {job.location}
            </span>
            <span className="flex items-center gap-2">
              <BriefcaseBusiness size={16} className="text-[#c6a16c]" />
              {job.experience}
            </span>
            <span className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#c6a16c]" />
              {job.employmentType}
            </span>
          </div>
          <div className="mt-10">
            <Link
                href={`/career/${job.id}/apply`}
                className="inline-flex items-center gap-3 bg-[#b18a50] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#98703b]"
                >
                Apply for this Position
                <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_340px] lg:py-24">
        <div>
          <section>
            <h2 className="font-serif text-2xl text-[#382b20]">
              About the Role
            </h2>

            <div className="mt-5 space-y-4">
              {job.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-8 text-[#817361]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-[#382b20]">
              Key Responsibilities
            </h2>

            <ul className="mt-6 space-y-4">
              {job.responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-7 text-[#817361]"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-1 shrink-0 text-[#b18a50]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-[#382b20]">
              Requirements & Qualifications
            </h2>
            <ul className="mt-6 space-y-4">
              {job.requirements.map((item, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-7 text-[#817361]"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-1 shrink-0 text-[#b18a50]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
          {job.benefits && job.benefits.length > 0 && (
            <section className="mt-12">
              <h2 className="font-serif text-2xl text-[#382b20]">
                What We Offer
              </h2>

              <ul className="mt-6 space-y-3">
                {job.benefits.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm text-[#817361]"
                  >
                    <CheckCircle2
                      size={17}
                      className="shrink-0 text-[#b18a50]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="mt-12">
            <h2 className="font-serif text-2xl text-[#382b20]">
              Required Skills
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-[#dfd4c3] bg-white px-4 py-2 text-xs text-[#6f5a42]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
        <aside className="space-y-6">
          <div className="border border-[#e8e0d3] bg-white p-6">
            <h3 className="font-serif text-xl text-[#382b20]">
              Job Overview
            </h3>
            <div className="mt-6 space-y-5">
              <OverviewItem label="Department" value={job.department} />
              <OverviewItem label="Location" value={job.location} />
              <OverviewItem label="Experience" value={job.experience} />
              <OverviewItem label="Employment" value={job.employmentType} />
              <OverviewItem label="Workplace" value={job.workplace} />
              <OverviewItem label="Qualification" value={job.qualification} />
              <OverviewItem label="Openings" value={String(job.openings)} />

              {job.salary && (
                <OverviewItem label="Compensation" value={job.salary} />
              )}
              {job.closingDate && (
                <OverviewItem
                  label="Application Deadline"
                  value={job.closingDate}
                />
              )}
            </div>
          </div>
          <div
            id="apply"
            className="scroll-mt-24 border border-[#e8e0d3] bg-white p-6"
          >
            <h3 className="font-serif text-xl text-[#382b20]">
              Apply for this Position
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#817361]">
              Submit your application through one of the available
              recruitment platforms.
            </p>
            <div className="mt-6 space-y-3">
              {job.applicationLinks.map((application) => (
                <a
                  key={application.portal}
                  href={application.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-between border border-[#b18a50] px-4 py-3 text-sm font-medium text-[#8c6938] transition-colors hover:bg-[#b18a50] hover:text-white"
                >
                  {portalNames[application.portal] ?? "Apply Online"}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
      {relatedJobs.length > 0 && (
        <section className="border-t border-[#e8e0d3] bg-white px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a47c43]">
              Explore more
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#382b20]">
              Related Opportunities
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {relatedJobs.map((related) => (
                <Link
                  key={related.id}
                  href={`/career/${related.id}`}
                  className="group border border-[#e8e0d3] p-6 transition-colors hover:border-[#b18a50]"
                >
                  <p className="text-xs text-[#a47c43]">
                    {related.department}
                  </p>

                  <h3 className="mt-3 font-serif text-xl text-[#382b20] group-hover:text-[#a47c43]">
                    {related.title}
                  </h3>

                  <p className="mt-3 text-sm text-[#817361]">
                    {related.location} · {related.experience}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <p className="text-center text-xs text-[#817361]">
          Shalimar Corp Limited reserves the right to modify or withdraw
          any recruitment opportunity without prior notice.
        </p>
      </div>
    </main>
  );
}

function OverviewItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#eee8df] pb-4 last:border-0 last:pb-0">
      <p className="text-xs text-[#a18f7a]">{label}</p>
      <p className="mt-1 text-sm font-medium leading-6 text-[#382b20]">
        {value}
      </p>
    </div>
  );
}