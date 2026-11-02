"use client";

import { useMemo, useState } from "react";
import { Search, BriefcaseBusiness } from "lucide-react";
import { getPublishedJobs } from "@/data/careers";
import JobCard from "@/components/career/job-card";

export default function CareerDashboard() {
  const jobs = getPublishedJobs();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [location, setLocation] = useState("All Locations");
  const [employment, setEmployment] = useState("All Types");

  const departments = [
    "All Departments",
    ...new Set(jobs.map((job) => job.department)),
  ];

  const locations = [
    "All Locations",
    ...new Set(jobs.map((job) => job.location)),
  ];

  const employmentTypes = [
    "All Types",
    ...new Set(jobs.map((job) => job.employmentType)),
  ];

  const filteredJobs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return jobs.filter((job) => {
      const matchesSearch =
        !query ||
        [
          job.title,
          job.department,
          job.location,
          job.shortDescription,
          ...job.skills,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesDepartment =
        department === "All Departments" ||
        job.department === department;

      const matchesLocation =
        location === "All Locations" || job.location === location;

      const matchesEmployment =
        employment === "All Types" ||
        job.employmentType === employment;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLocation &&
        matchesEmployment
      );
    });
  }, [jobs, search, department, location, employment]);

  const featuredJobs = jobs.filter((job) => job.featured);

  return (
    <main className="bg-[#f8f5ee]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#382b20] px-6 py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-[#c6a16c]">
            Careers at Shalimar
          </p>

          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Build your future.
            <br />
            <span className="text-[#c6a16c]">Grow with us.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
            Be part of a team shaping meaningful spaces, creating lasting
            value and building the future with purpose.
          </p>

          <div className="mt-10 flex items-center gap-3 text-sm text-white/75">
            <BriefcaseBusiness size={18} className="text-[#c6a16c]" />
            {jobs.length} current opportunities
          </div>
        </div>
      </section>

      {/* Featured roles */}
      {featuredJobs.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a47c43]">
              Selected opportunities
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#382b20]">
              Featured Positions
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </section>
      )}

      {/* All jobs */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-9">
          <p className="text-xs uppercase tracking-[0.2em] text-[#a47c43]">
            Find your opportunity
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#382b20]">
            Current Openings
          </h2>
          <p className="mt-3 text-sm text-[#817361]">
            Explore opportunities across our teams and departments.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid gap-3 border border-[#e8e0d3] bg-white p-4 md:grid-cols-4">
          <div className="relative md:col-span-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search jobs, skills..."
              className="h-12 w-full border border-[#e8e0d3] bg-transparent pl-10 pr-3 text-sm text-[#382b20] outline-none focus:border-[#b18a50]"
            />
          </div>

          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="h-12 border border-[#e8e0d3] bg-white px-3 text-sm text-[#382b20] outline-none focus:border-[#b18a50]"
          >
            {departments.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="h-12 border border-[#e8e0d3] bg-white px-3 text-sm text-[#382b20] outline-none focus:border-[#b18a50]"
          >
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={employment}
            onChange={(event) => setEmployment(event.target.value)}
            className="h-12 border border-[#e8e0d3] bg-white px-3 text-sm text-[#382b20] outline-none focus:border-[#b18a50]"
          >
            {employmentTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-[#817361]">
            Showing{" "}
            <span className="font-semibold text-[#382b20]">
              {filteredJobs.length}
            </span>{" "}
            opportunities
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setDepartment("All Departments");
              setLocation("All Locations");
              setEmployment("All Types");
            }}
            className="text-xs text-[#a47c43] underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-[#d8cbb8] bg-white px-6 py-16 text-center">
            <BriefcaseBusiness
              size={30}
              className="mx-auto text-[#b18a50]"
            />
            <h3 className="mt-5 font-serif text-xl text-[#382b20]">
              No matching positions found
            </h3>
            <p className="mt-2 text-sm text-[#817361]">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}