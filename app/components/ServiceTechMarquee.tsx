"use client";

import { useMemo } from "react";
import {
  enrichedTechStack,
  enrichedAiMlStack,
  enrichedMobileStack,
  type TechStackItem,
} from "@/app/data/techStackData";

const allKnownTechs: TechStackItem[] = [
  ...enrichedTechStack,
  ...enrichedAiMlStack,
  ...enrichedMobileStack,
  {
    id: "wordpress",
    name: "WordPress",
    svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg",
    domain: "software",
    category: "CMS",
    categoryLabel: "Headless CMS",
    badge: "Enterprise CMS",
    shortDesc: "Custom themes and headless CMS architectures.",
    highlight: "REST & GraphQL APIs",
    invertInDark: true,
  },
  {
    id: "php",
    name: "PHP",
    svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    domain: "software",
    category: "Backend",
    categoryLabel: "Server Language",
    badge: "PHP 8.3+",
    shortDesc: "Robust server scripting and API engine.",
    highlight: "JIT & Fast Execution",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/woocommerce/woocommerce-original.svg",
    domain: "software",
    category: "E-Commerce",
    categoryLabel: "E-Commerce Engine",
    badge: "High-Volume Store",
    shortDesc: "Scalable e-commerce store with custom payment gateways.",
    highlight: "Custom Checkout & Scale",
  },
  {
    id: "room-db",
    name: "Room DB",
    svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    domain: "mobile",
    category: "Mobile Storage",
    categoryLabel: "Local Database",
    badge: "Offline-First",
    shortDesc: "SQLite abstraction layer with compile-time query verification.",
    highlight: "Reactive Flow Queries",
  },
];

interface ServiceTechMarqueeProps {
  technologies: string[];
}

export function ServiceTechMarquee({ technologies }: ServiceTechMarqueeProps) {
  const matchedTechs = useMemo(() => {
    return technologies.map((name) => {
      const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
      const found = allKnownTechs.find((t) => {
        const tNorm = t.name.toLowerCase().replace(/[^a-z0-9]/g, "");
        return tNorm === normalized || tNorm.includes(normalized) || normalized.includes(tNorm);
      });

      if (found) return found;

      return {
        id: normalized,
        name: name,
        svgUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        domain: "software" as const,
        category: "Technology",
        categoryLabel: "Core Tech",
        badge: "Specialized Stack",
        shortDesc: name,
        highlight: "Production Ready",
      };
    });
  }, [technologies]);

  // Duplicate for seamless infinite loop
  const displayItems = useMemo(() => {
    return [...matchedTechs, ...matchedTechs, ...matchedTechs];
  }, [matchedTechs]);

  const durationSeconds = Math.max(12, matchedTechs.length * 2.8);

  return (
    <div className="mt-14 w-full">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
          <span>Core Technology Stack in Action</span>
        </span>
      </div>

      <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface/60 p-4 sm:p-5 backdrop-blur-xs shadow-xs">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-background via-background/80 to-transparent" />

        <div className="overflow-hidden py-1">
          <div
            className="animate-marquee-left gap-3 sm:gap-4 flex"
            style={{ animationDuration: `${durationSeconds}s` }}
          >
            {displayItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="group inline-flex shrink-0 min-w-[170px] sm:min-w-[195px] items-center gap-3 rounded-xl border border-card-border bg-card px-4 py-2.5 shadow-xs transition-all duration-200 hover:border-brand/40 hover:bg-surface hover:shadow-xs"
              >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-surface p-1 border border-border/50">
                  <img
                    src={item.svgUrl}
                    alt={item.name}
                    loading="lazy"
                    className={`h-5 w-5 object-contain transition-transform duration-200 group-hover:scale-105 ${
                      item.invertInDark ? "dark:invert" : ""
                    }`}
                  />
                </div>
                <div className="flex flex-col text-left truncate">
                  <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-brand transition-colors truncate">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-medium text-foreground-subtle truncate">
                    {item.badge || item.categoryLabel || "Production"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceTechMarquee;
