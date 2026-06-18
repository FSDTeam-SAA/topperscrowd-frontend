"use client";

import BookGrid from "@/components/shared/BookGrid";
import BookGridSkeleton from "@/components/shared/skeletons/BookGridSkeleton";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import { useEBooks } from "@/features/e-book/hooks/useEBooks";
import type { EBookCategory } from "@/features/e-book-category/types/e-book-category.types";
import { mapApiEBookToBook } from "@/types/shared";

function EBookCategorySection({ category }: { category: EBookCategory }) {
  const addToCart = useAddToCart();
  const {
    data: res,
    isLoading,
    isError,
  } = useEBooks({
    categoryId: category._id,
    limit: 4,
  });
  const books = (res?.data ?? []).map(mapApiEBookToBook);
  const title = category.name.trim();

  if (isLoading) return <BookGridSkeleton />;
  if (isError) {
    return (
      <div className="rounded-xl border border-red-100 bg-white px-6 py-5 text-sm text-red-600">
        Unable to load {title} e-books right now.
      </div>
    );
  }
  if (books.length === 0) return null;

  return (
    <BookGrid
      title={`${title} E-Books`}
      subtitle={`Enjoy all the ${title.toLowerCase()} e-books`}
      books={books}
      categorySlug={category._id}
      hrefBase="/e-books"
      viewAllHref={`/e-books/${category._id}/all`}
      buttonLabel={addToCart.isPending ? "Adding..." : "Add to Cart"}
      showDescription
      onAddToCart={(id) => addToCart.mutate([{ ebookId: id, quantity: 1 }])}
    />
  );
}

interface DynamicEBookCategorySectionsProps {
  categories: EBookCategory[];
}

export default function DynamicEBookCategorySections({
  categories,
}: DynamicEBookCategorySectionsProps) {
  return (
    <>
      {categories.map((category) => (
        <EBookCategorySection key={category._id} category={category} />
      ))}
    </>
  );
}
