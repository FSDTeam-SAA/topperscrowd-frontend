"use client";

import {
  useCart,
  useRemoveCartItem,
  useUpdateCartQuantity,
} from "@/features/cart/hooks/useCart";
import { checkout } from "@/features/order/api/order.api";
import { toast } from "sonner";
import { useState } from "react";
import type { CartMutationItem } from "@/features/cart/api/cart.api";
import CartItemSkeleton from "@/components/shared/skeletons/CartItemSkeleton";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const removeItem = useRemoveCartItem();
  const updateQuantity = useUpdateCartQuantity();
  const [purchasing, setPurchasing] = useState(false);

  const items = cart?.items ?? [];
  const cartItems = items
    .map((item) => {
      if (item.book) {
        return {
          id: item.book._id,
          type: "book" as const,
          image: item.book.image?.secure_url || "/images/home/book1.png",
          title: item.book.title,
          author: item.book.author,
          language: item.book.language,
          publisher: item.book.publisher,
          price: item.book.price,
          quantity: item.quantity,
        };
      }

      if (item.ebook) {
        return {
          id: item.ebook._id,
          type: "ebook" as const,
          image: item.ebook.coverImage?.url || "/images/home/book1.png",
          title: item.ebook.title,
          author: item.ebook.author,
          language: item.ebook.formatType || "E-Book",
          publisher: item.ebook.category?.name || "E-Book",
          price: item.ebook.price,
          quantity: item.quantity,
        };
      }

      return null;
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const subtotal = items.reduce(
    (sum, item) =>
      sum + (item.book?.price ?? item.ebook?.price ?? 0) * item.quantity,
    0,
  );
  const vat = Number((subtotal * 0.15).toFixed(2));
  const discount = 0;

  const handleRemoveItem = (itemId: string) => {
    removeItem.mutate(itemId);
  };

  const handleUpdateQuantity = (
    itemId: string,
    quantity: number,
    type: "book" | "ebook",
  ) => {
    const payload: CartMutationItem =
      type === "book"
        ? { bookId: itemId, quantity }
        : { ebookId: itemId, quantity };
    updateQuantity.mutate(payload);
  };

  const handlePurchase = async (couponCode?: string) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setPurchasing(true);
    try {
      const payload: { orderType: "cart" | "buy-now"; couponCode?: string } = {
        orderType: "cart",
      };
      if (couponCode) payload.couponCode = couponCode;
      const res = await checkout(payload);
      if (res.data?.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="mx-auto container px-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
          <div className="flex-1">
            <h1 className="mb-6 md:mb-10 font-serif text-2xl md:text-[32px] font-bold text-slate-900">
              Cart
            </h1>

            {isLoading ? (
              <div className="space-y-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <CartItemSkeleton key={i} />
                ))}
              </div>
            ) : cartItems.length > 0 ? (
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <CartItem
                    key={`${item.type}-${item.id}`}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    author={item.author}
                    language={item.language}
                    publisher={item.publisher}
                    price={item.price}
                    quantity={item.quantity}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={(id, quantity) =>
                      handleUpdateQuantity(id, quantity, item.type)
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-xl text-slate-600">Your cart is empty</p>
              </div>
            )}
          </div>

          <CartSummary
            subtotal={subtotal}
            vat={vat}
            discount={discount}
            cartItems={cartItems.map((item) =>
              item.type === "book"
                ? { bookId: item.id, quantity: item.quantity }
                : { ebookId: item.id, quantity: item.quantity },
            )}
            onPurchase={handlePurchase}
            purchasing={purchasing}
          />
        </div>
      </div>
    </div>
  );
}
