"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  ReceiptText,
} from "lucide-react";
import { useMyPurchasedEBooks } from "../hooks/useLibrary";
import type { PurchasedEBook } from "../types/library.types";

const ITEMS_PER_PAGE = 10;

const formatDate = (value?: string) => {
  if (!value) return "N/A";

  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function EBookCard({ ebook }: { ebook: PurchasedEBook }) {
  const fileUrl = ebook.file?.url;

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-5 p-4 sm:flex-row">
        <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-md bg-slate-100 sm:h-44 sm:w-32">
          <Image
            src={ebook.coverImage?.url || "/images/home/book1.png"}
            alt={ebook.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                <FileText className="size-3.5" />
                {ebook.formatType || "E-Book"}
              </span>
              {ebook.file?.fileSize && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                  {ebook.file.fileSize}
                </span>
              )}
              {ebook.category?.name && (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {ebook.category.name}
                </span>
              )}
            </div>

            <h2 className="line-clamp-2 font-serif text-2xl font-bold text-slate-900">
              {ebook.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-600">
              {ebook.author}
            </p>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
              {ebook.description}
            </p>
          </div>

          <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <ReceiptText className="size-4 text-slate-400" />
              <span>
                Order: {ebook.purchaseInfo?.orderId?.slice(-8).toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-slate-400" />
              <span>{formatDate(ebook.purchaseInfo?.purchasedAt)}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">
              Purchased for{" "}
              <span className="font-bold text-slate-900">
                ${(ebook.purchaseInfo?.price ?? ebook.price).toFixed(2)}
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={fileUrl || "#"}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!fileUrl}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  fileUrl
                    ? "border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    : "pointer-events-none border border-slate-200 text-slate-400"
                }`}
              >
                <ExternalLink className="size-4" />
                Open
              </a>
              <a
                href={fileUrl || "#"}
                download
                aria-disabled={!fileUrl}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  fileUrl
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "pointer-events-none bg-slate-200 text-slate-400"
                }`}
              >
                <Download className="size-4" />
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PurchasedEBooksTab() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useMyPurchasedEBooks(
    page,
    ITEMS_PER_PAGE,
  );

  const ebooks = data?.data || [];
  const meta = data?.meta;
  const totalPage = meta?.totalPage || 1;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-4xl font-bold text-slate-900">
          E-book Purchase
        </h1>
        <p className="text-slate-500">
          All purchased e-books are available here.
        </p>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-indigo-50">
              <BookOpen className="size-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Purchased E-books</p>
              <p className="text-2xl font-bold text-slate-900">
                {isLoading ? (
                  <Loader2 className="size-6 animate-spin text-slate-400" />
                ) : (
                  (meta?.total ?? ebooks.length)
                )}
              </p>
            </div>
          </div>
          {meta && (
            <p className="text-sm text-slate-500">
              Page {meta.page} of {meta.totalPage}
            </p>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white py-20">
          <Loader2 className="size-8 animate-spin text-indigo-600" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-rose-100 bg-white p-10 text-center text-rose-600">
          Failed to load purchased e-books.
        </div>
      ) : ebooks.length > 0 ? (
        <div className="space-y-4">
          {ebooks.map((ebook) => (
            <EBookCard key={ebook._id} ebook={ebook} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-slate-500">
          No purchased e-books found.
        </div>
      )}

      {totalPage > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-slate-500">
            Page {page} of {totalPage}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(totalPage, prev + 1))}
            disabled={page === totalPage}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
