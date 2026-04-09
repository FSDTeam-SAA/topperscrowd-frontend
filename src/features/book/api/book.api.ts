import { api } from "@/lib/api";
import type { ApiResponse, ApiBook } from "@/types/shared";

export async function getAllBooks(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const { data } = await api.get<ApiResponse<ApiBook[]>>(
    "/book/get-all-books",
    { params },
  );
  return data;
}

export async function getBookById(id: string) {
  const { data } = await api.get<ApiResponse<ApiBook>>(`/book/get-book/${id}`);
  return data;
}

export async function getBooksByCategory(
  categoryId: string,
  params?: { page?: number; limit?: number },
) {
  const { data } = await api.get<ApiResponse<ApiBook[]>>(
    `/book/get-books-by-category/${categoryId}`,
    { params },
  );
  return data;
}
