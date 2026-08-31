"use client";

export function StatsStrip() {
  const stats = [
    {
      value: "5.0 / 5.0",
      label: "Average Client Rating",
      valueColor: "text-brand", // Green
    },
    {
      value: "99.8%",
      label: "Sprint On-Time Delivery",
      valueColor: "text-foreground",
    },
    {
      value: "100%",
      label: "IP & Codebase Ownership",
      valueColor: "text-brand-cyan", // Blue / Cyan
    },
    {
      value: "40+",
      label: "Enterprise Apps Shipped",
      valueColor: "text-foreground",
    },
  ];

  return (
    <section className="w-full py-10 sm:py-14 bg-background transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl border border-border bg-card p-4 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-surface/50 md:bg-transparent md:border-r md:last:border-r-0 border-border/60"
              >
                <span
                  className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${stat.valueColor}`}
                >
                  {stat.value}
                </span>
                <span className="mt-1.5 text-xs sm:text-sm font-medium text-foreground-muted leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsStrip;
