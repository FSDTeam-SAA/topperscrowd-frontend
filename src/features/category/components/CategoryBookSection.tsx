import BookGrid from "@/components/shared/BookGrid";
import type { CategoryWithBooks } from "../types";

interface CategoryBookSectionProps {
  category: CategoryWithBooks;
}

export default function CategoryBookSection({
  category,
}: CategoryBookSectionProps) {
  return (
    <BookGrid
      title={`${category.title} Audiobooks`}
      subtitle={`Enjoy all the ${category.title.toLowerCase()} books`}
      books={category.books.slice(0, 4)}
      categorySlug={category.slug}
      viewAllHref={`/category/${category.slug}/all`}
    />
  );
}
