"use client";

import { use } from "react";
import NewReleaseBanner from "@/components/shared/NewReleaseBanner";
import ProductDetail from "@/features/category/components/ProductDetail";
import ListenerReviews from "@/features/category/components/ListenerReviews";
import RelatedBooks from "@/features/category/components/RelatedBooks";
import ProductDetailSkeleton from "@/components/shared/skeletons/ProductDetailSkeleton";
import BookGridSkeleton from "@/components/shared/skeletons/BookGridSkeleton";
import { useBook } from "@/features/book/hooks/useBooks";
import { useBooksByCategory } from "@/features/book/hooks/useBooks";
import { useReviewsByBook } from "@/features/review/hooks/useReviews";
import { mapApiBookToBook, mapApiReviewToReview } from "@/types/shared";

interface ProductDetailPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug, productId } = use(params);
  const { data: book, isLoading: bookLoading } = useBook(productId);
  const { data: reviewsRes } = useReviewsByBook(productId);
  const { data: relatedRes, isLoading: relatedLoading } = useBooksByCategory(
    slug,
    { limit: 5 },
  );

  const mappedBook = book ? mapApiBookToBook(book) : null;
  const reviews = (reviewsRes?.data ?? []).map(mapApiReviewToReview);
  const relatedBooks = (relatedRes?.data ?? [])
    .filter((b) => b._id !== productId)
    .slice(0, 4)
    .map(mapApiBookToBook);

  const categoryTitle =
    book?.genre && typeof book.genre === "object" ? book.genre.title : "";

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      {bookLoading || !mappedBook ? (
        <ProductDetailSkeleton />
      ) : (
        <ProductDetail
          book={mappedBook}
          bookId={productId}
          categoryTitle={categoryTitle}
          categorySlug={slug}
        />
      )}

      {reviews.length > 0 && <ListenerReviews reviews={reviews} />}

      {relatedLoading ? (
        <div className="mx-auto max-w-[1200px] px-[120px] py-12">
          <BookGridSkeleton />
        </div>
      ) : relatedBooks.length > 0 ? (
        <RelatedBooks
          books={relatedBooks}
          categorySlug={slug}
          currentBookId={productId}
        />
      ) : null}

      <NewReleaseBanner />
    </div>
  );
}
