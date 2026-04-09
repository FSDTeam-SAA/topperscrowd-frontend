"use client";

import { use } from "react";
import PageHeroBanner from "@/components/shared/PageHeroBanner";
import BookCard from "@/components/shared/BookCard";
import BookCardSkeleton from "@/components/shared/skeletons/BookCardSkeleton";
import { useBookCategory } from "@/features/book-category/hooks/useBookCategories";
import { useBooksByCategory } from "@/features/book/hooks/useBooks";
import { mapApiBookToBook } from "@/types/shared";

interface CategoryAllPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryAllPage({ params }: CategoryAllPageProps) {
  const { slug } = use(params);
  const { data: category } = useBookCategory(slug);
  const { data: booksRes, isLoading } = useBooksByCategory(slug, { limit: 50 });

  const books = (booksRes?.data ?? []).map(mapApiBookToBook);
  const title = category?.title?.trim() || "Category";
  const image =
    category?.image?.secure_url || "/images/home/category-horror.png";

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <PageHeroBanner
        title={`${title} Audiobooks`}
        subtitle={`Browse all ${title.toLowerCase()} audiobooks`}
        backgroundImage={image}
      />

      <div className="mx-auto max-w-[1200px] py-16">
        <div className="mb-8">
          <h2 className="font-serif text-[32px] font-bold leading-[1.2] text-slate-900">
            All {title} Audiobooks
          </h2>
          <p className="mt-2 text-base text-slate-500">
            {booksRes?.meta?.total ?? 0} titles available
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <BookCardSkeleton key={i} />
              ))
            : books.map((book) => (
                <BookCard key={book.id} book={book} categorySlug={slug} />
              ))}
        </div>
      </div>
    </div>
  );
}
