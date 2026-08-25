"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setBanners,
  setBannerLoading,
  setBannerError,
  selectBanners,
} from "@/lib/store/features/banner/bannerSlice";
import { getBanners } from "@/app/services/bannerService";
import { useCarousel } from "@/lib/hooks/useCarousel";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Code2,
} from "lucide-react";

export function HeroSection() {
  const dispatch = useAppDispatch();
  const banners = useAppSelector(selectBanners);

  useEffect(() => {
    let isMounted = true;
    async function loadHeroData() {
      dispatch(setBannerLoading(true));
      try {
        const data = await getBanners();
        if (isMounted && data?.length) {
          const active = data.filter((b) => b.isActive !== false);
          if (active.length > 0) {
            dispatch(setBanners(active));
            dispatch(setBannerError(null));
          }
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Failed to load hero banner";
          dispatch(setBannerError(message));
        }
      } finally {
        if (isMounted) dispatch(setBannerLoading(false));
      }
    }
    loadHeroData();
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const { activeIndex, isSlider, nextSlide, prevSlide, goToSlide, hoverHandlers } =
    useCarousel({ totalItems: banners.length, intervalMs: 4500 });

  const renderTitle = (title: string) => {
    if (!title) return null;
    const words = title.trim().split(" ");
    if (words.length <= 3) return <span className="text-brand">{title}</span>;

    const splitIndex = Math.max(1, words.length - 3);
    const mainText = words.slice(0, splitIndex).join(" ");
    const accentText = words.slice(splitIndex).join(" ");

    return (
      <>
        <span>{mainText} </span>
        <span className="text-brand">{accentText}</span>
      </>
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 transition-colors duration-200"
      aria-label="Hero Banner"
      {...hoverHandlers}
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute top-48 right-10 -z-10 h-72 w-72 rounded-full bg-brand-cyan/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 -z-10 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />

      {isSlider && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border bg-surface/95 backdrop-blur-md text-foreground shadow-xl transition-all hover:border-brand hover:bg-surface hover:text-brand hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border bg-surface/95 backdrop-blur-md text-foreground shadow-xl transition-all hover:border-brand hover:bg-surface hover:text-brand hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </>
      )}

      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {banners.map((banner, idx) => (
            <div key={banner._id || idx} className="w-full shrink-0 px-6 sm:px-16 md:px-24">
              <div className="mx-auto max-w-4xl text-center">
                {banner.badge && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                    <span>{banner.badge}</span>
                    {isSlider && (
                      <>
                        <span className="text-border">|</span>
                        <span className="text-brand font-mono text-[11px]">
                          {idx + 1} / {banners.length}
                        </span>
                      </>
                    )}
                  </div>
                )}

                <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.15]">
                  {renderTitle(banner.title)}
                </h1>

                {banner.subTitle && (
                  <p className="mt-3 text-base sm:text-lg font-medium text-foreground-muted">
                    {banner.subTitle}
                  </p>
                )}

                {banner.description && (
                  <p className="mt-5 text-base sm:text-lg text-foreground-muted leading-relaxed max-w-2xl mx-auto">
                    {banner.description}
                  </p>
                )}

                {banner.features && banner.features.length > 0 && (
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                    {banner.features.map((feature, fIdx) => (
                      <span
                        key={fIdx}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground-muted"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand shrink-0" />
                        <span>{feature}</span>
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
                  {banner.primaryBtnText && (
                    <Link
                      href={banner.primaryBtnLink || "#contact"}
                      className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-all hover:bg-brand-hover hover:shadow-brand/35 active:scale-95 cursor-pointer"
                    >
                      <span>{banner.primaryBtnText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}

                  {banner.secondaryBtnText && (
                    <Link
                      href={banner.secondaryBtnLink || "#services"}
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-brand/40 hover:bg-surface-hover active:scale-95 cursor-pointer"
                    >
                      <Code2 className="h-4 w-4 text-brand" />
                      <span>{banner.secondaryBtnText}</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isSlider && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {banners.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goToSlide(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === activeIndex ? "w-8 bg-brand" : "w-2 bg-border hover:bg-foreground-muted/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HeroSection;
