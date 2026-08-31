"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setProjects,
  setProjectsLoading,
  setProjectsError,
  selectProjects,
  selectProjectsLoading,
} from "@/lib/store/features/projects/projectSlice";
import { getProjects, type Project } from "@/app/services/projectService";
import { ProjectsSkeleton } from "./skeletons/ProjectsSkeleton";
import { SectionWrapper, SectionHeader, CalloutBanner } from "./common";
import {
  FolderGit2,
  ExternalLink,
  Code2,
  Smartphone,
  Brain,
  Cloud,
} from "lucide-react";

interface ProjectsSectionProps {
  isPage?: boolean;
  className?: string;
}

export function ProjectsSection({ isPage = false, className = "" }: ProjectsSectionProps) {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjects);
  const loading = useAppSelector(selectProjectsLoading);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      dispatch(setProjectsLoading(true));
      try {
        const data = await getProjects();
        if (isMounted && data?.length) {
          const active = data.filter((p) => p.isActive !== false);
          if (active.length > 0) {
            dispatch(setProjects(active));
            dispatch(setProjectsError(null));
          }
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Failed to load projects";
          dispatch(setProjectsError(message));
        }
      } finally {
        if (isMounted) dispatch(setProjectsLoading(false));
      }
    }

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const activeProjects = useMemo(() => projects.filter((p) => p.isActive !== false), [projects]);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    activeProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [activeProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return activeProjects;
    return activeProjects.filter((p) => p.category === selectedCategory);
  }, [activeProjects, selectedCategory]);

  const getCategoryIcon = (category?: string) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("mobile") || cat.includes("app")) return Smartphone;
    if (cat.includes("ai") || cat.includes("data") || cat.includes("ml")) return Brain;
    if (cat.includes("cloud") || cat.includes("devops")) return Cloud;
    return FolderGit2;
  };

  if (loading || activeProjects.length === 0) {
    return <ProjectsSkeleton />;
  }

  return (
    <SectionWrapper
      id="projects"
      variant="background"
      border={isPage ? "none" : "bottom"}
      py={isPage ? "pt-20 pb-16 md:pt-24 md:pb-20" : "py-16 md:py-20"}
      className={className}
      ariaLabel="Featured Projects"
    >
      {/* Header */}
      <SectionHeader
        icon={FolderGit2}
        badge="Portfolio"
        subBadge={`${activeProjects.length} Projects`}
        title={
          <>
            Featured Work & <span className="text-brand">Case Studies</span>
          </>
        }
        description="A selection of web applications, mobile platforms, and cloud systems engineered for our clients."
      >
        {/* Filter Pills */}
        {categories.length > 1 && (
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-surface border border-border shadow-xs max-w-full">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === "All"
                  ? activeProjects.length
                  : activeProjects.filter((p) => p.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-brand text-white shadow-sm shadow-brand/20"
                    : "text-foreground-muted hover:text-foreground hover:bg-surface-hover"
                    }`}
                >
                  <span>{category}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${isActive
                      ? "bg-white/20 text-white font-bold"
                      : "bg-border text-foreground-subtle"
                      }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </SectionHeader>

      {/* Project Cards Grid */}
      <div className="mt-14 sm:mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project: Project, index: number) => {
          const CategoryIcon = getCategoryIcon(project.category);
          const projectImage = project.image || project.imageUrl || project.img;
          const projectLiveUrl = project.liveLink || project.liveUrl;
          const projectGitUrl = project.gitLink || project.githubUrl;

          return (
            <div
              key={project._id || project.id || `project-${index}`}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
            >
              {/* Project Image Banner */}
              <div className="relative aspect-video w-full overflow-hidden bg-surface border-b border-border/80">
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-surface p-6 text-center">
                    <div className="flex flex-col items-center gap-2 text-foreground-subtle">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                        <CategoryIcon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">
                        {project.category || "Engineered Solution"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Top Badge Overlay */}
                <div className="absolute left-3.5 top-3.5 z-30 flex items-center gap-2 pointer-events-none">
                  {project.badge ? (
                    <span className="rounded-full bg-surface/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand backdrop-blur-md border border-brand/20 shadow-xs">
                      {project.badge}
                    </span>
                  ) : project.featured ? (
                    <span className="rounded-full bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                      Featured
                    </span>
                  ) : null}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 z-20 flex items-center justify-center gap-3.5 bg-black/60 backdrop-blur-xs opacity-0 transition-all duration-300 group-hover:opacity-100 p-4">
                  {projectLiveUrl && (
                    <a
                      href={projectLiveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Live Demo for ${project.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-all hover:scale-110 hover:bg-brand-hover active:scale-95 cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}

                  {projectGitUrl && (
                    <a
                      href={projectGitUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`GitHub for ${project.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/95 border border-border text-foreground shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:border-brand hover:text-brand active:scale-95 cursor-pointer"
                    >
                      <FolderGit2 className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-center justify-between text-xs text-foreground-subtle">
                    <span className="font-semibold text-brand">
                      {project.client || "Client Engagement"}
                    </span>
                    <span>{project.category || "Full-Stack"}</span>
                  </div>

                  <h3 className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-foreground-muted leading-relaxed line-clamp-3">
                    {project.shortDescription || project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center rounded-md border border-border/80 bg-surface px-2 py-0.5 text-[10px] font-medium text-foreground-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Row */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/60">
                  <div className="flex items-center gap-3">
                    {projectLiveUrl && (
                      <a
                        href={projectLiveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-hover transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}

                    {projectGitUrl && (
                      <a
                        href={projectGitUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors"
                      >
                        <FolderGit2 className="h-3 w-3" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href="/contact"
                    className="text-xs font-semibold text-foreground-subtle hover:text-brand transition-colors"
                  >
                    <span>Inquire →</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Callout Banner */}
      <CalloutBanner
        icon={Code2}
        tag="Custom Engineering Projects"
        title="Have a product you're ready to build?"
        description="We deliver robust MVPs in weeks and scale production architectures to high throughput with senior-led engineering squads."
        buttonText="Discuss Your Project"
        buttonHref="/contact"
      />
    </SectionWrapper>
  );
}

export default ProjectsSection;
