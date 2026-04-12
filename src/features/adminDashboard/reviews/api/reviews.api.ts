import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { ReviewsResponse } from "../types/reviews.types";

function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong";
}

export async function fetchReviews(
  page: number = 1,
  limit: number = 10,
): Promise<ReviewsResponse> {
  try {
    const { data } = await api.get<ReviewsResponse>(
      `/admin-dashboard/reviews-management?page=${page}&limit=${limit}`,
    );
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error));
  }
}
