
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  MessageCircle,
  Newspaper,
} from "lucide-react";

import type { BlogRecord } from "@/data/blogs";

interface BlogDetailProps {
  blog: BlogRecord;
  relatedBlogs: BlogRecord[];
}

const coverBackgrounds = {
  "real-estate": "from-[#382b20] via-[#68513a] to-[#a47c43]",
  lifestyle: "from-[#4b4238] via-[#82715b] to-[#b18a50]",
  architecture: "from-[#292f31] via-[#555b55] to-[#a18b6b]",
  corporate: "from-[#302921] via-[#5b4937] to-[#98703b]",
};

const coverIcons = {
  "real-estate": "⌂",
  lifestyle: "✧",
  architecture: "◇",
  corporate: "▤",
};

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function ArticleCover({ blog }: { blog: BlogRecord }) {
  return (
    <div
      className={`relative flex min-h-[280px] items-center justify-center overflow-hidden bg-gradient-to-br ${coverBackgrounds[blog.coverStyle]} md:min-h-[420px]`}
    >
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full border border-white/15" />
      <div className="absolute -right-5 -top-5 h-64 w-64 rounded-full border border-white/15" />
      <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full border border-white/10" />

      <div className="relative max-w-xl px-8 text-center">
        <div className="font-serif text-6xl text-[#d8b77f]">
          {coverIcons[blog.coverStyle]}
        </div>

        <h2 className="mt-6 font-serif text-3xl leading-tight text-[#f8f5ee] md:text-5xl">
          {blog.coverLabel}
        </h2>

        <span className="mx-auto mt-6 block h-px w-16 bg-[#d8b77f]" />

        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/70">
          Shalimar Corp
        </p>
      </div>

      <span className="absolute bottom-5 right-6 font-serif text-4xl text-white/15">
        {blog.id.toUpperCase()}
      </span>
    </div>
  );
}

function ArticleContent({ blog }: { blog: BlogRecord }) {
  return (
    <div className="space-y-7">
      {blog.content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="text-[15px] leading-8 text-[#716452]"
              >
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2
                key={index}
                className="pt-5 font-serif text-2xl leading-snug text-[#382b20] md:text-3xl"
              >
                {block.text}
              </h2>
            );

          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-[#b18a50] bg-[#f0e9dd] px-6 py-6 font-serif text-xl italic leading-8 text-[#574737] md:px-8 md:text-2xl"
              >
                “{block.text}”
              </blockquote>
            );

          case "list":
            return (
              <div
                key={index}
                className="border border-[#e3d8c8] bg-white/60 p-6 md:p-8"
              >
                {block.title && (
                  <h3 className="mb-5 font-serif text-xl text-[#382b20]">
                    {block.title}
                  </h3>
                )}

                <ul className="space-y-3">
                  {block.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start gap-3 text-sm leading-7 text-[#716452]"
                    >
                      <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b18a50]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default function BlogDetail({
  blog,
  relatedBlogs,
}: BlogDetailProps) {
  const shareTitle = encodeURIComponent(blog.title);
  const shareUrl = encodeURIComponent(
    `https://www.shalimar.org/blog/${blog.id}`
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f5ee] text-[#382b20]">
      <div className="fixed top-0 left-0 z-20 w-full border-b border-[#e3d8c8]/50 bg-white/40 backdrop-blur-md backdrop-saturate-150 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#817361] transition-all hover:translate-x-[-2px] hover:text-[#a47c43]"
          >
            <ArrowLeft size={16} />
            Back to Journal
          </Link>
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#a47c43]">
            Shalimar Corp
          </span>
        </div>
      </div>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-14 text-center md:px-10 md:pb-16 md:pt-20">
        <span className="inline-block border border-[#d9c9b2] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
          {blog.category}
        </span>

        <h1 className="mx-auto mt-7 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
          {blog.title}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-sm leading-8 text-[#817361] md:text-base">
          {blog.excerpt}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] text-[#958673]">
          <span className="inline-flex items-center gap-2">
            <CalendarDays size={14} />
            {formatDate(blog.publishedAt)}
          </span>

          <span className="inline-flex items-center gap-2">
            <Clock3 size={14} />
            {blog.readingTime} min read
          </span>

          <span className="inline-flex items-center gap-2">
            <Newspaper size={14} />
            By {blog.author}
          </span>
        </div>
      </section>

      {/* COVER */}
      <section className="mx-auto max-w-6xl px-4 md:px-10">
        <ArticleCover blog={blog} />
      </section>

      {/* ARTICLE BODY */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20">

          {/* CONTENT */}
          <article className="mx-auto w-full max-w-3xl">
            <div className="mb-10 border-b border-[#e3d8c8] pb-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
                Article
              </p>

              <p className="mt-4 text-sm leading-7 text-[#817361]">
                {blog.excerpt}
              </p>
            </div>

            <ArticleContent blog={blog} />

            {/* TAGS */}
            {blog.tags.length > 0 && (
              <div className="mt-12 border-t border-[#e3d8c8] pt-8">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
                  Topics
                </p>

                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[#ded3c3] px-3 py-2 text-xs text-[#817361]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* SHARE */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-y border-[#e3d8c8] py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em]">
                Share this article
              </p>

              <div className="flex items-center gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="flex h-10 w-10 items-center justify-center border border-[#ded3c3] text-[#817361] transition hover:border-[#a47c43] hover:text-[#a47c43]"
                >
                  <span className="font-bold text-sm" aria-hidden="true">in</span>
                </a>

                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="flex h-10 w-10 items-center justify-center border border-[#ded3c3] text-[#817361] transition hover:border-[#a47c43] hover:text-[#a47c43]"
                >
                  <span className="font-bold text-sm" aria-hidden="true">f</span>
                </a>

                <a
                  href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="flex h-10 w-10 items-center justify-center border border-[#ded3c3] text-[#817361] transition hover:border-[#a47c43] hover:text-[#a47c43]"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#a47c43] transition hover:text-[#382b20]"
              >
                <ArrowLeft size={15} />
                Explore More Articles
              </Link>
            </div>
          </article>

          {/* SIDEBAR */}
          <aside className="space-y-8">
            <div className="border border-[#e3d8c8] bg-white p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
                About Shalimar
              </p>

              <h3 className="mt-4 font-serif text-2xl">
                Beyond Bricks and Walls
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#817361]">
                Discover the Shalimar journey, our developments and our
                approach to creating spaces that enrich lives.
              </p>

              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a47c43] hover:text-[#382b20]"
              >
                Know More
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="border border-[#e3d8c8] bg-[#f0e9dd] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
                Have a Question?
              </p>

              <h3 className="mt-4 font-serif text-2xl">
                Let&apos;s Connect.
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#817361]">
                Speak with our team about projects, properties or general
                enquiries.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-3 bg-[#382b20] px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#a47c43]"
              >
                Contact Us
                <ArrowRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {relatedBlogs.length > 0 && (
        <section className="border-t border-[#e3d8c8] bg-[#f0e9dd]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a47c43]">
              Continue Exploring
            </p>

            <h2 className="mt-3 font-serif text-3xl md:text-4xl">
              Related Articles
            </h2>

            <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.id}`}
                  className="group border border-[#ded3c3] bg-[#f8f5ee] p-6 transition hover:border-[#b18a50] hover:shadow-[0_10px_30px_rgba(56,43,32,0.06)]"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a47c43]">
                    {item.category}
                  </p>

                  <h3 className="mt-4 font-serif text-xl leading-snug transition group-hover:text-[#a47c43]">
                    {item.title}
                  </h3>

                  <p className="mt-3 line-clamp-2 text-xs leading-6 text-[#817361]">
                    {item.excerpt}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#a47c43]">
                    Read Article
                    <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
