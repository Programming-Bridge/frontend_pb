"use client";

import { useState } from "react";
import { MessageSquare, Eye, Trash2 } from "lucide-react";
import type { InquiryItem } from "@/app/services/inquiryService";
import { EmptyState } from "../ui/EmptyState";

interface InquiriesTabProps {
  inquiries: InquiryItem[];
  searchQuery: string;
  onViewInquiry: (inquiry: InquiryItem) => void;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onDeleteInquiry: (id: string, name: string) => void;
}

export function InquiriesTab({
  inquiries,
  searchQuery,
  onViewInquiry,
  onUpdateStatus,
  onDeleteInquiry,
}: InquiriesTabProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus =
      statusFilter === "all" || (inq.status || "New").toLowerCase() === statusFilter.toLowerCase();

    if (!searchQuery.trim()) return matchesStatus;

    const q = searchQuery.toLowerCase();
    const matchesQuery =
      inq.name?.toLowerCase().includes(q) ||
      inq.email?.toLowerCase().includes(q) ||
      inq.message?.toLowerCase().includes(q) ||
      inq.projectType?.toLowerCase().includes(q) ||
      inq.company?.toLowerCase().includes(q);

    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-foreground tracking-tight">
            Client Inquiries & Project Leads ({inquiries.length})
          </h2>
          <p className="text-xs text-foreground-muted">
            Manage inbound client contact forms, project scopes, and follow-ups
          </p>
        </div>
      </div>

      {/* Filter Tabs (Horizontally scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 max-w-full">
        {["all", "New", "In Review", "Contacted", "Closed"].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
              statusFilter === status
                ? "bg-brand text-black shadow-sm"
                : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
            }`}
          >
            {status === "all" ? "All Messages" : status}
          </button>
        ))}
      </div>

      {/* Inquiries List & Table */}
      {filteredInquiries.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No Inquiries Found"
          description="Client contact requests submitted through the website will appear here."
        />
      ) : (
        <div>
          {/* Mobile Card View (< md) */}
          <div className="space-y-3.5 block md:hidden">
            {filteredInquiries.map((inq) => {
              const inqId = inq._id || inq.id || "";

              return (
                <div
                  key={inqId}
                  className="rounded-2xl border border-border bg-card p-4 space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{inq.name}</h4>
                      {inq.company && (
                        <p className="text-[10px] text-foreground-subtle font-medium">{inq.company}</p>
                      )}
                      <span className="inline-block mt-0.5 rounded-md bg-surface border border-border px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                        {inq.projectType || "General"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onViewInquiry(inq)}
                        className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                        title="View Message"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteInquiry(inqId, inq.name)}
                        className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Delete Message"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed bg-surface/40 p-2.5 rounded-xl border border-border/60">
                    {inq.message}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <a
                      href={`mailto:${inq.email}`}
                      className="text-[11px] font-semibold text-brand hover:underline truncate max-w-[170px]"
                    >
                      {inq.email}
                    </a>

                    <select
                      value={inq.status || "New"}
                      onChange={(e) => onUpdateStatus(inqId, e.target.value)}
                      className={`rounded-lg border px-2 py-1 text-[11px] font-bold focus:outline-none transition-colors cursor-pointer ${
                        inq.status === "Closed"
                          ? "bg-slate-500/10 border-slate-500/30 text-slate-500"
                          : inq.status === "Contacted"
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                          : inq.status === "In Review"
                          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400"
                          : "bg-brand/10 border-brand/30 text-brand"
                      }`}
                    >
                      <option value="New">New</option>
                      <option value="In Review">In Review</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
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
                  <th className="px-4 py-3">Client / Sender</th>
                  <th className="px-4 py-3">Project Type & Budget</th>
                  <th className="px-4 py-3">Message Summary</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border font-medium">
                {filteredInquiries.map((inq) => {
                  const inqId = inq._id || inq.id || "";

                  return (
                    <tr key={inqId} className="hover:bg-surface-hover/50 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex flex-col">
                          <span className="font-bold text-foreground">{inq.name}</span>
                          <a
                            href={`mailto:${inq.email}`}
                            className="text-[11px] text-brand hover:underline font-semibold mt-0.5"
                          >
                            {inq.email}
                          </a>
                          {inq.company && (
                            <span className="text-[10px] text-foreground-subtle">{inq.company}</span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-foreground">
                            {inq.projectType || "General Inquiry"}
                          </span>
                          {inq.budgetRange && (
                            <span className="text-[10px] text-foreground-muted">
                              Est: {inq.budgetRange}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 max-w-xs">
                        <p className="line-clamp-2 text-foreground-muted leading-relaxed">
                          {inq.message}
                        </p>
                      </td>

                      <td className="px-4 py-3.5 text-foreground-subtle text-[11px] whitespace-nowrap">
                        {inq.createdAt
                          ? new Date(inq.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "Recent"}
                      </td>

                      <td className="px-4 py-3.5">
                        <select
                          value={inq.status || "New"}
                          onChange={(e) => onUpdateStatus(inqId, e.target.value)}
                          className={`rounded-lg border px-2 py-1 text-[11px] font-bold focus:outline-none transition-colors cursor-pointer ${
                            inq.status === "Closed"
                              ? "bg-slate-500/10 border-slate-500/30 text-slate-500"
                              : inq.status === "Contacted"
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                              : inq.status === "In Review"
                              ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400"
                              : "bg-brand/10 border-brand/30 text-brand"
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="In Review">In Review</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>

                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => onViewInquiry(inq)}
                            className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                            title="View Message"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteInquiry(inqId, inq.name)}
                            className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Delete Message"
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
    </div>
  );
}
