"use client";

import { useState } from "react";
import {
  Ticket,
  X,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

interface CartItem {
  bookId?: string;
  ebookId?: string;
  quantity: number;
}

interface CouponResult {
  couponCode: string;
  discountType: string;
  discountValue: number;
  originalTotal: number;
  discountAmount: number;
  finalTotal: number;
}

interface CartSummaryProps {
  subtotal: number;
  vat: number;
  discount: number;
  cartItems: CartItem[];
  onPurchase: (couponCode?: string) => void;
  purchasing?: boolean;
}

export default function CartSummary({
  subtotal,
  vat,
  discount,
  cartItems,
  onPurchase,
  purchasing = false,
}: CartSummaryProps) {
  const [couponInput, setCouponInput] = useState("");
  const [couponResult, setCouponResult] = useState<CouponResult | null>(null);
  const [couponError, setCouponError] = useState("");
  const [applying, setApplying] = useState(false);
  const [shake, setShake] = useState(false);

  const couponDiscount = couponResult?.discountAmount ?? 0;
  const totalDiscount = discount + couponDiscount;
  const total = couponResult
    ? couponResult.finalTotal
    : Math.max(0, subtotal + vat - totalDiscount);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleApplyCoupon = async () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (cartItems.length === 0) {
      setCouponError("Add items to cart before applying a coupon.");
      return;
    }
    setCouponError("");
    setApplying(true);

    try {
      const { api } = await import("@/lib/api");
      const { data } = await api.post<{
        success: boolean;
        message: string;
        statusCode: number;
        data: CouponResult;
      }>("/coupon/apply", {
        couponCode: code,
        items: cartItems,
      });

      if (data.success && data.data) {
        setCouponResult(data.data);
        setCouponInput("");
      } else {
        setCouponError(data.message || "Invalid coupon code");
        triggerShake();
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setCouponError(
        axiosErr?.response?.data?.message || "Invalid or expired coupon code",
      );
      triggerShake();
    } finally {
      setApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponResult(null);
    setCouponError("");
    setCouponInput("");
  };

  const discountLabel =
    couponResult?.discountType === "percentage"
      ? `${couponResult.discountValue}% OFF`
      : `$${couponResult?.discountValue} OFF`;

  return (
    <div className="w-full lg:w-[340px] shrink-0">
      <h2 className="font-serif text-[32px] font-bold leading-tight text-slate-900">
        Cart Summary
      </h2>

      {/* ── Coupon Section ── */}
      <div className="mt-6">
        <p className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
          <Ticket className="size-4 text-indigo-500" />
          Have a coupon?
        </p>

        {couponResult ? (
          /* Applied State */
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-px">
            <div className="rounded-2xl bg-white px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="size-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      Coupon Applied!
                    </p>
                    <p className="font-mono text-sm font-extrabold tracking-widest text-slate-900">
                      {couponResult.couponCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700">
                    {discountLabel}
                  </span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="flex size-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    title="Remove coupon"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
              {/* Savings banner */}
              <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2">
                <Sparkles className="size-3.5 text-green-600" />
                <p className="text-xs font-semibold text-green-700">
                  You save ${couponDiscount.toFixed(2)} with this coupon!
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Input State */
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. TEST10"
                value={couponInput}
                onChange={(e) => {
                  setCouponInput(e.target.value.toUpperCase());
                  if (couponError) setCouponError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                className={`w-[65%] shrink-0 rounded-xl border-2 px-4 py-2.5 font-mono text-sm font-semibold uppercase tracking-widest text-slate-800 placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 focus:outline-none transition-all duration-200 ${
                  couponError
                    ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                }`}
                style={
                  shake ? { animation: "shake 0.5s ease-in-out" } : undefined
                }
              />
              <button
                onClick={handleApplyCoupon}
                disabled={applying || !couponInput.trim()}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {applying ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  "Apply"
                )}
              </button>
            </div>

            {couponError && (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600">
                <AlertCircle className="size-4 shrink-0" />
                <span>{couponError}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Price Breakdown ── */}
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 text-sm">
          <span className="font-medium text-slate-600">Subtotal</span>
          <span className="font-semibold text-slate-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 text-sm">
          <span className="font-medium text-slate-600">VAT (15%)</span>
          <span className="font-semibold text-slate-900">
            ${vat.toFixed(2)}
          </span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex items-center justify-between border-b border-slate-200 bg-green-50 px-4 py-3.5 text-sm">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-green-600" />
              <span className="font-medium text-green-700">
                Coupon ({couponResult?.couponCode})
              </span>
            </div>
            <span className="font-bold text-green-600">
              -${couponDiscount.toFixed(2)}
            </span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3.5 text-sm">
            <span className="font-medium text-slate-600">Discount</span>
            <span className="font-semibold text-slate-900">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-4 font-bold text-white">
          <span className="text-base">Total Amount</span>
          <span className="text-xl">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={() => onPurchase(couponResult?.couponCode)}
        disabled={purchasing}
        className="mt-5 w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-4 text-base font-bold text-white shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {purchasing ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin" /> Processing...
          </span>
        ) : (
          "Proceed to Purchase"
        )}
      </button>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(6px); }
          45% { transform: translateX(-4px); }
          60% { transform: translateX(4px); }
          75% { transform: translateX(-2px); }
          90% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
}
