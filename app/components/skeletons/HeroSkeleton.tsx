export function HeroSkeleton() {
  return (
    <section className="relative w-full overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-brand/5 blur-3xl" />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="h-7 w-56 rounded-full skeleton-box animate-shimmer border border-border/60" />
        <div className="mt-6 space-y-3 w-full flex flex-col items-center">
          <div className="h-10 sm:h-14 md:h-16 w-3/4 max-w-2xl rounded-2xl skeleton-box animate-shimmer" />
          <div className="h-10 sm:h-14 md:h-16 w-1/2 max-w-lg rounded-2xl skeleton-box animate-shimmer" />
        </div>
        <div className="mt-5 h-5 w-2/3 max-w-md rounded-lg skeleton-box animate-shimmer" />
        <div className="mt-4 space-y-2 w-full max-w-xl flex flex-col items-center">
          <div className="h-4 w-full rounded-md skeleton-box animate-shimmer" />
          <div className="h-4 w-4/5 rounded-md skeleton-box animate-shimmer" />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {["w-44", "w-48", "w-40"].map((w, i) => (
            <div key={i} className={`h-8 ${w} rounded-lg skeleton-box animate-shimmer border border-border/40`} />
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-sm sm:max-w-none">
          <div className="h-12 w-full sm:w-44 rounded-xl skeleton-box animate-shimmer" />
          <div className="h-12 w-full sm:w-44 rounded-xl skeleton-box animate-shimmer border border-border/60" />
        </div>
      </div>
    </section>
  );
}

export default HeroSkeleton;
