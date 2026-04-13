"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Star,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageSquareText,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMyBooks } from "../hooks/useLibrary";
import {
  useReviewsByBook,
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from "@/features/review/hooks/useReviews";
import { useSession } from "next-auth/react";
import { LibraryBook } from "../types/library.types";
import type { ApiReview } from "@/types/shared";

const ITEMS_PER_PAGE = 10;

// ── Interactive Star Rating (clickable) ─────────────────────────────
function InteractiveStarRating({
  rating,
  onRate,
  size = "size-7",
}: {
  rating: number;
  onRate: (r: number) => void;
  size?: string;
}) {
  const [hovered, setHovered] = useState(0);
  const display = hovered || rating;

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onRate(i)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`${size} ${
              i <= display
                ? "fill-[#faad14] text-[#faad14]"
                : "fill-[#e8e8e8] text-[#e8e8e8]"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

// ── Display-only Star Rating ────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => {
        const isFull = i < Math.floor(rating);
        const isHalf = !isFull && i < rating;
        return (
          <Star
            key={i}
            className={`size-5 ${
              isFull
                ? "fill-[#faad14] text-[#faad14]"
                : isHalf
                  ? "fill-[#faad14]/50 text-[#faad14]"
                  : "fill-[#e8e8e8] text-[#e8e8e8]"
            }`}
          />
        );
      })}
    </div>
  );
}

// ── Helper: find current user's review from reviews list ────────────
function findMyReview(
  reviews: ApiReview[] | undefined,
  userId: string | undefined,
): ApiReview | undefined {
  if (!reviews || !userId) return undefined;
  return reviews.find((r) => {
    const reviewUserId = typeof r.userId === "object" ? r.userId._id : r.userId;
    return reviewUserId === userId && !r.isDeleted;
  });
}

// ── Review Form (mounted AFTER data loads so useState inits correctly)
function ReviewForm({
  book,
  myReview,
  onClose,
}: {
  book: LibraryBook;
  myReview: ApiReview | undefined;
  onClose: () => void;
}) {
  const isEditing = !!myReview;
  const [rating, setRating] = useState(myReview?.rating || 0);
  const [comment, setComment] = useState(myReview?.comment || "");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const createMutation = useCreateReview();
  const updateMutation = useUpdateReview();
  const deleteMutation = useDeleteReview(book._id);

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = () => {
    if (rating === 0) return;

    if (isEditing && myReview) {
      updateMutation.mutate(
        {
          reviewId: myReview._id,
          bookId: book._id,
          rating,
          comment,
        },
        { onSuccess: () => onClose() },
      );
    } else {
      createMutation.mutate(
        { bookId: book._id, rating, comment },
        { onSuccess: () => onClose() },
      );
    }
  };

  const handleDelete = () => {
    if (!myReview) return;
    deleteMutation.mutate(myReview._id, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg font-bold text-[#0f172a]">
          {isEditing ? "Edit Your Review" : "Write a Review"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-5 py-2">
        {/* Book Info */}
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src={book.image?.secure_url || "/images/home/book1.png"}
              alt={book.title}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-serif text-sm font-bold text-[#0f172a]">
              {book.title}
            </p>
            <p className="text-xs text-[#64748b]">{book.author}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0f172a]">
            Your Rating
          </label>
          <InteractiveStarRating rating={rating} onRate={setRating} />
          {rating === 0 && (
            <p className="text-xs text-red-500">Please select a rating</p>
          )}
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-[#0f172a]">
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this book..."
            rows={4}
            className="w-full rounded-lg border border-[#e2e8f0] bg-white px-3 py-2.5 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
          />
        </div>
      </div>

      {/* Delete Confirmation Inline */}
      {isEditing && showDeleteConfirm && (
        <div className="rounded-lg border border-[#e53838]/20 bg-red-50 p-4">
          <p className="text-sm text-[#0f172a]">
            Are you sure you want to delete this review?
          </p>
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex items-center gap-1.5 rounded-lg bg-[#e53838] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending && (
                <Loader2 className="size-3.5 animate-spin" />
              )}
              Yes, delete
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="rounded-lg border border-[#e2e8f0] px-3 py-1.5 text-sm font-medium text-[#64748b] transition-colors hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <DialogFooter className="flex items-center">
        {isEditing && !showDeleteConfirm && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="mr-auto flex items-center gap-1.5 rounded-lg border border-[#e53838] px-3 py-2 text-sm font-medium text-[#e53838] transition-colors hover:bg-[#e53838] hover:text-white"
          >
            <Trash2 className="size-4" />
            Delete
          </button>
        )}

        <button
          onClick={onClose}
          className="rounded-lg border border-[#e2e8f0] px-4 py-2 text-sm font-medium text-[#64748b] transition-colors hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={rating === 0 || isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-[#4f46e5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4338ca] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {isEditing ? "Update Review" : "Submit Review"}
        </button>
      </DialogFooter>
    </>
  );
}

// ── Review Modal (fetches data, then renders form) ──────────────────
function ReviewModal({
  open,
  onOpenChange,
  book,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: LibraryBook;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: reviewsData, isLoading: reviewsLoading } = useReviewsByBook(
    book._id,
  );
  const myReview = findMyReview(reviewsData?.data, userId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {reviewsLoading ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-[#0f172a]">
                Loading...
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center py-10">
              <Loader2 className="size-6 animate-spin text-[#4f46e5]" />
            </div>
          </>
        ) : (
          <ReviewForm
            key={myReview?._id || "new"}
            book={book}
            myReview={myReview}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Book Card ───────────────────────────────────────────────────────
function BookReviewCard({
  book,
  onReview,
}: {
  book: LibraryBook;
  onReview: () => void;
}) {
  const displayRating = book.myRating || book.averageRating || 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl">
      {/* Book Cover Image */}
      <div className="relative h-[256px] w-full overflow-hidden rounded-t-2xl">
        <Image
          src={book.image?.secure_url || "/images/home/book1.png"}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-4 border border-t-0 border-[#e2e8f0] bg-white p-6 rounded-b-2xl">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-serif text-base font-bold leading-[1.2] text-[#0f172a]">
              {book.title}
            </h3>
            <p className="text-xs leading-[1.2] text-[#64748b]">
              {book.author}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <StarRating rating={displayRating} />
            <span className="text-base font-semibold leading-[1.2] text-[#64748b]">
              ({displayRating.toFixed(1)})
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold leading-[1.2] text-[#4f46e5]">
            ${book.price?.toFixed(2) || "0.00"}
          </span>
          <button
            onClick={onReview}
            className="flex items-center gap-1 rounded-lg bg-[#4f46e5] px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#4338ca]"
          >
            <MessageSquareText className="size-5" />
            <span>Review</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────
export default function ReviewsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<LibraryBook | null>(null);

  const { data, isLoading, error } = useMyBooks(
    currentPage,
    ITEMS_PER_PAGE,
    debouncedSearch || undefined,
  );

  const books = data?.data || [];
  const meta = data?.meta;
  const pagination = data?.pagination;
  const totalPages = meta?.totalPage || pagination?.totalPages || 1;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(value);
      setCurrentPage(1);
    }, 500);
  };

  const handleOpenReview = (book: LibraryBook) => {
    setSelectedBook(book);
    setReviewModalOpen(true);
  };

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
      {/* Title & Search */}
      <div className="flex items-center justify-between py-2.5">
        <h1 className="font-serif text-4xl font-bold leading-[1.2] text-[#1e2a2a]">
          Reviews
        </h1>
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
          <input
            type="text"
            placeholder="Search by title, author..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full rounded-lg border border-[#e2e8f0] bg-white py-2.5 pl-10 pr-4 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:border-[#4f46e5] focus:outline-none focus:ring-1 focus:ring-[#4f46e5]"
          />
        </div>
      </div>

      {/* Book Cards Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-8 animate-spin text-[#4f46e5]" />
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Star className="size-12 text-[#e2e8f0]" />
          <p className="mt-4 text-base text-[#64748b]">
            {debouncedSearch
              ? "No books found matching your search."
              : "No books in your library yet."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {books.map((book) => (
              <BookReviewCard
                key={book._id}
                book={book}
                onReview={() => handleOpenReview(book)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex size-10 items-center justify-center rounded-lg border border-[#e2e8f0] transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="size-5" />
              </button>
              <span className="text-sm text-[#64748b]">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="flex size-10 items-center justify-center rounded-lg border border-[#e2e8f0] transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </>
      )}

      {selectedBook && reviewModalOpen && (
        <ReviewModal
          key={selectedBook._id}
          open={reviewModalOpen}
          onOpenChange={setReviewModalOpen}
          book={selectedBook}
        />
      )}
    </div>
  );
}
