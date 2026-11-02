
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useProjectsStore } from "@/store/projects";
import { ProjectItems } from "@/store/projectslist";

export default function ProjectBookshelf() {
  const {
    currentIndex,
    setCurrentIndex,
  } = useProjectsStore();

  const visibleItemsCount = 5;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [hoveredBook, setHoveredBook] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const categories = useMemo(
    () => ["All", ...new Set(ProjectItems.map((item) => item.category))],
    []
  );

  const cities = useMemo(
    () => ["All", ...new Set(ProjectItems.map((item) => item.city))],
    []
  );

  const filteredProjects = useMemo(() => {
    return ProjectItems.filter((item) => {
      const categoryMatch =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      const cityMatch =
        selectedCity === "All" ||
        item.city === selectedCity;

      return categoryMatch && cityMatch;
    });
  }, [selectedCategory, selectedCity]);

  const activeList = filteredProjects;

  const safeIndex =
    activeList.length > 0
      ? ((currentIndex % activeList.length) + activeList.length) %
        activeList.length
      : 0;

  // Display five books in a circular sliding window.
  const displayedProjects = useMemo(() => {
    if (!activeList.length) return [];

    const count = Math.min(visibleItemsCount, activeList.length);

    return Array.from({ length: count }, (_, i) => {
      const originalIndex = (safeIndex + i) % activeList.length;

      return {
        ...activeList[originalIndex],
        originalIndex,
        isActive: originalIndex === safeIndex,
      };
    });
  }, [activeList, safeIndex]);

  const handleNext = useCallback(() => {
    if (!activeList.length) return;

    setCurrentIndex((safeIndex + 1) % activeList.length);
  }, [activeList.length, safeIndex, setCurrentIndex]);

  const handlePrev = useCallback(() => {
    if (!activeList.length) return;

    setCurrentIndex(
      (safeIndex - 1 + activeList.length) % activeList.length
    );
  }, [activeList.length, safeIndex, setCurrentIndex]);

  const handleSelect = useCallback(
    (index: number) => {
      setCurrentIndex(index);
    },
    [setCurrentIndex]
  );

  // Autoplay: pause while hovering over the bookshelf.
  useEffect(() => {
    if (isPaused || activeList.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((currentIndex + 1) % activeList.length);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPaused, activeList.length, setCurrentIndex]);

  const resetFilters = (category: string, city: string) => {
    setSelectedCategory(category);
    setSelectedCity(city);
    setCurrentIndex(0);
  };

  if (!activeList.length) {
    return (
      <div className="w-full py-20 text-center text-stone-500">
        No projects found for the selected filters.
      </div>
    );
  }

  return (
    <section
      className="relative z-20 mx-auto flex w-full max-w-[1600px]
      flex-col gap-8 overflow-hidden px-4 pb-12 pt-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredBook(null);
      }}
    >
      {/* HEADER / CONTROLS */}

      <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl
        bg-white/[0.02] p-5 backdrop-blur-sm border-2 border-white/10">

        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-amber-700">
            {String(safeIndex + 1).padStart(2, "0")}
          </span>

          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase
              tracking-[0.2em] text-stone-700">
              Featured Project
            </span>

            <span className="text-xs text-stone-500">
              {String(activeList.length).padStart(2, "0")} Projects
            </span>
          </div>
        </div>

        {/* FILTERS */}

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) =>
              resetFilters(e.target.value, selectedCity)
            }
            className="cursor-pointer rounded-xl border
              border-amber-300 bg-amber-50 px-4 py-2.5
              text-xs font-medium text-stone-800 outline-none
              transition focus:ring-2 focus:ring-amber-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "All" ? "All Categories" : category}
              </option>
            ))}
          </select>

          <select
            value={selectedCity}
            onChange={(e) =>
              resetFilters(selectedCategory, e.target.value)
            }
            className="cursor-pointer rounded-xl border
              border-amber-300 bg-amber-50 px-4 py-2.5
              text-xs font-medium text-stone-800 outline-none
              transition focus:ring-2 focus:ring-amber-500"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city === "All" ? "All Cities" : city}
              </option>
            ))}
          </select>
        </div>

        {/* NAVIGATION */}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous project"
            className="rounded-xl border border-amber-500/30
              bg-amber-500/10 p-3 text-amber-800
              transition-all duration-300
              hover:bg-amber-600 hover:text-white
              active:scale-95"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next project"
            className="rounded-xl border border-amber-500/30
              bg-amber-500/10 p-3 text-amber-800
              transition-all duration-300
              hover:bg-amber-600 hover:text-white
              active:scale-95"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* SLIDING BOOKSHELF */}

      <div
        className="relative flex min-h-[480px] w-full
          items-stretch gap-2 overflow-hidden
          rounded-2xl"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {displayedProjects.map((project) => {
            const isActive = project.isActive;
            const isHovered = hoveredBook === String(project.id);

            return (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  flex: isActive ? 7 : 1,
                }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  flex: {
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  layout: {
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  },
                  opacity: { duration: 0.3 },
                }}
                onClick={() => handleSelect(project.originalIndex)}
                onMouseEnter={() =>
                  setHoveredBook(String(project.id))
                }
                onMouseLeave={() => setHoveredBook(null)}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${project.title}`}
                aria-pressed={isActive}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(project.originalIndex);
                  }
                }}
                className={`group relative min-w-0 h-[480px]
                  cursor-pointer overflow-hidden rounded-2xl
                  border transition-colors duration-300
                  ${
                    isActive
                      ? "border-amber-400/60 shadow-2xl shadow-black/20"
                      : "border-white/10"
                  }`}
              >
                {/* BACKGROUND IMAGE */}

                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    loading="eager"
                    priority={isActive}
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className={`object-cover
                      transition-transform duration-1000
                      ${
                        isActive
                          ? "scale-100"
                          : "scale-110 group-hover:scale-100"
                      }`}
                  />

                  <div
                    className={`absolute inset-0 transition-all
                      duration-500 ${
                        isActive
                          ? "bg-gradient-to-t from-black/95 via-black/35 to-black/10"
                          : "bg-black/55 group-hover:bg-black/40"
                      }`}
                  />
                </div>

                {/* ACTIVE PROJECT DETAILS */}

                {isActive ? (
                  <motion.div
                    key={`active-${project.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.15 }}
                    className="absolute inset-0 flex flex-col
                      justify-end p-6 sm:p-10"
                  >
                    <span className="mb-4 w-fit rounded-full
                      border border-amber-400/30
                      bg-amber-500/20 px-4 py-1.5
                      text-[10px] font-semibold uppercase
                      tracking-[0.2em] text-amber-300">
                      {project.category}
                    </span>

                    <h3 className="max-w-2xl font-serif
                      text-3xl font-medium leading-tight
                      text-white sm:text-5xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-xs font-medium
                      uppercase tracking-[0.2em] text-amber-200">
                      {project.location}
                    </p>

                    <p className="mt-4 max-w-xl text-sm
                      leading-relaxed text-stone-300
                      line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-7">
                      <span className="inline-flex items-center
                        gap-3 rounded-full border
                        border-amber-400/40 bg-amber-500/10
                        px-5 py-3 text-xs font-semibold
                        uppercase tracking-widest text-amber-200">
                        Selected Project
                        <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  /* COLLAPSED BOOK */

                  <div className="absolute inset-0 flex flex-col
                    items-center justify-between py-6">

                    <span className="text-[10px] font-semibold
                      uppercase tracking-[0.2em] text-white/70">
                      {String(project.originalIndex + 1).padStart(2, "0")}
                    </span>

                    <h4 className="whitespace-nowrap font-serif
                      text-sm font-medium tracking-wider
                      text-white [writing-mode:vertical-rl]
                      rotate-180">
                      {project.title}
                    </h4>

                    {/* EXPLORE BUTTON: ONLY HOVER CHANGES BG */}

                    <span
                      className={`rounded-full border px-3 py-2
                        text-[9px] font-semibold uppercase
                        tracking-widest transition-all duration-300
                        ${
                          isHovered
                            ? "border-amber-400 bg-amber-500 text-black"
                            : "border-white/30 bg-black/20 text-white"
                        }`}
                    >
                      Explore
                    </span>
                  </div>
                )}
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* PROGRESS INDICATORS */}

      <div className="flex items-center justify-center gap-2">
        {activeList.map((project, index) => (
          <button
            key={project.id}
            type="button"
            aria-label={`Select project ${index + 1}`}
            aria-current={safeIndex === index ? "true" : undefined}
            onClick={() => handleSelect(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              safeIndex === index
                ? "w-10 bg-amber-600"
                : "w-3 bg-stone-400/40 hover:bg-amber-500"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
