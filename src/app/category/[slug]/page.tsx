import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageHeroBanner from "@/components/shared/PageHeroBanner";
import CategoryBookSection from "@/features/category/components/CategoryBookSection";
import CategoryCarousel from "@/features/category/components/CategoryCarousel";
import {
  categoriesWithBooks,
  getCategoryBySlug,
} from "@/features/category/data";

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <Navbar />
      <PageHeroBanner
        title={category.title}
        subtitle={category.subtitle}
        backgroundImage={category.image}
      />

      <div className="mx-auto max-w-[1200px] py-16 flex flex-col gap-16">
        <CategoryCarousel categories={categoriesWithBooks} />
        <CategoryBookSection category={category} />
      </div>

      <Footer />
    </div>
  );
}
