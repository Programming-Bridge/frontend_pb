"use client";

import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/logo.png";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import type { User } from "@/app/services/authService";
import type { ActiveTab } from "../types";
import {
  Menu,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Search,
} from "lucide-react";

interface DashboardHeaderProps {
  activeTab: ActiveTab;
  currentUser: User | null;
  isLoadingData: boolean;
  onRefresh: () => void;
  onOpenMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  unreadCount?: number;
}

const tabTitles: Record<ActiveTab, { title: string; subtitle: string }> = {
  overview: {
    title: "System Overview",
    subtitle: "Real-time metrics, system health, and quick actions",
  },
  banners: {
    title: "Hero Banners",
    subtitle: "Manage homepage hero sections, CTA buttons, and visuals",
  },
  technologies: {
    title: "Technology Stack",
    subtitle: "Manage software, AI/ML, and mobile frameworks & tools",
  },
  projects: {
    title: "Portfolio Projects",
    subtitle: "Manage case studies, live demo links, and project tech tags",
  },
  services: {
    title: "Service Offerings",
    subtitle: "Manage agency capabilities, descriptions, and feature lists",
  },
  careers: {
    title: "Careers & Recruitment",
    subtitle: "Manage open job vacancies and inbound candidate applications",
  },
  inquiries: {
    title: "Client Inquiries",
    subtitle: "Manage inbound leads, project scopes, and client messages",
  },
  team: {
    title: "Team Directory",
    subtitle: "Manage engineers, architects, leadership, and social profiles",
  },
  users: {
    title: "Admin Access & Users",
    subtitle: "Manage administrative roles, team privileges, and access security",
  },
  settings: {
    title: "Admin Settings",
    subtitle: "Security configurations, password management, and system stats",
  },
};

export function DashboardHeader({
  activeTab,
  currentUser,
  isLoadingData,
  onRefresh,
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
}: DashboardHeaderProps) {
  const currentTabInfo = tabTitles[activeTab] || {
    title: "Admin Dashboard",
    subtitle: "Management Studio",
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 xl:left-72 h-16 z-30 flex items-center justify-between border-b border-border bg-white/95 dark:bg-[#0B0F12]/95 px-4 sm:px-6 lg:px-8 backdrop-blur-xl transition-all select-none">
      {/* Left side: Mobile Hamburger + Current Tab Title */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open sidebar menu"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-foreground-muted hover:text-foreground lg:hidden cursor-pointer"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2.5 min-w-0">
          <h1 className="text-sm sm:text-base font-extrabold text-foreground tracking-tight whitespace-nowrap leading-none">
            {currentTabInfo.title}
          </h1>
          <span className="hidden sm:inline-flex shrink-0 items-center rounded-md bg-brand/10 border border-brand/20 px-2 py-0.5 text-[9px] font-bold text-brand uppercase tracking-wider leading-none">
            Production
          </span>
        </div>
      </div>

      {/* Right side: Search bar + Quick Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Global Filter / Search input on tabs that support it */}
        {activeTab !== "overview" && activeTab !== "settings" && (
          <div className="relative hidden xl:block w-44 2xl:w-60">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground-subtle" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={`Search in ${currentTabInfo.title}...`}
              className="h-9 w-full rounded-xl border border-border bg-surface/80 pl-9 pr-3 text-xs text-foreground placeholder:text-foreground-subtle focus:border-brand focus:bg-background focus:outline-none transition-all"
            />
          </div>
        )}

        {/* Live Website Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-foreground-muted hover:border-brand/40 hover:text-brand transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="h-3 w-3" />
        </Link>

        {/* Refresh Database Data */}
        <button
          type="button"
          onClick={onRefresh}
          title="Refresh database records"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-foreground-muted hover:border-brand/40 hover:text-brand transition-colors cursor-pointer"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoadingData ? "animate-spin text-brand" : ""}`} />
        </button>

        {/* Theme Switcher */}
        <ThemeToggle />

        {/* User Pill */}
        <div className="hidden xl:flex items-center gap-2.5 rounded-xl border border-border bg-surface/70 px-2.5 py-1.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-brand/15 text-brand">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-foreground leading-none">
              {currentUser?.name || "Admin"}
            </span>
            <span className="text-[9px] text-brand font-semibold leading-none mt-0.5 uppercase tracking-wider">
              {currentUser?.role || "Superadmin"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
