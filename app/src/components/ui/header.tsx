"use client";

import { siteConfig } from "@/config/site";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo.png"
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-2 left-0 right-0 z-50 flex justify-center px-3 select-none">
      <div className="group relative flex w-full items-center justify-between px-4 py-2 bg-white/[0.01] backdrop-blur-[0.2rem] border border-white/[0.1] rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:py-6 hover:bg-white/95 hover:border-white/40">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-trasnparent via-white/[]0.2rem to-trasnparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <Link href="/" className="flex items-start justify-center text-stone-950 flex-col shrink-0 z-10 group-hover:h-8 h-auto focus:outline-none">
          <Image src={Logo} alt="logo" height={35} className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"/>
          <span className="uppercase font-serif tracking-[0.15rem] group-hover:h-auto h-0 opacity-0 text-center group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">{siteConfig.shortname}</span>
        </Link>
        <nav className="lg:flex hidden items-center gap-8 overflow-hidden group-hover:opacity-100 group-hover:max-h-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-10">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                relative py-2 text-[10px] font-medium
                uppercase tracking-[0.18em]
                text-[#65533d]
                transition-colors duration-300
                hover:text-[#a47c43]
                after:absolute after:bottom-0 after:left-0
                after:h-px after:w-0
                after:bg-[#b18a50]
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="/contact"
            className="
              group relative overflow-hidden rounded-full
              border border-[#b18a50]/60
              bg-gradient-to-br from-[#c6a36e] to-[#a47c43]
              px-6 py-3 text-[9px] font-semibold
              uppercase tracking-[0.2em] text-white
              shadow-[0_4px_15px_rgba(164,124,67,0.22)]
              transition-all duration-300
              hover:shadow-[0_7px_22px_rgba(164,124,67,0.35)]
              hover:border-[#d4af37]
            "
          >
            <span className="relative z-10">Inquire Now</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Link>
        </nav>
        <button
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="
            relative z-30 flex h-10 w-10 shrink-0
            flex-col items-center justify-center gap-[5px]
            rounded-xl border border-white/40
            bg-white/10 backdrop-blur-md
            transition-all duration-300
            hover:bg-white/20
            lg:hidden
          "
        >
          <span
            className={`h-[1.5px] w-5 bg-white transition-all duration-300 ${
              menuOpen ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 bg-white transition-all duration-300 ${
              menuOpen ? "scale-x-0 opacity-0" : ""
            }`}
          />
          <span
            className={`h-[1.5px] w-5 bg-white transition-all duration-300 ${
              menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>
      <div
        id="mobile-navigation"
        className={`
          absolute left-0 right-0 top-[calc(100%+9px)]
          overflow-hidden rounded-2xl
          border border-white/40
          bg-[#f8f5ee]/90
          shadow-[0_15px_45px_rgba(0,0,0,0.18)]
          backdrop-blur-2xl
          transition-all duration-300 ease-out
          lg:hidden
          ${
            menuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-3 opacity-0 pointer-events-none"
          }
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/30 to-[#e8d9bf]/30" />
        <nav className="relative z-10 flex flex-col p-3">
          {siteConfig.mainNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${index * 40}ms` : "0ms" }}
              className="
                flex items-center justify-between
                border-b border-[#b18a50]/15
                px-4 py-4
                text-[10px] font-medium uppercase
                tracking-[0.18em] text-[#65533d]
                transition-all duration-300
                hover:bg-white/60 hover:text-[#a47c43]
              "
            >
              {item.title}
              <span className="text-[#b18a50]">↗</span>
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="
              mt-3 flex items-center justify-center
              rounded-xl border border-[#b18a50]/50
              bg-gradient-to-r from-[#c6a36e] to-[#a47c43]
              px-5 py-4
              text-[10px] font-semibold uppercase
              tracking-[0.2em] text-white
              shadow-[0_5px_15px_rgba(164,124,67,0.2)]
              transition-all duration-300
              hover:shadow-[0_8px_22px_rgba(164,124,67,0.35)]
            "
          >
            Inquire Now
            <span className="ml-3">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}