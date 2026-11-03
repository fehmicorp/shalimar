"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "@/components/dashboard/sidebar";
import Navbar from "@/components/dashboard/navbar";
import type { AdminSession } from "@/lib/server/auth";

interface DashboardShellProps {
  children: ReactNode;
  session: AdminSession;
}

export default function DashboardShell({
  children,
  session,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f5ee] lg:flex">
      <Sidebar
        username={session.username}
        role={session.role}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="min-w-0 flex-1">
        <Navbar
          username={session.username}
          role={session.role}
          onMenuClick={() => setMobileOpen(true)}
        />

        <main className="min-h-[calc(100vh-82px)] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}