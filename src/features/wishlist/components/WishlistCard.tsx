import BookCard from "@/components/shared/BookCard";
import type { Book } from "@/types/shared";

interface WishlistCardProps {
  book: Book;
  categorySlug?: string;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export default function WishlistCard({
  book,
  categorySlug,
  onRemove,
  onAddToCart,
}: WishlistCardProps) {
  return (
    <BookCard
      book={book}
      categorySlug={categorySlug}
      onRemove={onRemove}
      onAddToCart={onAddToCart}
    />
  );
}
