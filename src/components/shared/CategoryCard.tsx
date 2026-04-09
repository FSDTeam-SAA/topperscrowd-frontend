import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Category } from "@/types/shared";

interface CategoryCardProps {
  category: Category;
  className?: string;
  buttonLabel?: string;
}

export default function CategoryCard({
  category,
  className = "",
  buttonLabel = "Preview",
}: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={`relative block overflow-hidden  rounded-xl group ${className}`}
    >
      <div className="absolute inset-0">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover opacity-40 transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
      </div>
      <div className="relative flex h-full flex-col justify-end gap-3 p-5">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-serif font-bold text-xl text-white">
            {category.title}
          </h3>
          {category.subtitle && (
            <p className="text-sm text-slate-100">{category.subtitle}</p>
          )}
        </div>
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 rounded text-sm text-[#fff8f5]">
          {buttonLabel}
        </Button>
      </div>
    </Link>
  );
}
