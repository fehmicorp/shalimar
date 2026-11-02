import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CareerDetail from "@/components/career/career-detail";
import { careerData, getJobById } from "@/data/careers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return Object.values(careerData)
    .filter((job) => job.status === "published")
    .map((job) => ({ id: job.id }));
}

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
    title: `${job.title} | Careers at Shalimar Corp`,
    description: job.shortDescription,
    alternates: {
      canonical: `/career/${job.id}`,
    },
    openGraph: {
      title: `${job.title} | Shalimar Corp`,
      description: job.shortDescription,
      type: "website",
    },
  };
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const job = getJobById(id);

  if (!job || job.status !== "published") {
    notFound();
  }

  return <CareerDetail job={job} />;
}