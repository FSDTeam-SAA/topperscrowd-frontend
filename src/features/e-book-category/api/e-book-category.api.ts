import { api } from "@/lib/api";
import type {
  EBookCategoriesResponse,
  EBookCategory,
} from "../types/e-book-category.types";

export async function getPublicEBookCategories() {
  const { data } = await api.get<EBookCategoriesResponse>("/ecategory/get-all");
  return data;
}

export function isActiveEBookCategory(category: EBookCategory) {
  return category.isActive;
}
