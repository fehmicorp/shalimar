export interface CertificateRecord {
  id: string;
  title: string;
  certificateNumber: string;
  category: string;
  issuedTo: string;
  issuedBy: string;
  issueDate: string;
  validUntil?: string;
  description?: string;
  pdfUrl: string;
  status: "draft" | "published" | "archived";
}

export const certificateData: Record<string, CertificateRecord> = {
  "cert-gptw": {
    id: "cert-gptw",
    title: "Great Place to Work Certification",
    certificateNumber: "GPTW/SCL/2026-2027",
    category: "Recognition & Workplace Culture",
    issuedTo: "Shalimar Corp Limited",
    issuedBy: "Great Place to Work® Institute India",
    issueDate: "2026-02-01",
    validUntil: "2027-01-31",
    description: "Certified as a Great Place to Work in recognition of outstanding workplace culture, employee trust, and high-performance management.",
    pdfUrl: "/great-place-to-work-certificate.pdf",
    status: "published",
  },
};

export function getCertificateById(
  id: string
): CertificateRecord | undefined {
  return certificateData[id];
}

export function getPublishedCertificates(): CertificateRecord[] {
  return Object.values(certificateData).filter(
    (certificate) => certificate.status === "published"
  );
}

export function getCertificateCategories() {
  return [
    ...new Set(
      getPublishedCertificates().map((certificate) => certificate.category)
    ),
  ];
}