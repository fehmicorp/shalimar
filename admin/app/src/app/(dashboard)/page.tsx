import { redirect } from "next/navigation";

import DashboardOverview from "@/components/dashboard/overview";
import { getAdminSession } from "@/lib/server/auth";

// This is an authenticated, request-specific dashboard.
export const instant = false;

export default async function DashboardPage() {
  const session = await getAdminSession();

  if (!session || session.role === "root") {
    redirect("/login");
  }

  return <DashboardOverview username={session.username} />;
}