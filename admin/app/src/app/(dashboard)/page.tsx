
import Link from "next/link";
import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  ShieldCheck,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import { db } from "@/lib/server/db";
import { InitializeServer } from "@/lib/server/initialize";

export const instant = false;

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  rootUsers: number;
  todayLogins: number;
  failedLogins: number;
}

interface RecentActivity {
  id: string;
  username: string | null;
  success: boolean;
  ip_address: string | null;
  created_at: Date | string;
}

function formatDate(value: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  accent = "gold",
}: {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
  accent?: "gold" | "green" | "red" | "brown";
}) {
  const accentClasses = {
    gold: "bg-[#f5eddf] text-[#a47c43]",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-red-50 text-red-700",
    brown: "bg-[#eee9e1] text-[#65513b]",
  };

  return (
    <div className="border border-[#e8dfd1] bg-[#fffefa] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-[#817361]">{title}</p>
          <p className="mt-3 font-serif text-3xl text-[#382b20] sm:text-4xl">
            {value}
          </p>
          <p className="mt-2 text-[11px] text-[#9b8d7a]">
            {description}
          </p>
        </div>

        <div className={`flex h-11 w-11 shrink-0 items-center justify-center ${accentClasses[accent]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  await InitializeServer();

  const [statsResult, activityResult] = await Promise.all([
    db.query(`
      SELECT
        COUNT(*)::int AS total_users,
        COUNT(*) FILTER (WHERE is_active = TRUE AND is_locked = FALSE)::int AS active_users,
        COUNT(*) FILTER (WHERE role = 'root')::int AS root_users
      FROM users
    `),

    db.query(`
      SELECT
        COUNT(*) FILTER (
          WHERE success = TRUE
          AND created_at >= CURRENT_DATE
        )::int AS today_logins,

        COUNT(*) FILTER (
          WHERE success = FALSE
          AND created_at >= CURRENT_DATE
        )::int AS failed_logins
      FROM login_audit
    `),
  ]);

  const stats: DashboardStats = {
    totalUsers: statsResult.rows[0]?.total_users ?? 0,
    activeUsers: statsResult.rows[0]?.active_users ?? 0,
    rootUsers: statsResult.rows[0]?.root_users ?? 0,
    todayLogins: activityResult.rows[0]?.today_logins ?? 0,
    failedLogins: activityResult.rows[0]?.failed_logins ?? 0,
  };

  const recentResult = await db.query(`
    SELECT
      id::text,
      username,
      success,
      host(ip_address) AS ip_address,
      created_at
    FROM login_audit
    ORDER BY created_at DESC
    LIMIT 8
  `);

  const recentActivities =
    recentResult.rows as RecentActivity[];

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a47c43]">
            Management Overview
          </p>

          <h1 className="mt-2 font-serif text-3xl text-[#382b20] sm:text-4xl">
            Dashboard
            <span className="italic text-[#b18a50]"> Overview.</span>
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-[#817361]">
            Monitor administrative accounts, access activity and security
            events across your management console.
          </p>
        </div>

        <div className="flex items-center gap-2 border border-[#e8dfd1] bg-[#fffefa] px-4 py-3">
          <Clock3 size={15} className="text-[#a47c43]" />
          <span className="text-xs text-[#817361]">
            {new Intl.DateTimeFormat("en-IN", {
              dateStyle: "full",
            }).format(new Date())}
          </span>
        </div>
      </section>

      {/* Statistics */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#6f5c47]">
            Account Statistics
          </h2>
          <span className="text-[10px] text-[#a09280]">
            Live database figures
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            description="Registered admin accounts"
            icon={Users}
            accent="gold"
          />

          <StatCard
            title="Active Users"
            value={stats.activeUsers}
            description="Enabled and unlocked accounts"
            icon={UserCheck}
            accent="green"
          />

          <StatCard
            title="Today's Successful Logins"
            value={stats.todayLogins}
            description="Successful authentication events"
            icon={ShieldCheck}
            accent="brown"
          />

          <StatCard
            title="Failed Logins Today"
            value={stats.failedLogins}
            description="Unsuccessful authentication events"
            icon={UserX}
            accent="red"
          />
        </div>
      </section>

      {/* Secondary information */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="border border-[#e8dfd1] bg-[#fffefa] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#f5eddf] text-[#a47c43]">
              <ShieldCheck size={19} />
            </div>
            <div>
              <p className="text-xs text-[#817361]">Root Accounts</p>
              <p className="mt-1 text-2xl font-semibold text-[#382b20]">
                {stats.rootUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="border border-[#e8dfd1] bg-[#fffefa] p-5 lg:col-span-2">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-[#382b20]">
                Administrative Access
              </p>
              <p className="mt-1 text-xs leading-5 text-[#817361]">
                Review user accounts and monitor authentication activity.
              </p>
            </div>

            <Link
              href="/users"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#a47c43] transition hover:text-[#382b20]"
            >
              Manage Users
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent activity */}
      <section className="border border-[#e8dfd1] bg-[#fffefa]">
        <div className="flex flex-col justify-between gap-3 border-b border-[#e8dfd1] p-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a47c43]">
              Security Monitoring
            </p>
            <h2 className="mt-1 font-serif text-2xl text-[#382b20]">
              Recent Login Activity
            </h2>
          </div>

          <Link
            href="/activity"
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a47c43] hover:text-[#382b20]"
          >
            View All Activity
            <ArrowRight size={14} />
          </Link>
        </div>

        {recentActivities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-[#eee7dc] bg-[#faf8f3]">
                  <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#948571]">
                    Username
                  </th>
                  <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#948571]">
                    IP Address
                  </th>
                  <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#948571]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#948571]">
                    Date & Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-b border-[#f0ebe3] last:border-0"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-[#382b20]">
                      {activity.username || "Unknown"}
                    </td>

                    <td className="px-6 py-4 font-mono text-xs text-[#817361]">
                      {activity.ip_address || "Unavailable"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] ${
                          activity.success
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {activity.success ? (
                          <ArrowUpRight size={12} />
                        ) : (
                          <ArrowDownRight size={12} />
                        )}
                        {activity.success ? "Successful" : "Failed"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-[#817361]">
                      {formatDate(activity.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-14 text-center">
            <Activity
              size={26}
              className="mx-auto text-[#b9a98f]"
            />
            <p className="mt-3 text-sm font-medium text-[#382b20]">
              No login activity yet
            </p>
            <p className="mt-1 text-xs text-[#9b8d7a]">
              Authentication events will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
