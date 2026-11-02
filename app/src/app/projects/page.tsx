
import type { Metadata } from "next";

import ProjectsDashboard from "@/components/pages/projects-dashboard";
import { getPublishedProjects } from "@/data/projects";

export const instant = false;

export const metadata: Metadata = {
  title: "Our Projects | Shalimar Corp",
  description:
    "Explore Shalimar Corp residential, commercial, township, villa and other property developments.",
};

interface PageProps {
  searchParams: Promise<{
    type?: string;
    status?: string;
    category?: string;
    q?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  return (
    <ProjectsDashboard
      projects={getPublishedProjects()}
      initialType={params.type ?? ""}
      initialStatus={params.status ?? ""}
      initialCategory={params.category ?? ""}
      initialSearch={params.q ?? ""}
    />
  );
}
