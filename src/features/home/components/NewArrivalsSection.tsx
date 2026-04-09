import BookGrid from "@/components/shared/BookGrid";
import type { Book } from "../types";

interface NewArrivalsSectionProps {
  books: Book[];
}

export default function NewArrivalsSection({ books }: NewArrivalsSectionProps) {
  return (
    <div className="mx-auto container py-24">
      <BookGrid
        title="New Arrivals"
        subtitle="Fresh voices and new chapters in every genre."
        books={books}
        categorySlug="classic-literature"
        viewAllHref="/category"
        showPlayIcon
      />
    </div>
  );
}
