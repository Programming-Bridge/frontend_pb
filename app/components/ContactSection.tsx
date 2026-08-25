"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  MessageSquare,
  Globe,
  RefreshCw,
} from "lucide-react";
import { submitInquiry, type InquiryPayload } from "@/app/services/inquiryService";
import { SectionWrapper, SectionHeader } from "./common";

const PROJECT_TYPES = [
  "Custom Web & Cloud",
  "Mobile App Development",
  "AI & Data Workflows",
  "Cloud & DevOps",
  "System Architecture",
  "API & Security",
];

const BUDGET_RANGES = [
  "< $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000",
  "$50,000+",
  "Flexible / Undecided",
];

const initialFormState: InquiryPayload = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectType: PROJECT_TYPES[0],
  budgetRange: BUDGET_RANGES[1],
  message: "",
};

export function ContactSection() {
  const [formData, setFormData] = useState<InquiryPayload>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.name.trim()) return setErrorMessage("Please enter your name.");
    if (!formData.email.trim() || !formData.email.includes("@"))
      return setErrorMessage("Please provide a valid work email address.");
    if (!formData.message.trim())
      return setErrorMessage("Please describe your project requirements.");

    setLoading(true);
    try {
      const res = await submitInquiry(formData);
      setSuccessMessage(
        res.message ||
          "Your inquiry has been received! Our engineering lead will review it and reply within 24 hours."
      );
      setFormData(initialFormState);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send message. Please email us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="contact" variant="surface" border="top" ariaLabel="Contact and Consultation">
      {/* Header */}
      <SectionHeader
        badge="Contact"
        subBadge="Get in Touch"
        title={
          <>
            Tell Us About Your <span className="text-brand">Project</span>
          </>
        }
        description="Have an idea or existing system you need to build or scale? Share your requirements below. A technical lead will review your scope and get back to you within 24 hours."
      />

      {/* Form & Info Layout */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Info & SLAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl border border-card-border bg-card p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-foreground">What to expect</h3>
            <p className="mt-2 text-xs sm:text-sm text-foreground-muted leading-relaxed">
              Direct conversations with engineers who write code—not sales representatives.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">24-Hour Response</h4>
                  <p className="text-xs text-foreground-muted">Technical feasibility feedback and initial timeline estimates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-foreground">Mutual NDA Protection</h4>
                  <p className="text-xs text-foreground-muted">Your idea, architecture, and codebase remain strictly confidential.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="mailto:contact@programmingbridge.com"
              className="group flex flex-col rounded-xl border border-card-border bg-card p-4 transition-all hover:border-brand/40 hover:shadow-xs"
            >
              <div className="flex items-center gap-2 text-brand">
                <Mail className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Email</span>
              </div>
              <span className="mt-2 text-xs font-semibold text-foreground group-hover:text-brand transition-colors truncate">
                contact@programmingbridge.com
              </span>
              <span className="text-[11px] text-foreground-subtle mt-0.5">Avg response: &lt; 2 hours</span>
            </a>

            <div className="flex flex-col rounded-xl border border-card-border bg-card p-4">
              <div className="flex items-center gap-2 text-brand-cyan">
                <Globe className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Availability</span>
              </div>
              <span className="mt-2 text-xs font-semibold text-foreground">Global Engagements</span>
              <span className="text-[11px] text-foreground-subtle mt-0.5">Remote agile squads</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-card-border bg-card p-6 sm:p-8 shadow-xs">
            {successMessage ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand ring-8 ring-brand/5">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Inquiry Received</h3>
                <p className="text-xs sm:text-sm text-foreground-muted max-w-md">{successMessage}</p>
                <button
                  type="button"
                  onClick={() => {
                    setSuccessMessage(null);
                    setErrorMessage(null);
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Send another inquiry</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-subtle" />
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-subtle" />
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Phone / WhatsApp (Optional)</label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-subtle" />
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">Company Name</label>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-subtle" />
                      <input
                        type="text"
                        placeholder="Your company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Focus */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Primary Service Focus</label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((type) => {
                      const isSelected = formData.projectType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, projectType: type })}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-brand text-white font-semibold"
                              : "border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-foreground"
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Estimated Budget Range</label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_RANGES.map((budget) => {
                      const isSelected = formData.budgetRange === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => setFormData({ ...formData, budgetRange: budget })}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? "bg-foreground text-background font-semibold"
                              : "border border-border bg-surface text-foreground-muted hover:border-border-hover hover:text-foreground"
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Project Details <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-foreground-subtle" />
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the project goals, tech stack, timeline, or key challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 pl-10 text-xs sm:text-sm text-foreground placeholder:text-foreground-subtle focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand py-3.5 px-6 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <p className="mt-2.5 text-center text-[11px] text-foreground-subtle">
                    Strictly confidential under mutual NDA. We never share your data.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export { ContactSection as InquirySection };
export default ContactSection;
