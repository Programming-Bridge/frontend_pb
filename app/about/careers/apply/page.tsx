"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { TechStackSection } from "@/app/components/TechStackSection";
import { StatsStrip } from "@/app/components/StatsStrip";
import { SectionWrapper } from "@/app/components/common";
import {
  submitJobApplication,
  getCareers,
  type Career,
  type JobApplicationData,
} from "@/app/services/careerService";
import {
  Briefcase,
  User,
  Mail,
  Phone,
  Clock,
  Link2,
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Upload,
  FileCheck,
  Trash2,
} from "lucide-react";

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "";

  const [allRoles, setAllRoles] = useState<Career[]>([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleApplied, setRoleApplied] = useState(initialRole);
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
    async function loadRoles() {
      try {
        const roles = await getCareers();
        if (roles?.length) {
          setAllRoles(roles);
          if (!roleApplied) {
            setRoleApplied(roles[0].title);
          }
        }
      } catch (err) {
        console.error("Failed to load roles:", err);
      }
    }
    loadRoles();
  }, [roleApplied]);

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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

    setLoading(true);
    try {
      const payload: JobApplicationData = {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        roleApplied: roleApplied || "Senior Full-Stack Engineer",
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

  return (
    <div className="mx-auto max-w-2xl">
      {success ? (
        <div className="rounded-3xl border border-card-border bg-card p-8 sm:p-12 text-center space-y-5 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-8 ring-brand/5">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Application Received!
          </h2>

          <p className="text-sm text-foreground-muted max-w-md mx-auto leading-relaxed">
            Thank you for applying for the <span className="font-semibold text-brand">{roleApplied}</span> role. Your resume and application have been sent to our official recruitment team.
          </p>

          <div className="pt-4">
            <Link
              href="/about/careers"
              className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand-hover transition-all cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Careers Hub</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-card-border bg-card p-6 sm:p-10 shadow-sm">
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-tint px-3 py-1 text-xs font-semibold text-brand">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Career Application</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Submit Your Profile
            </h1>
            <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
              We review every candidate carefully. Upload your resume and details below.
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Position */}
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
                {allRoles.length > 0 ? (
                  allRoles.map((r, i) => (
                    <option key={i} value={r.title}>
                      {r.title} ({r.department})
                    </option>
                  ))
                ) : (
                  <option value={roleApplied || "Senior Full-Stack Engineer"}>
                    {roleApplied || "Senior Full-Stack Engineer"}
                  </option>
                )}
              </select>
            </div>

            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1.5 flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-brand" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
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
                  placeholder="sarah@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                />
              </div>
            </div>

            {/* Phone & Experience */}
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
                  <span>Experience Level</span>
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
                id="page-resume-file-upload"
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
                  htmlFor="page-resume-file-upload"
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

            {/* GitHub & Resume Links */}
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

            {/* Cover Letter */}
            <div>
              <label className="block text-xs font-bold text-foreground mb-1.5">
                Cover Note / Technical Achievements (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about the hardest engineering problem you've solved..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="pt-3 flex items-center justify-between border-t border-border/60">
              <Link
                href="/about/careers"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground-muted hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Open Roles</span>
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-brand/20 hover:bg-brand-hover transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Submitting...</span>
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
  );
}

export default function CareerApplyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <SectionWrapper variant="background" border="bottom" ariaLabel="Job Application Screen">
        <Suspense fallback={<div className="text-center py-20 text-foreground-muted">Loading form...</div>}>
          <ApplyFormContent />
        </Suspense>
      </SectionWrapper>

      <TechStackSection />
      <StatsStrip />
      <Footer />
    </main>
  );
}
