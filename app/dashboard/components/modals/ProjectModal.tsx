"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, Loader2, Briefcase } from "lucide-react";
import type { Project } from "@/app/services/projectService";
import { getMediaUrl } from "@/app/services/apiClient";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, uploadedFile: File | null) => Promise<void>;
  isSubmitting: boolean;
}

export function ProjectModal({
  isOpen,
  onClose,
  project,
  onSubmit,
  isSubmitting,
}: ProjectModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (project) {
      const img = project.image || project.img || project.imageUrl;
      setPreviewUrl(img ? getMediaUrl(img) : "");
    } else {
      setPreviewUrl("");
    }
    setUploadedFile(null);
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const isEdit = Boolean(project?._id || project?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Briefcase className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                {isEdit ? "Edit Project" : "Add Portfolio Project"}
              </h3>
              <p className="text-xs text-foreground-muted">
                Showcase case studies, technologies used, and client achievements
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

        <form onSubmit={(e) => onSubmit(e, uploadedFile)} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-foreground">Project Title *</label>
              <input
                type="text"
                name="title"
                required
                defaultValue={project?.title || ""}
                placeholder="e.g. CloudScale SaaS Architecture"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Client / Organization</label>
              <input
                type="text"
                name="client"
                defaultValue={project?.client || ""}
                placeholder="e.g. TechCorp Global"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Category</label>
              <select
                name="category"
                defaultValue={project?.category || "Web Engineering"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              >
                <option value="Web Engineering">Web Engineering</option>
                <option value="Mobile Applications">Mobile Applications</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                <option value="Enterprise Systems">Enterprise Systems</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Badge / Tag</label>
              <input
                type="text"
                name="badge"
                defaultValue={project?.badge || "Enterprise Case Study"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              defaultValue={project?.shortDescription || ""}
              placeholder="High-level 1-sentence value summary"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Full Description / Case Study Details *</label>
            <textarea
              name="description"
              required
              rows={4}
              defaultValue={project?.description || ""}
              placeholder="Detailed architecture overview, problem solved, metrics achieved..."
              className="mt-1 w-full rounded-xl border border-border bg-surface p-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-foreground">Live URL</label>
              <input
                type="url"
                name="liveUrl"
                defaultValue={project?.liveUrl || project?.liveLink || ""}
                placeholder="https://client-demo.com"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">GitHub / Code Repository</label>
              <input
                type="url"
                name="githubUrl"
                defaultValue={project?.githubUrl || project?.gitLink || ""}
                placeholder="https://github.com/..."
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Technologies Used (comma separated)</label>
            <input
              type="text"
              name="technologies"
              defaultValue={project?.technologies?.join(", ") || ""}
              placeholder="e.g. Next.js 15, TypeScript, Node.js, PostgreSQL, Docker, AWS"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          {/* Project Cover Image */}
          <div className="rounded-xl border border-border/80 bg-surface/50 p-4 space-y-3">
            <label className="text-xs font-bold text-foreground">Project Cover Image</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {previewUrl && (
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-border bg-surface">
                  <Image src={previewUrl} alt="Preview" fill unoptimized className="object-cover" />
                </div>
              )}

              <div className="flex-1 w-full">
                <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border hover:border-brand/40 bg-surface p-3 text-center cursor-pointer transition-colors">
                  <Upload className="h-4 w-4 text-foreground-muted mb-1" />
                  <span className="text-xs font-medium text-foreground">
                    {uploadedFile ? uploadedFile.name : "Upload project thumbnail"}
                  </span>
                  <span className="text-[10px] text-foreground-muted">PNG, JPG, WEBP up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <span className="text-[11px] text-foreground-muted">Or enter direct Image URL:</span>
              <input
                type="text"
                name="imageUrl"
                defaultValue={project?.imageUrl || project?.image || ""}
                placeholder="https://..."
                className="mt-1 h-8 w-full rounded-lg border border-border bg-surface px-2.5 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                id="project-featured"
                defaultChecked={project?.featured === true}
                className="h-4 w-4 rounded accent-brand"
              />
              <label htmlFor="project-featured" className="text-xs font-semibold text-foreground cursor-pointer">
                Featured on Homepage
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                id="project-isActive"
                defaultChecked={project?.isActive !== false}
                className="h-4 w-4 rounded accent-brand"
              />
              <label htmlFor="project-isActive" className="text-xs font-semibold text-foreground cursor-pointer">
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
                <span>{isEdit ? "Update Project" : "Save Project"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
