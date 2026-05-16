"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useCreateCoupon } from "../hooks/useCoupon";
import { CreateCouponPayload } from "../types/coupon.types";
import {
  Mail,
  Tag,
  Calendar,
  Users,
  Percent,
  DollarSign,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function CreateCouponForm() {
  const { mutate: create, isPending } = useCreateCoupon();
  const [formData, setFormData] = useState<CreateCouponPayload>({
    email: "",
    codeName: "",
    expiryDate: "",
    usesLimit: 100,
    discountType: "percentage",
    discountAmount: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "usesLimit" || name === "discountAmount"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create(formData, {
      onSuccess: (data) => {
        toast.success(data.message || "Coupon created successfully!");
        setFormData({
          email: "",
          codeName: "",
          expiryDate: "",
          usesLimit: 100,
          discountType: "percentage",
          discountAmount: 0,
        });
      },
      onError: (error: AxiosError<{ message: string }>) => {
        const errorData = error?.response?.data;
        toast.error(errorData?.message || "Failed to create coupon");
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-2xl font-bold text-slate-900">
            Create New Coupon
          </h2>
          <p className="text-slate-500 mt-1">
            Fill in the details below to generate a new discount coupon.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Mail className="size-4 text-indigo-500" />
                Target Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="customer@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            {/* Coupon Code */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Tag className="size-4 text-indigo-500" />
                Coupon Code
              </label>
              <input
                type="text"
                name="codeName"
                value={formData.codeName}
                onChange={handleChange}
                required
                placeholder="e.g. SAVE20"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none font-mono uppercase"
              />
            </div>

            {/* Expiry Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="size-4 text-indigo-500" />
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            {/* Usage Limit */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Users className="size-4 text-indigo-500" />
                Usage Limit
              </label>
              <input
                type="number"
                name="usesLimit"
                value={formData.usesLimit}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            {/* Discount Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                {formData.discountType === "percentage" ? (
                  <Percent className="size-4 text-indigo-500" />
                ) : (
                  <DollarSign className="size-4 text-indigo-500" />
                )}
                Discount Type
              </label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            {/* Discount Amount */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <DollarSign className="size-4 text-indigo-500" />
                Discount Value
              </label>
              <input
                type="number"
                name="discountAmount"
                value={formData.discountAmount}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating Coupon...
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-5" />
                  Generate Coupon
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
