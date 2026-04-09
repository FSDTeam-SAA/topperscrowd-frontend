import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageHeroBanner from "@/components/shared/PageHeroBanner";
import BookCard from "@/components/shared/BookCard";
import { getCategoryBySlug } from "@/features/category/data";

interface CategoryAllPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryAllPage({
  params,
}: CategoryAllPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <PageHeroBanner
        title={`${category.title} Audiobooks`}
        subtitle={`Browse all ${category.title.toLowerCase()} audiobooks`}
        backgroundImage={category.image}
      />

      <div className="mx-auto max-w-[1200px] py-16">
        <div className="mb-8">
          <h2 className="font-serif text-[32px] font-bold leading-[1.2] text-slate-900">
            All {category.title} Audiobooks
          </h2>
          <p className="mt-2 text-base text-slate-500">
            {category.books.length} titles available
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {category.books.map((book) => (
            <BookCard key={book.id} book={book} categorySlug={category.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}
