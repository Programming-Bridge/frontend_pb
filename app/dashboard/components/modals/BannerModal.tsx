"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Upload, Loader2, Sparkles } from "lucide-react";
import type { Banner } from "@/app/services/bannerService";
import { getMediaUrl } from "@/app/services/apiClient";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner: Banner | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, uploadedFile: File | null) => Promise<void>;
  isSubmitting: boolean;
}

export function BannerModal({
  isOpen,
  onClose,
  banner,
  onSubmit,
  isSubmitting,
}: BannerModalProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (banner) {
      const img = banner.image || banner.img || banner.imageUrl;
      setPreviewUrl(img ? getMediaUrl(img) : "");
    } else {
      setPreviewUrl("");
    }
    setUploadedFile(null);
  }, [banner, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const isEdit = Boolean(banner?._id || banner?.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">
                {isEdit ? "Edit Hero Banner" : "Create Hero Banner"}
              </h3>
              <p className="text-xs text-foreground-muted">
                Configure headline, call-to-actions, and background banner media
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
              <label className="text-xs font-bold text-foreground">Badge Tagline</label>
              <input
                type="text"
                name="badge"
                defaultValue={banner?.badge || "Next-Gen Agency"}
                placeholder="e.g. Next-Gen Web Studio"
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Display Order</label>
              <input
                type="number"
                name="order"
                defaultValue={banner?.order ?? 1}
                min={0}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Main Title / Headline *</label>
            <input
              type="text"
              name="title"
              required
              defaultValue={banner?.title || ""}
              placeholder="e.g. Engineering Mission-Critical Digital Products"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Subtitle</label>
            <input
              type="text"
              name="subTitle"
              defaultValue={banner?.subTitle || ""}
              placeholder="e.g. Web Apps • Native Mobile • Distributed Cloud Systems"
              className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground">Detailed Description *</label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={banner?.description || ""}
              placeholder="Provide context on what this banner highlights..."
              className="mt-1 w-full rounded-xl border border-border bg-surface p-3 text-xs text-foreground focus:border-brand focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-bold text-foreground">Primary CTA Label</label>
              <input
                type="text"
                name="primaryBtnText"
                defaultValue={banner?.primaryBtnText || "Explore Services"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Primary CTA Link</label>
              <input
                type="text"
                name="primaryBtnLink"
                defaultValue={banner?.primaryBtnLink || "/services"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Secondary CTA Label</label>
              <input
                type="text"
                name="secondaryBtnText"
                defaultValue={banner?.secondaryBtnText || "Contact Us"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground">Secondary CTA Link</label>
              <input
                type="text"
                name="secondaryBtnLink"
                defaultValue={banner?.secondaryBtnLink || "/contact"}
                className="mt-1 h-9 w-full rounded-xl border border-border bg-surface px-3 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          {/* Banner Media / Image File or URL */}
          <div className="rounded-xl border border-border/80 bg-surface/50 p-4 space-y-3">
            <label className="text-xs font-bold text-foreground">Banner Visual / Image</label>
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
                    {uploadedFile ? uploadedFile.name : "Choose an image file to upload"}
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
                defaultValue={banner?.imageUrl || banner?.image || ""}
                placeholder="https://..."
                className="mt-1 h-8 w-full rounded-lg border border-border bg-surface px-2.5 text-xs text-foreground focus:border-brand focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              id="banner-isActive"
              defaultChecked={banner?.isActive !== false}
              className="h-4 w-4 rounded accent-brand"
            />
            <label htmlFor="banner-isActive" className="text-xs font-semibold text-foreground cursor-pointer">
              Active on Live Website
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
                <span>{isEdit ? "Update Banner" : "Create Banner"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
