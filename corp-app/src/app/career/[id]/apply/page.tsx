import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getJobById } from "@/data/careers";
import CareerApplicationForm from "@/components/career/career-application-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const job = getJobById(id);

  if (!job || job.status !== "published") {
    return {
      title: "Position Not Found | Shalimar Corp",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Apply for ${job.title}`,
    description: `Submit your application for the ${job.title} position at Shalimar Corp.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ApplyPage({ params }: PageProps) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job || job.status !== "published") {
    notFound();
  }

  return <CareerApplicationForm job={job} />;
}