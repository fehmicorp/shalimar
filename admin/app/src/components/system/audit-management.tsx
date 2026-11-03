
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ShieldCheck,
  LogIn,
  LogOut,
  FileEdit,
  Upload,
  Globe,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock3,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

type AuditStatus = "success" | "failed";

type AuditCategory =
  | "authentication"
  | "content"
  | "media"
  | "system";

interface AuditEvent {
  id: string;
  username: string;
  action: string;
  description: string;
  category: AuditCategory;
  status: AuditStatus;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

const SAMPLE_EVENTS: AuditEvent[] = [
  {
    id: "AUD-1008",
    username: "sameer.shaikh",
    action: "Successful login",
    description: "Administrator authenticated successfully",
    category: "authentication",
    status: "success",
    ipAddress: "103.82.XX.21",
    userAgent: "Chrome · Windows 11",
    createdAt: "03 Nov 2026, 10:42 AM",
  },
  {
    id: "AUD-1007",
    username: "unknown",
    action: "Failed login",
    description: "Invalid username or password",
    category: "authentication",
    status: "failed",
    ipAddress: "117.XX.XX.84",
    userAgent: "Chrome · Windows",
    createdAt: "03 Nov 2026, 10:15 AM",
  },
  {
    id: "AUD-1006",
    username: "content.manager",
    action: "Project updated",
    description: "Updated Shalimar OneWorld project details",
    category: "content",
    status: "success",
    ipAddress: "103.82.XX.21",
    userAgent: "Chrome · Windows 11",
    createdAt: "03 Nov 2026, 09:48 AM",
  },
  {
    id: "AUD-1005",
    username: "media.manager",
    action: "Media uploaded",
    description: "Uploaded 8 project gallery images",
    category: "media",
    status: "success",
    ipAddress: "49.XX.XX.12",
    userAgent: "Edge · Windows 11",
    createdAt: "03 Nov 2026, 09:30 AM",
  },
  {
    id: "AUD-1004",
    username: "admin.operations",
    action: "User login",
    description: "Administrator session created",
    category: "authentication",
    status: "success",
    ipAddress: "103.82.XX.21",
    userAgent: "Chrome · Windows 11",
    createdAt: "02 Nov 2026, 05:20 PM",
  },
  {
    id: "AUD-1003",
    username: "website.editor",
    action: "Blog updated",
    description: "Edited company news article",
    category: "content",
    status: "success",
    ipAddress: "49.XX.XX.12",
    userAgent: "Chrome · macOS",
    createdAt: "02 Nov 2026, 04:12 PM",
  },
  {
    id: "AUD-1002",
    username: "unknown",
    action: "Failed login",
    description: "Account credentials did not match",
    category: "authentication",
    status: "failed",
    ipAddress: "117.XX.XX.84",
    userAgent: "Firefox · Linux",
    createdAt: "02 Nov 2026, 03:42 PM",
  },
  {
    id: "AUD-1001",
    username: "sameer.shaikh",
    action: "Security settings viewed",
    description: "Opened system security configuration",
    category: "system",
    status: "success",
    ipAddress: "103.82.XX.21",
    userAgent: "Chrome · Windows 11",
    createdAt: "02 Nov 2026, 02:18 PM",
  },
];

function StatusBadge({ status }: { status: AuditStatus }) {
  const isSuccess = status === "success";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider ${
        isSuccess
          ? "bg-[#eaf1e9] text-[#58765d]"
          : "bg-[#f8e9e5] text-[#a45e4d]"
      }`}
    >
      {isSuccess ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
      {isSuccess ? "Success" : "Failed"}
    </span>
  );
}

function CategoryIcon({ category }: { category: AuditCategory }) {
  const iconClass = "text-[#a47c43]";

  switch (category) {
    case "authentication":
      return <LogIn size={16} className={iconClass} />;
    case "content":
      return <FileEdit size={16} className={iconClass} />;
    case "media":
      return <Upload size={16} className={iconClass} />;
    case "system":
      return <ShieldCheck size={16} className={iconClass} />;
  }
}

export default function AuditManagement() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null);

  const pageSize = 8;

  const filteredEvents = useMemo(() => {
    return SAMPLE_EVENTS.filter((event) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        event.id.toLowerCase().includes(query) ||
        event.username.toLowerCase().includes(query) ||
        event.action.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.ipAddress.toLowerCase().includes(query);

      const matchesCategory =
        category === "all" || event.category === category;

      const matchesStatus =
        status === "all" || event.status === status;

      // Sample records only cover the displayed dates.
      // Replace this filter with date comparisons on API timestamps.
      const matchesDate = dateRange === "all" || dateRange === "7";

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [search, category, status, dateRange]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / pageSize)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const successCount = SAMPLE_EVENTS.filter(
    (event) => event.status === "success"
  ).length;

  const failedCount = SAMPLE_EVENTS.filter(
    (event) => event.status === "failed"
  ).length;

  const loginCount = SAMPLE_EVENTS.filter(
    (event) => event.category === "authentication"
  ).length;

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#a47c43]">
            <ShieldCheck size={13} />
            System Administration
          </div>

          <h1 className="font-serif text-3xl font-normal text-[#382b20]">
            Audit & Security Logs
          </h1>

          <p className="mt-2 text-[12px] text-[#958875]">
            Review account access, administrative actions and system activity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 border border-[#e9dfd0] bg-white px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#786b5b] transition hover:border-[#b18a50] hover:text-[#a47c43]"
        >
          <Download size={14} />
          Export / Print
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total Events"
          value={SAMPLE_EVENTS.length}
          description="Events in this sample"
          icon={ActivityIcon}
        />
        <SummaryCard
          label="Successful Events"
          value={successCount}
          description="Completed actions"
          icon={CheckCircle2}
        />
        <SummaryCard
          label="Failed Events"
          value={failedCount}
          description="Failed or rejected actions"
          icon={AlertTriangle}
        />
        <SummaryCard
          label="Authentication"
          value={loginCount}
          description="Login-related events"
          icon={LogIn}
        />
      </div>

      {/* Security notice */}
      <div className="flex items-start gap-3 border border-[#eadbc3] bg-[#fbf7ef] p-4">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#a47c43]" />
        <div>
          <p className="text-[11px] font-semibold text-[#382b20]">
            Security monitoring
          </p>
          <p className="mt-1 text-[10px] leading-relaxed text-[#8b7d6a]">
            Review failed login attempts and unusual account activity.
            Investigate unexpected access before changing account permissions.
          </p>
        </div>
      </div>

      {/* Events table */}
      <section className="border border-[#e9dfd0] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee5d9] px-5 py-4">
          <div>
            <h2 className="font-serif text-lg text-[#382b20]">
              Activity Log
            </h2>
            <p className="mt-1 text-[10px] text-[#958875]">
              {filteredEvents.length} event(s) found
            </p>
          </div>

          <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-wider text-[#958875]">
            <Clock3 size={13} />
            Newest first
          </span>
        </div>

        {/* Filters */}
        <div className="grid gap-3 border-b border-[#eee5d9] bg-[#fcfaf6] p-4 md:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_170px_150px_150px]">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a09280]"
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search user, action, IP or event ID..."
              className="h-10 w-full border border-[#e9dfd0] bg-white pl-9 pr-3 text-[11px] text-[#382b20] outline-none placeholder:text-[#b2a694] focus:border-[#b18a50]"
            />
          </div>

          <div className="relative">
            <Filter
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a09280]"
            />
            <select
              value={category}
              onChange={(event) => {
                setCategory(event.target.value);
                setPage(1);
              }}
              className="h-10 w-full appearance-none border border-[#e9dfd0] bg-white pl-9 pr-3 text-[11px] text-[#786b5b] outline-none focus:border-[#b18a50]"
            >
              <option value="all">All Categories</option>
              <option value="authentication">Authentication</option>
              <option value="content">Content</option>
              <option value="media">Media</option>
              <option value="system">System</option>
            </select>
          </div>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="h-10 border border-[#e9dfd0] bg-white px-3 text-[11px] text-[#786b5b] outline-none focus:border-[#b18a50]"
          >
            <option value="all">All Results</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={dateRange}
            onChange={(event) => {
              setDateRange(event.target.value);
              setPage(1);
            }}
            className="h-10 border border-[#e9dfd0] bg-white px-3 text-[11px] text-[#786b5b] outline-none focus:border-[#b18a50]"
          >
            <option value="all">All Dates</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#eee5d9] text-[9px] uppercase tracking-[0.13em] text-[#a09280]">
                <th className="px-5 py-4 font-medium">Event</th>
                <th className="px-4 py-4 font-medium">User</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium">IP Address</th>
                <th className="px-4 py-4 font-medium">Date & Time</th>
                <th className="px-4 py-4 font-medium">Result</th>
                <th className="px-4 py-4 text-right font-medium">Details</th>
              </tr>
            </thead>

            <tbody>
              {paginatedEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b border-[#f1ece4] transition hover:bg-[#fcfaf6]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#eee5d9] bg-[#fcfaf6]">
                        <CategoryIcon category={event.category} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-[#382b20]">
                          {event.action}
                        </p>
                        <p className="mt-1 max-w-[260px] text-[10px] text-[#958875]">
                          {event.description}
                        </p>
                        <p className="mt-1 text-[9px] text-[#b2a694]">
                          {event.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-[10px] text-[#786b5b]">
                    {event.username}
                  </td>

                  <td className="px-4 py-4">
                    <span className="text-[10px] capitalize text-[#786b5b]">
                      {event.category}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-[#786b5b]">
                      <Globe size={12} className="text-[#a09280]" />
                      {event.ipAddress}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-[10px] text-[#958875]">
                    {event.createdAt}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={event.status} />
                  </td>

                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      title="View event details"
                      className="inline-flex h-8 w-8 items-center justify-center text-[#958875] transition hover:bg-[#eee5d6] hover:text-[#a47c43]"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedEvents.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-14 text-center text-[11px] text-[#958875]"
                  >
                    No audit events match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eee5d9] px-5 py-4">
          <p className="text-[10px] text-[#958875]">
            Showing{" "}
            {filteredEvents.length === 0
              ? 0
              : (currentPage - 1) * pageSize + 1}
            {" "}to{" "}
            {Math.min(currentPage * pageSize, filteredEvents.length)}
            {" "}of {filteredEvents.length} events
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              className="flex h-8 w-8 items-center justify-center border border-[#e9dfd0] text-[#786b5b] disabled:opacity-40"
            >
              <ChevronLeft size={15} />
            </button>

            <span className="px-2 text-[10px] text-[#786b5b]">
              {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() =>
                setPage((value) => Math.min(totalPages, value + 1))
              }
              className="flex h-8 w-8 items-center justify-center border border-[#e9dfd0] text-[#786b5b] disabled:opacity-40"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Event detail modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a13]/40 p-4">
          <div className="w-full max-w-lg border border-[#e9dfd0] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eee5d9] px-5 py-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.15em] text-[#a47c43]">
                  Audit Event
                </p>
                <h3 className="mt-1 font-serif text-xl text-[#382b20]">
                  {selectedEvent.action}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="text-[#958875] hover:text-[#382b20]"
              >
                <XCircle size={18} />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#958875]">Result</span>
                <StatusBadge status={selectedEvent.status} />
              </div>

              <DetailRow label="Event ID" value={selectedEvent.id} />
              <DetailRow label="User" value={selectedEvent.username} />
              <DetailRow label="Category" value={selectedEvent.category} />
              <DetailRow label="Description" value={selectedEvent.description} />
              <DetailRow label="IP Address" value={selectedEvent.ipAddress} />
              <DetailRow label="Device / Browser" value={selectedEvent.userAgent} />
              <DetailRow label="Date & Time" value={selectedEvent.createdAt} />
            </div>

            <div className="border-t border-[#eee5d9] px-5 py-4 text-right">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="bg-[#a47c43] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white hover:bg-[#8e6938]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <p className="text-[9px] uppercase tracking-wider text-[#a09280]">
        Security audit · Administrative activity monitoring
      </p>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="border border-[#e9dfd0] bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.13em] text-[#958875]">
          {label}
        </p>
        <Icon size={18} className="text-[#a47c43]" />
      </div>
      <p className="mt-3 font-serif text-3xl text-[#382b20]">{value}</p>
      <p className="mt-1 text-[10px] text-[#a09280]">{description}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[125px_minmax(0,1fr)] gap-3 border-b border-[#f1ece4] pb-3">
      <span className="text-[10px] text-[#958875]">{label}</span>
      <span className="break-words text-[10px] font-medium text-[#382b20]">
        {value}
      </span>
    </div>
  );
}

function ActivityIcon({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <ShieldCheck size={size} className={className} />;
}
