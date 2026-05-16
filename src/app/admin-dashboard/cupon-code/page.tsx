import React from "react";
import CreateCouponForm from "@/features/coupon/components/CreateCouponForm";

export default function CouponPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 font-serif">
          Coupon Management
        </h1>
        <p className="text-slate-500 mt-2">
          Manage and generate discount coupons for your customers.
        </p>
      </div>

      <CreateCouponForm />
    </div>
  );
}
