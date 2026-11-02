
import Link from "next/link";

import CenteredLogoDivider from "@/components/layouts/home/projects/divider";

import type {
  PolicyBlock,
  PolicyParagraph,
  PolicyRecord,
} from "@/data/policies";
import PolicyActions from "./policy-actions";

interface PolicyPageProps {
  policy: PolicyRecord;
}

// Render selected phrases as bold text without injecting HTML.
function renderParagraph(paragraph: PolicyParagraph) {
  let parts: React.ReactNode[] = [paragraph.text];

  paragraph.emphasis?.forEach((phrase) => {
    parts = parts.flatMap<React.ReactNode>((part, index) => {
      if (typeof part !== "string") return [part];

      const split = part.split(phrase);

      if (split.length === 1) return [part];

      return split.flatMap((text, i) =>
        i < split.length - 1
          ? [
              text,
              <strong
                key={`${phrase}-${index}-${i}`}
                className="font-semibold text-stone-900"
              >
                {phrase}
              </strong>,
            ]
          : [text]
      );
    });
  });

  return parts;
}

function Paragraphs({
  paragraphs,
}: {
  paragraphs: PolicyParagraph[];
}) {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p
          key={index}
          className="text-sm font-light leading-7 text-stone-700 sm:text-base sm:leading-8"
        >
          {renderParagraph(paragraph)}
        </p>
      ))}
    </div>
  );
}

function PolicyContent({ block }: { block: PolicyBlock }) {
  switch (block.type) {
    case "paragraph":
      return <Paragraphs paragraphs={block.content} />;

    case "list": {
      const ListTag = block.style === "number" ? "ol" : "ul";

      return (
        <ListTag
          className={`space-y-2 pl-6 text-sm font-light leading-7 text-stone-700 sm:text-base ${
            block.style === "number"
              ? "list-decimal"
              : "list-disc"
          }`}
        >
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ListTag>
      );
    }

    case "callout":
      return (
        <div
          className={`space-y-4 rounded-2xl border p-5 sm:p-7 ${
            block.variant === "dark"
              ? "border-stone-800 bg-stone-900 text-amber-100"
              : "border-amber-200 bg-amber-50/70 text-stone-700"
          }`}
        >
          {block.title && (
            <h3
              className={`font-serif text-base font-semibold ${
                block.variant === "dark"
                  ? "text-amber-400"
                  : "text-stone-900"
              }`}
            >
              {block.title}
            </h3>
          )}

          <div
            className={
              block.variant === "dark"
                ? "[&_p]:text-amber-100"
                : ""
            }
          >
            <Paragraphs paragraphs={block.paragraphs} />
          </div>

          {block.items && (
            <ul className="list-disc space-y-2 pl-5 text-sm font-light leading-7">
              {block.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {block.note && (
            <p
              className={`border-t pt-4 text-xs leading-6 ${
                block.variant === "dark"
                  ? "border-stone-700 text-amber-200/70"
                  : "border-amber-200 text-stone-500"
              }`}
            >
              {block.note}
            </p>
          )}
        </div>
      );

    case "cards":
      return (
        <div
          className={`grid grid-cols-1 gap-4 ${
            block.columns === 3
              ? "lg:grid-cols-3"
              : block.columns === 2
                ? "md:grid-cols-2"
                : ""
          }`}
        >
          {block.items.map((item, index) => (
            <div
              key={index}
              className="space-y-3 rounded-2xl border border-amber-200/80 bg-amber-50/40 p-5 sm:p-6"
            >
              <h3 className="font-serif text-base font-semibold text-stone-900">
                {item.title}
              </h3>

              <Paragraphs paragraphs={item.paragraphs} />
            </div>
          ))}
        </div>
      );

    case "definitions":
      return (
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {block.items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-amber-100 bg-amber-50/40 p-4"
            >
              <dt className="font-serif text-sm font-semibold text-stone-900">
                “{item.term}”
              </dt>

              <dd className="mt-2 text-sm font-light leading-6 text-stone-700">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "table":
      return (
        <div className="overflow-x-auto rounded-xl border border-amber-200">
          <table className="w-full min-w-[520px] text-left text-xs text-stone-700 sm:text-sm">
            <thead className="border-b border-amber-200 bg-amber-100/70 font-serif font-semibold text-stone-900">
              <tr>
                {block.headers.map((header, index) => (
                  <th key={index} className="px-4 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-amber-100 bg-white/50 font-light">
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "annexure":
      return (
        <div className="space-y-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-serif text-xl font-medium text-stone-900 sm:text-2xl">
              {block.title}
            </h3>

            {block.label && (
              <span className="w-fit rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[10px] font-mono text-amber-800">
                {block.label}
              </span>
            )}
          </div>

          <Paragraphs paragraphs={block.paragraphs} />
        </div>
      );

    default:
      return null;
  }
}

export default function PolicyPage({
  policy,
}: PolicyPageProps) {
  const { company } = policy;

  const telephone = company.telephone.replace(/[^+\d]/g, "");

  return (
    <main className="relative isolate min-h-screen w-full overflow-hidden bg-[#f8f5ee] px-4 pb-16 pt-24 text-stone-900 selection:bg-amber-500 selection:text-white sm:px-8 sm:pb-20 sm:pt-28 lg:px-12 lg:pb-24 lg:pt-32">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-300/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-amber-200/20 blur-[120px]" />
      <div className="relative z-10 mx-auto max-w-5xl">
        <header className="mb-10 space-y-4 pt-4 text-center sm:mb-12">
          <span className="inline-flex rounded-full border border-amber-600/20 bg-amber-600/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-amber-800 sm:text-[10px]">
            {policy.category}
          </span>
          <h1 className="mx-auto max-w-4xl font-serif text-3xl font-medium leading-tight tracking-tight text-stone-900 sm:text-4xl md:text-5xl">
            {policy.title}
          </h1>
          <p className="mx-auto max-w-2xl text-sm font-light leading-7 text-stone-600 sm:text-base sm:leading-8">
            {policy.description}
          </p>
        </header>
        <div className="mx-auto mb-12 max-w-3xl">
          <CenteredLogoDivider />
        </div>
        <article className="space-y-10 rounded-2xl border border-amber-200/70 bg-white/80 p-5 shadow-[0_20px_70px_rgba(75,55,30,0.09)] backdrop-blur-xl sm:space-y-12 sm:rounded-3xl sm:p-9 md:p-12 lg:p-14">
          <section className="space-y-5 rounded-2xl border border-amber-200/80 bg-amber-50/70 p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-2 border-b border-amber-200 pb-4 sm:flex-row sm:items-center">
              <h2 className="font-serif text-lg font-semibold text-stone-900">
                {company.name}
              </h2>
              <span className="font-mono text-[10px] font-medium text-amber-800 sm:text-xs">
                CIN: {company.cin}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-5 text-sm font-light leading-6 text-stone-700 md:grid-cols-2">
              <div>
                <h3 className="mb-1 font-medium text-stone-900">
                  Registered Address:
                </h3>
                <p>{company.registeredAddress}</p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-stone-900">
                  Corporate Office:
                </h3>
                <p>{company.corporateAddress}</p>
              </div>
            </div>
            <div className="flex flex-col flex-wrap gap-3 border-t border-amber-200/70 pt-4 text-xs text-stone-600 sm:flex-row sm:gap-x-6">
              <span>
                Email:{" "}
                <Link
                  href={`mailto:${company.email}`}
                  className="break-all text-amber-800 transition-colors hover:text-amber-600"
                >
                  {company.email}
                </Link>
              </span>
              <span>
                Website:{" "}
                <Link
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-amber-800 transition-colors hover:text-amber-600"
                >
                  {company.website.replace(/^https?:\/\//, "")}
                </Link>
              </span>
              <span>
                Tel:{" "}
                <Link
                  href={`tel:${telephone}`}
                  className="text-amber-800 transition-colors hover:text-amber-600"
                >
                  {company.telephone}
                </Link>
              </span>
            </div>
          </section>
          <div className="no-print my-8 flex justify-end">
            <PolicyActions title={policy.title} />
          </div>
          <div className="space-y-10 sm:space-y-12">
            {policy.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 space-y-5"
              >
                <h2 className="border-b border-amber-200 pb-3 font-serif text-xl font-medium text-stone-900 sm:text-2xl">
                  {section.title}
                </h2>

                <div className="space-y-5">
                  {section.blocks.map((block, index) => (
                    <PolicyContent
                      key={`${section.id}-${index}`}
                      block={block}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
          <footer className="flex flex-col items-center justify-between gap-3 border-t border-amber-200 pt-6 text-center sm:flex-row sm:text-left">
            <span className="text-xs text-stone-500">
              {company.name} {policy.department}
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-800">
              Ref: {policy.reference}
            </span>
          </footer>
        </article>
        <div className="mt-6 flex flex-col items-center justify-between gap-2 px-2 text-[10px] text-stone-500 sm:flex-row">
          <span>Version: {policy.version}</span>

          {policy.updatedAt && (
            <span>Last Updated: {policy.updatedAt}</span>
          )}
        </div>
      </div>
    </main>
  );
}