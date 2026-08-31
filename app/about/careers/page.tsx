"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { TechStackSection } from "@/app/components/TechStackSection";
import { StatsStrip } from "@/app/components/StatsStrip";
import { ContactSection } from "@/app/components/ContactSection";
import { SectionWrapper, SectionHeader, CalloutBanner } from "@/app/components/common";
import { CareersSkeleton } from "@/app/components/skeletons/CareersSkeleton";
import { JobApplyModal } from "@/app/components/JobApplyModal";
import { getCareers, type Career } from "@/app/services/careerService";
import {
  Briefcase,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  HeartHandshake,
  Laptop,
  GraduationCap,
} from "lucide-react";

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState<boolean>(false);
  const [selectedRoleForApply, setSelectedRoleForApply] = useState<Career | null>(null);

  const handleOpenApplyModal = (job?: Career) => {
    setSelectedRoleForApply(job || null);
    setIsApplyModalOpen(true);
  };

  useEffect(() => {
    let isMounted = true;
    async function loadCareers() {
      setLoading(true);
      try {
        const data = await getCareers();
        if (isMounted && data?.length) {
          setCareers(data);
        }
      } catch (err) {
        console.error("Failed to load careers from backend:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadCareers();
    return () => {
      isMounted = false;
    };
  }, []);

  const departments = useMemo(() => {
    const set = new Set<string>(["All"]);
    careers.forEach((c) => {
      if (c.department) set.add(c.department);
    });
    return Array.from(set);
  }, [careers]);

  const filteredCareers = useMemo(() => {
    if (selectedDepartment === "All") return careers;
    return careers.filter((c) => c.department === selectedDepartment);
  }, [careers, selectedDepartment]);

  const perks = [
    {
      icon: Laptop,
      title: "100% Remote & Async",
      description: "Work from anywhere in the world with flexible hours built around deep focus.",
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Top-tier market salaries, annual bonuses, and equity upside for senior engineers.",
    },
    {
      icon: GraduationCap,
      title: "Learning & Gear Stipend",
      description: "$2,500 annual budget for hardware, developer tooling, and conference tickets.",
    },
    {
      icon: HeartHandshake,
      title: "Comprehensive Benefits",
      description: "Full health allowances, generous paid time off, and transparent progression.",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      {/* Hero Header */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 bg-surface border-b border-border overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs">
              <Image
                src="/logo.png"
                alt="Programming Bridge Logo"
                width={18}
                height={18}
                className="h-4.5 w-4.5 rounded-sm object-cover"
              />
              <span>Careers at Programming Bridge</span>
              <span className="text-border">|</span>
              <span className="font-mono text-[11px] text-brand">We&apos;re Hiring</span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.15]">
              Build Mission-Critical Software at <span className="text-brand">Scale</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
              We are a team of senior engineers, system architects, and technical leaders who value craftsmanship, zero red-tape, and shipping clean software.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#openings"
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-95 cursor-pointer"
              >
                <span>View {careers.length || 5} Open Roles</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Perks / Culture Section */}
      <SectionWrapper variant="background" border="bottom" ariaLabel="Why Join Us">
        <SectionHeader
          badge="Culture & Perks"
          subBadge="Engineering First"
          title={
            <>
              Why Build With <span className="text-brand">Programming Bridge</span>?
            </>
          }
          description="We built the engineering culture we always wanted to work in: autonomy, clean tooling, and zero corporate politics."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-card-border bg-card p-6 shadow-xs transition-all hover:border-brand/40"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground">{perk.title}</h3>
                  <p className="mt-2 text-xs text-foreground-muted leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* Open Positions List */}
      <SectionWrapper id="openings" variant="surface" border="bottom" ariaLabel="Current Open Roles">
        <SectionHeader
          icon={Briefcase}
          badge="Openings"
          subBadge={`${filteredCareers.length} Positions`}
          title={
            <>
              Current Open <span className="text-brand">Engineering Positions</span>
            </>
          }
          description="All roles are full-time remote or hybrid. Direct technical interviews with zero whiteboard puzzles."
        >
          {/* Department Filter Tabs with auto-width */}
          {departments.length > 1 && (
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-card border border-border shadow-xs max-w-full">
              {departments.map((dept) => {
                const isActive = selectedDepartment === dept;
                const count =
                  dept === "All"
                    ? careers.length
                    : careers.filter((c) => c.department === dept).length;

                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-brand text-white shadow-sm shadow-brand/20"
                        : "text-foreground-muted hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    <span>{dept}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${
                        isActive
                          ? "bg-white/20 text-white font-bold"
                          : "bg-border text-foreground-subtle"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </SectionHeader>

        {/* Roles List */}
        <div className="mt-14 space-y-6 max-w-4xl mx-auto">
          {loading ? (
            <CareersSkeleton />
          ) : filteredCareers.length === 0 ? (
            <div className="text-center py-12 text-sm text-foreground-muted">
              No positions open in this department right now. Check back soon!
            </div>
          ) : (
            filteredCareers.map((job: Career, idx: number) => (
              <div
                key={job._id || job.id || idx}
                className="group flex flex-col gap-5 rounded-2xl border border-card-border bg-card p-6 sm:p-8 shadow-xs transition-all duration-300 hover:border-brand/40 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-brand transition-colors">
                        {job.title}
                      </h3>
                      {job.badge && (
                        <span className="rounded-md border border-brand/30 bg-brand-tint px-2 py-0.5 text-[10px] font-bold text-brand uppercase tracking-wider">
                          {job.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-2.5 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-foreground-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-brand" />
                        <span>{job.department}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-foreground-subtle" />
                        <span>{job.location || "Remote"}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-foreground-subtle" />
                        <span>{job.type || "Full-Time"} • {job.experience}</span>
                      </span>
                      {job.salaryRange && (
                        <span className="inline-flex items-center gap-1.5 font-mono text-brand font-semibold">
                          <DollarSign className="h-3.5 w-3.5" />
                          <span>{job.salaryRange}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenApplyModal(job)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs transition-all hover:bg-brand-hover hover:shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Apply for Role</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
                  {job.description}
                </p>

                {/* Skills tags */}
                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/50">
                    <span className="text-[11px] font-semibold text-foreground-subtle mr-1">
                      Tech Stack:
                    </span>
                    {job.skills.map((s, sIdx) => (
                      <span
                        key={sIdx}
                        className="rounded-md border border-border bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </SectionWrapper>

      {/* Technology Stack Infinite Marquee */}
      <TechStackSection />

      {/* Trust & Metrics Strip */}
      <StatsStrip />

      {/* Direct Contact / Inquiry */}
      <ContactSection />

      {/* Interactive Apply Modal Screen */}
      <JobApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        selectedRole={selectedRoleForApply}
        allRoles={careers}
      />

      <Footer />
    </main>
  );
}
