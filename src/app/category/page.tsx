import PageHeroBanner from "@/components/shared/PageHeroBanner";
import CategoryCarousel from "@/features/category/components/CategoryCarousel";
import CategoryBookSection from "@/features/category/components/CategoryBookSection";
import { categoriesWithBooks } from "@/features/category/data";

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <PageHeroBanner
        title="Category Details"
        subtitle="Experience everything like never before-through every haunting sound."
        backgroundImage="/images/home/category-horror.png"
      />

      <div className="mx-auto max-w-[1200px] py-16 flex flex-col gap-16">
        <CategoryCarousel categories={categoriesWithBooks} />

        {categoriesWithBooks.map((category) => (
          <CategoryBookSection key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
