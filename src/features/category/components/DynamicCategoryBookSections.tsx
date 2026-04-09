"use client";

import BookGrid from "@/components/shared/BookGrid";
import BookGridSkeleton from "@/components/shared/skeletons/BookGridSkeleton";
import { useBooksByCategory } from "@/features/book/hooks/useBooks";
import type { BookCategory } from "@/types/shared";
import { mapApiBookToBook } from "@/types/shared";

function CategorySection({ category }: { category: BookCategory }) {
  const { data: res, isLoading } = useBooksByCategory(category._id, {
    limit: 4,
  });
  const books = (res?.data ?? []).map(mapApiBookToBook);

  if (isLoading) return <BookGridSkeleton />;
  if (books.length === 0) return null;

  return (
    <BookGrid
      title={`${category.title.trim()} Audiobooks`}
      subtitle={`Enjoy all the ${category.title.trim().toLowerCase()} books`}
      books={books}
      categorySlug={category._id}
      viewAllHref={`/category/${category._id}/all`}
    />
  );
}

interface DynamicCategoryBookSectionsProps {
  categories: BookCategory[];
}

export default function DynamicCategoryBookSections({
  categories,
}: DynamicCategoryBookSectionsProps) {
  return (
    <>
      {categories.map((cat) => (
        <CategorySection key={cat._id} category={cat} />
      ))}
    </>
  );
}
