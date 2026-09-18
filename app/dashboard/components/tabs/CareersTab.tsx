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
  Calendar,
} from "lucide-react";
import type { Career, JobApplication } from "@/app/services/careerService";
import { getMediaUrl } from "@/app/services/apiClient";
import { EmptyState } from "../ui/EmptyState";
import { StatusDropdown, type StatusOption } from "../ui/StatusDropdown";

const APPLICATION_STATUS_OPTIONS: StatusOption[] = [
  {
    value: "Pending",
    label: "Pending",
    badgeClass: "bg-surface border-border text-foreground-muted",
    dotClass: "bg-slate-400",
  },
  {
    value: "Reviewing",
    label: "Reviewing",
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-500",
    dotClass: "bg-amber-400",
  },
  {
    value: "Shortlisted",
    label: "Shortlisted",
    badgeClass: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
    dotClass: "bg-cyan-400",
  },
  {
    value: "Interview Scheduled",
    label: "Interview Scheduled",
    badgeClass: "bg-brand/15 border-brand/30 text-brand font-extrabold",
    dotClass: "bg-brand",
  },
  {
    value: "Hired",
    label: "Hired",
    badgeClass: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
    dotClass: "bg-emerald-400",
  },
  {
    value: "Rejected",
    label: "Rejected (Auto-email)",
    badgeClass: "bg-rose-500/15 border-rose-500/30 text-rose-500",
    dotClass: "bg-rose-500",
  },
];

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
  onOpenInterviewModal?: (app: JobApplication) => void;
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
  onOpenInterviewModal,
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
            className="inline-flex shrink-0 items-center whitespace-nowrap justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span className="whitespace-nowrap">Post Job Vacancy</span>
          </button>
        )}
      </div>

      {/* Sub-Tabs Nav Buttons */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 pt-0.5 max-w-full border-b border-border scrollbar-none">
        <button
          type="button"
          onClick={() => setSubTab("jobs")}
          className={`inline-flex shrink-0 items-center whitespace-nowrap gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all cursor-pointer ${
            subTab === "jobs"
              ? "bg-brand text-black shadow-lg shadow-brand/20"
              : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
          }`}
        >
          <Briefcase className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">
            Job Openings ({filteredCareers.length}
            {filteredCareers.length !== careers.length ? ` of ${careers.length}` : ""})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab("applications")}
          className={`inline-flex shrink-0 items-center whitespace-nowrap gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition-all cursor-pointer ${
            subTab === "applications"
              ? "bg-brand text-black shadow-lg shadow-brand/20"
              : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
          }`}
        >
          <UserCheck className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">
            Inbound Applications ({filteredApplications.length}
            {filteredApplications.length !== applications.length ? ` of ${applications.length}` : ""})
          </span>
          {pendingCount > 0 && (
            <span
              className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-black ${
                subTab === "applications" ? "bg-black/20 text-black" : "bg-brand/20 text-brand"
              }`}
            >
              {pendingCount} New
            </span>
          )}
        </button>
      </div>

      {/* SUBTAB 1: JOB VACANCIES LIST */}
      {subTab === "jobs" && (
        <>
          {filteredCareers.length === 0 ? (
            <EmptyState
              icon={Briefcase}
              title="No Job Postings Found"
              description="You haven't posted any job vacancies matching your query."
              actionLabel="Create First Job Vacancy"
              onAction={onOpenCreateCareer}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredCareers.map((career) => {
                const careerId = career._id || career.id || "";
                return (
                  <div
                    key={careerId}
                    className="flex flex-col justify-between rounded-2xl border border-border border-l-4 border-l-brand bg-card p-5 shadow-sm hover:shadow-md transition-all space-y-4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="inline-flex items-center rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-[10px] font-bold text-brand uppercase tracking-wider">
                          {career.department}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onOpenEditCareer(career)}
                            className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                            title="Edit Vacancy"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteCareer(careerId, career.title)}
                            className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Delete Vacancy"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <h3 className="text-base font-extrabold text-foreground leading-snug">
                        {career.title}
                      </h3>

                      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-foreground-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-brand" />
                          {career.location || "Remote"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-brand" />
                          {career.type || "Full-Time"}
                        </span>
                        {career.experience && (
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 text-brand" />
                            {career.experience}
                          </span>
                        )}
                      </div>

                      <p className="mt-3 text-xs text-foreground-muted line-clamp-2 leading-relaxed">
                        {career.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs">
                      <span className="font-extrabold text-brand">
                        {career.salaryRange || "Competitive Package"}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          career.isOpen !== false
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        }`}
                      >
                        {career.isOpen !== false ? "Active Hiring" : "Closed"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* SUBTAB 2: INBOUND APPLICATIONS */}
      {subTab === "applications" && (
        <>
          {filteredApplications.length === 0 ? (
            <EmptyState
              icon={UserCheck}
              title="No Inbound Applications"
              description="Candidates applying to your career openings will appear here."
            />
          ) : (
            <div className="space-y-4">
              {/* Mobile Card View (< md) */}
              <div className="space-y-3.5 block md:hidden">
                {filteredApplications.map((app) => {
                  const appId = app._id || app.id || "";
                  const resumeHref = app.resumeUrl ? getMediaUrl(app.resumeUrl) : null;

                  return (
                    <div
                      key={appId}
                      className="rounded-2xl border border-border border-l-4 border-l-brand bg-card p-4 shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-extrabold text-foreground">
                            {app.fullName}
                          </h4>
                          <span className="text-xs font-semibold text-brand block mt-0.5">
                            {app.roleApplied}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          {onOpenInterviewModal && (
                            <button
                              type="button"
                              onClick={() => onOpenInterviewModal(app)}
                              className="rounded-lg p-1.5 bg-brand/10 border border-brand/20 text-brand hover:bg-brand hover:text-black transition-colors cursor-pointer"
                              title="Schedule Interview"
                            >
                              <Calendar className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onViewApplication(app)}
                            className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                            title="Inspect Details"
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
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-brand/10 border border-brand/20 px-2.5 py-1 text-[11px] font-bold text-brand"
                          >
                            <Download className="h-3 w-3" />
                            <span>Resume</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-foreground-subtle italic">No CV</span>
                        )}

                        <StatusDropdown
                          value={app.status || "Pending"}
                          options={APPLICATION_STATUS_OPTIONS}
                          onChange={(newVal) => onUpdateAppStatus(appId, newVal)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop Data Table (>= md) with full horizontal scroll support */}
              <div className="hidden md:block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <div className="overflow-x-auto w-full scrollbar-thin">
                  <table className="w-full min-w-[880px] text-left text-xs">
                    <thead className="border-b border-border bg-surface/60 text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                      <tr>
                        <th className="px-5 py-3.5 whitespace-nowrap">Applicant Name</th>
                        <th className="px-5 py-3.5 whitespace-nowrap">Role Applied</th>
                        <th className="px-5 py-3.5 whitespace-nowrap">Contact</th>
                        <th className="px-5 py-3.5 whitespace-nowrap">Resume / CV</th>
                        <th className="px-5 py-3.5 whitespace-nowrap">Status</th>
                        <th className="px-5 py-3.5 text-right whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-border font-medium">
                      {filteredApplications.map((app) => {
                        const appId = app._id || app.id || "";
                        const resumeHref = app.resumeUrl ? getMediaUrl(app.resumeUrl) : null;

                        return (
                          <tr key={appId} className="hover:bg-surface-hover/50 transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex flex-col">
                                <span className="font-bold text-foreground">{app.fullName}</span>
                                <span className="text-[10px] text-foreground-subtle">
                                  {app.experienceYears || "Applicant"}
                                </span>
                              </div>
                            </td>

                            <td className="px-5 py-3.5 font-semibold text-foreground">
                              {app.roleApplied}
                            </td>

                            <td className="px-5 py-3.5">
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

                            <td className="px-5 py-3.5">
                              {resumeHref ? (
                                <a
                                  href={resumeHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded-lg bg-brand/10 border border-brand/20 px-2.5 py-1 text-[11px] font-bold text-brand hover:bg-brand hover:text-black transition-all"
                                >
                                  <Download className="h-3 w-3" />
                                  <span>Resume</span>
                                </a>
                              ) : (
                                <span className="text-[10px] text-foreground-subtle italic">No File</span>
                              )}
                            </td>

                            <td className="px-5 py-3.5">
                              <StatusDropdown
                                value={app.status || "Pending"}
                                options={APPLICATION_STATUS_OPTIONS}
                                onChange={(newVal) => onUpdateAppStatus(appId, newVal)}
                              />
                            </td>

                            <td className="px-5 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {onOpenInterviewModal && (
                                  <button
                                    type="button"
                                    onClick={() => onOpenInterviewModal(app)}
                                    className="rounded-lg p-1.5 bg-brand/10 border border-brand/20 text-brand hover:bg-brand hover:text-black transition-colors cursor-pointer flex items-center gap-1 font-bold text-[11px] px-2.5 shadow-xs"
                                    title="Schedule Interview"
                                  >
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span className="hidden lg:inline">Interview</span>
                                  </button>
                                )}
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
            </div>
          )}
        </>
      )}
    </div>
  );
}

