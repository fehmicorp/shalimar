
import Link from "next/link";
import {
  MapPin,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";

import { aboutData } from "@/data/about";

export default function AboutUsPage() {
  const {
    hero,
    introduction,
    highlights,
    businessPortfolio,
    vision,
    mission,
    people,
    journey,
    footer,
  } = aboutData;

  return (
    <main className="overflow-hidden bg-[#f8f5ee] text-[#382b20]">
      <section className="relative flex min-h-[560px] items-center overflow-hidden bg-[#382b20] md:min-h-[680px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#382b20] via-[#382b20]/95 to-[#382b20]/55" />
        <div className="absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full border border-[#b18a50]/20" />
        <div className="absolute right-[-5%] top-[-10%] h-[470px] w-[470px] rounded-full border border-[#b18a50]/20" />
        <div className="absolute right-[5%] top-[5%] h-[340px] w-[340px] rounded-full border border-[#b18a50]/20" />
        <div className="relative mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-12 bg-[#b18a50]" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c6a36e]">
                {hero.eyebrow}
              </span>
            </div>
            <h1 className="font-serif text-5xl leading-[1.12] text-[#f8f5ee] md:text-7xl">
              {hero.title}
              <span className="block italic text-[#c6a36e]">
                {hero.highlight}
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-sm leading-8 text-[#e3d9c9] md:text-base">
              {hero.description}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href={hero.buttonLink}
                className="inline-flex items-center gap-3 bg-[#b18a50] px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#98703b]"
              >
                {hero.buttonText}
                <ArrowRight size={16} />
              </Link>
              <span className="text-xs tracking-[0.15em] text-[#c6a36e]">
                {hero.established}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden text-right md:block">
          <p className="font-serif text-5xl text-[#c6a36e]/50">
            {hero.year}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#e3d9c9]">
            {hero.tagline}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
              <span className="h-px w-8 bg-[#b18a50]" />
              {introduction.eyebrow}
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
              {introduction.title}
              <span className="block italic text-[#a47c43]">
                {introduction.highlight}
              </span>
            </h2>
          </div>
          <div className="space-y-6 text-sm leading-8 text-[#817361] md:text-base">
            {introduction.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-[#b18a50]/20 bg-[#f0e9dd]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-[#cdbb9f]/50 px-6 md:grid-cols-4 md:divide-y-0 md:px-10">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="px-5 py-10 md:px-8 md:py-14"
            >
              <p className="font-serif text-4xl text-[#a47c43] md:text-5xl">
                {item.value}
              </p>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#382b20]">
                {item.label}
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#817361]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
            {businessPortfolio.eyebrow}
          </p>
          <h2 className="mt-5 font-serif text-4xl md:text-5xl">
            {businessPortfolio.title}
            <span className="block italic text-[#a47c43]">
              {businessPortfolio.highlight}
            </span>
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#817361]">
            {businessPortfolio.description}
          </p>
        </div>
        <div className="grid gap-px border border-[#e4dacb] bg-[#e4dacb] sm:grid-cols-2 lg:grid-cols-3">
          {businessPortfolio.sectors.map((sector, index) => {
            const Icon = sector.icon;
            return (
              <article
                key={sector.title}
                className="group bg-[#f8f5ee] p-8 transition hover:bg-[#f1eadd] md:p-10"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={30}
                    strokeWidth={1.2}
                    className="text-[#a47c43]"
                  />
                  <span className="font-serif text-2xl text-[#b18a50]/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-8 font-serif text-2xl">
                  {sector.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#817361]">
                  {sector.description}
                </p>
                <div className="mt-7 h-px w-10 bg-[#b18a50] transition-all group-hover:w-20" />
              </article>
            );
          })}
        </div>
      </section>
      <section className="relative overflow-hidden bg-[#382b20]">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-[#b18a50]/20" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:px-10 md:py-28">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#c6a36e]">
              <span className="h-px w-8 bg-[#b18a50]" />
              {vision.eyebrow}
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[#f8f5ee] md:text-5xl">
              {vision.title}
              <span className="block italic text-[#c6a36e]">
                {vision.highlight}
              </span>
            </h2>
          </div>
          <div className="space-y-6 text-sm leading-8 text-[#e3d9c9] md:text-base">
            {vision.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-20">
          <div className="order-2 md:order-1">
            <div className="border border-[#dfd3c1] bg-[#f0e9dd] p-8 md:p-12">
              <Target
                size={42}
                strokeWidth={1.1}
                className="text-[#a47c43]"
              />
              <p className="mt-8 font-serif text-3xl leading-snug text-[#382b20] md:text-4xl">
                “{mission.statement}”
              </p>
              <div className="mt-8 h-px w-16 bg-[#b18a50]" />
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[#817361]">
                {mission.statementLabel}
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
              <span className="h-px w-8 bg-[#b18a50]" />
              {mission.eyebrow}
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
              {mission.title}
              <span className="block italic text-[#a47c43]">
                {mission.highlight}
              </span>
            </h2>
            <div className="mt-7 space-y-5 text-sm leading-8 text-[#817361]">
              {mission.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-y border-[#b18a50]/20 bg-[#f0e9dd]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[0.7fr_1.3fr] md:items-center md:px-10 md:py-24">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-[#b18a50]/50">
              <Users
                size={34}
                strokeWidth={1.2}
                className="text-[#a47c43]"
              />
            </div>
            <div>
              <p className="font-serif text-5xl text-[#a47c43]">
                {people.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#817361]">
                {people.label}
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">
              {people.title}
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#817361] md:text-base">
              {people.description}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 text-center md:px-10 md:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
          {journey.eyebrow}
        </p>
        <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
          {journey.title}
          <span className="block italic text-[#a47c43]">
            {journey.highlight}
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-3xl text-sm leading-8 text-[#817361] md:text-base">
          {journey.description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {journey.actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={
                action.variant === "primary"
                  ? "inline-flex items-center gap-3 bg-[#382b20] px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#a47c43]"
                  : "inline-flex items-center gap-3 border border-[#b18a50] px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#382b20] transition hover:bg-[#b18a50] hover:text-white"
              }
            >
              {action.label}
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[#382b20]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-3">
            <MapPin
              size={18}
              className="text-[#c6a36e]"
            />
            <p className="text-xs uppercase tracking-[0.16em] text-[#e3d9c9]">
              {footer.location}
            </p>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c6a36e]">
            {footer.brand} · {footer.tagline}
          </p>
        </div>
      </section>
    </main>
  );
}
