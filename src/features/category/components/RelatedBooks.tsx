import BookGrid from "@/components/shared/BookGrid";
import type { Book } from "@/types/shared";

interface RelatedBooksProps {
  books: Book[];
  categorySlug: string;
  currentBookId: string;
  hrefBase?: string;
  viewAllHref?: string;
  buttonLabel?: string;
  showDescription?: boolean;
}

export default function RelatedBooks({
  books,
  categorySlug,
  currentBookId,
  hrefBase = "/category",
  viewAllHref,
  buttonLabel = "Add to Cart",
  showDescription = false,
}: RelatedBooksProps) {
  const related = books.filter((b) => b.id !== currentBookId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mx-auto container py-12">
      <BookGrid
        title="Recommended for You"
        subtitle=""
        books={related}
        categorySlug={categorySlug}
        hrefBase={hrefBase}
        viewAllHref={viewAllHref ?? `${hrefBase}/${categorySlug}/all`}
        buttonLabel={buttonLabel}
        showDescription={showDescription}
      />
    </div>
  );
}
