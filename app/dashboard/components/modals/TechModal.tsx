"use client";

import { X, Loader2, Code2 } from "lucide-react";
import type { TechStackItem } from "@/app/data/techStackData";

interface TechModalProps {
  isOpen: boolean;
  onClose: () => void;
  tech: TechStackItem | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
}

export function TechModal({
  isOpen,
  onClose,
  tech,
  onSubmit,
  isSubmitting,
}: TechModalProps) {
  if (!isOpen) return null;

  const isEdit = Boolean((tech as any)?._id || tech?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Code2 className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                {isEdit ? "Edit Technology" : "Add Technology"}
              </h3>
              <p className="text-xs text-foreground-muted">
                Add framework, library, or engineering tool to the tech stack
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
              <label className="text-xs font-bold text-foreground">Tech Name *</label>
              <input
                type="text"
                name="name"
                required
                defaultValue={tech?.name || ""}
                placeholder="e.g. Next.js, PyTorch, Flutter"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Domain / Track *</label>
              <select
                name="domain"
                required
                defaultValue={tech?.domain || "software"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              >
                <option value="software">Software Engineering (Web & Cloud)</option>
                <option value="ai-ml">AI, ML & Data Science</option>
                <option value="mobile">Native & Cross-Platform Mobile</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Category Group</label>
              <input
                type="text"
                name="category"
                defaultValue={tech?.category || "Frontend"}
                placeholder="e.g. Frontend, Backend, Database, Cloud"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Category Label</label>
              <input
                type="text"
                name="categoryLabel"
                defaultValue={tech?.categoryLabel || "Framework"}
                placeholder="e.g. Web Framework"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">SVG Icon URL or Raw URL *</label>
            <input
              type="text"
              name="svgUrl"
              required
              defaultValue={tech?.svgUrl || ""}
              placeholder="e.g. https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-foreground">Badge / Pill Text</label>
              <input
                type="text"
                name="badge"
                defaultValue={tech?.badge || "Enterprise"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Display Order</label>
              <input
                type="number"
                name="order"
                defaultValue={tech?.order ?? 1}
                min={0}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Short Description</label>
            <input
              type="text"
              name="shortDesc"
              defaultValue={tech?.shortDesc || ""}
              placeholder="e.g. Production React Framework with Server Components"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Key Architecture Highlight</label>
            <input
              type="text"
              name="highlight"
              defaultValue={tech?.highlight || ""}
              placeholder="e.g. Hybrid SSR/SSG with sub-100ms Edge rendering"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="invertInDark"
                id="tech-invertInDark"
                defaultChecked={tech?.invertInDark === true}
                className="h-4 w-4 rounded accent-brand"
              />
              <label htmlFor="tech-invertInDark" className="text-xs font-semibold text-foreground cursor-pointer">
                Invert Icon in Dark Mode (e.g. Next.js / GitHub)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                id="tech-isActive"
                defaultChecked={tech?.isActive !== false}
                className="h-4 w-4 rounded accent-brand"
              />
              <label htmlFor="tech-isActive" className="text-xs font-semibold text-foreground cursor-pointer">
                Active / Published
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
                <span>{isEdit ? "Update Tech" : "Save Tech"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
