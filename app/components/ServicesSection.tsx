"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setServiceCards,
  setServiceCardsLoading,
  setServiceCardsError,
  selectServiceCards,
  selectServiceCardsLoading,
} from "@/lib/store/features/services/serviceCardSlice";
import { getServiceCards } from "@/app/services/serviceCardService";
import { ServiceCard } from "./ServiceCard";
import { ServicesSkeleton } from "./skeletons/ServicesSkeleton";
import { SectionWrapper, SectionHeader, CalloutBanner } from "./common";
import { useCarousel } from "@/lib/hooks/useCarousel";
import { Layers, ChevronLeft, ChevronRight, Code2 } from "lucide-react";

interface ServicesSectionProps {
  isPage?: boolean;
  className?: string;
}

export function ServicesSection({ isPage = false, className = "" }: ServicesSectionProps) {
  const dispatch = useAppDispatch();
  const serviceCards = useAppSelector(selectServiceCards);
  const loading = useAppSelector(selectServiceCardsLoading);
  const activeCards = serviceCards.filter((card) => card.isActive !== false);

  useEffect(() => {
    let isMounted = true;
    dispatch(setServiceCardsLoading(true));
    getServiceCards()
      .then((data) => {
        if (isMounted && data?.length) {
          dispatch(setServiceCards(data.filter((c) => c.isActive !== false)));
        }
      })
      .catch((err) => {
        if (isMounted) dispatch(setServiceCardsError(err.message));
      })
      .finally(() => {
        if (isMounted) dispatch(setServiceCardsLoading(false));
      });

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const { activeIndex, cardsPerView, maxSlideIndex, isSlider, nextSlide, prevSlide, goToSlide, hoverHandlers } =
    useCarousel({ totalItems: activeCards.length, responsive: true, intervalMs: 4000 });

  if (loading || activeCards.length === 0) {
    return <ServicesSkeleton />;
  }

  return (
    <SectionWrapper
      id="services"
      variant="surface"
      border={isPage ? "none" : "both"}
      py={isPage ? "pt-20 pb-16 md:pt-24 md:pb-20" : "py-16 md:py-20"}
      className={className}
      ariaLabel="Services"
    >
      <SectionHeader
        icon={Layers}
        badge="Core Capabilities"
        subBadge={isSlider ? `${activeIndex + 1} / ${maxSlideIndex + 1}` : undefined}
        title={
          <>
            Engineering Services for <span className="text-brand">Every Stage</span>
          </>
        }
        description="From initial system architecture to production deployment and maintenance, we cover every stage of the digital product lifecycle."
      />

      <div className="relative mt-14 sm:mt-16" {...hoverHandlers}>
        {isSlider && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute -left-3 sm:-left-5 lg:-left-6 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border bg-surface/95 backdrop-blur-md text-foreground shadow-xl transition-all hover:border-brand hover:text-brand hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute -right-3 sm:-right-5 lg:-right-6 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border bg-surface/95 backdrop-blur-md text-foreground shadow-xl transition-all hover:border-brand hover:text-brand hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </>
        )}

        <div className="overflow-hidden py-3 -my-3 px-1">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * (100 / cardsPerView)}%)` }}
          >
            {activeCards.map((card, idx) => (
              <div
                key={card._id || card.id || idx}
                className="shrink-0 px-2.5 sm:px-3"
                style={{ width: `${100 / cardsPerView}%` }}
              >
                <ServiceCard card={card} index={idx} />
              </div>
            ))}
          </div>
        </div>

        {isSlider && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxSlideIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex ? "w-8 bg-brand" : "w-2 bg-border hover:bg-foreground-muted/50"
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      <CalloutBanner
        icon={Code2}
        tag="Dedicated Development Squads"
        title="Need a tailored engineering team for your roadmap?"
        description="We provide dedicated senior engineers, technical leads, and architects ready to integrate directly into your sprint cycle."
        buttonText="Consult Our Team"
        buttonHref="/contact"
      />
    </SectionWrapper>
  );
}

export default ServicesSection;
