import React from "react";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  variant?: "surface" | "background";
  border?: "top" | "bottom" | "both" | "none";
  ariaLabel?: string;
  py?: string;
  children: React.ReactNode;
}

export function SectionWrapper({
  id,
  className = "",
  variant = "surface",
  border = "both",
  ariaLabel,
  py = "py-16 md:py-20",
  children,
}: SectionWrapperProps) {
  const bgClass = variant === "surface" ? "bg-surface" : "bg-background";

  const borderClass =
    border === "both"
      ? "border-y border-border"
      : border === "top"
      ? "border-t border-border"
      : border === "bottom"
      ? "border-b border-border"
      : "";

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative w-full ${py} overflow-hidden transition-colors duration-200 ${bgClass} ${borderClass} ${className}`}
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-10 -z-10 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 -z-10 h-96 w-96 rounded-full bg-brand-cyan/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export default SectionWrapper;
