"use client";

import CartItem from "@/features/cart/components/CartItem";
import CartSummary from "@/features/cart/components/CartSummary";
import CartItemSkeleton from "@/components/shared/skeletons/CartItemSkeleton";
import {
  useCart,
  useRemoveCartItem,
  useUpdateCartQuantity,
} from "@/features/cart/hooks/useCart";
import { checkout } from "@/features/order/api/order.api";
import { toast } from "sonner";
import { useState } from "react";

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const removeItem = useRemoveCartItem();
  const updateQuantity = useUpdateCartQuantity();
  const [purchasing, setPurchasing] = useState(false);

  const items = cart?.items ?? [];
  const subtotal = items.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0,
  );
  const vat = Number((subtotal * 0.15).toFixed(2));
  const discount = 0;

  const handleRemoveItem = (bookId: string) => {
    removeItem.mutate(bookId);
  };

  const handleUpdateQuantity = (bookId: string, quantity: number) => {
    updateQuantity.mutate({ bookId, quantity });
  };

  const handlePurchase = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setPurchasing(true);
    try {
      const res = await checkout({ orderType: "cart" });
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
            ) : items.length > 0 ? (
              <div className="space-y-8">
                {items.map((item) => (
                  <CartItem
                    key={item._id}
                    id={item.book._id}
                    image={
                      item.book.image?.secure_url || "/images/home/book1.png"
                    }
                    title={item.book.title}
                    author={item.book.author}
                    language={item.book.language}
                    publisher={item.book.publisher}
                    price={item.book.price}
                    quantity={item.quantity}
                    onRemove={handleRemoveItem}
                    onUpdateQuantity={handleUpdateQuantity}
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
            onPurchase={handlePurchase}
            purchasing={purchasing}
          />
        </div>
      </div>
    </div>
  );
}
