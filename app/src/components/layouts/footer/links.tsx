
import Link from "next/link";
import { FooterData, FooterItem } from "@/config/footer";



export default function FooterLinks() {
  const groups = (FooterData as FooterItem[]).reduce<Record<string, FooterItem[]>>(
    (acc, item) => {
      if (!acc[item.group]) {
        acc[item.group] = [];
      }

      acc[item.group].push(item);
      return acc;
    },
    {}
  );

  return (
    <div className="relative border-b border-[#a47c43]/30 py-12 sm:py-14 lg:py-12 lg:px-12 md:px-8 px-6">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#b18a50]/50 to-transparent" />
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-10 lg:gap-y-14">
        {Object.entries(groups).map(([group, items]) => {
          const heading = items.find((item) => item.type === "heading");
          const links = items.filter((item) => item.type === "link");
          return (
            <div key={group} className="group min-w-0">
              {heading && (
                <div className="mb-3">
                  <h3 className="font-serif text-sm font-semibold tracking-[0.08em] text-[#d4ad70] sm:text-base">
                    {heading.title}
                  </h3>
                  <div className="mt-2 h-px w-8 bg-[#a47c43] transition-all duration-500 group-hover:w-14" />
                </div>
              )}
              <ul className="space-y-1">
                {links.map((item, index) => (
                  <li key={`${group}-${item.title}-${index}`}>
                    <Link
                      href={item.href || "#"}
                      {...(item.newtab || item.newtab
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className=" group/link inline-flex max-w-full items-start gap-1 text-[11px] font-light leading-5 tracking-[0.025em] text-[#e8dfd0]/65 transition-all duration-300 hover:translate-x-1 hover:text-[#d4ad70] sm:text-xs sm:leading-6"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#a47c43]/60 transition-all duration-300 group-hover/link:bg-[#d4ad70]" />
                      <span className="break-words">
                        {item.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
