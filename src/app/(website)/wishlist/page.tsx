"use client";

import WishlistCard from "@/features/wishlist/components/WishlistCard";
import BookCardSkeleton from "@/components/shared/skeletons/BookCardSkeleton";
import {
  useFavorites,
  useToggleFavorite,
} from "@/features/favorites/hooks/useFavorites";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import { mapApiBookToBook } from "@/types/shared";

export default function WishlistPage() {
  const { data: favRes, isLoading } = useFavorites();
  const toggleFavorite = useToggleFavorite();
  const addToCart = useAddToCart();

  const books = (favRes?.data ?? []).map(mapApiBookToBook);

  const handleRemoveItem = (id: string) => {
    toggleFavorite.mutate(id);
  };

  const handleAddToCart = (id: string) => {
    addToCart.mutate([{ bookId: id, quantity: 1 }]);
  };

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="mx-auto container px-6">
        <h1 className="mb-12 font-serif text-[32px] font-bold text-slate-900">
          Wishlist
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {books.map((book) => (
              <WishlistCard
                key={book.id}
                book={book}
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
