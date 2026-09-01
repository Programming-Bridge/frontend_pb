"use client";

import { useState } from "react";
import {
  User,
  Key,
  Server,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import type { User as UserType } from "@/app/services/authService";
import { changePassword } from "@/app/services/authService";

interface SettingsTabProps {
  currentUser: UserType | null;
  onShowAlert: (type: "success" | "error", msg: string) => void;
}

export function SettingsTab({ currentUser, onShowAlert }: SettingsTabProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      onShowAlert("error", "New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      onShowAlert("error", "New password must be at least 6 characters long.");
      return;
    }

    setIsSubmitting(true);
    try {
      await changePassword({ currentPassword, newPassword });
      onShowAlert("success", "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to update password.";
      onShowAlert("error", msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-lg font-extrabold text-foreground tracking-tight">
          Admin Settings & Security
        </h2>
        <p className="text-xs text-foreground-muted">
          Manage admin profile credentials, authentication tokens, and system health status
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 1. Admin Profile Card */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-foreground">Active Admin Session</h3>
              <p className="text-xs text-foreground-muted">Current administrator details</p>
            </div>
          </div>

          <div className="space-y-3 rounded-xl border border-border bg-surface/50 p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-foreground-muted">Name:</span>
              <span className="font-bold text-foreground">{currentUser?.name || "Administrator"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground-muted">Email:</span>
              <span className="font-bold text-foreground">{currentUser?.email || "admin@programmingbridge.org"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground-muted">Role Permission:</span>
              <span className="rounded-md bg-brand/15 px-2 py-0.5 font-bold uppercase tracking-wide text-brand text-[10px]">
                {currentUser?.role || "superadmin"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-foreground-muted">Account Status:</span>
              <span className="flex items-center gap-1 font-bold text-emerald-500">
                <CheckCircle2 className="h-3 w-3" />
                <span>Active & Verified</span>
              </span>
            </div>
          </div>

          {/* System API Diagnostics */}
          <div className="space-y-2 pt-2 border-t border-border">
            <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-brand" />
              <span>Production Environment Details</span>
            </h4>
            <div className="space-y-1 text-[11px] text-foreground-muted">
              <div className="flex justify-between">
                <span>Frontend Framework:</span>
                <span className="text-foreground font-mono">Next.js 16 (Turbopack)</span>
              </div>
              <div className="flex justify-between">
                <span>Backend Engine:</span>
                <span className="text-foreground font-mono">Node.js + Express REST API</span>
              </div>
              <div className="flex justify-between">
                <span>Database Cluster:</span>
                <span className="text-foreground font-mono">MongoDB Atlas Production</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Password Change Form */}
        <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-foreground">Update Password</h3>
              <p className="text-xs text-foreground-muted">Enhance account security</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-foreground">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Updating Credentials...</span>
                </>
              ) : (
                <span>Update Password</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
