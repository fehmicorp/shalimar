
"use client";

import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";

import HeroBackgroundSection from "./background";
import { useHeroStore } from "@/store/hero";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSnapping = useRef<boolean>(false);

  const {
    isDismissed,
    canScroll,
    setIsDismissed,
    setCanScroll,
    dismissHero,
  } = useHeroStore();

  // Restore hero visibility state
  useEffect(() => {
    const hidden = sessionStorage.getItem("hero_hidden");

    if (hidden === "true") {
      setIsDismissed(true);
      setCanScroll(true);
    }
  }, [setIsDismissed, setCanScroll]);

  // Lock scroll during introductory cinematic window
  useEffect(() => {
    if (isDismissed) return;

    const preventScroll = (e: Event) => {
      if (!canScroll) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, {
      passive: false,
    });

    window.addEventListener("touchmove", preventScroll, {
      passive: false,
    });

    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setCanScroll(true);
      document.body.style.overflow = "unset";
    }, 7000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      document.body.style.overflow = "unset";
    };
  }, [isDismissed, canScroll, setCanScroll]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.28],
    [1, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.28],
    [1, 0.94]
  );

  const contentY = useTransform(
    scrollYProgress,
    [0, 0.28],
    ["0%", "-6%"]
  );

  // Cinematic hero dismissal
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!canScroll || isDismissed || isSnapping.current) return;

    if (latest >= 0.25) {
      isSnapping.current = true;
      dismissHero();

      const targetElement = document.getElementById("main-content");

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }

      setTimeout(() => {
        setIsDismissed(true);
        isSnapping.current = false;
      }, 600);
    } else if (latest > 0.02 && latest < 0.25) {
      isSnapping.current = true;

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        isSnapping.current = false;
      }, 600);
    }
  });

  if (isDismissed) return null;

  return (
    <div
      ref={containerRef}
      className="relative h-[110vh] w-full bg-[#07090e] sm:h-[120vh]"
    >
      <div className="sticky top-0 h-[100svh] min-h-[600px] w-full overflow-hidden select-none">
        <motion.div
          style={{ opacity, scale }}
          className="relative flex h-full w-full items-center justify-center will-change-transform"
        >
          <HeroBackgroundSection />

          {/* Background overlays */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/70" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80" />

          {/* Hero content */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 20 }}
            animate={
              canScroll
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}
            className="relative z-10 flex h-full w-full flex-col items-center justify-center px-5 pb-20 pt-16 text-center text-white sm:px-8 sm:pb-24 sm:pt-20"
          >
            {/* Category label */}
            <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-2 rounded-full border border-white/15 bg-white/[0.05] px-3.5 py-2.5 text-[9px] font-medium uppercase tracking-[0.18em] text-white/80 shadow-2xl backdrop-blur-md sm:gap-3 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.35em]">
              <span>Residences</span>
              <span className="h-1 w-1 shrink-0 animate-pulse rounded-full bg-amber-400 sm:h-1.5 sm:w-1.5" />

              <span>Commercial</span>
              <span className="h-1 w-1 shrink-0 animate-pulse rounded-full bg-amber-400 sm:h-1.5 sm:w-1.5" />

              <span>Landscape</span>
            </div>

            {/* Main heading */}
            <h1 className="mt-7 max-w-5xl font-serif text-[clamp(2.15rem,8vw,3.25rem)] font-light leading-[1.12] tracking-[0.06em] text-white/95 sm:mt-8 sm:text-6xl sm:leading-[1.08] sm:tracking-[0.16em] lg:text-6xl">
              <span className="block whitespace-nowrap">
                Shaping the Future
              </span>

              <span className="mt-1 block font-semibold italic tracking-[0.02em] text-white sm:mt-2">
                of Modern Living
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-[550px] px-1 text-[13px] font-light leading-[1.8] tracking-wide text-slate-300 sm:mt-6 sm:px-0 sm:text-base sm:leading-relaxed lg:text-lg">
              Discover iconic luxury developments and world-class
              architectural landmarks crafted with precision,
              elegance, and timeless vision.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex w-full max-w-[340px] flex-col items-stretch justify-center gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-5">
              <Link
                href="/projects"
                className="group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-full bg-white px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 transition-all duration-300 hover:bg-slate-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] focus:outline-none sm:px-8 sm:py-4 sm:text-xs sm:tracking-[0.2em]"
              >
                <span className="relative z-10">
                  Explore Projects
                </span>
              </Link>

              <Link
                href="/contact"
                className="group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-full border border-white/25 bg-white/[0.05] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] focus:outline-none sm:px-8 sm:py-4 sm:text-xs sm:tracking-[0.2em]"
              >
                <span className="relative z-10">
                  Get in Touch
                </span>
              </Link>
            </div>

            {/* Scroll indicator */}
            <motion.div
              style={{ opacity }}
              initial={{ opacity: 0 }}
              animate={canScroll ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                duration: 0.9,
                ease: "easeIn",
              }}
              className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white/60 sm:bottom-10 sm:gap-3"
            >
              <span className="whitespace-nowrap text-[9px] font-light uppercase tracking-[0.25em] sm:text-[10px] sm:tracking-[0.3em]">
                Scroll to Discover
              </span>

              <div className="flex h-8 w-5 justify-center rounded-full border border-white/30 p-1 backdrop-blur-sm sm:h-9">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}