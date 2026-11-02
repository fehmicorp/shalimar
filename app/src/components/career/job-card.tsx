import Link from "next/link";
import { MapPin, BriefcaseBusiness, Clock3, ArrowUpRight } from "lucide-react";
import type { JobRecord } from "@/data/careers";

export default function JobCard({ job }: { job: JobRecord }) {
  return (
    <article className="group flex h-full flex-col border border-[#e8e0d3] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#b18a50] hover:shadow-[0_12px_35px_rgba(56,43,32,0.07)]">
      <div className="mb-5 flex items-start justify-between gap-4">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#a47c43]">
          {job.department}
        </span>

        {job.featured && (
          <span className="bg-[#f5efe5] px-3 py-1 text-[10px] uppercase tracking-wider text-[#8c6938]">
            Featured
          </span>
        )}
      </div>

      <h3 className="text-xl font-serif text-[#382b20] transition-colors group-hover:text-[#a47c43]">
        {job.title}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#817361]">
        {job.shortDescription}
      </p>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-xs text-[#817361]">
        <span className="flex items-center gap-2">
          <MapPin size={14} />
          {job.location}
        </span>

        <span className="flex items-center gap-2">
          <BriefcaseBusiness size={14} />
          {job.experience}
        </span>

        <span className="flex items-center gap-2">
          <Clock3 size={14} />
          {job.employmentType}
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-[#eee8df] pt-5 mt-6">
        <span className="text-xs text-[#817361]">{job.workplace}</span>

        <Link
          href={`/career/${job.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#a47c43] transition-all hover:gap-3"
        >
          View Position
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}