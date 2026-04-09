"use client";

import WishlistCard from "@/features/wishlist/components/WishlistCard";
import { useState } from "react";
import type { Book } from "@/types/shared";

const mockWishlistItems: Book[] = [
  {
    id: "1",
    image: "/images/home/book1.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: "$14.99",
  },
  {
    id: "2",
    image: "/images/home/book2.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: "$14.99",
  },
  {
    id: "3",
    image: "/images/home/book3.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: "$14.99",
  },
  {
    id: "4",
    image: "/images/home/book4.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: "$14.99",
  },
  {
    id: "5",
    image: "/images/home/book1.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: "$14.99",
  },
  {
    id: "6",
    image: "/images/home/book2.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: "$14.99",
  },
  {
    id: "7",
    image: "/images/home/book3.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: "$14.99",
  },
  {
    id: "8",
    image: "/images/home/book4.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: "$14.99",
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const handleRemoveItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    alert(`Item ${id} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="mx-auto container px-6">
        <h1 className="mb-12 font-serif text-[32px] font-bold text-slate-900">
          Wishlist
        </h1>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <WishlistCard
                key={item.id}
                book={item}
                onRemove={handleRemoveItem}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-xl text-slate-600">Your wishlist is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}
