"use client";

import Image from "next/image";
import { Star, Trash2 } from "lucide-react";

export default function WishlistTab() {
  const wishlistItems = [
    {
      id: "1",
      title: "The Power of Habit",
      author: "Charles Duhigg",
      price: "$14.99",
      rating: 5,
      image: "/images/home/book1.png",
    },
    {
      id: "2",
      title: "Atomic Habits",
      author: "James Clear",
      price: "$18.99",
      rating: 4.5,
      image: "/images/home/book2.png",
    },
    {
      id: "3",
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      price: "$16.99",
      rating: 5,
      image: "/images/home/book3.png",
    },
    {
      id: "4",
      title: "The Midnight Library",
      author: "Matt Haig",
      price: "$15.99",
      rating: 4.8,
      image: "/images/home/book4.png",
    },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-slate-900">My Wishlist</h2>

      <div className="grid grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-lg transition-shadow"
          >
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
              <button className="absolute right-2 top-2 rounded-full bg-white p-2 shadow hover:bg-gray-100">
                <Trash2 className="h-5 w-5 text-red-600" />
              </button>
            </div>

            <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mb-3 text-xs text-slate-600">{item.author}</p>

            <div className="mb-3 flex items-center gap-1">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(item.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-600">
                {item.rating.toFixed(1)}
              </span>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-bold text-indigo-600">{item.price}</p>
            </div>

            <button className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
