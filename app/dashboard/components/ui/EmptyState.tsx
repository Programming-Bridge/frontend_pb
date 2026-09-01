"use client";

import { LucideIcon, Plus } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/30 p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand dark:bg-brand/15">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-xs text-foreground-muted leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-black shadow-lg shadow-brand/20 hover:bg-brand-hover hover:text-white transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
