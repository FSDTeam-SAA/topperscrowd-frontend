import BookGrid from "@/components/shared/BookGrid";
import type { Book } from "@/types/shared";

interface RelatedBooksProps {
  books: Book[];
  categorySlug: string;
  currentBookId: string;
}

export default function RelatedBooks({
  books,
  categorySlug,
  currentBookId,
}: RelatedBooksProps) {
  const related = books.filter((b) => b.id !== currentBookId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mx-auto py-12">
      <BookGrid
        title="Recommended for You"
        subtitle=""
        books={related}
        categorySlug={categorySlug}
        viewAllHref={`/category/${categorySlug}/all`}
        buttonLabel="Add to Cart"
      />
    </div>
  );
}
