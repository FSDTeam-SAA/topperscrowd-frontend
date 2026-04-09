"use client";

import PageHeroBanner from "@/components/shared/PageHeroBanner";
import CategoryCarousel from "@/features/category/components/CategoryCarousel";
import DynamicCategoryBookSections from "@/features/category/components/DynamicCategoryBookSections";
import BookGridSkeleton from "@/components/shared/skeletons/BookGridSkeleton";
import { useBookCategories } from "@/features/book-category/hooks/useBookCategories";
import { mapApiCategoryToCategory } from "@/types/shared";

export default function CategoryPage() {
  const { data: categories, isLoading } = useBookCategories();
  const mapped = (categories ?? []).map(mapApiCategoryToCategory);

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <PageHeroBanner
        title="Category Details"
        subtitle="Experience everything like never before-through every haunting sound."
        backgroundImage="/images/home/category-horror.png"
      />

      <div className="mx-auto max-w-[1200px] py-16 flex flex-col gap-16">
        {isLoading ? (
          <div className="animate-pulse flex gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[376px] w-[282px] shrink-0 rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        ) : (
          <CategoryCarousel categories={mapped} />
        )}

        {isLoading ? (
          <BookGridSkeleton />
        ) : (
          <DynamicCategoryBookSections categories={categories ?? []} />
        )}
      </div>
    </div>
  );
}
