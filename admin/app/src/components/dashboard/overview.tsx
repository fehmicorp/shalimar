
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  FileEdit,
  FileText,
  GripVertical,
  Image as ImageIcon,
  LayoutDashboard,
  Newspaper,
  Plus,
  RotateCcw,
  Settings2,
  Upload,
  Users,
  X,
} from "lucide-react";

interface DashboardOverviewProps {
  username: string;
}

type WidgetId =
  | "kpis"
  | "analytics"
  | "content"
  | "projects"
  | "activity"
  | "quickActions";

interface WidgetDefinition {
  id: WidgetId;
  title: string;
  description: string;
}

const DEFAULT_WIDGETS: WidgetDefinition[] = [
  {
    id: "kpis",
    title: "Business Overview",
    description: "Your website content at a glance",
  },
  {
    id: "analytics",
    title: "Website Analytics",
    description: "Traffic and visitor engagement",
  },
  {
    id: "content",
    title: "Content Insights",
    description: "Publishing workflow overview",
  },
  {
    id: "projects",
    title: "Project Performance",
    description: "Views and engagement by project",
  },
  {
    id: "activity",
    title: "Recent Activity",
    description: "Latest changes across your website",
  },
  {
    id: "quickActions",
    title: "Quick Actions",
    description: "Frequently used content operations",
  },
];

const KPI_DATA = [
  {
    label: "Total Projects",
    value: "48",
    change: "+8.2%",
    trend: "up",
    icon: Building2,
    href: "/content/projects",
  },
  {
    label: "Published Blogs",
    value: "126",
    change: "+12.5%",
    trend: "up",
    icon: Newspaper,
    href: "/content/blogs",
  },
  {
    label: "Active Careers",
    value: "08",
    change: "2 new",
    trend: "up",
    icon: BriefcaseBusiness,
    href: "/content/careers",
  },
  {
    label: "Media Assets",
    value: "1,284",
    change: "+24 this month",
    trend: "up",
    icon: ImageIcon,
    href: "/media",
  },
];

const TRAFFIC_DATA = [
  { label: "Direct", value: 38, color: "bg-[#a47c43]" },
  { label: "Organic Search", value: 34, color: "bg-[#6d8a72]" },
  { label: "Social", value: 18, color: "bg-[#8796a7]" },
  { label: "Referral", value: 10, color: "bg-[#c9b99f]" },
];

const WEEKLY_TRAFFIC = [
  { day: "Mon", visitors: 42, views: 65 },
  { day: "Tue", visitors: 58, views: 78 },
  { day: "Wed", visitors: 48, views: 70 },
  { day: "Thu", visitors: 72, views: 88 },
  { day: "Fri", visitors: 63, views: 76 },
  { day: "Sat", visitors: 85, views: 96 },
  { day: "Sun", visitors: 55, views: 68 },
];

const PROJECT_DATA = [
  { name: "Shalimar OneWorld", views: "18,420", engagement: 82 },
  { name: "Shalimar Gallant", views: "12,850", engagement: 74 },
  { name: "Shalimar Paradise", views: "9,640", engagement: 68 },
  { name: "Shalimar Mannat", views: "7,280", engagement: 59 },
];

const CONTENT_DATA = [
  { label: "Published", count: 184, color: "bg-[#6d8a72]", icon: CheckCircle2 },
  { label: "Draft", count: 32, color: "bg-[#c9b99f]", icon: FileEdit },
  { label: "Scheduled", count: 12, color: "bg-[#8796a7]", icon: CalendarClock },
  { label: "Pending Review", count: 7, color: "bg-[#b18a50]", icon: Clock3 },
];

const ACTIVITY_DATA = [
  {
    title: "Project updated",
    detail: "Shalimar OneWorld · Gallery updated",
    time: "12 minutes ago",
    icon: Building2,
  },
  {
    title: "New media uploaded",
    detail: "8 images added to Media Library",
    time: "48 minutes ago",
    icon: Upload,
  },
  {
    title: "Blog published",
    detail: "Latest company announcement",
    time: "2 hours ago",
    icon: Newspaper,
  },
  {
    title: "Career post updated",
    detail: "Senior Manager · Human Resources",
    time: "Yesterday",
    icon: BriefcaseBusiness,
  },
];

const QUICK_ACTIONS = [
  {
    title: "Add Project",
    description: "Create a new project",
    href: "/content/projects/new",
    icon: Building2,
  },
  {
    title: "Create Blog",
    description: "Write a website article",
    href: "/content/blogs/new",
    icon: Newspaper,
  },
  {
    title: "Upload Media",
    description: "Add images and documents",
    href: "/media",
    icon: Upload,
  },
  {
    title: "Add Career",
    description: "Publish a job opening",
    href: "/content/careers/new",
    icon: BriefcaseBusiness,
  },
];

function Panel({
  widget,
  children,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  widget: WidgetDefinition;
  children: React.ReactNode;
  onDragStart: (id: WidgetId) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (id: WidgetId) => void;
}) {
  return (
    <section
      draggable
      onDragStart={() => onDragStart(widget.id)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(widget.id)}
      className="group min-w-0 rounded-sm border border-[#e9dfd0] bg-white shadow-[0_2px_12px_rgba(56,43,32,0.025)] transition-shadow hover:shadow-[0_5px_20px_rgba(56,43,32,0.06)]"
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#f0e9df] px-5 py-4">
        <div>
          <h2 className="font-serif text-lg text-[#382b20]">
            {widget.title}
          </h2>
          <p className="mt-1 text-[11px] text-[#958875]">
            {widget.description}
          </p>
        </div>

        <div
          title="Drag to rearrange"
          className="cursor-grab p-1 text-[#c4b7a4] opacity-50 transition group-hover:opacity-100 active:cursor-grabbing"
        >
          <GripVertical size={17} />
        </div>
      </div>

      <div className="p-5">{children}</div>
    </section>
  );
}

export default function DashboardOverview({
  username,
}: DashboardOverviewProps) {
  const storageKey = `shalimar-dashboard-layout:${username}`;

  const [widgets, setWidgets] = useState<WidgetDefinition[]>(DEFAULT_WIDGETS);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draggedWidget, setDraggedWidget] = useState<WidgetId | null>(null);
  const [period, setPeriod] = useState("7 days");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        const savedIds = JSON.parse(saved) as WidgetId[];

        const ordered = savedIds
          .map((id) => DEFAULT_WIDGETS.find((widget) => widget.id === id))
          .filter((widget): widget is WidgetDefinition => Boolean(widget));

        const missing = DEFAULT_WIDGETS.filter(
          (widget) => !savedIds.includes(widget.id)
        );

        setWidgets([...ordered, ...missing]);
      }
    } catch {
      setWidgets(DEFAULT_WIDGETS);
    }

    setHydrated(true);
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify(widgets.map((widget) => widget.id))
    );
  }, [widgets, storageKey, hydrated]);

  const visibleWidgets = useMemo(
    () => widgets,
    [widgets]
  );

  function moveWidget(targetId: WidgetId) {
    if (!draggedWidget || draggedWidget === targetId) return;

    setWidgets((current) => {
      const next = [...current];
      const from = next.findIndex((item) => item.id === draggedWidget);
      const to = next.findIndex((item) => item.id === targetId);

      if (from < 0 || to < 0) return current;

      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);

      return next;
    });

    setDraggedWidget(null);
  }

  function toggleWidget(id: WidgetId) {
    setWidgets((current) =>
      current.map((widget) =>
        widget.id === id
          ? { ...widget, hidden: !(widget as WidgetDefinition & { hidden?: boolean }).hidden } as WidgetDefinition
          : widget
      )
    );
  }

  function restoreLayout() {
    setWidgets(DEFAULT_WIDGETS);
  }

  const hiddenWidgets = widgets.filter(
    (widget) => (widget as WidgetDefinition & { hidden?: boolean }).hidden
  );

  const shownWidgets = visibleWidgets.filter(
    (widget) => !(widget as WidgetDefinition & { hidden?: boolean }).hidden
  );

  function renderWidget(widget: WidgetDefinition) {
    switch (widget.id) {
      case "kpis":
        return (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {KPI_DATA.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group/card border border-[#eee5d9] bg-[#fcfaf6] p-4 transition hover:border-[#cbb28e] hover:bg-[#f8f3eb]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.12em] text-[#958875]">
                      {item.label}
                    </span>
                    <Icon size={17} className="text-[#a47c43]" />
                  </div>

                  <div className="mt-4 flex items-end justify-between gap-2">
                    <span className="font-serif text-3xl text-[#382b20]">
                      {item.value}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-[#6d8a72]">
                      <ArrowUpRight size={13} />
                      {item.change}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        );

      case "analytics":
        return (
          <div className="grid gap-7 xl:grid-cols-[1.6fr_1fr]">
            <div>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#958875]">
                      Visitors
                    </p>
                    <p className="mt-1 font-serif text-2xl text-[#382b20]">
                      24,856
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-[#6d8a72]">
                      <ArrowUpRight size={12} /> 14.8% vs previous period
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#958875]">
                      Page Views
                    </p>
                    <p className="mt-1 font-serif text-2xl text-[#382b20]">
                      68,420
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-[#6d8a72]">
                      <ArrowUpRight size={12} /> 9.3% vs previous period
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#958875]">
                      Engagement
                    </p>
                    <p className="mt-1 font-serif text-2xl text-[#382b20]">
                      68.4%
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-[#6d8a72]">
                      <ArrowUpRight size={12} /> 4.2% vs previous period
                    </p>
                  </div>
                </div>

                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  className="border border-[#e9dfd0] bg-white px-3 py-2 text-[11px] text-[#786b5b] outline-none focus:border-[#b18a50]"
                >
                  <option>7 days</option>
                  <option>30 days</option>
                  <option>90 days</option>
                </select>
              </div>

              <div className="flex h-44 items-end gap-3 border-b border-l border-[#eee5d9] px-3 pb-0 pt-4">
                {WEEKLY_TRAFFIC.map((item) => (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="flex h-full w-full items-end justify-center gap-1">
                      <div
                        className="w-2/5 rounded-t-sm bg-[#cbb28e]"
                        style={{ height: `${item.visitors}%` }}
                        title={`${item.visitors} visitor units`}
                      />
                      <div
                        className="w-2/5 rounded-t-sm bg-[#a47c43]"
                        style={{ height: `${item.views}%` }}
                        title={`${item.views} page-view units`}
                      />
                    </div>
                    <span className="pb-2 text-[9px] text-[#958875]">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-center gap-5 text-[10px] text-[#958875]">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#cbb28e]" /> Visitors
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#a47c43]" /> Page views
                </span>
              </div>
            </div>

            <div className="border-l border-[#f0e9df] pl-0 xl:pl-7">
              <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#786b5b]">
                Traffic Sources
              </h3>

              <div className="flex items-center gap-5">
                <div
                  className="h-32 w-32 shrink-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#a47c43 0% 38%, #6d8a72 38% 72%, #8796a7 72% 90%, #c9b99f 90% 100%)",
                  }}
                >
                  <div className="m-5 flex h-22 w-22 items-center justify-center rounded-full bg-white">
                    <div className="text-center">
                      <p className="font-serif text-xl text-[#382b20]">100%</p>
                      <p className="text-[8px] text-[#958875]">Traffic</p>
                    </div>
                  </div>
                </div>

                <div className="min-w-0 flex-1 space-y-3">
                  {TRAFFIC_DATA.map((source) => (
                    <div key={source.label}>
                      <div className="flex justify-between gap-2 text-[10px]">
                        <span className="text-[#786b5b]">{source.label}</span>
                        <span className="font-semibold text-[#382b20]">
                          {source.value}%
                        </span>
                      </div>
                      <div className="mt-1 h-1 bg-[#f0e9df]">
                        <div
                          className={`h-full ${source.color}`}
                          style={{ width: `${source.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "content":
        return (
          <div className="grid gap-6 md:grid-cols-[1fr_1.5fr]">
            <div className="flex items-center justify-center">
              <div
                className="flex h-40 w-40 items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(#6d8a72 0% 78.5%, #c9b99f 78.5% 92.2%, #8796a7 92.2% 97.3%, #b18a50 97.3% 100%)",
                }}
              >
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white">
                  <span className="font-serif text-3xl text-[#382b20]">
                    235
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-[#958875]">
                    Total items
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CONTENT_DATA.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="border border-[#eee5d9] bg-[#fcfaf6] p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] text-[#958875]">
                        {item.label}
                      </span>
                      <Icon size={15} className="text-[#a47c43]" />
                    </div>
                    <p className="mt-3 font-serif text-2xl text-[#382b20]">
                      {item.count}
                    </p>
                    <div className="mt-3 h-1 bg-[#eee5d9]">
                      <div
                        className={`h-full ${item.color}`}
                        style={{ width: `${(item.count / 235) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "projects":
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-[minmax(0,1fr)_90px_110px] gap-3 border-b border-[#eee5d9] pb-3 text-[9px] uppercase tracking-[0.12em] text-[#a09280]">
              <span>Project</span>
              <span className="text-right">Views</span>
              <span className="text-right">Engagement</span>
            </div>

            {PROJECT_DATA.map((project) => (
              <div
                key={project.name}
                className="grid grid-cols-[minmax(0,1fr)_90px_110px] items-center gap-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-medium text-[#382b20]">
                    {project.name}
                  </p>
                  <div className="mt-2 h-1 bg-[#f0e9df]">
                    <div
                      className="h-full bg-[#b18a50]"
                      style={{ width: `${project.engagement}%` }}
                    />
                  </div>
                </div>
                <span className="text-right text-[11px] text-[#786b5b]">
                  {project.views}
                </span>
                <span className="text-right text-[11px] font-medium text-[#6d8a72]">
                  {project.engagement}%
                </span>
              </div>
            ))}

            <Link
              href="/content/projects"
              className="inline-flex items-center gap-2 pt-2 text-[10px] font-semibold uppercase tracking-wider text-[#a47c43] hover:text-[#382b20]"
            >
              View all projects <ArrowUpRight size={13} />
            </Link>
          </div>
        );

      case "activity":
        return (
          <div className="space-y-5">
            {ACTIVITY_DATA.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div
                  key={`${activity.title}-${index}`}
                  className="flex items-start gap-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#eee5d9] bg-[#fcfaf6] text-[#a47c43]">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-[#382b20]">
                      {activity.title}
                    </p>
                    <p className="mt-1 truncate text-[10px] text-[#958875]">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="shrink-0 text-[9px] text-[#a09280]">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        );

      case "quickActions":
        return (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  href={action.href}
                  className="flex items-center gap-3 border border-[#eee5d9] bg-[#fcfaf6] p-4 transition hover:border-[#cbb28e] hover:bg-[#f8f3eb]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#eee5d6] text-[#a47c43]">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-[#382b20]">
                      {action.title}
                    </p>
                    <p className="mt-1 text-[10px] text-[#958875]">
                      {action.description}
                    </p>
                  </div>
                  <Plus
                    size={15}
                    className="text-[#a47c43] transition group-hover:translate-x-1"
                  />
                </Link>
              );
            })}
          </div>
        );
    }
  }

  return (
    <div className="min-h-full space-y-6 pb-10">
      {/* Dashboard heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#a47c43]">
            <LayoutDashboard size={13} />
            Workspace Overview
          </div>
          <h1 className="font-serif text-3xl font-normal text-[#382b20]">
            Welcome back, {username}
          </h1>
          <p className="mt-2 text-[12px] text-[#958875]">
            Monitor your website performance and manage your content from one place.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setSettingsOpen((value) => !value)}
            className="inline-flex items-center gap-2 border border-[#e9dfd0] bg-white px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-[#786b5b] transition hover:border-[#b18a50] hover:text-[#a47c43]"
          >
            <Settings2 size={15} />
            Customize dashboard
            <ChevronDown size={13} />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 top-full z-20 mt-2 w-72 border border-[#e9dfd0] bg-white p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#382b20]">
                  Dashboard widgets
                </h3>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  aria-label="Close customization"
                  className="text-[#958875] hover:text-[#382b20]"
                >
                  <X size={15} />
                </button>
              </div>

              <p className="mb-4 text-[10px] leading-relaxed text-[#958875]">
                Select the sections you want to see. Drag the cards to change their order.
              </p>

              <div className="space-y-3">
                {widgets.map((widget) => {
                  const hidden = (
                    widget as WidgetDefinition & { hidden?: boolean }
                  ).hidden;

                  return (
                    <label
                      key={widget.id}
                      className="flex cursor-pointer items-center justify-between gap-3 text-[11px] text-[#786b5b]"
                    >
                      {widget.title}
                      <input
                        type="checkbox"
                        checked={!hidden}
                        onChange={() => toggleWidget(widget.id)}
                        className="h-4 w-4 accent-[#a47c43]"
                      />
                    </label>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-[#eee5d9] pt-3">
                <button
                  type="button"
                  onClick={restoreLayout}
                  className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-[#a47c43] hover:text-[#382b20]"
                >
                  <RotateCcw size={13} />
                  Restore default layout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Widgets */}
      {shownWidgets.length === 0 ? (
        <div className="border border-dashed border-[#d8c8b1] bg-white px-5 py-14 text-center">
          <LayoutDashboard
            size={28}
            className="mx-auto text-[#b18a50]"
          />
          <p className="mt-3 font-serif text-xl text-[#382b20]">
            Your dashboard is empty
          </p>
          <p className="mt-2 text-[11px] text-[#958875]">
            Enable widgets from Customize dashboard to get started.
          </p>
          <button
            type="button"
            onClick={restoreLayout}
            className="mt-5 text-[10px] font-semibold uppercase tracking-wider text-[#a47c43]"
          >
            Restore dashboard
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 2xl:grid-cols-2">
          {shownWidgets.map((widget) => (
            <div
              key={widget.id}
              className={widget.id === "kpis" || widget.id === "analytics" ? "2xl:col-span-2" : ""}
            >
              <Panel
                widget={widget}
                onDragStart={setDraggedWidget}
                onDragOver={(event) => event.preventDefault()}
                onDrop={moveWidget}
              >
                {renderWidget(widget)}
              </Panel>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e9dfd0] pt-4">
        <p className="text-[9px] uppercase tracking-wider text-[#a09280]">
          Shalimar Corporate · Content Management
        </p>
        <p className="text-[9px] text-[#a09280]">
          Your dashboard layout is saved on this device.
        </p>
      </div>
    </div>
  );
}
