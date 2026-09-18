"use client";

import { useState } from "react";
import { MessageSquare, Eye, Trash2, Send, Mail } from "lucide-react";
import type { InquiryItem } from "@/app/services/inquiryService";
import { EmptyState } from "../ui/EmptyState";
import { StatusDropdown, type StatusOption } from "../ui/StatusDropdown";

const INQUIRY_STATUS_OPTIONS: StatusOption[] = [
  {
    value: "New",
    label: "New",
    badgeClass: "bg-amber-500/15 border-amber-500/30 text-amber-500",
    dotClass: "bg-amber-400",
  },
  {
    value: "In Review",
    label: "In Review",
    badgeClass: "bg-cyan-500/15 border-cyan-500/30 text-cyan-400",
    dotClass: "bg-cyan-400",
  },
  {
    value: "Contacted",
    label: "Contacted",
    badgeClass: "bg-brand/15 border-brand/30 text-brand",
    dotClass: "bg-brand",
  },
  {
    value: "Closed",
    label: "Closed",
    badgeClass: "bg-slate-500/15 border-slate-500/30 text-slate-400",
    dotClass: "bg-slate-400",
  },
];

interface InquiriesTabProps {
  inquiries: InquiryItem[];
  searchQuery: string;
  onViewInquiry: (inquiry: InquiryItem) => void;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onDeleteInquiry: (id: string, name: string) => void;
  onComposeEmail?: (inquiry?: InquiryItem) => void;
}

export function InquiriesTab({
  inquiries,
  searchQuery,
  onViewInquiry,
  onUpdateStatus,
  onDeleteInquiry,
  onComposeEmail,
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
            Client Inquiries & Project Leads ({filteredInquiries.length}
            {filteredInquiries.length !== inquiries.length ? ` of ${inquiries.length}` : ""})
          </h2>
          <p className="text-xs text-foreground-muted">
            Manage inbound client contact forms, project scopes, and follow-ups
          </p>
        </div>

        {onComposeEmail && (
          <button
            type="button"
            onClick={() => onComposeEmail()}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black hover:bg-brand-hover hover:text-white transition-all shadow-sm cursor-pointer w-full sm:w-auto shrink-0"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Compose Email / Proposal</span>
          </button>
        )}
      </div>

      {/* Filter Tabs (Horizontally scrollable on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 max-w-full scrollbar-none">
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
                  className="rounded-2xl border border-border border-l-[4px] border-l-brand bg-card p-4 space-y-3 shadow-xs"
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
                      {onComposeEmail && (
                        <button
                          type="button"
                          onClick={() => onComposeEmail(inq)}
                          className="rounded-lg p-1.5 text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                          title="Send Email / Proposal"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      )}
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

                  <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed bg-surface/40 p-2.5 rounded-xl border border-border/60 break-words overflow-hidden">
                    {inq.message}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <a
                      href={`mailto:${inq.email}`}
                      className="text-[11px] font-semibold text-brand hover:underline truncate max-w-[170px]"
                    >
                      {inq.email}
                    </a>

                    <StatusDropdown
                      value={inq.status || "New"}
                      options={INQUIRY_STATUS_OPTIONS}
                      onChange={(newVal) => onUpdateStatus(inqId, newVal)}
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
                    <th className="px-5 py-3.5 whitespace-nowrap">Client / Sender</th>
                    <th className="px-5 py-3.5 whitespace-nowrap">Project Type & Budget</th>
                    <th className="px-5 py-3.5 whitespace-nowrap">Message Summary</th>
                    <th className="px-5 py-3.5 whitespace-nowrap">Date</th>
                    <th className="px-5 py-3.5 whitespace-nowrap">Status</th>
                    <th className="px-5 py-3.5 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-border font-medium">
                  {filteredInquiries.map((inq) => {
                    const inqId = inq._id || inq.id || "";

                    return (
                      <tr key={inqId} className="hover:bg-surface-hover/50 transition-colors">
                        <td className="px-5 py-3.5">
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

                        <td className="px-5 py-3.5">
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

                        <td className="px-5 py-3.5 max-w-xs">
                          <p className="line-clamp-2 text-foreground-muted leading-relaxed">
                            {inq.message}
                          </p>
                        </td>

                        <td className="px-5 py-3.5 text-foreground-subtle text-[11px] whitespace-nowrap">
                          {inq.createdAt
                            ? new Date(inq.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "Recent"}
                        </td>

                        <td className="px-5 py-3.5">
                          <StatusDropdown
                            value={inq.status || "New"}
                            options={INQUIRY_STATUS_OPTIONS}
                            onChange={(newVal) => onUpdateStatus(inqId, newVal)}
                          />
                        </td>

                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {onComposeEmail && (
                              <button
                                type="button"
                                onClick={() => onComposeEmail(inq)}
                                className="rounded-lg p-1.5 text-brand hover:bg-brand/10 transition-colors cursor-pointer"
                                title="Send Email / Proposal"
                              >
                                <Send className="h-4 w-4" />
                              </button>
                            )}
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
        </div>
      )}
    </div>
  );
}


