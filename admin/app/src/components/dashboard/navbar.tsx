
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronRight,
  Menu,
  Search,
} from "lucide-react";

import { getNavbarConfig } from "@/config/navbar";

interface NavbarProps {
  username: string;
  role: string;
  onMenuClick?: () => void;
}

export default function Navbar({
  username,
  role,
  onMenuClick,
}: NavbarProps) {
  const pathname = usePathname();

  const config = getNavbarConfig(pathname, role);
  const PageIcon = config.icon;

  return (
    <header className="sticky top-0 z-30 border-b border-[#e9dfd0] bg-[#fbf9f5]/95 backdrop-blur-xl">
      <div className="flex min-h-[82px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation"
            className="flex h-9 w-9 shrink-0 items-center justify-center text-[#786b5b] transition hover:bg-[#eee5d6] lg:hidden"
          >
            <Menu size={19} />
          </button>

          <div className="min-w-0">
            {/* Breadcrumbs */}
            <div className="mb-1 hidden items-center gap-2 sm:flex">
              {config.breadcrumbs.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className="flex items-center gap-2"
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-[9px] uppercase tracking-[0.14em] text-[#a09280] transition hover:text-[#a47c43]"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-[9px] uppercase tracking-[0.14em] text-[#a09280]">
                      {item.label}
                    </span>
                  )}

                  {index < config.breadcrumbs.length - 1 && (
                    <ChevronRight
                      size={11}
                      className="text-[#c4b7a4]"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Page heading */}
            <div className="flex items-center gap-2">
              <PageIcon
                size={17}
                strokeWidth={1.7}
                className="hidden text-[#a47c43] sm:block"
              />

              <h1 className="truncate font-serif text-xl font-normal text-[#382b20] sm:text-2xl">
                {config.title}
              </h1>
            </div>

            <p className="mt-1 hidden truncate text-[11px] text-[#958875] md:block">
              {config.description}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            type="button"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center text-[#8b7d6a] transition hover:bg-[#eee5d6] hover:text-[#382b20]"
          >
            <Search size={18} strokeWidth={1.7} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center text-[#8b7d6a] transition hover:bg-[#eee5d6] hover:text-[#382b20]"
          >
            <Bell size={18} strokeWidth={1.7} />
            <span className="absolute right-[7px] top-[6px] h-1.5 w-1.5 rounded-full bg-[#b18a50]" />
          </button>

          <div className="hidden h-8 w-px bg-[#e9dfd0] sm:block" />

          {/* Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden text-right sm:block">
              <p className="max-w-[130px] truncate text-[11px] font-semibold text-[#382b20]">
                {username}
              </p>
              <p className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-[#a47c43]">
                {role}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e4d6c2] bg-[#eee5d6] font-serif text-sm text-[#8b673b]">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
