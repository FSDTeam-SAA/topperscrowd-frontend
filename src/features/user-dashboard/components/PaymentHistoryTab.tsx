"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Loader2,
  ReceiptText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMyPaymentHistory } from "../hooks/usePaymentHistory";
import type {
  PaymentHistoryItem,
  PaymentStatus,
} from "../types/payment-history.types";

const ITEMS_PER_PAGE = 10;

const statusStyles: Record<PaymentStatus, string> = {
  paid: "border-emerald-100 bg-emerald-50 text-emerald-700",
  pending: "border-amber-100 bg-amber-50 text-amber-700",
  cancelled: "border-rose-100 bg-rose-50 text-rose-700",
};

const formatDate = (value?: string | null) => {
  if (!value) return "Not paid yet";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getItemProduct = (item: PaymentHistoryItem) =>
  item.productType === "ebook" ? item.ebook : item.book;

const getItemTitle = (item: PaymentHistoryItem) => {
  const product = getItemProduct(item);

  if (product?.title) return product.title;
  return item.productType === "ebook" ? "Deleted e-book" : "Deleted book";
};

export default function PaymentHistoryTab() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">(
    "all",
  );

  const { data, isLoading, isError } = useMyPaymentHistory({
    page,
    limit: ITEMS_PER_PAGE,
    paymentStatus: statusFilter,
  });

  const payments = data?.data || [];
  const meta = data?.meta;
  const totalPage = meta?.totalPage || 1;
  const totalAmount = payments.reduce(
    (sum, payment) =>
      payment.paymentStatus === "paid" ? sum + payment.totalAmount : sum,
    0,
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-bold text-slate-900">
          Payment History
        </h1>
        <p className="text-slate-500">
          Track your paid, pending, and cancelled payments.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-indigo-50">
              <ReceiptText className="size-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Payments</p>
              <p className="text-2xl font-bold text-slate-900">
                {isLoading ? (
                  <Loader2 className="size-6 animate-spin text-slate-400" />
                ) : (
                  (meta?.total ?? payments.length)
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-emerald-50">
              <CreditCard className="size-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Paid On This Page</p>
              <p className="text-2xl font-bold text-slate-900">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-slate-100">
              <CalendarDays className="size-5 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Current Page</p>
              <p className="text-2xl font-bold text-slate-900">
                {meta ? `${meta.page} / ${meta.totalPage}` : "1 / 1"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "paid", "pending", "cancelled"] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => {
              setStatusFilter(status);
              setPage(1);
            }}
            className={cn(
              "rounded-lg px-4 py-2.5 text-sm font-semibold capitalize transition-colors",
              statusFilter === status
                ? "bg-indigo-600 text-white"
                : "border border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50",
            )}
          >
            {status}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-20">
          <Loader2 className="size-8 animate-spin text-indigo-600" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-rose-100 bg-white p-10 text-center text-rose-600">
          Failed to load payment history.
        </div>
      ) : payments.length > 0 ? (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.orderId}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-mono text-sm font-bold text-slate-900">
                      #{payment.orderId.slice(-8).toUpperCase()}
                    </h2>
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-xs font-bold capitalize",
                        statusStyles[payment.paymentStatus],
                      )}
                    >
                      {payment.statusLabel}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                    <span>Created: {formatDate(payment.createdAt)}</span>
                    <span>Paid: {formatDate(payment.paidAt)}</span>
                    {payment.paypalOrderId && (
                      <span>PayPal: {payment.paypalOrderId}</span>
                    )}
                  </div>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-sm text-slate-500">Total Amount</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ${payment.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-5 divide-y divide-slate-100 rounded-lg border border-slate-100">
                {payment.items.map((item, index) => {
                  const product = getItemProduct(item);
                  const imageUrl = product?.coverImage?.url;

                  return (
                    <div
                      key={`${payment.orderId}-${index}`}
                      className="flex items-center gap-4 p-3"
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-slate-100">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={getItemTitle(item)}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-400">
                            <FileText className="size-5" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-semibold text-slate-900">
                          {getItemTitle(item)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.productType.toUpperCase()} x{item.quantity}
                          {product?.formatType
                            ? ` • ${product.formatType}`
                            : ""}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-500">
          No payment history found.
        </div>
      )}

      {totalPage > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="flex size-10 items-center justify-center rounded border border-slate-300 bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-sm text-slate-500">
            Page {page} of {totalPage}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPage, prev + 1))}
            disabled={page === totalPage}
            className="flex size-10 items-center justify-center rounded border border-slate-300 bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
