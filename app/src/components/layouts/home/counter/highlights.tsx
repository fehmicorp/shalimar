
"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "25M+",
    label: "Total Development",
    detail: "Square feet delivered",
    number: "01",
  },
  {
    value: "70+",
    label: "Landmark Projects",
    detail: "Across diverse sectors",
    number: "02",
  },
  {
    value: "8K+",
    label: "Happy Families",
    detail: "Homes and communities",
    number: "03",
  },
  {
    value: "8+",
    label: "Upcoming Projects",
    detail: "Shaping tomorrow",
    number: "04",
  },
];

export default function CounterHighlights() {
  return (
    <div className="w-full max-w-xl h-auto">
      <div className="mb-8">
        <span className="text-[10px] uppercase
          tracking-[0.3em] text-[#a17d43]">
          The Shalimar Legacy
        </span>
        <h3 className="mt-3 font-serif text-3xl
          font-normal text-[#382b20] sm:text-4xl">
          A legacy measured
          <span className="italic text-[#a9864f]">
            {" "}in excellence.
          </span>
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.number}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.65,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative overflow-hidden
              border border-[#bda477]/25 bg-white/45
              p-6 backdrop-blur-sm transition-all
              duration-500 hover:-translate-y-1
              hover:border-[#b18a50]/60
              hover:bg-white/80"
          >
            <div className="flex items-center
              justify-between">
              <span className="text-[9px] tracking-[0.25em]
                text-[#a58b62]">
                {stat.number}
              </span>
              <span className="text-lg text-[#c0a16b]
                transition-transform duration-500
                group-hover:rotate-45">
                ✧
              </span>
            </div>
            <h4 className="mt-5 font-serif text-4xl
              font-normal tracking-tight text-[#403126]
              sm:text-5xl">
              {stat.value}
            </h4>
            <p className="mt-3 text-[11px] font-semibold
              uppercase tracking-[0.16em] text-[#766047]">
              {stat.label}
            </p>
            <p className="mt-1 text-xs font-light
              text-[#9b8a74]">
              {stat.detail}
            </p>
            <div className="absolute bottom-0 left-0
              h-[2px] w-0 bg-[#b18a50]
              transition-all duration-700
              group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
