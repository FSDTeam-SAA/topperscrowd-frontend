"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllBooks, getBookById, getBooksByCategory } from "../api/book.api";

export function useBooks(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => getAllBooks(params),
  });
}

export function useBook(id: string) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBookById(id),
    select: (res) => res.data,
    enabled: !!id,
  });
}

export function useBooksByCategory(
  categoryId: string,
  params?: { page?: number; limit?: number },
) {
  return useQuery({
    queryKey: ["books-by-category", categoryId, params],
    queryFn: () => getBooksByCategory(categoryId, params),
    enabled: !!categoryId,
  });
}
