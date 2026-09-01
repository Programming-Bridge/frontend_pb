"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit3, Trash2, Briefcase, ExternalLink, Code2, Star } from "lucide-react";
import type { Project } from "@/app/services/projectService";
import { getMediaUrl } from "@/app/services/apiClient";
import { EmptyState } from "../ui/EmptyState";

interface ProjectsTabProps {
  projects: Project[];
  searchQuery: string;
  onOpenCreate: () => void;
  onOpenEdit: (project: Project) => void;
  onDelete: (id: string, name: string) => void;
}

export function ProjectsTab({
  projects,
  searchQuery,
  onOpenCreate,
  onOpenEdit,
  onDelete,
}: ProjectsTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "Web Engineering", "Mobile Applications", "AI & Machine Learning", "Cloud Infrastructure"];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" || p.category?.toLowerCase() === selectedCategory.toLowerCase();

    if (!searchQuery.trim()) return matchesCategory;

    const q = searchQuery.toLowerCase();
    const matchesQuery =
      p.title?.toLowerCase().includes(q) ||
      p.client?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.technologies?.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Tab Header & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            Portfolio & Case Studies ({projects.length})
          </h2>
          <p className="text-[11px] sm:text-xs text-foreground-muted">
            Manage public client success stories, live demos, and technologies stack badges
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreate}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Category Filter Pills (Scrollable horizontally on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 max-w-full">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold capitalize transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-brand text-black shadow-sm"
                : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
            }`}
          >
            {cat === "all" ? "All Categories" : cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No Projects Found"
          description="Add case studies to highlight your team's technical achievements to potential clients."
          actionLabel="Add Project"
          onAction={onOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => {
            const pId = proj._id || proj.id || "";
            const imageSrc = proj.image || proj.img || proj.imageUrl;

            return (
              <div
                key={pId}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:border-brand/40 hover:shadow-lg"
              >
                <div>
                  {/* Image Cover */}
                  <div className="relative h-44 w-full overflow-hidden rounded-xl border border-border bg-surface">
                    {imageSrc ? (
                      <Image
                        src={getMediaUrl(imageSrc)}
                        alt={proj.title}
                        fill
                        unoptimized
                        className="object-cover transition-transform group-hover:scale-105 duration-300"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-surface text-foreground-subtle">
                        <Briefcase className="h-8 w-8 opacity-40" />
                      </div>
                    )}

                    {/* Badges on image */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      {proj.featured && (
                        <span className="flex items-center gap-1 rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-400/30">
                          <Star className="h-2.5 w-2.5 fill-amber-400" />
                          <span>Featured</span>
                        </span>
                      )}
                      <span className="rounded-md bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white border border-white/10">
                        {proj.category || "Web App"}
                      </span>
                    </div>
                  </div>

                  {/* Title & Client */}
                  <div className="mt-3.5 flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-extrabold text-foreground tracking-tight line-clamp-2 leading-snug">
                        {proj.title}
                      </h3>
                      {proj.client && (
                        <span className="truncate block text-[11px] font-semibold text-brand mt-1">
                          {proj.client}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onOpenEdit(proj)}
                        className="rounded-lg p-1 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(pId, proj.title)}
                        className="rounded-lg p-1 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-xs leading-relaxed text-foreground-muted line-clamp-2">
                    {proj.shortDescription || proj.description}
                  </p>

                  {/* Tech stack badges */}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {proj.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-surface border border-border px-1.5 py-0.5 text-[10px] font-semibold text-foreground-muted"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.technologies.length > 4 && (
                        <span className="rounded-md bg-surface border border-border px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                          +{proj.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer Links */}
                <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                  <div className="flex items-center gap-2">
                    {(proj.liveUrl || proj.liveLink) && (
                      <a
                        href={proj.liveUrl || proj.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[11px] font-bold text-brand hover:underline"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {(proj.githubUrl || proj.gitLink) && (
                      <a
                        href={proj.githubUrl || proj.gitLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1 text-[11px] font-bold text-foreground-muted hover:text-foreground"
                      >
                        <Code2 className="h-3 w-3" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      proj.isActive !== false
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-500"
                    }`}
                  >
                    {proj.isActive !== false ? "Published" : "Draft"}
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
