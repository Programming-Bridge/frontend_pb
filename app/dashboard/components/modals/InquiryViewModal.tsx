"use client";

import { X, Mail, Phone, MessageSquare } from "lucide-react";
import type { InquiryItem } from "@/app/services/inquiryService";

interface InquiryViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry: InquiryItem | null;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
}

export function InquiryViewModal({
  isOpen,
  onClose,
  inquiry,
  onUpdateStatus,
}: InquiryViewModalProps) {
  if (!isOpen || !inquiry) return null;

  const inqId = inquiry._id || inquiry.id || "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">Client Inquiry Details</h3>
              <p className="text-xs text-foreground-muted">
                Received on {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Recent"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-foreground-muted hover:bg-surface-hover hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sender Info Grid */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-xl border border-border bg-surface/50 p-4">
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
        <div className="mt-4">
          <span className="text-xs font-bold text-foreground">Project Scope / Client Message:</span>
          <div className="mt-1.5 rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
            {inquiry.message}
          </div>
        </div>

        {/* Status Pipeline & Direct Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-foreground">Status:</span>
            <select
              value={inquiry.status || "New"}
              onChange={(e) => onUpdateStatus(inqId, e.target.value)}
              className="h-8 rounded-lg border border-border bg-surface px-2.5 text-xs font-semibold text-foreground focus:border-brand focus:outline-none"
            >
              <option value="New">New</option>
              <option value="In Review">In Review</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Re: Your Project Inquiry - Programming Bridge`)}`}
              className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-black hover:bg-brand-hover hover:text-white transition-all shadow-sm"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Reply via Email</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-hover"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
