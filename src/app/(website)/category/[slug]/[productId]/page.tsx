import { notFound } from "next/navigation";
import NewReleaseBanner from "@/components/shared/NewReleaseBanner";
import ProductDetail from "@/features/category/components/ProductDetail";
import ListenerReviews from "@/features/category/components/ListenerReviews";
import RelatedBooks from "@/features/category/components/RelatedBooks";
import { getBookById, productReviews } from "@/features/category/data";

interface ProductDetailPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug, productId } = await params;
  const result = getBookById(slug, productId);

  if (!result) notFound();

  const { book, category } = result;

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <ProductDetail
        book={book}
        categoryTitle={category.title}
        categorySlug={category.slug}
      />
      <ListenerReviews reviews={productReviews} />
      <RelatedBooks
        books={category.books}
        categorySlug={category.slug}
        currentBookId={book.id}
      />
      <NewReleaseBanner />
    </div>
  );
}
