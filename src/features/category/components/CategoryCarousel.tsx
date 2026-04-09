import CategoryCard from "@/components/shared/CategoryCard";
import PaginationDots from "@/components/shared/PaginationDots";
import type { Category } from "@/types/shared";

interface CategoryCarouselProps {
  categories: Category[];
}

export default function CategoryCarousel({
  categories,
}: CategoryCarouselProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full">
        <div className="flex flex-col gap-2 mb-6">
          <h2 className="font-serif text-[32px] font-bold leading-[1.2] text-slate-900">
            Browse All Categories
          </h2>
          <p className="text-base text-slate-500">See all categories</p>
        </div>
        <div className="flex gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              className="h-[376px] w-[282px] bg-neutral-900"
              buttonLabel="View Details"
            />
          ))}
        </div>
      </div>
      <PaginationDots total={5} active={1} />
    </div>
  );
}
