import type { Metadata } from "next";
import { notFound } from "next/navigation";

import PolicyPage from "@/components/pages/policy-page";
import {
  getPolicyById,
  PolicyData,
} from "@/data/policies";

// Allow blocking route rendering instead of Instant Navigation.
export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return Object.keys(PolicyData)
    .filter((id) => PolicyData[id].status === "published")
    .map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const policy = getPolicyById(id);

  if (!policy || policy.status !== "published") {
    return {
      title: "Policy Not Found | Shalimar Corp",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: policy.metaTitle,
    description: policy.metaDescription,
    alternates: {
      canonical: `/policy/${policy.id}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const policy = getPolicyById(id);

  if (!policy || policy.status !== "published") {
    notFound();
  }

  return <PolicyPage policy={policy} />;
}