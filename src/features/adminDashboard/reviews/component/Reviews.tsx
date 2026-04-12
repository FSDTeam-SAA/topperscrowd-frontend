"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Filter,
  Star,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Loader2,
  Eye,
  Mail,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReviews } from "../hooks/useReviews";
import { Review } from "../types/reviews.types";

const ITEMS_PER_PAGE = 6;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`size-4 ${
            i < rating
              ? "fill-[#f59e0b] text-[#f59e0b]"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 30) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

function ReviewDetailModal({
  review,
  open,
  onOpenChange,
}: {
  review: Review;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const userName = `${review.userId.firstName} ${review.userId.lastName}`;
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-[#181919]">
            Review Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          {/* Reviewer Info */}
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback className="bg-[#d4a574] text-sm font-semibold text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-semibold text-[#111]">{userName}</p>
              <div className="flex items-center gap-1 text-sm text-[#6b6b6b]">
                <Mail className="size-3.5" />
                {review.userId.email}
              </div>
            </div>
          </div>

          <hr className="border-[#e4e4e4]" />

          {/* Book */}
          <div className="flex items-center gap-2">
            <BookOpen className="size-4 text-[#4f46e5]" />
            <span className="text-sm font-medium text-[#6b6b6b]">Book:</span>
            <span className="text-sm font-semibold text-[#111]">
              {review.bookId.title}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star className="size-4 text-[#f59e0b]" />
            <span className="text-sm font-medium text-[#6b6b6b]">Rating:</span>
            <StarRating rating={review.rating} />
            <span className="text-sm font-semibold text-[#111]">
              {review.rating}/5
            </span>
          </div>

          {/* Comment */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="size-4 text-[#4f46e5]" />
              <span className="text-sm font-medium text-[#6b6b6b]">
                Comment:
              </span>
            </div>
            <p className="rounded-lg bg-[#f8f8f8] p-4 text-sm leading-relaxed text-[#3b3b3b]">
              &ldquo;{review.comment}&rdquo;
            </p>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-[#6b6b6b]" />
              <span className="text-sm text-[#6b6b6b]">Created:</span>
              <span className="text-sm font-medium text-[#111]">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-[#6b6b6b]" />
              <span className="text-sm text-[#6b6b6b]">Updated:</span>
              <span className="text-sm font-medium text-[#111]">
                {new Date(review.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[#6b6b6b]">Status:</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                review.isDeleted
                  ? "bg-red-100 text-[#e53838]"
                  : "bg-green-100 text-[#0ca22f]"
              }`}
            >
              {review.isDeleted ? "Deleted" : "Active"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [showDetail, setShowDetail] = useState(false);
  const userName = `${review.userId.firstName} ${review.userId.lastName}`;

  return (
    <>
      <div className="rounded-xl border border-[#e4e4e4] bg-white p-5">
        {/* Header: Avatar + Name + Time */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-11">
              <AvatarImage src="" alt={userName} />
              <AvatarFallback className="bg-[#d4a574] text-sm font-semibold text-white">
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-base font-semibold text-[#111]">{userName}</p>
              <div className="flex items-center gap-1 text-xs text-[#6b6b6b]">
                <Clock className="size-3" />
                {formatTimeAgo(review.createdAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Rating + Book */}
        <div className="mt-3 flex items-center gap-3">
          <StarRating rating={review.rating} />
          <div className="flex items-center gap-1 text-sm font-medium text-[#4f46e5]">
            <BookOpen className="size-3.5" />
            {review.bookId.title}
          </div>
        </div>

        {/* Review Text */}
        <p className="mt-3 text-sm leading-relaxed text-[#3b3b3b]">
          &ldquo;{review.comment}&rdquo;
        </p>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => setShowDetail(true)}
            className="flex items-center gap-1.5 rounded-md border border-[#4f46e5] px-5 py-2 text-sm font-medium text-[#4f46e5] transition-colors hover:bg-[#4f46e5] hover:text-white"
          >
            <Eye className="size-4" />
            Details
          </button>
          {/* {!review.isDeleted && (
            <>
              <button className="flex items-center gap-1.5 rounded-md bg-[#0ca22f] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0a8a27]">
                <CheckCircle className="size-4" />
                Approve
              </button>
              <button className="flex items-center gap-1 text-sm font-medium text-[#e53838] transition-colors hover:text-[#c72f2f]">
                <XCircle className="size-4" />
                Reject
              </button>
            </>
          )} */}
        </div>
      </div>

      <ReviewDetailModal
        review={review}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  );
}

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useReviews(currentPage, ITEMS_PER_PAGE);

  const reviews = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPage ?? 1;
  const total = meta?.total ?? 0;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const stats = [
    { label: "Total Reviews", value: total.toLocaleString(), icon: TrendingUp },
    {
      label: "Average Rating",
      value:
        reviews.length > 0
          ? (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1)
          : "0",
      icon: DollarSign,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-[#4f46e5]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-red-500">
          Failed to load reviews. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-[#e3eeee] bg-white p-6 shadow-sm"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#f0f9f8]">
              <stat.icon className="size-5 text-[#5f7d7d]" />
            </div>
            <div>
              <p className="text-sm text-[#5f7d7d]">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-[#0f172a]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Card */}
      <div className="rounded-lg border border-[#cecece] bg-white p-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#181919]">Reviews</h1>
            <div className="mt-3 flex items-center gap-2 text-base text-[#6c6c6c]">
              <span className="font-medium">Dashboard</span>
              <ChevronRight className="size-4" />
              <span className="font-medium">Reviews</span>
            </div>
          </div>

          {/* Filter Button */}
          <button className="flex h-[52px] items-center gap-2 rounded-lg border-2 border-[#4f46e5] px-4 text-base font-bold text-[#4f46e5] transition-colors hover:bg-[#4f46e5] hover:text-white">
            <Filter className="size-5" />
            Filter
          </button>
        </div>

        {/* Review Cards Grid */}
        {reviews.length === 0 ? (
          <p className="py-8 text-center text-[#6b6b6b]">No reviews found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between px-6">
          <p className="text-sm text-[#3b3b3b]">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, total)} of {total} results
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex size-10 items-center justify-center rounded border border-[#64748b] bg-white disabled:opacity-40"
            >
              <ChevronLeft className="size-[18px]" />
            </button>

            <button
              onClick={() => setCurrentPage(1)}
              className={`flex size-10 items-center justify-center rounded text-base font-medium ${
                currentPage === 1
                  ? "bg-[#4f46e5] text-white"
                  : "border border-[#0f172a] text-[#0f172a]"
              }`}
            >
              1
            </button>

            {totalPages > 2 && (
              <span className="flex size-10 items-center justify-center rounded border border-[#0f172a] text-base font-medium text-[#0f172a]">
                ...
              </span>
            )}

            {totalPages > 1 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`flex size-10 items-center justify-center rounded text-base font-medium ${
                  currentPage === totalPages
                    ? "bg-[#4f46e5] text-white"
                    : "border border-[#0f172a] text-[#1e1e1e]"
                }`}
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex size-10 items-center justify-center rounded border border-[#0f172a] disabled:opacity-40"
            >
              <ChevronRight className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
