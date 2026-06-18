"use client";

import { use } from "react";
import PageHeroBanner from "@/components/shared/PageHeroBanner";
import BookCard from "@/components/shared/BookCard";
import BookCardSkeleton from "@/components/shared/skeletons/BookCardSkeleton";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import { useEBooks } from "@/features/e-book/hooks/useEBooks";
import { useEBookCategory } from "@/features/e-book-category/hooks/useEBookCategories";
import { mapApiEBookToBook } from "@/types/shared";

interface EBookCategoryAllPageProps {
  params: Promise<{ slug: string }>;
}

export default function EBookCategoryAllPage({
  params,
}: EBookCategoryAllPageProps) {
  const { slug } = use(params);
  const addToCart = useAddToCart();
  const { data: category } = useEBookCategory(slug);
  const {
    data: booksRes,
    isLoading,
    isError,
  } = useEBooks({
    categoryId: slug,
    limit: 50,
  });

  const books = (booksRes?.data ?? []).map(mapApiEBookToBook);
  const title = category?.name?.trim() || "Category";

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <PageHeroBanner
        title={`${title} E-Books`}
        subtitle={`Browse all ${title.toLowerCase()} e-books`}
        backgroundImage="/images/home/category-scifi.png"
      />

      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-0 py-10 md:py-16">
        <div className="mb-8">
          <h2 className="font-serif text-2xl md:text-[32px] font-bold leading-[1.2] text-slate-900">
            All {title} E-Books
          </h2>
          <p className="mt-2 text-base text-slate-500">
            {booksRes?.meta?.total ?? 0} titles available
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))
          ) : isError ? (
            <div className="col-span-full rounded-xl border border-red-100 bg-white px-6 py-8 text-center text-sm text-red-600">
              Unable to load e-books right now.
            </div>
          ) : books.length === 0 ? (
            <div className="col-span-full rounded-xl border border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
              No e-books are available in this category yet.
            </div>
          ) : (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                categorySlug={slug}
                hrefBase="/e-books"
                buttonLabel={addToCart.isPending ? "Adding..." : "Add to Cart"}
                showDescription
                onAddToCart={(id) =>
                  addToCart.mutate([{ ebookId: id, quantity: 1 }])
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
