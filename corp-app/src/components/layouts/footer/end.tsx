"use client";

import { siteConfig } from "@/config/site";

export default function FooterEnd() {
  return (
    <div id="announcement" className="relative py-4 px-12 border-t border-amber-500/20 bg-stone-950/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-2 sm:text-left">
        <p className="text-xs font-medium tracking-wide text-white/90 sm:text-sm">
          {`© 2026 ${siteConfig.company.legalName}`}. All rights reserved.
        </p>
        <div className="text-xs font-medium tracking-wide text-stone-300">
          Created with ❤️ by{" "}
          <a 
            href="https://fehmicorp.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors"
          >
            Fehmi Corporation
          </a>
        </div>
        <p className="text-xs font-medium tracking-wide text-[#e5ad55] sm:text-sm">
          CIN No. - {siteConfig.company.cin}
        </p>        
      </div>
    </div>
  );
}