export function CareersSkeleton() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto w-full">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-5 rounded-2xl border border-card-border bg-card p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-6 w-56 rounded-lg skeleton-box animate-shimmer" />
                <div className="h-5 w-16 rounded-md skeleton-box animate-shimmer" />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {["w-28", "w-20", "w-32"].map((w, i) => (
                  <div key={i} className={`h-4 ${w} rounded-md skeleton-box animate-shimmer`} />
                ))}
              </div>
            </div>
            <div className="h-10 w-32 rounded-xl skeleton-box animate-shimmer shrink-0" />
          </div>
          <div className="space-y-2">
            <div className="h-3.5 w-full rounded-md skeleton-box animate-shimmer" />
            <div className="h-3.5 w-4/5 rounded-md skeleton-box animate-shimmer" />
          </div>
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/50">
            {["w-20", "w-16", "w-14", "w-18"].map((w, i) => (
              <div key={i} className={`h-5 ${w} rounded-md skeleton-box animate-shimmer`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CareersSkeleton;
