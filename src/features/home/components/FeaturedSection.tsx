import BookGrid from "@/components/shared/BookGrid";
import type { Book } from "../types";

interface FeaturedSectionProps {
  books: Book[];
}

export default function FeaturedSection({ books }: FeaturedSectionProps) {
  return (
    <div className="pt-16 pb-20 mx-auto container">
      <BookGrid
        title="Featured Audiobooks"
        subtitle="Handpicked selections from our premium collection"
        books={books}
        categorySlug="sci-fi-cyberpunk"
        viewAllHref="/category"
      />
    </div>
  );
}
