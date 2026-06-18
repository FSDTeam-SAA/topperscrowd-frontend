"use client";

import HeroSection from "@/features/home/components/HeroSection";
import FeaturedSection from "@/features/home/components/FeaturedSection";
import BrowseCategorySection from "@/features/home/components/BrowseCategorySection";
import NewArrivalsSection from "@/features/home/components/NewArrivalsSection";
import FlashSaleSection from "@/features/home/components/FlashSaleSection";
import SpecialOfferBanner from "@/features/home/components/SpecialOfferBanner";
import FeaturedEBooksSection from "@/features/home/components/FeaturedEBooksSection";
import BookGridSkeleton from "@/components/shared/skeletons/BookGridSkeleton";
import { countdownUnits } from "@/features/home/data";
import { useBooks } from "@/features/book/hooks/useBooks";
import { useBookCategories } from "@/features/book-category/hooks/useBookCategories";
import {
  mapApiBookToBook,
  mapApiCategoryToCategory,
  mapApiEBookCategoryToCategory,
  mapApiEBookToBook,
} from "@/types/shared";
import { useEBooks } from "@/features/e-book/hooks/useEBooks";
import { useEBookCategories } from "@/features/e-book-category/hooks/useEBookCategories";

export default function Home() {
  const { data: booksRes, isLoading: booksLoading } = useBooks({ limit: 8 });
  const { data: categories, isLoading: catsLoading } = useBookCategories();
  const { data: ebooksRes, isLoading: ebooksLoading } = useEBooks({ limit: 4 });
  const { data: ebookCategories, isLoading: ebookCatsLoading } =
    useEBookCategories();

  const allBooks = booksRes?.data?.map(mapApiBookToBook) ?? [];
  const featuredBooks = allBooks.slice(0, 4);
  const newArrivals = allBooks.slice(4, 8);
  const featuredEBooks = ebooksRes?.data?.map(mapApiEBookToBook) ?? [];

  const bookCategories = (categories ?? []).map(mapApiCategoryToCategory);
  const mappedEBookCategories = (ebookCategories ?? []).map(
    mapApiEBookCategoryToCategory,
  );
  const mappedCategories = [
    ...bookCategories.slice(0, 2),
    ...mappedEBookCategories.slice(0, 2),
    ...bookCategories.slice(2),
    ...mappedEBookCategories.slice(2),
  ].slice(0, 4);

  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="bg-slate-100">
        <div className="px-6 py-16">
          {booksLoading ? (
            <div className="mx-auto container">
              <BookGridSkeleton />
            </div>
          ) : (
            <FeaturedSection books={featuredBooks} />
          )}

          {ebooksLoading ? (
            <div className="mx-auto container">
              <BookGridSkeleton />
            </div>
          ) : (
            <FeaturedEBooksSection books={featuredEBooks} />
          )}

          {catsLoading || ebookCatsLoading ? (
            <div className="mx-auto container py-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-48 rounded-2xl bg-slate-200" />
                ))}
              </div>
            </div>
          ) : (
            <BrowseCategorySection categories={mappedCategories} />
          )}

          {booksLoading ? (
            <div className="mx-auto container py-24">
              <BookGridSkeleton />
            </div>
          ) : (
            <NewArrivalsSection books={newArrivals} />
          )}

          <div className="bg-[#fff8f5]">
            <FlashSaleSection countdownUnits={countdownUnits} />
          </div>
          <SpecialOfferBanner />
        </div>
      </section>
    </div>
  );
}
