
import {
  LayoutDashboard,
  Users,
  Activity,
  ShieldCheck,
  FileBarChart,
  Settings,
  Building2,
  ClipboardList,
  Bell,
  type LucideIcon,
} from "lucide-react";

export interface NavbarBreadcrumb {
  label: string;
  href?: string;
}

export interface NavbarAction {
  label: string;
  href?: string;
  icon?: LucideIcon;
}

export interface NavbarItem {
  title: string;
  description: string;
  icon: LucideIcon;
  breadcrumbs: NavbarBreadcrumb[];
  roles?: string[];
  action?: NavbarAction;
}

export const NAVBAR_CONFIG: Record<string, NavbarItem> = {
  "/": {
    title: "Overview",
    description: "Welcome to your Shalimar management workspace.",
    icon: LayoutDashboard,
    breadcrumbs: [
      { label: "Workspace" },
      { label: "Overview" },
    ],
    roles: ["superadmin", "admin", "manager"],
  },

  "/users": {
    title: "User Management",
    description: "Manage users, permissions and account access.",
    icon: Users,
    breadcrumbs: [
      { label: "Workspace", href: "/" },
      { label: "Users" },
    ],
    roles: ["superadmin", "admin"],
  },

  "/activity": {
    title: "Activity",
    description: "Monitor user activity and system events.",
    icon: Activity,
    breadcrumbs: [
      { label: "Workspace", href: "/" },
      { label: "Activity" },
    ],
    roles: ["superadmin", "admin", "manager"],
  },

  "/organizations": {
    title: "Organizations",
    description: "Manage organizations and business entities.",
    icon: Building2,
    breadcrumbs: [
      { label: "Management" },
      { label: "Organizations" },
    ],
    roles: ["superadmin", "admin"],
  },

  "/reports": {
    title: "Reports & Analytics",
    description: "Review operational reports and analytics.",
    icon: FileBarChart,
    breadcrumbs: [
      { label: "Management" },
      { label: "Reports" },
    ],
    roles: ["superadmin", "admin", "manager"],
  },

  "/audit": {
    title: "Audit Logs",
    description: "Review administrative actions and security events.",
    icon: ClipboardList,
    breadcrumbs: [
      { label: "Management" },
      { label: "Audit Logs" },
    ],
    roles: ["superadmin"],
  },

  "/security": {
    title: "Security",
    description: "Manage security policies and access controls.",
    icon: ShieldCheck,
    breadcrumbs: [
      { label: "System" },
      { label: "Security" },
    ],
    roles: ["superadmin"],
  },

  "/notifications": {
    title: "Notifications",
    description: "Review your system notifications.",
    icon: Bell,
    breadcrumbs: [
      { label: "System" },
      { label: "Notifications" },
    ],
    roles: ["superadmin", "admin", "manager", "staff"],
  },

  "/settings": {
    title: "Settings",
    description: "Configure your administration workspace.",
    icon: Settings,
    breadcrumbs: [
      { label: "System" },
      { label: "Settings" },
    ],
    roles: ["superadmin"],
  },
};

export function getNavbarConfig(
  pathname: string,
  role: string
): NavbarItem {
  const matchedPath =
    Object.keys(NAVBAR_CONFIG)
      .filter(
        (path) =>
          path === "/"
            ? pathname === "/"
            : pathname === path || pathname.startsWith(`${path}/`)
      )
      .sort((a, b) => b.length - a.length)[0] ?? "/";

  const config = NAVBAR_CONFIG[matchedPath];

  if (config.roles && !config.roles.includes(role)) {
    return NAVBAR_CONFIG["/"];
  }

  return config;
}
