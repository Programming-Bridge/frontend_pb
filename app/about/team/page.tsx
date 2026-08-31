"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { StatsStrip } from "@/app/components/StatsStrip";
import { TechStackSection } from "@/app/components/TechStackSection";
import { ContactSection } from "@/app/components/ContactSection";
import { SectionWrapper, SectionHeader } from "@/app/components/common";
import { TeamSkeleton } from "@/app/components/skeletons/TeamSkeleton";
import { getTeamMembers, type TeamMember } from "@/app/services/teamService";
import {
  Users,
  Code2,
  Cpu,
  Terminal,
  ShieldCheck,
  Globe,
  Mail,
  ExternalLink,
  Briefcase,
} from "lucide-react";

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadTeam() {
      setLoading(true);
      try {
        const data = await getTeamMembers();
        if (isMounted && data?.length) {
          setTeamMembers(data);
        }
      } catch (err) {
        console.warn("Failed to load team from API:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTeam();
    return () => {
      isMounted = false;
    };
  }, []);

  const departments = useMemo(() => {
    const set = new Set<string>(["All"]);
    teamMembers.forEach((m) => {
      if (m.department) set.add(m.department);
    });
    return Array.from(set);
  }, [teamMembers]);

  const filteredMembers = useMemo(() => {
    if (selectedDepartment === "All") return teamMembers;
    return teamMembers.filter((m) => m.department === selectedDepartment);
  }, [teamMembers, selectedDepartment]);

  const getDepartmentIcon = (dept: string) => {
    const d = dept.toLowerCase();
    if (d.includes("web") || d.includes("cloud")) return Code2;
    if (d.includes("mobile")) return Cpu;
    if (d.includes("ai") || d.includes("data")) return Terminal;
    if (d.includes("security") || d.includes("devops")) return ShieldCheck;
    return Users;
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      {/* Hero */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-28 bg-surface border-b border-border overflow-hidden">
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
              <span>Our Team</span>
              <span className="text-border">|</span>
              <span className="font-mono text-[11px] text-brand">
                {teamMembers.length} Senior Engineers
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.15]">
              Senior Developers. Zero Fluff.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
              Our squads are composed exclusively of senior developers, system architects, and DevOps leads. We embed directly into your technical workflows to deliver software with precision.
            </p>

            {/* Department Filter Tabs */}
            {departments.length > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-card border border-border shadow-xs">
                {departments.map((dept) => {
                  const isActive = selectedDepartment === dept;
                  const count =
                    dept === "All"
                      ? teamMembers.length
                      : teamMembers.filter((m) => m.department === dept).length;

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
                            : "bg-surface border border-border text-foreground-subtle"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Team Cards Grid */}
      <SectionWrapper variant="background" border="bottom" ariaLabel="Engineering Squads">
        <SectionHeader
          badge="Specialized Engineers"
          subBadge="Live API"
          title={
            <>
              Engineered For <span className="text-brand">Domain Mastery</span>
            </>
          }
          description="Each client engagement is staffed by dedicated specialists with deep hands-on expertise in their respective domain."
        />

        <div className="mt-14 max-w-7xl mx-auto">
          {loading ? (
            <TeamSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMembers.map((member, idx) => {
                const DeptIcon = getDepartmentIcon(member.department);

                return (
                  <div
                    key={member._id || idx}
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card shadow-xs transition-all duration-300 hover:border-brand/40 hover:-translate-y-1"
                  >
                    {/* Member Avatar */}
                    <div className="relative aspect-square w-full overflow-hidden bg-surface">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-surface">
                          <DeptIcon className="h-16 w-16 text-foreground-subtle" />
                        </div>
                      )}

                      {/* Department Badge */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-border px-2.5 py-1 text-[10px] font-bold text-foreground shadow-xs">
                          <DeptIcon className="h-3 w-3 text-brand" />
                          <span>{member.department}</span>
                        </span>
                      </div>

                      {/* Experience Tag */}
                      {member.experience && (
                        <div className="absolute bottom-3 right-3 z-10">
                          <span className="rounded-md bg-brand px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                            {member.experience}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Member Details */}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-brand transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-xs font-semibold text-brand mt-0.5">
                          {member.role}
                        </p>
                        {member.bio && (
                          <p className="mt-2.5 text-xs text-foreground-muted leading-relaxed line-clamp-3">
                            {member.bio}
                          </p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-border/60">
                        {/* Skills */}
                        {member.skills && member.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {member.skills.slice(0, 4).map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-foreground-muted"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Social Links */}
                        <div className="flex items-center gap-2 text-foreground-subtle">
                          {member.socialLinks?.github && (
                            <a
                              href={member.socialLinks.github}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="GitHub"
                              className="p-1.5 rounded-lg border border-border bg-surface hover:text-foreground transition-colors cursor-pointer"
                            >
                              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                              </svg>
                            </a>
                          )}
                          {member.socialLinks?.linkedin && (
                            <a
                              href={member.socialLinks.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="LinkedIn"
                              className="p-1.5 rounded-lg border border-border bg-surface hover:text-brand transition-colors cursor-pointer"
                            >
                              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </a>
                          )}
                          {member.socialLinks?.email && (
                            <a
                              href={`mailto:${member.socialLinks.email}`}
                              aria-label="Email"
                              className="p-1.5 rounded-lg border border-border bg-surface hover:text-brand-cyan transition-colors cursor-pointer"
                            >
                              <Mail className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* Technology Stack Animation */}
      <TechStackSection />

      <StatsStrip />
      <ContactSection />
      <Footer />
    </main>
  );
}
