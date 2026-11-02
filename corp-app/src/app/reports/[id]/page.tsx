
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ReportViewer from "@/components/pages/report-viewer";
import {
  getReportById,
  getPublishedReports,
} from "@/data/reports";

export const instant = false;

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return getPublishedReports().map((report) => ({
    id: report.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const report = getReportById(id);

  if (!report || report.status !== "published") {
    return {
      title: "Report Not Found",
    };
  }

  return {
    title: `Report: ${report.title}`,
    description: report.description,
    openGraph: {
      title: report.title,
      description: report.description,
      type: "article",
    },
  };
}

export default async function ReportDetailPage({ params }: PageProps) {
  const { id } = await params;
  const report = getReportById(id);

  if (!report || report.status !== "published") {
    notFound();
  }

  return <ReportViewer report={report} />;
}
