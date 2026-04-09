"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import CategoryCard from "@/components/shared/CategoryCard";
import PaginationDots from "@/components/shared/PaginationDots";
import type { Category } from "@/types/shared";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryCarouselProps {
  categories: Category[];
  autoPlayInterval?: number;
}

const CARD_WIDTH = 282;
const GAP = 24;

export default function CategoryCarousel({
  categories,
  autoPlayInterval = 4000,
}: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const visibleCards = 4;
  const maxIndex = Math.max(0, categories.length - visibleCards);

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setActiveIndex(clamped);
      scrollRef.current?.scrollTo({
        left: clamped * (CARD_WIDTH + GAP),
        behavior: "smooth",
      });
    },
    [maxIndex],
  );

  // Auto-play
  useEffect(() => {
    if (isPaused || categories.length <= visibleCards) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev >= maxIndex ? 0 : prev + 1;
        scrollRef.current?.scrollTo({
          left: next * (CARD_WIDTH + GAP),
          behavior: "smooth",
        });
        return next;
      });
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, autoPlayInterval, categories.length]);

  // Sync active index on manual scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / (CARD_WIDTH + GAP));
    setActiveIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  if (categories.length === 0) return null;

  return (
    <div
      className="flex flex-col items-center gap-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full">
        <div className="flex items-end justify-between mb-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-2xl md:text-[32px] font-bold leading-[1.2] text-slate-900">
              Browse All Categories
            </h2>
            <p className="text-base text-slate-500">See all categories</p>
          </div>

          {categories.length > visibleCards && (
            <div className="flex gap-2">
              <button
                onClick={() => scrollToIndex(activeIndex - 1)}
                disabled={activeIndex === 0}
                className="flex size-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => scrollToIndex(activeIndex + 1)}
                disabled={activeIndex >= maxIndex}
                className="flex size-9 items-center justify-center rounded-full border border-slate-300 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-30"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              className="h-[376px] w-[282px] shrink-0 bg-neutral-900"
              buttonLabel="View Details"
            />
          ))}
        </div>
      </div>

      <PaginationDots
        total={maxIndex + 1}
        active={activeIndex}
        onDotClick={scrollToIndex}
      />
    </div>
  );
}
