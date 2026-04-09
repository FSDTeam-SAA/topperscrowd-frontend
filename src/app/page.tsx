import HeroSection from "@/features/home/components/HeroSection";
import FeaturedSection from "@/features/home/components/FeaturedSection";
import BrowseCategorySection from "@/features/home/components/BrowseCategorySection";
import NewArrivalsSection from "@/features/home/components/NewArrivalsSection";
import FlashSaleSection from "@/features/home/components/FlashSaleSection";
import SpecialOfferBanner from "@/features/home/components/SpecialOfferBanner";
import {
  featuredBooks,
  newArrivals,
  categories,
  countdownUnits,
} from "@/features/home/data";

export default function Home() {
  return (
    <div className="min-h-screen  container mx-auto px-6">
      <HeroSection />

      <section className="bg-slate-100 ">
        <FeaturedSection books={featuredBooks} />
        <BrowseCategorySection categories={categories} />
        <NewArrivalsSection books={newArrivals} />
        <FlashSaleSection countdownUnits={countdownUnits} />
        <SpecialOfferBanner />
      </section>
    </div>
  );
}
