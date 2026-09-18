"use client";

import { X, Mail, Phone, ExternalLink, Download, FileText, Award, Calendar, CheckCircle2 } from "lucide-react";
import type { JobApplication } from "@/app/services/careerService";
import { getMediaUrl } from "@/app/services/apiClient";

interface ApplicationViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: JobApplication | null;
  onUpdateStatus: (id: string, status: string) => Promise<void>;
  onOpenInterviewModal?: (app: JobApplication) => void;
}

export function ApplicationViewModal({
  isOpen,
  onClose,
  application,
  onUpdateStatus,
  onOpenInterviewModal,
}: ApplicationViewModalProps) {
  if (!isOpen || !application) return null;

  const appId = application._id || application.id || "";
  const resumeHref = application.resumeUrl ? getMediaUrl(application.resumeUrl) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-xl max-h-[92vh] sm:max-h-[94vh] flex flex-col rounded-3xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-3.5 sm:py-4 bg-surface/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 aspect-square items-center justify-center rounded-2xl bg-brand/15 text-brand shadow-inner">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">Candidate Application</h3>
              <p className="text-[11px] text-foreground-muted">
                Applied for <span className="font-bold text-brand">{application.roleApplied}</span>
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
          {/* Candidate Info Grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 rounded-2xl border border-border border-l-4 border-l-brand bg-surface/50 p-4">
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
          {(application.portfolioUrl || application.githubUrl || application.linkedinUrl) && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle block mb-1.5">
                Candidate Profiles & Portfolios
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {application.portfolioUrl && (
                  <a
                    href={application.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:text-brand hover:border-brand/40 transition-colors"
                  >
                    <span>Portfolio Website</span>
                    <ExternalLink className="h-3 w-3 text-brand" />
                  </a>
                )}

                {application.githubUrl && (
                  <a
                    href={application.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:text-brand hover:border-brand/40 transition-colors"
                  >
                    <span>GitHub Profile</span>
                    <ExternalLink className="h-3 w-3 text-brand" />
                  </a>
                )}

                {application.linkedinUrl && (
                  <a
                    href={application.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground hover:text-brand hover:border-brand/40 transition-colors"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="h-3 w-3 text-brand" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Resume Attachment */}
          {resumeHref ? (
            <div className="flex items-center justify-between rounded-2xl border border-brand/30 bg-brand/5 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand shadow-inner">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">Candidate Resume / CV</span>
                  <span className="text-[10px] text-foreground-muted">Verified candidate document</span>
                </div>
              </div>

              <a
                href={resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-2 text-xs font-extrabold text-black hover:bg-brand-hover hover:text-white transition-all shadow-md shadow-brand/15"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download CV</span>
              </a>
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-surface/40 p-3.5 text-center text-xs text-foreground-muted">
              No resume file attached by candidate.
            </div>
          )}

          {/* Cover Letter */}
          {application.coverLetter && (
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle block mb-1">
                Cover Note / Candidate Message
              </span>
              <div className="rounded-2xl border border-border bg-surface p-4 text-xs leading-relaxed text-foreground whitespace-pre-wrap font-sans">
                {application.coverLetter}
              </div>
            </div>
          )}
        </div>

        {/* Status Pipeline & Action Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-border px-4 sm:px-6 py-3.5 sm:py-4 bg-surface/50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-foreground shrink-0">Stage:</span>
            <select
              value={application.status || "Pending"}
              onChange={(e) => onUpdateStatus(appId, e.target.value)}
              className="h-8.5 rounded-xl border border-border bg-surface px-3 text-xs font-bold text-foreground focus:border-brand focus:outline-none cursor-pointer transition-all"
            >
              <option value="Pending">Pending</option>
              <option value="Reviewing">Reviewing</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected (Auto-send email)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 justify-end">
            {onOpenInterviewModal && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenInterviewModal(application);
                }}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-extrabold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Schedule Interview</span>
              </button>
            )}

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
