import { SectionWrapper, SectionHeader } from "../common";
import { Layers } from "lucide-react";

export function ServicesSkeleton() {
  return (
    <SectionWrapper id="services" variant="surface" border="both" ariaLabel="Services Loading">
      <SectionHeader
        icon={Layers}
        badge="Core Capabilities"
        subBadge="Loading Services..."
        title={<>Engineering Services for <span className="text-brand">Every Stage</span></>}
        description="From initial system architecture to production deployment and maintenance, we cover every stage of the digital product lifecycle."
      />
      <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="flex flex-col justify-between rounded-2xl border border-card-border bg-card p-6 shadow-xs">
            <div>
              <div className="flex items-center justify-between">
                <div className="h-11 w-11 rounded-xl skeleton-box animate-shimmer" />
                <div className="h-5 w-20 rounded-full skeleton-box animate-shimmer border border-border/50" />
              </div>
              <div className="mt-5 h-6 w-3/4 rounded-lg skeleton-box animate-shimmer" />
              <div className="mt-3 space-y-2">
                <div className="h-3.5 w-full rounded-md skeleton-box animate-shimmer" />
                <div className="h-3.5 w-5/6 rounded-md skeleton-box animate-shimmer" />
                <div className="h-3.5 w-2/3 rounded-md skeleton-box animate-shimmer" />
              </div>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {["w-16", "w-14", "w-20"].map((w, i) => (
                  <div key={i} className={`h-5 ${w} rounded-md skeleton-box animate-shimmer`} />
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
              <div className="h-4 w-24 rounded-md skeleton-box animate-shimmer" />
              <div className="h-4 w-4 rounded-full skeleton-box animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default ServicesSkeleton;
