
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Settings,
  FileText,
  Activity,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Building2,
} from "lucide-react";

import type { AdminSession } from "@/lib/server/auth";

interface DashboardShellProps {
  children: React.ReactNode;
  session: AdminSession;
}

const navigation = [
  {
    label: "Overview",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Activity Logs",
    href: "/activity",
    icon: Activity,
  },
  {
    label: "Security",
    href: "/security",
    icon: ShieldCheck,
    rootOnly: true,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function DashboardShell({
  children,
  session,
}: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const visibleNavigation = navigation.filter(
    (item) => !item.rootOnly || session.role === "root"
  );

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch("/auth/exit", {
        method: "POST",
        credentials: "same-origin",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to logout.");
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("[Dashboard] Logout failed:", error);
      setLoggingOut(false);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="flex min-h-screen bg-[#f7f5f0] text-[#382b20]">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-[#e8dfd1] bg-[#fffefa] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[82px] items-center justify-between border-b border-[#e8dfd1] px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="flex h-10 w-10 items-center justify-center bg-[#382b20] text-white">
              <Building2 size={20} />
            </div>

            <div>
              <p className="font-serif text-xl tracking-wide text-[#382b20]">
                SHALIMAR
              </p>
              <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#a47c43]">
                Management Console
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="text-[#817361] lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 pb-3 pt-8">
          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#a99b88]">
            Workspace
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3">
          {visibleNavigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center justify-between px-4 py-3 text-sm transition ${
                  active
                    ? "bg-[#382b20] text-white"
                    : "text-[#766957] hover:bg-[#f3eee5] hover:text-[#382b20]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={17} />
                  {item.label}
                </span>

                {active && <ChevronRight size={15} />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#e8dfd1] p-4">
          <div className="mb-4 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#efe5d4] text-sm font-semibold uppercase text-[#8b683c]">
              {session.username.slice(0, 1)}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#382b20]">
                {session.username}
              </p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#a47c43]">
                {session.role}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 px-3 py-3 text-left text-xs font-semibold uppercase tracking-[0.14em] text-[#8a594c] transition hover:bg-red-50 disabled:opacity-50"
          >
            <LogOut size={16} />
            {loggingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-[#e8dfd1] bg-[#fffefa]/95 px-5 backdrop-blur-md sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              className="text-[#6f5c47] lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#a47c43]">
                Shalimar Corporation
              </p>
              <p className="text-sm font-medium text-[#382b20]">
                Administration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-semibold text-[#382b20]">
                {session.username}
              </p>
              <p className="text-[10px] capitalize text-[#a47c43]">
                {session.role} account
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#dfd5c5] bg-[#f8f3e9] text-sm font-semibold text-[#8b683c]">
              {session.username.slice(0, 1)}
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-8">
          {children}
        </main>

        <footer className="border-t border-[#e8dfd1] bg-[#fffefa] px-5 py-4 sm:px-8">
          <p className="text-[10px] tracking-wide text-[#9b8d7a]">
            © {new Date().getFullYear()} Shalimar Corporation. Administrative
            Portal.
          </p>
        </footer>
      </div>
    </div>
  );
}
