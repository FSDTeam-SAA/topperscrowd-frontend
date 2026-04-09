"use client";

import Image from "next/image";

interface CartItemProps {
  id: string;
  image: string;
  title: string;
  author: string;
  pages?: number;
  language: string;
  publisher: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

export default function CartItem({
  id,
  image,
  author,
  pages,
  language,
  publisher,
  price,
  quantity,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <div>
      <div className="flex gap-6">
        <div className="relative h-[140px] w-[120px] shrink-0">
          <Image
            src={image}
            alt={author}
            fill
            className="rounded object-cover"
          />
        </div>

        <div className="flex flex-1 justify-between">
          <div className="flex gap-6 text-sm text-slate-700">
            <div className="flex flex-col gap-3 font-medium text-slate-500">
              <span>Author</span>
              <span>Number of pages</span>
              <span>Language</span>
              <span>Publisher</span>
            </div>
            <div className="flex flex-col gap-3 text-slate-800">
              <span>{author}</span>
              <span>{pages || "N/A"}</span>
              <span>{language}</span>
              <span>{publisher}</span>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <span className="text-lg font-bold text-indigo-600">
              ${(price * quantity).toFixed(2)}
            </span>
            {onUpdateQuantity && (
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={() =>
                    onUpdateQuantity(id, Math.max(1, quantity - 1))
                  }
                  className="size-7 rounded border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(id, quantity + 1)}
                  className="size-7 rounded border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  +
                </button>
              </div>
            )}
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
