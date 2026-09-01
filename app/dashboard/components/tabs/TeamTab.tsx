"use client";

import Image from "next/image";
import { Plus, Edit3, Trash2, Users, Globe, Code2, Mail, Star } from "lucide-react";
import type { TeamMember } from "@/app/services/teamService";
import { getMediaUrl } from "@/app/services/apiClient";
import { EmptyState } from "../ui/EmptyState";

interface TeamTabProps {
  teamMembers: TeamMember[];
  searchQuery: string;
  onOpenCreate: () => void;
  onOpenEdit: (member: TeamMember) => void;
  onDelete: (id: string, name: string) => void;
}

export function TeamTab({
  teamMembers,
  searchQuery,
  onOpenCreate,
  onOpenEdit,
  onDelete,
}: TeamTabProps) {
  const filteredTeam = teamMembers.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name?.toLowerCase().includes(q) ||
      t.role?.toLowerCase().includes(q) ||
      t.department?.toLowerCase().includes(q) ||
      t.skills?.some((s) => s.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
            Engineering Team & Leadership ({teamMembers.length})
          </h2>
          <p className="text-[11px] sm:text-xs text-foreground-muted">
            Manage public team bios, architect designations, core skills, and social handles
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreate}
          className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Team Cards Grid */}
      {filteredTeam.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Team Members Found"
          description="Add engineers and leadership profiles to showcase the talent behind Programming Bridge."
          actionLabel="Add Team Member"
          onAction={onOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filteredTeam.map((member) => {
            const mId = member._id || member.id || "";
            const avatarSrc = member.avatar ? getMediaUrl(member.avatar) : "";

            return (
              <div
                key={mId}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all hover:border-brand/40 hover:shadow-lg"
              >
                <div>
                  {/* Top Bar inside card */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                    <span className="truncate rounded-md bg-surface border border-border px-2 py-0.5 text-[10px] font-bold text-brand uppercase tracking-wider whitespace-nowrap">
                      {member.department || "Engineering"}
                    </span>

                    <div className="flex items-center gap-1 shrink-0 ml-auto">
                      <button
                        type="button"
                        onClick={() => onOpenEdit(member)}
                        className="rounded-lg p-1.5 text-foreground-muted hover:bg-surface-hover hover:text-foreground transition-colors cursor-pointer"
                        title="Edit Member"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(mId, member.name)}
                        className="rounded-lg p-1.5 text-foreground-muted hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                        title="Delete Member"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Avatar & Details */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-border group-hover:border-brand/40 transition-colors bg-surface">
                      {avatarSrc ? (
                        <Image
                          src={avatarSrc}
                          alt={member.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-bold text-brand">
                          {member.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-extrabold text-foreground truncate">
                          {member.name}
                        </h3>
                        {member.featured && (
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400 shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-brand truncate">
                        {member.role}
                      </span>
                      <span className="text-[10px] text-foreground-subtle">
                        {member.experience || "Team Specialist"}
                      </span>
                    </div>
                  </div>

                  {member.bio && (
                    <p className="mt-3 text-xs leading-relaxed text-foreground-muted line-clamp-2">
                      {member.bio}
                    </p>
                  )}

                  {/* Skills tags */}
                  {member.skills && member.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="rounded-md bg-surface border border-border px-1.5 py-0.5 text-[10px] font-semibold text-foreground-muted"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="rounded-md bg-surface border border-border px-1.5 py-0.5 text-[10px] font-semibold text-brand">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Social Links & Active Pill */}
                <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-3">
                  <div className="flex items-center gap-2 text-foreground-muted">
                    {member.socialLinks?.linkedin && (
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-brand transition-colors"
                        title="LinkedIn"
                      >
                        <Globe className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socialLinks?.github && (
                      <a
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-foreground transition-colors"
                        title="GitHub"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socialLinks?.email && (
                      <a
                        href={`mailto:${member.socialLinks.email}`}
                        className="hover:text-brand transition-colors"
                        title="Email"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      member.isActive !== false
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/10 text-rose-500"
                    }`}
                  >
                    {member.isActive !== false ? "Active" : "Hidden"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
