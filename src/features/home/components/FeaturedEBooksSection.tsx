"use client";

import BookGrid from "@/components/shared/BookGrid";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import type { Book } from "../types";

interface FeaturedEBooksSectionProps {
  books: Book[];
}

export default function FeaturedEBooksSection({
  books,
}: FeaturedEBooksSectionProps) {
  const addToCart = useAddToCart();

  if (books.length === 0) return null;

  return (
    <div className="pt-16 pb-20 mx-auto container">
      <BookGrid
        title="Featured E-Books"
        subtitle="Handpicked digital reads from our premium collection"
        books={books}
        hrefBase="/e-books"
        viewAllHref="/e-books"
        buttonLabel={addToCart.isPending ? "Adding..." : "Add to Cart"}
        showDescription
        onAddToCart={(id) => addToCart.mutate([{ ebookId: id, quantity: 1 }])}
      />
    </div>
  );
}
