"use client";

import { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  FileText,
  UserCheck,
  Download,
  Eye,
  Briefcase,
  MapPin,
  Clock,
} from "lucide-react";
import type { Career, JobApplication } from "@/app/services/careerService";
import { getMediaUrl } from "@/app/services/apiClient";
import { EmptyState } from "../ui/EmptyState";

interface CareersTabProps {
  careers: Career[];
  applications: JobApplication[];
  searchQuery: string;
  onOpenCreateCareer: () => void;
  onOpenEditCareer: (career: Career) => void;
  onDeleteCareer: (id: string, title: string) => void;
  onViewApplication: (app: JobApplication) => void;
  onUpdateAppStatus: (id: string, status: string) => Promise<void>;
  onDeleteApplication: (id: string, candidateName: string) => void;
}

export function CareersTab({
  careers,
  applications,
  searchQuery,
  onOpenCreateCareer,
  onOpenEditCareer,
  onDeleteCareer,
  onViewApplication,
  onUpdateAppStatus,
  onDeleteApplication,
}: CareersTabProps) {
  const [subTab, setSubTab] = useState<"jobs" | "applications">("jobs");

  // Filtering Job Openings
  const filteredCareers = careers.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.title?.toLowerCase().includes(q) ||
      c.department?.toLowerCase().includes(q) ||
      c.location?.toLowerCase().includes(q) ||
      c.skills?.some((s) => s.toLowerCase().includes(q))
    );
  });

  // Filtering Inbound Applications
  const filteredApplications = applications.filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.fullName?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      a.roleApplied?.toLowerCase().includes(q) ||
      a.status?.toLowerCase().includes(q)
    );
  });

  const pendingCount = applications.filter((a) => !a.status || a.status === "Pending").length;

  return (
    <div className="space-y-6">
      {/* Header with Sub-tab Switcher & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-foreground tracking-tight">
            Careers & Recruitment Studio
          </h2>
          <p className="text-xs text-foreground-muted">
            Manage open job listings and track inbound candidate resumes & pipeline stages
          </p>
        </div>

        {subTab === "jobs" && (
          <button
            type="button"
            onClick={onOpenCreateCareer}
            className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Post Job Vacancy</span>
          </button>
        )}
      </div>

      {/* Sub-Tabs Nav Buttons */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <button
          type="button"
          onClick={() => setSubTab("jobs")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            subTab === "jobs"
              ? "bg-brand text-black shadow-sm"
              : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
          }`}
        >
          <Briefcase className="h-3.5 w-3.5" />
          <span>Job Openings ({careers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("applications")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
            subTab === "applications"
              ? "bg-amber-500 text-black shadow-sm"
              : "border border-border bg-surface text-foreground-muted hover:border-amber-500/40 hover:text-foreground"
          }`}
        >
          <UserCheck className="h-3.5 w-3.5" />
          <span>Candidate Applications ({applications.length})</span>
          {pendingCount > 0 && (
            <span className="rounded-full bg-black/20 px-1.5 py-0.2 text-[10px] font-extrabold text-black">
              {pendingCount} new
            </span>
          )}
        </button>
      </div>

      {/* 1. Job Openings Sub-Tab */}
      {subTab === "jobs" && (
        <>
          {filteredCareers.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No Job Positions Posted"
              description="Create job vacancies to attract talented engineers and leaders to Programming Bridge."
              actionLabel="Post Job Opening"
              onAction={onOpenCreateCareer}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-5">
              {filteredCareers.map((career) => {
                const cId = career._id || career.id || "";
                const applicantsForRole = applications.filter(
                  (a) => a.roleApplied?.toLowerCase() === career.title?.toLowerCase()
                ).length;

                return (
                  <div
                    key={cId}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-brand/40 hover:shadow-lg"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="truncate rounded-md bg-brand/10 border border-brand/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand whitespace-nowrap">
                            {career.department}
                          </span>
                          <span className="truncate rounded-md bg-surface border border-border px-2 py-0.5 text-[10px] font-semibold text-foreground-muted whitespace-nowrap">
                            {career.type || "Full-Time (Remote)"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ml-auto">
                          <button
                            type="button"
                            onClick={() => onOpenEditCareer(career)}
                            className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                            title="Edit Job Opening"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteCareer(cId, career.title)}
                            className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Delete Job"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="mt-3 text-sm sm:text-base font-black text-foreground tracking-tight line-clamp-2 leading-snug">
                        {career.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-foreground-muted">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-brand" />
                          <span>{career.location || "Remote"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-brand" />
                          <span>{career.experience || "3+ Years"}</span>
                        </div>
                        {career.salaryRange && (
                          <span className="font-semibold text-foreground">
                            {career.salaryRange}
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-foreground-muted line-clamp-2">
                        {career.description}
                      </p>

                      {career.skills && career.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {career.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="rounded-md bg-surface border border-border px-1.5 py-0.5 text-[10px] font-semibold text-foreground-muted"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3 text-xs">
                      <span className="font-semibold text-foreground-muted">
                        {applicantsForRole} applicant{applicantsForRole === 1 ? "" : "s"}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                          career.isOpen !== false
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-rose-500/10 text-rose-500"
                        }`}
                      >
                        {career.isOpen !== false ? "Open / Active" : "Closed"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* 2. Candidate Applications Sub-Tab */}
      {subTab === "applications" && (
        <>
          {filteredApplications.length === 0 ? (
            <EmptyState
              icon={UserCheck}
              title="No Applications Received"
              description="When candidates apply on your careers page, their profiles and resumes will appear here in real-time."
            />
          ) : (
            <div>
              {/* Mobile Card View (< md) */}
              <div className="space-y-3.5 block md:hidden">
                {filteredApplications.map((app) => {
                  const appId = app._id || app.id || "";
                  const resumeHref = app.resumeUrl ? getMediaUrl(app.resumeUrl) : null;

                  return (
                    <div
                      key={appId}
                      className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-foreground">{app.fullName}</h4>
                          <span className="text-[11px] font-semibold text-brand">
                            {app.roleApplied}
                          </span>
                          <p className="text-[10px] text-foreground-subtle mt-0.5">
                            {app.experienceYears || "Applicant"}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => onViewApplication(app)}
                            className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                            title="Inspect Application"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteApplication(appId, app.fullName)}
                            className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Delete Application"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/70 text-xs">
                        <a
                          href={`mailto:${app.email}`}
                          className="text-[11px] font-semibold text-brand hover:underline"
                        >
                          {app.email}
                        </a>
                        {app.phone && (
                          <span className="text-[11px] text-foreground-muted">• {app.phone}</span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/70">
                        {resumeHref ? (
                          <a
                            href={resumeHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-brand/10 border border-brand/20 px-2.5 py-1 text-[11px] font-bold text-brand"
                          >
                            <Download className="h-3 w-3" />
                            <span>Resume</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-foreground-subtle italic">No CV</span>
                        )}

                        <select
                          value={app.status || "Pending"}
                          onChange={(e) => onUpdateAppStatus(appId, e.target.value)}
                          className={`rounded-lg border px-2 py-1 text-[11px] font-bold focus:outline-none transition-colors cursor-pointer ${
                            app.status === "Hired"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                              : app.status === "Shortlisted"
                              ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400"
                              : app.status === "Rejected"
                              ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                              : app.status === "Reviewing"
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                              : "bg-surface border-border text-foreground-muted"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Hired">Hired</option>
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Data Table (>= md) */}
              <div className="hidden md:block overflow-x-auto rounded-2xl border border-border bg-card">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-surface/60 text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                    <tr>
                      <th className="px-4 py-3">Applicant Name</th>
                      <th className="px-4 py-3">Role Applied</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Resume / CV</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y border-border font-medium">
                    {filteredApplications.map((app) => {
                      const appId = app._id || app.id || "";
                      const resumeHref = app.resumeUrl ? getMediaUrl(app.resumeUrl) : null;

                      return (
                        <tr key={appId} className="hover:bg-surface-hover/50 transition-colors">
                          <td className="px-4 py-3.5">
                            <div className="flex flex-col">
                              <span className="font-bold text-foreground">{app.fullName}</span>
                              <span className="text-[10px] text-foreground-subtle">
                                {app.experienceYears || "Applicant"}
                              </span>
                            </div>
                          </td>

                          <td className="px-4 py-3.5 font-semibold text-foreground">
                            {app.roleApplied}
                          </td>

                          <td className="px-4 py-3.5">
                            <div className="flex flex-col gap-0.5">
                              <a
                                href={`mailto:${app.email}`}
                                className="text-brand hover:underline font-semibold flex items-center gap-1 text-[11px]"
                              >
                                <span>{app.email}</span>
                              </a>
                              {app.phone && (
                                <span className="text-[10px] text-foreground-muted">{app.phone}</span>
                              )}
                            </div>
                          </td>

                          <td className="px-4 py-3.5">
                            {resumeHref ? (
                              <a
                                href={resumeHref}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-brand/10 border border-brand/20 px-2.5 py-1 text-[11px] font-bold text-brand hover:bg-brand hover:text-black transition-all"
                              >
                                <Download className="h-3 w-3" />
                                <span>Resume</span>
                              </a>
                            ) : (
                              <span className="text-[10px] text-foreground-subtle italic">No File</span>
                            )}
                          </td>

                          <td className="px-4 py-3.5">
                            <select
                              value={app.status || "Pending"}
                              onChange={(e) => onUpdateAppStatus(appId, e.target.value)}
                              className={`rounded-lg border px-2 py-1 text-[11px] font-bold focus:outline-none transition-colors cursor-pointer ${
                                app.status === "Hired"
                                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                                  : app.status === "Shortlisted"
                                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400"
                                  : app.status === "Rejected"
                                  ? "bg-rose-500/10 border-rose-500/30 text-rose-500"
                                  : app.status === "Reviewing"
                                  ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
                                  : "bg-surface border-border text-foreground-muted"
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Reviewing">Reviewing</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Hired">Hired</option>
                            </select>
                          </td>

                          <td className="px-4 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => onViewApplication(app)}
                                className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                                title="Inspect Application"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onDeleteApplication(appId, app.fullName)}
                                className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                                title="Delete Application"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
