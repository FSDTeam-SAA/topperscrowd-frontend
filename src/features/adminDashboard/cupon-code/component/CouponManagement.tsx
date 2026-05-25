"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Plus,
  X,
  Search,
  MoreVertical,
  Ticket,
  Percent,
  DollarSign,
  Users,
  Calendar,
  Trash2,
} from "lucide-react";
import { useGetAllCoupons, useDeleteCoupon } from "../hooks/useCupon";
import CreateCouponForm from "@/features/coupon/components/CreateCouponForm";

export default function CouponManagement() {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { data, isLoading, error } = useGetAllCoupons(page, 10);
  const { mutate: deleteCoupon } = useDeleteCoupon();

  const handleDelete = (id: string) => {
    deleteCoupon(id, {
      onSuccess: () => {
        toast.success("Coupon deleted successfully");
      },
      onError: (error: unknown) => {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err?.response?.data?.message || "Failed to delete coupon");
      },
    });
  };

  const coupons = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif flex items-center gap-3">
            {/* <Ticket className="size-8 text-indigo-600" /> */}
            Coupon Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage discount codes, monitor usage, and create new coupons.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm active:scale-95"
        >
          <Plus className="size-5" />
          Add Coupon
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="px-6 py-4">Coupon Code</th>
                <th className="px-6 py-4">Assigned To</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Usage</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Loading coupons...
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No coupons found.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr
                    key={coupon._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-mono font-bold text-sm border border-indigo-100">
                        {coupon.codeName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {coupon.assignedTo ? (
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {coupon.assignedTo.firstName}{" "}
                            {coupon.assignedTo.lastName}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            {coupon.assignedTo.email}
                          </p>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                          <Users className="size-3" /> All Users
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                        {coupon.discountType === "percentage" ? (
                          <>
                            {coupon.discountAmount}
                            <Percent className="size-3.5 text-slate-400" />
                          </>
                        ) : (
                          <>
                            <DollarSign className="size-3.5 text-slate-400" />
                            {coupon.discountAmount}
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                          <span>
                            {coupon.usedCount} / {coupon.usesLimit}
                          </span>
                          <span>
                            {Math.round(
                              (coupon.usedCount / coupon.usesLimit) * 100,
                            )}
                            %
                          </span>
                        </div>
                        <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{
                              width: `${Math.min((coupon.usedCount / coupon.usesLimit) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-slate-600">
                        <Calendar className="size-4 text-slate-400" />
                        {new Date(coupon.expiryDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDelete(coupon._id)}
                          className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Coupon"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta && meta.totalPage > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
            <span className="text-sm text-slate-500">
              Showing page {meta.page} of {meta.totalPage}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={page === meta.totalPage}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Coupon Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-50 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 bg-white rounded-full shadow-sm hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="size-5" />
            </button>
            <CreateCouponForm />
          </div>
        </div>
      )}
    </div>
  );
}
