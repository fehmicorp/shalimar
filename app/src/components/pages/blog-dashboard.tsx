
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Search,
  BookOpen,
  Building2,
  Heart,
  Landmark,
  Newspaper,
} from "lucide-react";

import type { BlogRecord } from "@/data/blogs";

interface BlogDashboardProps {
  blogs: BlogRecord[];
}

const coverIcons = {
  "real-estate": Building2,
  lifestyle: Heart,
  architecture: Landmark,
  corporate: Newspaper,
};

const coverBackgrounds = {
  "real-estate": "from-[#382b20] via-[#68513a] to-[#a47c43]",
  lifestyle: "from-[#4b4238] via-[#82715b] to-[#b18a50]",
  architecture: "from-[#292f31] via-[#555b55] to-[#a18b6b]",
  corporate: "from-[#302921] via-[#5b4937] to-[#98703b]",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function BlogCover({
  blog,
  featured = false,
}: {
  blog: BlogRecord;
  featured?: boolean;
}) {
  const Icon = coverIcons[blog.coverStyle];
  const background = coverBackgrounds[blog.coverStyle];

  return (
    <div
      className={`relative flex h-full min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br ${background}`}
    >
      <div className="absolute -right-12 -top-16 h-64 w-64 rounded-full border border-white/15" />
      <div className="absolute -right-4 -top-8 h-48 w-48 rounded-full border border-white/15" />
      <div className="absolute -bottom-24 -left-12 h-56 w-56 rounded-full border border-white/10" />

      <div className="relative flex flex-col items-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
          <Icon
            size={featured ? 32 : 27}
            strokeWidth={1.1}
            className="text-[#f8f5ee]"
          />
        </div>

        <p className="mt-5 max-w-[280px] font-serif text-2xl leading-tight text-[#f8f5ee] md:text-3xl">
          {blog.coverLabel}
        </p>

        <span className="mt-4 h-px w-12 bg-[#d8b77f]" />
        <p className="mt-3 text-[9px] uppercase tracking-[0.28em] text-white/70">
          Shalimar Corp
        </p>
      </div>

      <span className="absolute bottom-4 right-5 font-serif text-4xl text-white/15">
        {blog.id.toUpperCase()}
      </span>
    </div>
  );
}

function BlogMeta({ blog }: { blog: BlogRecord }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#958673]">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays size={13} />
        {formatDate(blog.publishedAt)}
      </span>

      <span className="inline-flex items-center gap-1.5">
        <Clock3 size={13} />
        {blog.readingTime} min read
      </span>
    </div>
  );
}

export default function BlogDashboard({ blogs }: BlogDashboardProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(blogs.map((blog) => blog.category))],
    [blogs]
  );

  const featuredBlog = blogs.find((blog) => blog.featured) ?? blogs[0];

  const filteredBlogs = useMemo(() => {
    const query = search.toLowerCase().trim();

    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" ||
        blog.category === activeCategory;

      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [blogs, search, activeCategory]);

  const otherBlogs = filteredBlogs.filter(
    (blog) => blog.id !== featuredBlog?.id
  );

  const showFeatured =
    featuredBlog &&
    !search.trim() &&
    activeCategory === "All";

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ee] text-[#382b20]">
      <section className="relative overflow-hidden bg-[#382b20]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#382b20] via-[#382b20]/95 to-[#382b20]/65" />
        <div className="absolute -right-32 -top-40 h-[550px] w-[550px] rounded-full border border-[#b18a50]/20" />
        <div className="absolute -right-16 -top-24 h-[400px] w-[400px] rounded-full border border-[#b18a50]/20" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b18a50]" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36e]">
                Insights & Perspectives
              </p>
            </div>
            <h1 className="font-serif text-5xl leading-tight text-[#f8f5ee] md:text-7xl">
              Stories That
              <span className="block italic text-[#c6a36e]">
                Shape Perspectives.
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-8 text-[#e3d9c9] md:text-base">
              Explore ideas, perspectives and updates from Shalimar Corp.
              Discover insights on real estate, architecture, modern living
              and the evolving world around us.
            </p>
          </div>
        </div>
      </section>
      {showFeatured && (
        <section className="mx-auto max-w-7xl px-6 pt-14 md:px-10 md:pt-20">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-[#b18a50]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
              Featured Story
            </p>
          </div>
          <article className="grid overflow-hidden border border-[#e3d8c8] bg-white md:grid-cols-2">
            <div className="min-h-[300px] md:min-h-[430px]">
              <BlogCover blog={featuredBlog} featured />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-12 lg:p-16">
              <span className="w-fit border border-[#d9c9b2] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#a47c43]">
                {featuredBlog.category}
              </span>
              <h2 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">
                {featuredBlog.title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-[#817361]">
                {featuredBlog.excerpt}
              </p>
              <div className="mt-7">
                <BlogMeta blog={featuredBlog} />
              </div>
              <p className="mt-4 text-xs text-[#a09280]">
                By {featuredBlog.author}
              </p>

              <Link
                href={`/blog/${featuredBlog.id}`}
                className="mt-9 inline-flex w-fit items-center gap-3 bg-[#382b20] px-7 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#a47c43]"
              >
                Read Full Article
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        </section>
      )}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
              The Journal
            </p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
              Latest Articles
            </h2>
            <p className="mt-3 text-sm text-[#817361]">
              Knowledge, ideas and updates from our world.
            </p>
          </div>
          <div className="relative w-full md:max-w-sm">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a47c43]"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="h-12 w-full border border-[#ded3c3] bg-white/70 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#a99b89] focus:border-[#a47c43]"
            />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`border px-5 py-2.5 text-xs font-medium transition ${
                activeCategory === category
                  ? "border-[#382b20] bg-[#382b20] text-white"
                  : "border-[#d9cbb7] text-[#817361] hover:border-[#a47c43] hover:text-[#382b20]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {filteredBlogs.length > 0 ? (
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {(showFeatured ? otherBlogs : filteredBlogs).map((blog) => (
              <article
                key={blog.id}
                className="group flex flex-col overflow-hidden border border-[#e3d8c8] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#b18a50]/60 hover:shadow-[0_15px_40px_rgba(56,43,32,0.08)]"
              >
                <Link
                  href={`/blog/${blog.id}`}
                  className="block h-[230px] overflow-hidden"
                  aria-label={`Read ${blog.title}`}
                >
                  <div className="h-full transition-transform duration-500 group-hover:scale-[1.04]">
                    <BlogCover blog={blog} />
                  </div>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#a47c43]">
                      {blog.category}
                    </span>
                    <span className="text-[10px] text-[#a09280]">
                      {blog.id.toUpperCase()}
                    </span>
                  </div>
                  <Link href={`/blog/${blog.id}`}>
                    <h3 className="mt-4 font-serif text-2xl leading-snug transition-colors group-hover:text-[#a47c43]">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-[#817361]">
                    {blog.excerpt}
                  </p>
                  <div className="mt-6">
                    <BlogMeta blog={blog} />
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-[#e9e0d4] pt-5 mt-6">
                    <span className="text-[10px] text-[#a09280]">
                      By {blog.author}
                    </span>
                    <Link
                      href={`/blog/${blog.id}`}
                      aria-label={`Read ${blog.title}`}
                      className="flex h-9 w-9 items-center justify-center border border-[#e1d7c8] text-[#a47c43] transition hover:border-[#a47c43] hover:bg-[#a47c43] hover:text-white"
                    >
                      <ArrowUpRight size={17} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-dashed border-[#d9cbb7] py-20 text-center">
            <BookOpen
              size={36}
              className="mx-auto text-[#b18a50]"
              strokeWidth={1.2}
            />
            <h3 className="mt-5 font-serif text-2xl">
              No articles found
            </h3>
            <p className="mt-2 text-sm text-[#817361]">
              Try another search term or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 text-xs font-semibold uppercase tracking-wider text-[#a47c43] underline underline-offset-4"
            >
              Clear Filters
            </button>
          </div>
        )}
        <div className="mt-10 text-center text-xs text-[#a09280]">
          Showing {filteredBlogs.length}{" "}
          {filteredBlogs.length === 1 ? "article" : "articles"}
        </div>
      </section>
      <section className="border-t border-[#b18a50]/20 bg-[#f0e9dd]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="font-serif text-2xl">
              Discover more about Shalimar.
            </p>
            <p className="mt-2 text-sm text-[#817361]">
              Explore our developments, philosophy and journey.
            </p>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#a47c43] transition hover:text-[#382b20]"
          >
            About Shalimar
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}