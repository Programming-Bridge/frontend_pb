"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  User,
  Mail,
  Phone,
  Link2,
  FileText,
  Clock,
  Sparkles,
  Upload,
  FileCheck,
  Trash2,
} from "lucide-react";
import {
  submitJobApplication,
  type JobApplicationData,
  type Career,
} from "@/app/services/careerService";

interface JobApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole?: Career | null;
  allRoles?: Career[];
}

export function JobApplyModal({
  isOpen,
  onClose,
  selectedRole,
  allRoles = [],
}: JobApplyModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleApplied, setRoleApplied] = useState("");
  const [experienceYears, setExperienceYears] = useState("3-5 Years");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectedRole?.title) {
      setRoleApplied(selectedRole.title);
    } else if (allRoles.length > 0 && !roleApplied) {
      setRoleApplied(allRoles[0].title);
    }
  }, [selectedRole, allRoles, roleApplied]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setError("File size exceeds 15MB limit. Please upload a smaller file.");
        return;
      }
      setError(null);
      setResumeFile(file);
    }
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please provide your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    if (!roleApplied.trim()) {
      setError("Please select the position you are applying for.");
      return;
    }

    setLoading(true);
    try {
      const payload: JobApplicationData = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        roleApplied: roleApplied.trim(),
        experienceYears,
        portfolioUrl: portfolioUrl.trim(),
        githubUrl: githubUrl.trim(),
        resumeUrl: resumeUrl.trim(),
        resumeFile: resumeFile,
        coverLetter: coverLetter.trim(),
      };

      await submitJobApplication(payload);
      setSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to submit application";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setError(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setPortfolioUrl("");
    setGithubUrl("");
    setResumeUrl("");
    setResumeFile(null);
    setCoverLetter("");
    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm transition-all duration-300">
      <div
        className="relative w-full max-w-2xl rounded-3xl border border-card-border bg-card p-5 sm:p-8 shadow-2xl transition-all duration-300 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 rounded-xl p-2 text-foreground-muted hover:bg-surface hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {success ? (
          /* Success Screen */
          <div className="py-8 text-center space-y-5">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-brand/10 ring-8 ring-brand/5 shadow-lg">
              <Image
                src="/logo.png"
                alt="Programming Bridge"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1 text-xs font-semibold text-brand">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Application Submitted</span>
              </div>
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                Application Received!
              </h2>
              <p className="text-sm text-foreground-muted max-w-md mx-auto leading-relaxed">
                Thank you for applying to join <strong className="text-foreground">Programming Bridge</strong> for the <span className="font-semibold text-brand">{roleApplied}</span> role. Your resume has been forwarded to our engineering hiring team.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-4 text-xs text-foreground-subtle max-w-md mx-auto text-left space-y-1.5">
              <p><strong className="text-foreground">Candidate:</strong> {fullName}</p>
              <p><strong className="text-foreground">Email:</strong> {email}</p>
              <p><strong className="text-foreground">Role:</strong> {roleApplied}</p>
              {resumeFile && (
                <p className="flex items-center gap-1 text-brand font-medium">
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>Resume Attached: {resumeFile.name} ({formatFileSize(resumeFile.size)})</span>
                </p>
              )}
            </div>

            <div className="pt-3">
              <button
                onClick={handleResetAndClose}
                className="inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand-hover transition-all cursor-pointer"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div>
            {/* Header */}
            <div className="space-y-2 pr-6">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded-lg shadow-sm ring-1 ring-border/50">
                  <Image
                    src="/logo.png"
                    alt="Programming Bridge"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-tint px-2.5 py-0.5 text-xs font-semibold text-brand">
                  <Sparkles className="h-3 w-3" />
                  <span>Programming Bridge Careers</span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Apply for Engineering Role
              </h2>
              <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                Upload your resume and details. Your application will be sent directly to our hiring team.
              </p>
            </div>

            {error && (
              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-brand" />
                  <span>Target Position *</span>
                </label>
                <select
                  value={roleApplied}
                  onChange={(e) => setRoleApplied(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                >
                  {allRoles && allRoles.length > 0 ? (
                    allRoles.map((role, idx) => (
                      <option key={idx} value={role.title}>
                        {role.title} ({role.department})
                      </option>
                    ))
                  ) : (
                    <option value={selectedRole?.title || "Senior Full-Stack Engineer"}>
                      {selectedRole?.title || "Senior Full-Stack Engineer"}
                    </option>
                  )}
                </select>
              </div>

              {/* Grid: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-brand" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-brand" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                  />
                </div>
              </div>

              {/* Grid: Phone & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-brand" />
                    <span>Phone / WhatsApp</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-brand" />
                    <span>Years of Experience</span>
                  </label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                  >
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="3-5 Years">3-5 Years (Mid-Senior)</option>
                    <option value="5-8 Years">5-8 Years (Senior / Lead)</option>
                    <option value="8+ Years">8+ Years (Principal / Staff)</option>
                  </select>
                </div>
              </div>

              {/* RESUME / CV FILE UPLOAD SECTION */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-brand" />
                    <span>Upload Resume / CV (PDF, DOCX, DOC)</span>
                  </span>
                  <span className="text-[10px] text-foreground-subtle">Max 15MB</span>
                </label>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-file-upload"
                />

                {resumeFile ? (
                  /* Uploaded File Pill */
                  <div className="flex items-center justify-between rounded-xl border border-brand/40 bg-brand-tint/40 p-3">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-white shadow-xs">
                        <FileCheck className="h-4 w-4" />
                      </div>
                      <div className="truncate text-left">
                        <p className="text-xs font-bold text-foreground truncate">
                          {resumeFile.name}
                        </p>
                        <p className="text-[10px] text-foreground-subtle">
                          {formatFileSize(resumeFile.size)}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface hover:text-red-500 transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  /* Dropzone Trigger */
                  <label
                    htmlFor="resume-file-upload"
                    className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border hover:border-brand/50 bg-surface/60 hover:bg-surface p-4 text-center cursor-pointer transition-all duration-200"
                  >
                    <Upload className="h-6 w-6 text-brand mb-1.5 transition-transform group-hover:scale-110" />
                    <span className="text-xs font-bold text-foreground">
                      Click to browse or drag & drop your Resume
                    </span>
                    <span className="text-[10px] text-foreground-subtle mt-0.5">
                      Supports PDF, DOCX, DOC, PNG, JPG (up to 15MB)
                    </span>
                  </label>
                )}
              </div>

              {/* Grid: Portfolio / GitHub & Optional Resume Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                    <Link2 className="h-3.5 w-3.5 text-brand" />
                    <span>GitHub or Portfolio URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-brand" />
                    <span>Or Online Resume / Drive Link</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/... or LinkedIn"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                  />
                </div>
              </div>

              {/* Cover Letter / Note */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5">
                  Why are you a good fit for this role? (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Share a brief overview of relevant projects, architecture experience, or achievements..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-foreground-muted hover:bg-surface hover:text-foreground transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand-hover transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobApplyModal;
