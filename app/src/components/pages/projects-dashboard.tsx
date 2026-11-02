
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Home,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import type {
  ProjectRecord,
  ProjectType,
  ProjectStatus,
  ProjectCategory,
} from "@/data/projects";

import {
  projectTypes,
  projectStatuses,
  projectCategories,
} from "@/data/projects";

interface ProjectsDashboardProps {
  projects: ProjectRecord[];
  initialType?: string;
  initialStatus?: string;
  initialCategory?: string;
  initialSearch?: string;
}

type FilterKey = "type" | "status" | "category" | "q";

export default function ProjectsDashboard({
  projects,
  initialType = "",
  initialStatus = "",
  initialCategory = "",
  initialSearch = "",
}: ProjectsDashboardProps) {
  const [search, setSearch] = useState(initialSearch);
  const [type, setType] = useState(initialType);
  const [status, setStatus] = useState(initialStatus);
  const [category, setCategory] = useState(initialCategory);

  // --------------------------------------------------
  // URL QUERY SYNCHRONIZATION
  // --------------------------------------------------

  const syncFromUrl = useCallback(() => {
    const params = new URLSearchParams(window.location.search);

    setSearch(params.get("q") ?? "");
    setType(params.get("type") ?? "");
    setStatus(params.get("status") ?? "");
    setCategory(params.get("category") ?? "");
  }, []);

  const updateQuery = useCallback(
    (key: FilterKey, value: string) => {
      const params = new URLSearchParams(window.location.search);

      if (value.trim()) {
        params.set(key, value.trim());
      } else {
        params.delete(key);
      }

      const query = params.toString();
      const newUrl = query
        ? `${window.location.pathname}?${query}`
        : window.location.pathname;

      window.history.pushState(null, "", newUrl);

      // Update the corresponding local filter immediately.
      switch (key) {
        case "q":
          setSearch(value);
          break;
        case "type":
          setType(value);
          break;
        case "status":
          setStatus(value);
          break;
        case "category":
          setCategory(value);
          break;
      }
    },
    []
  );

  // Browser back / forward navigation
  useEffect(() => {
    window.addEventListener("popstate", syncFromUrl);

    return () => {
      window.removeEventListener("popstate", syncFromUrl);
    };
  }, [syncFromUrl]);

  // Reset all filters and query parameters
  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(window.location.search);

    params.delete("q");
    params.delete("type");
    params.delete("status");
    params.delete("category");

    const query = params.toString();
    const newUrl = query
      ? `${window.location.pathname}?${query}`
      : window.location.pathname;

    window.history.pushState(null, "", newUrl);

    setSearch("");
    setType("");
    setStatus("");
    setCategory("");
  }, []);

  // --------------------------------------------------
  // FILTERING
  // --------------------------------------------------

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !query ||
        [
          project.name,
          project.location,
          project.city,
          project.shortDescription,
          project.description ?? "",
          project.type,
          project.status,
          ...project.categories,
          ...(project.configurations ?? []),
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesType =
        !type || project.type === type;

      const matchesStatus =
        !status || project.status === status;

      const matchesCategory =
        !category ||
        project.categories.includes(category as ProjectCategory);

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [projects, search, type, status, category]);

  // --------------------------------------------------
  // SELECTED FILTERS
  // --------------------------------------------------

  const hasFilters = Boolean(
    search || type || status || category
  );

  const selectedCategory = projectCategories.find(
    (item) => item.id === category
  );

  const selectedType = projectTypes.find(
    (item) => item.id === type
  );

  const selectedStatus = projectStatuses.find(
    (item) => item.id === status
  );

  const featuredProjects = filteredProjects.filter(
    (project) => project.featured
  );

  const regularProjects = filteredProjects.filter(
    (project) => !project.featured
  );

  const removeFilter = (key: FilterKey) => {
    updateQuery(key, "");
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-[#f8f5ee] text-[#382b20]">

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#b18a50]/20">
        <div className="pointer-events-none absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full border border-[#b18a50]/10" />
        <div className="pointer-events-none absolute -right-12 -top-16 h-[320px] w-[320px] rounded-full border border-[#b18a50]/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#b18a50]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
              Shalimar Corp
            </span>
          </div>

          <h1 className="max-w-3xl font-serif text-4xl leading-[1.12] sm:text-5xl lg:text-6xl">
            Discover Spaces.
            <span className="block italic text-[#a47c43]">
              Explore Possibilities.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-8 text-[#817361] sm:text-base">
            Explore our portfolio of residential, commercial,
            township and other developments. Find a property
            that matches your requirements.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#project-list"
              className="inline-flex items-center gap-3 bg-[#a47c43] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#382b20]"
            >
              Explore Projects
              <ArrowRight size={15} />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-[#b18a50]/40 px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f5940] transition hover:border-[#a47c43]"
            >
              Enquire Now
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECT TYPES */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="mb-8">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
            Browse by interest
          </span>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Explore Project Types
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#817361]">
            Start with the kind of development you are looking for.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {projectTypes.map((item) => {
            const count = projects.filter(
              (project) => project.type === item.id
            ).length;

            const isSelected = type === item.id;

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  updateQuery(
                    "type",
                    isSelected ? "" : item.id
                  )
                }
                className={`group flex min-h-[150px] flex-col justify-between border p-5 text-left transition ${
                  isSelected
                    ? "border-[#a47c43] bg-[#eee5d6]"
                    : "border-[#b18a50]/20 bg-white/55 hover:border-[#b18a50]/60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <Building2
                    size={21}
                    strokeWidth={1.4}
                    className="text-[#a47c43]"
                  />

                  {isSelected ? (
                    <Check size={16} className="text-[#a47c43]" />
                  ) : (
                    <ArrowUpRight
                      size={16}
                      className="text-[#b18a50] transition group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  )}
                </div>

                <div>
                  <h3 className="font-serif text-xl">
                    {item.label}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#817361]">
                    {item.description}
                  </p>

                  <p className="mt-3 text-[9px] uppercase tracking-[0.15em] text-[#a47c43]">
                    {count} {count === 1 ? "project" : "projects"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* PROPERTY CATEGORIES */}
      <section className="border-y border-[#b18a50]/20 bg-[#f1ece2]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
                Find your property
              </span>

              <h2 className="mt-2 font-serif text-3xl">
                Browse by Category
              </h2>
            </div>

            <button
              type="button"
              onClick={() => removeFilter("category")}
              disabled={!category}
              className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a47c43] hover:text-[#382b20] disabled:opacity-40"
            >
              Clear category
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {projectCategories.map((item) => {
              const isSelected = category === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() =>
                    updateQuery(
                      "category",
                      isSelected ? "" : item.id
                    )
                  }
                  className={`border px-4 py-3 text-xs transition ${
                    isSelected
                      ? "border-[#a47c43] bg-[#a47c43] text-white"
                      : "border-[#b18a50]/25 bg-white/60 text-[#6f5940] hover:border-[#a47c43]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECT DIRECTORY */}
      <section
        id="project-list"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
              Project Directory
            </span>

            <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
              {selectedCategory?.label ??
                selectedType?.label ??
                selectedStatus?.label ??
                "Explore Our Projects"}
            </h2>

            <p className="mt-2 text-sm text-[#817361]">
              Browse project information and discover more.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">

            {/* SEARCH */}
            <div className="relative min-w-0 sm:w-[300px]">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
              />

              <input
                value={search}
                onChange={(event) =>
                  updateQuery("q", event.target.value)
                }
                placeholder="Search projects or locations"
                className="h-12 w-full border border-[#b18a50]/25 bg-white/70 pl-11 pr-10 text-sm outline-none placeholder:text-[#a99c8b] focus:border-[#a47c43]"
              />

              {search && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => removeFilter("q")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#817361]"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* STATUS */}
            <div className="relative sm:w-[190px]">
              <SlidersHorizontal
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a47c43]"
              />

              <select
                value={status}
                onChange={(event) =>
                  updateQuery("status", event.target.value)
                }
                className="h-12 w-full appearance-none border border-[#b18a50]/25 bg-white/70 pl-9 pr-9 text-xs text-[#6f5940] outline-none focus:border-[#a47c43]"
              >
                <option value="">All Project Status</option>

                {projectStatuses.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={14}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#a47c43]"
              />
            </div>
          </div>
        </div>

        {/* ACTIVE FILTERS */}
        {hasFilters && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#817361]">
              Active filters:
            </span>

            {search && (
              <FilterTag
                label={`Search: ${search}`}
                onRemove={() => removeFilter("q")}
              />
            )}

            {selectedType && (
              <FilterTag
                label={selectedType.label}
                onRemove={() => removeFilter("type")}
              />
            )}

            {selectedStatus && (
              <FilterTag
                label={selectedStatus.label}
                onRemove={() => removeFilter("status")}
              />
            )}

            {selectedCategory && (
              <FilterTag
                label={selectedCategory.label}
                onRemove={() => removeFilter("category")}
              />
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="ml-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#a47c43] hover:text-[#382b20]"
            >
              Reset all
            </button>
          </div>
        )}

        {/* RESULT COUNT */}
        <div className="mt-8 flex items-center justify-between border-y border-[#b18a50]/20 py-4">
          <p className="text-xs text-[#817361]">
            <span className="font-semibold text-[#382b20]">
              {filteredProjects.length}
            </span>{" "}
            {filteredProjects.length === 1 ? "project" : "projects"} found
          </p>

          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
            Shalimar Corp
          </span>
        </div>

        {/* PROJECT CARDS */}
        {filteredProjects.length > 0 ? (
          <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              ...featuredProjects,
              ...regularProjects,
            ].map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-[#b18a50]/30 bg-white/40 px-6 py-20 text-center">
            <Home
              size={30}
              strokeWidth={1.3}
              className="mx-auto text-[#b18a50]"
            />

            <h3 className="mt-5 font-serif text-2xl">
              {projects.length === 0
                ? "Projects coming soon"
                : "No matching projects found"}
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#817361]">
              {projects.length === 0
                ? "Our project catalogue is being updated. Please contact our team for information about current developments."
                : "Try another search term or remove some filters to explore more projects."}
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 border border-[#a47c43] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a47c43] hover:bg-[#a47c43] hover:text-white"
              >
                Clear Filters
              </button>
            )}

            <div>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a47c43] hover:text-[#382b20]"
              >
                Contact Us
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* ENQUIRY BANNER */}
      <section className="border-t border-[#b18a50]/20 bg-[#f1ece2]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
              Let us help you find the right space
            </span>

            <h2 className="mt-3 font-serif text-3xl">
              Looking for something specific?
            </h2>

            <p className="mt-2 text-sm text-[#817361]">
              Connect with our team for project information and enquiries.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center gap-3 bg-[#a47c43] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#382b20]"
          >
            Send an Enquiry
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}

// --------------------------------------------------
// PROJECT CARD
// --------------------------------------------------

function ProjectCard({
  project,
}: {
  project: ProjectRecord;
}) {
  const statusLabel =
    project.statusLabel ??
    projectStatuses.find((item) => item.id === project.status)?.label ??
    project.status;

  const typeLabel =
    projectTypes.find((item) => item.id === project.type)?.label ??
    project.type;

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-[#b18a50]/20 bg-white/65 transition duration-300 hover:-translate-y-1 hover:border-[#b18a50]/60 hover:shadow-[0_15px_40px_rgba(56,43,32,0.07)]">
      <Link
        href={project.projectUrl || `/projects/${project.slug}`}
        className="block"
        aria-label={`View ${project.name}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[#eae2d5]">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#e9dfce] via-[#ded0b9] to-[#cbb797]">
              <Building2
                size={52}
                strokeWidth={0.8}
                className="text-[#a47c43]/60"
              />
            </div>
          )}

          <span className="absolute left-4 top-4 bg-[#f8f5ee]/95 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#80613d]">
            {statusLabel}
          </span>

          {project.featured && (
            <span className="absolute right-4 top-4 bg-[#a47c43] px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-white">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a47c43]">
          <span>{typeLabel}</span>
          <span className="h-1 w-1 rounded-full bg-[#b18a50]" />
          <span>{project.city}</span>
        </div>

        <Link href={project.projectUrl || `/projects/${project.slug}`}>
          <h3 className="mt-3 font-serif text-2xl leading-snug transition group-hover:text-[#a47c43]">
            {project.name}
          </h3>
        </Link>

        <p className="mt-3 flex items-center gap-2 text-xs text-[#817361]">
          <MapPin size={13} className="shrink-0 text-[#a47c43]" />
          {project.location}
        </p>

        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#817361]">
          {project.shortDescription}
        </p>

        {project.configurations &&
          project.configurations.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.configurations.map((configuration) => (
                <span
                  key={configuration}
                  className="border border-[#b18a50]/20 px-3 py-2 text-[10px] text-[#6f5940]"
                >
                  {configuration}
                </span>
              ))}
            </div>
          )}

        {project.startingPrice && (
          <p className="mt-5 text-xs text-[#817361]">
            Starting from{" "}
            <span className="font-semibold text-[#382b20]">
              {project.startingPrice}
            </span>
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-[#b18a50]/15 pt-5">
          <Link
            href={project.projectUrl || `/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a47c43] transition hover:text-[#382b20]"
          >
            Explore Project
            <ArrowRight size={14} />
          </Link>

          {project.reraUrl && (
            <a
              href={project.reraUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#817361] hover:text-[#a47c43]"
            >
              RERA
              <ArrowUpRight size={12} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function FilterTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 border border-[#b18a50]/25 bg-white/60 px-3 py-2 text-[10px] text-[#6f5940]">
      {label}

      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="text-[#a47c43] hover:text-[#382b20]"
      >
        <X size={12} />
      </button>
    </span>
  );
}
