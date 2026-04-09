import Image from "next/image";
import Link from "next/link";
import { Play, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingStars from "./RatingStars";
import type { Book } from "@/types/shared";

interface BookCardProps {
  book: Book;
  categorySlug?: string;
  showPlayIcon?: boolean;
  buttonLabel?: string;
  onRemove?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

export default function BookCard({
  book,
  categorySlug,
  showPlayIcon = false,
  buttonLabel = "Preview",
  onRemove,
  onAddToCart,
}: BookCardProps) {
  const href = categorySlug ? `/category/${categorySlug}/${book.id}` : "#";
  const isWishlist = !!onRemove;

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl">
      <Link
        href={href}
        className="group relative block h-64 w-full overflow-hidden"
      >
        <Image
          src={book.image}
          alt={book.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {isWishlist && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove(book.id);
            }}
            className="absolute right-3 top-3 rounded-full bg-white p-2 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
          >
            <Trash2 className="size-5 text-red-600" />
          </button>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-4 rounded-b-2xl border border-t-0 border-[#e2e8f0] bg-white p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Link href={href}>
              <h3 className="font-serif text-base font-bold text-slate-900 transition-colors hover:text-indigo-600">
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
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-indigo-600">
            {book.price}
          </span>
          {onAddToCart ? (
            <Button
              variant="outline"
              className="rounded-lg border-indigo-600 px-5 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
              onClick={() => onAddToCart(book.id)}
            >
              Add to Cart
            </Button>
          ) : buttonLabel === "Add to Cart" ? (
            <Button
              variant="outline"
              className="rounded-lg border-indigo-600 px-5 py-2.5 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
            >
              {buttonLabel}
            </Button>
          ) : (
            <Button
              asChild
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm text-white hover:bg-indigo-700"
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
