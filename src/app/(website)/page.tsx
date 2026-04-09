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
    <div className="min-h-screen  ">
      <HeroSection />

      <section className="bg-slate-100 ">
        <div className=" px-6 py-16">
          <FeaturedSection books={featuredBooks} />
          <BrowseCategorySection categories={categories} />
          <NewArrivalsSection books={newArrivals} />
          <div className=" bg-[#fff8f5]">
            <FlashSaleSection countdownUnits={countdownUnits} />
          </div>
          <SpecialOfferBanner />
        </div>
      </section>
    </div>
  );
}
