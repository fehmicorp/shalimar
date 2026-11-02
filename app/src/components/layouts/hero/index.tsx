"use client";

import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import HeroBackgroundSection from "./background";
import { useHeroStore } from "@/store/hero";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSnapping = useRef<boolean>(false);
  const { isDismissed, canScroll, setIsDismissed, setCanScroll, dismissHero } = useHeroStore();

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

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
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

  const opacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.28], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 0.28], ["0%", "-6%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!canScroll || isDismissed || isSnapping.current) return;
    
    if (latest >= 0.25) {
      isSnapping.current = true;
      dismissHero(); // Triggers Zustand store to show header and hide hero persistently
      
      const targetElement = document.getElementById("main-content");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }

      setTimeout(() => {
        setIsDismissed(true);
        isSnapping.current = false;
      }, 600);
    } 
    else if (latest > 0.02 && latest < 0.25) {
      isSnapping.current = true;
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => {
        isSnapping.current = false;
      }, 600);
    }
  });

  if (isDismissed) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative h-[120vh] w-full bg-[#07090e]">
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        <motion.div
          style={{ opacity, scale }}
          className="relative flex h-full w-full items-center justify-center will-change-transform"
        >
          <HeroBackgroundSection />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/70 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black/80 pointer-events-none" />

          <motion.div 
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 20 }}
            animate={canScroll ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative z-10 max-w-5xl px-6 text-center text-white flex flex-col items-center justify-center h-full"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-2 text-xs font-medium uppercase tracking-[0.4em] text-white/80 backdrop-blur-md shadow-2xl">
              Residences
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Commercial
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Landscape
            </div>

            <h1 className="mt-8 text-3xl font-light tracking-[0.3em] sm:text-7xl lg:text-6xl font-serif text-white/95 leading-[1.08]">
              Shaping the Future<br/>
              <span className="font-semibold italic text-white">of Modern Living</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base font-light text-slate-300 sm:text-lg tracking-wide leading-relaxed">
              Discover iconic luxury developments and world-class architectural landmarks crafted with precision, elegance, and timeless vision.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/projects"
                className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 transition-all duration-300 hover:bg-slate-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] focus:outline-none"
              >
                <span className="relative z-10">Explore Projects</span>
              </Link>
              <Link
                href="/contact"
                className="group relative overflow-hidden rounded-full border border-white/20 bg-white/[0.05] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] focus:outline-none"
              >
                <span className="relative z-10">Get in Touch</span>
              </Link>
            </div>

            <motion.div
              style={{ opacity }}
              initial={{ opacity: 0 }}
              animate={canScroll ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeIn" }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/60 pointer-events-none"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-light">Scroll to Discover</span>
              <div className="h-9 w-5 rounded-full border border-white/30 p-1 flex justify-center backdrop-blur-sm">
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
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