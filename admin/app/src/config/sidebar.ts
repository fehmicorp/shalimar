
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  Building2,
  Building,
  Newspaper,
  BriefcaseBusiness,
  FileText,
  Award,
  CircleHelp,
  Landmark,
  FileChartColumn,
  Images,
  Folder,
  Cloud,
  FileEdit,
  CalendarClock,
  Globe,
  PanelsTopLeft,
  Search,
  Contact,
  Users,
  ShieldCheck,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type AdminRole =
  | "superadmin"
  | "admin"
  | "manager"
  | "editor"
  | "publisher"
  | "media_manager"
  | "hr"
  | "staff";

export interface SidebarItem {
  title: string;
  description?: string;
  href: string;
  icon: LucideIcon;
  roles?: AdminRole[];
  badge?: string;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

const ALL_CONTENT_ROLES: AdminRole[] = [
  "superadmin",
  "admin",
  "manager",
  "editor",
  "publisher",
];

const ADMIN_ROLES: AdminRole[] = [
  "superadmin",
  "admin",
];

const MEDIA_ROLES: AdminRole[] = [
  "superadmin",
  "admin",
  "editor",
  "media_manager",
];

export const SIDEBAR_CONFIG: SidebarGroup[] = [
  // --------------------------------------------------
  // WORKSPACE
  // --------------------------------------------------
  {
    title: "Workspace",
    items: [
      {
        title: "Overview",
        description: "Website CMS dashboard",
        href: "/",
        icon: LayoutDashboard,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "Website Analytics",
        description: "Website traffic and performance",
        href: "/analytics",
        icon: ChartNoAxesCombined,
        roles: ADMIN_ROLES,
      },
    ],
  },

  // --------------------------------------------------
  // WEBSITE CONTENT
  // --------------------------------------------------
  {
    title: "Website Content",
    items: [
      {
        title: "About Shalimar",
        description: "Company profile and corporate information",
        href: "/content/about",
        icon: Building2,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "Projects",
        description: "Manage residential and commercial projects",
        href: "/content/projects",
        icon: Building,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "Blogs & News",
        description: "Articles, news and announcements",
        href: "/content/blogs",
        icon: Newspaper,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "Careers",
        description: "Job openings and career opportunities",
        href: "/content/careers",
        icon: BriefcaseBusiness,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "Policies",
        description: "Corporate policies and legal documents",
        href: "/content/policies",
        icon: FileText,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "Certificates",
        description: "Certifications and accreditations",
        href: "/content/certificates",
        icon: Award,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "FAQs",
        description: "Frequently asked questions",
        href: "/content/faqs",
        icon: CircleHelp,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "RERA & Compliance",
        description: "RERA registrations and compliance records",
        href: "/content/rera",
        icon: Landmark,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "Reports & Publications",
        description: "Annual reports and corporate publications",
        href: "/content/reports",
        icon: FileChartColumn,
        roles: ALL_CONTENT_ROLES,
      },
    ],
  },

  // --------------------------------------------------
  // MEDIA AND DOCUMENTS
  // --------------------------------------------------
  {
    title: "Media & Documents",
    items: [
      {
        title: "Media Library",
        description: "Images, banners and videos",
        href: "/media",
        icon: Images,
        roles: MEDIA_ROLES,
      },
      {
        title: "Document Library",
        description: "PDFs and downloadable documents",
        href: "/media/documents",
        icon: Folder,
        roles: MEDIA_ROLES,
      },
      {
        title: "S3 Storage",
        description: "Object storage and upload management",
        href: "/storage",
        icon: Cloud,
        roles: ADMIN_ROLES,
      },
    ],
  },

  // --------------------------------------------------
  // PUBLISHING
  // --------------------------------------------------
  {
    title: "Publishing",
    items: [
      {
        title: "Drafts",
        description: "Unpublished website content",
        href: "/publishing/drafts",
        icon: FileEdit,
        roles: ALL_CONTENT_ROLES,
      },
      {
        title: "Scheduled Content",
        description: "Upcoming scheduled publications",
        href: "/publishing/scheduled",
        icon: CalendarClock,
        roles: ["superadmin", "admin", "publisher", "manager"],
      },
      {
        title: "Published Content",
        description: "Live website content",
        href: "/publishing/published",
        icon: Globe,
        roles: ALL_CONTENT_ROLES,
      },
    ],
  },

  // --------------------------------------------------
  // WEBSITE CONFIGURATION
  // --------------------------------------------------
  {
    title: "Website Configuration",
    items: [
      {
        title: "Navigation & Menus",
        description: "Website header, footer and navigation",
        href: "/website/navigation",
        icon: PanelsTopLeft,
        roles: ADMIN_ROLES,
      },
      {
        title: "SEO & Metadata",
        description: "Search engine optimization settings",
        href: "/website/seo",
        icon: Search,
        roles: ADMIN_ROLES,
      },
      {
        title: "Contact Information",
        description: "Corporate contact details and locations",
        href: "/website/contact",
        icon: Contact,
        roles: ADMIN_ROLES,
      },
    ],
  },

  // --------------------------------------------------
  // ADMINISTRATION
  // --------------------------------------------------
  {
    title: "Administration",
    items: [
      {
        title: "Users & Roles",
        description: "User accounts and permissions",
        href: "/system/users",
        icon: Users,
        roles: ADMIN_ROLES,
      },
      {
        title: "Security & Audit",
        description: "Access logs and security events",
        href: "/system/audit",
        icon: ShieldCheck,
        roles: ["superadmin"],
      },
      {
        title: "System Settings",
        description: "Application configuration",
        href: "/system/settings",
        icon: Settings,
        roles: ["superadmin"],
      },
    ],
  },
];

// --------------------------------------------------
// FILTER SIDEBAR BY ROLE
// --------------------------------------------------

export function getSidebarConfig(role: string): SidebarGroup[] {
  return SIDEBAR_CONFIG
    .map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          !item.roles ||
          item.roles.includes(role as AdminRole)
      ),
    }))
    .filter((group) => group.items.length > 0);
}
