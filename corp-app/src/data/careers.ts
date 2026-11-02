export type JobApplicationPortal =
  | "LinkedIn"
  | "Naukri"
  | "Indeed"
  | "Company Website"
  | "Other";

export interface JobApplicationLink {
  portal: JobApplicationPortal;
  url: string;
}

export interface JobRecord {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  workplace: "On-site" | "Hybrid" | "Remote";
  experience: string;
  qualification: string;
  salary?: string;
  openings: number;
  category: string;
  shortDescription: string;
  description: string[];
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits?: string[];
  postedAt: string;
  closingDate?: string;
  featured?: boolean;
  status: "draft" | "published" | "closed";
  applicationLinks: JobApplicationLink[];
}

/**
 * Job ID format:
 * JD + YY + 3-digit sequence
 *
 * Example: JD26001
 */

export const careerData: Record<string, JobRecord> = {
  JD26001: {
    id: "JD26001",
    title: "Senior Executive – IT & ERP",
    department: "Information Technology",
    location: "Lucknow, Uttar Pradesh",
    employmentType: "Full-time",
    workplace: "On-site",
    experience: "3–6 Years",
    qualification:
      "Bachelor's degree in IT, Computer Science or a related field",
    salary: "As per company standards",
    openings: 1,
    category: "Information Technology",
    shortDescription:
      "Manage enterprise IT infrastructure, ERP applications, IT operations and technology support across business locations.",
    description: [
      "We are looking for an experienced IT professional to support and manage enterprise IT infrastructure, ERP applications and day-to-day technology operations.",
      "The candidate will work with internal teams and external vendors to maintain reliable IT services, enforce IT policies and support business technology initiatives.",
    ],
    responsibilities: [
      "Manage IT infrastructure, systems, endpoints and enterprise applications.",
      "Support ERP applications and coordinate with functional teams.",
      "Maintain IT asset inventory, lifecycle records and documentation.",
      "Monitor network connectivity, servers, backups and endpoint security.",
      "Coordinate with vendors for procurement, implementation and support.",
      "Maintain IT SOPs, compliance records and audit documentation.",
      "Provide technical support and ensure timely resolution of incidents.",
    ],
    requirements: [
      "3–6 years of experience in IT operations or enterprise IT support.",
      "Knowledge of Windows, networking, servers and endpoint management.",
      "Experience with ERP applications and business software.",
      "Understanding of IT asset management, security and documentation.",
      "Strong communication and coordination skills.",
    ],
    skills: [
      "IT Infrastructure",
      "ERP",
      "Networking",
      "IT Asset Management",
      "Information Security",
      "Vendor Management",
    ],
    benefits: [
      "Professional development opportunities",
      "Collaborative work environment",
      "Exposure to enterprise technology operations",
    ],
    postedAt: "2026-10-15",
    closingDate: "2026-11-30",
    featured: true,
    status: "published",
    applicationLinks: [
      {
        portal: "LinkedIn",
        url: "https://www.linkedin.com/jobs/",
      },
      {
        portal: "Naukri",
        url: "https://www.naukri.com/",
      },
      {
        portal: "Indeed",
        url: "https://in.indeed.com/",
      },
    ],
  },

  JD26002: {
    id: "JD26002",
    title: "Assistant Manager – Finance",
    department: "Finance & Accounts",
    location: "Lucknow, Uttar Pradesh",
    employmentType: "Full-time",
    workplace: "On-site",
    experience: "4–7 Years",
    qualification: "B.Com / M.Com / MBA Finance or equivalent",
    salary: "As per company standards",
    openings: 1,
    category: "Finance",
    shortDescription:
      "Support financial reporting, accounting operations, reconciliations and statutory compliance.",
    description: [
      "We are seeking a finance professional to support financial operations, reporting and accounting activities.",
      "The role involves coordinating with internal departments and ensuring accurate financial records and timely reporting.",
    ],
    responsibilities: [
      "Manage day-to-day accounting and financial operations.",
      "Prepare financial reports and account reconciliations.",
      "Coordinate with auditors and consultants.",
      "Support statutory compliance and documentation.",
      "Monitor expenses and assist with financial planning.",
    ],
    requirements: [
      "4–7 years of relevant finance and accounting experience.",
      "Strong knowledge of accounting principles.",
      "Experience with accounting or ERP software.",
      "Good analytical and reporting skills.",
    ],
    skills: [
      "Financial Reporting",
      "Accounting",
      "Reconciliation",
      "ERP",
      "Statutory Compliance",
    ],
    postedAt: "2026-10-18",
    featured: false,
    status: "published",
    applicationLinks: [
      {
        portal: "LinkedIn",
        url: "https://www.linkedin.com/jobs/",
      },
      {
        portal: "Naukri",
        url: "https://www.naukri.com/",
      },
    ],
  },

  JD26003: {
    id: "JD26003",
    title: "Sales Manager – Real Estate",
    department: "Sales & Marketing",
    location: "Lucknow, Uttar Pradesh",
    employmentType: "Full-time",
    workplace: "On-site",
    experience: "5–8 Years",
    qualification: "Graduate in any discipline; MBA preferred",
    salary: "As per company standards",
    openings: 2,
    category: "Sales & Marketing",
    shortDescription:
      "Lead property sales activities, manage client relationships and drive sales performance.",
    description: [
      "We are looking for a results-driven sales professional to lead real estate sales activities and customer engagement.",
      "The successful candidate will manage prospective buyers, coordinate site visits and contribute to the achievement of sales targets.",
    ],
    responsibilities: [
      "Develop and execute sales plans for assigned projects.",
      "Manage leads, customer enquiries and follow-ups.",
      "Coordinate property visits and customer presentations.",
      "Build and maintain client and channel partner relationships.",
      "Track sales performance and prepare management reports.",
    ],
    requirements: [
      "5–8 years of experience in real estate sales.",
      "Strong negotiation and customer relationship skills.",
      "Knowledge of the local real estate market.",
      "Ability to manage sales targets and teams.",
    ],
    skills: [
      "Real Estate Sales",
      "Lead Management",
      "Customer Relationship Management",
      "Negotiation",
      "Team Leadership",
    ],
    postedAt: "2026-10-20",
    featured: true,
    status: "published",
    applicationLinks: [
      {
        portal: "LinkedIn",
        url: "https://www.linkedin.com/jobs/",
      },
      {
        portal: "Naukri",
        url: "https://www.naukri.com/",
      },
      {
        portal: "Indeed",
        url: "https://in.indeed.com/",
      },
    ],
  },

  JD26004: {
    id: "JD26004",
    title: "Frontend Developer",
    department: "Digital & Technology",
    location: "Lucknow, Uttar Pradesh",
    employmentType: "Full-time",
    workplace: "Hybrid",
    experience: "2–4 Years",
    qualification:
      "B.Tech / BCA / MCA or equivalent practical experience",
    salary: "As per company standards",
    openings: 1,
    category: "Information Technology",
    shortDescription:
      "Build and maintain responsive web interfaces for business and customer-facing digital platforms.",
    description: [
      "We are looking for a frontend developer with experience building responsive, accessible and performant web applications.",
      "The role involves working with design and backend teams to deliver reliable digital experiences.",
    ],
    responsibilities: [
      "Develop responsive user interfaces using React and Next.js.",
      "Build reusable components and maintain frontend architecture.",
      "Integrate REST APIs and manage application state.",
      "Optimize application performance and accessibility.",
      "Collaborate with design, product and backend teams.",
    ],
    requirements: [
      "2–4 years of frontend development experience.",
      "Strong knowledge of JavaScript and TypeScript.",
      "Experience with React, Next.js and CSS frameworks.",
      "Understanding of REST APIs, Git and responsive design.",
    ],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Git",
    ],
    postedAt: "2026-10-22",
    featured: false,
    status: "published",
    applicationLinks: [
      {
        portal: "LinkedIn",
        url: "https://www.linkedin.com/jobs/",
      },
      {
        portal: "Naukri",
        url: "https://www.naukri.com/",
      },
    ],
  },
};

/**
 * Get a job by its unique Job ID.
 */
export function getJobById(id: string): JobRecord | undefined {
  return careerData[id.toUpperCase()];
}

/**
 * Get all published jobs.
 */
export function getPublishedJobs(): JobRecord[] {
  return Object.values(careerData).filter(
    (job) => job.status === "published"
  );
}

/**
 * Get jobs by status.
 */
export function getJobsByStatus(
  status: JobRecord["status"]
): JobRecord[] {
  return Object.values(careerData).filter(
    (job) => job.status === status
  );
}

/**
 * Get featured published jobs.
 */
export function getFeaturedJobs(): JobRecord[] {
  return getPublishedJobs().filter((job) => job.featured);
}

/**
 * Generate the next Job ID for a given year.
 *
 * Example:
 * generateJobId(2026) => JD26005
 */
export function generateJobId(year = new Date().getFullYear()): string {
  const yearCode = String(year).slice(-2);
  const prefix = `JD${yearCode}`;

  const existingNumbers = Object.keys(careerData)
    .filter((id) => new RegExp(`^${prefix}\\d{3}$`).test(id))
    .map((id) => Number(id.slice(-3)));

  const nextNumber =
    existingNumbers.length > 0
      ? Math.max(...existingNumbers) + 1
      : 1;

  if (nextNumber > 999) {
    throw new Error(`Job ID sequence exhausted for ${year}`);
  }

  return `${prefix}${String(nextNumber).padStart(3, "0")}`;
}