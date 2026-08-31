"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Layers,
  ArrowRight,
  CheckCircle2,
  Code2,
  Brain,
  Rocket,
} from "lucide-react";
import { SectionWrapper, SectionHeader } from "./common";

const stats = [
  { value: "99.9%", label: "Uptime SLA", subtext: "Cloud infrastructure standards" },
  { value: "50+", label: "Products Shipped", subtext: "Web, mobile & data platforms" },
  { value: "100%", label: "Sprint Milestones Met", subtext: "Predictable agile delivery" },
  { value: "24/7", label: "Monitoring & Support", subtext: "Proactive uptime management" },
];

const pillars = [
  {
    icon: Layers,
    title: "System Architecture",
    description: "Modular microservices, clean separation of concerns, and reliable cloud infrastructure.",
    color: "text-brand",
    bg: "bg-brand/10",
    border: "hover:border-brand/40",
  },
  {
    icon: Code2,
    title: "Clean Engineering",
    description: "Strict TypeScript typing, test coverage, and maintainable architectures that scale.",
    color: "text-brand-cyan",
    bg: "bg-brand-cyan/10",
    border: "hover:border-brand-cyan/40",
  },
  {
    icon: Brain,
    title: "Applied AI & Data",
    description: "Practical integration of LLMs, retrieval-augmented workflows (RAG), and data pipelines.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "hover:border-purple-500/40",
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    description: "Zero-trust auth, OWASP standards, role-based access, and encrypted data.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/40",
  },
];

const keyStrengths = [
  "Direct collaboration with senior engineers on every sprint",
  "Full code ownership, clean documentation, and seamless IP handover",
  "Modern polyglot stack across Next.js, Node.js, Kotlin, and Python",
  "Rapid MVP execution paired with long-term architectural stability",
];

interface AboutUsSectionProps {
  isPage?: boolean;
  className?: string;
}

export function AboutUsSection({ isPage = false, className = "" }: AboutUsSectionProps) {
  return (
    <SectionWrapper
      id="about-us"
      variant="surface"
      border={isPage ? "none" : "both"}
      py={isPage ? "pt-20 pb-16 md:pt-24 md:pb-20" : "py-16 md:py-20"}
      className={className}
      ariaLabel="About Us"
    >
      {/* Header */}
      <SectionHeader
        badge="About Us"
        subBadge="Engineering Studio"
        title={
          <>
            Building Resilient Software for <span className="text-brand">Growing Companies</span>
          </>
        }
        description="Programming Bridge is a full-stack digital engineering studio. We help startups and established companies design, build, and maintain production-ready web applications, mobile apps, and cloud architectures."
      />

      {/* 4 Pillars */}
      <div className="mt-14 sm:mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className={`group flex flex-col justify-between rounded-2xl border border-card-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${pillar.border}`}
            >
              <div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${pillar.bg} ${pillar.color} transition-transform duration-300 group-hover:scale-105`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base sm:text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-1 text-xs font-semibold text-brand">
                <span>Learn more</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Bar */}
      <div className="mt-12 sm:mt-16 rounded-2xl border border-card-border bg-card p-4 sm:p-8 shadow-xs">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-3 sm:p-4 rounded-xl bg-surface/50 md:bg-transparent md:border-r md:last:border-r-0 border-border/60"
            >
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
                {stat.value}
              </span>
              <span className="mt-1 text-xs sm:text-sm font-bold text-foreground">
                {stat.label}
              </span>
              <span className="text-[11px] text-foreground-subtle mt-0.5 leading-tight">
                {stat.subtext}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Feature Box */}
      <div className="mt-12 sm:mt-16 rounded-2xl border border-border bg-gradient-to-r from-surface via-card to-surface p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-brand font-semibold text-xs sm:text-sm">
              <Rocket className="h-4 w-4" />
              <span>Our Approach</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-foreground">
              How We Deliver Predictable Software
            </h3>
            <ul className="space-y-2.5 pt-1">
              {keyStrengths.map((point, kIdx) => (
                <li key={kIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground-muted">
                  <CheckCircle2 className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-center gap-4">
            <div className="p-4 rounded-xl bg-card border border-border w-full text-left">
              <span className="text-xs font-semibold text-foreground">Direct Engineer Access</span>
              <p className="mt-1 text-xs text-foreground-muted">
                Work directly with the developers writing your code. Clear sprint updates and zero bureaucratic overhead.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-95 cursor-pointer text-center"
            >
              <span>Discuss Your Project</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default AboutUsSection;
