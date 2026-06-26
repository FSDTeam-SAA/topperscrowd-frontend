import { api } from "@/lib/api";
import {
  ApiResponse,
  ContinueListeningData,
  LibraryBook,
  LibraryStats,
  PaginatedResponse,
  PurchasedEBook,
} from "../types/library.types";

export async function fetchLibraryStats(): Promise<ApiResponse<LibraryStats>> {
  const { data } = await api.get<ApiResponse<LibraryStats>>("/library/stats");
  return data;
}

export async function fetchContinueListening(): Promise<
  ApiResponse<ContinueListeningData>
> {
  const { data } = await api.get<ApiResponse<ContinueListeningData>>(
    "/library/continue-listening",
  );
  return data;
}

export async function fetchRecentPurchases(): Promise<
  ApiResponse<LibraryBook[]>
> {
  const { data } = await api.get<ApiResponse<LibraryBook[]>>(
    "/library/recent-purchases",
  );
  return data;
}

export async function fetchMyBooks(
  page: number = 1,
  limit: number = 10,
  search?: string,
): Promise<PaginatedResponse<LibraryBook>> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search) params.append("search", search);
  const { data } = await api.get<PaginatedResponse<LibraryBook>>(
    `/library/my-books?${params.toString()}`,
  );
  return data;
}

export async function fetchMyPurchasedEBooks(
  page: number = 1,
  limit: number = 10,
): Promise<PaginatedResponse<PurchasedEBook>> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const { data } = await api.get<PaginatedResponse<PurchasedEBook>>(
    `/library/my-purchased-ebooks?${params.toString()}`,
  );
  return data;
}

export async function updateListenerProgress(payload: {
  bookId: string;
  progress: number;
  totalDuration: number;
}): Promise<ApiResponse<ContinueListeningData>> {
  const { data } = await api.post<ApiResponse<ContinueListeningData>>(
    "/listener-progress/",
    payload,
  );
  return data;
}
