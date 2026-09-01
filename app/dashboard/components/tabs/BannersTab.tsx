"use client";

import Image from "next/image";
import { Plus, Edit3, Trash2, Image as ImageIcon, Check, X } from "lucide-react";
import type { Banner } from "@/app/services/bannerService";
import { getMediaUrl } from "@/app/services/apiClient";
import { EmptyState } from "../ui/EmptyState";

interface BannersTabProps {
  banners: Banner[];
  searchQuery: string;
  onOpenCreate: () => void;
  onOpenEdit: (banner: Banner) => void;
  onDelete: (id: string, name: string) => void;
}

export function BannersTab({
  banners,
  searchQuery,
  onOpenCreate,
  onOpenEdit,
  onDelete,
}: BannersTabProps) {
  const filteredBanners = banners.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.title?.toLowerCase().includes(q) ||
      b.subTitle?.toLowerCase().includes(q) ||
      b.badge?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Tab Header & Quick Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            Homepage Hero Banners ({banners.length})
          </h2>
          <p className="text-[11px] sm:text-xs text-foreground-muted">
            Manage high-converting headlines, value propositions, and background graphics
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreate}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>New Hero Banner</span>
        </button>
      </div>

      {/* Banners Grid / List */}
      {filteredBanners.length === 0 ? (
        <EmptyState
          icon={ImageIcon}
          title="No Hero Banners Found"
          description="Create your first hero banner to showcase on the Programming Bridge homepage."
          actionLabel="Create Hero Banner"
          onAction={onOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
          {filteredBanners.map((banner) => {
            const bId = banner._id || banner.id || "";
            const imageSrc = banner.image || banner.img || banner.imageUrl;

            return (
              <div
                key={bId}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-brand/40 hover:shadow-lg"
              >
                <div>
                  {/* Top Bar inside card (Cleanly wraps on mobile without bubble distortion) */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="truncate max-w-[180px] sm:max-w-none rounded-lg bg-brand/10 border border-brand/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand whitespace-nowrap">
                        {banner.badge || "Hero"}
                      </span>
                      <span className="text-[10px] text-foreground-subtle font-semibold whitespace-nowrap">
                        Order #{banner.order ?? 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold whitespace-nowrap ${
                          banner.isActive !== false
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-rose-500/10 text-rose-500"
                        }`}
                      >
                        {banner.isActive !== false ? <Check className="h-2.5 w-2.5" /> : <X className="h-2.5 w-2.5" />}
                        <span>{banner.isActive !== false ? "Active" : "Hidden"}</span>
                      </span>

                      <button
                        type="button"
                        onClick={() => onOpenEdit(banner)}
                        className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                        title="Edit Banner"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(bId, banner.title)}
                        className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Delete Banner"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail / Graphic preview if present */}
                  {imageSrc && (
                    <div className="relative mt-3 h-36 sm:h-40 w-full overflow-hidden rounded-xl border border-border bg-surface">
                      <Image
                        src={getMediaUrl(imageSrc)}
                        alt={banner.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    </div>
                  )}

                  {/* Headline & Subtitle */}
                  <h3 className="mt-3.5 text-sm sm:text-base font-black text-foreground tracking-tight line-clamp-2 leading-snug">
                    {banner.title}
                  </h3>

                  {banner.subTitle && (
                    <p className="mt-1 text-xs font-semibold text-brand line-clamp-1">
                      {banner.subTitle}
                    </p>
                  )}

                  <p className="mt-2 text-xs leading-relaxed text-foreground-muted line-clamp-2">
                    {banner.description}
                  </p>
                </div>

                {/* CTAs Footer */}
                <div className="mt-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-1.5 border-t border-border/70 pt-3">
                  {banner.primaryBtnText && (
                    <span className="truncate max-w-full rounded-lg bg-surface border border-border px-2 py-1 text-[10px] font-semibold text-foreground">
                      CTA 1: {banner.primaryBtnText} → {banner.primaryBtnLink || "/"}
                    </span>
                  )}
                  {banner.secondaryBtnText && (
                    <span className="truncate max-w-full rounded-lg bg-surface border border-border px-2 py-1 text-[10px] font-semibold text-foreground-muted">
                      CTA 2: {banner.secondaryBtnText} → {banner.secondaryBtnLink || "/"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
