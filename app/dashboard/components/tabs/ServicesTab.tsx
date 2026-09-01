"use client";

import { Plus, Edit3, Trash2, Layers } from "lucide-react";
import type { ServiceCard } from "@/app/services/serviceCardService";
import { EmptyState } from "../ui/EmptyState";

interface ServicesTabProps {
  services: ServiceCard[];
  searchQuery: string;
  onOpenCreate: () => void;
  onOpenEdit: (service: ServiceCard) => void;
  onDelete: (id: string, name: string) => void;
}

export function ServicesTab({
  services,
  searchQuery,
  onOpenCreate,
  onOpenEdit,
  onDelete,
}: ServicesTabProps) {
  const filteredServices = services.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title?.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.badge?.toLowerCase().includes(q) ||
      s.tags?.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            Service Capabilities ({services.length})
          </h2>
          <p className="text-[11px] sm:text-xs text-foreground-muted">
            Manage engineering service cards, technical skillsets, and client solutions
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreate}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="No Services Found"
          description="Create digital engineering services to list on your agency services page."
          actionLabel="Add Service"
          onAction={onOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredServices.map((service) => {
            const sId = service._id || service.id || "";

            return (
              <div
                key={sId}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all hover:border-brand/40 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 border border-brand/20 text-brand">
                        <Layers className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="truncate text-[10px] font-bold uppercase tracking-wider text-brand">
                          {service.badge || "Capability"}
                        </span>
                        <span className="text-[10px] text-foreground-subtle">
                          Order #{service.order ?? 1}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onOpenEdit(service)}
                        className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                        title="Edit Service"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(sId, service.title)}
                        className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3 className="mt-3.5 text-sm sm:text-base font-black text-foreground tracking-tight line-clamp-2 min-h-[2.5rem] leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-foreground-muted line-clamp-3">
                    {service.description}
                  </p>

                  {/* Feature Tags */}
                  {service.tags && service.tags.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {service.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-surface border border-border px-2 py-0.5 text-[10px] font-semibold text-foreground-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-3">
                  <span className="text-[11px] font-semibold text-brand">
                    Route: {service.link || "/services"}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      service.isActive !== false
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-500"
                    }`}
                  >
                    {service.isActive !== false ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
