"use client";

import { useState, useEffect } from "react";
import type { User } from "@/app/services/authService";
import { X, UserPlus, ShieldCheck, Lock, Mail, User as UserIcon, Check } from "lucide-react";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    password?: string;
    role: "superadmin" | "admin" | "editor";
    isActive: boolean;
  }) => Promise<void>;
  initialData: User | null;
  isSubmitting: boolean;
}

export function UserModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting,
}: UserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"superadmin" | "admin" | "editor">("admin");
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState("");

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
      setPassword("");
      setRole((initialData.role as any) || "admin");
      setIsActive(initialData.isActive !== false);
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setRole("admin");
      setIsActive(true);
    }
    setFormError("");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError("Please enter user's full name.");
      return;
    }
    if (!email.trim()) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!isEditing && (!password || password.length < 6)) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }
    if (isEditing && password && password.length < 6) {
      setFormError("New password must be at least 6 characters long.");
      return;
    }

    try {
      await onSubmit({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password ? password : undefined,
        role,
        isActive,
      });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to save user.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand/15 text-brand">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                {isEditing ? "Edit Administrator" : "Add New Administrator"}
              </h3>
              <p className="text-xs text-foreground-muted">
                {isEditing
                  ? "Update permission role, active status, or reset credentials."
                  : "Create an administrator account with specific dashboard access."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-500 font-semibold">
              {formError}
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Full Name</label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Hasnain Iqbal"
                className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-xs text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Email Address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
              <input
                type="email"
                required
                disabled={isEditing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@programmingbridge.org"
                className={`h-10 w-full rounded-xl border border-border pl-10 pr-3 text-xs text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none transition-all ${
                  isEditing ? "bg-surface/50 opacity-70 cursor-not-allowed" : "bg-surface"
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground">
                {isEditing ? "Reset Password (Optional)" : "Password"}
              </label>
              {isEditing && (
                <span className="text-[10px] text-foreground-subtle">
                  Leave empty to keep current password
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle" />
              <input
                type="password"
                required={!isEditing}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isEditing ? "Enter new password to reset" : "Minimum 6 characters"}
                className="h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-3 text-xs text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Role Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Permission Role</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "superadmin", label: "Superadmin", desc: "Full root access" },
                { id: "admin", label: "Admin", desc: "Manage content" },
                { id: "editor", label: "Editor", desc: "Read & edit" },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id as any)}
                  className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all cursor-pointer ${
                    role === r.id
                      ? "border-brand bg-brand/10 text-brand shadow-xs"
                      : "border-border bg-surface text-foreground-muted hover:border-brand/30"
                  }`}
                >
                  <span className="text-xs font-extrabold capitalize text-foreground">
                    {r.label}
                  </span>
                  <span className="text-[10px] text-foreground-subtle">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface/50 p-3">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-foreground">Account Status</span>
              <span className="text-[10px] text-foreground-subtle">
                Active users can sign in and manage dashboard records
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                isActive ? "bg-brand" : "bg-border"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                  isActive ? "translate-x-6 bg-black" : "translate-x-1 bg-foreground-muted"
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-bold text-black shadow-md shadow-brand/20 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && (
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
              )}
              <span>{isEditing ? "Save Changes" : "Create Administrator"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
