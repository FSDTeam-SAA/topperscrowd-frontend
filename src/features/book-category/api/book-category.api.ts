import { api } from "@/lib/api";
import type { ApiResponse, BookCategory } from "@/types/shared";

export async function getAllCategories() {
  const { data } = await api.get<ApiResponse<BookCategory[]>>(
    "/bookcategory/get-all-bookcategories",
  );
  return data;
}

export async function getCategoryById(id: string) {
  const { data } = await api.get<ApiResponse<BookCategory>>(
    `/bookcategory/get-bookcategory/${id}`,
  );
  return data;
}
