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
  Globe,
  Activity,
  MapPin,
  Clock,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { StatCard } from "../StatCard";
import type { DashboardStats, ActiveTab } from "../../types";
import type { InquiryItem } from "@/app/services/inquiryService";
import type { JobApplication } from "@/app/services/careerService";
import type { User } from "@/app/services/authService";
import type { VisitorItem } from "@/app/services/visitorService";

interface OverviewTabProps {
  stats: DashboardStats;
  currentUser: User | null;
  onNavigateTab: (tab: ActiveTab) => void;
  onOpenCreateModal: (tab: ActiveTab) => void;
  recentInquiries: InquiryItem[];
  recentApplications: JobApplication[];
  recentVisitors?: VisitorItem[];
  onViewInquiry: (inquiry: InquiryItem) => void;
  onViewApplication: (app: JobApplication) => void;
  onViewVisitor?: (visitor: VisitorItem) => void;
}

export function OverviewTab({
  stats,
  currentUser,
  onNavigateTab,
  onOpenCreateModal,
  recentInquiries,
  recentApplications,
  recentVisitors = [],
  onViewInquiry,
  onViewApplication,
  onViewVisitor,
}: OverviewTabProps) {
  const getDeviceIcon = (device?: string) => {
    switch (device?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-3 w-3 text-brand" />;
      case "tablet":
        return <Tablet className="h-3 w-3 text-amber-500" />;
      default:
        return <Monitor className="h-3 w-3 text-cyan-400" />;
    }
  };

  const formatTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "Just now";
    try {
      const now = new Date();
      const past = new Date(dateStr);
      const diffMs = now.getTime() - past.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return past.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

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
              Programming Bridge is operating at full capacity. Manage live visitor IP telemetry, banners, projects, candidate pipelines, and client inquiries from this unified console.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateTab("visitors")}
              className="inline-flex items-center justify-center whitespace-nowrap gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer shrink-0"
            >
              <Globe className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">View Live IPs</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenCreateModal("projects")}
              className="inline-flex items-center justify-center whitespace-nowrap gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-bold text-foreground hover:bg-surface-hover hover:border-brand/40 transition-all cursor-pointer shrink-0"
            >
              <Plus className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">Add Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        <StatCard
          title="Unique Visitor IPs"
          value={stats.uniqueVisitorsCount ?? (stats.visitorsCount ?? 0)}
          icon={Globe}
          subtitle="Tracked client machines"
          badge="Live IPs"
          badgeColor="cyan"
          onClick={() => onNavigateTab("visitors")}
        />
        <StatCard
          title="Today's Traffic"
          value={stats.todayVisitorsCount ?? 0}
          icon={Activity}
          subtitle="Visitors active today"
          badge="24h Window"
          badgeColor="brand"
          onClick={() => onNavigateTab("visitors")}
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
          title="Client Inquiries"
          value={stats.inquiriesCount}
          icon={MessageSquare}
          subtitle={`${stats.unreadInquiriesCount} new messages`}
          badge={stats.unreadInquiriesCount > 0 ? "Action" : "Leads"}
          badgeColor="brand"
          onClick={() => onNavigateTab("inquiries")}
        />
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
          title="Inbound Applications"
          value={stats.applicationsCount}
          icon={UserCheck}
          subtitle={`${stats.pendingApplicationsCount} pending review`}
          badge={stats.pendingApplicationsCount > 0 ? "Candidates" : "Pipeline"}
          badgeColor="amber"
          onClick={() => onNavigateTab("careers")}
        />
      </div>

      {/* Live Feeds: Visitor IPs + Recent Inquiries + Recent Job Applicants */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Live Visitor IPs Feed Card */}
        <div className="rounded-2xl border border-border border-l-[5px] border-l-cyan-400 bg-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">Recent Visitor IPs</h3>
                <span className="text-[10px] text-foreground-muted">Live machine telemetry</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab("visitors")}
              className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:underline cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          {recentVisitors.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-xs text-foreground-muted">
              <Globe className="h-8 w-8 text-foreground-subtle mb-2 opacity-50" />
              <span>No visitor IPs logged yet.</span>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {recentVisitors.slice(0, 4).map((v) => (
                <div
                  key={v._id}
                  onClick={() => onViewVisitor && onViewVisitor(v)}
                  className="flex items-center justify-between py-2.5 hover:bg-surface-hover/50 px-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface border border-border">
                      {getDeviceIcon(v.device)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-xs font-bold text-brand truncate">
                        {v.ip}
                      </span>
                      <span className="text-[10px] text-foreground-muted truncate">
                        {v.city || "Unknown"}, {v.country || "Global"} &bull; <span className="font-mono">{v.lastPath}</span>
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 whitespace-nowrap text-[10px] font-bold text-foreground-subtle">
                    {formatTimeAgo(v.lastVisitAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Inquiries Card */}
        <div className="rounded-2xl border border-border border-l-[5px] border-l-brand bg-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-lg bg-brand/15 text-brand">
                <MessageSquare className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Recent Client Inquiries</h3>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab("inquiries")}
              className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline cursor-pointer"
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
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-bold text-foreground truncate">
                        {inq.name}
                      </span>
                      <span className="shrink-0 whitespace-nowrap rounded-md bg-surface border border-border px-1.5 py-0.5 text-[9px] font-semibold text-foreground-muted max-w-[130px] truncate">
                        {inq.projectType || "General"}
                      </span>
                    </div>
                    <span className="text-[11px] text-foreground-muted truncate mt-0.5">
                      {inq.message}
                    </span>
                  </div>

                  <span className="shrink-0 whitespace-nowrap rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-[10px] font-bold text-brand">
                    {inq.status || "New"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Applications Card */}
        <div className="rounded-2xl border border-border border-l-[5px] border-l-amber-500 bg-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 shrink-0 aspect-square items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
                <FileText className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Recent Job Applications</h3>
            </div>

            <button
              type="button"
              onClick={() => onNavigateTab("careers")}
              className="flex items-center gap-1 text-xs font-semibold text-amber-500 hover:underline cursor-pointer"
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
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xs font-bold text-foreground truncate">
                        {app.fullName}
                      </span>
                      <span className="shrink-0 whitespace-nowrap text-[10px] font-semibold text-foreground-subtle">
                        {app.experienceYears || "Applicant"}
                      </span>
                    </div>
                    <span className="text-[11px] text-foreground-muted truncate mt-0.5">
                      Applied for: <span className="font-semibold text-foreground">{app.roleApplied}</span>
                    </span>
                  </div>

                  <span className="shrink-0 whitespace-nowrap rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
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
