"use client";

import { useState } from "react";
import { Plus, Edit3, Trash2, Code2, Database } from "lucide-react";
import type { TechStackItem } from "@/app/data/techStackData";
import { EmptyState } from "../ui/EmptyState";

interface TechStackTabProps {
  technologies: TechStackItem[];
  searchQuery: string;
  onOpenCreate: () => void;
  onOpenEdit: (tech: TechStackItem) => void;
  onDelete: (id: string, name: string) => void;
  onSeedDefaults: () => Promise<void>;
  isSeeding: boolean;
}

export function TechStackTab({
  technologies,
  searchQuery,
  onOpenCreate,
  onOpenEdit,
  onDelete,
  onSeedDefaults,
  isSeeding,
}: TechStackTabProps) {
  const [selectedDomain, setSelectedDomain] = useState<"all" | "software" | "ai-ml" | "mobile">("all");

  const filteredTech = technologies.filter((t) => {
    const matchesDomain = selectedDomain === "all" || t.domain === selectedDomain;

    if (!searchQuery.trim()) return matchesDomain;

    const q = searchQuery.toLowerCase();
    const matchesQuery =
      t.name?.toLowerCase().includes(q) ||
      t.category?.toLowerCase().includes(q) ||
      t.shortDesc?.toLowerCase().includes(q) ||
      t.highlight?.toLowerCase().includes(q);

    return matchesDomain && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header & Seed/Create Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            Technology Stack Directory ({technologies.length})
          </h2>
          <p className="text-[11px] sm:text-xs text-foreground-muted">
            Manage frameworks, distributed cloud databases, AI toolchains, and mobile SDKs
          </p>
        </div>

        <div className="flex w-full sm:w-auto items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onSeedDefaults}
            disabled={isSeeding}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-bold text-foreground hover:border-brand/40 hover:text-brand transition-all disabled:opacity-50 cursor-pointer"
            title="Seed default technology catalog"
          >
            <Database className="h-3.5 w-3.5" />
            <span>{isSeeding ? "Seeding..." : "Seed Default"}</span>
          </button>

          <button
            type="button"
            onClick={onOpenCreate}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Tech</span>
          </button>
        </div>
      </div>

      {/* Domain Filters (Horizontal scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 max-w-full">
        <button
          type="button"
          onClick={() => setSelectedDomain("all")}
          className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
            selectedDomain === "all"
              ? "bg-brand text-black shadow-sm"
              : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
          }`}
        >
          All Domains ({technologies.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedDomain("software")}
          className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
            selectedDomain === "software"
              ? "bg-brand text-black shadow-sm"
              : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
          }`}
        >
          Software Engineering (Web & Cloud)
        </button>
        <button
          type="button"
          onClick={() => setSelectedDomain("ai-ml")}
          className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
            selectedDomain === "ai-ml"
              ? "bg-brand text-black shadow-sm"
              : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
          }`}
        >
          AI, ML & Data Science
        </button>
        <button
          type="button"
          onClick={() => setSelectedDomain("mobile")}
          className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
            selectedDomain === "mobile"
              ? "bg-brand text-black shadow-sm"
              : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
          }`}
        >
          Mobile Engineering
        </button>
      </div>

      {/* Tech Cards Grid */}
      {filteredTech.length === 0 ? (
        <EmptyState
          icon={Code2}
          title="No Technologies in this Domain"
          description="Click Seed Default Tech to populate the full technology matrix with icons and descriptions."
          actionLabel="Add Technology"
          onAction={onOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredTech.map((item) => {
            const tId = (item as any)._id || item.id || "";

            return (
              <div
                key={tId}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:border-brand/40 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface p-2 group-hover:border-brand/30 transition-colors">
                        {item.svgUrl ? (
                          <img
                            src={item.svgUrl}
                            alt={item.name}
                            className={`h-full w-full object-contain ${
                              item.invertInDark ? "dark:invert" : ""
                            }`}
                          />
                        ) : (
                          <Code2 className="h-5 w-5 text-brand" />
                        )}
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-black text-foreground truncate">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-semibold text-brand">
                          {item.categoryLabel || item.category || "Framework"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onOpenEdit(item)}
                        className="rounded-lg p-1 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                        title="Edit Technology"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(tId, item.name)}
                        className="rounded-lg p-1 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Delete Technology"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {item.shortDesc && (
                    <p className="mt-3 text-xs leading-relaxed text-foreground-muted line-clamp-2">
                      {item.shortDesc}
                    </p>
                  )}

                  {item.highlight && (
                    <div className="mt-2.5 rounded-lg bg-surface border border-border/80 p-2 text-[10px] text-foreground-muted leading-tight">
                      <span className="font-bold text-foreground">Feature: </span>
                      {item.highlight}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-2.5 text-[10px]">
                  <span className="rounded-md bg-surface px-1.5 py-0.5 font-semibold text-foreground-subtle uppercase tracking-wider">
                    {item.domain}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      item.isActive !== false
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-500"
                    }`}
                  >
                    {item.isActive !== false ? "Active" : "Hidden"}
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
