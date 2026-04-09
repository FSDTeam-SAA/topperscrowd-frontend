import BookCard from "./BookCard";
import SectionHeader from "./SectionHeader";
import type { Book } from "@/types/shared";

interface BookGridProps {
  title: string;
  subtitle: string;
  books: Book[];
  categorySlug?: string;
  viewAllHref?: string;
  showPlayIcon?: boolean;
  buttonLabel?: string;
}

export default function BookGrid({
  title,
  subtitle,
  books,
  categorySlug,
  viewAllHref,
  showPlayIcon = false,
  buttonLabel,
}: BookGridProps) {
  return (
    <div className="flex flex-col gap-5">
      <SectionHeader
        title={title}
        subtitle={subtitle}
        viewAllHref={viewAllHref}
      />
      <div className="flex gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            categorySlug={categorySlug}
            showPlayIcon={showPlayIcon}
            buttonLabel={buttonLabel}
          />
        ))}
      </div>
    </div>
  );
}
