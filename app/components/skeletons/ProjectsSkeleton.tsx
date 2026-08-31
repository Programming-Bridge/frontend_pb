import { SectionWrapper, SectionHeader } from "../common";
import { FolderGit2 } from "lucide-react";

export function ProjectsSkeleton() {
  return (
    <SectionWrapper id="projects" variant="background" border="bottom" ariaLabel="Projects Loading">
      <SectionHeader
        icon={FolderGit2}
        badge="Portfolio"
        subBadge="Loading Projects..."
        title={<>Featured Work & <span className="text-brand">Case Studies</span></>}
        description="A selection of web applications, mobile platforms, and cloud systems engineered for our clients."
      >
        <div className="mt-8 inline-flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-surface border border-border">
          {["w-20", "w-28", "w-24", "w-26"].map((w, i) => (
            <div key={i} className={`h-9 ${w} rounded-xl skeleton-box animate-shimmer`} />
          ))}
        </div>
      </SectionHeader>
      <div className="mt-14 sm:mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="flex flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card shadow-xs">
            <div className="relative aspect-video w-full overflow-hidden bg-surface border-b border-border/80">
              <div className="h-full w-full skeleton-box animate-shimmer" />
              <div className="absolute left-3.5 top-3.5 h-5 w-24 rounded-full skeleton-box animate-shimmer border border-border/50" />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
              <div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-28 rounded-md skeleton-box animate-shimmer" />
                  <div className="h-4 w-20 rounded-md skeleton-box animate-shimmer" />
                </div>
                <div className="mt-3 h-6 w-4/5 rounded-lg skeleton-box animate-shimmer" />
                <div className="mt-3 space-y-2">
                  <div className="h-3.5 w-full rounded-md skeleton-box animate-shimmer" />
                  <div className="h-3.5 w-11/12 rounded-md skeleton-box animate-shimmer" />
                  <div className="h-3.5 w-3/4 rounded-md skeleton-box animate-shimmer" />
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["w-14", "w-16", "w-12", "w-18"].map((w, i) => (
                    <div key={i} className={`h-5 ${w} rounded-md skeleton-box animate-shimmer`} />
                  ))}
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/60">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-20 rounded-md skeleton-box animate-shimmer" />
                  <div className="h-4 w-16 rounded-md skeleton-box animate-shimmer" />
                </div>
                <div className="h-4 w-16 rounded-md skeleton-box animate-shimmer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default ProjectsSkeleton;
