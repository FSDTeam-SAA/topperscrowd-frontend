import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingStars from "./RatingStars";
import type { Book } from "@/types/shared";

interface BookCardProps {
  book: Book;
  categorySlug?: string;
  showPlayIcon?: boolean;
  buttonLabel?: string;
}

export default function BookCard({
  book,
  categorySlug,
  showPlayIcon = false,
  buttonLabel = "Preview",
}: BookCardProps) {
  const href = categorySlug ? `/category/${categorySlug}/${book.id}` : "#";

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl">
      <Link href={href} className="relative block h-64 w-full overflow-hidden">
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </Link>
      <div className="flex flex-col gap-4 border border-t-0 border-[#e2e8f0] bg-white p-6 rounded-b-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Link href={href}>
              <h3 className="font-serif font-bold text-base text-slate-900 hover:text-indigo-600 transition-colors">
                {book.title}
              </h3>
            </Link>
            <p className="text-xs text-slate-500">{book.author}</p>
          </div>
          <div className="flex items-center gap-4">
            <RatingStars rating={book.rating} />
            <span className="text-base font-semibold text-slate-500">
              ({book.rating.toFixed(1)})
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            {book.price}
          </span>
          {buttonLabel === "Add to Cart" ? (
            <Button
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-lg px-5 py-2.5 text-sm font-medium"
            >
              {buttonLabel}
            </Button>
          ) : (
            <Button
              asChild
              className="bg-indigo-600 hover:bg-indigo-700 rounded-lg px-6 py-3 text-sm text-white"
            >
              <Link href={href}>
                {showPlayIcon && <Play className="size-5 fill-white" />}
                {buttonLabel}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
