"use client";

import { X, Loader2, FileText } from "lucide-react";
import type { Career } from "@/app/services/careerService";

interface CareerModalProps {
  isOpen: boolean;
  onClose: () => void;
  career: Career | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
}

export function CareerModal({
  isOpen,
  onClose,
  career,
  onSubmit,
  isSubmitting,
}: CareerModalProps) {
  if (!isOpen) return null;

  const isEdit = Boolean(career?._id || career?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                {isEdit ? "Edit Job Opening" : "Create Job Opening"}
              </h3>
              <p className="text-xs text-foreground-muted">
                Post new career vacancy, specify qualifications, and accept applicants
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
              <label className="text-xs font-bold text-foreground">Job Title *</label>
              <input
                type="text"
                name="title"
                required
                defaultValue={career?.title || ""}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Department *</label>
              <select
                name="department"
                required
                defaultValue={career?.department || "Engineering"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="AI & Data">AI & Data Science</option>
                <option value="Mobile Engineering">Mobile Engineering</option>
                <option value="DevOps & Cloud">DevOps & Cloud</option>
                <option value="Product & Design">Product & Design</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Employment Type</label>
              <select
                name="type"
                defaultValue={career?.type || "Full-Time (Remote)"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              >
                <option value="Full-Time (Remote)">Full-Time (Remote)</option>
                <option value="Full-Time (Hybrid)">Full-Time (Hybrid)</option>
                <option value="Full-Time (Onsite)">Full-Time (Onsite)</option>
                <option value="Contract / Fractional">Contract / Fractional</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={career?.location || "Remote / Global"}
                placeholder="e.g. Global Remote or Islamabad / PK"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Experience Level</label>
              <input
                type="text"
                name="experience"
                defaultValue={career?.experience || "3-5 Years"}
                placeholder="e.g. 3+ Years Experience"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Salary / Compensation Range</label>
              <input
                type="text"
                name="salaryRange"
                defaultValue={career?.salaryRange || "$40,000 - $70,000 / year"}
                placeholder="e.g. Competitive / Market Leading"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Role Description & Overview *</label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={career?.description || ""}
              placeholder="Describe the mission, impact, and day-to-day work of this role..."
              className="mt-1 w-full rounded-xl border border-border bg-surface p-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Required Skills & Technologies (comma separated)</label>
            <input
              type="text"
              name="skills"
              defaultValue={career?.skills?.join(", ") || ""}
              placeholder="e.g. React 19, Next.js, TypeScript, Node.js, PostgreSQL, GraphQL"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isOpen"
                id="career-isOpen"
                defaultChecked={career?.isOpen !== false}
                className="h-4 w-4 rounded accent-brand"
              />
              <label htmlFor="career-isOpen" className="text-xs font-semibold text-foreground cursor-pointer">
                Actively Accepting Candidates
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                id="career-isActive"
                defaultChecked={career?.isActive !== false}
                className="h-4 w-4 rounded accent-brand"
              />
              <label htmlFor="career-isActive" className="text-xs font-semibold text-foreground cursor-pointer">
                Active / Published on Careers Page
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
                <span>{isEdit ? "Update Job Opening" : "Publish Job Opening"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
