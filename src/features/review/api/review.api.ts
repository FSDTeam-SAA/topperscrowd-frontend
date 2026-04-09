import { api } from "@/lib/api";
import type { ApiResponse, ApiReview } from "@/types/shared";

export async function getReviewsByBook(bookId: string) {
  const { data } = await api.get<ApiResponse<ApiReview[]>>(`/review/${bookId}`);
  return data;
}

export async function createReview(body: {
  bookId: string;
  rating: number;
  comment: string;
}) {
  const { data } = await api.post<ApiResponse<ApiReview>>(
    "/review/create-review",
    body,
  );
  return data;
}

export async function updateReview(
  reviewId: string,
  body: { rating: number; comment: string },
) {
  const { data } = await api.patch<ApiResponse<ApiReview>>(
    `/review/${reviewId}`,
    body,
  );
  return data;
}

export async function deleteReview(reviewId: string) {
  const { data } = await api.delete<ApiResponse<null>>(`/review/${reviewId}`);
  return data;
}
