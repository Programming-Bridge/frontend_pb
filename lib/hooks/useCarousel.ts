import { useState, useEffect, useCallback, useRef } from "react";

interface UseCarouselOptions {
  totalItems: number;
  intervalMs?: number;
  responsive?: boolean;
}

export function useCarousel({
  totalItems,
  intervalMs = 4000,
  responsive = false,
}: UseCarouselOptions) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(responsive ? 3 : 1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Handle responsive items per view
  useEffect(() => {
    if (!responsive) return;

    function handleResize() {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [responsive]);

  const maxSlideIndex = Math.max(0, totalItems - cardsPerView);
  const isSlider = totalItems > cardsPerView;
  const activeIndex = Math.min(currentSlide, maxSlideIndex);

  // Auto-play timer
  useEffect(() => {
    if (!isSlider || isPaused || maxSlideIndex <= 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isSlider, isPaused, maxSlideIndex, intervalMs]);

  const nextSlide = useCallback(() => {
    if (!isSlider || maxSlideIndex <= 0) return;
    setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
  }, [isSlider, maxSlideIndex]);

  const prevSlide = useCallback(() => {
    if (!isSlider || maxSlideIndex <= 0) return;
    setCurrentSlide((prev) => (prev <= 0 ? maxSlideIndex : prev - 1));
  }, [isSlider, maxSlideIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const hoverHandlers = {
    onMouseEnter: () => {
      // Only pause on non-touch devices where hover is supported
      if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
        setIsPaused(true);
      }
    },
    onMouseLeave: () => setIsPaused(false),
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };

  return {
    currentSlide,
    activeIndex,
    cardsPerView,
    maxSlideIndex,
    isSlider,
    nextSlide,
    prevSlide,
    goToSlide,
    hoverHandlers,
  };
}

export default useCarousel;

