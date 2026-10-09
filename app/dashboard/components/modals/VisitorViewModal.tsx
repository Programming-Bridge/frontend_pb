"use client";

import { useState } from "react";
import type { VisitorItem } from "@/app/services/visitorService";
import {
  X,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  ExternalLink,
  Copy,
  Check,
  MapPin,
  Calendar,
  Layers,
  Compass,
  Cpu,
  Shield,
  Activity,
} from "lucide-react";

interface VisitorViewModalProps {
  isOpen: boolean;
  visitor: VisitorItem | null;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export function VisitorViewModal({
  isOpen,
  visitor,
  onClose,
  onDelete,
}: VisitorViewModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !visitor) return null;

  const handleCopyIp = () => {
    if (visitor?.ip) {
      navigator.clipboard.writeText(visitor.ip);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device?.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-4 w-4 text-brand" />;
      case "tablet":
        return <Tablet className="h-4 w-4 text-amber-500" />;
      default:
        return <Monitor className="h-4 w-4 text-cyan-400" />;
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl border border-border bg-white dark:bg-[#0E1317] p-5 sm:p-7 shadow-2xl shadow-black/40 z-10 my-auto max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/15 text-brand border border-brand/20">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-foreground tracking-tight">
                  Visitor Profile & IP Logs
                </h3>
                <span className="rounded-md bg-brand/15 px-2 py-0.5 text-[11px] font-bold text-brand border border-brand/20">
                  {visitor.totalVisits} {visitor.totalVisits === 1 ? "Visit" : "Visits"}
                </span>
              </div>
              <p className="text-xs text-foreground-muted">
                Detailed telemetry for client IP: <span className="font-mono text-foreground font-semibold">{visitor.ip}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-foreground-muted hover:bg-surface hover:text-foreground border border-transparent hover:border-border transition-all cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5 pr-1">
          {/* IP & Geolocation Hero Card */}
          <div className="rounded-2xl border border-border bg-surface/50 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                  Client IP Address
                </span>
                <div className="flex items-center gap-2.5 mt-0.5">
                  <span className="text-xl sm:text-2xl font-black font-mono text-brand">
                    {visitor.ip}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyIp}
                    title="Copy IP Address"
                    className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-foreground-muted hover:text-foreground hover:border-brand/40 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-brand" />
                        <span className="text-brand">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-xl border border-border bg-surface px-3 py-2 text-right">
                  <span className="text-[10px] font-semibold text-foreground-subtle block">First Seen</span>
                  <span className="text-xs font-bold text-foreground">{formatDate(visitor.firstVisitAt)}</span>
                </div>
                <div className="rounded-xl border border-border bg-surface px-3 py-2 text-right">
                  <span className="text-[10px] font-semibold text-foreground-subtle block">Last Active</span>
                  <span className="text-xs font-bold text-brand">{formatDate(visitor.lastVisitAt)}</span>
                </div>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-cyan-400" /> Location
                </span>
                <p className="text-xs font-bold text-foreground">
                  {visitor.city || "Unknown"}, {visitor.country || "Unknown"}
                </p>
                <span className="text-[10px] text-foreground-muted block">
                  {visitor.region && visitor.region !== "Unknown" ? visitor.region : visitor.countryCode}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle flex items-center gap-1">
                  {getDeviceIcon(visitor.device)} Device & OS
                </span>
                <p className="text-xs font-bold text-foreground">
                  {visitor.device} &bull; {visitor.os}
                </p>
                <span className="text-[10px] text-foreground-muted block">
                  {visitor.screenResolution || "Screen N/A"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle flex items-center gap-1">
                  <Compass className="h-3 w-3 text-amber-500" /> Browser
                </span>
                <p className="text-xs font-bold text-foreground truncate">
                  {visitor.browser}
                </p>
                <span className="text-[10px] text-foreground-muted block">
                  Lang: {visitor.language || "en"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle flex items-center gap-1">
                  <Layers className="h-3 w-3 text-purple-400" /> Last Visited Page
                </span>
                <p className="text-xs font-mono font-bold text-foreground truncate" title={visitor.lastPath}>
                  {visitor.lastPath || "/"}
                </p>
                <span className="text-[10px] text-foreground-muted block truncate" title={visitor.lastReferrer}>
                  Ref: {visitor.lastReferrer || "Direct"}
                </span>
              </div>
            </div>
          </div>

          {/* User Agent Raw Details */}
          {visitor.userAgent && (
            <div className="rounded-2xl border border-border bg-surface/30 p-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle block mb-1">
                Raw User-Agent Header
              </span>
              <p className="text-[11px] font-mono text-foreground-muted break-all bg-surface/80 p-2.5 rounded-xl border border-border/60">
                {visitor.userAgent}
              </p>
            </div>
          )}

          {/* Visit History Log */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-brand" /> Page Navigation Journey ({visitor.visitsHistory?.length || 1})
              </span>
              <span className="text-[10px] text-foreground-muted">Most recent first</span>
            </div>

            <div className="rounded-2xl border border-border bg-surface/40 overflow-hidden divide-y divide-border/60">
              {visitor.visitsHistory && visitor.visitsHistory.length > 0 ? (
                visitor.visitsHistory.map((v, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 gap-2 hover:bg-surface/80 transition-colors">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-surface border border-border text-[10px] font-bold text-foreground-muted">
                        #{visitor.visitsHistory!.length - idx}
                      </span>
                      <div className="min-w-0">
                        <span className="font-mono text-xs font-bold text-brand block truncate">
                          {v.path || "/"}
                        </span>
                        <span className="text-[10px] text-foreground-muted block truncate">
                          Referrer: {v.referrer || "Direct"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <span className="text-[10px] text-foreground-muted font-medium flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(v.timestamp)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-foreground-muted">
                  Last recorded visit to <span className="font-mono text-brand">{visitor.lastPath}</span> on {formatDate(visitor.lastVisitAt)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-4 shrink-0">
          <span className="text-[11px] text-foreground-muted">
            Visitor ID: <span className="font-mono">{visitor.visitorId || visitor._id}</span>
          </span>
          <div className="flex items-center gap-2">
            {onDelete && (
              <button
                type="button"
                onClick={() => {
                  onDelete(visitor._id);
                  onClose();
                }}
                className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
              >
                Delete Log
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-brand px-5 py-2 text-xs font-bold text-black hover:bg-brand-hover transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
