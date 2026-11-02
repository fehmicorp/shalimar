
"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogData } from "@/store/blog";

interface BlogSectionProps {
  blogs?: BlogData[];
}

export default function BlogSection({ blogs = [] }: BlogSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const publishedBlogs = useMemo(
    () =>
      (Array.isArray(blogs) ? blogs : [])
        .filter((blog) => blog && blog.status === "published")
        .sort(
          (a, b) =>
            new Date(b.publishedAt ?? b.createdAt).getTime() -
            new Date(a.publishedAt ?? a.createdAt).getTime()
        ),
    [blogs]
  );

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(publishedBlogs.map((blog) => blog.category))
      ),
    ],
    [publishedBlogs]
  );

  const filteredBlogs = useMemo(
    () =>
      activeCategory === "All"
        ? publishedBlogs
        : publishedBlogs.filter(
            (blog) => blog.category === activeCategory
          ),
    [publishedBlogs, activeCategory]
  );

  const featuredBlog =
    filteredBlogs.find((blog) => blog.featured) ?? filteredBlogs[0];

  const remainingBlogs = filteredBlogs.filter((blog) => blog.id !== featuredBlog?.id).slice(0, 2);

  const formatDate = (date: string | null) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(parsedDate);
  };

  return (
    <section
      id="blog"
      className="relative isolate w-full overflow-hidden bg-[#f8f5ee] px-4 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-12 lg:pb-24 lg:pt-20"
    >
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#d4b47a]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#c7a36a]/10 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-10 text-center sm:mb-14">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#b18a50]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#a47c43]">
              Shalimar Journal
            </span>
            <span className="h-px w-8 bg-[#b18a50]" />
          </div>
          <h2 className="font-serif text-3xl text-[#382b20] sm:text-4xl lg:text-5xl">
            Insights &{" "}
            <span className="italic text-[#a47c43]">
              Perspectives
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xs font-light leading-7 tracking-wide text-[#817361] sm:text-sm">
            Discover ideas, inspiration and perspectives on architecture,
            real estate, modern living and the evolving world of luxury.
          </p>
        </div>
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-4 py-2 text-[9px] uppercase tracking-[0.15em] transition-all duration-300 sm:px-5 sm:text-[10px] ${
                activeCategory === category
                  ? "border-[#a47c43] bg-[#a47c43] text-white shadow-md"
                  : "border-[#d9cbb3] bg-white/50 text-[#806c51] hover:border-[#a47c43] hover:bg-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {featuredBlog ? (
          <div className="grid grid-cols-1 items-stretch gap-7 lg:grid-cols-2 lg:gap-8">
            <article className="group flex h-auto min-h-[350px] max-h-none flex-col overflow-hidden rounded-2xl border border-[#e8dece] bg-white/60 shadow-[0_12px_45px_rgba(75,55,30,0.06)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_55px_rgba(75,55,30,0.12)] lg:h-[350px] lg:min-h-0">
              <div className="grid h-full grid-cols-1 md:grid-cols-2">
                <Link
                  href={`/blog/${featuredBlog.slug}`}
                  className="group/image relative block aspect-[16/9] overflow-hidden bg-[#e9dfcd] md:aspect-auto"
                >
                  {featuredBlog.images?.[0] && (
                    <Image
                      src={featuredBlog.images[0]}
                      alt={featuredBlog.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover/image:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 border border-white/50 bg-white/20 px-3 py-2 text-[8px] uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    Featured Article
                  </span>
                </Link>
                <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6 lg:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-[#a47c43]">
                    <span>{featuredBlog.category}</span>
                    <span className="h-1 w-1 rounded-full bg-[#b18a50]" />
                    <span>{featuredBlog.type}</span>
                  </div>
                  <h3 className="mt-3 line-clamp-3 font-serif text-xl leading-snug text-[#382b20] sm:text-2xl">
                    {featuredBlog.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-xs font-light leading-6 text-[#817361]">
                    {featuredBlog.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[9px] text-[#9a896f]">
                    <span>{featuredBlog.author}</span>
                    <span>•</span>
                    <span>{formatDate(featuredBlog.publishedAt)}</span>
                    <span>•</span>
                    <span>{featuredBlog.readTime} min read</span>
                  </div>
                  <div className="mt-5">
                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="group/link inline-flex items-center gap-3 border-b border-[#a47c43] pb-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#a47c43] transition-colors hover:text-[#382b20]"
                    >
                      Read Featured Article
                      <span className="transition-transform duration-300 group-hover/link:translate-x-2">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-1 lg:grid-rows-2">
              {remainingBlogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group flex h-auto min-h-[280px] flex-col overflow-hidden rounded-xl border border-[#e8dece] bg-white/55 shadow-[0_8px_30px_rgba(75,55,30,0.04)] transition-all duration-500 hover:bg-white hover:shadow-[0_16px_40px_rgba(75,55,30,0.10)] lg:h-[165px] lg:min-h-0 lg:flex-row"
                >
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="relative block aspect-[16/9] shrink-0 overflow-hidden bg-[#e9dfcd] lg:aspect-auto lg:h-full lg:w-[38%]"
                  >
                    {blog.images?.[0] && (
                      <Image
                        src={blog.images[0]}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 20vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <span className="absolute left-3 top-3 border border-white/50 bg-white/75 px-3 py-1.5 text-[8px] uppercase tracking-[0.15em] text-[#8b6b40] backdrop-blur-md">
                      {blog.category}
                    </span>
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col justify-center p-4">
                    <div className="flex flex-wrap items-center gap-2 text-[8px] uppercase tracking-[0.15em] text-[#a47c43]">
                      <span>{blog.type}</span>
                      <span>•</span>
                      <span>{formatDate(blog.publishedAt)}</span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 font-serif text-lg leading-snug text-[#382b20] transition-colors group-hover:text-[#a47c43]">
                      {blog.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[11px] font-light leading-5 text-[#817361]">
                      {blog.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {blog.tag?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#f1e9dc] px-2 py-1 text-[8px] tracking-wide text-[#92754e]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between border-t border-[#eee5d8] pt-2 mt-3">
                      <span className="text-[9px] text-[#9a896f]">
                        {blog.readTime} min read
                      </span>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.15em] text-[#a47c43] transition-all hover:gap-4"
                      >
                        Explore <span>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-[#e8dece] bg-white/50 px-6 py-16 text-center">
            <h3 className="font-serif text-xl text-[#382b20]">
              No Articles Available
            </h3>

            <p className="mt-2 text-sm font-light text-[#817361]">
              There are currently no published articles in this category.
            </p>
          </div>
        )}
        {publishedBlogs.length > 0 && (
          <div className="mt-12 text-center sm:mt-16">
            <Link
              href="/blog"
              className="inline-flex items-center gap-4 border border-[#a47c43] px-7 py-3.5 text-[9px] font-medium uppercase tracking-[0.25em] text-[#a47c43] transition-all duration-300 hover:bg-[#a47c43] hover:text-white"
            >
              Explore All Articles
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
