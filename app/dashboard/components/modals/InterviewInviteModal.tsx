"use client";

import { useState, useEffect } from "react";
import {
  X,
  Send,
  Calendar,
  Clock,
  Video,
  Link2,
  Users,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit3,
  Moon,
  Sun,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { JobApplication, InterviewInvitePayload } from "@/app/services/careerService";
import { inviteCandidateToInterview } from "@/app/services/careerService";

interface InterviewInviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: JobApplication | null;
  onInterviewScheduled?: (updatedApplication: JobApplication) => void;
}

export function InterviewInviteModal({
  isOpen,
  onClose,
  application,
  onInterviewScheduled,
}: InterviewInviteModalProps) {
  const [interviewDate, setInterviewDate] = useState<string>("");
  const [interviewTime, setInterviewTime] = useState<string>("03:00 PM PKT");
  const [interviewType, setInterviewType] = useState<string>("Google Meet");
  const [interviewLink, setInterviewLink] = useState<string>("https://meet.google.com/");
  const [interviewerName, setInterviewerName] = useState<string>("Talent Acquisition & Technical Architecture Panel");
  const [notes, setNotes] = useState<string>(
    "• Please join from a quiet environment with a reliable internet connection.\n• Test your webcam and microphone prior to joining.\n• If this is a technical role, please have your preferred IDE/code editor and GitHub repository ready."
  );

  const [activeTab, setActiveTab] = useState<"compose" | "preview">("compose");
  const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialize default date (tomorrow)
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(null);
      setActiveTab("compose");

      // Set tomorrow's date by default
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      setInterviewDate(formattedDate);
    }
  }, [isOpen, application]);

  if (!isOpen || !application) return null;

  const candidateName = application.fullName || "Candidate";
  const candidateEmail = application.email || "";
  const roleApplied = application.roleApplied || "Open Position";
  const appId = application._id || application.id || "";

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interviewDate.trim()) {
      setError("Please specify the interview date.");
      return;
    }
    if (!interviewTime.trim()) {
      setError("Please specify the interview time.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const payload: InterviewInvitePayload = {
        interviewDate: interviewDate.trim(),
        interviewTime: interviewTime.trim(),
        interviewType: interviewType.trim(),
        interviewLink: interviewLink.trim() || undefined,
        notes: notes.trim() || undefined,
        interviewerName: interviewerName.trim() || undefined,
      };

      const res = await inviteCandidateToInterview(appId, payload);

      setSuccess(res.message || "Interview invitation email sent successfully!");

      if (onInterviewScheduled && res.data) {
        onInterviewScheduled(res.data);
      }

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "Failed to send interview invitation. Please check Zoho SMTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[94vh] flex flex-col rounded-3xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border px-4 sm:px-6 py-3.5 sm:py-4 bg-surface/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 aspect-square items-center justify-center rounded-2xl bg-brand/15 text-brand shadow-inner">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight">
                Candidate Interview Invitation
              </h3>
              <p className="text-[10px] sm:text-[11px] text-foreground-muted flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5">
                <span>Sender:</span>
                <span className="font-bold text-brand">Programming Bridge Talent & HR</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
                  <ShieldCheck className="h-3 w-3" /> Zoho SMTP Active
                </span>
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

        {/* Candidate Summary Bar & Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 border-b border-border bg-surface/40">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("compose")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "compose"
                  ? "bg-brand text-black shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground border border-border"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Schedule Details</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-brand text-black shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground border border-border"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Live Email Preview</span>
            </button>
          </div>

          <div className="text-[11px] text-foreground-subtle flex items-center gap-1.5 justify-end">
            <span className="font-semibold text-foreground-muted">Candidate:</span>
            <span className="font-bold text-foreground truncate max-w-[140px] sm:max-w-[180px]">{candidateName}</span>
            <span className="text-brand font-medium truncate max-w-[120px]">({roleApplied})</span>
          </div>
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="mx-4 sm:mx-6 mt-3 flex items-center gap-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs font-medium text-rose-500 animate-in fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mx-4 sm:mx-6 mt-3 flex items-center gap-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs font-medium text-emerald-500 animate-in fade-in">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
          {activeTab === "compose" ? (
            <form id="invite-interview-form" onSubmit={handleSend} className="space-y-4">
              {/* Candidate Quick Info Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 rounded-2xl border border-border border-l-4 border-l-brand bg-surface/50 p-3.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                    Candidate Name & Email
                  </span>
                  <p className="text-xs font-bold text-foreground mt-0.5">
                    {candidateName} &bull; <span className="text-brand">{candidateEmail}</span>
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                    Position Applied
                  </span>
                  <p className="text-xs font-bold text-foreground mt-0.5">{roleApplied}</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground-subtle mb-1">
                    Interview Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      placeholder="e.g. Friday, Oct 2, 2026"
                      className="w-full rounded-xl border border-border bg-surface pl-9 pr-3.5 py-2.5 text-xs font-medium text-foreground focus:border-brand focus:ring-1 focus:ring-brand/30 focus:outline-none placeholder:text-foreground-subtle transition-all"
                    />
                    <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-foreground-subtle" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground-subtle mb-1">
                    Interview Time <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                      placeholder="e.g. 03:00 PM PKT / GMT+5"
                      className="w-full rounded-xl border border-border bg-surface pl-9 pr-3.5 py-2.5 text-xs font-medium text-foreground focus:border-brand focus:ring-1 focus:ring-brand/30 focus:outline-none placeholder:text-foreground-subtle transition-all"
                    />
                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-foreground-subtle" />
                  </div>
                </div>
              </div>

              {/* Mode & Platform Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground-subtle mb-1">
                    Meeting Platform / Mode
                  </label>
                  <select
                    value={interviewType}
                    onChange={(e) => {
                      setInterviewType(e.target.value);
                      if (e.target.value === "Google Meet" && !interviewLink.includes("meet.google.com")) {
                        setInterviewLink("https://meet.google.com/");
                      } else if (e.target.value === "Zoom" && !interviewLink.includes("zoom.us")) {
                        setInterviewLink("https://zoom.us/j/");
                      } else if (e.target.value === "In-Person Office") {
                        setInterviewLink("Programming Bridge Office Headquarters");
                      }
                    }}
                    className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-xs font-bold text-foreground focus:border-brand focus:ring-1 focus:ring-brand/30 focus:outline-none cursor-pointer transition-all"
                  >
                    <option value="Google Meet">Google Meet (Video)</option>
                    <option value="Zoom">Zoom Meeting (Video)</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                    <option value="In-Person Office">In-Person Office Visit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground-subtle mb-1">
                    Meeting Link or Room URL
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={interviewLink}
                      onChange={(e) => setInterviewLink(e.target.value)}
                      placeholder="https://meet.google.com/xyz-abcd-efg"
                      className="w-full rounded-xl border border-border bg-surface pl-9 pr-3.5 py-2.5 text-xs font-medium text-foreground focus:border-brand focus:ring-1 focus:ring-brand/30 focus:outline-none placeholder:text-foreground-subtle font-mono text-[11px] transition-all"
                    />
                    <Link2 className="absolute left-3 top-2.5 h-4 w-4 text-foreground-subtle" />
                  </div>
                </div>
              </div>

              {/* Interviewer Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground-subtle mb-1">
                  Interviewer / Panel Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={interviewerName}
                    onChange={(e) => setInterviewerName(e.target.value)}
                    placeholder="Talent Acquisition & Technical Architecture Panel"
                    className="w-full rounded-xl border border-border bg-surface pl-9 pr-3.5 py-2.5 text-xs font-medium text-foreground focus:border-brand focus:ring-1 focus:ring-brand/30 focus:outline-none placeholder:text-foreground-subtle transition-all"
                  />
                  <Users className="absolute left-3 top-2.5 h-4 w-4 text-foreground-subtle" />
                </div>
              </div>

              {/* Notes / Instructions */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground-subtle mb-1">
                  Preparation Instructions & Candidate Checklist
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special instructions for candidate..."
                  className="w-full rounded-2xl border border-border bg-surface p-3.5 text-xs font-medium text-foreground leading-relaxed focus:border-brand focus:ring-1 focus:ring-brand/30 focus:outline-none placeholder:text-foreground-subtle font-mono shadow-inner transition-all"
                />
              </div>
            </form>
          ) : (
            /* ================= LIVE EMAIL PREVIEW ================= */
            <div
              className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-xl ${
                previewTheme === "dark"
                  ? "bg-[#07090e] border-slate-800 text-slate-100"
                  : "bg-[#f1f5f9] border-slate-300 text-slate-900"
              }`}
            >
              {/* Email Client Top Meta Bar */}
              <div
                className={`px-4 sm:px-5 py-3 border-b text-xs ${
                  previewTheme === "dark"
                    ? "bg-[#0b0f19] border-slate-800 text-slate-400"
                    : "bg-white border-slate-200 text-slate-500"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="space-y-0.5 truncate">
                    <p className="truncate">
                      <span className="font-bold text-foreground">From:</span> Programming Bridge Talent & HR &lt;official@programmingbridge.org&gt;
                    </p>
                    <p className="truncate">
                      <span className="font-bold text-foreground">To:</span> {candidateEmail}
                    </p>
                    <p className="font-bold text-foreground pt-0.5 text-xs sm:text-[13px] truncate">
                      <span className="font-normal text-foreground-muted text-xs">Subject:</span> 🎯 Interview Invitation: {roleApplied} at Programming Bridge
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewTheme(previewTheme === "dark" ? "light" : "dark")}
                    className="shrink-0 flex items-center gap-1 rounded-lg border border-border bg-surface px-2.5 py-1 text-xs font-bold text-foreground hover:border-brand/40 transition-colors cursor-pointer"
                  >
                    {previewTheme === "dark" ? <Moon className="h-3 w-3 text-brand" /> : <Sun className="h-3 w-3 text-amber-500" />}
                    <span>{previewTheme === "dark" ? "Dark" : "Light"}</span>
                  </button>
                </div>
              </div>

              {/* Main Simulated Card */}
              <div className="p-3 sm:p-6 flex justify-center">
                <div
                  className={`w-full max-w-xl rounded-2xl overflow-hidden border shadow-lg ${
                    previewTheme === "dark"
                      ? "bg-[#0f172a] border-slate-800"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className="h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-400" />
                  
                  {/* Header */}
                  <div className="bg-gradient-to-br from-[#090e17] to-[#111a2e] px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                        Programming <span className="text-emerald-400">Bridge</span>
                      </h4>
                      <p className="text-[9px] sm:text-[10px] font-bold text-sky-400 uppercase tracking-widest mt-0.5">
                        Talent Acquisition & Careers
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-400/15 border border-emerald-400/30 px-2.5 sm:px-3 py-1 text-[9px] sm:text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      🎯 Interview Invitation
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-6 space-y-4">
                    <p className={`text-xs ${previewTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Dear <strong>{candidateName}</strong>,
                    </p>
                    <p className={`text-xs leading-relaxed ${previewTheme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                      Thank you for applying for the <strong>{roleApplied}</strong> position at Programming Bridge. We were very impressed by your profile and would love to invite you for an official video interview session.
                    </p>

                    {/* Scheduled Details Card */}
                    <div
                      className={`rounded-xl p-4 border border-l-4 border-l-emerald-400 space-y-2 text-xs ${
                        previewTheme === "dark"
                          ? "bg-[#141e33] border-slate-800 text-slate-300"
                          : "bg-slate-50 border-slate-200 text-slate-800"
                      }`}
                    >
                      <div className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Scheduled Interview Details</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <span className="text-slate-400 block text-[10px]">🗓️ Date</span>
                          <span className="font-bold text-foreground">{interviewDate}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">⏰ Time</span>
                          <span className="font-bold text-foreground">{interviewTime}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">📹 Mode</span>
                          <span className="font-bold text-foreground">{interviewType}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">👥 Panel</span>
                          <span className="font-bold text-foreground truncate block">{interviewerName}</span>
                        </div>
                      </div>
                    </div>

                    {interviewLink && (
                      <div className="text-center pt-2">
                        <div className="inline-block rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-2.5 text-xs font-extrabold text-slate-950 uppercase tracking-wider shadow-md">
                          🚀 Join Video Interview
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">
                          Link: <span className="text-emerald-400 font-mono">{interviewLink}</span>
                        </p>
                      </div>
                    )}

                    {notes && (
                      <div className="p-3 bg-slate-500/10 rounded-xl text-[11px] text-slate-400 leading-relaxed border-l-2 border-sky-400">
                        <strong className="text-foreground">💡 Instructions:</strong>
                        <p className="mt-0.5 whitespace-pre-wrap">{notes}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-500/20 text-xs">
                      <p className="text-slate-400">Warm regards,</p>
                      <p className="text-sm font-black text-foreground mt-0.5">
                        Talent Acquisition & HR Team
                      </p>
                      <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                        hr@programmingbridge.org &bull; programmingbridge.org
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2.5 border-t border-border px-4 sm:px-6 py-3.5 sm:py-4 bg-surface/50">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-foreground hover:bg-surface-hover transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="invite-interview-form"
            disabled={loading}
            onClick={(e) => {
              if (activeTab === "preview") {
                handleSend(e);
              }
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-xs font-extrabold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                <span>Sending Interview Invite via Zoho SMTP...</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Send Interview Invitation to Candidate</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
