
import CounterHeaderInsight from "./counter/header";
import CounterHighlights from "./counter/highlights";
import CounterRoundedTable from "./counter/roundtable";
import CenteredLogoDivider from "./projects/divider";

export default function CounterSection() {
  return (
    <section
      id="counter"
      className="relative isolate min-h-screen w-full overflow-hidden pt-12 lg:pt-16"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-[#d4b47a]/15 backdrop-blur-[0.1px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#c7a36a]/15 backdrop-blur-[0.1px]" />
      <div className="relative z-10 max-w-[100vw]">
        <CounterHeaderInsight />
        <div className="grid grid-cols-1 items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-6 lg:px-16 px-4 md:px-8">
          <div className="relative z-10 lg:col-span-6">
            <CounterHighlights />
          </div>
          <div className="relative flex min-w-0 items-center
            justify-center lg:col-span-6">
            <CounterRoundedTable />
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between pt-5 lg:px-16 px-4 md:px-8">
          <span className="text-[9px] uppercase tracking-[0.3em]
            text-[#8d7b61]">
            Shalimar Corp Limited
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em]
            text-[#8d7b61]">
            Building Legacies Since 1988
          </span>
        </div>
      </div>
      <CenteredLogoDivider/>
    </section>
  );
}