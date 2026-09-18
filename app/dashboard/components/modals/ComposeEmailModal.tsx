"use client";

import { useState, useEffect } from "react";
import { X, Send, Mail, CheckCircle2, AlertCircle, Eye, Edit3, Sun, Moon, ShieldCheck, Zap, Lock, Users } from "lucide-react";
import { sendClientEmail, type InquiryItem } from "@/app/services/inquiryService";

interface ComposeEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiry?: InquiryItem | null;
  onEmailSent?: (updatedInquiry?: any) => void;
}

interface TemplateContext {
  inq?: InquiryItem | null;
  clientName?: string;
}

const getEffectiveName = (inq?: InquiryItem | null, customName?: string) => {
  return customName?.trim() || inq?.name?.trim() || "";
};

interface EmailTemplateDef {
  id: string;
  category: string;
  title: string;
  getSubject: (inq?: InquiryItem | null, clientName?: string) => string;
  getMessage: (inq?: InquiryItem | null, clientName?: string) => string;
}

const EMAIL_TEMPLATES: EmailTemplateDef[] = [
  // --- COLD OUTREACH / APOLLO NEW CLIENTS ---
  {
    id: "apollo_web_mobile",
    category: "Cold Outreach (Apollo Leads)",
    title: "🚀 [Cold Outreach] Custom Web & Mobile App Development Pitch",
    getSubject: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      return name
        ? `Engineering High-Performance Digital Solutions for ${name} | Programming Bridge`
        : `Engineering High-Performance Digital Solutions | Programming Bridge`;
    },
    getMessage: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      const salutation = name ? `Hi ${name}` : `Hi there`;
      return `${salutation},\n\nI came across your profile while researching forward-thinking companies in your domain, and I was genuinely impressed by the work you are doing.\n\nI am reaching out from Programming Bridge — an agile software engineering agency. We partner with growing businesses and modern teams to build, scale, and launch enterprise-grade web applications, mobile apps, and robust cloud platforms.\n\n💡 How We Can Add Immediate Value to Your Roadmap:\n• Full-Stack Custom Web Apps (Next.js, React, Node.js, Python, TypeScript)\n• High-Conversion UI/UX Design & Ultra-Fast Frontends\n• Cross-Platform Mobile App Engineering (iOS & Android)\n• Cloud Infrastructure, Microservices & Secure REST/GraphQL APIs\n• Seamless Integration with AI & Workflow Automation\n\n🎯 Why Companies Choose Programming Bridge:\nWe operate as your dedicated engineering arm with transparent weekly milestone sprints, senior software architects, and clean production code — without the overhead and delay of building an in-house team.\n\nWould you be open to a quick 10-15 minute introductory chat this week to explore potential technical synergies?\n\nLooking forward to connecting!`;
    },
  },
  {
    id: "apollo_mvp_saas",
    category: "Cold Outreach (Apollo Leads)",
    title: "💡 [Startup / Founders] Rapid MVP & Scalable SaaS Engineering",
    getSubject: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      return name
        ? `Fast-Track MVP & SaaS Development for ${name} | Programming Bridge`
        : `Fast-Track MVP & Scalable SaaS Development | Programming Bridge`;
    },
    getMessage: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      const salutation = name ? `Hi ${name}` : `Hi there`;
      return `${salutation},\n\nIf you are currently looking to engineer, scale, or launch your core product or SaaS platform, I would love to connect.\n\nAt Programming Bridge, we specialize in helping founders and product visionaries transform complex ideas into market-ready, enterprise-grade software in record turnaround times.\n\n📌 What We Deliver for Fast-Moving Tech Startups:\n• Rapid 0-to-1 MVP Development with clean, modular architecture\n• Enterprise-grade Scalability & Security built in from Day 1\n• High-converting, modern UI/UX crafted to maximize retention\n• Dedicated Tech Lead & Direct Communication (Slack / Meet / WhatsApp)\n• Agile bi-weekly sprints with live staging demo access\n\nWe give you the execution speed of a senior engineering team at a fraction of traditional agency costs.\n\nDo you have 10 minutes this week for a brief discovery exchange?\n\nBest regards,`;
    },
  },
  {
    id: "apollo_tech_modern",
    category: "Cold Outreach (Apollo Leads)",
    title: "⚡ [Tech Modernization] Codebase Overhaul & Speed Optimization",
    getSubject: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      return name
        ? `Upgrading & Modernizing Digital Infrastructure for ${name} - Programming Bridge`
        : `Upgrading & Scaling Digital Infrastructure - Programming Bridge`;
    },
    getMessage: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      const salutation = name ? `Hi ${name}` : `Hi there`;
      return `${salutation},\n\nI am reaching out because many fast-scaling companies face bottlenecks with legacy codebases, slow page performance, or engineering backlogs that delay feature rollouts.\n\nAt Programming Bridge, we partner with teams to eliminate technical debt, modernize application architectures, and build reliable custom software that scales smoothly under high traffic.\n\n🛠️ Our Core Modernization Capabilities:\n• Frontend & Backend Speed Optimization (Next.js / Node / Cloudflare)\n• Legacy Code Refactoring & API Modernization\n• Database Architecture Tuning (PostgreSQL, MongoDB, Redis)\n• Automated CI/CD Pipelines & Zero-Downtime Deployment\n• Comprehensive Automated Testing (Unit, Integration & E2E)\n\nIf you have any active technical bottlenecks or upcoming feature rollouts on your roadmap, we would be delighted to perform a complimentary architecture review.\n\nPlease let me know if you are open to a brief 10-minute touchpoint this week!`;
    },
  },
  {
    id: "apollo_ai_automation",
    category: "Cold Outreach (Apollo Leads)",
    title: "🤖 [AI & Automation] AI Integrations & Workflow Systems",
    getSubject: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      return name
        ? `Supercharging ${name}'s Workflows with Custom AI & Automation | Programming Bridge`
        : `Supercharging Business Workflows with Custom AI & Automation | Programming Bridge`;
    },
    getMessage: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      const salutation = name ? `Hi ${name}` : `Hi there`;
      return `${salutation},\n\nModern businesses are drastically cutting operational costs and speeding up deliveries by embedding custom AI tools and automated workflows directly into their products.\n\nAt Programming Bridge, our engineering team builds tailored AI solutions, LLM integrations, and intelligent automation pipelines that seamlessly fit into your existing software ecosystem.\n\n🚀 What We Can Build for Your Team:\n• Custom AI Copilots, Assistants & Domain-Specific Chatbots\n• Automated Data Extraction & Document Processing Pipelines\n• AI-Powered CRM & Customer Support Integrations\n• Bespoke Internal Admin Portals & Workflow Automation\n• Custom API & LLM Fine-Tuning for Private Data\n\nIf you have repetitive workflows or manual processes that could be automated with cutting-edge AI, we would love to share a few rapid proof-of-concept ideas.\n\nWould you have 10 minutes this week for a quick chat?\n\nBest regards,`;
    },
  },

  // --- PROPOSALS & CONSULTATIONS ---
  {
    id: "proposal",
    category: "Proposals & Quotes",
    title: "💼 [Proposal] High-Converting Technical Blueprint & Scope",
    getSubject: (inq?: InquiryItem | null, clientName?: string) => {
      const project = inq?.projectType || "Custom Software Development";
      return `Project Proposal & Technical Blueprint - ${project} | Programming Bridge`;
    },
    getMessage: (inq?: InquiryItem | null, clientName?: string) => {
      const name = getEffectiveName(inq, clientName) || "Valued Client";
      return `Dear ${name},\n\nThank you for reaching out to Programming Bridge regarding your upcoming ${inq?.projectType || "software engineering"} project.\n\nOur solutions architecture team has evaluated your specifications${inq?.budgetRange ? ` and target budget (${inq.budgetRange})` : ""}. We have crafted a dedicated execution plan designed to deliver a high-performance, enterprise-grade digital product on time.\n\n📌 Proposed Scope & Engineering Highlights:\n• Bespoke Architecture & Clean Codebase tailored to your business model\n• Ultra-responsive UI/UX designed for maximum conversion and speed\n• Scalable Cloud Backend with robust security and automated backups\n• Full QA & Security Testing prior to final production release\n• Dedicated Post-Deployment Maintenance & Warranty\n\n🎯 Milestone Roadmap & Transparency:\nWe operate with agile bi-weekly sprints, providing you with live staging previews and milestone walkthroughs at every phase so you remain in 100% control.\n\n🚀 Recommended Next Step:\nTo ensure we align on specific deliverables, milestones, and deliverable timelines, we invite you to a brief 15-minute Discovery Consultation (via Google Meet / Zoom).\n\nPlease let us know what time window works best for you this week, or simply reply directly to this email.\n\nWe look forward to building something extraordinary together!`;
    },
  },
  {
    id: "consultation",
    category: "Proposals & Quotes",
    title: "📅 [Consultation] 15-Min Discovery & Architecture Session",
    getSubject: (inq?: InquiryItem | null, clientName?: string) =>
      `Invitation: Project Discovery & Strategy Session - Programming Bridge`,
    getMessage: (inq?: InquiryItem | null, clientName?: string) => {
      const name = getEffectiveName(inq, clientName) || "there";
      return `Hi ${name},\n\nThank you for connecting with Programming Bridge regarding your ${inq?.projectType || "project"}!\n\nWe would love to invite you to a complimentary 15-minute Strategy & Discovery Call with our Lead Architect.\n\nDuring this session, we will:\n• Clarify core feature priorities and technical requirements\n• Outline optimized technology stacks for fast performance and low hosting cost\n• Provide an estimated milestone breakdown and realistic launch timeline\n\nPlease let us know your preferred day and time window for a quick video meeting.\n\nLooking forward to speaking with you!`;
    },
  },

  // --- FOLLOW-UPS ---
  {
    id: "followup_1",
    category: "Follow-Ups",
    title: "⏳ [Follow-Up #1] Friendly Nudge & Value Reminder",
    getSubject: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      return name
        ? `Following up regarding tech collaboration with ${name} | Programming Bridge`
        : `Following up regarding software engineering collaboration | Programming Bridge`;
    },
    getMessage: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      const salutation = name ? `Hi ${name}` : `Hi there`;
      return `${salutation},\n\nI wanted to quickly follow up on my previous note to see if you had a moment to review it.\n\nWe are currently reserving dedicated engineering sprints for the upcoming month, and I would love to explore if Programming Bridge can assist your team with any active web, mobile, or cloud development initiatives.\n\nEven if you are not ready to kick off immediately, I would be happy to share relevant past project case studies or provide a rough milestone & cost estimate for your upcoming features.\n\nWould later this week or early next week work for a brief 10-minute catch-up?\n\nBest regards,`;
    },
  },
  {
    id: "followup_2",
    category: "Follow-Ups",
    title: "🔄 [Follow-Up #2] Final Friendly Check-In & Keeping in Touch",
    getSubject: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      return name
        ? `Checking in one last time - Programming Bridge & ${name}`
        : `Checking in one last time - Programming Bridge`;
    },
    getMessage: (_inq, clientName) => {
      const name = getEffectiveName(_inq, clientName);
      const salutation = name ? `Hi ${name}` : `Hi there`;
      return `${salutation},\n\nI understand you are likely quite busy, so I'll keep this brief.\n\nI wanted to touch base one last time regarding our software engineering and technical architecture capabilities.\n\nIf the timing is not right at this moment, no worries at all! Please feel free to keep our contact info handy whenever you need an agile, high-velocity engineering partner to build or scale your digital products.\n\nWishing you and your team continued success!\n\nBest regards,`;
    },
  },

  // --- CUSTOM ---
  {
    id: "custom",
    category: "Custom",
    title: "✨ [Custom] Blank / Custom Message",
    getSubject: (inq?: InquiryItem | null, clientName?: string) =>
      inq?.projectType
        ? `Regarding your ${inq.projectType} Project - Programming Bridge`
        : "Regarding your inquiry - Programming Bridge",
    getMessage: (inq?: InquiryItem | null, clientName?: string) => {
      const name = getEffectiveName(inq, clientName) || "Valued Client";
      return `Dear ${name},\n\nThank you for contacting Programming Bridge.\n\n\n\nBest regards,\nProgramming Bridge Team`;
    },
  },
];

export function ComposeEmailModal({
  isOpen,
  onClose,
  inquiry,
  onEmailSent,
}: ComposeEmailModalProps) {
  const [recipient, setRecipient] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("proposal");
  const [activeTab, setActiveTab] = useState<"compose" | "preview">("compose");
  const [previewTheme, setPreviewTheme] = useState<"dark" | "light">("dark");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialize form when inquiry changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setSuccess(null);
      setActiveTab("compose");
      setSelectedTemplate("apollo_web_mobile");

      const initialName = inquiry?.name || "";
      const initialEmail = inquiry?.email || "";

      setRecipient(initialEmail);
      setClientName(initialName);

      const template = inquiry ? EMAIL_TEMPLATES.find((t) => t.id === "proposal") || EMAIL_TEMPLATES[0] : EMAIL_TEMPLATES[0];
      setSelectedTemplate(template.id);
      setSubject(template.getSubject(inquiry, initialName));
      setMessage(template.getMessage(inquiry, initialName));
    }
  }, [isOpen, inquiry]);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = EMAIL_TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setSubject(template.getSubject(inquiry, clientName));
      setMessage(template.getMessage(inquiry, clientName));
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      setError("Please provide a recipient email address.");
      return;
    }
    if (!subject.trim()) {
      setError("Please provide an email subject.");
      return;
    }
    if (!message.trim()) {
      setError("Please type a message before sending.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const inqId = inquiry?._id || inquiry?.id;

      const res = await sendClientEmail({
        to: recipient.trim(),
        subject: subject.trim(),
        message: message.trim(),
        clientName: clientName.trim() || undefined,
        inquiryId: inqId || undefined,
      });

      setSuccess(res.message || "Email sent successfully from official@programmingbridge.org!");

      if (onEmailSent) {
        onEmailSent(res.data);
      }

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err?.message || "Failed to send email. Please check Zoho SMTP settings.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[94vh] flex flex-col rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-surface/60">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 aspect-square items-center justify-center rounded-2xl bg-brand/15 text-brand shadow-inner">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-foreground">
                  Official Client Email & Proposal Composer
                </h3>
              </div>
              <p className="text-[11px] text-foreground-muted flex items-center gap-2 mt-0.5">
                <span>Sender:</span>
                <span className="font-bold text-brand">official@programmingbridge.org</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500 border border-emerald-500/20">
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

        {/* Tab Selector, Mode Switcher & Template Picker */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-3 border-b border-border bg-surface/30">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab("compose")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "compose"
                  ? "bg-brand text-black shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground border border-border"
              }`}
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Compose Message</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-brand text-black shadow-sm"
                  : "bg-surface text-foreground-muted hover:text-foreground border border-border"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Live Email Preview</span>
            </button>
          </div>

          {activeTab === "compose" ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-[11px] font-semibold text-foreground-subtle shrink-0">Template:</span>
              <select
                value={selectedTemplate}
                onChange={(e) => handleTemplateChange(e.target.value)}
                className="h-8 w-full sm:w-auto rounded-xl border border-border bg-surface px-3 text-xs font-bold text-foreground focus:border-brand focus:outline-none cursor-pointer max-w-[280px] sm:max-w-[340px] truncate"
              >
                {Array.from(new Set(EMAIL_TEMPLATES.map((t) => t.category))).map((cat) => (
                  <optgroup key={cat} label={cat} className="bg-card text-foreground font-bold">
                    {EMAIL_TEMPLATES.filter((t) => t.category === cat).map((t) => (
                      <option key={t.id} value={t.id} className="py-1">
                        {t.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-surface p-1 rounded-xl border border-border">
              <span className="text-[10px] font-bold text-foreground-subtle px-2">Preview Mode:</span>
              <button
                type="button"
                onClick={() => setPreviewTheme("dark")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  previewTheme === "dark" ? "bg-slate-800 text-brand shadow-xs" : "text-foreground-muted hover:text-foreground"
                }`}
              >
                <Moon className="h-3 w-3" />
                <span>Dark</span>
              </button>
              <button
                type="button"
                onClick={() => setPreviewTheme("light")}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  previewTheme === "light" ? "bg-white text-slate-900 shadow-xs" : "text-foreground-muted hover:text-foreground"
                }`}
              >
                <Sun className="h-3 w-3" />
                <span>Light</span>
              </button>
            </div>
          )}
        </div>

        {/* Feedback Alerts */}
        {error && (
          <div className="mx-6 mt-4 flex items-center gap-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 p-3.5 text-xs font-medium text-rose-500">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mx-6 mt-4 flex items-center gap-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 text-xs font-medium text-emerald-500">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Modal Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {activeTab === "compose" ? (
            <form id="compose-email-form" onSubmit={handleSend} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground-subtle mb-1">
                    Client Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="client@company.com"
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs font-medium text-foreground focus:border-brand focus:outline-none placeholder:text-foreground-subtle"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground-subtle mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs font-medium text-foreground focus:border-brand focus:outline-none placeholder:text-foreground-subtle"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-foreground-subtle mb-1">
                  Subject Line <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Project Proposal & Technical Blueprint - Programming Bridge"
                  className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs font-medium text-foreground focus:border-brand focus:outline-none placeholder:text-foreground-subtle"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-foreground-subtle">
                    Proposal / Email Content <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-foreground-subtle">
                    {message.length} characters (Bullets with • or - are auto-formatted into glowing badges)
                  </span>
                </div>
                <textarea
                  required
                  rows={9}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your proposal, message, or project quotation here..."
                  className="w-full rounded-2xl border border-border bg-surface p-4 text-xs font-medium text-foreground leading-relaxed focus:border-brand focus:outline-none placeholder:text-foreground-subtle font-mono shadow-inner"
                />
              </div>
            </form>
          ) : (
            /* ================= LIVE EMAIL ADAPTIVE PREVIEW ================= */
            <div
              className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-xl ${
                previewTheme === "dark"
                  ? "bg-[#07090e] border-slate-800 text-slate-100"
                  : "bg-[#f1f5f9] border-slate-300 text-slate-900"
              }`}
            >
              {/* Email Client Top Meta Bar */}
              <div
                className={`px-5 py-3 border-b text-xs ${
                  previewTheme === "dark"
                    ? "bg-[#0b0f19] border-slate-800 text-slate-400"
                    : "bg-white border-slate-200 text-slate-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p>
                      <span className="font-bold text-foreground">From:</span> Programming Bridge &lt;official@programmingbridge.org&gt;
                    </p>
                    <p>
                      <span className="font-bold text-foreground">To:</span> {recipient || "client@company.com"}
                    </p>
                    <p className="font-bold text-foreground pt-0.5 text-[13px]">
                      <span className="font-normal text-foreground-muted text-xs">Subject:</span> {subject || "(No Subject)"}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-500 border border-emerald-500/20">
                    Auto {previewTheme === "dark" ? "Dark Theme" : "Light Theme"}
                  </span>
                </div>
              </div>

              {/* Main Simulated Email Card */}
              <div className="p-4 sm:p-6 flex justify-center">
                <div
                  className={`w-full max-w-xl rounded-2xl overflow-hidden border shadow-lg ${
                    previewTheme === "dark"
                      ? "bg-[#0f172a] border-slate-800"
                      : "bg-white border-slate-200"
                  }`}
                >
                  {/* Glowing Top Rainbow Bar */}
                  <div className="h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-400" />

                  {/* Header */}
                  <div className="bg-gradient-to-br from-[#090e17] to-[#111a2e] px-6 py-5 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-extrabold text-white tracking-tight">
                        Programming <span className="text-emerald-400">Bridge</span>
                      </h4>
                      <p className="text-[10px] font-bold text-sky-400 uppercase tracking-widest mt-0.5">
                        Engineering Digital Excellence
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 border border-emerald-400/30 px-3 py-1 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      🛡️ Verified Proposal
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div className="border-b border-slate-500/20 pb-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                        Official Communication
                      </span>
                      <h3
                        className={`text-base font-bold mt-0.5 ${
                          previewTheme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {subject}
                      </h3>
                    </div>

                    <div
                      className={`text-xs leading-relaxed whitespace-pre-wrap ${
                        previewTheme === "dark" ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      {message || "Please write a message in the compose tab."}
                    </div>

                    {/* 3 Value Pillars */}
                    <div
                      className={`rounded-xl p-3.5 border grid grid-cols-1 sm:grid-cols-3 gap-3 ${
                        previewTheme === "dark"
                          ? "bg-[#141e33] border-slate-800"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div>
                        <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <Zap className="h-3 w-3" /> Agile Execution
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Rapid milestone sprints & daily visibility</p>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-sky-400 flex items-center gap-1">
                          <Lock className="h-3 w-3" /> Enterprise Code
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Clean, scalable & tested architecture</p>
                      </div>
                      <div>
                        <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                          <Users className="h-3 w-3" /> Dedicated Lead
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">Direct communication with tech architects</p>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2 text-center">
                      <div className="inline-block rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500 px-6 py-2.5 text-xs font-extrabold text-slate-950 uppercase tracking-wider shadow-md">
                        ✉️ Reply Directly to This Email
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1.5">
                        Or reply straight from your inbox to continue the conversation.
                      </p>
                    </div>

                    {/* Executive Signature */}
                    <div className="pt-4 border-t border-slate-500/20 text-xs">
                      <p className="text-slate-400">Best regards,</p>
                      <p
                        className={`text-sm font-black mt-0.5 ${
                          previewTheme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Programming Bridge <span className="text-emerald-400">Team</span>
                      </p>
                      <p className="text-[11px] text-slate-400">Engineering & Client Advisory Department</p>
                      <p className="text-[11px] text-emerald-400 font-semibold mt-1">
                        official@programmingbridge.org • programmingbridge.org
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-[#0b0f19] px-6 py-3.5 border-t border-slate-800 text-center">
                    <p className="text-[10px] text-slate-400">
                      &copy; {new Date().getFullYear()} <strong className="text-slate-200">Programming Bridge</strong>. All rights reserved.
                    </p>
                    <p className="text-[9px] text-slate-500 mt-0.5">
                      This email was sent from our official verified domain <strong>programmingbridge.org</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-border px-6 py-4 bg-surface/40">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-hover transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="compose-email-form"
            disabled={loading}
            onClick={(e) => {
              if (activeTab === "preview") {
                handleSend(e);
              }
            }}
            className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-xs font-extrabold text-black hover:bg-brand-hover hover:text-white transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                <span>Sending via Zoho SMTP...</span>
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                <span>Send Email / Proposal to Client</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
