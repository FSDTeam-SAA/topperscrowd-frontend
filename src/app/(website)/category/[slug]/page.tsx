"use client";

import { use } from "react";
import PageHeroBanner from "@/components/shared/PageHeroBanner";
import CategoryCarousel from "@/features/category/components/CategoryCarousel";
import BookGrid from "@/components/shared/BookGrid";
import BookGridSkeleton from "@/components/shared/skeletons/BookGridSkeleton";
import { useBookCategory } from "@/features/book-category/hooks/useBookCategories";
import { useBookCategories } from "@/features/book-category/hooks/useBookCategories";
import { useBooksByCategory } from "@/features/book/hooks/useBooks";
import { mapApiBookToBook, mapApiCategoryToCategory } from "@/types/shared";

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = use(params);
  const { data: category, isLoading: catLoading } = useBookCategory(slug);
  const { data: allCategories } = useBookCategories();
  const { data: booksRes, isLoading: booksLoading } = useBooksByCategory(slug);

  const books = (booksRes?.data ?? []).map(mapApiBookToBook);
  const mappedCategories = (allCategories ?? []).map(mapApiCategoryToCategory);

  const title = category?.title?.trim() || "Category";
  const subtitle = category?.description?.trim() || "";
  const image =
    category?.image?.secure_url || "/images/home/category-horror.png";

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <PageHeroBanner
        title={catLoading ? "Loading..." : title}
        subtitle={subtitle}
        backgroundImage={image}
      />

      <div className="mx-auto max-w-[1200px] py-16 flex flex-col gap-16">
        <CategoryCarousel categories={mappedCategories} />

        {booksLoading ? (
          <BookGridSkeleton />
        ) : (
          <BookGrid
            title={`${title} Audiobooks`}
            subtitle={`Enjoy all the ${title.toLowerCase()} books`}
            books={books.slice(0, 4)}
            categorySlug={slug}
            viewAllHref={`/category/${slug}/all`}
          />
        )}
      </div>
    </div>
  );
}
