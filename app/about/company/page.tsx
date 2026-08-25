import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { TechStackSection } from "@/app/components/TechStackSection";
import { StatsStrip } from "@/app/components/StatsStrip";
import { ContactSection } from "@/app/components/ContactSection";
import { SectionWrapper, SectionHeader, CalloutBanner } from "@/app/components/common";
import {
  Target,
  ShieldCheck,
  Award,
  Users,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Workflow,
  Globe2,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Our Company | Programming Bridge",
  description:
    "Programming Bridge is a full-stack digital engineering studio. Discover our mission, architectural philosophy, client delivery lifecycle, and senior engineering squad standards.",
};

export default function CompanyPage() {
  const pillars = [
    {
      title: "Senior-Led Technical Execution",
      description:
        "Every client engagement is directed and implemented by senior software architects. No junior handoffs, no layers of non-technical management.",
      icon: Target,
      tag: "Direct Access",
    },
    {
      title: "Clean Architecture & Zero Tech Debt",
      description:
        "We enforce strict static typing, modular component boundaries, and automated test suites to build systems that scale smoothly for years.",
      icon: ShieldCheck,
      tag: "Code Quality",
    },
    {
      title: "100% Codebase & IP Ownership",
      description:
        "Your intellectual property belongs 100% to you. We transfer all repositories, documentation, and cloud infrastructure with zero vendor lock-in.",
      icon: Lock,
      tag: "Total Handover",
    },
    {
      title: "Transparent Sprint Governance",
      description:
        "Real-time visibility into every commit. Bi-weekly demo builds, direct developer Slack channels, and predictable sprint delivery timelines.",
      icon: Workflow,
      tag: "Predictability",
    },
  ];

  const lifecycleStages = [
    {
      step: "01",
      title: "Architectural Blueprint & Schema Modeling",
      description:
        "We dissect your product requirements, define entity-relationship models, choose the optimal polyglot tech stack, and create security roadmaps before writing code.",
    },
    {
      step: "02",
      title: "High-Velocity Sprint Engineering",
      description:
        "Our squads build in two-week agile increments. Strict TypeScript interfaces, clean API routes, and reactive component hierarchies ensure robust code quality.",
    },
    {
      step: "03",
      title: "Automated Testing & Security Auditing",
      description:
        "End-to-end integration tests, static code analysis, OWASP security compliance, and performance profiling to eliminate bottlenecks under peak concurrency.",
    },
    {
      step: "04",
      title: "Production Deployment & Knowledge Transfer",
      description:
        "Zero-downtime containerized releases on AWS/Cloudflare/Vercel with comprehensive documentation, environment configs, and full IP handover.",
    },
  ];

  const commitments = [
    "Direct communication with engineers writing your production code",
    "Sub-100ms API response target and Core Web Vitals optimization",
    "Mutual NDA signed before technical discovery begins",
    "Full test coverage, migration scripts, and architecture blueprints",
    "Dedicated post-launch support and proactive uptime monitoring",
  ];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      {/* Hero Header */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 bg-surface border-b border-border overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute top-48 right-10 -z-10 h-72 w-72 rounded-full bg-brand-cyan/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs">
              <Code2 className="h-3.5 w-3.5 text-brand" />
              <span>About Programming Bridge</span>
              <span className="text-border">|</span>
              <span className="font-mono text-[11px] text-brand">Engineering Studio</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.15]">
              We Bridge Vision With <span className="text-brand">Rock-Solid Engineering</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
              Programming Bridge is a full-stack digital engineering studio. We partner with forward-thinking founders, technology leaders, and enterprises to build production-grade web applications, mobile platforms, and distributed cloud systems.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-95 cursor-pointer"
              >
                <span>Schedule Technical Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-surface active:scale-95 cursor-pointer"
              >
                <span>Explore Shipped Work</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story & Mission Section */}
      <SectionWrapper variant="background" border="bottom" ariaLabel="Our Mission and Story">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-brand">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Story & Mission</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
              Built by Engineers for Founders Who Value <span className="text-brand">Craftsmanship</span>
            </h2>

            <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
              We founded Programming Bridge after seeing companies repeatedly struggle with bloated agencies, outsourced junior developers, and codebases that collapsed under scale.
            </p>

            <p className="text-sm sm:text-base text-foreground-muted leading-relaxed">
              Our mission is straightforward: **deliver enterprise-grade software with senior speed and total technical clarity**. We combine rigorous computer science fundamentals with modern developer tooling to ship products that are secure, responsive, and easy to maintain.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-card-border bg-card p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Globe2 className="h-5 w-5 text-brand" />
                <span>Our Standard Guarantees</span>
              </h3>

              <div className="space-y-3.5">
                {commitments.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-foreground-muted leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs text-foreground-subtle">
                <span>Enterprise SLA Guaranteed</span>
                <span className="font-mono text-brand font-bold">100% IP Ownership</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Core Engineering Pillars */}
      <SectionWrapper variant="surface" border="bottom" ariaLabel="Core Engineering Pillars">
        <SectionHeader
          badge="Philosophy"
          subBadge="Our Standards"
          title={
            <>
              Principles That Guide Our <span className="text-brand">Engineering</span>
            </>
          }
          description="We take code quality, system architecture, and client IP rights seriously. Here is what defines our standard of work."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pillars.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-card-border bg-card p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-brand/40 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-surface border border-border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground-subtle">
                      {val.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                    {val.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-foreground-muted leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Delivery Lifecycle (How We Work) */}
      <SectionWrapper variant="background" border="bottom" ariaLabel="Delivery Lifecycle">
        <SectionHeader
          badge="Process & Lifecycle"
          subBadge="4-Stage Model"
          title={
            <>
              Predictable <span className="text-brand">Software Delivery</span>
            </>
          }
          description="From initial schema modeling to production deployment, our process guarantees zero ambiguity and on-time sprint milestones."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {lifecycleStages.map((stage, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-2xl border border-card-border bg-card p-6 shadow-xs transition-all hover:border-brand/40"
            >
              <div>
                <span className="font-mono text-2xl font-black text-brand/40">
                  {stage.step}
                </span>
                <h3 className="mt-3 text-base font-bold text-foreground">
                  {stage.title}
                </h3>
                <p className="mt-2 text-xs text-foreground-muted leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Technology Stack Infinite Marquee */}
      <TechStackSection />

      {/* Trust & Metrics Strip */}
      <StatsStrip />

      {/* Contact Section */}
      <ContactSection />

      <Footer />
    </main>
  );
}
