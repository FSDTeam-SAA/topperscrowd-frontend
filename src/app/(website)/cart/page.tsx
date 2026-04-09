"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CartItem from "@/features/cart/components/CartItem";
import CartSummary from "@/features/cart/components/CartSummary";
import { useState } from "react";

const mockCartItems = [
  {
    id: "1",
    image: "/images/home/book1.png",
    title: "The Lighthouse",
    author: "Elias Theron",
    pages: 196,
    language: "English",
    publisher: "University Press",
    price: 13.99,
  },
  {
    id: "2",
    image: "/images/home/book1.png",
    title: "The Lighthouse",
    author: "Elias Theron",
    pages: 196,
    language: "English",
    publisher: "University Press",
    price: 13.99,
  },
  {
    id: "3",
    image: "/images/home/book1.png",
    title: "The Lighthouse",
    author: "Elias Theron",
    pages: 196,
    language: "English",
    publisher: "University Press",
    price: 13.99,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const subtotal = 450.0;
  const vat = 80.0;
  const discount = 50.0;

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handlePurchase = () => {
    alert("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-[#fff8f5]">
      <div className="mx-auto container px-6 overflow-hidden">
        <div className="flex gap-20">
          {/* Cart Items */}
          <div className="flex-1">
            <h1 className="mb-10 font-serif text-[32px] font-bold text-slate-900">
              Cart
            </h1>

            {cartItems.length > 0 ? (
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-xl text-slate-600">Your cart is empty</p>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <CartSummary
            subtotal={subtotal}
            vat={vat}
            discount={discount}
            onPurchase={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
}
