"use client";

import { X, Mail, Phone, MessageSquare } from "lucide-react";
import type { InquiryItem } from "@/app/services/inquiryService";
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

interface InquiryViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: InquiryItem | null;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onComposeEmail?: (inquiry: InquiryItem) => void;
}

export function InquiryViewModal({
  isOpen,
  onClose,
  inquiry,
  onUpdateStatus,
  onComposeEmail,
}: InquiryViewModalProps) {
  if (!isOpen || !inquiry) return null;

  const inqId = inquiry._id || inquiry.id || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[92vh] sm:max-h-[94vh] flex flex-col rounded-3xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-3.5 sm:py-4 bg-surface/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 aspect-square items-center justify-center rounded-2xl bg-brand/15 text-brand shadow-inner">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">Client Inquiry Details</h3>
              <p className="text-[11px] text-foreground-muted">
                Received on {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recent"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {/* Sender Info Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-2xl border border-border border-l-4 border-l-brand bg-surface/50 p-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                Client Name
              </span>
              <p className="text-sm font-bold text-foreground mt-0.5">{inquiry.name}</p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                Email Address
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
                >
                  <span>{inquiry.email}</span>
                  <Mail className="h-3 w-3" />
                </a>
              </div>
            </div>

            {inquiry.phone && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                  Phone Number
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="text-xs font-semibold text-foreground hover:text-brand flex items-center gap-1"
                  >
                    <span>{inquiry.phone}</span>
                    <Phone className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {inquiry.company && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                  Organization / Company
                </span>
                <p className="text-xs font-semibold text-foreground mt-0.5">{inquiry.company}</p>
              </div>
            )}

            {inquiry.projectType && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                  Project Category
                </span>
                <p className="text-xs font-bold text-foreground mt-0.5">{inquiry.projectType}</p>
              </div>
            )}

            {inquiry.budgetRange && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                  Estimated Budget
                </span>
                <p className="text-xs font-bold text-foreground mt-0.5">{inquiry.budgetRange}</p>
              </div>
            )}
          </div>

          {/* Message Content */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle block mb-1">
              Project Scope / Client Message
            </span>
            <div className="rounded-2xl border border-border bg-surface p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap font-sans">
              {inquiry.message}
            </div>
          </div>
        </div>

        {/* Status Pipeline & Direct Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border px-4 sm:px-6 py-3.5 sm:py-4 bg-surface/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground shrink-0">Stage:</span>
            <StatusDropdown
              value={inquiry.status || "New"}
              options={INQUIRY_STATUS_OPTIONS}
              onChange={(newVal) => onUpdateStatus(inqId, newVal)}
            />
          </div>

          <div className="flex items-center gap-2 justify-end">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onComposeEmail) {
                  onComposeEmail(inquiry);
                }
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-extrabold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Send Proposal</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


