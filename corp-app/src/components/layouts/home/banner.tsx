
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import banner from "@/assets/club-one-main-banner.webp";

export default function BannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background parallax
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 130]
  );

  // Foreground content parallax
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -55]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [1, 1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="banner"
      className="
        relative isolate flex max-h-[780px] w-full
        items-center overflow-hidden
        bg-[#24130f] text-white
        sm:min-h-[850px]
        lg:min-h-screen
        select-none
      "
    >
      <Image
        src={banner}
        alt="Shalimar Club One luxury residential project"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#1c0b08]/70 via-transparent to-[#2a1009]/25" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_65%_35%,transparent_10%,rgba(25,8,5,0.28)_100%)]" />
      <motion.div
        style={{
          y: contentY,
          opacity: contentOpacity,
        }}
        className="
          relative z-10 mx-auto w-full max-w-[1400px]
          px-5 py-32
          sm:px-10 sm:py-36
          lg:px-16 lg:py-40
        "
      >
        <div className="max-w-[650px]">
          <div
            className="
              group relative overflow-hidden
              rounded-2xl border border-white/20
              bg-white/[0.07]
              p-5 shadow-[0_20px_80px_rgba(0,0,0,0.22)]
              backdrop-blur-[14px] backdrop-saturate-150
              sm:rounded-3xl sm:p-8
              lg:p-10
            "
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.14] via-transparent to-[#d7a45b]/[0.08] sm:rounded-3xl" />
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#e7a34d]/10 blur-[120px]" />
            <div className="relative z-10">
              <div className="mb-9 sm:mb-12">
                <p className="text-[10px] font-medium tracking-[0.12em] text-white/90 sm:text-xs sm:tracking-[0.16em]">
                  Promoter RERA No. - UPRERAPRM10813
                </p>
                <Link
                  href="https://www.up-rera.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[10px] tracking-[0.12em] text-white/65 transition-colors hover:text-[#e8bc72] sm:text-xs"
                >
                  www.up-rera.in
                </Link>
              </div>
              <div className="mb-7 sm:mb-9">
                <span className="
                  inline-flex items-center gap-2
                  border border-[#e4bd7c]/70
                  bg-white/[0.06]
                  px-4 py-2
                  text-[9px] font-medium uppercase
                  tracking-[0.2em] text-white
                  backdrop-blur-lg
                  sm:px-5 sm:text-[10px]
                ">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e9b75f] shadow-[0_0_10px_#e9b75f]" />
                  Newly Launched
                </span>
              </div>
              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="
                  max-w-[600px] font-serif
                  text-[32px] font-normal uppercase
                  leading-[1.12] tracking-[0.035em]
                  text-white
                  sm:text-2xl
                  lg:text-5xl
                "
              >
                Shalimar
                <br />
                Club One
              </motion.h1>
              <p className="
                mt-5 font-serif italic
                text-xl tracking-wide text-white/90
                sm:mt-6 sm:text-xl
                lg:text-[25px]
              ">
                A Wish to fulfilled
              </p>
              <div className="mt-9 sm:mt-12">
                <Link
                  href="/contact"
                  className="
                    group/button relative inline-flex
                    min-w-[175px] items-center justify-center
                    overflow-hidden
                    border border-white/70
                    bg-white/[0.94]
                    px-8 py-4
                    text-[10px] font-semibold
                    uppercase tracking-[0.18em]
                    text-[#a47c43]
                    shadow-[0_8px_30px_rgba(0,0,0,0.18)]
                    backdrop-blur-xl
                    transition-all duration-500
                    hover:border-[#e6bd78]
                    hover:bg-[#c49a53]
                    hover:text-white
                    sm:min-w-[195px] sm:py-3
                  "
                >
                  <span className="relative z-10">
                    Know More
                  </span>

                  <span className="
                    absolute inset-0 -translate-x-full
                    bg-gradient-to-r from-transparent
                    via-white/40 to-transparent
                    transition-transform duration-700
                    group-hover/button:translate-x-full
                  " />

                  <span className="relative z-10 ml-3 transition-transform duration-300 group-hover/button:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-7 flex items-center gap-3 pl-2">
            <span className="h-px w-10 bg-[#d4ad70]" />
            <span className="text-[8px] uppercase tracking-[0.3em] text-white/65 sm:text-[9px]">
              A New Expression of Luxury
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
