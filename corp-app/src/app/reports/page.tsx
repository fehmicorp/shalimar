
import type { Metadata } from "next";

import ReportsDashboard from "@/components/pages/reports-dashboard";
import { getPublishedReports } from "@/data/reports";

export const metadata: Metadata = {
  title: "Reports & Insights",
  description:
    "Explore annual returns, CSR reports and corporate publications from Shalimar Corp Limited.",
  openGraph: {
    title: "Reports & Insights",
    description:
      "Access corporate reports, annual returns and CSR publications.",
    type: "website",
  },
};

export default function ReportsPage() {
  const reports = getPublishedReports();

  return <ReportsDashboard reports={reports} />;
}
