import { useState, useEffect, useCallback } from "react";

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

  const hoverHandlers = {
    onMouseEnter: () => setIsPaused(true),
    onMouseLeave: () => setIsPaused(false),
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
