
import { notFound } from "next/navigation";
import {
  getPublishedProjects,
  getPublishedPromoters,
} from "@/data/rera";
import RERADashboard from "@/components/pages/rera-dashboard";

export const instant = false;

interface PageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return [
    { tag: "projects" },
    { tag: "promoters" },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { tag } = await params;

  if (tag === "projects") {
    return {
      title: "RERA Registered Projects | Shalimar Corp",
      description:
        "View RERA registration details of Shalimar Corp projects.",
    };
  }

  if (tag === "promoters") {
    return {
      title: "RERA Registered Promoters | Shalimar Corp",
      description:
        "View promoter registration details and company information.",
    };
  }

  return { title: "RERA | Shalimar Corp" };
}

export default async function RERAPage({ params }: PageProps) {
  const { tag } = await params;

  if (tag === "projects") {
    return (
      <RERADashboard
        type="projects"
        projects={getPublishedProjects()}
      />
    );
  }

  if (tag === "promoters") {
    return (
      <RERADashboard
        type="promoters"
        promoters={getPublishedPromoters()}
      />
    );
  }

  notFound();
}
