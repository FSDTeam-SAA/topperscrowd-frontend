"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import WishlistCard from "@/features/wishlist/components/WishlistCard";
import { useState } from "react";

// Mock data - Replace with actual data from API/Redux/Context
const mockWishlistItems = [
  {
    id: "1",
    image: "/images/home/book1.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: 14.99,
  },
  {
    id: "2",
    image: "/images/home/book2.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: 14.99,
  },
  {
    id: "3",
    image: "/images/home/book3.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: 14.99,
  },
  {
    id: "4",
    image: "/images/home/book4.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: 14.99,
  },
  {
    id: "5",
    image: "/images/home/book5.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: 14.99,
  },
  {
    id: "6",
    image: "/images/home/book6.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: 14.99,
  },
  {
    id: "7",
    image: "/images/home/book7.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: 14.99,
  },
  {
    id: "8",
    image: "/images/home/book8.png",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    rating: 5.0,
    price: 14.99,
  },
];

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const handleRemoveItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (id: string) => {
    // TODO: Implement add to cart logic
    alert(`Item ${id} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#fff8f5] flex flex-col ">
      {/* Main Content */}
      <div className="flex-1 py-16 container mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-[32px] font-bold text-slate-900">Wishlist</h1>
        </div>

        {/* Wishlist Grid */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <WishlistCard
                key={item.id}
                {...item}
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
