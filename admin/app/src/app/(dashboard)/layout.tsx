
import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { InitializeServer } from "@/lib/server/initialize";
import { getAdminSession } from "@/lib/server/auth";

import DashboardShell from "@/components/dashboard/shell";

export const instant = false;

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await InitializeServer();

  const session = await getAdminSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardShell session={session}>
      {children}
    </DashboardShell>
  );
}
