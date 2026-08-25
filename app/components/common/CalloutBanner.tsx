import Link from "next/link";
import { ArrowRight, LucideIcon, Code2 } from "lucide-react";

interface CalloutBannerProps {
  icon?: LucideIcon;
  tag?: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export function CalloutBanner({
  icon: Icon = Code2,
  tag = "Custom Engineering",
  title,
  description,
  buttonText = "Discuss Your Project",
  buttonHref = "#contact",
  className = "",
}: CalloutBannerProps) {
  return (
    <div
      className={`mt-16 rounded-2xl border border-card-border bg-card p-8 sm:p-10 shadow-xs ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-brand font-semibold text-xs sm:text-sm">
            <Icon className="h-4 w-4" />
            <span>{tag}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-foreground-muted max-w-xl">
            {description}
          </p>
        </div>

        <Link
          href={buttonHref}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-95 cursor-pointer"
        >
          <span>{buttonText}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default CalloutBanner;
