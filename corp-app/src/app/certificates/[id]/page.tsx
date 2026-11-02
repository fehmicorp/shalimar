import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CertificateViewer from "@/components/pages/certificate-viewer";
import {
  certificateData,
  getCertificateById,
} from "@/data/certificates";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const instant = false;

export function generateStaticParams() {
  return Object.values(certificateData)
    .filter((certificate) => certificate.status === "published")
    .map((certificate) => ({ id: certificate.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const certificate = getCertificateById(id);

  if (!certificate || certificate.status !== "published") {
    return {
      title: "Certificate Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${certificate.title}`,
    description:
      certificate.description || certificate.title,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function CertificatePage({
  params,
}: PageProps) {
  const { id } = await params;
  const certificate = getCertificateById(id);

  if (!certificate || certificate.status !== "published") {
    notFound();
  }

  return <CertificateViewer certificate={certificate} />;
}