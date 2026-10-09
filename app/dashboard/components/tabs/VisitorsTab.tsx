"use client";

import { useState } from "react";
import type { VisitorItem, VisitorStats } from "@/app/services/visitorService";
import {
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Copy,
  Check,
  Eye,
  Trash2,
  RefreshCw,
  Search,
  Filter,
  Layers,
  MapPin,
  Clock,
  Activity,
  ArrowUpRight,
  Shield,
  Laptop,
} from "lucide-react";
import { EmptyState } from "../ui/EmptyState";
import { StatCard } from "../StatCard";

interface VisitorsTabProps {
  visitors: VisitorItem[];
  stats: VisitorStats | null;
  searchQuery: string;
  isLoading: boolean;
  onRefresh: () => Promise<void>;
  onViewVisitor: (visitor: VisitorItem) => void;
  onDeleteVisitor: (id: string, ip: string) => void;
  onClearAllVisitors?: () => void;
  isSuperAdmin?: boolean;
  period: "all" | "today" | "7days" | "30days";
  onPeriodChange: (period: "all" | "today" | "7days" | "30days") => void;
  deviceFilter: string;
  onDeviceFilterChange: (device: string) => void;
}

export function VisitorsTab({
  visitors,
  stats,
  searchQuery,
  isLoading,
  onRefresh,
  onViewVisitor,
  onDeleteVisitor,
  onClearAllVisitors,
  isSuperAdmin = false,
  period,
  onPeriodChange,
  deviceFilter,
  onDeviceFilterChange,
}: VisitorsTabProps) {
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleCopy = (ip: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-3.5 w-3.5 text-brand" />;
      case "tablet":
        return <Tablet className="h-3.5 w-3.5 text-amber-500" />;
      default:
        return <Monitor className="h-3.5 w-3.5 text-cyan-400" />;
    }
  };

  const formatTimeAgo = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const now = new Date();
      const past = new Date(dateStr);
      const diffMs = now.getTime() - past.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays}d ago`;
      return past.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    } catch {
      return dateStr;
    }
  };

  // Filter local items if client search query is applied on top
  const filteredVisitors = visitors.filter((v) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      v.ip.toLowerCase().includes(q) ||
      (v.city && v.city.toLowerCase().includes(q)) ||
      (v.country && v.country.toLowerCase().includes(q)) ||
      (v.lastPath && v.lastPath.toLowerCase().includes(q)) ||
      (v.browser && v.browser.toLowerCase().includes(q)) ||
      (v.os && v.os.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* 1. Top Traffic Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          title="Total Page Hits"
          value={stats?.totalVisitsCount || visitors.reduce((sum, v) => sum + (v.totalVisits || 1), 0)}
          icon={Activity}
          subtitle="Cumulative traffic views"
          badge="Live Ping"
          badgeColor="brand"
        />
        <StatCard
          title="Unique Visitor IPs"
          value={stats?.totalUniqueVisitors || visitors.length}
          icon={Globe}
          subtitle="Distinct client machines"
          badge="Tracked"
          badgeColor="cyan"
        />
        <StatCard
          title="Today's Active IPs"
          value={stats?.todayActiveVisitors || 0}
          icon={Clock}
          subtitle="Visitors in last 24h"
          badge="Active Today"
          badgeColor="brand"
        />
        <StatCard
          title="Top Traffic Region"
          value={stats?.topCountries?.[0]?.country || "Global"}
          icon={MapPin}
          subtitle={
            stats?.topCountries?.[0]
              ? `${stats.topCountries[0].count} visitors`
              : "Analyzing geodata"
          }
          badge="Top Origin"
          badgeColor="purple"
        />
      </div>

      {/* 2. Controls & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-border bg-surface/60 p-3 sm:p-4 backdrop-blur-sm">
        {/* Left: Time Period Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-foreground-muted mr-1 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5 text-brand" /> Period:
          </span>
          {(
            [
              { id: "all", label: "All Time" },
              { id: "today", label: "Today" },
              { id: "7days", label: "Last 7 Days" },
              { id: "30days", label: "Last 30 Days" },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onPeriodChange(item.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                period === item.id
                  ? "bg-brand text-black shadow-sm shadow-brand/20"
                  : "bg-surface text-foreground-muted hover:bg-surface-hover hover:text-foreground border border-border"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Device Filter & Refresh / Clear buttons */}
        <div className="flex items-center gap-2">
          {/* Device Filter */}
          <select
            value={deviceFilter}
            onChange={(e) => onDeviceFilterChange(e.target.value)}
            className="rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:border-brand/40 focus:border-brand focus:outline-none cursor-pointer"
          >
            <option value="">All Devices</option>
            <option value="Desktop">Desktop</option>
            <option value="Mobile">Mobile</option>
            <option value="Tablet">Tablet</option>
            <option value="Bot">Bots / Crawlers</option>
          </select>

          {/* Refresh button */}
          <button
            type="button"
            onClick={handleManualRefresh}
            title="Refresh Live Traffic Data"
            disabled={isRefreshing || isLoading}
            className="flex h-8.5 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-xs font-bold text-foreground hover:bg-surface-hover hover:border-brand/40 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-brand ${
                isRefreshing || isLoading ? "animate-spin" : ""
              }`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Clear all (Superadmin only) */}
          {isSuperAdmin && onClearAllVisitors && (
            <button
              type="button"
              onClick={onClearAllVisitors}
              title="Clear all visitor logs"
              className="flex h-8.5 items-center gap-1 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 text-xs font-bold text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Purge Logs</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Main Visitor Logs Table */}
      <div className="rounded-2xl sm:rounded-3xl border border-border bg-white dark:bg-[#0E1317] shadow-xl overflow-hidden">
        <div className="border-b border-border px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/15 text-brand">
              <Globe className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Live Visitor IP Logbook
              </h3>
              <p className="text-[11px] text-foreground-muted">
                Real-time connection stream capturing incoming traffic & machine telemetry
              </p>
            </div>
          </div>
          <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-xs font-extrabold text-brand">
            {filteredVisitors.length} IP Record{filteredVisitors.length === 1 ? "" : "s"}
          </span>
        </div>

        {isLoading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-surface/60 animate-pulse" />
            ))}
          </div>
        ) : filteredVisitors.length === 0 ? (
          <div className="p-6">
            <EmptyState
              icon={Globe}
              title="No visitor logs found"
              description={
                searchQuery
                  ? `No visitors match the search query "${searchQuery}".`
                  : "No traffic recorded yet for the selected period. As people visit your website, their IP addresses and device details will automatically appear here."
              }
              actionLabel="Refresh Logs"
              onAction={handleManualRefresh}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface/50 text-[10px] font-extrabold uppercase tracking-wider text-foreground-subtle select-none">
                  <th className="py-3 px-4 sm:px-5">IP Address</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Device & Browser</th>
                  <th className="py-3 px-4">Last Page Visited</th>
                  <th className="py-3 px-3 text-center">Visits</th>
                  <th className="py-3 px-4 text-right">Last Active</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-xs">
                {filteredVisitors.map((visitor) => {
                  const isCopied = copiedIp === visitor.ip;

                  return (
                    <tr
                      key={visitor._id}
                      onClick={() => onViewVisitor(visitor)}
                      className="group hover:bg-surface/70 transition-colors cursor-pointer"
                    >
                      {/* IP Address */}
                      <td className="py-3.5 px-4 sm:px-5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand tracking-tight">
                            {visitor.ip}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleCopy(visitor.ip, e)}
                            title="Copy IP Address"
                            className="p-1 rounded-md text-foreground-subtle hover:text-brand hover:bg-surface transition-colors cursor-pointer"
                          >
                            {isCopied ? (
                              <Check className="h-3.5 w-3.5 text-brand" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                        <span className="text-[10px] text-foreground-subtle block font-mono">
                          {visitor.isp || (visitor.ip.includes(":") ? "IPv6" : "IPv4")}
                        </span>
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                          <div className="min-w-0">
                            <span className="font-semibold text-foreground block truncate">
                              {visitor.country && visitor.country !== "Unknown"
                                ? visitor.country
                                : "Global / Web"}
                            </span>
                            <span className="text-[10px] text-foreground-muted block truncate">
                              {visitor.city && visitor.city !== "Unknown"
                                ? visitor.city
                                : visitor.region || "Location detected"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Device & Browser */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface border border-border">
                            {getDeviceIcon(visitor.device)}
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-foreground block truncate">
                              {visitor.browser || "Unknown Browser"}
                            </span>
                            <span className="text-[10px] text-foreground-muted block truncate">
                              {visitor.os} &bull; {visitor.device}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Last Page Visited */}
                      <td className="py-3.5 px-4">
                        <div className="min-w-0 max-w-[200px]">
                          <span
                            className="inline-block font-mono text-[11px] font-bold text-foreground bg-surface/80 border border-border px-2 py-0.5 rounded-lg truncate max-w-full"
                            title={visitor.lastPath}
                          >
                            {visitor.lastPath || "/"}
                          </span>
                          <span
                            className="text-[10px] text-foreground-subtle block truncate mt-0.5"
                            title={visitor.lastReferrer}
                          >
                            Ref: {visitor.lastReferrer || "Direct"}
                          </span>
                        </div>
                      </td>

                      {/* Total Visits Badge */}
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-flex items-center justify-center rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-black text-brand border border-brand/20">
                          {visitor.totalVisits || 1}
                        </span>
                      </td>

                      {/* Last Active */}
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-bold text-foreground block">
                          {formatTimeAgo(visitor.lastVisitAt)}
                        </span>
                        <span className="text-[10px] text-foreground-subtle block">
                          {visitor.lastVisitAt
                            ? new Date(visitor.lastVisitAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div
                          className="flex items-center justify-center gap-1.5"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => onViewVisitor(visitor)}
                            title="View Full Visit History"
                            className="flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted hover:bg-brand/10 hover:text-brand hover:border-brand/40 transition-colors cursor-pointer"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteVisitor(visitor._id, visitor.ip)}
                            title="Delete Visitor Log"
                            className="flex h-7.5 w-7.5 items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted hover:bg-rose-500/15 hover:text-rose-500 hover:border-rose-500/40 transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 4. Geography & Device Breakdown Widgets */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Top Pages Visited */}
          <div className="rounded-2xl border border-border bg-white dark:bg-[#0E1317] p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-brand" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Top Visited Pages
                </h4>
              </div>
              <span className="text-[10px] text-foreground-muted">Most popular URLs</span>
            </div>

            <div className="space-y-2">
              {stats.topPages && stats.topPages.length > 0 ? (
                stats.topPages.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-surface/50 p-2.5 border border-border/60"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand/15 text-[10px] font-bold text-brand">
                        #{idx + 1}
                      </span>
                      <span className="font-mono text-xs font-bold text-foreground truncate">
                        {p.path}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-brand shrink-0 ml-2">
                      {p.count} hit{p.count === 1 ? "" : "s"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-foreground-muted py-2 text-center">
                  No page visit aggregates yet
                </p>
              )}
            </div>
          </div>

          {/* Top Visitor Countries */}
          <div className="rounded-2xl border border-border bg-white dark:bg-[#0E1317] p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Top Visitor Locations
                </h4>
              </div>
              <span className="text-[10px] text-foreground-muted">By country</span>
            </div>

            <div className="space-y-2">
              {stats.topCountries && stats.topCountries.length > 0 ? (
                stats.topCountries.map((c, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl bg-surface/50 p-2.5 border border-border/60"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-cyan-500/15 text-[10px] font-bold text-cyan-400">
                        #{idx + 1}
                      </span>
                      <span className="text-xs font-bold text-foreground truncate">
                        {c.country}
                      </span>
                    </div>
                    <span className="text-xs font-extrabold text-cyan-400 shrink-0 ml-2">
                      {c.count} visitor{c.count === 1 ? "" : "s"}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-foreground-muted py-2 text-center">
                  Location data being aggregated
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
