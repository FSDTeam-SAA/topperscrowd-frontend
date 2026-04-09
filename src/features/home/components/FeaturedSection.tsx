import BookGrid from "@/components/shared/BookGrid";
import type { Book } from "../types";

interface FeaturedSectionProps {
  books: Book[];
}

export default function FeaturedSection({ books }: FeaturedSectionProps) {
  return (
    <div className="mx-auto max-w-[1440px] px-[120px] pt-16 pb-20">
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
