
export type ReportStatus = "draft" | "published" | "archived";

export type ReportCategory =
  | "annual-return"
  | "csr"
  | "financial"
  | "compliance"
  | "other";

export interface ReportRecord {
  id: string;
  title: string;
  shortTitle: string;
  category: ReportCategory;
  categoryLabel: string;
  financialYear?: string;
  description: string;
  insights?: string[];
  pdfUrl: string;
  publishedAt?: string;
  status: ReportStatus;
  featured?: boolean;
}

export const reportsData: Record<string, ReportRecord> = {
  "rp001": {
    id: "mgt-7-scl-24-25",
    title: "MGT-7-SCL-24-25",
    shortTitle: "MGT-7 Annual Return",
    category: "annual-return",
    categoryLabel: "Annual Return",
    financialYear: "2024–25",
    description:
      "Annual return report of Shalimar Corp Limited for the financial year 2024–25.",
    insights: [],
    pdfUrl: "/reports/MGT-7-SCL-24-25.pdf",
    status: "published",
    featured: true,
  },

  "rp002": {
    id: "scl-csr-report-2017-18",
    title: "SCL_CSR Report_2017-18",
    shortTitle: "CSR Report",
    category: "csr",
    categoryLabel: "Corporate Social Responsibility",
    financialYear: "2017–18",
    description:
      "Corporate Social Responsibility report of Shalimar Corp Limited for the financial year 2017–18.",
    insights: [],
    pdfUrl: "/reports/SCL_CSR Report_2017-18.pdf",
    status: "published",
  },

  "rp003": {
    id: "scl-csr-report-2018-19",
    title: "SCL_CSR Report_2018-19",
    shortTitle: "CSR Report",
    category: "csr",
    categoryLabel: "Corporate Social Responsibility",
    financialYear: "2018–19",
    description:
      "Corporate Social Responsibility report of Shalimar Corp Limited for the financial year 2018–19.",
    insights: [],
    pdfUrl: "/reports/SCL_CSR Report_2018-19.pdf",
    status: "published",
  },

  "rp004": {
    id: "scl-csr-report-2019-20",
    title: "SCL_CSR Report_2019-20",
    shortTitle: "CSR Report",
    category: "csr",
    categoryLabel: "Corporate Social Responsibility",
    financialYear: "2019–20",
    description:
      "Corporate Social Responsibility report of Shalimar Corp Limited for the financial year 2019–20.",
    insights: [],
    pdfUrl: "/reports/SCL_CSR Report_2019-20.pdf",
    status: "published",
  },

  "rp005": {
    id: "scl-csr-report-2020-21",
    title: "SCL_CSR Report_2020-21",
    shortTitle: "CSR Report",
    category: "csr",
    categoryLabel: "Corporate Social Responsibility",
    financialYear: "2020–21",
    description:
      "Corporate Social Responsibility report of Shalimar Corp Limited for the financial year 2020–21.",
    insights: [],
    pdfUrl: "/reports/SCL_CSR Report_2020-21.pdf",
    status: "published",
  },

  "rp006": {
    id: "scl-csr-report-2021-22",
    title: "SCL_CSR Report_2021-22",
    shortTitle: "CSR Report",
    category: "csr",
    categoryLabel: "Corporate Social Responsibility",
    financialYear: "2021–22",
    description:
      "Corporate Social Responsibility report of Shalimar Corp Limited for the financial year 2021–22.",
    insights: [],
    pdfUrl: "/reports/SCL_CSR Report_2021-22.pdf",
    status: "published",
  },

  "rp007": {
    id: "scl-csr-report-2022-23",
    title: "SCL_CSR Report_2022-23",
    shortTitle: "CSR Report",
    category: "csr",
    categoryLabel: "Corporate Social Responsibility",
    financialYear: "2022–23",
    description:
      "Corporate Social Responsibility report of Shalimar Corp Limited for the financial year 2022–23.",
    insights: [],
    pdfUrl: "/reports/SCL_CSR Report_2022-23.pdf",
    status: "published",
  },

  "rp008": {
    id: "scl-csr-report-2023-24",
    title: "SCL_CSR Report_2023-24",
    shortTitle: "CSR Report",
    category: "csr",
    categoryLabel: "Corporate Social Responsibility",
    financialYear: "2023–24",
    description:
      "Corporate Social Responsibility report of Shalimar Corp Limited for the financial year 2023–24.",
    insights: [],
    pdfUrl: "/reports/SCL_CSR Report_2023-24.pdf",
    status: "published",
    featured: true,
  },
};

export function getReportById(id: string): ReportRecord | undefined {
  return reportsData[id.toLowerCase()];
}

export function getPublishedReports(): ReportRecord[] {
  return Object.values(reportsData)
    .filter((report) => report.status === "published")
    .sort((a, b) =>
      (b.financialYear ?? "").localeCompare(a.financialYear ?? "")
    );
}

export function getReportsByCategory(
  category: ReportCategory
): ReportRecord[] {
  return getPublishedReports().filter(
    (report) => report.category === category
  );
}

export function getFeaturedReports(): ReportRecord[] {
  return getPublishedReports().filter((report) => report.featured);
}
