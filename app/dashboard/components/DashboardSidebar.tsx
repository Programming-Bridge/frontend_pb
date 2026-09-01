"use client";

import Image from "next/image";
import Link from "next/link";
import logoImg from "@/public/logo.png";
import type { User } from "@/app/services/authService";
import type { ActiveTab } from "../types";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Code2,
  Briefcase,
  Layers,
  FileText,
  MessageSquare,
  Users,
  ShieldCheck,
  Settings,
  LogOut,
  X,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  id: ActiveTab;
  label: string;
  icon: any;
  badgeCount?: number;
  badgeVariant?: "brand" | "amber" | "rose";
}

interface DashboardSidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentUser: User | null;
  onLogout: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  counts: {
    pendingApplications: number;
    unreadInquiries: number;
    openCareers: number;
  };
}

export function DashboardSidebar({
  activeTab,
  onSelectTab,
  currentUser,
  onLogout,
  isMobileOpen,
  onCloseMobile,
  counts,
}: DashboardSidebarProps) {
  const isSuperAdmin = currentUser?.role === "superadmin";

  const navItems: NavItem[] = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "banners",
      label: "Hero Banners",
      icon: ImageIcon,
    },
    {
      id: "technologies",
      label: "Tech Stack",
      icon: Code2,
    },
    {
      id: "projects",
      label: "Projects & Portfolio",
      icon: Briefcase,
    },
    {
      id: "services",
      label: "Services",
      icon: Layers,
    },
    {
      id: "careers",
      label: "Careers & Jobs",
      icon: FileText,
      badgeCount: counts.pendingApplications > 0 ? counts.pendingApplications : undefined,
      badgeVariant: "amber",
    },
    {
      id: "inquiries",
      label: "Inquiries & Leads",
      icon: MessageSquare,
      badgeCount: counts.unreadInquiries > 0 ? counts.unreadInquiries : undefined,
      badgeVariant: "brand",
    },
    {
      id: "team",
      label: "Team Members",
      icon: Users,
    },
    ...(isSuperAdmin
      ? [
          {
            id: "users" as ActiveTab,
            label: "Users & Access",
            icon: ShieldCheck,
          },
        ]
      : []),
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  const sidebarContent = (
    <div className="flex h-full w-full flex-col bg-white dark:bg-[#0B0F12] border-r border-border select-none">
      {/* 1. Sidebar Brand Header (Fixed Top) */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
        <Link
          href="/dashboard"
          onClick={() => onSelectTab("overview")}
          className="flex items-center gap-3 group"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-brand/40 bg-surface shadow-xs group-hover:border-brand transition-colors">
            <Image
              src={logoImg}
              alt="Programming Bridge"
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold text-foreground tracking-tight">
                Programming Bridge
              </span>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-brand">
              Admin Console
            </span>
          </div>
        </Link>

        {/* Mobile close button */}
        {isMobileOpen && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:bg-surface-hover hover:text-foreground lg:hidden cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 2. Navigation Items (Scrollable Body with Compact Spacing) */}
      <div className="flex-1 overflow-y-auto px-2.5 py-2 space-y-0.5">
        <div className="px-3 pb-1.5 pt-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-foreground-subtle">
            Navigation Menu
          </span>
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectTab(item.id);
                if (isMobileOpen) onCloseMobile();
              }}
              className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-brand text-black shadow-md shadow-brand/20 font-bold"
                  : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-black"
                      : "text-foreground-muted group-hover:text-brand"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {item.badgeCount !== undefined && item.badgeCount > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-extrabold ${
                      isActive
                        ? "bg-black/20 text-black"
                        : item.badgeVariant === "amber"
                        ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                        : "bg-brand/15 text-brand"
                    }`}
                  >
                    {item.badgeCount}
                  </span>
                )}
                <ChevronRight
                  className={`h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all ${
                    isActive ? "opacity-100 translate-x-0 text-black" : "text-foreground-subtle"
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Pinned Bottom Footer (Streamlined User Profile & Quick Logout) */}
      <div className="shrink-0 border-t border-border p-2.5 bg-surface/30">
        <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface/60 p-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/15 text-brand font-bold text-xs">
              {currentUser?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="truncate text-xs font-bold text-foreground leading-tight">
                {currentUser?.name || "Admin"}
              </span>
              <span className="truncate text-[9px] font-semibold text-brand uppercase tracking-wider leading-tight">
                {currentUser?.role || "Superadmin"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Sign Out"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-500/15 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop 100% Height Fixed Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 h-screen w-64 xl:w-72 z-40 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
