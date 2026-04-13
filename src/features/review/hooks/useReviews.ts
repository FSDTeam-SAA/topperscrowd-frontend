"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReviewsByBook,
  createReview,
  updateReview,
  deleteReview,
} from "../api/review.api";
import { toast } from "sonner";

export function useReviewsByBook(bookId: string) {
  return useQuery({
    queryKey: ["reviews", bookId],
    queryFn: () => getReviewsByBook(bookId),
    enabled: !!bookId,
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { bookId: string; rating: number; comment: string }) =>
      createReview(body),
    onSuccess: (res, variables) => {
      toast.success(res.message || "Review submitted");
      qc.invalidateQueries({ queryKey: ["reviews", variables.bookId] });
      qc.invalidateQueries({ queryKey: ["book", variables.bookId] });
      qc.invalidateQueries({ queryKey: ["myBooks"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to submit review");
    },
  });
}

export function useUpdateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      reviewId,
      rating,
      comment,
    }: {
      reviewId: string;
      bookId: string;
      rating: number;
      comment: string;
    }) => updateReview(reviewId, { rating, comment }),
    onSuccess: (res, variables) => {
      toast.success(res.message || "Review updated");
      qc.invalidateQueries({ queryKey: ["reviews", variables.bookId] });
      qc.invalidateQueries({ queryKey: ["book", variables.bookId] });
      qc.invalidateQueries({ queryKey: ["myBooks"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to update review");
    },
  });
}

export function useDeleteReview(bookId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: (res) => {
      toast.success(res.message || "Review deleted");
      qc.invalidateQueries({ queryKey: ["reviews", bookId] });
      qc.invalidateQueries({ queryKey: ["book", bookId] });
      qc.invalidateQueries({ queryKey: ["myBooks"] });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to delete review");
    },
  });
}
