"use client";

import Link from "next/link";
import {
  Code2,
  Smartphone,
  Cloud,
  Cpu,
  Palette,
  ShieldCheck,
  Layers,
  LineChart,
  Globe,
  Database,
  Sparkles,
  Server,
  Zap,
  Terminal,
  Settings,
  Workflow,
  BrainCircuit,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCard as ServiceCardType } from "@/app/services/serviceCardService";

// Dynamic Lucide icon map matching string names from backend or state
const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  code2: Code2,
  smartphone: Smartphone,
  mobile: Smartphone,
  tabletsmartphone: Smartphone,
  tablet: Smartphone,
  cloud: Cloud,
  cpu: Cpu,
  ai: Cpu,
  brain: BrainCircuit,
  braincircuit: BrainCircuit,
  palette: Palette,
  design: Palette,
  shield: ShieldCheck,
  shieldcheck: ShieldCheck,
  security: ShieldCheck,
  layers: Layers,
  linechart: LineChart,
  chart: LineChart,
  analytics: LineChart,
  globe: Globe,
  web: Globe,
  database: Database,
  db: Database,
  sparkles: Sparkles,
  server: Server,
  zap: Zap,
  fast: Zap,
  terminal: Terminal,
  settings: Settings,
  workflow: Workflow,
};

interface ServiceCardProps {
  card: ServiceCardType;
  index?: number;
}

export function ServiceCard({ card, index = 0 }: ServiceCardProps) {
  // Resolve Lucide icon safely (case-insensitive lookup with fallback)
  const iconKey = (card.icon || "Code2").toLowerCase().replace(/[^a-z0-9]/g, "");
  const IconComponent: LucideIcon = iconMap[iconKey] || Code2;

  const resolveLink = (link?: string, title?: string) => {
    if (link && link !== "#" && link !== "#services" && link !== "/services") return link;
    const t = (title || "").toLowerCase();
    if (t.includes("web") || t.includes("cloud") || t.includes("software")) return "/services/web-development";
    if (t.includes("mobile") || t.includes("app") || t.includes("android") || t.includes("ios")) return "/services/app-mobile-development";
    if (t.includes("wordpress") || t.includes("cms") || t.includes("ecommerce")) return "/services/wordpress-development";
    if (t.includes("ai") || t.includes("data") || t.includes("machine") || t.includes("ml")) return "/services/ai-automation";
    return "/services";
  };

  const linkHref = resolveLink(card.link, card.title);

  return (
    <div
      className="group relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Subtle Card Ambient Glow Accent on Hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-brand/10 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:bg-brand/15" />

      {/* Top Card Header: Icon & Badge */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand/30">
            <IconComponent className="h-6 w-6 transition-transform duration-300" />
          </div>

          {card.badge && (
            <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand-tint px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase text-brand shadow-xs">
              {card.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground transition-colors duration-200 group-hover:text-brand">
          {card.title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          {card.description}
        </p>

        {/* Feature / Technology Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {card.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="inline-flex items-center rounded-md border border-border/80 bg-surface px-2.5 py-1 text-[11px] font-medium text-foreground-muted transition-colors group-hover:border-brand/20 group-hover:text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action / Learn More Link */}
      <div className="mt-6 pt-5 border-t border-border/60">
        <Link
          href={linkHref}
          className="inline-flex items-center gap-2 text-xs font-semibold text-brand transition-colors hover:text-brand-hover group-hover:gap-2.5"
        >
          <span>Explore Capabilities</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
