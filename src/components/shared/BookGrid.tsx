import BookCard from "./BookCard";
import SectionHeader from "./SectionHeader";
import type { Book } from "@/types/shared";

interface BookGridProps {
  title: string;
  subtitle: string;
  books: Book[];
  categorySlug?: string;
  hrefBase?: string;
  viewAllHref?: string;
  showPlayIcon?: boolean;
  buttonLabel?: string;
  showDescription?: boolean;
  onAddToCart?: (id: string) => void;
}

export default function BookGrid({
  title,
  subtitle,
  books,
  categorySlug,
  hrefBase = "/category",
  viewAllHref,
  showPlayIcon = false,
  buttonLabel,
  showDescription = false,
  onAddToCart,
}: BookGridProps) {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        viewAllHref={viewAllHref}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            categorySlug={categorySlug}
            hrefBase={hrefBase}
            showPlayIcon={showPlayIcon}
            buttonLabel={buttonLabel}
            showDescription={showDescription}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
