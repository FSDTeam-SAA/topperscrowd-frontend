"use client";

import { use } from "react";
import PageHeroBanner from "@/components/shared/PageHeroBanner";
import CategoryCarousel from "@/features/category/components/CategoryCarousel";
import BookGrid from "@/components/shared/BookGrid";
import BookGridSkeleton from "@/components/shared/skeletons/BookGridSkeleton";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import { useEBooks } from "@/features/e-book/hooks/useEBooks";
import {
  useEBookCategories,
  useEBookCategory,
} from "@/features/e-book-category/hooks/useEBookCategories";
import {
  mapApiEBookCategoryToCategory,
  mapApiEBookToBook,
} from "@/types/shared";

interface EBookCategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function EBookCategoryDetailPage({
  params,
}: EBookCategoryDetailPageProps) {
  const { slug } = use(params);
  const addToCart = useAddToCart();
  const { data: category, isLoading: catLoading } = useEBookCategory(slug);
  const { data: allCategories, isError: categoriesError } =
    useEBookCategories();
  const {
    data: booksRes,
    isLoading: booksLoading,
    isError: booksError,
  } = useEBooks({
    categoryId: slug,
  });

  const books = (booksRes?.data ?? []).map(mapApiEBookToBook);
  const mappedCategories = (allCategories ?? []).map(
    mapApiEBookCategoryToCategory,
  );

  const title = category?.name?.trim() || "Category";
  const subtitle = category?.description?.trim() || "";

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <PageHeroBanner
        title={catLoading ? "Loading..." : title}
        subtitle={subtitle}
        backgroundImage="/images/home/category-scifi.png"
      />

      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-0 py-10 md:py-16 flex flex-col gap-10 md:gap-16">
        {categoriesError ? (
          <div className="rounded-xl border border-red-100 bg-white px-6 py-5 text-sm text-red-600">
            Unable to load e-book categories right now.
          </div>
        ) : mappedCategories.length > 0 ? (
          <CategoryCarousel categories={mappedCategories} hrefBase="/e-books" />
        ) : null}

        {booksLoading ? (
          <BookGridSkeleton />
        ) : booksError ? (
          <div className="rounded-xl border border-red-100 bg-white px-6 py-8 text-center text-sm text-red-600">
            Unable to load e-books for this category right now.
          </div>
        ) : books.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
            No e-books are available in this category yet.
          </div>
        ) : (
          <BookGrid
            title={`${title} E-Books`}
            subtitle={`Enjoy all the ${title.toLowerCase()} e-books`}
            books={books.slice(0, 4)}
            categorySlug={slug}
            hrefBase="/e-books"
            viewAllHref={`/e-books/${slug}/all`}
            buttonLabel={addToCart.isPending ? "Adding..." : "Add to Cart"}
            showDescription
            onAddToCart={(id) =>
              addToCart.mutate([{ ebookId: id, quantity: 1 }])
            }
          />
        )}
      </div>
    </div>
  );
}
