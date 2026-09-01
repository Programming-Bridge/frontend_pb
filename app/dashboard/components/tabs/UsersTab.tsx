"use client";

import { useState, useMemo } from "react";
import type { User } from "@/app/services/authService";
import {
  UserPlus,
  ShieldCheck,
  Shield,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  User as UserIcon,
} from "lucide-react";
import { EmptyState } from "../ui/EmptyState";

interface UsersTabProps {
  users: User[];
  currentUser: User | null;
  onOpenCreate: () => void;
  onOpenEdit: (user: User) => void;
  onDelete: (id: string, name: string) => void;
  searchQuery: string;
}

export function UsersTab({
  users,
  currentUser,
  onOpenCreate,
  onOpenEdit,
  onDelete,
  searchQuery,
}: UsersTabProps) {
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.role?.toLowerCase().includes(q);

      const matchesRole =
        roleFilter === "all" || u.role?.toLowerCase() === roleFilter.toLowerCase();

      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  const roles = ["all", "superadmin", "admin", "editor"];

  const getRoleBadge = (role: string) => {
    switch (role?.toLowerCase()) {
      case "superadmin":
        return {
          label: "Superadmin",
          className: "bg-brand/15 text-brand border-brand/30",
          icon: ShieldCheck,
        };
      case "admin":
        return {
          label: "Admin",
          className: "bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 border-cyan-500/30",
          icon: Shield,
        };
      default:
        return {
          label: "Editor",
          className: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
          icon: UserIcon,
        };
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Never";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab Header & Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2.5">
            <span>Admin Users & Access Control</span>
            <span className="rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-xs font-bold text-brand">
              {users.length}
            </span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-foreground-muted">
            Manage authorized system administrators, assign permission roles, and control active status.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreate}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shrink-0"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Role Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {roles.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRoleFilter(r)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
              roleFilter === r
                ? "bg-brand text-black font-bold shadow-xs"
                : "border border-border bg-surface text-foreground-muted hover:text-foreground"
            }`}
          >
            {r === "all" ? "All Roles" : r}
          </button>
        ))}
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState
          icon={UserPlus}
          title="No Users Found"
          description="Add administrators to grant them access to the agency console."
          actionLabel="Add New User"
          onAction={onOpenCreate}
        />
      ) : (
        <>
          {/* Mobile Card List (Screen < 768px) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredUsers.map((u) => {
              const uId = u._id || u.id || "";
              const roleInfo = getRoleBadge(u.role);
              const RoleIcon = roleInfo.icon;
              const isSelf = currentUser?._id === uId || currentUser?.id === uId;

              return (
                <div
                  key={uId}
                  className="rounded-2xl border border-border bg-card p-4 space-y-3 transition-all hover:border-brand/30"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand font-black text-sm">
                        {u.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-foreground truncate">
                            {u.name}
                          </span>
                          {isSelf && (
                            <span className="rounded-md bg-brand/10 border border-brand/20 px-1.5 py-0.2 text-[9px] font-bold text-brand uppercase tracking-wider">
                              You
                            </span>
                          )}
                        </div>
                        <span className="block text-xs text-foreground-muted truncate">
                          {u.email}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onOpenEdit(u)}
                        className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                        title="Edit User"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      {!isSelf && (
                        <button
                          type="button"
                          onClick={() => onDelete(uId, u.name)}
                          className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-2.5 text-xs">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${roleInfo.className}`}
                    >
                      <RoleIcon className="h-3 w-3" />
                      <span>{roleInfo.label}</span>
                    </span>

                    <div className="flex items-center gap-1.5 text-foreground-subtle text-[11px]">
                      {u.isActive !== false ? (
                        <span className="inline-flex items-center gap-1 text-emerald-500 font-semibold">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-500 font-semibold">
                          <XCircle className="h-3 w-3" />
                          <span>Suspended</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Data Table (Screen >= 768px) */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-border bg-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-border bg-surface/70 text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                  <tr>
                    <th className="px-5 py-3.5">User</th>
                    <th className="px-5 py-3.5">Email Address</th>
                    <th className="px-5 py-3.5">Assigned Role</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Last Login</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredUsers.map((u) => {
                    const uId = u._id || u.id || "";
                    const roleInfo = getRoleBadge(u.role);
                    const RoleIcon = roleInfo.icon;
                    const isSelf = currentUser?._id === uId || currentUser?.id === uId;

                    return (
                      <tr
                        key={uId}
                        className="transition-colors hover:bg-surface/50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand font-black text-xs">
                              {u.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-foreground">
                                  {u.name}
                                </span>
                                {isSelf && (
                                  <span className="rounded-md bg-brand/10 border border-brand/20 px-1.5 py-0.2 text-[9px] font-bold text-brand uppercase tracking-wider">
                                    You
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-foreground-subtle">
                                Added {formatDate(u.createdAt)}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-foreground-muted font-mono text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Mail className="h-3 w-3 text-foreground-subtle" />
                            <span>{u.email}</span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${roleInfo.className}`}
                          >
                            <RoleIcon className="h-3 w-3" />
                            <span>{roleInfo.label}</span>
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          {u.isActive !== false ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Active</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-500">
                              <XCircle className="h-3 w-3" />
                              <span>Suspended</span>
                            </span>
                          )}
                        </td>

                        <td className="px-5 py-4 text-foreground-subtle">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 text-foreground-subtle" />
                            <span>{formatDate(u.lastLogin)}</span>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => onOpenEdit(u)}
                              className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                              title="Edit User"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            {!isSelf && (
                              <button
                                type="button"
                                onClick={() => onDelete(uId, u.name)}
                                className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                                title="Delete User"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
