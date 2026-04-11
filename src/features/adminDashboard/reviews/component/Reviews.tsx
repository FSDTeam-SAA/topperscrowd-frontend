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
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Review } from "../types/reviews.types";

// --- Stat Cards ---

const stats = [
  { label: "Total Reviews", value: "1,482", icon: TrendingUp },
  { label: "Total Reviews", value: "$4,50", icon: DollarSign },
];

// --- Mock Reviews Data ---

const allReviews: Review[] = [
  {
    id: 1,
    name: "Eleanor Vance",
    avatar: "",
    time: "2 hours ago",
    book: "The Echoes of Eternity",
    rating: 5,
    text: '"The narration in this book is absolutely sublime. It feels like the characters are right in the room with you. I finished it in two sittings. Can\'t wait for the sequel!"',
    status: "APPROVED",
  },
  {
    id: 2,
    name: "Eleanor Vance",
    avatar: "",
    time: "2 hours ago",
    book: "The Echoes of Eternity",
    rating: 5,
    text: '"The narration in this book is absolutely sublime. It feels like the characters are right in the room with you. I finished it in two sittings. Can\'t wait for the sequel!"',
    status: "PENDING",
  },
  {
    id: 3,
    name: "Eleanor Vance",
    avatar: "",
    time: "2 hours ago",
    book: "The Echoes of Eternity",
    rating: 5,
    text: '"The narration in this book is absolutely sublime. It feels like the characters are right in the room with you. I finished it in two sittings. Can\'t wait for the sequel!"',
    status: "PENDING",
  },
  {
    id: 4,
    name: "Eleanor Vance",
    avatar: "",
    time: "2 hours ago",
    book: "The Echoes of Eternity",
    rating: 5,
    text: '"The narration in this book is absolutely sublime. It feels like the characters are right in the room with you. I finished it in two sittings. Can\'t wait for the sequel!"',
    status: "APPROVED",
  },
  {
    id: 5,
    name: "Eleanor Vance",
    avatar: "",
    time: "2 hours ago",
    book: "The Echoes of Eternity",
    rating: 4,
    text: '"The narration in this book is absolutely sublime. It feels like the characters are right in the room with you. I finished it in two sittings. Can\'t wait for the sequel!"',
    status: "PENDING",
  },
  {
    id: 6,
    name: "Eleanor Vance",
    avatar: "",
    time: "2 hours ago",
    book: "The Echoes of Eternity",
    rating: 5,
    text: '"The narration in this book is absolutely sublime. It feels like the characters are right in the room with you. I finished it in two sittings. Can\'t wait for the sequel!"',
    status: "PENDING",
  },
];

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

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-[#e4e4e4] bg-white p-5">
      {/* Header: Avatar + Name + Time + Status */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-11">
            <AvatarImage src={review.avatar} alt={review.name} />
            <AvatarFallback className="bg-[#d4a574] text-white text-sm font-semibold">
              {review.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-base font-semibold text-[#111]">{review.name}</p>
            <div className="flex items-center gap-1 text-xs text-[#6b6b6b]">
              <Clock className="size-3" />
              {review.time}
            </div>
          </div>
        </div>
        <span
          className={`text-xs font-bold ${
            review.status === "APPROVED" ? "text-[#0ca22f]" : "text-[#b45309]"
          }`}
        >
          {review.status}
        </span>
      </div>

      {/* Rating + Book */}
      <div className="mt-3 flex items-center gap-3">
        <StarRating rating={review.rating} />
        <div className="flex items-center gap-1 text-sm font-medium text-[#4f46e5]">
          <BookOpen className="size-3.5" />
          {review.book}
        </div>
      </div>

      {/* Review Text */}
      <p className="mt-3 text-sm leading-relaxed text-[#3b3b3b]">
        {review.text}
      </p>

      {/* Actions for PENDING */}
      {review.status === "PENDING" && (
        <div className="mt-4 flex items-center gap-4">
          <button className="flex items-center gap-1.5 rounded-md bg-[#0ca22f] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0a8a27]">
            <CheckCircle className="size-4" />
            Approve
          </button>
          <button className="flex items-center gap-1 text-sm font-medium text-[#e53838] transition-colors hover:text-[#c72f2f]">
            <XCircle className="size-4" />
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default function Reviews() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allReviews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedReviews = allReviews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {paginatedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between px-6">
          <p className="text-sm text-[#3b3b3b]">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, allReviews.length)} of{" "}
            {allReviews.length} results
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
