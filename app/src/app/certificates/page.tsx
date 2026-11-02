import type { Metadata } from "next";
import CertificatesDashboard from "@/components/pages/certificates-dashboard";
import { getPublishedCertificates } from "@/data/certificates";

export const metadata: Metadata = {
  title: "Certificates & Accreditations",
  description:
    "Explore corporate certificates, registrations and accreditations of Shalimar Corp Limited.",
};

export default function CertificatesPage() {
  const certificates = getPublishedCertificates();

  return <CertificatesDashboard certificates={certificates} />;
}