
import Image from "next/image";
import Link from "next/link";
import CenteredLogoDivider from "./projects/divider";

export default function BrandingSection() {
  return (
    <section
      id="branding"
      className="relative isolate w-full overflow-hidden bg-[#f8f5ee] pt-8 sm:pt-12 lg:pt-16"
    >
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#d4b47a]/20 backdrop-blur-[0.01px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#c7a36a]/20 backdrop-blur-[0.01px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8),transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-[1600px]">
        <div className="relative flex min-h-[440px] items-center justify-center sm:min-h-[520px] lg:min-h-[694px]">
          <div className="absolute left-0 top-1/2 z-0 w-[clamp(76px,16vw,240px)] -translate-y-1/2 aspect-[240/694]">
            <Image
              src="/branding1.png"
              alt="Shalimar luxury property architecture"
              fill
              priority
              sizes="(max-width: 640px) 76px, (max-width: 1200px) 16vw, 240px"
              className="object-contain object-center"
            />
          </div>
          <div className="absolute right-0 top-1/2 z-0 w-[clamp(76px,16vw,240px)] -translate-y-1/2 aspect-[240/694]">
            <Image
              src="/branding2.png"
              alt="Shalimar premium residential development"
              fill
              priority
              sizes="(max-width: 640px) 76px, (max-width: 1200px) 16vw, 240px"
              className="object-contain object-center"
            />
          </div>
          <div className="relative z-10 mx-auto w-[calc(100%-32px)] max-w-[75%] sm:w-[calc(100%-90px)] lg:w-[78%]">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/80 bg-[#fffdf8]/65 px-5 py-9 backdrop-blur-[24px] sm:rounded-[2rem] sm:px-10 sm:py-12 lg:rounded-[2.5rem] lg:px-16 lg:py-16">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/75 via-white/25 to-[#d4b47a]/15 backdrop-blur-[0.1px]" />
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/40 backdrop-blur-[0.1px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[#d4b47a]/10 backdrop-blur-[0.1px]" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="relative z-10 mx-auto max-w-2xl text-center">
                <div className="mb-5 flex items-center justify-center gap-2 sm:mb-6 sm:gap-3">
                  <span className="h-px w-6 bg-[#b18a50] sm:w-10" />
                  <span className="text-[8px] font-medium uppercase tracking-[0.3em] text-[#a47c43] sm:text-[10px] sm:tracking-[0.4em]">
                    Shalimar Corporation
                  </span>
                  <span className="h-px w-6 bg-[#b18a50] sm:w-10" />
                </div>
                <h2 className="font-serif text-2xl leading-[1.2] tracking-wide text-[#382b20] sm:text-4xl lg:text-5xl">
                  Luxury Property
                  <span className="mt-2 block italic text-[#a47c43]">
                    Builders in Lucknow
                  </span>
                </h2>
                <div className="mx-auto my-5 h-px w-14 bg-gradient-to-r from-transparent via-[#b18a50] to-transparent sm:my-7 sm:w-16" />
                <p className="text-xs font-light leading-6 tracking-wide text-[#716250] sm:text-sm sm:leading-8 lg:text-base">
                  At Shalimar, we craft unparalleled projects designed by
                  world-renowned architects. Our commitment to excellence
                  and innovative designs redefine luxury living.
                </p>
                <p className="mt-3 text-xs font-light leading-6 tracking-wide text-[#716250] sm:mt-4 sm:text-sm sm:leading-8 lg:text-base">
                  Experience a harmonious blend of opulence and architectural
                  brilliance, setting new benchmarks in Lucknow&apos;s real
                  estate realm. Discover your perfect home, meticulously
                  designed and crafted for your ideal lifestyle.
                </p>
                <div className="mt-6 sm:mt-8">
                  <Link
                    href="https://www.shalimarcorp.com/residential-ongoing-projects.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 border border-[#a47c43] bg-[#a47c43]/95 px-5 py-3 text-[9px] font-medium uppercase tracking-[0.2em] text-white shadow-[0_8px_25px_rgba(164,124,67,0.2)] transition-all duration-500 hover:-translate-y-1 hover:bg-[#382b20] sm:px-8 sm:py-4 sm:text-[10px]"
                  >
                    Ongoing Projects
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </Link>
                </div>
                <div className="mt-7 flex items-center justify-center gap-2 sm:mt-9 sm:gap-3">
                  <span className="h-px w-5 bg-[#cbb58e] sm:w-8" />
                  <span className="font-serif text-[9px] italic tracking-widest text-[#a47c43] sm:text-xs">
                    Building Legacies Since 1988
                  </span>
                  <span className="h-px w-5 bg-[#cbb58e] sm:w-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CenteredLogoDivider />
    </section>
  );
}
