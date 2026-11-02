
export default function CounterHeaderInsight() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
      <div className="mb-4 flex items-center gap-4">
        <span className="h-px w-10 bg-[#b18a50]" />
        <span className="text-[10px] font-medium uppercase
          tracking-[0.35em] text-[#a17d43]">
          Established in 1988
        </span>
        <span className="h-px w-10 bg-[#b18a50]" />
      </div>
      <h2 className="font-serif text-5xl font-normal
        leading-[1.05] tracking-[-0.04em]
        text-[#382b20] sm:text-6xl lg:text-7xl">
        Pioneers
        <span className="block mt-2 font-light italic text-[2.5rem] text-[#a9864f]">
          of Innovative Design
        </span>
      </h2>
      <p className="mt-5 text-[10px] font-medium uppercase
        tracking-[0.32em] text-[#85745d] sm:text-xs">
        & Luxury Living
      </p>
      <div className="my-6 flex items-center gap-3">
        <span className="h-px w-12 bg-[#c5a675]/60" />
        <span className="text-sm text-[#b18a50]">✧</span>
        <span className="h-px w-12 bg-[#c5a675]/60" />
      </div>
      <p className="max-w-4xl text-[0.5rem] font-light
        leading-8 tracking-wide text-[#756858] sm:text-base">
        The Shalimar Corp Limited, popularly known as premium
        home builders, is a diversified business house
        headquartered in Lucknow, Uttar Pradesh, India.
        The Group&apos;s footprints span real estate,
        property management, highway infrastructure,
        civil construction and glass processing.

        An ever-growing portfolio of businesses and
        architectural landmarks continues to establish
        Shalimar as a leading business conglomerate.
      </p>
    </div>
  );
}
