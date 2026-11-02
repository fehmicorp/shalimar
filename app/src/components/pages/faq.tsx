"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ArrowLeft,
  ArrowUpRight,
  MessageCircle,
} from "lucide-react";

import type { FAQRecord, FAQItem } from "@/data/faqs";

interface FAQPageProps {
  faq: FAQRecord;
}

export default function FAQPage({ faq }: FAQPageProps) {
  const [activeItems, setActiveItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setActiveItems((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#f8f5ee]">
      <section className="relative overflow-hidden bg-[#382b20] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#c6a16c]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <p className="text-xs uppercase tracking-[0.3em] text-[#c6a16c]">
            Shalimar Corp · Help & Information
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">
            {faq.title}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-white/65 md:text-base">
            {faq.description}
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:py-20 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit border border-[#e8e0d3] bg-white p-6 lg:sticky lg:top-28">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a47c43]">
            On this page
          </p>
          <nav className="mt-5 space-y-1">
            {faq.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block border-l-2 border-transparent px-3 py-2.5 text-sm text-[#817361] transition-colors hover:border-[#b18a50] hover:text-[#382b20]"
              >
                {section.title}
              </a>
            ))}
          </nav>
          <div className="mt-7 border-t border-[#eee8df] pt-6">
            <p className="text-sm font-medium text-[#382b20]">
              Need more assistance?
            </p>
            <p className="mt-2 text-xs leading-6 text-[#817361]">
              Get in touch with our team for further information.
            </p>
            <a
              href="mailto:shalimar@shalimar.org"
              className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#a47c43] hover:text-[#382b20]"
            >
              Contact Us
              <ArrowUpRight size={14} />
            </a>
          </div>
        </aside>
        <div className="min-w-0">
          {faq.intro?.length ? (
            <div className="mb-12 space-y-4">
              {faq.intro.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-8 text-[#817361] md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
          <div className="space-y-14">
            {faq.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28"
              >
                <div className="mb-6 border-b border-[#ded3c2] pb-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#a47c43]">
                    {faq.shortTitle}
                  </p>

                  <h2 className="mt-2 font-serif text-2xl text-[#382b20] md:text-3xl">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="mt-3 text-sm leading-7 text-[#817361]">
                      {section.description}
                    </p>
                  )}
                </div>
                {section.content?.length ? (
                  <div className="mb-6 space-y-4">
                    {section.content.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-sm leading-8 text-[#817361]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : null}
                {section.points?.length ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {section.points.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 border border-[#e8e0d3] bg-white p-4"
                      >
                        <span className="mt-0.5 text-xs font-semibold text-[#b18a50]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-6 text-[#655644]">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {section.items?.length ? (
                  <div className="divide-y divide-[#e8e0d3] border-y border-[#e8e0d3]">
                    {section.items.map((item, index) => (
                      <FAQAccordion
                        key={`${section.id}-${index}`}
                        item={item}
                        number={index + 1}
                        open={activeItems.includes(
                          `${section.id}-${index}`
                        )}
                        onToggle={() =>
                          toggleItem(`${section.id}-${index}`)
                        }
                      />
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>
          {faq.disclaimer && (
            <div className="mt-14 border-l-2 border-[#b18a50] bg-[#f0eade] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8c6938]">
                Disclaimer
              </p>
              <p className="mt-3 text-sm leading-7 text-[#817361]">
                {faq.disclaimer}
              </p>
            </div>
          )}
        </div>
      </section>
      <section className="bg-[#382b20] px-6 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c6a16c]">
              We&apos;re here to help
            </p>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl">
              Have more questions?
            </h2>
            <p className="mt-3 text-sm text-white/60">
              Connect with the Shalimar Corp team for assistance.
            </p>
          </div>
          <a
            href="tel:+915224030444"
            className="inline-flex items-center gap-3 border border-[#b18a50] px-7 py-3.5 text-sm text-white transition-colors hover:bg-[#b18a50]"
          >
            <MessageCircle size={17} />
            Contact Our Team
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

function FAQAccordion({
  item,
  number,
  open,
  onToggle,
}: {
  item: FAQItem;
  number: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="py-1">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
      >
        <span className="flex items-start gap-4">
          <span className="pt-0.5 text-xs font-semibold text-[#b18a50]">
            {String(number).padStart(2, "0")}
          </span>

          <span className="text-sm font-medium leading-7 text-[#382b20] md:text-base">
            {item.question}
          </span>
        </span>

        <ChevronDown
          size={19}
          className={`shrink-0 text-[#a47c43] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="pb-6 pl-9">
          {item.answer?.length ? (
            <div className="space-y-3">
              {item.answer.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm leading-8 text-[#817361]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-[#817361]">
              For further information about this question, please contact
              the Shalimar Corp team.
            </p>
          )}

          {item.points?.length ? (
            <ul className="mt-4 space-y-2">
              {item.points.map((point, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-7 text-[#817361]"
                >
                  <span className="text-[#b18a50]">•</span>
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
}