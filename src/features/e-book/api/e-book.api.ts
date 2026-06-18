import { api } from "@/lib/api";
import type { EBook, EBooksResponse } from "../types/e-book.types";

export interface PublicEBooksParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sort?: string;
  categoryId?: string;
}

export async function getPublicEBooks(params: PublicEBooksParams = {}) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 12));
  searchParams.set("status", params.status ?? "active");
  if (params.search) searchParams.set("search", params.search);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.categoryId) searchParams.set("categoryId", params.categoryId);

  const { data } = await api.get<EBooksResponse>(
    `/ebook/get-all?${searchParams.toString()}`,
  );
  return data;
}

export async function getPublicEBookById(id: string) {
  const res = await getPublicEBooks({ limit: 1000, status: "active" });
  return {
    ...res,
    data: res.data.find((ebook) => ebook._id === id || ebook.slug === id),
  };
}

export function isPublishedEBook(ebook: EBook) {
  return ["active", "published"].includes(ebook.status?.toLowerCase());
}
