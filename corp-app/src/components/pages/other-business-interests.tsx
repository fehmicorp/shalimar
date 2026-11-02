
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Globe2,
  Layers3,
  ShieldCheck,
  Truck,
} from "lucide-react";

const businessValues = [
  "Customer Satisfaction",
  "Timely Delivery",
  "Transparency in Operations",
];

export default function OtherBusinessInterests() {
  return (
    <main className="min-h-screen bg-[#f8f5ee] text-[#382b20]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#b18a50]/20">
        <div className="absolute -right-24 -top-28 h-[420px] w-[420px] rounded-full border border-[#b18a50]/10" />
        <div className="absolute -right-12 -top-16 h-[320px] w-[320px] rounded-full border border-[#b18a50]/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#b18a50]" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a47c43]">
              Our Business Portfolio
            </span>
          </div>

          <h1 className="max-w-3xl font-serif text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Other Business
            <span className="block italic text-[#a47c43]">
              Interests
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-sm leading-8 text-[#817361] sm:text-base">
            Beyond our core business, Shalimar Corp has interests
            across international trade, glass processing and
            allied industries.
          </p>
        </div>
      </section>

      {/* IMPORT & EXPORT */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <div className="mb-7 flex h-14 w-14 items-center justify-center border border-[#b18a50]/30 bg-white/60 text-[#a47c43]">
              <Globe2 size={25} strokeWidth={1.4} />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
              International Trade
            </span>

            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              Import
              <span className="block italic text-[#a47c43]">
                & Export
              </span>
            </h2>

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#b18a50]" />
              <span className="text-xs text-[#817361]">
                Established in 2010
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm leading-8 text-[#716252] sm:text-base">
              An important arm of the company, the Import & Export
              division of Shalimar Corp Ltd is engaged in imports
              and exports worldwide. Founded in 2010, this vertical
              employs professional managers with vast experience
              in areas such as procurement, supply chain, and
              project and contract management.
            </p>

            <p className="mt-8 font-serif text-2xl leading-snug">
              Our commitment is built around three core values.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {businessValues.map((value, index) => (
                <div
                  key={value}
                  className="border border-[#b18a50]/20 bg-white/60 p-5"
                >
                  <span className="text-[10px] tracking-[0.2em] text-[#b18a50]">
                    0{index + 1}
                  </span>
                  <p className="mt-4 font-serif text-lg leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ALLIED WORKS */}
      <section className="border-y border-[#b18a50]/20 bg-[#f1ece2]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <div className="mb-7 flex h-14 w-14 items-center justify-center border border-[#b18a50]/30 bg-white/60 text-[#a47c43]">
                <Layers3 size={25} strokeWidth={1.4} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
                Manufacturing & Distribution
              </span>

              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
                Allied
                <span className="block italic text-[#a47c43]">
                  Works
                </span>
              </h2>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-10 bg-[#b18a50]" />
                <span className="text-xs text-[#817361]">
                  Flat Glass Processing
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm leading-8 text-[#716252] sm:text-base">
                Banaras Glasses (P) Ltd. and Structural Insulations
                & Glazing Co. (P) Ltd. (SIG) are highly successful
                in the processing and distribution of flat glass.
                With an installed capacity of 75,000 sq. mt. of
                tempered glass per year, we are well-established
                at Chinhat Industrial Area of Lucknow.
              </p>

              <div className="my-9 grid gap-4 sm:grid-cols-2">
                <div className="border border-[#b18a50]/25 bg-white/60 p-6">
                  <p className="font-serif text-4xl text-[#a47c43]">
                    75,000
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#817361]">
                    Sq. Mt. Annual Installed Capacity
                  </p>
                </div>

                <div className="border border-[#b18a50]/25 bg-white/60 p-6">
                  <p className="font-serif text-2xl">
                    Lucknow
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-[#817361]">
                    Chinhat Industrial Area
                  </p>
                </div>
              </div>

              <p className="text-sm leading-8 text-[#716252] sm:text-base">
                Glass produced by SIG is widely used in the
                structural glazing of modern buildings, besides
                various ancillary applications in sectors dealing
                with automobiles, solar panels, furniture and more.
              </p>

              <div className="mt-8 border-l-2 border-[#b18a50] pl-5">
                <p className="font-serif text-xl leading-relaxed">
                  Supporting modern infrastructure through
                  specialised glass processing and distribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-7 border border-[#b18a50]/25 bg-white/50 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-start gap-4">
            <ShieldCheck
              size={25}
              className="mt-1 shrink-0 text-[#a47c43]"
              strokeWidth={1.4}
            />
            <div>
              <h3 className="font-serif text-2xl">
                Diverse Businesses. Shared Values.
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-[#817361]">
                Our business interests reflect a commitment to
                quality, operational transparency and long-term
                business relationships.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-3 border border-[#a47c43] bg-[#a47c43] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#382b20] hover:border-[#382b20]"
          >
            Contact Us
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
