"use client";

import { X, Loader2, Users } from "lucide-react";
import type { TeamMember } from "@/app/services/teamService";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
}

export function TeamModal({
  isOpen,
  onClose,
  member,
  onSubmit,
  isSubmitting,
}: TeamModalProps) {
  if (!isOpen) return null;

  const isEdit = Boolean(member?._id || member?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                {isEdit ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <p className="text-xs text-foreground-muted">
                Manage engineer profile, credentials, and social links
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-foreground-muted hover:bg-surface-hover hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-foreground">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                defaultValue={member?.name || ""}
                placeholder="e.g. Usama Khan"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Role / Designation *</label>
              <input
                type="text"
                name="role"
                required
                defaultValue={member?.role || ""}
                placeholder="e.g. Lead Software Architect & Founder"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Department *</label>
              <select
                name="department"
                required
                defaultValue={member?.department || "Web & Cloud"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              >
                <option value="Web & Cloud">Web & Cloud</option>
                <option value="Mobile Engineering">Mobile Engineering</option>
                <option value="AI & Data">AI & Data</option>
                <option value="DevOps & Security">DevOps & Security</option>
                <option value="Executive Leadership">Executive Leadership</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Experience Tenure</label>
              <input
                type="text"
                name="experience"
                defaultValue={member?.experience || "7+ Years"}
                placeholder="e.g. 7+ Years"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Avatar Image URL *</label>
            <input
              type="text"
              name="avatar"
              required
              defaultValue={member?.avatar || ""}
              placeholder="https://images.unsplash.com/..."
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Bio / Engineering Focus</label>
            <textarea
              name="bio"
              rows={3}
              defaultValue={member?.bio || ""}
              placeholder="Specialization, technical passions, and background..."
              className="mt-1 w-full rounded-xl border border-border bg-surface p-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Core Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              defaultValue={member?.skills?.join(", ") || ""}
              placeholder="e.g. Next.js 15, TypeScript, Node.js, PostgreSQL, Docker, AWS"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="text-xs font-bold text-foreground">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                defaultValue={member?.socialLinks?.linkedin || ""}
                placeholder="https://linkedin.com/in/..."
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">GitHub URL</label>
              <input
                type="url"
                name="github"
                defaultValue={member?.socialLinks?.github || ""}
                placeholder="https://github.com/..."
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Direct Email</label>
              <input
                type="email"
                name="email"
                defaultValue={member?.socialLinks?.email || ""}
                placeholder="engineer@programmingbridge.org"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                id="team-featured"
                defaultChecked={member?.featured === true}
                className="h-4 w-4 rounded accent-brand"
              />
              <label htmlFor="team-featured" className="text-xs font-semibold text-foreground cursor-pointer">
                Highlight on Homepage / Leadership
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                id="team-isActive"
                defaultChecked={member?.isActive !== false}
                className="h-4 w-4 rounded accent-brand"
              />
              <label htmlFor="team-isActive" className="text-xs font-semibold text-foreground cursor-pointer">
                Active / Visible on Team Page
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-hover"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-bold text-black shadow-md shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEdit ? "Update Member" : "Add Member"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
