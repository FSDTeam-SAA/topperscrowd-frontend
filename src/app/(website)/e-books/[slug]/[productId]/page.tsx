"use client";

import { use } from "react";
import NewReleaseBanner from "@/components/shared/NewReleaseBanner";
import ProductDetailSkeleton from "@/components/shared/skeletons/ProductDetailSkeleton";
import BookGridSkeleton from "@/components/shared/skeletons/BookGridSkeleton";
import RelatedBooks from "@/features/category/components/RelatedBooks";
import EBookDetail from "@/features/e-book/components/EBookDetail";
import { useEBook, useEBooks } from "@/features/e-book/hooks/useEBooks";
import { mapApiEBookToBook } from "@/types/shared";

interface EBookDetailPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default function EBookDetailPage({ params }: EBookDetailPageProps) {
  const { slug, productId } = use(params);
  const {
    data: ebook,
    isLoading: ebookLoading,
    isError: ebookError,
  } = useEBook(productId);
  const {
    data: relatedRes,
    isLoading: relatedLoading,
    isError: relatedError,
  } = useEBooks({
    categoryId: slug,
    limit: 5,
  });

  const relatedBooks = (relatedRes?.data ?? [])
    .filter((book) => book._id !== productId)
    .slice(0, 4)
    .map(mapApiEBookToBook);

  const categoryTitle = ebook?.category?.name || "";

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      {ebookLoading ? (
        <ProductDetailSkeleton />
      ) : ebookError ? (
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-[120px] py-16">
          <div className="rounded-xl border border-red-100 bg-white px-6 py-8 text-center text-sm text-red-600">
            Unable to load this e-book right now.
          </div>
        </div>
      ) : !ebook ? (
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-[120px] py-16">
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-8 text-center text-sm text-slate-500">
            This e-book is not available.
          </div>
        </div>
      ) : (
        <EBookDetail ebook={ebook} categoryTitle={categoryTitle} />
      )}

      {relatedLoading ? (
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-[120px] py-12">
          <BookGridSkeleton />
        </div>
      ) : relatedError ? (
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-[120px] py-12">
          <div className="rounded-xl border border-red-100 bg-white px-6 py-5 text-sm text-red-600">
            Unable to load recommended e-books right now.
          </div>
        </div>
      ) : relatedBooks.length > 0 ? (
        <RelatedBooks
          books={relatedBooks}
          categorySlug={slug}
          currentBookId={productId}
          hrefBase="/e-books"
          viewAllHref={`/e-books/${slug}/all`}
          buttonLabel="Preview"
          showDescription
        />
      ) : null}

      <NewReleaseBanner />
    </div>
  );
}
