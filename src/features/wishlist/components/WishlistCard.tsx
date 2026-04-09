"use client";

import Image from "next/image";
import { Star, Trash2 } from "lucide-react";

interface WishlistCardProps {
  id: string;
  image: string;
  title: string;
  author: string;
  rating: number;
  price: number;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export default function WishlistCard({
  id,
  image,
  title,
  author,
  rating,
  price,
  onRemove,
  onAddToCart,
}: WishlistCardProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Book Image Container */}
      <div className="group relative h-[180px] w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Remove Button */}
        <button
          onClick={() => onRemove(id)}
          className="absolute right-3 top-3 rounded-full bg-white p-2 opacity-0 shadow-md transition-opacity group-hover:opacity-100"
        >
          <Trash2 className="h-5 w-5 text-red-600" />
        </button>
      </div>

      {/* Book Information */}
      <div className="flex flex-col gap-2">
        {/* Title and Author */}
        <div className="gap-0.5 flex flex-col">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
            {title}
          </h3>
          <p className="text-xs text-slate-600">{author}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-600">({rating.toFixed(1)})</span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-indigo-600">${price.toFixed(2)}</p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => onAddToCart(id)}
        className="w-full rounded bg-indigo-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
