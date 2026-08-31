"use client";

import { useState, useEffect, useMemo } from "react";
import { getTechnologies } from "@/app/services/techStackService";
import {
  techStackLogos,
  aiMlDataStack,
  mobileAndroidStack,
  enrichedTechStack,
  enrichedAiMlStack,
  enrichedMobileStack,
  type TechStackItem,
} from "@/app/data/techStackData";
import { TechStackSkeleton } from "./skeletons/TechStackSkeleton";
import { SectionWrapper, SectionHeader } from "./common";
import { Cpu, Smartphone, Brain, Code2, Layers } from "lucide-react";

export { techStackLogos, aiMlDataStack, mobileAndroidStack };

type StackDomain = "all" | "software" | "mobile" | "ai-ml";

export function TechStackSection() {
  const [activeDomain, setActiveDomain] = useState<StackDomain>("all");
  const [techList, setTechList] = useState<TechStackItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function loadTechStack() {
      setLoading(true);
      try {
        const data = await getTechnologies();
        if (isMounted && data && data.length > 0) {
          setTechList(data);
        }
      } catch (err) {
        console.warn("Could not fetch technologies from API, using fallback:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadTechStack();
    return () => {
      isMounted = false;
    };
  }, []);

  const softwareItems = useMemo(() => {
    const list = techList.filter((item) => item.domain === "software");
    return list.length > 0 ? list : enrichedTechStack;
  }, [techList]);

  const mobileItems = useMemo(() => {
    const list = techList.filter((item) => item.domain === "mobile");
    return list.length > 0 ? list : enrichedMobileStack;
  }, [techList]);

  const aiMlItems = useMemo(() => {
    const list = techList.filter((item) => item.domain === "ai-ml");
    return list.length > 0 ? list : enrichedAiMlStack;
  }, [techList]);

  const totalAllCount = softwareItems.length + aiMlItems.length + mobileItems.length;

  const { tracks, totalCount } = useMemo(() => {
    if (activeDomain === "software") {
      return {
        tracks: [
          { id: "track-web-1", items: [...softwareItems, ...softwareItems], direction: "animate-marquee-left", glowHover: "hover:border-brand/40" },
          { id: "track-web-2", items: [...softwareItems.slice().reverse(), ...softwareItems.slice().reverse()], direction: "animate-marquee-right", glowHover: "hover:border-brand-cyan/40" },
        ],
        totalCount: softwareItems.length,
      };
    }

    if (activeDomain === "mobile") {
      return {
        tracks: [
          { id: "track-mob-1", items: [...mobileItems, ...mobileItems], direction: "animate-marquee-left", glowHover: "hover:border-purple-500/40" },
          { id: "track-mob-2", items: [...mobileItems.slice().reverse(), ...mobileItems.slice().reverse()], direction: "animate-marquee-right", glowHover: "hover:border-brand/40" },
        ],
        totalCount: mobileItems.length,
      };
    }

    if (activeDomain === "ai-ml") {
      return {
        tracks: [
          { id: "track-ai-1", items: [...aiMlItems, ...aiMlItems], direction: "animate-marquee-left", glowHover: "hover:border-brand-cyan/40" },
          { id: "track-ai-2", items: [...aiMlItems.slice().reverse(), ...aiMlItems.slice().reverse()], direction: "animate-marquee-right", glowHover: "hover:border-emerald-400/40" },
        ],
        totalCount: aiMlItems.length,
      };
    }

    return {
      tracks: [
        { id: "all-web", items: [...softwareItems, ...softwareItems], direction: "animate-marquee-left", glowHover: "hover:border-brand/40" },
        { id: "all-ai", items: [...aiMlItems, ...aiMlItems], direction: "animate-marquee-right", glowHover: "hover:border-brand-cyan/40" },
        { id: "all-mobile", items: [...mobileItems, ...mobileItems], direction: "animate-marquee-left", glowHover: "hover:border-purple-500/40" },
      ],
      totalCount: totalAllCount,
    };
  }, [activeDomain, softwareItems, mobileItems, aiMlItems, totalAllCount]);

  const domainTabs = [
    { id: "all", label: "All Stack", icon: Layers, count: totalAllCount },
    { id: "software", label: "Web & Cloud", icon: Code2, count: softwareItems.length },
    { id: "mobile", label: "Mobile Engineering", icon: Smartphone, count: mobileItems.length },
    { id: "ai-ml", label: "AI & Data", icon: Brain, count: aiMlItems.length },
  ];

  if (loading || techList.length === 0) {
    return <TechStackSkeleton />;
  }

  return (
    <SectionWrapper id="tech-stack" variant="background" border="bottom" ariaLabel="Technology Stack">
      {/* Header */}
      <SectionHeader
        icon={Cpu}
        badge="Tools & Frameworks"
        subBadge={`${totalCount}+ Technologies`}
        title={
          <>
            Our Core <span className="text-brand">Technology Stack</span>
          </>
        }
        description="We choose proven languages, frameworks, and cloud infrastructure with strong community backing, active maintenance, and enterprise scalability."
      >
        {/* Domain Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-surface border border-border shadow-xs">
          {domainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDomain === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDomain(tab.id as StackDomain)}
                className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-brand text-white shadow-sm shadow-brand/20"
                    : "text-foreground-muted hover:text-foreground hover:bg-surface-hover"
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${isActive ? "bg-white/20 text-white font-bold" : "bg-border text-foreground-subtle"
                    }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </SectionHeader>

      {/* Marquee Tracks */}
      <div className="relative mt-10 sm:mt-12 w-full overflow-hidden rounded-2xl border border-border/80 bg-surface/50 p-4 sm:p-6 backdrop-blur-xs">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-background via-background/80 to-transparent" />

        <div className="space-y-3">
          {tracks.map((track, trackIdx) => {
            const uniqueCount = Math.max(1, track.items.length / 2);
            const durationSeconds = uniqueCount * 2.0;

            return (
              <div key={`${track.id}-${trackIdx}`} className="overflow-hidden py-1">
                <div
                  className={`${track.direction} gap-3 sm:gap-4`}
                  style={{ animationDuration: `${durationSeconds}s` }}
                >
                  {track.items.map((item: TechStackItem, idx: number) => (
                    <div
                      key={`${track.id}-${item.id || item._id || idx}-${idx}`}
                      className={`group inline-flex shrink-0 min-w-[170px] sm:min-w-[195px] items-center gap-3 rounded-xl border border-card-border bg-card/90 px-4 py-2.5 shadow-xs transition-all duration-200 ${track.glowHover} hover:bg-surface hover:shadow-xs`}
                    >
                      <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg bg-surface p-1 border border-border/50">
                        <img
                          src={item.svgUrl}
                          alt={item.name}
                          loading="lazy"
                          className={`h-5 w-5 object-contain transition-transform duration-200 group-hover:scale-105 ${item.invertInDark ? "dark:invert" : ""
                            }`}
                        />
                      </div>
                      <div className="flex flex-col text-left truncate">
                        <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-brand transition-colors truncate">
                          {item.name}
                        </span>
                        <span className="text-[10px] font-medium text-foreground-subtle truncate">
                          {item.badge || item.categoryLabel || item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default TechStackSection;
