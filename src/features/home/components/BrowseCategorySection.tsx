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
    <div className="relative mx-auto container mx-auto py-12 md:py-24 px-4 md:px-0">
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

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Large card */}
          {categories[0] && (
            <CategoryCard
              category={categories[0]}
              className="h-[250px] sm:h-[300px] lg:h-[376px] w-full lg:w-[506px] bg-neutral-900"
            />
          )}

          {/* Right column */}
          <div className="flex flex-1 flex-col gap-3">
            {categories[1] && (
              <CategoryCard
                category={categories[1]}
                className="h-[168px] w-full bg-neutral-900"
              />
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              {categories[2] && (
                <CategoryCard
                  category={categories[2]}
                  className="h-[196px] w-full sm:w-1/2 lg:w-[330px] bg-neutral-900"
                />
              )}
              {categories[3] && (
                <CategoryCard
                  category={categories[3]}
                  className="h-[196px] w-full sm:w-1/2 lg:w-[330px] bg-neutral-900"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
