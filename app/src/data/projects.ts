
export type ProjectType =
  | "residential"
  | "commercial"
  | "township"
  | "villa"
  | "mixed-use"
  | "government"
  | "other";

export type ProjectStatus =
  | "ongoing"
  | "completed"
  | "upcoming";

export type ProjectCategory =
  | "2-bhk"
  | "3-bhk"
  | "4-bhk"
  | "penthouse"
  | "villa"
  | "duplex-house"
  | "commercial-space"
  | "plot"
  | "property"
  | "other";

export interface ProjectRecord {
  id: string;
  slug: string;
  name: string;
  location: string;
  city: string;

  type: ProjectType;
  status: ProjectStatus;
  categories: ProjectCategory[];

  shortDescription: string;
  description?: string;

  coverImage?: string;
  gallery?: string[];

  configurations?: string[];
  startingPrice?: string;

  featured?: boolean;
  completionDate?: string;

  reraRegistrationNo?: string;
  reraUrl?: string;

  projectUrl?: string;

  statusLabel?: string;
  published: boolean;
}

// --------------------------------------------------
// PROJECT TYPES
// --------------------------------------------------

export const projectTypes: {
  id: ProjectType;
  label: string;
  description: string;
}[] = [
  {
    id: "residential",
    label: "Residential",
    description: "Homes designed for modern living.",
  },
  {
    id: "commercial",
    label: "Commercial",
    description: "Commercial spaces for businesses and enterprises.",
  },
  {
    id: "township",
    label: "Township",
    description: "Integrated communities and township developments.",
  },
  {
    id: "villa",
    label: "Villas",
    description: "Independent and premium villa residences.",
  },
  {
    id: "mixed-use",
    label: "Mixed Use",
    description: "Developments combining multiple property uses.",
  },
  {
    id: "government",
    label: "Government",
    description: "Government and institutional projects.",
  },
  {
    id: "other",
    label: "Other Projects",
    description: "Other developments and property interests.",
  },
];
export const projectStatuses: {
  id: ProjectStatus;
  label: string;
}[] = [
  {
    id: "ongoing",
    label: "Ongoing",
  },
  {
    id: "upcoming",
    label: "Upcoming",
  },
  {
    id: "completed",
    label: "Recently Completed",
  },
];

export const projectCategories: {
  id: ProjectCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "2-bhk",
    label: "2 BHK Flats",
    description: "Two-bedroom residential apartments.",
  },
  {
    id: "3-bhk",
    label: "3 BHK Flats",
    description: "Three-bedroom residential apartments.",
  },
  {
    id: "4-bhk",
    label: "4 BHK Flats",
    description: "Four-bedroom residential apartments.",
  },
  {
    id: "penthouse",
    label: "Penthouses",
    description: "Premium penthouse residences.",
  },
  {
    id: "villa",
    label: "Villa",
    description: "Independent villa properties.",
  },
  {
    id: "duplex-house",
    label: "Duplex House",
    description: "Multi-level residential homes.",
  },
  {
    id: "commercial-space",
    label: "Commercial",
    description: "Commercial property and business spaces.",
  },
  {
    id: "plot",
    label: "Plots",
    description: "Residential and other land parcels.",
  },
  {
    id: "property",
    label: "Other Property",
    description: "Explore other available property categories.",
  },
  {
    id: "other",
    label: "Other",
    description: "Additional property offerings.",
  },
];

export const projectsData: ProjectRecord[] = [  
  {
    id: "project-001",
    slug: "project-name",
    name: "Project Name",
    location: "Project Location",
    city: "Lucknow",
    type: "residential",
    status: "ongoing",
    categories: ["2-bhk", "3-bhk"],
    shortDescription: "Short approved project description.",
    coverImage: "/projects/project-name/cover.jpg",
    gallery: [],
    configurations: ["2 BHK", "3 BHK"],
    startingPrice: "",
    featured: false,
    reraRegistrationNo: "",
    reraUrl: "",
    projectUrl: "",
    published: true,
  },
];

// --------------------------------------------------
// DATA HELPERS
// --------------------------------------------------

export const getPublishedProjects = () =>
  projectsData.filter((project) => project.published);

export const getFeaturedProjects = () =>
  getPublishedProjects().filter((project) => project.featured);

export const getProjectBySlug = (slug: string) =>
  getPublishedProjects().find(
    (project) => project.slug === slug
  );

export const getProjectsByType = (type: ProjectType) =>
  getPublishedProjects().filter(
    (project) => project.type === type
  );

export const getProjectsByStatus = (status: ProjectStatus) =>
  getPublishedProjects().filter(
    (project) => project.status === status
  );

export const getProjectsByCategory = (
  category: ProjectCategory
) =>
  getPublishedProjects().filter((project) =>
    project.categories.includes(category)
  );
