import Image from "next/image";
import CategoryCard from "@/components/shared/CategoryCard";
import SectionHeader from "@/components/shared/SectionHeader";
import type { Category } from "../types";

interface BrowseCategorySectionProps {
  categories: Category[];
}

export default function BrowseCategorySection({
  categories,
}: BrowseCategorySectionProps) {
  return (
    <div className="relative mx-auto max-w-[1440px] px-[120px] py-24">
      {/* Blurred background */}
      <div className="absolute inset-0 overflow-hidden opacity-20 blur-sm">
        <Image
          src="/images/home/browse-bg.png"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative flex flex-col gap-10">
        <SectionHeader
          title="Browse by Category"
          subtitle="Handpicked selections from our premium collection"
        />

        <div className="flex gap-4">
          {/* Large card */}
          <CategoryCard
            category={categories[0]}
            className="h-[376px] w-[506px] bg-neutral-900"
          />

          {/* Right column */}
          <div className="flex flex-1 flex-col gap-3">
            {/* Classic Literature — wide */}
            <CategoryCard
              category={categories[1]}
              className="h-[168px] w-full bg-neutral-900"
            />

            {/* Two smaller cards */}
            <div className="flex gap-4">
              <CategoryCard
                category={categories[2]}
                className="h-[196px] w-[330px] bg-neutral-900"
              />
              <CategoryCard
                category={categories[3]}
                className="h-[196px] w-[330px] bg-neutral-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
