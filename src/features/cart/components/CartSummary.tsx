"use client";

import { useState } from "react";

interface CartSummaryProps {
  subtotal: number;
  vat: number;
  discount: number;
  onPurchase: () => void;
  purchasing?: boolean;
}

export default function CartSummary({
  subtotal,
  vat,
  discount,
  onPurchase,
  purchasing = false,
}: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const total = subtotal + vat - discount;

  return (
    <div className="w-full lg:w-[340px] shrink-0">
      <h2 className="font-serif text-[32px] font-bold leading-tight text-slate-900">
        Cart Summary
      </h2>

      <div className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Enter Promocode"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-1 rounded-md border border-slate-300 px-4 py-2.5 text-sm text-slate-600 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
        />
        <button className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
          Submit
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 text-sm text-slate-900">
          <span className="font-medium">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 text-sm text-slate-900">
          <span className="font-medium">VAT</span>
          <span>${vat.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 text-sm text-slate-900">
          <span className="font-medium">Discount</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between bg-indigo-600 px-4 py-3.5 text-sm font-medium text-white">
          <span>Total Amount</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onPurchase}
        disabled={purchasing}
        className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
      >
        {purchasing ? "Processing..." : "Purchase"}
      </button>
    </div>
  );
}
