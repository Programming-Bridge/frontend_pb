"use client";

import {
  Image as ImageIcon,
  Briefcase,
  Code2,
  Layers,
  FileText,
  MessageSquare,
  Users,
  Plus,
  ArrowRight,
  Mail,
  UserCheck,
} from "lucide-react";
import { StatCard } from "../StatCard";
import type { DashboardStats, ActiveTab } from "../../types";
import type { InquiryItem } from "@/app/services/inquiryService";
import type { JobApplication } from "@/app/services/careerService";
import type { User } from "@/app/services/authService";

interface OverviewTabProps {
  stats: DashboardStats;
  currentUser: User | null;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenCreateModal: (tab: ActiveTab) => void;
  recentInquiries: InquiryItem[];
  recentApplications: JobApplication[];
  onViewInquiry: (inquiry: InquiryItem) => void;
  onViewApplication: (app: JobApplication) => void;
}

export function OverviewTab({
  stats,
  currentUser,
  onNavigateTab,
  onOpenCreateModal,
  recentInquiries,
  recentApplications,
  onViewInquiry,
  onViewApplication,
}: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-brand/10 via-surface to-cyan-500/10 p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-brand animate-ping" />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand">
                Production Control Center
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black text-foreground tracking-tight">
              Welcome back, {currentUser?.name || "Admin"} 👋
            </h2>
            <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
              Programming Bridge is operating at full capacity. Manage banners, projects, tech stacks, candidate pipelines, and client inquiries from this unified dashboard.
            </p>
          </div>

          <div className="flex w-full sm:w-auto flex-row sm:flex-row items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onOpenCreateModal("projects")}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenCreateModal("careers")}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold text-foreground hover:bg-surface-hover hover:border-brand/40 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Post Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid (2-column on mobile, 4-column on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <StatCard
          title="Hero Banners"
          value={stats.bannersCount}
          icon={ImageIcon}
          subtitle="Homepage visual slides"
          badge="Live"
          badgeColor="brand"
          onClick={() => onNavigateTab("banners")}
        />
        <StatCard
          title="Portfolio Projects"
          value={stats.projectsCount}
          icon={Briefcase}
          subtitle="Production case studies"
          badge="Showcase"
          badgeColor="cyan"
          onClick={() => onNavigateTab("projects")}
        />
        <StatCard
          title="Tech Stack Matrix"
          value={stats.techCount}
          icon={Code2}
          subtitle="Software, AI & Mobile tools"
          badge="Catalog"
          badgeColor="purple"
          onClick={() => onNavigateTab("technologies")}
        />
        <StatCard
          title="Service Capabilities"
          value={stats.servicesCount}
          icon={Layers}
          subtitle="Engineering offerings"
          badge="Offerings"
          badgeColor="brand"
          onClick={() => onNavigateTab("services")}
        />
        <StatCard
          title="Open Job Positions"
          value={stats.openCareersCount}
          icon={FileText}
          subtitle={`${stats.careersCount} total vacancies listed`}
          badge="Recruiting"
          badgeColor="amber"
          onClick={() => onNavigateTab("careers")}
        />
        <StatCard
          title="Inbound Applications"
          value={stats.applicationsCount}
          icon={UserCheck}
          subtitle={`${stats.pendingApplicationsCount} pending review`}
          badge={stats.pendingApplicationsCount > 0 ? "New Candidates" : "Pipeline"}
          badgeColor="amber"
          onClick={() => onNavigateTab("careers")}
        />
        <StatCard
          title="Client Inquiries"
          value={stats.inquiriesCount}
          icon={MessageSquare}
          subtitle={`${stats.unreadInquiriesCount} new messages`}
          badge={stats.unreadInquiriesCount > 0 ? "Action Required" : "Leads"}
          badgeColor="brand"
          onClick={() => onNavigateTab("inquiries")}
        />
        <StatCard
          title="Engineers & Leadership"
          value={stats.teamCount}
          icon={Users}
          subtitle="Specialists & founders"
          badge="Team"
          badgeColor="purple"
          onClick={() => onNavigateTab("team")}
        />
      </div>

      {/* Quick Feeds: Recent Inquiries + Recent Job Applicants */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Inquiries Card */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Recent Client Inquiries</h3>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab("inquiries")}
              className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-xs text-foreground-muted">
              <Mail className="h-8 w-8 text-foreground-subtle mb-2 opacity-50" />
              <span>No client inquiries received yet.</span>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentInquiries.slice(0, 4).map((inq) => (
                <div
                  key={inq._id || inq.id}
                  onClick={() => onViewInquiry(inq)}
                  className="flex items-center justify-between py-3 hover:bg-surface-hover/50 px-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex flex-col min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground truncate">
                        {inq.name}
                      </span>
                      <span className="rounded-md bg-surface border border-border px-1.5 py-0.5 text-[9px] font-semibold text-foreground-muted">
                        {inq.projectType || "General"}
                      </span>
                    </div>
                    <span className="text-[11px] text-foreground-muted truncate mt-0.5">
                      {inq.message}
                    </span>
                  </div>

                  <span className="shrink-0 rounded-full bg-brand/10 border border-brand/20 px-2 py-0.5 text-[10px] font-bold text-brand">
                    {inq.status || "New"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Applications Card */}
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Recent Job Applications</h3>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab("careers")}
              className="flex items-center gap-1 text-xs font-semibold text-amber-500 hover:underline"
            >
              <span>View Pipeline</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {recentApplications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-xs text-foreground-muted">
              <UserCheck className="h-8 w-8 text-foreground-subtle mb-2 opacity-50" />
              <span>No candidate applications submitted yet.</span>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentApplications.slice(0, 4).map((app) => (
                <div
                  key={app._id || app.id}
                  onClick={() => onViewApplication(app)}
                  className="flex items-center justify-between py-3 hover:bg-surface-hover/50 px-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex flex-col min-w-0 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-foreground truncate">
                        {app.fullName}
                      </span>
                      <span className="text-[10px] font-semibold text-foreground-subtle">
                        {app.experienceYears || "Applicant"}
                      </span>
                    </div>
                    <span className="text-[11px] text-foreground-muted truncate mt-0.5">
                      Applied for: <span className="font-semibold text-foreground">{app.roleApplied}</span>
                    </span>
                  </div>

                  <span className="shrink-0 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    {app.status || "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
