"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types/shared";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import { checkout } from "@/features/order/api/order.api";
import { toast } from "sonner";
import { useState } from "react";

interface ProductDetailProps {
  book: Book;
  bookId: string;
  categoryTitle: string;
  categorySlug: string;
}

export default function ProductDetail({
  book,
  bookId,
  categoryTitle,
  categorySlug,
}: ProductDetailProps) {
  const addToCart = useAddToCart();
  const [buyingNow, setBuyingNow] = useState(false);

  const handleAddToCart = () => {
    addToCart.mutate([{ bookId, quantity: 1 }]);
  };

  const handleBuyNow = async () => {
    setBuyingNow(true);
    try {
      const res = await checkout({ orderType: "buy-now", bookId, quantity: 1 });
      if (res.data?.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      }
    } catch (err) {
      // toast.error(err instanceof Error ? err.message : "Checkout failed");
      toast.error("You have already purchased one or more of these books");
    } finally {
      setBuyingNow(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-[120px] pt-6 md:pt-10">
      {/* Product Hero */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="relative h-[280px] w-full md:h-[340px] md:w-[280px] shrink-0 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={book.image}
            alt={book.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1 pt-2">
          <h1 className="font-serif text-2xl md:text-[36px] font-bold leading-[1.2] uppercase text-slate-900">
            {book.title}
          </h1>
          <p className="text-base text-slate-500">
            Author: <span className="italic">{book.author}</span>
          </p>

          <p className="mt-2 text-2xl font-bold text-indigo-600">
            {book.price}
          </p>

          <div className="mt-1 flex items-center gap-2">
            <Star className="size-5 fill-amber-400 text-amber-400" />
            <span className="text-sm text-slate-900">
              {book.rating.toFixed(1)}
            </span>
            <span className="text-sm text-slate-500">
              ({book.ratingCount || 0} Ratings)
            </span>
          </div>

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
                  <td className="py-0.5 text-slate-500">
                    {book.pages || "N/A"}
                  </td>
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
                    {book.publisher || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <Button
              onClick={handleBuyNow}
              disabled={buyingNow}
              className="bg-indigo-600 hover:bg-indigo-700 rounded px-6 py-2.5 text-sm font-medium text-white"
            >
              {buyingNow ? "Processing..." : "Buy Now"}
            </Button>
            <Button
              variant="outline"
              onClick={handleAddToCart}
              disabled={addToCart.isPending}
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded px-6 py-2.5 text-sm font-medium"
            >
              {addToCart.isPending ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </div>
      </div>

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
