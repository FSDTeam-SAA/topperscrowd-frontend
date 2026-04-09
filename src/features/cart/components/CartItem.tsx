"use client";

import Image from "next/image";

interface CartItemProps {
  id: string;
  image: string;
  title: string;
  author: string;
  pages: number;
  language: string;
  publisher: string;
  price: number;
  onRemove: (id: string) => void;
}

export default function CartItem({
  id,
  image,
  author,
  pages,
  language,
  publisher,
  price,
  onRemove,
}: CartItemProps) {
  return (
    <div>
      <div className="flex gap-6">
        {/* Book Image */}
        <div className="relative h-[140px] w-[120px] shrink-0">
          <Image
            src={image}
            alt={author}
            fill
            className="rounded object-cover"
          />
        </div>

        {/* Book Details & Price Container */}
        <div className="flex flex-1 justify-between">
          {/* Left: Book Details Table */}
          <div className="flex gap-6 text-sm text-slate-700">
            {/* Labels Column */}
            <div className="flex flex-col gap-3 font-medium text-slate-500">
              <span>Author</span>
              <span>Number of pages</span>
              <span>Language</span>
              <span>Publisher</span>
            </div>
            {/* Values Column */}
            <div className="flex flex-col gap-3 text-slate-800">
              <span>{author}</span>
              <span>{pages}</span>
              <span>{language}</span>
              <span>{publisher}</span>
            </div>
          </div>

          {/* Right: Price and Remove Button */}
          <div className="flex flex-col items-end justify-between">
            <span className="text-lg font-bold text-indigo-600">
              ${price.toFixed(2)}
            </span>
            <button
              onClick={() => onRemove(id)}
              className="rounded border border-slate-300 bg-slate-50 px-8 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-slate-100"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 h-px bg-[#d9d9d9]" />
    </div>
  );
}
