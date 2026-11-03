"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search, Plus, Users, ShieldCheck, UserCheck, UserX, MoreHorizontal,
  Pencil, LockKeyhole, ChevronLeft, ChevronRight, Filter, Download,
  UnlockKeyhole, Trash2, RefreshCw, X, AlertCircle,
} from "lucide-react";
import { systemGraphQL } from "@/lib/graphql/system-client";

 type UserRole = "superadmin" | "admin" | "manager" | "editor" | "publisher" | "media_manager" | "hr" | "staff";
type UserStatus = "Active" | "Inactive" | "Locked";
type ApiUser = {
  id: string; username: string; email: string | null; role: UserRole;
  isActive: boolean; isLocked: boolean; lastLoginAt: string | null; createdAt: string;
};
type AdminUser = ApiUser & { status: UserStatus; lastLoginLabel: string; createdLabel: string };
type UserPageResponse = { users: { items: ApiUser[]; total: number; page: number; pageSize: number; totalPages: number } };
type UserStatsResponse = { userStats: { total: number; active: number; inactive: number; locked: number } };
type ActionResponse = { blockUser?: ApiUser; unblockUser?: ApiUser; deleteUser?: boolean };

const USERS_QUERY = `query Users($search: String, $role: String, $status: String, $page: Int, $pageSize: Int) {
  users(search: $search, role: $role, status: $status, page: $page, pageSize: $pageSize) {
    items { id username email role isActive isLocked lastLoginAt createdAt }
    total page pageSize totalPages
  }
}`;
const USER_STATS_QUERY = `query UserStats { userStats { total active inactive locked } }`;
const BLOCK_USER = `mutation BlockUser($id: ID!, $reason: String) { blockUser(id: $id, reason: $reason) { id username isActive isLocked } }`;
const UNBLOCK_USER = `mutation UnblockUser($id: ID!) { unblockUser(id: $id) { id username isActive isLocked } }`;
const DELETE_USER = `mutation DeleteUser($id: ID!) { deleteUser(id: $id) }`;

const ROLE_LABELS: Record<UserRole, string> = {
  superadmin: "Super Admin", admin: "Administrator", manager: "Manager",
  editor: "Editor", publisher: "Publisher", media_manager: "Media Manager", hr: "HR", staff: "Staff",
};

function getStatus(user: ApiUser): UserStatus {
  if (user.isLocked) return "Locked";
  return user.isActive ? "Active" : "Inactive";
}
function formatDate(value: string | null, fallback = "Never") {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toLocaleString();
}
function StatusBadge({ status }: { status: UserStatus }) {
  const styles: Record<UserStatus, string> = {
    Active: "bg-[#eaf1e9] text-[#58765d]",
    Inactive: "bg-[#f3eee5] text-[#9b8053]",
    Locked: "bg-[#f8e9e5] text-[#a45e4d]",
  };
  return <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider ${styles[status]}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current" />{status}
  </span>;
}

export default function UsersManagement() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [summary, setSummary] = useState({ total: 0, active: 0, inactive: 0, locked: 0 });
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [actionBusy, setActionBusy] = useState<string | null>(null);
  const [menuUserId, setMenuUserId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ user: AdminUser; action: "block" | "unblock" | "delete" } | null>(null);
  const pageSize = 8;

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [pageData, statsData] = await Promise.all([
        systemGraphQL<UserPageResponse>(USERS_QUERY, {
          search: search.trim() || null,
          role: roleFilter === "all" ? null : roleFilter,
          status: statusFilter === "all" ? null : statusFilter,
          page,
          pageSize,
        }),
        systemGraphQL<UserStatsResponse>(USER_STATS_QUERY),
      ]);
      setUsers(pageData.users.items.map((user) => ({
        ...user,
        status: getStatus(user),
        lastLoginLabel: formatDate(user.lastLoginAt),
        createdLabel: formatDate(user.createdAt, "—").split(",")[0],
      })));
      setTotal(pageData.users.total);
      setTotalPages(Math.max(1, pageData.users.totalPages));
      setSummary(statsData.userStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load users.");
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter, page]);

  useEffect(() => { void loadUsers(); }, [loadUsers]);

  const runAction = async () => {
    if (!confirmAction) return;
    const { user, action } = confirmAction;
    setActionBusy(user.id);
    setActionError("");
    try {
      if (action === "block") await systemGraphQL<ActionResponse>(BLOCK_USER, { id: user.id, reason: "Blocked by system administrator" });
      if (action === "unblock") await systemGraphQL<ActionResponse>(UNBLOCK_USER, { id: user.id });
      if (action === "delete") await systemGraphQL<ActionResponse>(DELETE_USER, { id: user.id });
      setConfirmAction(null);
      setMenuUserId(null);
      await loadUsers();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "The account action failed.");
    } finally {
      setActionBusy(null);
    }
  };

  const exportUsers = () => {
    const header = ["ID", "Username", "Email", "Role", "Status", "Last Login", "Created"];
    const rows = users.map((user) => [user.id, user.username, user.email ?? "", user.role, user.status, user.lastLoginAt ?? "", user.createdAt]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = `shalimar-users-page-${page}.csv`; anchor.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-[#a47c43]"><Users size={13} />System Administration</div>
          <h1 className="font-serif text-3xl font-normal text-[#382b20]">User Management</h1>
          <p className="mt-2 text-[12px] text-[#958875]">Manage administrator accounts, roles and access status.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => void loadUsers()} className="inline-flex items-center gap-2 border border-[#e9dfd0] bg-white px-3 py-3 text-[10px] uppercase tracking-wider text-[#786b5b] hover:border-[#b18a50]" title="Refresh"><RefreshCw size={14} /></button>
          <Link href="/system/users/new" className="inline-flex items-center gap-2 bg-[#a47c43] px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-white transition hover:bg-[#8e6938]"><Plus size={15} />Add User</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total Users" value={summary.total} icon={Users} description="Registered accounts" />
        <SummaryCard label="Active Users" value={summary.active} icon={UserCheck} description="Can access the console" />
        <SummaryCard label="Inactive Users" value={summary.inactive} icon={UserX} description="Disabled accounts" />
        <SummaryCard label="Locked Users" value={summary.locked} icon={LockKeyhole} description="Locked accounts" />
      </div>

      {(error || actionError) && <div role="alert" className="flex items-start gap-2 border border-[#e7c9c1] bg-[#fff7f5] p-3 text-[11px] text-[#9b4d3e]"><AlertCircle size={15} className="mt-0.5 shrink-0" /><span>{actionError || error}</span><button type="button" className="ml-auto" onClick={() => { setError(""); setActionError(""); }}><X size={14} /></button></div>}

      <section className="border border-[#e9dfd0] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eee5d9] px-5 py-4">
          <div><h2 className="font-serif text-lg text-[#382b20]">User Directory</h2><p className="mt-1 text-[10px] text-[#958875]">{total} account(s) found</p></div>
          <button type="button" onClick={exportUsers} disabled={!users.length} className="inline-flex items-center gap-2 border border-[#e9dfd0] px-3 py-2 text-[10px] uppercase tracking-wider text-[#786b5b] transition hover:border-[#b18a50] disabled:opacity-40"><Download size={14} />Export page</button>
        </div>
        <div className="grid gap-3 border-b border-[#eee5d9] bg-[#fcfaf6] p-4 md:grid-cols-[minmax(220px,1fr)_180px_160px]">
          <div className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a09280]" /><input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search username or email..." className="h-10 w-full border border-[#e9dfd0] bg-white pl-9 pr-3 text-[11px] text-[#382b20] outline-none placeholder:text-[#b2a694] focus:border-[#b18a50]" /></div>
          <div className="relative"><Filter size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#a09280]" /><select value={roleFilter} onChange={(event) => { setRoleFilter(event.target.value); setPage(1); }} className="h-10 w-full appearance-none border border-[#e9dfd0] bg-white pl-9 pr-3 text-[11px] text-[#786b5b] outline-none focus:border-[#b18a50]"><option value="all">All Roles</option>{Object.entries(ROLE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
          <select value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} className="h-10 border border-[#e9dfd0] bg-white px-3 text-[11px] text-[#786b5b] outline-none focus:border-[#b18a50]"><option value="all">All Statuses</option><option value="active">Active</option><option value="inactive">Inactive</option><option value="locked">Locked</option></select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-left">
            <thead><tr className="border-b border-[#eee5d9] bg-white text-[9px] uppercase tracking-[0.13em] text-[#a09280]"><th className="px-5 py-4 font-medium">User</th><th className="px-4 py-4 font-medium">Role</th><th className="px-4 py-4 font-medium">Status</th><th className="px-4 py-4 font-medium">Last Login</th><th className="px-4 py-4 font-medium">Created</th><th className="px-4 py-4 text-right font-medium">Actions</th></tr></thead>
            <tbody>
              {loading && <tr><td colSpan={6} className="px-5 py-14 text-center text-[11px] text-[#958875]">Loading users…</td></tr>}
              {!loading && users.map((user) => <tr key={user.id} className="border-b border-[#f1ece4] transition hover:bg-[#fcfaf6]">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e4d6c2] bg-[#eee5d6] font-serif text-sm text-[#8b673b]">{user.username.charAt(0).toUpperCase()}</div><div className="min-w-0"><p className="text-[11px] font-semibold text-[#382b20]">{user.username}</p><p className="mt-1 text-[10px] text-[#958875]">{user.email || "—"}</p><p className="mt-1 text-[9px] text-[#b2a694]">{user.id}</p></div></div></td>
                <td className="px-4 py-4"><span className="inline-flex items-center gap-1.5 text-[10px] text-[#786b5b]">{user.role === "superadmin" && <ShieldCheck size={14} className="text-[#a47c43]" />}{ROLE_LABELS[user.role] ?? user.role}</span></td>
                <td className="px-4 py-4"><StatusBadge status={user.status} /></td><td className="px-4 py-4 text-[10px] text-[#786b5b]">{user.lastLoginLabel}</td><td className="px-4 py-4 text-[10px] text-[#958875]">{user.createdLabel}</td>
                <td className="px-4 py-4"><div className="relative flex justify-end gap-1"><Link href={`/system/users/${user.id}`} title="Edit user" className="flex h-8 w-8 items-center justify-center text-[#958875] transition hover:bg-[#eee5d6] hover:text-[#a47c43]"><Pencil size={14} /></Link><button type="button" title={user.isLocked || !user.isActive ? "Unblock user" : "Block user"} disabled={user.role === "superadmin" || actionBusy === user.id} onClick={() => setConfirmAction({ user, action: user.isLocked || !user.isActive ? "unblock" : "block" })} className="flex h-8 w-8 items-center justify-center text-[#958875] transition hover:bg-[#eee5d6] hover:text-[#a47c43] disabled:opacity-30">{user.isLocked || !user.isActive ? <UnlockKeyhole size={14} /> : <LockKeyhole size={14} />}</button><button type="button" title="More actions" onClick={() => setMenuUserId(menuUserId === user.id ? null : user.id)} className="flex h-8 w-8 items-center justify-center text-[#958875] transition hover:bg-[#eee5d6] hover:text-[#a47c43]"><MoreHorizontal size={16} /></button>
                  {menuUserId === user.id && <div className="absolute right-0 top-9 z-20 w-40 border border-[#e9dfd0] bg-white py-1 shadow-lg"><button type="button" disabled={user.role === "superadmin"} onClick={() => { setConfirmAction({ user, action: "delete" }); setMenuUserId(null); }} className="flex w-full items-center gap-2 px-3 py-2 text-left text-[10px] text-[#a45e4d] hover:bg-[#fcf5f2] disabled:opacity-30"><Trash2 size={13} />Delete account</button></div>}
                </div></td>
              </tr>)}
              {!loading && users.length === 0 && <tr><td colSpan={6} className="px-5 py-14 text-center text-[11px] text-[#958875]">No users match your search or filters.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eee5d9] px-5 py-4"><p className="text-[10px] text-[#958875]">Showing {total === 0 ? 0 : (page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} users</p><div className="flex items-center gap-2"><button type="button" disabled={page <= 1 || loading} onClick={() => setPage((value) => Math.max(1, value - 1))} className="flex h-8 w-8 items-center justify-center border border-[#e9dfd0] text-[#786b5b] disabled:opacity-40"><ChevronLeft size={15} /></button><span className="px-2 text-[10px] text-[#786b5b]">{page} / {totalPages}</span><button type="button" disabled={page >= totalPages || loading} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} className="flex h-8 w-8 items-center justify-center border border-[#e9dfd0] text-[#786b5b] disabled:opacity-40"><ChevronRight size={15} /></button></div></div>
      </section>

      {confirmAction && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#211a13]/40 p-4"><div role="dialog" aria-modal="true" aria-labelledby="user-action-title" className="w-full max-w-md border border-[#e9dfd0] bg-white p-5 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-[9px] uppercase tracking-[0.15em] text-[#a47c43]">Confirm account action</p><h3 id="user-action-title" className="mt-1 font-serif text-xl text-[#382b20]">{confirmAction.action === "delete" ? "Delete user?" : confirmAction.action === "block" ? "Block user?" : "Unblock user?"}</h3></div><button type="button" onClick={() => setConfirmAction(null)} className="text-[#958875]"><X size={18} /></button></div><p className="mt-3 text-[11px] leading-relaxed text-[#786b5b]">{confirmAction.action === "delete" ? `This will deactivate and soft-delete ${confirmAction.user.username}. Their audit history will be retained.` : confirmAction.action === "block" ? `${confirmAction.user.username} will lose access and their active sessions will be revoked.` : `${confirmAction.user.username} will be reactivated and unlocked.`}</p>{actionError && <p className="mt-3 text-[10px] text-[#a45e4d]">{actionError}</p>}<div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setConfirmAction(null)} className="border border-[#e9dfd0] px-4 py-2 text-[10px] uppercase tracking-wider text-[#786b5b]">Cancel</button><button type="button" disabled={!!actionBusy} onClick={() => void runAction()} className="bg-[#a47c43] px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-white disabled:opacity-50">{actionBusy ? "Please wait…" : "Confirm"}</button></div></div></div>}

      <p className="text-[9px] uppercase tracking-wider text-[#a09280]">User accounts · Role-based access management</p>
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, description }: { label: string; value: number; icon: React.ElementType; description: string }) {
  return <div className="border border-[#e9dfd0] bg-white p-5"><div className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-[0.13em] text-[#958875]">{label}</p><Icon size={18} className="text-[#a47c43]" /></div><p className="mt-3 font-serif text-3xl text-[#382b20]">{value}</p><p className="mt-1 text-[10px] text-[#a09280]">{description}</p></div>;
}
