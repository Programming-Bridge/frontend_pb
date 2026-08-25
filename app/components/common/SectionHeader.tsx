import React from "react";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  badge: string;
  subBadge?: string;
  icon?: LucideIcon;
  title: React.ReactNode;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export function SectionHeader({
  badge,
  subBadge,
  icon: Icon,
  title,
  description,
  className = "",
  children,
}: SectionHeaderProps) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      {/* Pill Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-foreground shadow-xs">
        {Icon ? (
          <Icon className="h-3.5 w-3.5 text-brand shrink-0" />
        ) : (
          <span className="h-2 w-2 rounded-full bg-brand" />
        )}
        <span>{badge}</span>
        {subBadge && (
          <>
            <span className="text-border">|</span>
            <span className="font-mono text-[11px] text-brand">{subBadge}</span>
          </>
        )}
      </div>

      {/* Main Title */}
      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl leading-tight">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-4 text-base sm:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
        {description}
      </p>

      {/* Optional Filters / Children */}
      {children}
    </div>
  );
}

export default SectionHeader;
