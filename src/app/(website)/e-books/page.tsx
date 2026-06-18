"use client";

import PageHeroBanner from "@/components/shared/PageHeroBanner";
import BookGridSkeleton from "@/components/shared/skeletons/BookGridSkeleton";
import CategoryCarousel from "@/features/category/components/CategoryCarousel";
import DynamicEBookCategorySections from "@/features/e-book/components/DynamicEBookCategorySections";
import { useEBookCategories } from "@/features/e-book-category/hooks/useEBookCategories";
import { mapApiEBookCategoryToCategory } from "@/types/shared";

export default function EBooksPage() {
  const { data: categories, isLoading, isError } = useEBookCategories();
  const mapped = (categories ?? []).map(mapApiEBookCategoryToCategory);

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <PageHeroBanner
        title="E-Books"
        subtitle="Read powerful stories and guides from every category."
        backgroundImage="/images/home/category-scifi.png"
      />

      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-0 py-10 md:py-16 flex flex-col gap-10 md:gap-16">
        {isLoading ? (
          <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[250px] md:h-[376px] rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-red-100 bg-white px-6 py-8 text-center text-sm text-red-600">
            Unable to load e-book categories right now.
          </div>
        ) : mapped.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
            No e-book categories are available right now.
          </div>
        ) : (
          <CategoryCarousel categories={mapped} hrefBase="/e-books" />
        )}

        {isLoading ? (
          <BookGridSkeleton />
        ) : isError || (categories ?? []).length === 0 ? null : (
          <DynamicEBookCategorySections categories={categories ?? []} />
        )}
      </div>
    </div>
  );
}
