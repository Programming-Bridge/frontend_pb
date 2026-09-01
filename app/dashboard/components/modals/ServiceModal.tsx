"use client";

import { X, Loader2, Layers } from "lucide-react";
import type { ServiceCard } from "@/app/services/serviceCardService";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceCard | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
}

export function ServiceModal({
  isOpen,
  onClose,
  service,
  onSubmit,
  isSubmitting,
}: ServiceModalProps) {
  if (!isOpen) return null;

  const isEdit = Boolean(service?._id || service?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                {isEdit ? "Edit Service Offering" : "Add Service Offering"}
              </h3>
              <p className="text-xs text-foreground-muted">
                Describe engineering capability, technical tags, and customer value
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
              <label className="text-xs font-bold text-foreground">Service Title *</label>
              <input
                type="text"
                name="title"
                required
                defaultValue={service?.title || ""}
                placeholder="e.g. Enterprise Web Applications"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Badge Tagline</label>
              <input
                type="text"
                name="badge"
                defaultValue={service?.badge || "Core Capability"}
                placeholder="e.g. Sub-100ms APIs"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Icon Identifier or Lucide Name</label>
              <input
                type="text"
                name="icon"
                defaultValue={service?.icon || "Code2"}
                placeholder="e.g. Globe, Smartphone, Brain, Shield, Cloud"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Display Order</label>
              <input
                type="number"
                name="order"
                defaultValue={service?.order ?? 1}
                min={0}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Service Description *</label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={service?.description || ""}
              placeholder="Explain how your engineering team delivers value in this domain..."
              className="mt-1 w-full rounded-xl border border-border bg-surface p-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Key Features / Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              defaultValue={service?.tags?.join(", ") || ""}
              placeholder="e.g. Next.js 15, TypeScript, Microservices, TailwindCSS, PostgreSQL"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Detail Page Route / Link</label>
            <input
              type="text"
              name="link"
              defaultValue={service?.link || "/services"}
              placeholder="e.g. /services/web-development"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              id="service-isActive"
              defaultChecked={service?.isActive !== false}
              className="h-4 w-4 rounded accent-brand"
            />
            <label htmlFor="service-isActive" className="text-xs font-semibold text-foreground cursor-pointer">
              Active / Visible to Clients
            </label>
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
                <span>{isEdit ? "Update Service" : "Save Service"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
