
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  LogOut,
  PanelLeftClose,
  X,
} from "lucide-react";

import {
  getSidebarConfig,
  type SidebarItem,
} from "@/config/sidebar";
import { useSidebarStore } from "@/store/sidebar";

interface SidebarProps {
  username: string;
  role: string;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({
  username,
  role,
  mobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const { isCollapsed: collapsed, setIsCollapsed } = useSidebarStore();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    "Workspace",
    "Management",
    "System",
  ]);

  const groups = getSidebarConfig(role);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleGroup = (title: string) => {
    setExpandedGroups((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title]
    );
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/auth/exit", {
        method: "POST",
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error("Unable to sign out.");
      }

      window.location.assign("/login");
    } catch (error) {
      console.error("[Dashboard] Logout error:", error);
    }
  };

  const renderItem = (item: SidebarItem) => {
    const active = isActive(item.href);
    const Icon = item.icon;

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onMobileClose}
        title={collapsed ? item.title : undefined}
        className={`group flex h-11 items-center gap-3 rounded-sm px-3 text-[12px] transition-all duration-200 ${
          active
            ? "bg-[#eee5d6] font-semibold text-[#8b673b]"
            : "text-[#756b5e] hover:bg-[#f4efe7] hover:text-[#382b20]"
        } ${collapsed ? "justify-center px-2" : ""}`}
      >
        <Icon
          size={17}
          strokeWidth={active ? 2 : 1.7}
          className={
            active
              ? "text-[#a47c43]"
              : "text-[#9b8e7c] group-hover:text-[#a47c43]"
          }
        />

        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.title}</span>

            {item.badge && (
              <span className="bg-[#b18a50] px-1.5 py-0.5 text-[9px] text-white">
                {item.badge}
              </span>
            )}

            {active && (
              <span className="h-1.5 w-1.5 rounded-full bg-[#b18a50]" />
            )}
          </>
        )}
      </Link>
    );
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onMobileClose}
          className="fixed inset-0 z-40 bg-[#211a13]/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[#e9dfd0] bg-[#fbf9f5] transition-all duration-300 lg:sticky lg:top-0 lg:z-20 lg:h-screen lg:translate-x-0 ${
          collapsed ? "w-[76px]" : "w-[260px]"
        } ${
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div
          className={`flex h-[82px] shrink-0 items-center border-b border-[#e9dfd0] ${
            collapsed ? "justify-center px-3" : "justify-between px-6"
          }`}
        >
          <Link
            href="/"
            onClick={onMobileClose}
            className="flex min-w-0 items-center gap-3"
          >
            <div onClick={() => setIsCollapsed(!collapsed)}
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center bg-[#382b20] text-white transition-transform hover:scale-105 active:scale-95"
              role="button"
              tabIndex={0}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsCollapsed(!collapsed);
                }
              }}>
              <span className={`font-serif select-none transition-all ${collapsed ? "text-xl" : "text-2xl"}`}>
                S
              </span>
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="font-serif text-[17px] tracking-wide text-[#382b20]">
                  SHALIMAR
                </p>
                <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.23em] text-[#a47c43]">
                  Management Console
                </p>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden cursor-pointer text-[#9b8e7c] transition hover:text-[#382b20] lg:block"
          >
            {collapsed ? (
              <></>
            ) : (
              <PanelLeftClose size={17} />
            )}
          </button>

          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close sidebar"
            className="text-[#9b8e7c] lg:hidden"
          >
            <X size={19} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {groups.map((group) => {
            const expanded = expandedGroups.includes(group.title);
            return (
              <div key={group.title} className="mb-6">
                {!collapsed && (
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.title)}
                    className="mb-2 flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left text-[9px] font-semibold uppercase tracking-[0.2em] text-[#aa9c88]"
                  >
                    {group.title}

                    <ChevronDown
                      size={13}
                      className={`transition-transform ${
                        expanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
                {(collapsed || expanded) && (
                  <div className="space-y-1">
                    {group.items.map(renderItem)}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="shrink-0 border-t border-[#e9dfd0] p-4">
          <button
            type="button"
            onClick={handleLogout}
            className={`flex h-11 w-full cursor-pointer items-center gap-3 rounded-sm px-3 text-[11px] font-medium text-[#8b7762] transition hover:bg-[#f3e9df] hover:text-[#8f3e32] ${
              collapsed ? "justify-center px-2" : ""
            }`}
          >
            <LogOut size={17} />
            {!collapsed && <span>Sign Out</span>}
          </button>

          {!collapsed && (
            <p className="mt-4 text-center text-[9px] tracking-wide text-[#b1a491]">
              © {new Date().getFullYear()} Shalimar
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
