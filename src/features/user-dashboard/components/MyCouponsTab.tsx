"use client";

import { useState } from "react";
import { useMyCoupons } from "@/features/coupon/hooks/useCoupon";
import {
  Loader2,
  Ticket,
  Calendar,
  Copy,
  Check,
  Tag,
  RefreshCcw,
} from "lucide-react";

function CouponCard({
  coupon,
}: {
  coupon: {
    _id: string;
    codeName: string;
    discountType: string;
    discountAmount: number;
    expiryDate: string;
    usesLimit: number;
    usedCount: number;
  };
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(coupon.codeName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const date = new Date(coupon.expiryDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const usagePercent =
    coupon.usesLimit > 0
      ? Math.min(100, Math.round((coupon.usedCount / coupon.usesLimit) * 100))
      : 0;

  const isPercentage = coupon.discountType === "percentage";

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white border border-[#e2e8f0]">
      {/* Top colored banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 pt-5 pb-8 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-full p-1.5">
              <Tag className="size-4 text-white" />
            </div>
            <span className="text-white/80 text-xs font-medium uppercase tracking-widest">
              Coupon
            </span>
          </div>
          <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            Active
          </span>
        </div>

        {/* Big discount badge */}
        <div className="mt-4 flex items-end gap-2">
          <span className="text-white text-5xl font-black leading-none">
            {isPercentage
              ? `${coupon.discountAmount}%`
              : `$${coupon.discountAmount}`}
          </span>
          <span className="text-white/80 text-lg font-semibold mb-1">OFF</span>
        </div>
        <p className="text-white/60 text-xs mt-1">
          {isPercentage ? "Percentage discount" : "Fixed amount discount"}
        </p>

        {/* Notch circles */}
        <div className="absolute bottom-[-14px] left-[-14px] w-7 h-7 bg-slate-50 rounded-full border border-[#e2e8f0]" />
        <div className="absolute bottom-[-14px] right-[-14px] w-7 h-7 bg-slate-50 rounded-full border border-[#e2e8f0]" />
      </div>

      {/* Dashed separator */}
      <div className="border-t-2 border-dashed border-[#e2e8f0] mx-6" />

      {/* Bottom content */}
      <div className="px-6 pt-5 pb-6 space-y-4">
        {/* Coupon code copy */}
        <div>
          <p className="text-xs text-slate-500 font-medium mb-1.5 uppercase tracking-wide">
            Coupon Code
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-100 rounded-xl px-4 py-3 font-mono font-bold text-slate-800 text-lg tracking-widest border border-dashed border-slate-300">
              {coupon.codeName}
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                copied
                  ? "bg-green-100 text-green-700 border border-green-200 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 cursor-pointer"
              }`}
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Usage progress */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <RefreshCcw className="size-3.5" />
              <span>Usage</span>
            </div>
            <span className="text-xs font-semibold text-slate-700">
              {coupon.usedCount} / {coupon.usesLimit}
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>

        {/* Expiry */}
        <div className="flex items-center justify-between text-sm border-t border-[#f1f5f9] pt-3">
          <div className="flex items-center gap-2 text-slate-500">
            <Calendar className="size-4" />
            <span>Expires on</span>
          </div>
          <span className="font-semibold text-slate-800">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default function MyCouponsTab() {
  const { data, isLoading, error } = useMyCoupons();
  const coupons = data?.data || [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between py-2.5">
        <h1 className="font-serif text-4xl font-bold leading-[1.2] text-[#1e2a2a]">
          My Coupons
        </h1>
        <span className="text-sm text-slate-500">
          {coupons.length} active {coupons.length === 1 ? "coupon" : "coupons"}
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-[#4f46e5]" />
        </div>
      ) : error ? (
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-red-500">
            Failed to load coupons. Please try again.
          </p>
        </div>
      ) : coupons.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="flex size-16 items-center justify-center rounded-full bg-slate-100">
            <Ticket className="size-8 text-slate-400" />
          </div>
          <p className="text-base text-[#64748b]">No active coupons found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((coupon) => (
            <CouponCard key={coupon._id} coupon={coupon} />
          ))}
        </div>
      )}
    </div>
  );
}
