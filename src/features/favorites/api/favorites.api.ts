import { api } from "@/lib/api";
import type {
  ApiResponse,
  ApiBook,
  FavoriteToggleResponse,
} from "@/types/shared";

export async function getMyFavorites(params?: {
  page?: number;
  limit?: number;
}) {
  const { data } = await api.get<ApiResponse<ApiBook[]>>("/favorite", {
    params,
  });
  return data;
}

export async function toggleFavorite(bookId: string) {
  const { data } = await api.post<ApiResponse<FavoriteToggleResponse>>(
    "/favorite/toggle",
    { bookId },
  );
  return data;
}
