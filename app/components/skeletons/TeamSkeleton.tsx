export function TeamSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="flex flex-col justify-between overflow-hidden rounded-2xl border border-card-border bg-card shadow-xs">
          <div className="relative aspect-square w-full overflow-hidden bg-surface">
            <div className="h-full w-full skeleton-box animate-shimmer" />
            <div className="absolute top-3 left-3 h-5 w-24 rounded-full skeleton-box animate-shimmer border border-border/50" />
          </div>
          <div className="flex flex-1 flex-col justify-between p-5">
            <div>
              <div className="h-5 w-3/4 rounded-lg skeleton-box animate-shimmer" />
              <div className="mt-2 h-3.5 w-1/2 rounded-md skeleton-box animate-shimmer" />
              <div className="mt-3 space-y-1.5">
                <div className="h-3 w-full rounded-md skeleton-box animate-shimmer" />
                <div className="h-3 w-5/6 rounded-md skeleton-box animate-shimmer" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60">
              <div className="flex flex-wrap gap-1 mb-3">
                {["w-12", "w-14", "w-10"].map((w, i) => (
                  <div key={i} className={`h-4 ${w} rounded-md skeleton-box animate-shimmer`} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-7 w-7 rounded-lg skeleton-box animate-shimmer" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeamSkeleton;
