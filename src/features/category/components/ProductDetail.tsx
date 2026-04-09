import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/shared";

interface ProductDetailProps {
  book: Book;
  categoryTitle: string;
  categorySlug: string;
}

export default function ProductDetail({
  book,
  categoryTitle,
  categorySlug,
}: ProductDetailProps) {
  return (
    <div className="mx-auto max-w-[1200px] px-[120px] pt-10">
      {/* Product Hero */}
      <div className="flex gap-12 items-start">
        {/* Left — Book cover */}
        <div className="relative h-[340px] w-[280px] shrink-0 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Right — Info */}
        <div className="flex flex-1 flex-col gap-1 pt-2">
          <h1 className="font-serif text-[36px] font-bold leading-[1.2] uppercase text-slate-900">
            {book.title}
          </h1>
          <p className="text-base text-slate-500">
            Author: <span className="italic">{book.author}</span>
          </p>

          {/* Price */}
          <p className="mt-2 text-2xl font-bold text-indigo-600">
            {book.price}
          </p>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-2">
            <Star className="size-5 fill-amber-400 text-amber-400" />
            <span className="text-sm text-slate-900">
              {book.rating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-500">
              ({book.ratingCount || 456} Ratings)
            </span>
          </div>

          {/* Highlights table */}
          <div className="mt-4 flex flex-col gap-1">
            <p className="text-sm font-semibold text-slate-900">Highlights</p>
            <table className="text-sm text-slate-600">
              <tbody>
                <tr>
                  <td className="pr-12 py-0.5">Author</td>
                  <td className="py-0.5 text-slate-500">{book.author}</td>
                </tr>
                <tr>
                  <td className="pr-12 py-0.5">Number of pages</td>
                  <td className="py-0.5 text-slate-500">{book.pages || 196}</td>
                </tr>
                <tr>
                  <td className="pr-12 py-0.5">Language</td>
                  <td className="py-0.5 text-slate-500">
                    {book.language || "English"}
                  </td>
                </tr>
                <tr>
                  <td className="pr-12 py-0.5">Publisher</td>
                  <td className="py-0.5 text-slate-500">
                    {book.publisher || "University Press"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action buttons */}
          <div className="mt-5 flex items-center gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded px-6 py-2.5 text-sm font-medium text-white">
              Buy Now
            </Button>
            <Button
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded px-6 py-2.5 text-sm font-medium"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12">
        <h2 className="font-serif text-[28px] font-bold leading-[1.2] text-slate-900 mb-4">
          Description
        </h2>
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-slate-600">
          {(book.description || "").split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
