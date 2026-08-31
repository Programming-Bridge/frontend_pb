import { SectionWrapper, SectionHeader } from "../common";
import { Cpu } from "lucide-react";

export function TechStackSkeleton() {
  return (
    <SectionWrapper id="tech-stack" variant="background" border="bottom" ariaLabel="Tech Stack Loading">
      <SectionHeader
        icon={Cpu}
        badge="Tools & Frameworks"
        subBadge="Loading Technologies..."
        title={<>Our Core <span className="text-brand">Technology Stack</span></>}
        description="We choose proven languages, frameworks, and cloud infrastructure with strong community backing, active maintenance, and enterprise scalability."
      >
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-surface border border-border shadow-xs">
          {["w-24", "w-28", "w-36", "w-24"].map((w, i) => (
            <div key={i} className={`h-9 ${w} rounded-xl skeleton-box animate-shimmer`} />
          ))}
        </div>
      </SectionHeader>
      <div className="relative mt-10 sm:mt-12 w-full overflow-hidden rounded-2xl border border-border/80 bg-surface/50 p-4 sm:p-6 backdrop-blur-xs">
        <div className="space-y-3">
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex gap-3 sm:gap-4 overflow-hidden py-1">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="inline-flex shrink-0 min-w-[170px] sm:min-w-[195px] items-center gap-3 rounded-xl border border-card-border bg-card/90 px-4 py-2.5 shadow-xs">
                  <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-lg skeleton-box animate-shimmer" />
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="h-3.5 w-20 rounded-md skeleton-box animate-shimmer" />
                    <div className="h-2.5 w-14 rounded-md skeleton-box animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default TechStackSkeleton;
