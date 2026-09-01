"use client";

import { X, Mail, Phone, ExternalLink, Download, FileText, Award } from "lucide-react";
import type { JobApplication } from "@/app/services/careerService";
import { getMediaUrl } from "@/app/services/apiClient";

interface ApplicationViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: JobApplication | null;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
}

export function ApplicationViewModal({
  isOpen,
  onClose,
  application,
  onUpdateStatus,
}: ApplicationViewModalProps) {
  if (!isOpen || !application) return null;

  const appId = application._id || application.id || "";
  const resumeHref = application.resumeUrl ? getMediaUrl(application.resumeUrl) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-foreground">Candidate Application</h3>
              <p className="text-xs text-foreground-muted">
                Applied for <span className="font-bold text-foreground">{application.roleApplied}</span>
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

        {/* Candidate Info Grid */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-xl border border-border bg-surface/50 p-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
              Applicant Name
            </span>
            <p className="text-sm font-bold text-foreground mt-0.5">{application.fullName}</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
              Email Address
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <a
                href={`mailto:${application.email}`}
                className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
              >
                <span>{application.email}</span>
                <Mail className="h-3 w-3" />
              </a>
            </div>
          </div>

          {application.phone && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                Phone Number
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <a
                  href={`tel:${application.phone}`}
                  className="text-xs font-semibold text-foreground hover:text-brand flex items-center gap-1"
                >
                  <span>{application.phone}</span>
                  <Phone className="h-3 w-3" />
                </a>
              </div>
            </div>
          )}

          {application.experienceYears && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                Relevant Experience
              </span>
              <p className="text-xs font-bold text-foreground mt-0.5">{application.experienceYears}</p>
            </div>
          )}
        </div>

        {/* Portfolios & Links */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {application.portfolioUrl && (
            <a
              href={application.portfolioUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:text-brand hover:border-brand/40 transition-colors"
            >
              <span>Portfolio Website</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {application.githubUrl && (
            <a
              href={application.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:text-brand hover:border-brand/40 transition-colors"
            >
              <span>GitHub Profile</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}

          {application.linkedinUrl && (
            <a
              href={application.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:text-brand hover:border-brand/40 transition-colors"
            >
              <span>LinkedIn Profile</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>

        {/* Resume Attachment */}
        {resumeHref ? (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-brand/30 bg-brand/5 p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/15 text-brand">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">Candidate Resume / CV</span>
                <span className="text-[10px] text-foreground-muted">Attached PDF/Document</span>
              </div>
            </div>

            <a
              href={resumeHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-black hover:bg-brand-hover hover:text-white transition-all shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        ) : (
          <div className="mt-4 rounded-xl border border-border bg-surface/40 p-3 text-center text-xs text-foreground-muted">
            No resume file attached by candidate.
          </div>
        )}

        {/* Cover Letter */}
        {application.coverLetter && (
          <div className="mt-4">
            <span className="text-xs font-bold text-foreground">Cover Note / Candidate Message:</span>
            <div className="mt-1.5 rounded-xl border border-border bg-surface p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap">
              {application.coverLetter}
            </div>
          </div>
        )}

        {/* Status Pipeline & Direct Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-bold text-foreground">Pipeline Stage:</span>
            <select
              value={application.status || "Pending"}
              onChange={(e) => onUpdateStatus(appId, e.target.value)}
              className="h-8 rounded-lg border border-border bg-surface px-2.5 text-xs font-semibold text-foreground focus:border-brand focus:outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Rejected">Rejected</option>
              <option value="Hired">Hired</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={`mailto:${application.email}?subject=${encodeURIComponent(`Application for ${application.roleApplied} at Programming Bridge`)}`}
              className="flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-black hover:bg-brand-hover hover:text-white transition-all shadow-sm"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Contact Candidate</span>
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
