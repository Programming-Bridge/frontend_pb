"use client";

import { LucideIcon, ArrowUpRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  subtitle?: string;
  badge?: string;
  badgeColor?: "brand" | "cyan" | "amber" | "rose" | "purple";
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  badge,
  badgeColor = "brand",
  onClick,
}: StatCardProps) {
  const badgeStyles = {
    brand: "bg-brand/15 text-brand border-brand/30",
    cyan: "bg-cyan-500/15 text-cyan-500 dark:text-cyan-400 border-cyan-500/30",
    amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
    rose: "bg-rose-500/15 text-rose-500 dark:text-rose-400 border-rose-500/30",
    purple: "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30",
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-300 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5 ${
        onClick ? "cursor-pointer active:scale-[0.98]" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-surface border border-border group-hover:border-brand/30 group-hover:bg-brand/10 transition-colors">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground-muted group-hover:text-brand transition-colors" />
        </div>

        {badge && (
          <span
            className={`rounded-full border px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider ${badgeStyles[badgeColor]}`}
          >
            {badge}
          </span>
        )}
      </div>

      <div className="mt-3 sm:mt-4">
        <span className="text-xl sm:text-3xl font-black text-foreground tracking-tight">
          {value}
        </span>
        <h4 className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs font-semibold text-foreground-muted truncate">{title}</h4>
      </div>

      {subtitle && (
        <div className="mt-2.5 sm:mt-3 flex items-center justify-between border-t border-border/60 pt-2 sm:pt-2.5 text-[10px] sm:text-[11px] text-foreground-subtle">
          <span className="truncate pr-1">{subtitle}</span>
          {onClick && (
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-foreground-muted group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          )}
        </div>
      )}
    </div>
  );
}
